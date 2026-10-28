# Salon The Casa — website (Next.js)

The full frontend for Salon The Casa, built from the design canvas:

| Page | Route | What's on it |
|---|---|---|
| Home | `/` | Hero, cut collection (10 cuts), beard atlas (9 styles), the kit, services, lookbook, about teaser, visit |
| About & Barbers | `/about` | Story, approach, barber cards |
| Services | `/services` | All 9 categories |
| Service category | `/services/haircut`, `/services/beard`, … | Every option with its own photo + Book link |
| Book & Contact | `/book` | Appointment request form, contact & location, Instagram grid |

Next.js 16 (App Router), React 19, TypeScript. Plain CSS (`app/globals.css`), no UI library. Fonts (Bodoni Moda + Manrope) are self-hosted from npm, so there are no Google Fonts calls.

## Run it

Needs Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

## Before going live: edit `lib/site.ts`

All business details live in one file:

- `url`: the final domain (used for SEO, sitemap and social previews)
- `phone`, `whatsapp` (digits with country code, e.g. `919876543210`)
- `address`, `hours`
- `instagram` (handle without @)
- `mapsUrl` (Google Maps share link)

Fields left empty show a placeholder, and the links that depend on them (Call, WhatsApp, Directions, Follow) stay hidden. Once `whatsapp` is set, a submitted booking form gives a **Send on WhatsApp** button with the request pre-filled.

Other placeholders to replace:
- Salon story text: `app/page.tsx` (About section) and `app/about/page.tsx`
- Barber names, roles and photos: `barbers` in `lib/data.ts`, plus files in `public/images/`
- Instagram grid images: `public/images/instagram-1…6.jpg`
- Stock photos (Unsplash) are for preview. To swap one, keep the same filename in `public/images/`.

## Services menu — edit `lib/services.ts`

Categories (Haircuts, Beard & Moustache, Shaves, De-tan, Facials & Clean-up, Hair Spa & Scalp, Hair & Beard Colour, Hands & Feet, Groom & Packages) and their options all live in `lib/services.ts`. Add or remove an option there and the nav dropdown, the category pages, the sitemap and the booking form update on their own.

- Add a price to any option with `price: '₹499'` (prices are hidden until you add one).
- Service photos are in `public/images/services/`. They are free Unsplash stock photos; swap in the salon's own photos with the same filename.
- Each option's **Book** link opens the booking form with the category already selected and the option name in the notes.

## Booking

The form validates the service, a date from today onward, time of day, name and phone (7–15 digits). It does **not** book anything by itself. It hands off to WhatsApp or a phone call. To connect a real booking backend later, see the `INTEGRATION POINT` comment in `components/book/BookingForm.tsx`.

## Project layout

```
app/
  layout.tsx        root layout: fonts, header, SEO metadata, JSON-LD (BarberShop)
  page.tsx          Home
  about/page.tsx    About & Barbers
  book/page.tsx     Book & Contact
  sitemap.ts, robots.ts, not-found.tsx
  globals.css       all styles + motion
components/
  Header.tsx        nav + mobile menu (focus-trapped, Esc to close)
  Footer.tsx, MobileBar.tsx, Icons.tsx
  SiteEffects.tsx   intro-once logic + scroll reveals for Safari/Firefox
  home/             Hero (pointer parallax), CutCollection, BeardAtlas, useTabs
  book/             BookingForm
lib/
  site.ts           business details  ← edit this
  data.ts           cuts, beards, kit, services, lookbook, barbers…
public/images/      all photos
```

## Notes

- **Mobile-first CSS.** The base styles in `app/globals.css` are for phones. Larger screens are layered on with `min-width` queries at 761px (tablet) and 961px (desktop). Hover effects only run on devices with a mouse.
- On phones: the cut and beard pickers are swipe strips, the booking button is pinned to the bottom of the form, and a sticky bar offers Book + WhatsApp.
- Scroll animations use CSS scroll-driven animations (Chrome/Edge). Safari and Firefox get an IntersectionObserver fallback.
- If the visitor has reduced motion turned on, all animation is switched off.
- The intro curtain plays once per browser session.
- Deploy: Vercel works with zero config. Every page is static, so any Node host works too.
