import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // Полностью статический сайт (SSG)
  output: 'static',
  
  // GitHub Pages URL (корневой домен user site)
  site: 'https://saratov-pro.github.io',
  
  // Интеграции
  integrations: [tailwind()],
  
  // Build configuration - don't inline stylesheets
  build: {
    inlineStylesheets: 'never'
  },

  // i18n (если понадобится позже)
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru']
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