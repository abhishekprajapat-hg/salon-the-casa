import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import MobileBar from '@/components/MobileBar';
import { Arrow } from '@/components/Icons';
import { barbers, pad, principles } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About & Barbers',
  description: "Inside Salon The Casa, a modern men's salon — our approach and the barbers behind the chair.",
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <main id="main">
        <section aria-labelledby="ab-h" style={{ position: 'relative', overflow: 'hidden' }}>
          <div className="ab-hero">
            <div className="ab-copy">
              <div className="fade eyebrow-line"><span className="rule" />About the house</div>
              <h1 id="ab-h" className="serif page-hero-h ab-h">
                <span className="hl"><span className="w" style={{ animationDelay: '.1s' }}>A barber’s</span></span>
                <span className="hl"><span className="w it gold" style={{ animationDelay: '.22s' }}>house, rebuilt.</span></span>
              </h1>
              <p className="fade about-p" style={{ animationDelay: '.4s' }}>Salon The Casa takes the craft of the traditional barbershop — the shears, the straight razor, the hot towel — and sets it in a calm, modern room made for men who care how they look.</p>
              <p className="fade about-note" style={{ animationDelay: '.5s' }}>[Add the salon’s own story here: when and why it opened, and who founded it.]</p>
            </div>
            <div className="ab-stage fade" style={{ animationDelay: '.3s' }}>
              <div className="ab-stage-img"><Image src="/images/kit-the-station.jpg" alt="Black leather barber chair and mirror station against a brick wall" fill priority sizes="(max-width: 960px) 100vw, 45vw" className="img-cover" /></div>
              <div className="ab-stage-inset"><div className="inset-in"><Image src="/images/kit-straight-razors.jpg" alt="Folding straight razors on wood" fill sizes="(max-width: 960px) 38vw, 18vw" /></div></div>
              <div className="ab-stage-cap">The station · Stock preview</div>
            </div>
          </div>
        </section>

        <section aria-labelledby="ph-h" className="light curt">
          <div className="approach-in">
            <div className="sec-head" style={{ marginBottom: 0 }}>
              <h2 id="ph-h" className="serif h-approach">
                <span className="ln"><span>How we</span></span>
                <span className="ln"><span className="it">work the chair.</span></span>
              </h2>
              <div className="eyebrow eyebrow-dark">The approach</div>
            </div>
            <div className="principles">
              {principles.map((p) => (
                <div key={p.num} className="principle rv">
                  <span className="serif principle-num">{p.num}</span>
                  <h3 className="serif">{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="barbers" aria-labelledby="b-h" style={{ scrollMarginTop: 70 }}>
          <div className="barbers-in">
            <div className="sec-head" style={{ marginBottom: 0, gap: 24 }}>
              <div className="sec-title" style={{ gap: 18 }}>
                <div className="rv eyebrow">The barbers</div>
                <h2 id="b-h" className="serif h-barbers">
                  <span className="ln"><span>Meet the hands</span></span>
                  <span className="ln"><span className="it gold">behind the chair.</span></span>
                </h2>
              </div>
              <span className="tag-dashed">Placeholder — add real team photos &amp; names</span>
            </div>
            <div className="barber-grid">
              {barbers.map((b, i) => (
                <article key={i} className="barber rv" style={{ '--off': b.offset + 'px' } as React.CSSProperties}>
                  <div className="ph mask"><Image src={b.img} alt="Placeholder image — replace with a photo of the barber" fill sizes="(max-width: 700px) 100vw, 33vw" /></div>
                  <div className="barber-row">
                    <h3 className="serif">{b.name}</h3>
                    <span className="gold" style={{ fontSize: 12, letterSpacing: '.2em' }}>{pad(i)}</span>
                  </div>
                  <span className="line" aria-hidden="true" />
                  <p className="barber-role">{b.role}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-label="Book an appointment" className="cta-band">
          <div className="cta-band-in">
            <h2 className="serif h-cta">
              <span className="ln"><span>Take a seat.</span></span>
              <span className="ln"><span className="it gold">We’ll take it from here.</span></span>
            </h2>
            <Link className="btn btn-gold btn-xl rv" href="/book">Book your appointment <Arrow /></Link>
          </div>
        </section>
      </main>

      <Footer tagline={['A modern men’s salon.', 'Your style, your signature.']} />
      <MobileBar book={{ href: '/book', label: 'Book appointment' }} whatsapp />
    </>
  );
}
