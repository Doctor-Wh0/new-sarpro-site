/**
 * Основные типы для проекта SARPRO
 */

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  order: number;
}

export interface ProductSpec {
  width?: number;
  depth?: number;
  height?: number;
  weight?: number;
  material?: string;
  lockType?: string;
  certification?: string;
  [key: string]: string | number | undefined;
}

export interface Certificate {
  name: string;
  url: string;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  metaDescription?: string;
  longDescription: string;
  price?: number | null;
  currency: string;
  availability: 'В наличии' | 'Под заказ' | 'Снято с производства';
  manufacturer: string;
  countryOfOrigin: string;
  warranty: string;
  specs: ProductSpec;
  image: string;
  gallery: string[];
  certificates: Certificate[];
  orderIndex?: number;
}

export interface CompanyInfo {
  name: string;
  nameRu: string;
  shortName: string;
  inn: string;
  ogrn: string;
  ogrnip?: string;
  legalAddress: string;
  physicalAddress: string;
  email: string;
  phoneMain: string;
  phoneAlt: string;
  website: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  message: string;
  acceptTerms: boolean;
  website?: string; // honeypot
  faxNumber?: string; // honeypot
}

export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  price?: number;
}

export interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  robots?: string;
}
