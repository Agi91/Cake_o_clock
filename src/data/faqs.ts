export interface FAQItem {
  question: string;
  answer: string;
  category: 'ordering' | 'delivery' | 'custom' | 'dietary';
}

export const FAQS: FAQItem[] = [
  {
    category: 'ordering',
    question: 'How do I place an order through WhatsApp?',
    answer: 'Simply browse our Cake Feed or design your custom cake, configure your preferred size and flavour, and click "Order via WhatsApp" or checkout. A pre-filled WhatsApp message with your full order summary will open directly in your WhatsApp. Our bakery team will confirm slot availability, answer any questions, and confirm your order promptly.',
  },
  {
    category: 'dietary',
    question: 'Are all your cakes eggless?',
    answer: 'The vast majority of our menu (over 90%) is 100% pure eggless vegetarian by default, prepared in dedicated sanitized workstations. For cakes that traditionally contain eggs (such as authentic baked cheesecakes), eggless preparation is clearly labeled or available as a selectable option.',
  },
  {
    category: 'delivery',
    question: 'How much advance notice is required for standard cakes?',
    answer: 'Standard bestselling cakes require approximately 3 to 4 hours lead time for same-day delivery, as each cake is freshly baked and assembled to order. We recommend placing same-day orders before 6:00 PM.',
  },
  {
    category: 'custom',
    question: 'How far in advance should I order a custom or tiered cake?',
    answer: 'Custom theme cakes, tiered celebration cakes, and intricate piped designs require 24 to 48 hours notice. For large wedding or milestone event cakes, we suggest reaching out 4 to 7 days ahead so we can source specialized decorative elements.',
  },
  {
    category: 'custom',
    question: 'Can you replicate a Pinterest or Instagram reference image?',
    answer: 'Yes! You can use our Custom Cake Studio to describe your vision, select preferred flavours, and share your reference image link or photo over WhatsApp. Our head pastry chef will review the design and discuss possibilities.',
  },
  {
    category: 'delivery',
    question: 'How are the cakes delivered to ensure they arrive intact?',
    answer: 'All cakes are packaged in sturdy, reinforced thermal cake boxes with support bases and delivered via temperature-controlled delivery partners trained in delicate cake handling.',
  },
  {
    category: 'ordering',
    question: 'Can I add a personalized message on the cake?',
    answer: 'Absolutely! Every cake order includes a complimentary custom inscription piped onto an edible chocolate plaque or directly onto the cake board (up to 30 characters).',
  },
];
