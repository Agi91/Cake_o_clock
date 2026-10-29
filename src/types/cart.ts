import { Cake, CakeAddOn, CakeFlavour, CakeWeightOption } from './cake';

export interface SelectedAddOn {
  addOn: CakeAddOn;
  quantity: number;
}

export interface CartItem {
  id: string; // Unique cart item ID (hash of product ID + options)
  cake: Cake;
  selectedWeight: CakeWeightOption;
  selectedFlavour: CakeFlavour;
  isEggless: boolean;
  cakeMessage: string;
  selectedAddOns: SelectedAddOn[];
  specialInstructions?: string;
  quantity: number;
  calculatedUnitPrice: number; // Price for 1 unit of this configured cake (including weight & eggless, excluding add-ons)
  calculatedAddOnsTotal: number; // Total for add-ons in 1 unit
  totalPrice: number; // (calculatedUnitPrice + calculatedAddOnsTotal) * quantity
}

export interface CustomCakeEnquiry {
  occasion: string;
  servings: string;
  flavour: string;
  isEggless: boolean;
  tiers: number;
  cakeMessage: string;
  preferredDate: string;
  budgetRange: string;
  referenceImageUrl?: string;
  themeColor: string;
  additionalNotes: string;
}
