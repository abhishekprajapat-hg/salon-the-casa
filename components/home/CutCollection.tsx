'use client';

import Image from 'next/image';
import { cuts, pad } from '@/lib/data';
import { useTabs } from './useTabs';

export default function CutCollection() {
  const { active, tabProps } = useTabs(cuts.length);
  const c = cuts[active];

  return (
    <div className="coll">
      <div className="coll-media">
        <figure className="cut-fig" id="cut-panel" role="tabpanel" aria-labelledby={'cut-tab-' + active}>
          {cuts.map((x, i) => (
            <Image key={x.name} className={'layer' + (i === active ? ' on' : '')} src={x.img} alt={i === active ? x.alt : ''} aria-hidden={i !== active} fill sizes="(max-width: 960px) 100vw, 50vw" style={{ objectPosition: x.pos }} />
          ))}
          <figcaption className="cut-cap" aria-live="polite">
            <div className="cut-cap-top"><span className="serif cut-name">{c.name}</span><span className="cut-count">{pad(active)} / 10</span></div>
            <div className="cut-specs">
              <div><span className="spec-k">Top</span><span className="spec-v">{c.top}</span></div>
              <div><span className="spec-k">Sides</span><span className="spec-v">{c.sides}</span></div>
              <div><span className="spec-k">Upkeep</span><span className="spec-v">{c.upkeep}</span></div>
            </div>
          </figcaption>
        </figure>
      </div>
      <div className="coll-side">
        <div role="tablist" aria-label="Haircut styles" className="cut-list">
          {cuts.map((x, i) => (
            <button key={x.name} id={'cut-tab-' + i} aria-controls="cut-panel" className="row-btn rv" {...tabProps(i)}>
              <span className="n">{pad(i)}</span>
              <span className="t"><span className="serif nm">{x.name}</span><span className="sub">{x.line}</span></span>
              <span className="thumb"><Image src={x.img} alt="" fill sizes="(max-width: 960px) 104px, 72px" className="img-cover" style={{ objectPosition: x.pos }} /></span>
            </button>
          ))}
        </div>
        <div className="angles-block">
          <div className="angles-head"><span className="eyebrow-sm">Every angle, considered</span><span className="muted-sm">Front · Side · Back</span></div>
          <div className="angles">
            {[
              ['/images/cut-buzz-cut.jpg', 'Front view of a close buzz cut', 'Front'],
              ['/images/cut-mid-fade.jpg', 'Side profile of a mid fade', 'Side'],
              ['/images/angle-back-skin-fade.jpg', 'Back and side of a skin fade with a hair design', 'Back'],
            ].map(([src, alt, cap]) => (
              <figure key={cap} className="mask angle">
                <Image src={src} alt={alt} fill sizes="(max-width: 960px) 33vw, 15vw" className="img-cover" />
                <figcaption>{cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
