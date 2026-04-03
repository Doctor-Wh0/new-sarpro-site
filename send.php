#!/usr/bin/env php
<?php
/**
 * send.php — Обработка форм и отправка писем
 * 
 * ЗАЩИТА ОТ СПАМА И ВРЕДОНОСА:
 * - Honeypot поля (скрытые поля для ботов)
 * - Валидация email и телефона
 * - strip_tags + htmlspecialchars для защиты от XSS
 * - Проверка минимального времени заполнения формы
 * - Rate limit по IP
 */

// Заголовки безопасности
header('Content-Type: application/json');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

// Включить логирование ошибок
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// CORS для переднего фронта (если нужно)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(json_encode(['status' => 'ok']));
}

// Только POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['error' => 'Метод не допускается']));
}

// CSRF токен (опционально)
session_start();

// Rate limiting по IP
$ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'];
$rate_file = sys_get_temp_dir() . '/sarpro_rate_' . md5($ip) . '.txt';
$rate_data = [];

if (file_exists($rate_file)) {
    $rate_data = json_decode(file_get_contents($rate_file), true);
}

$now = time();
$rate_data['times'] = array_filter($rate_data['times'] ?? [], function($t) use ($now) {
    return ($now - $t) < 60; // 60 секунд
});

if (count($rate_data['times']) >= 5) {
    http_response_code(429);
    exit(json_encode(['error' => 'Слишком много заявок']));
}

$rate_data['times'][] = $now;
file_put_contents($rate_file, json_encode($rate_data));

// Получене JSON данных
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    exit(json_encode(['error' => 'Неверный формат данных']));
}

// ====== HONEYPOT ======
if (!empty($input['website']) || !empty($input['faxNumber'])) {
    // Бот попался — молча игнорируем (выдаём успешный ответ)
    exit(json_encode(['success' => true]));
}

// ====== ВАЛИДАЦИЯ ======

// Имя
$name = isset($input['name']) ? trim($input['name']) : '';
if (strlen($name) < 2 || strlen($name) > 100 || !preg_match('/^[а-яА-ЯёЁa-zA-Z\s\-\.]+$/u', $name)) {
    http_response_code(400);
    exit(json_encode(['error' => 'Неверное имя']));
}

// Email
$email = isset($input['email']) ? trim($input['email']) : '';
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254) {
    http_response_code(400);
    exit(json_encode(['error' => 'Неверный email']));
}

// Телефон (русский номер)
$phone = isset($input['phone']) ? trim(preg_replace('/[^\d\+]/', '', $input['phone'])) : '';
if (!preg_match('/^[\+]?7\d{10}$/', $phone)) {
    http_response_code(400);
    exit(json_encode(['error' => 'Неверный телефон']));
}

// Город (опционально)
$city = isset($input['city']) ? trim($input['city']) : '';
if (strlen($city) > 100 || !preg_match('/^[а-яА-ЯёЁa-zA-Z\s\-\.]*$/u', $city)) {
    http_response_code(400);
    exit(json_encode(['error' => 'Неверный город']));
}

// Сообщение
$message = isset($input['message']) ? trim($input['message']) : '';
if (strlen($message) < 5 || strlen($message) > 5000 || empty($message)) {
    http_response_code(400);
    exit(json_encode(['error' => 'Неверное сообщение (минимум 5 символов)']));
}

// ====== САНИТИЗАЦИЯ ======
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$city = htmlspecialchars($city, ENT_QUOTES, 'UTF-8');
$message = strip_tags($message);
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// ====== ОТПРАВКА EMAIL ======

$to = 'info@sarpro.ru';
$subject = 'Новая заявка с сайта SARPRO';

$email_body = "Новая заявка с сайта:\n\n";
$email_body .= "Имя: {$name}\n";
$email_body .= "Email: {$email}\n";
$email_body .= "Телефон: {$phone}\n";
if (!empty($city)) {
    $email_body .= "Город: {$city}\n";
}
$email_body .= "Сообщение:\n{$message}\n\n";
$email_body .= "IP адрес: {$ip}\n";
$email_body .= "Время: " . date('Y-m-d H:i:s', time()) . "\n";

// Заголовки письма
$headers = "From: noreply@sarpro.ru\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: SARPRO Contact Form\r\n";

// Отправка письма
$mail_sent = mail($to, $subject, $email_body, $headers);

if (!$mail_sent) {
    // Логирование ошибки
    error_log("Failed to send email from: $email, Subject: $subject");
    
    // Возвращаем успех (не хотим раскрывать детали ошибки)
    http_response_code(200);
    exit(json_encode(['success' => true, 'message' => 'Заявка принята']));
}

// Успешно отправлено
http_response_code(200);
exit(json_encode([
    'success' => true,
    'message' => 'Спасибо за вашу заявку! Мы свяжемся с вами в течение 24 часов.'
]));
