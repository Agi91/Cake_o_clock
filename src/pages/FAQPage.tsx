import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle, Sparkles } from 'lucide-react';
import { FAQS } from '../data/faqs';
import { BUSINESS_CONFIG } from '../config/business';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'ordering', label: 'Ordering & WhatsApp' },
    { id: 'delivery', label: 'Delivery & Timing' },
    { id: 'custom', label: 'Custom & Tiered Cakes' },
    { id: 'dietary', label: 'Dietary & Eggless' },
  ];

  const filteredFaqs = FAQS.filter((faq) => {
    if (activeCategory === 'all') return true;
    return faq.category === activeCategory;
  });

  return (
    <div className="py-12 min-h-screen">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-caramel-600 text-xs font-bold uppercase tracking-wider">
            Help & Guidelines
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-cocoa mt-2 mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-cocoa-500 leading-relaxed font-light">
            Find answers regarding our WhatsApp checkout workflow, delivery timeframes, 
            eggless hygiene, and custom design lead times.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-cocoa text-cream-100 shadow-soft'
                  : 'bg-white border border-cocoa-100 text-cocoa hover:bg-cream-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion Questions */}
        <div className="max-w-3xl mx-auto space-y-3 mb-16">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-cocoa-100 shadow-soft overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-cream-50 transition-colors"
                >
                  <span className="font-serif text-base font-bold text-cocoa">
                    {faq.question}
                  </span>
                  <div className="p-1 rounded-full bg-cream-100 text-cocoa-500 flex-shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-cocoa-500 leading-relaxed border-t border-cocoa-50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="p-8 rounded-3xl bg-cocoa text-cream-100 text-center max-w-2xl mx-auto shadow-card space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-cocoa-700 text-caramel flex items-center justify-center mx-auto">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold">
            Still Have a Question?
          </h3>
          <p className="text-xs text-cream-200/80 max-w-md mx-auto">
            Our pastry team is always available to assist with flavor choices, rush delivery requests, 
            or allergen questions directly on WhatsApp.
          </p>
          <a
            href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi Cake O Clock! I have a question regarding an upcoming order.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-success-600 hover:bg-success-700 text-white font-bold text-xs shadow-soft transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Directly on WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
};
