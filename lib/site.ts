/**
 * Business details — edit these before going live.
 * Empty strings mean "not configured": the UI shows a placeholder
 * and hides links (WhatsApp, call, directions, Instagram) that need them.
 */
export const site = {
  name: 'Salon The Casa',
  /** Final domain, used for SEO tags, sitemap and social previews. */
  url: 'https://www.salonthecasa.com',
  description:
    "Salon The Casa — a premium men's grooming house for precision cuts, skin fades, beard sculpting and hot-towel shaves.",

  /** Digits with country code, e.g. '919876543210' */
  whatsapp: '',
  /** Display phone, e.g. '+91 98765 43210' */
  phone: '',
  address: '[Street address]\n[Area, City, PIN]',
  hours: '[Mon–Sat · opening–closing]\n[Sunday · hours or closed]',
  /** Handle without @ */
  instagram: '',
  /** Google Maps share link */
  mapsUrl: '',
};

export const waDigits = site.whatsapp.replace(/\D/g, '');
export const telDigits = site.phone.replace(/[^\d+]/g, '');
export const hasWhatsApp = waDigits.length >= 8;
export const hasPhone = telDigits.replace('+', '').length >= 7;
export const hasInstagram = site.instagram.replace(/^@/, '').length > 0;
export const igHandle = site.instagram.replace(/^@/, '');
export const waLink = (text?: string) =>
  'https://wa.me/' + waDigits + (text ? '?text=' + encodeURIComponent(text) : '');
