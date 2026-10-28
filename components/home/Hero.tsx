'use client';

import { getImageProps } from 'next/image';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Arrow } from '../Icons';
import { marquee } from '@/lib/data';
import { getCategory } from '@/lib/services';

const alt = 'A tattooed barber shaping a textured fade with scissors and comb';

// Quick links into the service menu
const quick = ([
  ['haircut', 'Haircuts'],
  ['beard', 'Beards'],
  ['shave', 'Shaves'],
  ['facial', 'Facials'],
] as const).map(([slug, label]) => ({ ...getCategory(slug)!, label }));

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const move = useRef<HTMLDivElement>(null);

  // Art direction: portrait photo on phones, wide photo from 761px up
  const common = { alt, fill: true, priority: true, sizes: '100vw' } as const;
  const { props: { srcSet: wide } } = getImageProps({ ...common, src: '/images/hero-barber-fade.jpg', quality: 80 });
  const { props: { srcSet: tall, ...rest } } = getImageProps({ ...common, src: '/images/hero-barber-portrait.jpg', quality: 80 });

  // Gentle pointer parallax (mouse devices only)
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(hover: hover)').matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (raf) return;
      const x = e.clientX / window.innerWidth - 0.5, y = e.clientY / window.innerHeight - 0.5;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (move.current) move.current.style.transform = `translate3d(${(x * -18).toFixed(1)}px,${(y * -12).toFixed(1)}px,0) scale(1.04)`;
      });
    };
    el.addEventListener('mousemove', onMove);
    return () => { el.removeEventListener('mousemove', onMove); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const marq = (k: string) =>
    marquee.flatMap((m) => [<span key={k + m}>{m}</span>, <span key={k + m + '*'} className="gold">✦</span>]);

  return (
    <section ref={section} aria-labelledby="hero-h" className="hx">
      <div className="hx-stage">
        {/* Photo */}
        <div className="hx-media reveal-img">
          <div className="hx-move" ref={move}>
            <picture>
              <source media="(min-width: 761px)" srcSet={wide} />
              <source media="(max-width: 760px)" srcSet={tall} />
              {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
              <img {...rest} className="hx-img zoom-in" />
            </picture>
          </div>
          <div className="hx-shade" />
          <div className="hx-grain" aria-hidden="true" />
        </div>

        {/* Copy */}
        <div className="hx-inner">
          <div className="hx-copy">
            <div className="fade hx-eyebrow" style={{ animationDelay: '1.4s' }}>
              <span className="rule" /><span className="hx-eb-long">Salon The Casa · </span>Men’s grooming house
            </div>
            <h1 id="hero-h" className="serif hx-h">
              <span className="hl"><span className="w" style={{ animationDelay: '1.05s' }}>Crafted</span></span>
              <span className="hl"><span className="w" style={{ animationDelay: '1.15s' }}>for <em className="gold">your</em></span></span>
              <span className="hl"><span className="w it gold" style={{ animationDelay: '1.25s' }}>style.</span></span>
            </h1>
            <p className="fade hx-lede" style={{ animationDelay: '1.55s' }}>
              Precision cuts, sharp fades, beard work, shaves and skin care — premium men’s grooming in a house built entirely for it.
            </p>
            <div className="fade hx-ctas" style={{ animationDelay: '1.7s' }}>
              <Link className="btn btn-gold btn-lg" href="/book">Book a chair <Arrow /></Link>
              <Link className="btn btn-line btn-lg" href="/services">Explore services</Link>
            </div>
          </div>

          {/* Service quick links */}
          <nav aria-label="Popular services" className="hx-rail fade" style={{ animationDelay: '1.9s' }}>
            <span className="hx-rail-k">Popular</span>
            <div className="hx-rail-list">
              {quick.map((c, i) => (
                <Link key={c.slug} href={`/services/${c.slug}`} className="hx-q">
                  <span className="hx-q-img"><Image src={c.img} alt="" fill sizes="64px" style={{ objectPosition: c.pos ?? '50% 35%' }} /></span>
                  <span className="hx-q-text">
                    <span className="hx-q-num">0{i + 1}</span>
                    <span className="serif hx-q-name">{c.label}</span>
                  </span>
                  <span className="hx-q-arr" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>

      </div>

      <div aria-hidden="true" className="marq-wrap">
        <div className="marq">{marq('a')}{marq('b')}</div>
      </div>
    </section>
  );
}
