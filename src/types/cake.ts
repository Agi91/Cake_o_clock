export type CakeCategorySlug = 
  | 'trending'
  | 'bestsellers'
  | 'birthday'
  | 'chocolate'
  | 'eggless'
  | 'anniversary'
  | 'custom'
  | 'bento'
  | 'cupcakes';

export type CakeFlavour = 
  | 'Rich Belgian Chocolate'
  | 'Dutch Truffle'
  | 'Classic Red Velvet'
  | 'Fresh Whipped Pineapple'
  | 'Lotus Biscoff Crunch'
  | 'Caramel Butterscotch'
  | 'Fresh Berry Cheesecake'
  | 'Vanilla Madagascar Bean'
  | 'Nutella Ferrero Rocher'
  | 'Black Forest Classic';

export interface CakeWeightOption {
  weight: string; // e.g. "0.5 kg", "1 kg", "1.5 kg", "2 kg"
  priceMultiplier: number; // e.g. 1, 1.85, 2.7, 3.5
  servings: string; // e.g. "Serves 4-6"
}

export interface CakeAddOn {
  id: string;
  name: string;
  price: number;
  category: 'topper' | 'candle' | 'card' | 'sweet';
  image: string;
}

export interface Cake {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  basePrice: number; // For standard 0.5 kg size
  images: string[];
  primaryCategory: CakeCategorySlug;
  categories: CakeCategorySlug[];
  flavours: CakeFlavour[];
  defaultFlavour: CakeFlavour;
  isEgglessByDefault: boolean;
  canBeEggless: boolean;
  egglessSurcharge: number; // e.g., 0 or 50
  rating?: number; // Only if genuine data is available or omitted
  reviewCount?: number;
  isBestseller?: boolean;
  isTrending?: boolean;
  isCakeOfTheDay?: boolean;
  discountPercentage?: number;
  leadTimeHours: number; // e.g. 4 for standard, 24 for custom
  availableWeights: CakeWeightOption[];
  ingredientsSummary?: string;
  dietaryBadges: ('100% Eggless' | 'Contains Egg' | 'Gluten-Free Available' | 'Nut Free')[];
}

export interface CategoryInfo {
  id: CakeCategorySlug;
  name: string;
  title: string;
  description: string;
  badge: string;
  iconName: string;
}
