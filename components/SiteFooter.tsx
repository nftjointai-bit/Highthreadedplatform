import Container from './Container';

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="above-grain rule-t mt-24">
      <Container size="wide">
        <div className="flex flex-col gap-4 py-8 font-mono text-hairline text-ink-mute sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span>© {year} Passport System</span>
            <span aria-hidden>·</span>
            <span>v0.1 MVP</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>Hollywood Buds</span>
            <span aria-hidden>·</span>
            <span>High Threaded</span>
            <span aria-hidden>·</span>
            <span>NFT Joint</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
