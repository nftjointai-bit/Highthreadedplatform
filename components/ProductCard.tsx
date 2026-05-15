import Link from 'next/link';
import BrandBadge from './BrandBadge';
import { PRODUCT_TYPE_LABEL } from '@/lib/brands';
import type { Product } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.qr_slug}`}
      className="group block rounded-sm border border-rule bg-paper transition hover:border-ink"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
        {product.media_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.media_url}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-hairline text-ink-mute">
            No media
          </div>
        )}

        {/* Top metadata overlay */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <BrandBadge brand={product.brand} size="sm" />
          <span className="rounded-sm bg-paper/85 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest-2 text-ink backdrop-blur">
            {PRODUCT_TYPE_LABEL[product.type]}
          </span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <h3 className="font-display text-base leading-tight text-ink">
            {product.name}
          </h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-widest-2 text-ink-mute">
            {product.qr_slug}
          </p>
        </div>
        <span
          aria-hidden
          className="mt-1 shrink-0 font-mono text-xs text-ink-mute transition group-hover:translate-x-0.5 group-hover:text-ink"
        >
          ↗
        </span>
      </div>
    </Link>
  );
}
