import assert from 'node:assert';
import { CAKES } from './src/data/cakes.ts';
import { CATEGORIES } from './src/data/categories.ts';
import { CAKE_ADDONS } from './src/data/addons.ts';
import { FAQS } from './src/data/faqs.ts';
import { BUSINESS_CONFIG } from './src/config/business.ts';
import { 
  calculateCakeUnitPrice, 
  calculateAddOnsUnitPrice, 
  recalculateCartItem, 
  calculateOrderSummary 
} from './src/lib/pricing.ts';
import { 
  generateCartWhatsAppUrl, 
  generateCustomCakeWhatsAppUrl 
} from './src/lib/whatsapp.ts';
import { 
  validateCheckoutForm, 
  validateCustomCakeEnquiry 
} from './src/lib/validation.ts';

console.log('--- STARTING COMPREHENSIVE CAKE O CLOCK TEST SUITE ---');

// 1. CATALOGUE INTEGRITY TESTS
console.log('Test 1: Catalogue & Categories Integrity...');
assert(CAKES.length >= 12, `Expected at least 12 cakes, got ${CAKES.length}`);
assert(CATEGORIES.length >= 8, `Expected at least 8 categories, got ${CATEGORIES.length}`);
assert(CAKE_ADDONS.length >= 4, `Expected at least 4 add-ons, got ${CAKE_ADDONS.length}`);
assert(FAQS.length >= 5, `Expected at least 5 FAQs, got ${FAQS.length}`);

CAKES.forEach((cake) => {
  assert(cake.id, 'Cake missing ID');
  assert(cake.slug, `Cake ${cake.id} missing slug`);
  assert(cake.name, `Cake ${cake.id} missing name`);
  assert(cake.basePrice > 0, `Cake ${cake.name} must have positive basePrice`);
  assert(cake.images.length > 0, `Cake ${cake.name} must have images`);
  assert(cake.availableWeights.length > 0, `Cake ${cake.name} must have weights`);
  assert(cake.flavours.length > 0, `Cake ${cake.name} must have flavours`);
  assert(cake.categories.length > 0, `Cake ${cake.name} must belong to categories`);
});
console.log('✓ Catalogue integrity verified for all 15+ cakes.');

// 2. PRICING & RECALCULATION TESTS
console.log('Test 2: Pricing Recalculation Engine...');
const truffleCake = CAKES.find(c => c.slug === 'belgian-dark-chocolate-truffle');
assert(truffleCake, 'Belgian truffle cake must exist');

// 0.5 kg (multiplier 1.0)
const priceHalfKg = calculateCakeUnitPrice(truffleCake, truffleCake.availableWeights[0], true);
assert.strictEqual(priceHalfKg, 599, '0.5kg truffle cake should be ₹599');

// 1.0 kg (multiplier 1.85 => 599 * 1.85 = 1108)
const priceOneKg = calculateCakeUnitPrice(truffleCake, truffleCake.availableWeights[1], true);
assert.strictEqual(priceOneKg, 1108, '1.0kg truffle cake should be ₹1108');

// Add-ons total
const testAddOns = [
  { addOn: CAKE_ADDONS[0], quantity: 1 }, // 99
  { addOn: CAKE_ADDONS[1], quantity: 2 }, // 79 * 2 = 158
];
const addOnsTotal = calculateAddOnsUnitPrice(testAddOns);
assert.strictEqual(addOnsTotal, 99 + 158, 'Add-ons total should be 257');

// Cart item recalculation protection against client tampering
const tamperedItem = {
  id: 'tampered-1',
  cake: truffleCake,
  selectedWeight: truffleCake.availableWeights[1],
  selectedFlavour: truffleCake.defaultFlavour,
  isEggless: true,
  cakeMessage: 'Happy 30th!',
  selectedAddOns: testAddOns,
  quantity: 2,
  calculatedUnitPrice: 10, // Tampered fake price!
  calculatedAddOnsTotal: 5, // Tampered fake price!
  totalPrice: 15,          // Tampered fake price!
};

const sanitized = recalculateCartItem(tamperedItem, truffleCake);
assert.strictEqual(sanitized.calculatedUnitPrice, 1108, 'Tampered price must be overwritten by trusted rate');
assert.strictEqual(sanitized.calculatedAddOnsTotal, 257, 'Addons total must be recalculated accurately');
assert.strictEqual(sanitized.totalPrice, (1108 + 257) * 2, 'Total price must be (1108 + 257) * 2 = 2730');
console.log('✓ Pricing recalculation & tamper protection verified.');

// 3. ORDER SUMMARY & THRESHOLD TESTS
console.log('Test 3: Order Summary & Delivery Calculations...');
const singleItemCart = [{ ...sanitized, quantity: 1, totalPrice: 599 }];
const summaryUnderThreshold = calculateOrderSummary(singleItemCart, 'delivery');
assert.strictEqual(summaryUnderThreshold.subtotal, 599);
assert.strictEqual(summaryUnderThreshold.deliveryFee, BUSINESS_CONFIG.orderingPolicies.deliveryFeeEstimate);
assert.strictEqual(summaryUnderThreshold.estimatedTotal, 599 + 80);

