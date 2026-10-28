import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import BookingForm from '@/components/book/BookingForm';
import Footer from '@/components/Footer';
import { instagramTiles } from '@/lib/data';
import { site, hasPhone, hasWhatsApp, hasInstagram, igHandle, telDigits, waLink } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Book & Contact',
  description: 'Request an appointment at Salon The Casa, a men’s salon, or find our address, opening hours, WhatsApp and Instagram.',
  alternates: { canonical: '/book' },
};

export default function BookPage() {
  return (
    <>
      <main id="main">
        <section aria-labelledby="book-h" className="bk-hero">
          <Image src="/images/book-colour-grey-blending.jpg" alt="" fill priority sizes="46vw" className="bk-hero-bg" />
          <div className="bk-hero-shade" />
          <div className="bk-hero-in">
            <div className="fade eyebrow-line"><span className="rule" />Appointments</div>
            <h1 id="book-h" className="serif page-hero-h bk-h">
              <span className="hl"><span className="w" style={{ animationDelay: '.1s' }}>Book your</span></span>
              <span className="hl"><span className="w it gold" style={{ animationDelay: '.22s' }}>appointment.</span></span>
            </h1>
            <p className="fade bk-lede" style={{ animationDelay: '.4s' }}>Tell us what you’d like and when. The salon will confirm your slot personally — nothing is booked until you hear back.</p>
            <ol className="fade bk-steps" style={{ animationDelay: '.5s' }}>
              <li><span>01</span> — Choose a service</li>
              <li><span>02</span> — Pick a time</li>
              <li><span>03</span> — We confirm</li>
            </ol>
          </div>
        </section>

        <section id="booking" aria-label="Appointment request" className="booking light curt">
          <BookingForm />
        </section>

        <section id="contact" aria-labelledby="c-h" className="contact">
          <div className="contact-in">
            <div className="contact-copy">
              <div className="sec-title" style={{ gap: 18 }}>
                <div className="rv eyebrow">Contact &amp; location</div>
                <h2 id="c-h" className="serif rv h-contact">Find the <span className="it gold">house.</span></h2>
              </div>
              <dl className="c-info">
                <div className="rv"><dt>Address</dt><dd>{site.address}</dd></div>
                <div className="rv"><dt>Opening hours</dt><dd>{site.hours}</dd></div>
                <div className="rv"><dt>Phone</dt><dd>{hasPhone ? <a className="ul" href={'tel:' + telDigits}>{site.phone}</a> : <span className="soft">[Phone number]</span>}</dd></div>
                <div className="rv"><dt>WhatsApp</dt><dd>{hasWhatsApp ? <a className="ul" href={waLink()} target="_blank" rel="noopener">Message us on WhatsApp</a> : <span className="soft">[WhatsApp number]</span>}</dd></div>
              </dl>
              <div className="rv btn-row">
                <Link className="btn btn-gold btn-sm" href="#booking">Book your appointment</Link>
                {site.mapsUrl && <a className="btn btn-line btn-sm" href={site.mapsUrl} target="_blank" rel="noopener">Get directions</a>}
              </div>
            </div>
            <div className="mask map" role="img" aria-label={site.mapsUrl ? 'Map preview for Salon The Casa' : 'Map placeholder — location not configured'}>
              <svg aria-hidden="true" viewBox="0 0 600 520" preserveAspectRatio="none" className="map-svg">
                <path d="M-10 380 C 120 340, 220 420, 330 300 S 520 170, 620 210" fill="none" stroke="rgba(244,240,232,0.14)" strokeWidth="14" />
                <path d="M180 -10 C 210 140, 160 260, 260 540" fill="none" stroke="rgba(244,240,232,0.1)" strokeWidth="9" />
                <path d="M-10 120 L 620 160" fill="none" stroke="rgba(244,240,232,0.08)" strokeWidth="6" />
              </svg>
              <div className="map-pin">
                <span>Salon The Casa</span>
                <svg width="34" height="44" viewBox="0 0 24 32" fill="#C7A878" aria-hidden="true"><path d="M12 0a11 11 0 0 0-11 11c0 8 11 21 11 21s11-13 11-21A11 11 0 0 0 12 0zm0 15a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" /></svg>
              </div>
              <div className="map-note">
                {site.mapsUrl
                  ? 'Illustrative map — tap “Get directions” for the exact location in Google Maps.'
                  : 'Map placeholder — the salon’s location isn’t set yet. Add the Google Maps link in lib/site.ts.'}
              </div>
            </div>
          </div>
        </section>

        <section id="social" aria-labelledby="s-h" className="social">
          <div className="social-in">
            <div className="sec-head" style={{ marginBottom: 0, gap: 24 }}>
              <div className="sec-title" style={{ gap: 16 }}>
                <div className="rv eyebrow">On Instagram</div>
                <h2 id="s-h" className="serif rv h-social">{hasInstagram ? '@' + igHandle : '@[instagram handle]'}</h2>
              </div>
              {hasInstagram
                ? <a className="btn btn-gold btn-sm" href={'https://instagram.com/' + igHandle} target="_blank" rel="noopener">Follow the salon</a>
                : <span className="tag-dashed">Add the Instagram handle in lib/site.ts</span>}
            </div>
            <div className="ig-grid">
              {instagramTiles.map((src) => (
                <div key={src} className="ig-tile rv">
                  <Image src={src} alt="Demo post image — replace with the salon’s Instagram posts" fill sizes="(max-width: 700px) 50vw, 16vw" />
                  <div className="ig" aria-hidden="true">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#F4F0E8" strokeWidth="1.4"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="#F4F0E8" /></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer tagline={['A modern men’s salon.', 'Your style, your signature.']} />
    </>
  );
}
