// src/components/product/CartButton.tsx
// Кнопка добавления в корзину (Astro Island)

import type { Product } from '@/types';
import { useState } from 'react';

interface Props {
  product: Product;
}

export function CartButton({ product }: Props) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    // Получаем текущую корзину
    const cart = localStorage.getItem('sarpro_cart')
      ? JSON.parse(localStorage.getItem('sarpro_cart') || '[]')
      : [];

    // Проверяем, есть ли уже этот товар
    const existingItem = cart.find((item: any) => item.productId === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        productId: product.id,
        productName: product.name,
        quantity: 1,
        price: product.price
      });
    }

    // Сохраняем в localStorage
    localStorage.setItem('sarpro_cart', JSON.stringify(cart));

    // Отправляем событие
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { product, quantity: 1 } }));

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all ${
        isAdded
          ? 'bg-green-600 hover:bg-green-700'
          : 'bg-accent-light hover:bg-green-700'
      }`}
    >
      {isAdded ? '✓ Добавлено в корзину' : 'Добавить в корзину'}
    </button>
  );
}
