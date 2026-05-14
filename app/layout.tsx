import type { Metadata, Viewport } from 'next';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: {
    default: 'Passport — Digital Product Identity',
    template: '%s · Passport',
  },
  description:
    'A unified digital product identity system. Every physical and cultural product carries its full provenance.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    title: 'Passport — Digital Product Identity',
    description: 'Every product has a verifiable identity.',
  },
};

export const viewport: Viewport = {
  themeColor: '#F4F1EA',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Type system — distinctive serif + tight sans + mono */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 above-grain">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
