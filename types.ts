export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface MarbleType {
  id: string;
  name: string;
  description: string;
  priceMultiplier: number;
  image: string;
  origin: string;
}

export interface LegOption {
  id: string;
  name: string;
  material: 'wood' | 'metal';
  price: number;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  discountPercentage?: number;
  sizes?: string[];
  reviews?: Review[];
}

export interface CartItem {
  id: string;
  name: string;
  details: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Project {
  id: string;
  title: string;
  category: 'kitchen' | 'washbasin' | 'console' | 'tables' | 'coffee-table' | 'dining-table' | 'other';
  image: string;
}