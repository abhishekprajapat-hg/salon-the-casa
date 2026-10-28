import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import MobileBar from '@/components/MobileBar';
import { Arrow } from '@/components/Icons';
import { pad } from '@/lib/data';
import { serviceCategories, totalOptions } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Services',
  description: 'The full men’s grooming menu at Salon The Casa: haircuts, beard and moustache, shaves, de-tan, facials, hair spa, colour, hands & feet and groom packages.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <main id="main">
        <section className="svx-hero" aria-labelledby="svx-h">
          <div className="svx-hero-in">
            <div className="fade eyebrow-line"><span className="rule" />The full menu</div>
            <h1 id="svx-h" className="serif page-hero-h svx-h">
              <span className="hl"><span className="w" style={{ animationDelay: '.1s' }}>Every service,</span></span>
              <span className="hl"><span className="w it gold" style={{ animationDelay: '.22s' }}>one house.</span></span>
            </h1>
            <p className="fade svx-lede" style={{ animationDelay: '.4s' }}>
              {serviceCategories.length} categories and {totalOptions} services — from a quick line-up to a full groom package. Every service begins with a consultation; pricing is confirmed in the chair.
            </p>
          </div>
        </section>

        <section aria-label="Service categories" className="svx-grid-sec">
          <div className="wrap svx-grid">
            {serviceCategories.map((c, i) => (
              <Link key={c.slug} href={`/services/${c.slug}`} className="svx-card rv">
                <span className="svx-card-img">
                  <Image src={c.img} alt="" fill sizes="(max-width: 760px) 100vw, (max-width: 960px) 50vw, 33vw" style={{ objectPosition: c.pos ?? '50% 35%' }} />
                </span>
                <span className="svx-card-body">
                  <span className="svx-card-top"><span className="svx-num">{pad(i)}</span><span className="svx-count">{c.options.length} options</span></span>
                  <span className="serif svx-card-name">{c.name}</span>
                  <span className="svx-card-short">{c.short}</span>
                  <span className="svx-card-cta">Explore <Arrow size={16} /></span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section aria-label="Book an appointment" className="cta-band">
          <div className="cta-band-in">
            <h2 className="serif h-cta">
              <span className="ln"><span>Not sure what</span></span>
              <span className="ln"><span className="it gold">you need?</span></span>
            </h2>
            <Link className="btn btn-gold btn-xl rv" href="/book">Book a consultation <Arrow /></Link>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBar book={{ href: '/book', label: 'Book a chair' }} whatsapp />
    </>
  );
}
