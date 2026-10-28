'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * - Marks the intro curtain as played, so client-side navigation back home doesn't replay it.
 * - Scroll reveals for browsers without CSS scroll-driven animations (Safari, Firefox).
 */
export default function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const t = window.setTimeout(() => document.documentElement.classList.add('no-intro'), 2600);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const sda = typeof CSS !== 'undefined' && CSS.supports && CSS.supports('animation-timeline: view()');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (sda || reduce || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      }),
      { rootMargin: '0px 0px -10% 0px' },
    );
    document.querySelectorAll('.rv:not(.in),.ln:not(.in),.mask:not(.in)').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
