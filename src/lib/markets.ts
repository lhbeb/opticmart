/** Public storefront market configuration. OpticMart currently operates in the UK with GBP (£). */
export type MarketKey = 'uk';

export interface MarketConfig {
  label: string;
  flag: string;
  currencyCode: string;
  currencySymbol: string;
  locale: string;
  shipsFrom: string;
  shipsFromFlag: string;
  deliveryDaysMin: number;
  deliveryDaysMax: number;
  freeShippingText: string;
  returnsText: string;
  faqShippingAnswer: string;
  faqFreeShippingAnswer: string;
}

export const MARKETS: Record<MarketKey, MarketConfig> = {
  uk: {
    label: 'United Kingdom',
    flag: '🇬🇧',
    currencyCode: 'GBP',
    currencySymbol: '£',
    locale: 'en-GB',
    shipsFrom: 'United Kingdom',
    shipsFromFlag: '🇬🇧',
    deliveryDaysMin: 2,
    deliveryDaysMax: 4,
    freeShippingText: 'Free standard shipping on eligible UK orders',
    returnsText: 'Eligible returns within 30 days',
    faqShippingAnswer: 'Orders normally require 1–2 business days for handling. Standard UK transit is estimated at 2–4 business days after dispatch.',
    faqFreeShippingAnswer: 'Standard shipping is free for eligible orders delivered to a serviceable United Kingdom address. Any different charge is shown before payment.',
  },
};

export const DEFAULT_MARKET = MARKETS.uk;

export function getMarket(_key?: string | null): MarketConfig {
  return DEFAULT_MARKET;
}

export function formatMarketPrice(price: number, market: MarketConfig = DEFAULT_MARKET): string {
  const formatted = new Intl.NumberFormat(market.locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
  return `${market.currencySymbol}${formatted}`;
}

export function getDeliveryRange(market: MarketConfig = DEFAULT_MARKET): string {
  return `${market.deliveryDaysMin}–${market.deliveryDaysMax} business days`;
}

export const MARKET_OPTIONS = [
  { value: 'uk', label: '🇬🇧 United Kingdom (GBP)' },
] as const;

export const MARKET_CURRENCY_MAP: Record<string, string> = { uk: 'GBP' };
