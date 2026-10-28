import Link from 'next/link';
import { site, hasPhone, hasInstagram, hasWhatsApp, igHandle, telDigits, waLink } from '@/lib/site';
import { ArrowUp } from './Icons';

type Props = {
  /** Two-line brand statement shown top-left */
  tagline?: [string, string];
};

export default function Footer({ tagline = ['Men’s grooming house.', 'Crafted for your style.'] }: Props) {
  return (
    <footer className="foot-pad">
      <div className="wrap foot-in">
        <div className="foot">
          <div className="foot-brand">
            <p className="serif foot-tag">{tagline[0]}<br /><span className="it gold">{tagline[1]}</span></p>
            <Link className="btn btn-gold btn-md" href="/book">Book a chair</Link>
          </div>
          <nav aria-label="Footer" className="foot-col">
            <span className="foot-h">Explore</span>
            <Link className="ul" href="/#styles">Cut collection</Link>
            <Link className="ul" href="/#beards">Beard atlas</Link>
            <Link className="ul" href="/services">Services</Link>
            <Link className="ul" href="/about">About</Link>
            <Link className="ul" href="/book">Book</Link>
          </nav>
          <div className="foot-col">
            <span className="foot-h">Visit</span>
            <span className="soft" style={{ whiteSpace: 'pre-line' }}>{site.address}</span>
            <span className="soft" style={{ whiteSpace: 'pre-line' }}>{site.hours}</span>
          </div>
          <div className="foot-col">
            <span className="foot-h">Contact</span>
            {hasPhone ? <a className="ul" href={'tel:' + telDigits}>{site.phone}</a> : <span className="soft">[Phone number]</span>}
            {hasInstagram ? <a className="ul" href={'https://instagram.com/' + igHandle} target="_blank" rel="noopener">Instagram</a> : <Link className="ul" href="/book#social">Instagram</Link>}
            {hasWhatsApp ? <a className="ul" href={waLink()} target="_blank" rel="noopener">WhatsApp</a> : <Link className="ul" href="/book#contact">WhatsApp</Link>}
            <Link className="ul" href="/book#contact">Find the salon</Link>
          </div>
        </div>
        <div aria-hidden="true" className="serif foot-mark">Salon <span className="it">the</span> Casa</div>
        <div className="foot-base">
          <span>© {new Date().getFullYear()} Salon The Casa. All rights reserved. Preview photography: Unsplash (stock).</span>
          <a className="ul to-top" href="#top">Back to top <ArrowUp /></a>
        </div>
      </div>
    </footer>
  );
}
