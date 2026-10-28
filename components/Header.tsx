'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { site } from '@/lib/site';
import { serviceCategories } from '@/lib/services';

const desktopLinks = [
  { label: 'Cuts', href: '/#styles' },
  { label: 'Beards', href: '/#beards' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/book#contact' },
];

const mobileLinks = [
  { label: 'Cuts', href: '/#styles' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/book#contact' },
];

function Chevron() {
  return (
    <svg className="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile sheet
  const [dd, setDd] = useState(false); // desktop dropdown
  const [subOpen, setSubOpen] = useState(false); // mobile services accordion
  const openBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const ddWrap = useRef<HTMLDivElement>(null);
  const ddTimer = useRef<number | undefined>(undefined);
  const wasOpen = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close everything on navigation
  useEffect(() => { setOpen(false); setDd(false); }, [pathname]);

  // Mobile sheet: lock scroll, manage focus
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) closeBtn.current?.focus({ preventScroll: true });
    else if (wasOpen.current) openBtn.current?.focus({ preventScroll: true });
    wasOpen.current = open;
    if (open) setSubOpen(pathname.startsWith('/services'));
    const onResize = () => { if (open && window.innerWidth > 960) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [open, pathname]);

  // Desktop dropdown: close on outside click / Escape
  useEffect(() => {
    if (!dd) return;
    const onDown = (e: MouseEvent) => { if (!ddWrap.current?.contains(e.target as Node)) setDd(false); };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setDd(false); ddWrap.current?.querySelector<HTMLButtonElement>('.dd-btn')?.focus(); }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [dd]);

  const hoverOpen = () => { window.clearTimeout(ddTimer.current); setDd(true); };
  const hoverClose = () => { ddTimer.current = window.setTimeout(() => setDd(false), 160); };

  const onSheetKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') return setOpen(false);
    if (e.key !== 'Tab' || !sheet.current) return;
    const f = sheet.current.querySelectorAll<HTMLElement>('a,button');
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }, []);

  const current = (href: string) => (href === pathname ? 'page' : undefined);
  const inServices = pathname.startsWith('/services');
  const bookHref = pathname === '/book' ? '#booking' : '/book';

  return (
    <>
      <header className={'nav' + (scrolled || open || dd ? ' solid' : '')}>
        <div className="nav-in">
          <Link href="/" className="logo" aria-label="Salon The Casa — home">
            <span className="serif logo-w">Salon</span>
            <span className="serif logo-the">the</span>
            <span className="serif logo-w">Casa</span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            <div className="dd" ref={ddWrap} onMouseEnter={hoverOpen} onMouseLeave={hoverClose}>
              <button type="button" className={'dd-btn' + (inServices ? ' is-current' : '')} aria-expanded={dd} aria-controls="services-menu" onClick={() => setDd((v) => !v)}>
                Services <Chevron />
              </button>
              <div id="services-menu" className={'dd-panel' + (dd ? ' open' : '')} hidden={!dd}>
                <div className="dd-grid">
                  {serviceCategories.map((c) => (
                    <Link key={c.slug} href={`/services/${c.slug}`} className="dd-item" aria-current={current(`/services/${c.slug}`)} onClick={() => setDd(false)}>
                      <span className="dd-thumb"><Image src={c.img} alt="" fill sizes="56px" style={{ objectPosition: c.pos ?? '50% 35%' }} /></span>
                      <span className="dd-text"><span className="dd-name">{c.name}</span><span className="dd-short">{c.short}</span></span>
                    </Link>
                  ))}
                </div>
                <div className="dd-foot">
                  <span>Every service starts with a consultation.</span>
                  <Link href="/services" className="ul gold" onClick={() => setDd(false)}>View the full menu →</Link>
                </div>
              </div>
            </div>
            {desktopLinks.map((l) => (
              <Link key={l.href} className="ul" href={l.href} aria-current={current(l.href)}>{l.label}</Link>
            ))}
          </nav>

          <div className="nav-act">
            <Link className="nav-cta btn btn-gold" href={bookHref}>Book a chair</Link>
            <button ref={openBtn} className="menu-btn" type="button" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h18M3 16h12" /></svg>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div ref={sheet} id="mobile-menu" className="menu-sheet" role="dialog" aria-modal="true" aria-label="Menu" onKeyDown={onSheetKey}>
          <div className="menu-top">
            <span className="serif menu-logo">Salon <span className="it gold">the</span> Casa</span>
            <button ref={closeBtn} type="button" className="icon-btn" aria-label="Close menu" onClick={() => setOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
          <nav aria-label="Mobile" className="menu-links">
            <Link className="menu-in serif" href="/" onClick={() => setOpen(false)} aria-current={current('/')} style={{ animationDelay: '.16s' }}>
              <span className="mnum">01</span>Home
            </Link>
            <div className="menu-in m-acc" style={{ animationDelay: '.22s' }}>
              <button type="button" className={'serif m-acc-btn' + (inServices ? ' is-current' : '')} aria-expanded={subOpen} aria-controls="m-services" onClick={() => setSubOpen((v) => !v)}>
                <span className="mnum">02</span>Services<span className="m-acc-icon" aria-hidden="true">{subOpen ? '−' : '+'}</span>
              </button>
              <div id="m-services" className="m-sub" hidden={!subOpen}>
                <Link href="/services" className="m-sub-all" onClick={() => setOpen(false)}>All services</Link>
                {serviceCategories.map((c) => (
                  <Link key={c.slug} href={`/services/${c.slug}`} className="m-sub-item" aria-current={current(`/services/${c.slug}`)} onClick={() => setOpen(false)}>
                    <span className="m-sub-thumb"><Image src={c.img} alt="" fill sizes="44px" style={{ objectPosition: c.pos ?? '50% 35%' }} /></span>
                    <span>{c.name}<small>{c.options.length} options</small></span>
                  </Link>
                ))}
              </div>
            </div>
            {mobileLinks.map((l, i) => (
              <Link key={l.href} className="menu-in serif" href={l.href} onClick={() => setOpen(false)} aria-current={current(l.href)} style={{ animationDelay: (0.28 + i * 0.06).toFixed(2) + 's' }}>
                <span className="mnum">0{i + 3}</span>{l.label}
              </Link>
            ))}
          </nav>
          <div className="menu-info menu-in" style={{ animationDelay: '.45s' }}>
            <b>Visit</b>
            <span>{site.hours}</span>
            <span>{site.address}</span>
          </div>
          <Link className="btn btn-gold menu-in menu-book" href={bookHref} onClick={() => setOpen(false)} style={{ animationDelay: '.5s' }}>Book a chair</Link>
        </div>
      )}
    </>
  );
}
