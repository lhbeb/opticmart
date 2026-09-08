// OpticMart brand configuration - UK Precision Optics Dealer
export const brand = {
  name: 'OpticMart',
  tagline: 'Precision Optics, Cameras & Binoculars',
  description: 'Authorized dealer of professional digital cameras, precision binoculars, camera lenses, and optical equipment based in the United Kingdom.',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@opticmart.shop',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+44 20 7946 0912',
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || '71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
  timeZone: 'Europe/London',
  timeZoneLabel: 'GMT / BST (UK Time)',
  hours: 'Monday – Friday: 9:00 AM – 5:30 PM (UK Time)',
  weekendHours: 'Saturday – Sunday: Closed (Online orders dispatched next working day)',
};
