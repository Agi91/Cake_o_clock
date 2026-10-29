import React from 'react';
import { ShieldCheck, RefreshCw, AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BUSINESS_CONFIG } from '../config/business';

export const PolicyPage: React.FC = () => {
  return (
    <div className="py-12 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-caramel-600 text-xs font-bold uppercase tracking-wider">
            Bakery Standards & Guidelines
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-cocoa mt-2 mb-3">
            Bakery Policies & Dietary Notice
          </h1>
          <p className="text-xs sm:text-sm text-cocoa-500 leading-relaxed font-light">
            Transparency regarding our artisanal baking freshness, cancellations, and allergen practices.
          </p>
        </div>

        <div className="space-y-8">
          
          {/* 1. Freshness Guarantee */}
          <div className="p-6 rounded-3xl bg-white border border-cocoa-100 shadow-soft space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cream-200 text-cocoa flex items-center justify-center">
                <Clock className="w-5 h-5 text-caramel" />
              </div>
              <h2 className="font-serif text-xl font-bold text-cocoa">
                1. Freshness & Storage Guarantee
              </h2>
            </div>
            <p className="text-xs text-cocoa-500 leading-relaxed">
              Every standard and bespoke cake is freshly assembled on the day of delivery. 
              Because we avoid chemical shelf-life stabilizers and artificial preservatives, 
              we recommend refrigerating fresh cream and mousse cakes immediately upon receipt (0°C to 4°C).
            </p>
            <p className="text-xs text-cocoa-500 leading-relaxed">
              For optimal flavour and texture, bring butter-based sponge and chocolate ganache cakes to room 
              temperature for 15–20 minutes before slicing.
            </p>
          </div>

          {/* 2. Cancellation and Rescheduling Policy (Placeholder) */}
          <div className="p-6 rounded-3xl bg-white border border-cocoa-100 shadow-soft space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cream-200 text-cocoa flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-caramel" />
              </div>
              <h2 className="font-serif text-xl font-bold text-cocoa">
                2. Order Cancellation & Rescheduling
              </h2>
            </div>
            <p className="text-xs text-cocoa-500 leading-relaxed">
              <strong>Standard Bestseller Cakes:</strong> Cancellations or time-slot modifications must be requested 
              at least 3 hours prior to the scheduled delivery dispatch time via WhatsApp.
            </p>
            <p className="text-xs text-cocoa-500 leading-relaxed">
              <strong>Custom & Tiered Theme Cakes:</strong> Due to specialized ingredient acquisition, customized 
              structures, and advance decorative prep, custom orders can be rescheduled or refunded up to 24 hours 
              before dispatch. Orders cancelled after baking has begun are subject to a nominal raw material deduction.
            </p>
            <div className="p-3 rounded-xl bg-cream-100 text-[11px] text-cocoa-500">
              <em>Client Notice:</em> The exact refund percentage and processing timeframe will be finalized by the bakery owner upon confirmation.
            </div>
          </div>

          {/* 3. Allergen and Dietary Notice */}
          <div id="allergen" className="p-6 rounded-3xl bg-white border border-cocoa-100 shadow-soft space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cream-200 text-cocoa flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-caramel" />
              </div>
              <h2 className="font-serif text-xl font-bold text-cocoa">
                3. Dietary & Allergen Disclaimer
              </h2>
            </div>
            <p className="text-xs text-cocoa-500 leading-relaxed">
              While our kitchen maintains designated, sanitized preparation workstations for <strong>100% Eggless Cakes</strong>, 
              our studio facility processes wheat (gluten), dairy milk and butter, soy lecithin, and tree nuts 
              (cashews, almonds, pistachios, hazelnuts, walnuts).
            </p>
            <p className="text-xs text-cocoa-500 leading-relaxed">
              If any member of your celebration party has severe airborne or anaphylactic food allergies, 
              please notify our head chef directly on WhatsApp prior to finalizing your order.
            </p>
          </div>

          {/* 4. Safe Delivery Handling */}
          <div className="p-6 rounded-3xl bg-white border border-cocoa-100 shadow-soft space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cream-200 text-cocoa flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-success-600" />
              </div>
              <h2 className="font-serif text-xl font-bold text-cocoa">
                4. Safe Transit & Damage Protocol
              </h2>
            </div>
            <p className="text-xs text-cocoa-500 leading-relaxed">
              All delicate multi-tier confections are delivered in reinforced rigid cake boxes with non-slip bases 
              and transported by trained delivery riders. In the improbable event of transit damage, take a clear photo 
              and contact our WhatsApp support immediately for an expedited solution.
            </p>
          </div>

        </div>

        {/* Back Link */}
        <div className="text-center mt-12">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-cocoa text-cream-100 text-xs font-semibold hover:bg-cocoa-500 shadow-soft transition-all"
          >
            <span>Back to The Cake Feed</span>
            <ArrowRight className="w-4 h-4 text-caramel" />
          </Link>
        </div>

      </div>
    </div>
  );
};
