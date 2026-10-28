import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import MobileBar from '@/components/MobileBar';
import { Arrow } from '@/components/Icons';
import { pad } from '@/lib/data';
import { getCategory, serviceCategories } from '@/lib/services';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return serviceCategories.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const c = getCategory((await params).slug);
  if (!c) return {};
  return {
    title: `${c.name} — Services`,
    description: `${c.name} at Salon The Casa: ${c.options.map((o) => o.name).join(', ')}.`,
    alternates: { canonical: `/services/${c.slug}` },
    openGraph: { images: [{ url: c.img }] },
  };
}

const bookHref = (slug: string, option?: string) =>
  `/book?service=${slug}${option ? '&option=' + encodeURIComponent(option) : ''}#booking`;

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) notFound();
  const idx = serviceCategories.findIndex((x) => x.slug === slug);
  const next = serviceCategories[(idx + 1) % serviceCategories.length];

  return (
    <>
      <main id="main">
        <section className="svc-hero" aria-labelledby="cat-h">
          <div className="svc-hero-in">
            <div className="svc-hero-copy">
              <nav aria-label="Breadcrumb" className="crumbs fade">
                <Link href="/services" className="ul">Services</Link><span aria-hidden="true">/</span><span>{c.name}</span>
              </nav>
              <h1 id="cat-h" className="serif page-hero-h svc-h">
                <span className="hl"><span className="w" style={{ animationDelay: '.1s' }}>{c.name}</span></span>
              </h1>
              <p className="fade svc-intro-p" style={{ animationDelay: '.3s' }}>{c.intro}</p>
              <div className="fade btn-row" style={{ animationDelay: '.4s' }}>
                <Link className="btn btn-gold btn-lg" href={bookHref(c.slug)}>Book {c.name.toLowerCase()} <Arrow /></Link>
              </div>
            </div>
            <div className="svc-hero-img fade" style={{ animationDelay: '.2s' }}>
              <Image src={c.img} alt="" fill priority sizes="(max-width: 960px) 100vw, 45vw" style={{ objectPosition: c.pos ?? '50% 35%' }} />
            </div>
          </div>
        </section>

        {/* Category switcher */}
        <nav aria-label="Service categories" className="cat-nav">
          <div className="cat-nav-in">
            {serviceCategories.map((x) => (
              <Link key={x.slug} href={`/services/${x.slug}`} className="cat-chip" aria-current={x.slug === c.slug ? 'page' : undefined}>{x.name}</Link>
            ))}
          </div>
        </nav>

        <section aria-labelledby="opts-h" className="opts-sec">
          <div className="wrap">
            <div className="opts-head">
              <h2 id="opts-h" className="eyebrow">{c.options.length} {c.name.toLowerCase()} options</h2>
              <p className="muted-sm">Pricing is confirmed in the chair after a short consultation.</p>
            </div>
            <ul className="opts">
              {c.options.map((o, i) => (
                <li key={o.name} className="opt rv">
                  <div className="opt-img">
                    <Image src={o.img} alt={`${o.name} at Salon The Casa`} fill sizes="(max-width: 520px) 50vw, (max-width: 960px) 33vw, 25vw" style={{ objectPosition: o.pos ?? '50% 40%' }} />
                    <span className="opt-num">{pad(i)}</span>
                  </div>
                  <div className="opt-body">
                    <h3 className="serif opt-name">{o.name}</h3>
                    <p className="opt-desc">{o.desc}</p>
                    <div className="opt-foot">
                      {o.price && <span className="opt-price">{o.price}</span>}
                      <Link className="opt-book ul" href={bookHref(c.slug, o.name)} aria-label={`Book ${o.name}`}>Book <Arrow size={14} /></Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-label="Next category" className="cta-band">
          <Link href={`/services/${next.slug}`} className="next-cat">
            <span className="eyebrow">Next</span>
            <span className="serif next-cat-name">{next.name} <Arrow /></span>
            <span className="muted-sm">{next.short}</span>
          </Link>
        </section>
      </main>

      <Footer />
      <MobileBar book={{ href: bookHref(c.slug), label: 'Book a chair' }} whatsapp />
    </>
  );
}
