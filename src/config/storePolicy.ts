export const storePolicy = {
  sellingCountries: ['GB'] as const,
  currency: 'GBP',
  shippingService: 'Royal Mail / DPD Tracked',
  shippingPrice: 0,
  handlingDays: { min: 1, max: 2 },
  transitDays: { min: 2, max: 4 },
  returnWindowDays: 30,
  returnMethod: 'By mail',
  refundProcessingDays: 5,
} as const;
