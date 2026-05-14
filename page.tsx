import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import Container from '@/components/Container';
import BrandBadge from '@/components/BrandBadge';
import MetadataLedger from '@/components/MetadataLedger';
import { getProductBySlug, getProductsByBrand } from '@/lib/supabase/queries';
import { brandFor, PRODUCT_TYPE_LABEL } from '@/lib/brands';

interface PageProps {
  params: { qr_slug: string };
}

// Revalidate every minute so updates propagate without manual rebuilds.
export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.qr_slug);
  if (!product) return { title: 'Passport not found' };

  const theme = brandFor(product.brand);
  return {
    title: `${product.name} — ${theme.name}`,
    description: product.description ?? `${theme.name} digital product passport.`,
    openGraph: {
      title: `${product.name} · ${theme.name}`,
      description: product.description ?? undefined,
      images: product.media_url ? [{ url: product.media_url }] : undefined,
    },
  };
}

export default async function ProductPassportPage({ params }: PageProps) {
  const product = await getProductBySlug(params.qr_slug);
  if (!product) notFound();

  const theme = brandFor(product.brand);

  // Sibling products from same brand for the index strip
  const siblings = (await getProductsByBrand(product.brand, 6)).filter(
    (p) => p.id !== product.id,
  );

  const issuedDate = new Date(product.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  return (
    <article className="above-grain pb-20">
      {/* PASSPORT HEAD — brand-colored bar */}
      <div
        className="w-full py-2"
        style={{ backgroundColor: theme.accent }}
        aria-hidden
      />

      <Container size="default" className="pt-10 sm:pt-14">
        {/* Filing line */}
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-hairline text-ink-mute">
          <div className="flex items-center gap-3">
            <span>Digital Product Passport</span>
            <span aria-hidden>·</span>
            <span>Issued {issuedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <BrandBadge brand={product.brand} size="sm" />
            <span className="rounded-sm bg-paper-deep px-1.5 py-0.5 text-ink">
              {PRODUCT_TYPE_LABEL[product.type]}
            </span>
          </div>
        </div>

        {/* Title block */}
        <header className="mt-6 grid gap-8 sm:grid-cols-12">
          <div className="sm:col-span-7">
            <h1 className="font-display text-4xl leading-[1] text-ink sm:text-6xl">
              {product.name}
            </h1>
            <p className="mt-3 font-mono text-sm text-ink-soft">
              <span className="text-ink-mute">Slug · </span>
              {product.qr_slug}
            </p>
            {product.description && (
              <p className="mt-6 max-w-prose text-ink-soft sm:text-lg">
                {product.description}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="stamp" style={{ color: theme.accent }}>
                Verified
              </span>
              <span className="font-mono text-hairline text-ink-mute">
                Brand · {theme.name}
              </span>
            </div>
          </div>

          {/* Hero media */}
          <div className="sm:col-span-5">
            <div className="relative aspect-square overflow-hidden rounded-sm border border-rule bg-paper-deep">
              {product.media_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.media_url}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center font-mono text-hairline text-ink-mute">
                  No media
                </div>
              )}

              {/* Watermark corner */}
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between font-mono text-[10px] uppercase tracking-widest-2 text-paper mix-blend-difference">
                <span>DPP / {product.qr_slug}</span>
                <span>№ {product.id.slice(0, 6)}</span>
              </div>
            </div>
          </div>
        </header>

        {/* LEDGER */}
        <section className="mt-14 grid gap-8 sm:grid-cols-12">
          <div className="sm:col-span-4">
            <div className="font-mono text-hairline text-ink-mute">Section II</div>
            <h2 className="mt-2 font-display text-2xl leading-tight text-ink sm:text-3xl">
              The record.
            </h2>
            <p className="mt-3 text-ink-soft">
              Every entry below is registered to this specific item. Tampering
              with the physical product does not alter its passport — the ledger
              is the source of truth.
            </p>
          </div>
          <div className="sm:col-span-8">
            <MetadataLedger product={product} />
          </div>
        </section>

        {/* PROVENANCE FOOTER */}
        <section className="mt-14 grid gap-4 rounded-sm border border-rule bg-paper-deep/40 p-6 sm:grid-cols-3">
          <div>
            <div className="font-mono text-hairline text-ink-mute">Brand</div>
            <div className="mt-1 font-display text-lg text-ink">{theme.name}</div>
          </div>
          <div>
            <div className="font-mono text-hairline text-ink-mute">Passport ID</div>
            <div className="mt-1 font-mono text-sm text-ink">{product.id}</div>
          </div>
          <div>
            <div className="font-mono text-hairline text-ink-mute">Status</div>
            <div className="mt-1 font-display text-lg capitalize text-ink">
              {product.status}
            </div>
          </div>
        </section>

        {/* Siblings */}
        {siblings.length > 0 && (
          <section className="mt-16">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-hairline text-ink-mute">
                Also from {theme.name}
              </span>
              <span aria-hidden className="h-px flex-1 bg-rule" />
            </div>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {siblings.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/product/${s.qr_slug}`}
                    className="block rounded-sm border border-rule p-3 transition hover:border-ink"
                  >
                    <div className="font-display text-sm text-ink line-clamp-1">
                      {s.name}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-widest-2 text-ink-mute">
                      {s.qr_slug}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
    </article>
  );
}
