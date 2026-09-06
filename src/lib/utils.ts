import type { Product, Category } from '@/types';
import productsData from '@/data/products.json';

/**
 * Загружает все товары из JSON
 */
export async function getAllProducts(): Promise<Product[]> {
  return (productsData.products || []) as Product[];
}

/**
 * Загружает все категории из JSON
 */
export async function getAllCategories(): Promise<Category[]> {
  return (productsData.categories || []).sort((a: Category, b: Category) => a.order - b.order);
}

/**
 * Получает товар по ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  const products = await getAllProducts();
  return products.find(p => p.id === id) || null;
}

/**
 * Получает товар по slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getAllProducts();
  return products.find(p => p.slug === slug) || null;
}

/**
 * Получает категорию по slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getAllCategories();
  return categories.find(c => c.slug === slug) || null;
}

/**
 * Получает товары по категории
 */
export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const products = await getAllProducts();
  return products
    .filter(p => p.categoryId === categoryId)
    .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
}

/**
 * Форматирует цену (RUB)
 */
export function formatPrice(price: number | null | undefined): string {
  if (!price || price === null) return 'По запросу';
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Форматирует телефон
 */
export function formatPhone(phone: string): string {
  return phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
}

/**
 * Генерирует мета-описание
 */
export function truncateDescription(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Генерирует slug из строки
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
