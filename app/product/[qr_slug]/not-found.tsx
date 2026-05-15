import Link from 'next/link';
import Container from '@/components/Container';

export default function ProductNotFound() {
  return (
    <Container size="narrow" className="py-24 text-center">
      <div className="font-mono text-hairline text-ink-mute">Error · 404</div>
      <h1 className="mt-3 font-display text-5xl text-ink">No passport found.</h1>
      <p className="mt-4 text-ink-soft">
        This slug isn&apos;t registered, or the passport has been archived. If
        you scanned a physical product, double-check the code or contact the
        brand.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink px-5 py-3 font-mono text-hairline text-ink hover:bg-ink hover:text-paper transition"
      >
        ← Back to index
      </Link>
    </Container>
  );
}
