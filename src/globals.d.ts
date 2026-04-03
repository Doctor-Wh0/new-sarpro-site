/**
 * Глобальные объявления типов
 */

declare global {
  /**
   * Данные для корзины в localStorage
   */
  interface Window {
    __SARPRO_CART__?: import('./types/index').CartItem[];
  }
}

export {};
