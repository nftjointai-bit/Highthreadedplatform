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
    return (
      <Container size="narrow" className="py-24 text-center">
        <div className="font-mono text-hairline text-ink-mute">Scan · Not found</div>
        <h1 className="mt-3 font-display text-4xl text-ink">That code isn&apos;t registered.</h1>
        <Link href="/scan" className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink px-5 py-3 font-mono text-hairline text-ink hover:bg-ink hover:text-paper transition">
          Try another code
        </Link>
      </Container>
    );
  }

  return (
    <Container size="narrow" className="py-20 sm:py-28">
      <div className="font-mono text-hairline text-ink-mute">Scan</div>
      <h1 className="mt-3 font-display text-5xl leading-tight text-ink">Read a passport.</h1>
      <form action="/scan" method="get" className="mt-10">
        <label htmlFor="code" className="font-mono text-hairline text-ink-mute">Passport slug</label>
        <div className="mt-2 flex gap-2 rounded-sm border border-ink bg-paper p-2">
          <input id="code" name="code" type="text" placeholder="e.g. hb-sunset-og-001" className="flex-1 bg-transparent px-2 py-2 font-mono text-sm text-ink placeholder:text-ink-mute focus:outline-none" />
          <button type="submit" className="rounded-sm bg-ink px-4 py-2 font-mono text-hairline text-paper">Verify →</button>
        </div>
      </form>
    </Container>
  );
}
