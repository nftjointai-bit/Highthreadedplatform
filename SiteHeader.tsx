import Link from 'next/link';
import Container from './Container';

export default function SiteHeader() {
  return (
    <header className="above-grain rule-b">
      <Container size="wide">
        <div className="flex items-center justify-between py-5">
          <Link href="/" className="group flex items-center gap-3">
            <span
              aria-hidden
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink text-ink font-mono text-[10px] tracking-widest-2"
            >
              DPP
            </span>
            <span className="font-display text-lg leading-none text-ink">
              Passport
            </span>
          </Link>

          <nav className="flex items-center gap-6 font-mono text-hairline">
            <Link href="/" className="text-ink-soft hover:text-ink transition">
              Index
            </Link>
            <Link href="/scan" className="text-ink-soft hover:text-ink transition">
              Scan
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
