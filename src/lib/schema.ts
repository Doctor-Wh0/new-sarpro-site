import type { Product, Category } from '@/types';

/**
 * Генерирует Schema.org JSON-LD для продукта
 */
export function generateProductSchema(product: Product, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.longDescription,
    image: `${baseUrl}${product.image}`,
    brand: {
      '@type': 'Brand',
      name: product.manufacturer,
    },
    manufacturer: {
      '@type': 'Organization',
      name: product.manufacturer,
    },
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/products/${product.slug}`,
      priceCurrency: product.currency,
      price: product.price?.toString() || 'N/A',
      availability: product.availability === 'В наличии' 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'SARPRO',
      },
    },
  };
}

/**
 * Генерирует Schema.org для категории
 */
export function generateCategorySchema(category: Category, products: Product[], baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description,
    url: `${baseUrl}/categories/${category.slug}`,
    image: `${baseUrl}${category.image}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${baseUrl}/products/${product.slug}`,
        name: product.name,
      })),
    },
  };
}

/**
 * Генерирует Schema.org BreadcrumbList
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

/**
 * Генерирует Schema.org для организации
 */
export function generateOrganizationSchema(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ИП Абросимова Светлана Алексеевна',
    alternateName: 'SARPRO',
    description: 'Официальный поставщик пломб и пломбировочных средств',
    url: baseUrl,
    logo: `${baseUrl}/assets/logos/logo.jpg`,
    image: `${baseUrl}/assets/images/og-default.jpg`,
    telephone: '+7-905-386-0870',
    email: 'info@sarpro.ru',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'проспект 50 лет Октября, д. 24/26',
      addressLocality: 'Саратов',
      addressRegion: 'Саратовская область',
      postalCode: '410012',
      addressCountry: 'RU',
    },
    areaServed: 'RU',
    priceRange: '$$',
    sameAs: [
      'https://vk.com/sarpro',
      'https://t.me/sarpro_oficial',
    ],
  };
}

/**
 * Генерирует Open Graph теги для SEO
 */
export function generateOpenGraphTags(
  title: string,
  description: string,
  image: string,
  url: string,
  type: 'website' | 'article' | 'product' = 'website'
) {
  return {
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'og:url': url,
    'og:type': type,
    'og:site_name': 'SARPRO',
    'og:locale': 'ru_RU',
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
  };
}

/**
 * Генерирует Schema.org FAQPage
 */
export function generateFaqPageSchema(questions: Array<{ question: string; answer: string }>, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

/**
 * Генерирует Schema.org WebPage
 */
export function generateWebPageSchema(title: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
  };
}

/**
 * Генерирует Schema.org ItemList
 */
export function generateItemListSchema(items: Array<{ name: string; url: string }>, name: string, description: string, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}
