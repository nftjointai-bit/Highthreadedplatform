import Link from 'next/link';
import { brandFor } from '@/lib/brands';
import type { Brand, Product } from '@/types';
import ProductCard from './ProductCard';

interface BrandSectionProps {
  brand: Brand;
  products: Product[];
  index: number;
}

export default function BrandSection({ brand, products, index }: BrandSectionProps) {
  const theme = brandFor(brand.slug);

  return (
    <section className="rule-t py-14 sm:py-20">
      {/* Header row */}
      <div className="grid gap-6 sm:grid-cols-12 sm:gap-8">
        <div className="sm:col-span-4">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-hairline text-ink-mute">
              {String(index + 1).padStart(2, '0')} / Brand
            </span>
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: theme.accent }}
            />
          </div>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
            {brand.name}
          </h2>
          <p className="mt-2 font-display italic text-ink-soft">
            {brand.tagline ?? theme.tagline}
          </p>
        </div>
        <div className="sm:col-span-7 sm:col-start-6">
          <p className="text-ink-soft sm:text-lg">{brand.description}</p>
          {products.length > 0 && (
            <Link
              href={`/product/${products[0].qr_slug}`}
              className="mt-5 inline-flex items-center gap-2 font-mono text-hairline text-ink hover:gap-3 transition-all"
              style={{ color: theme.accent }}
            >
              View sample passport →
            </Link>
          )}
        </div>
      </div>

      {/* Products grid */}
      {products.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-sm border border-dashed border-rule p-8 text-center font-mono text-hairline text-ink-mute">
          No active products yet for {brand.name}
        </div>
      )}
    </section>
  );
}
