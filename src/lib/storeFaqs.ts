export interface StoreFaq {
  question: string;
  answer: string;
  linkHref?: string;
  linkLabel?: string;
}
export const STORE_FAQS: readonly StoreFaq[] = [
  { question: 'What is OpticMart?', answer: 'OpticMart is a optics & camera dealer focused on kayaks and paddling accessories.' },
  { question: 'How do I choose a kayak?', answer: 'Compare the intended use, dimensions, weight capacity, seating, and equipment listed for each model. Contact our team for help understanding product specifications.', linkHref: '/contact', linkLabel: 'Ask about a kayak' },
  { question: 'Are paddles and accessories included?', answer: 'Included equipment varies by product. Check the individual product listing before ordering.' },
  { question: 'How do I place an order?', answer: 'Choose your item, add it to your cart, and proceed to checkout. Review your delivery details and payment information before completing your order.' },
  { question: 'Where can I find delivery information?', answer: 'See our shipping policy for delivery coverage, dispatch details, and timelines.', linkHref: '/shipping-policy', linkLabel: 'Read the shipping policy' },
  { question: 'How do I track my order?', answer: 'Use the Track Order page to check your order status.', linkHref: '/track', linkLabel: 'Track your order' },
  { question: 'What is the return policy?', answer: 'Review the return policy for eligibility, time limits, and instructions before requesting a return.', linkHref: '/return-policy', linkLabel: 'Read the return policy' },
  { question: 'How can I contact OpticMart?', answer: 'Use our contact page for product questions and order support.', linkHref: '/contact', linkLabel: 'Contact our team' },
];
