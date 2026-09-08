export interface StoreFaq {
  question: string;
  answer: string;
  linkHref?: string;
  linkLabel?: string;
}
export const STORE_FAQS: readonly StoreFaq[] = [
  { question: 'What is OpticMart?', answer: 'OpticMart is an authorized dealer specializing in professional cameras, high-definition binoculars, telephoto lenses, and precision optical equipment.' },
  { question: 'How do I choose the right camera or binoculars?', answer: 'Consider your primary intended use—such as wildlife observation, sports, landscape photography, travel, or astronomy. Compare optical magnification, lens aperture, sensor dimensions, and weather sealing. Contact our optical gear team for personalized guidance.', linkHref: '/contact', linkLabel: 'Ask an optics specialist' },
  { question: 'Are lens caps and carry cases included?', answer: 'Most models include standard protective lens caps, neck straps, and protective carry cases. Check the individual product listing for specific included accessories.' },
  { question: 'How do I place an order?', answer: 'Select your item, add it to your cart, and proceed to our secure checkout. Review your shipping details and payment method before completing your purchase.' },
  { question: 'Where can I find shipping and delivery information?', answer: 'See our shipping policy for dispatch timelines, insured delivery coverage, and carrier transit estimates.', linkHref: '/shipping-policy', linkLabel: 'Read shipping policy' },
  { question: 'How do I track my order?', answer: 'Once your order dispatches, you will receive tracking updates by email. You can also visit our Track Order page at any time.', linkHref: '/track', linkLabel: 'Track your order' },
  { question: 'What is the return policy?', answer: 'Eligible items may be returned within 30 days in original condition. Review our return policy for full details.', linkHref: '/return-policy', linkLabel: 'Read return policy' },
  { question: 'How can I contact OpticMart?', answer: 'Our customer support and optical equipment specialists are available to answer any questions.', linkHref: '/contact', linkLabel: 'Contact our team' },
];
