# SARPRO Website

Современный, быстрый и SEO-дружественный B2B сайт для продажи сейфов, пломб и оборудования безопасности.

## 🚀 Стек технологий

- **Astro 5.x** — Фреймворк для создания быстрых статических сайтов
- **TypeScript** (strict mode) — Типизация для надёжного кода
- **Tailwind CSS v4** — Современный CSS-first подход к стилизации
- **React Islands** — Интерактивные компоненты где нужны
- **JSON данные** — Все товары и категории в JSON файлах

## 📦 Установка

### Требования

- Node.js 18.17+ или выше
- npm, yarn, pnpm или bun

### Шаги установки

```bash
# Клонирование репозитория
git clone https://github.com/sarpro-team/new-sarpro-site.git
cd new-sarpro-site

# Установка зависимостей
pnpm install

# или
npm install
```

## 🏃 Развёртывание

### Локальное тестирование

```bash
# Запуск dev сервера
pnpm dev

# Открыть в браузере
# http://localhost:3000
```

### Сборка для продакшена

```bash
# Сборка статического сайта
pnpm build

# Результаты в папке `dist/`
```

### Предпросмотр сборки

```bash
pnpm preview
```

## 📂 Структура проекта

```
src/
├── pages/              # Астро страницы (маршруты)
├── components/         # Переиспользуемые компоненты
├── layouts/            # Макеты страниц
├── data/              # JSON данные (товары, категории)
├── lib/               # Утилиты и вспомогательные функции
├── types/             # TypeScript типы
└── styles/            # Глобальные стили (CSS + Tailwind)

public/
├── robots.txt         # Инструкции для поисковых ботов
└── sitemap.xml        # Карта сайта
```

## 🛠️ Развёртывание на Reg.ru (тариф Host-A)

### Шаг 1: Подготовка

1. Создайте папку на хостинге (например, `sarpro.ru`)
2. Убедитесь, что PHP 8.0+ доступен (для send.php)
3. Убедитесь, что у вас есть доступ по SFTP или FTP

### Шаг 2: Сборка и загрузка

```bash
# 1. Соберите проект локально
pnpm build

# 2. Загрузите содержимое папки `dist/` на хост:
# - Используйте SFTP клиент (например, FileZilla)
# - Или используйте встроенный менеджер файлов в панели Reg.ru

# 3. Загрузите файл send.php в корень:
# - Также через SFTP или менеджер файлов в Reg.ru
```

### Шаг 3: Конфигурация на хосте

1. **Установите домен:**
   - В панели Reg.ru: Домены → Ваш домен → Перенаправить домен
   - Укажите папку `public_html/sarpro.ru`

2. **Включите HTTPS:**
   - В панели: Домены → Сертификаты SSL → Включить Let's Encrypt (бесплатный)

3. **Проверьте .htaccess** (если нужны красивые URL):
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

### Шаг 4: Конфигурация send.php

1. Отредактируйте строку с email адресом получателя:
   ```php
   $to = 'ваш-email@sarpro.ru';
   ```

2. Убедитесь, что на хосте включена функция `mail()`:
   - Свяжитесь с поддержкой Reg.ru если не работает

## 🔄 Развёртывание через GitHub Actions (CI/CD)

Можно автоматизировать развёртывание на хост:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Reg.ru

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm build
      
      - name: Deploy to Reg.ru
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ftp.reg.ru
          username: ${{ secrets.SSH_USERNAME }}
          password: ${{ secrets.SSH_PASSWORD }}
          local-dir: ./dist/
          server-dir: /public_html/sarpro.ru/
```

## 📝 Редактирование контента

### Товары и категории

Отредактируйте файл `src/data/products.json`:

```json
{
  "products": [
    {
      "id": "product-id",
      "categoryId": "safes",
      "name": "Название товара",
      "slug": "product-slug",
      "description": "Краткое описание",
      "longDescription": "Полное описание",
      "price": 50000,
      "availability": "В наличии",
      "manufacturer": "VALBERG",
      "countryOfOrigin": "Россия",
      "warranty": "2 года",
      "specs": { /* характеристики */ },
      "image": "/assets/images/product.jpg",
      "gallery": [],
      "certificates": []
    }
  ]
}
```

### Статические страницы

Отредактируйте Astro файлы в `src/pages/`:
- `index.astro` — Главная
- `about.astro` — О нас
- `contacts.astro` — Контакты
- И т.д.

## 🔐 Безопасность

### send.php защищён от:

- **XSS атак** — strip_tags + htmlspecialchars
- **SQL инъекций** — используется PHP mail() функция
- **Spam** — honeypot поля + rate limiting
- **CSRF** — CORS заголовки + валидация

### Рекомендации:

1. Используйте HTTPS (обязательно!)
2. Регулярно обновляйте зависимости
3. Мониторьте логи ошибок
4. Используйте сильный пароль доступа на хост

## 📊 SEO

Сайт оптимизирован для поисковых систем:

- ✅ Schema.org разметка (Product, Organization, BreadcrumbList)
- ✅ Meta теги (title, description, keywords)
- ✅ Open Graph (для соцсетей)
- ✅ Sitemap.xml (автоматический)
- ✅ Robots.txt
- ✅ Mobile-first дизайн
- ✅ Быстрая загрузка (Astro SSG)

## 📞 Контакты

- **Email:** info@sarpro.ru
- **Телефон:** +7 (905) 386-08-70
- **Сайт:** sarpro.ru

## 📄 Лицензия

Проприетарная лицензия © 2026 SARPRO. Все права защищены.
