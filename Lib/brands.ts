import type { BrandSlug, ProductType } from '@/types';

interface BrandTheme {
  slug: BrandSlug;
  name: string;
  short: string;
  tagline: string;
  accent: string;
  accentText: string;
  badgeClass: string;
  ringClass: string;
}

export const BRANDS: Record<BrandSlug, BrandTheme> = {
  hollywood_buds: {
    slug: 'hollywood_buds',
    name: 'Hollywood Buds',
    short: 'HB',
    tagline: 'Cultivated. Curated. Documented.',
    accent: '#1F3A2B',
    accentText: 'text-paper',
    badgeClass: 'bg-buds text-paper',
    ringClass: 'ring-buds/30',
  },
  high_threaded: {
    slug: 'high_threaded',
    name: 'High Threaded',
    short: 'HT',
    tagline: 'Garments with provenance.',
    accent: '#1A1A1C',
    accentText: 'text-paper',
    badgeClass: 'bg-thread text-paper',
    ringClass: 'ring-thread/30',
  },
  nft_joint: {
    slug: 'nft_joint',
    name: 'NFT Joint',
    short: 'NJ',
    tagline: 'Where physical meets on-chain.',
    accent: '#2742FF',
    accentText: 'text-paper',
    badgeClass: 'bg-nft text-paper',
    ringClass: 'ring-nft/30',
  },
};

export const PRODUCT_TYPE_LABEL: Record<ProductType, string> = {
  cannabis: 'Cannabis',
  apparel: 'Apparel',
  nft: 'Digital Asset',
};

export const PRIMARY_METADATA_FIELDS: Record<ProductType, string[]> = {
  cannabis: ['strain', 'lineage', 'thc', 'cbd', 'batch', 'harvest_date', 'lab', 'lab_panel_id'],
  apparel: ['material', 'weight_gsm', 'weight_oz', 'made_in', 'edition', 'colorway', 'care'],
  nft: ['chain', 'standard', 'contract', 'token_id', 'mint_date'],
};

export function brandFor(slug: BrandSlug): BrandTheme {
  return BRANDS[slug];
}

export function humanizeKey(key: string): string {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\bThc\b/g, 'THC').replace(/\bCbd\b/g, 'CBD').replace(/\bId\b/g, 'ID');
}

export function formatValue(value: unknown): string {
  if (value === null || value === undefined) return '—';
  if (Array.isArray(value)) return value.map((v) => humanizeKey(String(v))).join(', ');
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

export function shorten(input: string, head = 6, tail = 4): string {
  if (input.length <= head + tail + 2) return input;
  return `${input.slice(0, head)}…${input.slice(-tail)}`;
}
