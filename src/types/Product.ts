export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  colors: string[];
  sizes: string[];
  description: string;
  inStock: boolean;
  fastDelivery: boolean;
  rating: number;
  reviews: number;
}

export interface Filters {
  brands: string[];
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
  fastDeliveryOnly: boolean;
  inStockOnly: boolean;
}

export interface AISearchResult {
  query: string;
  detectedCategory?: string;
  detectedBrand?: string;
  detectedColors?: string[];
  detectedSizes?: string[];
  detectedPriceRange?: [number, number];
  confidence: number;
  explanation: string;
  refinementChips: RefinementChip[];
}

export interface RefinementChip {
  id: string;
  label: string;
  type: 'budget' | 'color' | 'size' | 'delivery' | 'brand';
  filters: Partial<Filters>;
}

export interface AmbiguityChoice {
  id: string;
  label: string;
  description: string;
  filters: Partial<Filters>;
}