const highValueCart = [{ ...sanitized, quantity: 2, totalPrice: 2000 }];
const summaryOverThreshold = calculateOrderSummary(highValueCart, 'delivery');
assert.strictEqual(summaryOverThreshold.subtotal, 2000);
assert.strictEqual(summaryOverThreshold.deliveryFee, 0, 'Orders over threshold should get free delivery');

const pickupSummary = calculateOrderSummary(singleItemCart, 'pickup');
assert.strictEqual(pickupSummary.deliveryFee, 0, 'Pickup orders have 0 delivery fee');
console.log('✓ Order summary & delivery fee thresholds verified.');

// 4. WHATSAPP ENCODED MESSAGE GENERATOR TESTS
console.log('Test 4: WhatsApp Message Generation & Encoding...');
const mockCustomer = {
  customerName: 'Aarav Patel',
  phoneNumber: '9876543210',
  deliveryMethod: 'delivery',
  deliveryAddress: 'Flat 304, Emerald Heights, MG Road',
  landmark: 'Near Metro Gate 2',
  pincode: '560001',
  preferredDate: '2026-11-01',
  preferredTimeSlot: '4:00 PM – 7:00 PM',
  customerNotes: 'Please ring bell twice',
};

const whatsappUrl = generateCartWhatsAppUrl(summaryUnderThreshold, mockCustomer);
assert(whatsappUrl.startsWith(`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=`), 'Must target business WhatsApp number');

const decodedMessage = decodeURIComponent(whatsappUrl.split('?text=')[1]);
assert(decodedMessage.includes('Aarav Patel'), 'Decoded message must contain customer name');
assert(decodedMessage.includes('9876543210'), 'Decoded message must contain customer phone');
assert(decodedMessage.includes('Emerald Heights'), 'Decoded message must contain delivery address');
assert(decodedMessage.includes('Belgian Dark Chocolate Truffle'), 'Decoded message must list cake name');
assert(decodedMessage.includes('Happy 30th!'), 'Decoded message must preserve inscription');
assert(decodedMessage.includes('Estimated Total: ₹679'), 'Decoded message must state estimated total');
assert(decodedMessage.includes('Notice:'), 'Decoded message must contain confirmation notice');
console.log('✓ Cart WhatsApp message generator fully verified.');

// 5. CUSTOM CAKE STUDIO INQUIRY TESTS
console.log('Test 5: Custom Cake Studio WhatsApp Message...');
const mockEnquiry = {
  occasion: 'Silver Jubilee 25th Anniversary',
  servings: '30–35 Guests (2 Tiers)',
  flavour: 'Classic Red Velvet',
  isEggless: true,
  tiers: 2,
  cakeMessage: 'Together Forever Maya & Dev',
  preferredDate: '2026-11-15',
  budgetRange: '₹3,500 – ₹6,000',
  themeColor: 'Vintage Cream',
  referenceImageUrl: 'Uploaded design photo attached',
  additionalNotes: 'Need metallic edible gold leaf on tier 1',
};

const customWhatsAppUrl = generateCustomCakeWhatsAppUrl(mockEnquiry, 'Dev Roy', '9876501234');
const decodedCustom = decodeURIComponent(customWhatsAppUrl.split('?text=')[1]);
assert(decodedCustom.includes('CUSTOM CAKE ENQUIRY'), 'Must identify as custom cake enquiry');
assert(decodedCustom.includes('Silver Jubilee'), 'Must contain occasion');
assert(decodedCustom.includes('2 Tier(s)'), 'Must contain tiers');
assert(decodedCustom.includes('Together Forever'), 'Must contain inscription');
assert(decodedCustom.includes('edible gold leaf'), 'Must contain additional notes');
console.log('✓ Custom Studio WhatsApp message generator verified.');

// 6. FORM VALIDATION TESTS
console.log('Test 6: Form Validation Logic...');
const invalidForm = {
  customerName: '',
  phoneNumber: '123',
  deliveryMethod: 'delivery',
  deliveryAddress: '',
  landmark: '',
  pincode: '',
  preferredDate: '',
  preferredTimeSlot: '',
  customerNotes: '',
};

const resInvalid = validateCheckoutForm(invalidForm);
assert.strictEqual(resInvalid.isValid, false, 'Incomplete form must be invalid');
assert(resInvalid.errors.customerName, 'Must flag missing name');
assert(resInvalid.errors.phoneNumber, 'Must flag invalid phone');
assert(resInvalid.errors.deliveryAddress, 'Must flag missing address for delivery');
assert(resInvalid.errors.preferredDate, 'Must flag missing date');

const validPickupForm = {
  ...mockCustomer,
  deliveryMethod: 'pickup',
  deliveryAddress: '', // Allowed when pickup
};
const resPickup = validateCheckoutForm(validPickupForm);
assert.strictEqual(resPickup.isValid, true, 'Valid pickup form must pass without delivery address');

console.log('✓ Form validation tests passed.');
console.log('\nALL 6 AUTOMATED VERIFICATION SUITES PASSED FLAWLESSLY (100% SUCCESS)!');
