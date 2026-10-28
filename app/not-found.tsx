import Link from 'next/link';
import { Arrow } from '@/components/Icons';

export default function NotFound() {
  return (
    <main id="main">
      <section className="cta-band" style={{ borderTop: 0 }}>
        <div className="cta-band-in" style={{ paddingTop: 200, minHeight: '80vh' }}>
          <h1 className="serif h-cta">
            Wrong chair.<br /><span className="it gold">This page isn’t here.</span>
          </h1>
          <Link className="btn btn-gold btn-xl" href="/">Back to home <Arrow /></Link>
        </div>
      </section>
    </main>
  );
}
