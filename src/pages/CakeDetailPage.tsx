import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShoppingBag, 
  MessageCircle, 
  Heart, 
  Clock, 
  Check, 
  Plus, 
  Minus, 
  Sparkles,
  ShieldCheck,
  Share2
} from 'lucide-react';
import { CAKES } from '../data/cakes';
import { CAKE_ADDONS } from '../data/addons';
import { CakeAddOn, CakeFlavour, CakeWeightOption } from '../types/cake';
import { SelectedAddOn } from '../types/cart';
import { calculateCakeUnitPrice, calculateAddOnsUnitPrice, formatPrice } from '../lib/pricing';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Badge } from '../components/common/Badge';
import { CakeCard } from '../components/product/CakeCard';
import { BUSINESS_CONFIG } from '../config/business';

export const CakeDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  // Find cake by slug
  const cake = CAKES.find((c) => c.slug === slug);

  // If not found, fallback to first cake or 404
  if (!cake) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <h2 className="font-serif text-2xl font-bold text-cocoa mb-2">Cake Not Found</h2>
        <p className="text-xs text-cocoa-400 mb-6">The requested cake confections could not be located.</p>
        <Link to="/explore" className="px-5 py-2.5 bg-cocoa text-cream-100 rounded-xl text-xs font-semibold">
          Browse All Cakes
        </Link>
      </div>
    );
  }

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState<CakeWeightOption>(cake.availableWeights[0]);
  const [selectedFlavour, setSelectedFlavour] = useState<CakeFlavour>(cake.defaultFlavour);
  const [isEggless, setIsEggless] = useState<boolean>(cake.isEgglessByDefault);
  const [cakeMessage, setCakeMessage] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedAddOns, setSelectedAddOns] = useState<SelectedAddOn[]>([]);
  const [addedToast, setAddedToast] = useState(false);

  // Pricing calculations
  const unitCakePrice = calculateCakeUnitPrice(cake, selectedWeight, isEggless);
  const addOnsTotal = calculateAddOnsUnitPrice(selectedAddOns);
  const grandTotal = (unitCakePrice + addOnsTotal) * quantity;

  // Add-on toggle handler
  const handleToggleAddOn = (addOn: CakeAddOn) => {
    setSelectedAddOns((prev) => {
      const exists = prev.find((a) => a.addOn.id === addOn.id);
      if (exists) {
        return prev.filter((a) => a.addOn.id !== addOn.id);
      } else {
        return [...prev, { addOn, quantity: 1 }];
      }
    });
  };

  const handleAddOnQtyChange = (addOnId: string, delta: number) => {
    setSelectedAddOns((prev) =>
      prev
        .map((item) => {
          if (item.addOn.id === addOnId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as SelectedAddOn[]
    );
  };

  const handleAddToCart = () => {
    addToCart({
      cake,
      selectedWeight,
      selectedFlavour,
      isEggless,
      cakeMessage,
      selectedAddOns,
      specialInstructions,
      quantity,
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  // Direct WhatsApp Quick Order
  const handleWhatsAppQuickOrder = () => {
    const lines = [
      `🎂 *DIRECT CAKE INQUIRY — ${BUSINESS_CONFIG.brandName}*`,
      `*Product:* ${cake.name}`,
      `*Weight / Size:* ${selectedWeight.weight} (${selectedWeight.servings})`,
      `*Flavour:* ${selectedFlavour}`,
      `*Dietary:* ${isEggless ? '100% Eggless' : 'Contains Egg'}`,
      cakeMessage.trim() ? `*Message on Cake:* "${cakeMessage.trim()}"` : null,
      selectedAddOns.length > 0
        ? `*Add-ons:* ${selectedAddOns.map((a) => `${a.addOn.name} (x${a.quantity})`).join(', ')}`
        : null,
      `*Quantity:* ${quantity}`,
      `*Estimated Price:* ${formatPrice(grandTotal)}`,
      `----------------------------------------`,
      `Hi! Is this cake available for delivery or pickup? Please advise availability.`,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  // Related cakes in same category
  const relatedCakes = useMemo(() => {
    return CAKES.filter(
      (c) => c.id !== cake.id && (c.primaryCategory === cake.primaryCategory || c.categories.some((cat) => cake.categories.includes(cat)))
    ).slice(0, 4);
  }, [cake]);

  return (
    <div className="py-8 min-h-screen">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cocoa-500 hover:text-cocoa transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            onClick={() => toggleWishlist(cake.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isWishlisted(cake.id)
                ? 'bg-rose text-cocoa'
                : 'bg-white border border-cocoa-200 text-cocoa-500 hover:text-cocoa'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted(cake.id) ? 'fill-current' : ''}`} />
            <span>{isWishlisted(cake.id) ? 'Saved to Wishlist' : 'Save'}</span>
          </button>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* Left Column: Gallery & Thumbnails */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden bg-cream-200 border border-cocoa-100 shadow-card">
              <img
                src={cake.images[selectedImageIndex] || cake.images[0]}
                alt={`${cake.name} - View ${selectedImageIndex + 1}`}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* Dietary Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {cake.isEgglessByDefault && (
                  <Badge type="eggless" text="100% Eggless" className="shadow-sm" />
                )}
                {cake.isBestseller && (
                  <Badge type="bestseller" text="Bestseller" className="shadow-sm" />
                )}
                {cake.isTrending && (
                  <Badge type="trending" text="Trending" className="shadow-sm" />
                )}
              </div>
            </div>

            {/* Thumbnail switcher if multiple images exist */}
            {cake.images.length > 1 && (
              <div className="flex items-center gap-3">
                {cake.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-cocoa ring-2 ring-caramel/40 scale-105 shadow-sm'
                        : 'border-cocoa-100 hover:border-cocoa-300 opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Ingredients & Dietary Transparency Card */}
            <div className="p-5 rounded-2xl bg-white border border-cocoa-100/80 shadow-soft space-y-3">
              <h4 className="font-serif text-sm font-bold text-cocoa flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-caramel" />
                <span>Ingredients & Dietary Standards</span>
              </h4>
              <p className="text-xs text-cocoa-500 leading-relaxed">
                {cake.ingredientsSummary || 'Baked with pure European dairy butter, imported Belgian cocoa, and natural flavorings. Zero artificial preservatives.'}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {cake.dietaryBadges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-cream-100 border border-cocoa-100 text-[10px] font-semibold text-cocoa-600"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Customization & Ordering Form */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-caramel-600 font-bold uppercase tracking-wider mb-1.5">
                <span>{cake.primaryCategory}</span>
                <span className="flex items-center gap-1 text-cocoa-400 font-normal">
                  <Clock className="w-3.5 h-3.5 text-caramel" />
                  {cake.leadTimeHours} Hours Lead Time
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-cocoa leading-tight mb-2">
                {cake.name}
              </h1>

              <p className="text-sm text-cocoa-500 leading-relaxed font-light mb-4">
                {cake.description}
              </p>

              {/* Dynamic Live Price Display */}
              <div className="p-4 rounded-2xl bg-cream-100/80 border border-cocoa-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-cocoa-400 font-semibold">
                    Current Configured Price
                  </div>
                  <div className="text-3xl font-extrabold text-cocoa">
                    {formatPrice(grandTotal)}
                  </div>
                </div>
                <div className="text-right text-[11px] text-cocoa-400">
                  <div>Unit: {formatPrice(unitCakePrice)}</div>
                  {addOnsTotal > 0 && <div>Add-ons: +{formatPrice(addOnsTotal)}</div>}
                </div>
              </div>
            </div>

            {/* 1. Size / Weight Selector */}
            <div>
              <label className="block text-xs font-bold text-cocoa uppercase tracking-wider mb-2">
                1. Select Weight / Servings:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {cake.availableWeights.map((w) => {
                  const isSelected = selectedWeight.weight === w.weight;
                  return (
                    <button
                      key={w.weight}
                      type="button"
                      onClick={() => setSelectedWeight(w)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        isSelected
                          ? 'border-cocoa bg-cream-200 ring-2 ring-cocoa/20 font-bold'
                          : 'border-cocoa-100 bg-white hover:border-cocoa-300'
                      }`}
                    >
                      <div className="text-xs font-bold text-cocoa">{w.weight}</div>
                      <div className="text-[10px] text-cocoa-400 mt-0.5">{w.servings}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Flavour Selector */}
            {cake.flavours.length > 1 && (
              <div>
                <label className="block text-xs font-bold text-cocoa uppercase tracking-wider mb-2">
                  2. Choose Flavor Profile:
                </label>
                <div className="flex flex-wrap gap-2">
                  {cake.flavours.map((fl) => (
                    <button
                      key={fl}
                      type="button"
                      onClick={() => setSelectedFlavour(fl)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                        selectedFlavour === fl
                          ? 'bg-cocoa text-cream-100 shadow-sm'
                          : 'bg-white border border-cocoa-200 text-cocoa hover:bg-cream-100'
                      }`}
                    >
                      {fl}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Eggless Preference */}
            {cake.canBeEggless && !cake.isEgglessByDefault && (
              <div className="p-3.5 rounded-2xl bg-white border border-cocoa-100">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-success-600 rounded-sm flex items-center justify-center p-[1px]">
                      <span className="w-1.5 h-1.5 bg-success-600 rounded-full"></span>
                    </span>
                    <span className="text-xs font-bold text-cocoa">
                      Make 100% Eggless
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-cocoa-400">+{formatPrice(cake.egglessSurcharge)}</span>
                    <input
                      type="checkbox"
                      checked={isEggless}
                      onChange={(e) => setIsEggless(e.target.checked)}
                      className="w-4 h-4 rounded text-success-600 focus:ring-success-500"
                    />
                  </div>
                </label>
              </div>
            )}

            {/* 4. Message on Cake */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-cocoa uppercase tracking-wider">
                  3. Inscription / Message on Cake (Complimentary):
                </label>
                <span className="text-[10px] text-cocoa-400">
                  {cakeMessage.length}/30 characters
                </span>
              </div>
              <input
                type="text"
                maxLength={30}
                placeholder="e.g. Happy Birthday Arjun!"
                value={cakeMessage}
                onChange={(e) => setCakeMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-cocoa-200 bg-white text-xs text-cocoa focus:outline-none focus:ring-2 focus:ring-caramel"
              />
              {cakeMessage && (
                <p className="text-[11px] text-cocoa-400 mt-1 italic">
                  Live Preview: Will be hand-piped on board as "{cakeMessage}"
                </p>
              )}
            </div>

            {/* 5. Celebratory Add-Ons */}
            <div>
              <label className="block text-xs font-bold text-cocoa uppercase tracking-wider mb-2">
                4. Celebratory Add-ons (Optional):
              </label>
              <div className="space-y-2">
                {CAKE_ADDONS.map((addOn) => {
                  const selected = selectedAddOns.find((a) => a.addOn.id === addOn.id);
                  return (
                    <div
                      key={addOn.id}
                      className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        selected
                          ? 'border-caramel bg-cream-100/90'
                          : 'border-cocoa-100 bg-white hover:border-cocoa-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={addOn.image}
                          alt={addOn.name}
                          className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-cocoa truncate">
                            {addOn.name}
                          </div>
                          <div className="text-xs font-bold text-caramel-600">
                            +{formatPrice(addOn.price)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {selected ? (
                          <div className="flex items-center border border-cocoa-200 rounded-lg bg-white overflow-hidden">
                            <button
                              type="button"
                              onClick={() => handleAddOnQtyChange(addOn.id, -1)}
                              className="px-2 py-1 text-cocoa hover:bg-cream-200"
                              aria-label="Decrease add-on quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 py-0.5 text-xs font-bold text-cocoa">
                              {selected.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleAddOnQtyChange(addOn.id, 1)}
                              className="px-2 py-1 text-cocoa hover:bg-cream-200"
                              aria-label="Increase add-on quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleToggleAddOn(addOn)}
                            className="px-3 py-1.5 rounded-xl border border-cocoa-200 text-xs font-semibold text-cocoa hover:bg-cream-200 transition-colors"
                          >
                            + Add
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="pt-4 border-t border-cocoa-100 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cocoa uppercase tracking-wider">
                  Quantity:
                </span>
                <div className="flex items-center border border-cocoa-200 rounded-xl bg-white overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-cocoa hover:bg-cream-200 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-1 text-sm font-bold text-cocoa">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-cocoa hover:bg-cream-200 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-4 rounded-2xl bg-cocoa hover:bg-cocoa-500 text-cream-100 font-bold text-sm shadow-card flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 text-caramel" />
                  <span>{addedToast ? 'Added to Cart!' : 'Add to Cart'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppQuickOrder}
                  className="w-full py-4 rounded-2xl bg-success-600 hover:bg-success-700 text-white font-bold text-sm shadow-card flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                </button>
              </div>

              <div className="text-[11px] text-center text-cocoa-400">
                Opening WhatsApp lets you coordinate delivery address & slot directly with the bakery.
              </div>
            </div>

          </div>

        </div>

        {/* Related Cakes Section */}
        {relatedCakes.length > 0 && (
          <div className="border-t border-cocoa-100 pt-12">
            <h3 className="font-serif text-2xl font-bold text-cocoa mb-6">
              You Might Also Crave
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedCakes.map((relCake) => (
                <CakeCard key={relCake.id} cake={relCake} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
