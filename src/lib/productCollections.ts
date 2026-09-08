export const PRODUCT_COLLECTION_OPTIONS = [
  { value: 'cameras', label: 'Cameras' },
  { value: 'binoculars', label: 'Binoculars' },
  { value: 'lenses', label: 'Camera Lenses' },
  { value: 'optics', label: 'Precision Optics' },
  { value: 'optics-accessories', label: 'Optics Accessories' },
] as const;

export function getCollectionsForCategory(category: string): string[] {
  const normalized = category.toLowerCase().trim();
  if (/accessor|tripod|strap|case|clean|filter|battery|charger/.test(normalized)) return ['optics-accessories'];
  if (/lens|telephoto|macro|zoom/.test(normalized)) return ['lenses'];
  if (/binocular|monocular|scope|rangefinder/.test(normalized)) return ['binoculars', 'optics'];
  if (/camera|mirrorless|dslr|body/.test(normalized)) return ['cameras'];
  return ['optics'];
}
