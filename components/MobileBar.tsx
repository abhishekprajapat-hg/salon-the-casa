'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { hasWhatsApp, waLink } from '@/lib/site';

type Props = {
  book: { href: string; label: string };
  /** Text link shown to the left of the booking button */
  secondary?: { href: string; label: string };
  /** Square WhatsApp button (falls back to the contact section until a number is set) */
  whatsapp?: boolean;
  /**
   * CSS selector of an element (e.g. the hero buttons). The bar stays hidden
   * while that element is on screen or below it, and slides in once the
   * visitor has scrolled past it — so it never doubles up with the hero CTAs.
   */
  revealAfter?: string;
};

/** Sticky bottom action bar — phones only (hidden from 761px up). */
export default function MobileBar({ book, secondary, whatsapp, revealAfter }: Props) {
  const [shown, setShown] = useState(!revealAfter);

  useEffect(() => {
    if (!revealAfter) return;
    const target = document.querySelector(revealAfter);
    if (!target || !('IntersectionObserver' in window)) { setShown(true); return; }
    const io = new IntersectionObserver(([e]) => {
      setShown(!e.isIntersecting && e.boundingClientRect.top < 0);
    });
    io.observe(target);
    return () => io.disconnect();
  }, [revealAfter]);

  const chat = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" />
    </svg>
  );
  return (
    <div className={'mbar' + (shown ? '' : ' is-hidden')} aria-hidden={!shown || undefined}>
      {secondary && <Link href={secondary.href} className="mbar-a" tabIndex={shown ? undefined : -1}>{secondary.label}</Link>}
      <Link href={book.href} className="mbar-b" tabIndex={shown ? undefined : -1}>{book.label}</Link>
      {whatsapp && (hasWhatsApp
        ? <a href={waLink()} className="mbar-icon" target="_blank" rel="noopener" aria-label="Message on WhatsApp" tabIndex={shown ? undefined : -1}>{chat}</a>
        : <Link href="/book#contact" className="mbar-icon" aria-label="Contact the salon" tabIndex={shown ? undefined : -1}>{chat}</Link>)}
    </div>
  );
}
