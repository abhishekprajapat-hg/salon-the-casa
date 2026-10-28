'use client';

import Image from 'next/image';
import { beards, pad } from '@/lib/data';
import { useTabs } from './useTabs';

export default function BeardAtlas() {
  const { active, tabProps } = useTabs(beards.length);
  const b = beards[active];

  return (
    <div className="atlas">
      <figure className="beard-fig" id="beard-panel" role="tabpanel" aria-labelledby={'beard-tab-' + active}>
        <div className="beard-frame">
          {beards.map((x, i) => (
            <Image key={x.name} className={'layer' + (i === active ? ' on' : '')} src={x.img} alt={i === active ? x.alt : ''} aria-hidden={i !== active} fill sizes="(max-width: 960px) 100vw, 50vw" style={{ objectPosition: x.pos }} />
          ))}
        </div>
        <figcaption className="beard-cap" aria-live="polite">
          <span className="serif beard-name">{b.name}</span>
          <span className="beard-count">{pad(active)} / 09</span>
          <span className="beard-text">{b.text}</span>
        </figcaption>
      </figure>
      <div className="atlas-side">
        <div role="tablist" aria-label="Beard styles" className="atlas-grid">
          {beards.map((x, i) => (
            <button key={x.name} id={'beard-tab-' + i} aria-controls="beard-panel" aria-label={x.name} className="tile" {...tabProps(i)}>
              <Image src={x.img} alt="" fill sizes="(max-width: 960px) 108px, 16vw" style={{ objectPosition: x.pos, objectFit: 'cover' }} />
              <span className="tile-cap"><span>{x.name}</span><span className="gold">{pad(i)}</span></span>
            </button>
          ))}
        </div>
        <p className="atlas-note"><span className="hover-only">Hover a tile to see it in colour. </span>Moustache variations: chevron and handlebar.</p>
      </div>
    </div>
  );
}
