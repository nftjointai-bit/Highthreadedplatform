import { createSupabaseServerClient } from './server';
import type { Brand, BrandSlug, Product } from '@/types';

export async function getAllBrands(): Promise<Brand[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .order('name');

  if (error) {
    console.error('[getAllBrands]', error);
    return [];
  }
  return data ?? [];
}

export async function getBrand(slug: BrandSlug): Promise<Brand | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('[getBrand]', error);
    return null;
  }
  return data;
}

export async function getProductBySlug(qrSlug: string): Promise<Product | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('qr_slug', qrSlug)
    .eq('status', 'active')
    .maybeSingle();

  if (error) {
    console.error('[getProductBySlug]', error);
    return null;
  }
  return data;
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[getFeaturedProducts]', error);
    return [];
  }
  return data ?? [];
}

export async function getProductsByBrand(brand: BrandSlug, limit = 12): Promise<Product[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'active')
    .eq('brand', brand)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[getProductsByBrand]', error);
    return [];
  }
  return data ?? [];
}

export async function logScanEvent(input: {
  productId: string | null;
  qrSlug: string;
  userAgent?: string | null;
  referrer?: string | null;
}): Promise<void> {
  const supabase = createSupabaseServerClient();
  await supabase.from('scan_events').insert({
    product_id: input.productId,
    qr_slug: input.qrSlug,
    user_agent: input.userAgent ?? null,
    referrer: input.referrer ?? null,
  });
}
