export type BrandSlug = 'hollywood_buds' | 'high_threaded' | 'nft_joint';
export type ProductType = 'cannabis' | 'apparel' | 'nft';
export type ProductStatus = 'active' | 'draft' | 'archived';

export interface Brand {
  slug: BrandSlug;
  name: string;
  tagline: string | null;
  description: string | null;
  accent_color: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  brand: BrandSlug;
  type: ProductType;
  description: string | null;
  qr_slug: string;
  media_url: string | null;
  metadata: Record<string, unknown>;
  status: ProductStatus;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      brands: {
        Row: Brand;
        Insert: Partial<Brand> & Pick<Brand, 'slug' | 'name'>;
        Update: Partial<Brand>;
      };
      products: {
        Row: Product;
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'> &
          Partial<Pick<Product, 'id' | 'created_at' | 'updated_at'>>;
        Update: Partial<Product>;
      };
      scan_events: {
        Row: {
          id: string;
          product_id: string | null;
          qr_slug: string;
          user_agent: string | null;
          referrer: string | null;
          country: string | null;
          created_at: string;
        };
        Insert: {
          product_id?: string | null;
          qr_slug: string;
          user_agent?: string | null;
          referrer?: string | null;
          country?: string | null;
        };
        Update: Partial<{
          product_id: string | null;
          qr_slug: string;
          user_agent: string | null;
          referrer: string | null;
          country: string | null;
        }>;
      };
    };
  };
}
