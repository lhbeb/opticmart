export const storePolicy = {
  sellingCountries: ['GB'] as const,
  currency: 'GBP',
  shippingService: 'Royal Mail / DPD Tracked',
  shippingPrice: 0,
  handlingDays: { min: 0, max: 1 }, // GMC: 0-1 days, Mon-Fri
  transitDays: { min: 3, max: 4 },  // GMC: 3-4 days, Mon-Fri (total delivery: 3-5 working days)
  returnWindowDays: 30,
  returnMethod: 'By post',          // GMC: "By post"
  refundProcessingDays: 5,
  orderCutoffTime: '14:00',         // GMC: 14:00 GMT
  timeZone: 'Europe/London',        // GMC: GMT+00:00 Greenwich Mean Time (London)
  deliveryDays: 'Mon-Fri',          // GMC: Monday to Friday
} as const;

