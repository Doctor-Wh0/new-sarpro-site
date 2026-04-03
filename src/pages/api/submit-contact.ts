// API для обработки формы контактов

import type { APIRoute } from 'astro';
import { isValidEmail, isValidPhone } from '@/lib/utils';

// Защита от спама
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 минута
const RATE_LIMIT_MAX = 5; // максимум 5 заявок в минуту
const ipSubmissions = new Map<string, number[]>();

export const POST: APIRoute = async ({ request }) => {
  // Получить IP клиента
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  
  // Проверка rate limiting
  const now = Date.now();
  const submissions = ipSubmissions.get(ip) || [];
  const recentSubmissions = submissions.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentSubmissions.length >= RATE_LIMIT_MAX) {
    return new Response(
      JSON.stringify({ error: 'Слишком много заявок. Попробуйте позже.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Обновить список
  recentSubmissions.push(now);
  ipSubmissions.set(ip, recentSubmissions);

  try {
    const data = await request.json();

    // Валидация honeypot
    if (data.website || data.faxNumber) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    // Валидация данных
    if (!data.name || data.name.length < 2 || data.name.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Неверное имя' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!isValidEmail(data.email)) {
      return new Response(
        JSON.stringify({ error: 'Неверный email' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!isValidPhone(data.phone)) {
      return new Response(
        JSON.stringify({ error: 'Неверный телефон' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!data.message || data.message.length < 5 || data.message.length > 5000) {
      return new Response(
        JSON.stringify({ error: 'Неверное сообщение' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Отправка на send.php (если нужна обработка на сервере)
    // Здесь можно отправить письмо через внешний сервис или сохранить в БД
    
    // Для статического сайта — просто логируем (в реальности вы можете использовать Formspree, SendGrid и т.д.)
    console.log('Новая заявка:', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      message: data.message,
      timestamp: new Date().toISOString()
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Ошибка при обработке заявки:', error);
    return new Response(
      JSON.stringify({ error: 'Ошибка сервера' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
