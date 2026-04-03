import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // Полностью статический сайт (SSG)
  output: 'static',
  
  // Интеграции
  integrations: [tailwind()],
  
  // Строгий режим TypeScript
  vite: {
    ssr: {
      noExternal: []
    }
  },
  
  // Динамические раауты
  dynamic: 'force-static',
  
  // Оптимизация изображений
  image: {
    remotePatterns: [
      { protocol: "https" },
      { protocol: "http" }
    ]
  },
  
  // i18n (если понадобится позже)
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru']
  },
  
  // Оптимизация сборки
  build: {
    format: 'file',
    inlineStylesheets: 'never'
  },
  
  // Markdown настройки
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-light',
      langs: [],
      wrap: true
    }
  }
});
