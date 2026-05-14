import { brandFor } from '@/lib/brands';
import type { BrandSlug } from '@/types';

interface BrandBadgeProps {
  brand: BrandSlug;
  size?: 'sm' | 'md';
}

export default function BrandBadge({ brand, size = 'md' }: BrandBadgeProps) {
  const theme = brandFor(brand);
  const sizing =
    size === 'sm'
      ? 'px-2 py-1 text-[10px]'
      : 'px-2.5 py-1 text-[11px]';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-mono uppercase tracking-widest-2 ${theme.badgeClass} ${sizing}`}
    >
      <span aria-hidden className="font-display font-medium normal-case tracking-normal">
        {theme.short}
      </span>
      <span className="opacity-90">{theme.name}</span>
    </span>
  );
}
