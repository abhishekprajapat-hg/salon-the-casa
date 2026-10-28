'use client';

import { useRef, useState } from 'react';

/** Roving-tabindex tab group: click + arrow/Home/End keys. */
export function useTabs(count: number) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const pick = (i: number, focus = false) => {
    setActive(i);
    const el = refs.current[i];
    if (!el) return;
    if (focus) el.focus({ preventScroll: true });
    // On phones the tabs sit in a horizontal swipe strip: centre the picked one.
    const strip = el.parentElement;
    if (strip && strip.scrollWidth > strip.clientWidth + 4) {
      const left = el.offsetLeft - (strip.clientWidth - el.offsetWidth) / 2;
      strip.scrollTo({ left, behavior: 'smooth' });
    }
  };

  const tabProps = (i: number) => ({
    ref: (el: HTMLButtonElement | null) => { refs.current[i] = el; },
    role: 'tab' as const,
    type: 'button' as const,
    'aria-selected': i === active,
    tabIndex: i === active ? 0 : -1,
    onClick: () => pick(i),
    onKeyDown: (e: React.KeyboardEvent) => {
      let t: number | null = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') t = (i + 1) % count;
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') t = (i - 1 + count) % count;
      else if (e.key === 'Home') t = 0;
      else if (e.key === 'End') t = count - 1;
      if (t !== null) { e.preventDefault(); pick(t, true); }
    },
  });

  return { active, tabProps };
}
