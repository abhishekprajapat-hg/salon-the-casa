import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/bodoni-moda/opsz.css';
import '@fontsource-variable/bodoni-moda/opsz-italic.css';
import '@fontsource-variable/manrope/index.css';
import './globals.css';
import Header from '@/components/Header';
import SiteEffects from '@/components/SiteEffects';
import { site, hasPhone, hasInstagram, igHandle } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Salon The Casa — Men’s Grooming House | Cuts, Fades, Beards & Shaves',
    template: '%s — Salon The Casa',
  },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: 'Salon The Casa — Men’s Grooming House',
    description: 'Precision cuts, sharp fades and considered beard work — premium men’s grooming in a house built entirely for it.',
    images: [{ url: '/images/hero-barber-fade.jpg', width: 2000, height: 1333 }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#0B0B0C' };

// Runs before paint: enables JS-only styles and skips the intro on repeat visits this session.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('casa-intro'))d.classList.add('no-intro');else sessionStorage.setItem('casa-intro','1');}catch(e){}})();`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BarberShop',
  name: site.name,
  description: site.description,
  url: site.url,
  image: site.url + '/images/hero-barber-fade.jpg',
  ...(hasPhone ? { telephone: site.phone } : {}),
  address: { '@type': 'PostalAddress', streetAddress: site.address.replace(/\n/g, ', ') },
  ...(hasInstagram ? { sameAs: ['https://instagram.com/' + igHandle] } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <div id="top" className="page">
          <a className="skip" href="#main">Skip to content</a>
          <div className="prog" aria-hidden="true" />
          <Header />
          {children}
        </div>
        <SiteEffects />
      </body>
    </html>
  );
}
