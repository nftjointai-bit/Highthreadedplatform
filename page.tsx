import Link from 'next/link';
import Container from '@/components/Container';
import BrandSection from '@/components/BrandSection';
import { getAllBrands, getProductsByBrand } from '@/lib/supabase/queries';

export const revalidate = 60;

export default async function HomePage() {
  const brands = await getAllBrands();
  const productsByBrand = await Promise.all(
    brands.map((b) => getProductsByBrand(b.slug, 4).then((products) => ({ brand: b, products }))),
  );

  return (
    <>
      {/* HERO */}
      <section className="above-grain pt-16 pb-20 sm:pt-24 sm:pb-28">
        <Container size="wide">
          <div className="grid gap-10 sm:grid-cols-12 sm:gap-8">
            <div className="sm:col-span-7">
              <div className="font-mono text-hairline text-ink-mute">
                Digital Product Passport · est. 2026
              </div>
              <h1 className="mt-5 font-display text-[2.75rem] leading-[0.95] text-ink sm:text-[4.5rem] sm:leading-[0.92]">
                Every product
                <br />
                carries its
                <br />
                <span className="italic text-ink-soft">own history.</span>
              </h1>
              <p className="mt-6 max-w-xl text-ink-soft sm:text-lg">
                A unified identity layer for physical and cultural goods.
                Scan a tag, visit a slug, verify the object — strain to lab panel,
                garment to numbered run, token to wallet. One passport per item.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/scan"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-mono text-hairline text-paper hover:bg-ink-soft transition"
                >
                  ⌖ Scan a passport
                </Link>
                <Link
                  href="#brands"
                  className="inline-flex items-center gap-2 rounded-full border border-ink px-5 py-3 font-mono text-hairline text-ink hover:bg-ink hover:text-paper transition"
                >
                  Browse the index
                </Link>
              </div>
            </div>

            {/* Passport stamp visual */}
            <div className="sm:col-span-5">
              <div className="relative mx-auto max-w-sm rounded-sm border border-ink bg-paper p-6 sm:rotate-1">
                <div className="flex items-center justify-between font-mono text-hairline text-ink-mute">
                  <span>DPP / SPECIMEN</span>
                  <span>№ 0001</span>
                </div>
                <div className="mt-6 font-display text-2xl leading-tight text-ink">
                  Sunset OG
                  <span className="block italic text-ink-soft">— Indoor</span>
                </div>
                <dl className="mt-6 grid grid-cols-2 gap-y-3 font-mono text-xs">
                  <dt className="text-ink-mute">Brand</dt>
                  <dd className="text-ink">Hollywood Buds</dd>
                  <dt className="text-ink-mute">Batch</dt>
                  <dd className="text-ink">B2026-001</dd>
                  <dt className="text-ink-mute">THC</dt>
                  <dd className="text-ink">24.5%</dd>
                  <dt className="text-ink-mute">Slug</dt>
                  <dd className="text-ink">hb-sunset-og-001</dd>
                </dl>
                <div className="mt-6 flex items-center justify-between">
                  <span className="stamp text-buds">Verified</span>
                  <span aria-hidden className="font-display text-3xl text-ink">
                    ✺
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="above-grain rule-t bg-paper-deep/30 py-16 sm:py-20">
        <Container size="wide">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-hairline text-ink-mute">Mechanism</span>
            <span aria-hidden className="h-px flex-1 bg-rule" />
          </div>
          <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-ink sm:text-4xl">
            One slug. One scan. The full ledger.
          </h2>

          <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-rule bg-rule sm:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Mint',
                body: 'Every physical or cultural item is registered with a permanent slug and identity record.',
              },
              {
                step: '02',
                title: 'Tag',
                body: 'A QR, NFC chip, or share-link points to /product/[slug]. The object itself becomes addressable.',
              },
              {
                step: '03',
                title: 'Verify',
                body: 'Anyone — buyer, regulator, collector — scans and sees the same passport. Brand-aware, always current.',
              },
            ].map((s) => (
              <div key={s.step} className="bg-paper p-6 sm:p-8">
                <div className="font-mono text-hairline text-ink-mute">{s.step}</div>
                <h3 className="mt-3 font-display text-2xl text-ink">{s.title}</h3>
                <p className="mt-2 text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* BRANDS */}
      <section id="brands" className="above-grain pt-4">
        <Container size="wide">
          {productsByBrand.map(({ brand, products }, i) => (
            <BrandSection key={brand.slug} brand={brand} products={products} index={i} />
          ))}
        </Container>
      </section>
    </>
  );
}
