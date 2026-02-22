
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
  // New Fields for Material Library Upgrade
  isPremium: boolean;
  availableFor: string[]; // ['tables', 'kitchen', etc.]
  isActive: boolean;
  color?: string; // Hex code or color name
}

export interface LegOption {
  id: string;
  name: string;
  material: 'wood' | 'metal';
  price: number;
  image: string;
  isActive?: boolean;
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
  isActive?: boolean; // Soft delete
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

// --- NEW CONFIGURATOR ARCHITECTURE ---

export type ConfigCategory = 'tables' | 'kitchen' | 'washbasin' | 'console' | 'coffee-corner';

export interface DimensionRule {
  min: number;
  max: number;
  default: number;
  step: number;
  unit: string;
  label: string;
  isEnabled: boolean;
}

export interface PricingRule {
  baseFee: number;
  areaRate: number; // Price per unit (m2 or cm)
  formula: string; // e.g. "BASE + (L*W * MARBLE_RATE) + LEGS"
}

export interface LogicRule {
  id: string;
  conditionField: string; // e.g., 'shape', 'length'
  operator: 'equals' | 'greater_than' | 'less_than';
  value: string | number;
  action: 'hide_field' | 'add_price' | 'show_warning' | 'disable_option';
  actionTarget: string; // e.g., 'width', 'wireless_charger'
}

export interface ConfiguratorSettings {
  id: ConfigCategory;
  name: string;
  isActive: boolean;
  dimensions: {
    length: DimensionRule;
    width: DimensionRule;
    height: DimensionRule;
    depth?: DimensionRule;
  };
  pricing: PricingRule;
  rules: LogicRule[];
  allowedShapes: string[]; // 'rectangle', 'circle', etc.
  allowedLegs: string[]; // IDs of legs
  allowedMaterials?: string[]; // IDs of allowed materials (marbles or kitchen samples)
  extraOptions: { id: string; name: string; price: number; isActive: boolean }[];
}

// --- SYSTEM TYPES ---

export interface AuditLogEntry {
  id: string;
  action: string; // CREATE, UPDATE, DELETE, LOGIN
  user: string;
  timestamp: string;
  details: string;
}

export type UserRole = 'admin' | 'editor' | 'sales';

export interface KitchenSample {
  id: string;
  name: string;
  image: string;
  color?: string; // Hex code or color name
}

export interface SurfaceType {
  id: string;
  name: string;
  description?: string;
  priceMultiplier: number;
  image?: string;
}

export interface ExecutionDetail {
  id: string;
  title: string;
  description?: string;
  price?: number;
}

export interface DesignStepOption {
  label: string;
  value: string;
  image?: string;
}

export interface DesignStep {
  id: string;
  title: string;
  type: 'select' | 'radio' | 'checkbox' | 'dimensions' | 'marble_select';
  options?: DesignStepOption[];
}

export interface DesignCategory {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  steps?: DesignStep[];
  isActive?: boolean;
}

export interface SiteSettings {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  instagramUrl?: string;
  facebookUrl?: string;
  address: string;
  currency: string;
  taxRate: number;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}
