export const PRODUCT_COLLECTION_OPTIONS = [
  { value: 'kayaks', label: 'Kayaks' },
  { value: 'paddles', label: 'Paddles' },
  { value: 'kayak-accessories', label: 'Kayak Accessories' },
] as const;

export function getCollectionsForCategory(category: string): string[] {
  const normalized = category.toLowerCase().trim();
  if (/accessor|gear|vest|storage|bag|rack/.test(normalized)) return ['kayak-accessories'];
  if (/paddle/.test(normalized)) return ['paddles'];
  if (/kayak/.test(normalized)) return ['kayaks'];
  return [];
}
