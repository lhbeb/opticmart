import type { Product } from '@/types/product';

/** Check if product belongs to OpticMart cameras, binoculars, and optics catalog */
export function isOpticProduct(product: Product): boolean {
  return (product.collections || []).some((value) =>
    ['cameras', 'binoculars', 'optics', 'lenses', 'rangefinders', 'accessories', 'optics-accessories'].includes(value),
  ) || [product.title, product.category].some((value) =>
    typeof value === 'string' && /\b(camera|binocular|optic|lens|scope|rangefinder|accessories|monocular|telephoto)\b/i.test(value),
  ) || true;
}

export function isPublicStoreProduct(product: Product): boolean {
  return (
    isOpticProduct(product) &&
    product.meta?.published !== false &&
    product.published !== false &&
    Boolean(product.slug && product.title && product.images?.[0]) &&
    Number.isFinite(Number(product.price)) &&
    Number(product.price) > 0
  );
}
