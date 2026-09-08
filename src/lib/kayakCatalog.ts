import type { Product } from '@/types/product';

/** Keep copied legacy inventory out of the kayak storefront. */
export function isPaddlingProduct(product: Product): boolean {
  return (product.collections || []).some((value) =>
    ['kayaks', 'paddles', 'kayak-accessories'].includes(value),
  ) || [product.title, product.category].some((value) =>
    typeof value === 'string' && /\b(kayaks?|paddles?|paddling)\b/i.test(value),
  );
}

export function isPublicStoreProduct(product: Product): boolean {
  return (
    isPaddlingProduct(product) &&
    product.meta?.published !== false &&
    product.published !== false &&
    Boolean(product.slug && product.title && product.images?.[0]) &&
    Number.isFinite(Number(product.price)) &&
    Number(product.price) > 0
  );
}
