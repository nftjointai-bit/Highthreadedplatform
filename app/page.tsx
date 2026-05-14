import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import Link from 'next/link';
import Container from '@/components/Container';
import { getProductBySlug, logScanEvent } from '@/lib/supabase/queries';

interface ScanPageProps {
  searchParams: { code?: string };
}

export const dynamic = 'force-dynamic';

export default async function ScanPage({ searchParams }: ScanPageProps) {
  const code = searchParams.code?.trim();

  if (code) {
    const product = await getProductBySlug(code);

    // Fire-and-forget scan log (works for valid + invalid slugs both)
    const h = headers();
    await logScanEvent({
      productId: product?.id ?? null,
      qrSlug: code,
      userAgent: h.get('user-agent'),
      referrer: h.get('referer'),
    }).catch(() => undefined);

    if (product) {
      redirect(`/product/${product.qr_slug}`);
    }
    // Fall through to "not found" UI below
    return (
      <Container size="narrow" className="py-24 text-center">
        <div className="font-mono text-hairline text-ink-mute">Scan · Not found</div>
        <h1 className="mt-3 font-display text-4xl text-ink">
          That code isn&apos;t registered.
        </h1>
        <p className="mt-4 text-ink-soft">
          We received the scan for{' '}
          <code className="font-mono text-ink">{code}</code>, but no active
          passport matches.
        </p>
        <Link
          href="/scan"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink px-5 py-3 font-mono text-hairline text-ink hover:bg-ink hover:text-paper transition"
        >
          Try another code
        </Link>
      </Container>
    );
  }

  // No code parameter — show the scan landing
  return (
    <Container size="narrow" className="py-20 sm:py-28">
      <div className="font-mono text-hairline text-ink-mute">Scan</div>
      <h1 className="mt-3 font-display text-5xl leading-[0.95] text-ink sm:text-6xl">
        Read a passport.
      </h1>
      <p className="mt-5 max-w-prose text-ink-soft sm:text-lg">
        Open a QR code on a product to land here automatically, or enter the
        passport slug manually.
      </p>

      <form action="/scan" method="get" className="mt-10">
        <label htmlFor="code" className="font-mono text-hairline text-ink-mute">
          Passport slug
        </label>
        <div className="mt-2 flex gap-2 rounded-sm border border-ink bg-paper p-2 focus-within:ring-2 focus-within:ring-ink/20">
          <input
            id="code"
            name="code"
            type="text"
            placeholder="e.g. hb-sunset-og-001"
            autoComplete="off"
            autoFocus
            className="flex-1 bg-transparent px-2 py-2 font-mono text-sm text-ink placeholder:text-ink-mute focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-sm bg-ink px-4 py-2 font-mono text-hairline text-paper hover:bg-ink-soft transition"
          >
            Verify →
          </button>
        </div>
      </form>

      <div className="mt-10 rule-t pt-6">
        <div className="font-mono text-hairline text-ink-mute">Try these</div>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {[
            { slug: 'hb-sunset-og-001', label: 'Sunset OG — Hollywood Buds' },
            { slug: 'ht-hoodie-bone-014', label: 'Studio Hoodie — High Threaded' },
            { slug: 'nj-genesis-001', label: 'Genesis Pass — NFT Joint' },
            { slug: 'hb-cloud-rosin-007', label: 'Cloud Walker Rosin' },
          ].map((sample) => (
            <li key={sample.slug}>
              <Link
                href={`/scan?code=${sample.slug}`}
                className="flex items-center justify-between rounded-sm border border-rule p-3 hover:border-ink transition"
              >
                <span className="font-display text-ink">{sample.label}</span>
                <span className="font-mono text-[11px] text-ink-mute">
                  {sample.slug}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
