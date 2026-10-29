import React, { useState } from 'react';
import { Sparkles, MessageCircle, Info } from 'lucide-react';
import { LiveCakeVisualizer } from '../components/customizer/LiveCakeVisualizer';
import { CustomizerForm } from '../components/customizer/CustomizerForm';
import { CustomCakeEnquiry } from '../types/cart';
import { BUSINESS_CONFIG } from '../config/business';

export const CustomStudioPage: React.FC = () => {
  const [enquiry, setEnquiry] = useState<CustomCakeEnquiry>({
    occasion: 'Birthday Celebration',
    servings: '15–18 Guests (~1.5 kg)',
    flavour: 'Rich Belgian Chocolate',
    isEggless: true,
    tiers: 2,
    cakeMessage: 'Happy Celebration!',
    preferredDate: '',
    budgetRange: '₹2,000 – ₹3,500',
    themeColor: 'Vintage Cream',
    additionalNotes: '',
  });

  const handleEnquiryChange = (updated: Partial<CustomCakeEnquiry>) => {
    setEnquiry((prev) => ({ ...prev, ...updated }));
  };

  return (
    <div className="py-10 min-h-screen">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        
        {/* Studio Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-caramel-100 border border-caramel-200 text-cocoa text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-caramel-600" />
            <span>Interactive Bespoke Cake Studio</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-cocoa mb-3">
            Design Your Dream Cake
          </h1>

          <p className="text-xs sm:text-base text-cocoa-500 leading-relaxed font-light">
            Craft an extraordinary bespoke centerpiece. Choose your tiers, theme color palette, 
            flavour layers, and personalized message with our live 2D studio preview.
          </p>
        </div>

        {/* Notice Card */}
        <div className="mb-8 p-4 rounded-2xl bg-cream-100 border border-cocoa-100 flex items-start gap-3 text-xs text-cocoa-500 max-w-3xl mx-auto">
          <Info className="w-4 h-4 text-caramel flex-shrink-0 mt-0.5" />
          <div>
            <strong>Artisanal Lead Time Notice:</strong> Custom tiered cakes and hand-sculpted theme designs require a minimum of 24–48 hours advance notice so our pastry artists can source specialty blooms and handcraft decorative elements.
          </div>
        </div>

        {/* Grid: 2D Live Visualizer + Customizer Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Sticky Live Visualizer */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-cocoa-400">
              Live Preview
            </div>
            
            <LiveCakeVisualizer
              tiers={enquiry.tiers}
              themeColor={enquiry.themeColor}
              cakeMessage={enquiry.cakeMessage}
              flavour={enquiry.flavour}
              isEggless={enquiry.isEggless}
            />

            {/* Quick Tips */}
            <div className="p-4 rounded-2xl bg-white border border-cocoa-100 text-xs text-cocoa-500 space-y-1.5">
              <div className="font-semibold text-cocoa">Studio Design Tips:</div>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-cocoa-400">
                <li>2-tier cakes are ideal for 20+ guests and grand focal photos.</li>
                <li>Keep the inscription under 25 letters for optimal aesthetic balance.</li>
                <li>Have a Pinterest or Instagram photo? Upload below to attach to WhatsApp!</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Customizer Form */}
          <div className="lg:col-span-7">
            <CustomizerForm
              enquiry={enquiry}
              onChange={handleEnquiryChange}
            />
          </div>

        </div>

      </div>
    </div>
  );
};
