// ===================================
// Address & Location Types (JSON Fields)
// ===================================

export interface Address {
  address_line1?: string;
  address_line2?: string;
  street?: string;
  landmark?: string;
  sub_district?: string;
  city?: string;
  district?: string;
  state?: string;
  postal_code?: string;
  country?: string;
}

export interface Location {
  latitude?: number;
  longitude?: number;
}

// ===================================
// Main Vyapari Business Interface
// Matches backend: backend/vyapari/models.py
// ===================================

export interface Vyapari {
  id: number;
  name: string;
  short_description?: string | null;
  long_description?: string | null;
  logo?: string | null;
  cover_image?: string | null;
  business_type: string;
  category?: number | null; // ForeignKey to Category
  subcategory?: number | null; // ForeignKey to SubCategory
  email?: string | null;
  phone: string;
  owner?: string | null;
  employee_count?: number | null;
  insta_url?: string | null;
  facebook_url?: string | null;
  website_url?: string | null;
  address: Address; // JSONField
  location: Location; // JSONField
  is_verified: boolean;
  is_blocked: boolean;
  date_joined: string; // ISO datetime string
}

// Extended Vyapari with populated category data
export interface VyapariWithCategory extends Vyapari {
  category_data?: Category;
  subcategory_data?: SubCategory;
}

// ===================================
// Category Interface
// Matches backend: backend/vyapari/models.py
// ===================================

export interface Category {
  id: number;
  name: string;
  image?: string | null; // ImageField URL
  description?: string | null;
}

// ===================================
// SubCategory Interface
// Matches backend: backend/vyapari/models.py
// ===================================

export interface SubCategory {
  id: number;
  category: number; // ForeignKey to Category
  name: string;
  image?: string | null; // ImageField URL
  description?: string | null;
}

// Extended SubCategory with populated category
export interface SubCategoryWithCategory extends SubCategory {
  category_data?: Category;
}

export interface VyapariListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Vyapari[];
}

export interface CategoryListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Category[];
}
