import React, { useState } from 'react';
import { Sparkles, MessageCircle, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { CustomCakeEnquiry } from '../../types/cart';
import { generateCustomCakeWhatsAppUrl } from '../../lib/whatsapp';
import { validateCustomCakeEnquiry } from '../../lib/validation';
import { BUSINESS_CONFIG } from '../../config/business';

interface CustomizerFormProps {
  enquiry: CustomCakeEnquiry;
  onChange: (updated: Partial<CustomCakeEnquiry>) => void;
}

export const CustomizerForm: React.FC<CustomizerFormProps> = ({ enquiry, onChange }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const occasions = [
    'Birthday Celebration',
    'Anniversary',
    'Engagement / Wedding',
    'Baby Shower / Gender Reveal',
    'Milestone / Farewell',
    'Kids Cartoon / Superhero',
    'Corporate Event',
    'Other Bespoke Theme',
  ];

  const servingsOptions = [
    '10–12 Guests (~1.0 kg)',
    '15–18 Guests (~1.5 kg)',
    '20–25 Guests (~2.0 kg)',
    '30–35 Guests (2 Tiers, ~3.0 kg)',
    '40–50 Guests (3 Tiers, ~4.5 kg+)',
  ];

  const flavours = [
    'Rich Belgian Chocolate',
    'Dutch Truffle',
    'Classic Red Velvet',
    'Lotus Biscoff Crunch',
    'Fresh Whipped Pineapple',
    'Vanilla Madagascar Bean',
    'Nutella Ferrero Rocher',
  ];

  const colors = [
    'Vintage Cream',
    'Cocoa Brown',
    'Rose Blush',
    'Caramel Gold',
    'Pastel Lavender',
    'Pistachio Mint',
  ];

  const budgets = [
    '₹1,200 – ₹2,000',
    '₹2,000 – ₹3,500',
    '₹3,500 – ₹6,000',
    '₹6,000 – ₹10,000+',
  ];

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        onChange({ referenceImageUrl: 'Uploaded design photo attached' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateCustomCakeEnquiry({
      name: customerName,
      phone: customerPhone,
      preferredDate: enquiry.preferredDate,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const whatsappUrl = generateCustomCakeWhatsAppUrl(
      enquiry,
      customerName.trim(),
      customerPhone.trim()
    );

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsSubmitting(false);
  };

  // Min date is 24 hours from today
  const minDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-cocoa-100 shadow-soft">
      <div>
        <h2 className="font-serif text-2xl font-bold text-cocoa mb-1">
          Custom Cake Builder
        </h2>
        <p className="text-xs text-cocoa-400">
          Tailor your dream cake. Changes reflect instantly on the 2D studio preview.
        </p>
      </div>

      {/* Occasion & Servings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-cocoa uppercase tracking-wider mb-1.5">
            Occasion:
          </label>
          <select
            value={enquiry.occasion}
            onChange={(e) => onChange({ occasion: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-cocoa-200 bg-cream-50 text-xs text-cocoa focus:outline-none focus:ring-2 focus:ring-caramel"
          >
            {occasions.map((occ) => (
              <option key={occ} value={occ}>
                {occ}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-cocoa uppercase tracking-wider mb-1.5">
            Estimated Servings:
          </label>
          <select
            value={enquiry.servings}
            onChange={(e) => onChange({ servings: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-cocoa-200 bg-cream-50 text-xs text-cocoa focus:outline-none focus:ring-2 focus:ring-caramel"
          >
            {servingsOptions.map((serv) => (
              <option key={serv} value={serv}>
                {serv}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tiers & Palette Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-cocoa uppercase tracking-wider mb-1.5">
            Number of Tiers:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onChange({ tiers: t })}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                  enquiry.tiers === t
                    ? 'bg-cocoa text-cream-100 border-cocoa shadow-sm'
                    : 'bg-cream-100 border-cocoa-200 text-cocoa hover:bg-cream-200'
                }`}
              >
                {t} Tier{t > 1 ? 's' : ''}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-cocoa uppercase tracking-wider mb-1.5">
            Frosting Theme Palette:
          </label>
          <select
            value={enquiry.themeColor}
            onChange={(e) => onChange({ themeColor: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-cocoa-200 bg-cream-50 text-xs text-cocoa focus:outline-none focus:ring-2 focus:ring-caramel"
          >
            {colors.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Flavour & Dietary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <div>
          <label className="block text-xs font-semibold text-cocoa uppercase tracking-wider mb-1.5">
            Preferred Flavour:
          </label>
          <select
            value={enquiry.flavour}
            onChange={(e) => onChange({ flavour: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-cocoa-200 bg-cream-50 text-xs text-cocoa focus:outline-none focus:ring-2 focus:ring-caramel"
          >
            {flavours.map((fl) => (
              <option key={fl} value={fl}>
                {fl}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-4 sm:pt-6">
          <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-xl bg-cream-50 border border-cocoa-100">
            <input
              type="checkbox"
              checked={enquiry.isEggless}
              onChange={(e) => onChange({ isEggless: e.target.checked })}
              className="w-4 h-4 rounded text-success-600 focus:ring-success-500"
            />
            <span className="text-xs font-semibold text-cocoa">
              100% Pure Eggless / Vegetarian
            </span>
          </label>
        </div>
      </div>

      {/* Message on Cake */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="block text-xs font-semibold text-cocoa uppercase tracking-wider">
            Inscription / Custom Message on Cake:
          </label>
          <span className="text-[10px] text-cocoa-400">
            {enquiry.cakeMessage.length}/35 characters
          </span>
        </div>
        <input
          type="text"
          maxLength={35}
          placeholder="e.g. Happy 25th Maya & Ryan!"
          value={enquiry.cakeMessage}
          onChange={(e) => onChange({ cakeMessage: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-cocoa-200 bg-cream-50 text-xs text-cocoa focus:outline-none focus:ring-2 focus:ring-caramel"
        />
      </div>

      {/* Date & Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-cocoa uppercase tracking-wider mb-1.5">
            Required Date (Min 24h notice):
          </label>
          <input
            type="date"
            min={minDate}
            value={enquiry.preferredDate}
            onChange={(e) => onChange({ preferredDate: e.target.value })}
            className={`w-full px-3.5 py-2.5 rounded-xl border bg-cream-50 text-xs text-cocoa focus:outline-none focus:ring-2 focus:ring-caramel ${
              errors.preferredDate ? 'border-error ring-1 ring-error' : 'border-cocoa-200'
            }`}
          />
          {errors.preferredDate && (
            <p className="text-[11px] text-error mt-1">{errors.preferredDate}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-cocoa uppercase tracking-wider mb-1.5">
            Target Budget:
          </label>
          <select
            value={enquiry.budgetRange}
            onChange={(e) => onChange({ budgetRange: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-cocoa-200 bg-cream-50 text-xs text-cocoa focus:outline-none focus:ring-2 focus:ring-caramel"
          >
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reference Image Upload & Preview */}
      <div>
        <label className="block text-xs font-semibold text-cocoa uppercase tracking-wider mb-1.5">
          Design Reference Image (Optional):
        </label>
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-cocoa-200 bg-cream-50/50">
          <input
            type="file"
            id="ref-image-input"
            accept="image/*"
            onChange={handleImageFileChange}
            className="hidden"
          />
          <label
            htmlFor="ref-image-input"
            className="cursor-pointer px-4 py-2 rounded-xl bg-cocoa text-cream-100 text-xs font-semibold hover:bg-cocoa-500 transition-colors flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5 text-caramel" />
            <span>Upload Reference Photo</span>
          </label>

          {imagePreview ? (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden border border-cocoa-200">
                <img src={imagePreview} alt="Reference preview" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs text-success font-medium flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Ready to share on WhatsApp
              </span>
            </div>
          ) : (
            <span className="text-[11px] text-cocoa-400">
              Attach an Instagram/Pinterest screenshot or share in chat
            </span>
          )}
        </div>
      </div>

      {/* Additional Instructions */}
      <div>
        <label className="block text-xs font-semibold text-cocoa uppercase tracking-wider mb-1.5">
          Special Vision & Custom Requests:
        </label>
        <textarea
          rows={3}
          placeholder="Any specific toppers, fondant figurines, flower types, or dietary allergies..."
          value={enquiry.additionalNotes}
          onChange={(e) => onChange({ additionalNotes: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-cocoa-200 bg-cream-50 text-xs text-cocoa focus:outline-none focus:ring-2 focus:ring-caramel resize-none"
        />
      </div>

      {/* Customer Contact for WhatsApp Inquiry */}
      <div className="pt-4 border-t border-cocoa-100">
        <h3 className="font-serif text-base font-bold text-cocoa mb-3">
          Your Contact Info (For Bakery Direct Coordination):
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-cocoa uppercase tracking-wider mb-1">
              Your Name:
            </label>
            <input
              type="text"
              placeholder="e.g. Sarah Jenkins"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border bg-cream-50 text-xs text-cocoa focus:outline-none focus:ring-2 focus:ring-caramel ${
                errors.name ? 'border-error ring-1 ring-error' : 'border-cocoa-200'
              }`}
            />
            {errors.name && <p className="text-[11px] text-error mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-cocoa uppercase tracking-wider mb-1">
              WhatsApp Phone Number:
            </label>
            <input
              type="tel"
              placeholder="e.g. 9876543210"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border bg-cream-50 text-xs text-cocoa focus:outline-none focus:ring-2 focus:ring-caramel ${
                errors.phone ? 'border-error ring-1 ring-error' : 'border-cocoa-200'
              }`}
            />
            {errors.phone && <p className="text-[11px] text-error mt-1">{errors.phone}</p>}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-2xl bg-success-600 hover:bg-success-700 text-white font-bold text-sm shadow-card flex items-center justify-center gap-2 transition-all active:scale-98"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Inquire & Send Specs via WhatsApp</span>
        </button>

        <div className="flex items-center gap-2 justify-center text-[11px] text-cocoa-400 mt-2.5">
          <AlertCircle className="w-3.5 h-3.5 text-caramel" />
          <span>Bakery will review your specifications and reply with quotation & availability.</span>
        </div>
      </div>
    </form>
  );
};
