import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/home/Hero';
import CutCollection from '@/components/home/CutCollection';
import BeardAtlas from '@/components/home/BeardAtlas';
import Footer from '@/components/Footer';
import MobileBar from '@/components/MobileBar';
import { Arrow } from '@/components/Icons';
import { kit, lookbook, pad, services } from '@/lib/data';
import { site, hasPhone, hasInstagram, igHandle, telDigits } from '@/lib/site';

export default function HomePage() {
  return (
    <>
      <div className="intro" aria-hidden="true">
        <div className="serif intro-mark">Salon <span className="it gold">the</span> Casa</div>
        <div className="intro-line" />
      </div>

      <main id="main">
        <Hero />

        {/* 01 — Cut collection */}
        <section id="styles" aria-labelledby="styles-h" className="sec sec-dark">
          <div className="wrap pad-130">
            <div className="sec-head">
              <div className="sec-title">
                <div className="rv eyebrow">(01) — The cut collection</div>
                <h2 id="styles-h" className="serif h-display">
                  <span className="ln"><span>Ten cuts.</span></span>
                  <span className="ln"><span className="it gold">One signature.</span></span>
                </h2>
              </div>
              <p className="rv lede">Choose a cut to study it. Bring a reference, or start here — every style is adapted to your head shape, hair texture and routine.</p>
            </div>
            <CutCollection />
          </div>
        </section>

        {/* 02 — Beard atlas */}
        <section id="beards" aria-labelledby="beards-h" className="sec light curt">
          <div className="wrap pad-130 pb-120">
            <div className="sec-head mb-56">
              <div className="sec-title">
                <div className="eyebrow eyebrow-dark">(02) — The beard atlas</div>
                <h2 id="beards-h" className="serif h-display">
                  <span className="ln"><span>Shape is</span></span>
                  <span className="ln"><span className="it">everything.</span></span>
                </h2>
              </div>
              <p className="lede lede-dark">Nine shapes, from a whisper of stubble to a full, conditioned beard. Each is balanced to your jawline and finished with a razor line.</p>
            </div>
            <BeardAtlas />
          </div>
        </section>

        {/* 03 — The kit */}
        <section id="kit" aria-labelledby="kit-h" className="sec sec-dark">
          <div className="wrap pad-140 pb-120">
            <div className="sec-head mb-56">
              <div className="sec-title">
                <div className="rv eyebrow">(03) — The kit</div>
                <h2 id="kit-h" className="serif h-display">
                  <span className="ln"><span>Instruments</span></span>
                  <span className="ln"><span className="it gold">of precision.</span></span>
                </h2>
              </div>
              <p className="rv lede">Steel, brass, leather and a steady hand. The tools behind every cut, laid out like a campaign.</p>
            </div>
            <div className="kit">
              {kit.map((k, i) => (
                <figure key={k.cls} className={'k mask ' + k.cls}>
                  <Image src={k.img} alt={k.alt} fill sizes="(max-width: 960px) 50vw, 40vw" style={{ objectPosition: k.pos ?? '50% 50%' }} />
                  <figcaption>
                    <span className="ln2" aria-hidden="true" />
                    <span className="k-row"><span className="serif k-name">{k.name}</span><span className="k-num">N° {pad(i)}</span></span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* 04 — Services */}
        <section id="services" aria-labelledby="svc-h" className="sec sec-char">
          <div className="wrap svcgrid pad-130 pb-120">
            <div className="svc-intro">
              <div className="rv eyebrow">(04) — Services</div>
              <h2 id="svc-h" className="serif h-svc">
                <span className="ln"><span>The menu,</span></span>
                <span className="ln"><span className="it gold">for men.</span></span>
              </h2>
              <p className="rv lede">Every service begins with a consultation. Pricing is confirmed in the chair.</p>
              <Link className="btn btn-line btn-lg rv svc-all" href="/services">See the full menu <Arrow /></Link>
            </div>
            <ol className="svc-list">
              {services.map((s, i) => (
                <li key={s.name} className="svc-row rv">
                  <span className="svc-num">{pad(i)}</span>
                  <div className="t"><h3 className="serif"><Link href={`/services/${s.slug}`} className="svc-link">{s.name}</Link></h3><p>{s.text}</p></div>
                  <div className="peek" aria-hidden="true"><Image src={s.img} alt="" fill sizes="220px" className="img-cover" /></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 05 — Lookbook */}
        <section id="lookbook" aria-labelledby="lb-h" className="sec-dark drift-scope lookbook">
          <div className="wrap lb-head">
            <div className="sec-title">
              <div className="rv eyebrow">(05) — The lookbook</div>
              <h2 id="lb-h" className="serif h-lb">Shot in <span className="it gold">low light.</span></h2>
            </div>
            <p className="muted-sm">Stock photography for preview — to be replaced with the salon’s own work.</p>
          </div>
          <div className="strip" aria-label="Lookbook images" role="region" tabIndex={0}>
            <div className="strip-track drift">
              {lookbook.map((l, i) => (
                <figure key={l.cap} className="lb" style={{ '--w': l.w + 'px' } as React.CSSProperties}>
                  <div className="lb-img" style={{ aspectRatio: l.ratio }}>
                    <Image src={l.img} alt={l.cap} fill sizes={`(max-width: 760px) 72vw, ${l.w}px`} className="img-cover" style={{ filter: `grayscale(${l.gray})` }} />
                  </div>
                  <figcaption><span>{l.cap}</span><span className="gold">{pad(i)}</span></figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div aria-hidden="true" className="strip outline-strip">
            <div className="drift-rev serif outline-text">Fade · Crop · Quiff · Slick-back · Beard · Shave ·</div>
          </div>
        </section>

        {/* 06 — About */}
        <section id="about" aria-labelledby="about-h" className="sec sec-char about-sec">
          <div className="wrap about pad-130 pb-130">
            <div className="about-media">
              <div className="mask about-img"><Image src="/images/about-barbershop-interior.jpg" alt="A long, warmly lit barbershop with a row of black chairs and mirrors" fill sizes="(max-width: 960px) 100vw, 45vw" /></div>
              <div className="plx about-inset" style={{ '--p': '80px' } as React.CSSProperties}>
                <div className="inset-in"><Image src="/images/kit-barber-chair.jpg" alt="Black leather and chrome barber chair" fill sizes="(max-width: 960px) 46vw, 20vw" /></div>
              </div>
            </div>
            <div className="about-copy">
              <div className="rv eyebrow">(06) — About the house</div>
              <h2 id="about-h" className="serif h-svc">
                <span className="ln"><span>A barber’s craft,</span></span>
                <span className="ln"><span className="it gold">a modern room.</span></span>
              </h2>
              <p className="rv about-p">Salon The Casa takes the rituals of the traditional barbershop — the shears, the straight razor, the hot towel — and sets them in a calm, dark, modern space made for men who care how they look.</p>
              <p className="rv about-note">[Add the salon’s own story: when it opened, who founded it, and the team behind the chair.]</p>
              <Link className="ul rv link-gold" href="/about#barbers">Meet the barbers <Arrow size={16} /></Link>
            </div>
          </div>
        </section>

        {/* 07 — Visit */}
        <section id="visit" aria-labelledby="visit-h" className="visit">
          <div className="plx visit-bg" style={{ '--p': '60px' } as React.CSSProperties}>
            <Image src="/images/visit-background.jpg" alt="" fill sizes="100vw" />
          </div>
          <div className="visit-shade" />
          <div className="wrap visit-in">
            <div className="sec-head visit-head">
              <div className="sec-title">
                <div className="rv eyebrow">(07) — Visit &amp; appointments</div>
                <h2 id="visit-h" className="serif h-visit">
                  <span className="ln"><span>Take</span></span>
                  <span className="ln"><span className="it gold">the chair.</span></span>
                </h2>
              </div>
              <Link className="btn btn-gold btn-xl rv" href="/book">Book an appointment <Arrow /></Link>
            </div>
            <dl className="info">
              <div className="rv"><dt>Address</dt><dd style={{ whiteSpace: 'pre-line' }}>{site.address}</dd></div>
              <div className="rv"><dt>Hours</dt><dd style={{ whiteSpace: 'pre-line' }}>{site.hours}</dd></div>
              <div className="rv"><dt>Phone &amp; WhatsApp</dt><dd>{hasPhone ? <a className="ul" href={'tel:' + telDigits}>{site.phone}</a> : '[Phone number]'}</dd></div>
              <div className="rv"><dt>Instagram</dt><dd>{hasInstagram ? <a className="ul" href={'https://instagram.com/' + igHandle} target="_blank" rel="noopener">@{igHandle}</a> : '@[handle]'}</dd></div>
            </dl>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBar book={{ href: '/book', label: 'Book a chair' }} whatsapp revealAfter=".hx-ctas" />
    </>
  );
}
