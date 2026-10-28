/**
 * The full service menu: categories → options.
 * Add, remove or rename freely; pages, the nav dropdown, sitemap and the
 * booking form all read from this file.
 *
 * `price` is optional. Leave it out to show nothing (the design says
 * "pricing is confirmed in the chair"), or set e.g. price: '₹499'.
 */
export type ServiceOption = {
  name: string;
  desc: string;
  img: string;
  /** object-position for the photo crop */
  pos?: string;
  price?: string;
};

export type ServiceCategory = {
  slug: string;
  name: string;
  /** One line under the name in menus and cards */
  short: string;
  /** Paragraph at the top of the category page */
  intro: string;
  /** Cover image for cards and the category hero */
  img: string;
  pos?: string;
  options: ServiceOption[];
};

const S = (n: string) => `/images/services/${n}.jpg`;
const I = (n: string) => `/images/${n}.jpg`;

export const serviceCategories: ServiceCategory[] = [
  {
    slug: 'haircut',
    name: 'Haircuts',
    short: 'Fades, crops, classics and kids',
    intro: 'Every cut starts with a consultation: head shape, hair texture, how you style it and how often you want to come back. Then it’s precision work — clipper, scissor and razor.',
    img: S('hair-event-styling'),
    options: [
      { name: 'Classic scissor cut', desc: 'A tailored all-scissor cut with a soft, natural finish.', img: S('hair-classic-scissor') },
      { name: 'Low fade', desc: 'Tapered low around the ears and nape — clean but understated.', img: I('cut-low-fade'), pos: '50% 30%' },
      { name: 'Mid fade', desc: 'Blended through the temple line for a sharper outline.', img: I('cut-mid-fade'), pos: '50% 30%' },
      { name: 'High skin fade', desc: 'Clean skin almost to the crown, blended seamlessly.', img: I('cut-high-fade'), pos: '50% 30%' },
      { name: 'Textured crop', desc: 'Choppy, point-cut top with a short forward fringe.', img: I('cut-textured-crop'), pos: '50% 25%' },
      { name: 'Pompadour', desc: 'Volume swept up and back over short sides.', img: I('cut-pompadour'), pos: '50% 25%' },
      { name: 'Quiff', desc: 'Front lifted, loose and textured; faded sides.', img: I('cut-quiff'), pos: '50% 20%' },
      { name: 'Slick-back', desc: 'Combed straight back with a polished, tapered finish.', img: I('cut-slick-back'), pos: '50% 20%' },
      { name: 'Buzz cut', desc: 'One length all over, with a crisp neckline.', img: I('cut-buzz-cut'), pos: '50% 35%' },
      { name: 'Curly top & taper', desc: 'Natural curls kept long on top, tight taper on the sides.', img: I('cut-curly-top'), pos: '50% 30%' },
      { name: 'Modern mullet', desc: 'Short front, length at the nape, faded sides.', img: I('cut-modern-mullet'), pos: '50% 25%' },
      { name: 'Texturising & thinning', desc: 'Weight removed from thick hair so it sits and moves better.', img: S('hair-texturising') },
      { name: 'Kids’ haircut', desc: 'Patient, quick cuts for younger clients.', img: S('hair-kids'), pos: '50% 30%' },
      { name: 'Hair wash & blow-dry', desc: 'Shampoo, condition and a styled blow-dry finish.', img: S('hair-wash-blowdry') },
    ],
  },
  {
    slug: 'beard',
    name: 'Beard & Moustache',
    short: 'Shaping, line-ups, moustache work',
    intro: 'Shape, length and line — balanced to your jaw. Every beard service is finished with a hot towel and beard oil.',
    img: S('beard-trim-shape'),
    options: [
      { name: 'Full beard shaping', desc: 'Grown, shaped and conditioned with a clean neck and cheek line.', img: I('beard-full-beard'), pos: '50% 30%' },
      { name: 'Short boxed beard', desc: 'Short and dense with crisp, squared edges.', img: I('beard-short-boxed'), pos: '50% 35%' },
      { name: 'Stubble trim', desc: 'Three to five days, evened out with a defined neckline.', img: I('beard-stubble') },
      { name: 'Faded beard', desc: 'Beard blended up into a skin fade at the sideburn.', img: I('beard-faded-beard'), pos: '40% 30%' },
      { name: 'Razor line-up', desc: 'Razor-defined cheek and neck lines for the sharpest outline.', img: I('beard-sharp-line-up'), pos: '50% 30%' },
      { name: 'Scissor beard trim', desc: 'Length and shape taken down by hand for a natural look.', img: S('beard-scissor-trim') },
      { name: 'Goatee', desc: 'Chin and moustache only, cheeks clean.', img: I('beard-goatee'), pos: '50% 40%' },
      { name: 'Moustache styling', desc: 'A full chevron trimmed neatly to the lip line.', img: I('beard-chevron'), pos: '50% 30%' },
      { name: 'Handlebar moustache', desc: 'Longer moustache with ends trained and waxed upward.', img: I('beard-handlebar'), pos: '50% 40%' },
      { name: 'Beard spa & oil', desc: 'Cleanse, soften and condition the beard and skin beneath.', img: I('kit-beard-oil') },
    ],
  },
  {
    slug: 'shave',
    name: 'Shaves',
    short: 'Hot towel, straight razor, head shave',
    intro: 'The barbershop ritual: pre-shave oil, hot towels and a straight razor, done slowly and properly.',
    img: S('shave-hot-towel'),
    options: [
      { name: 'Hot-towel shave', desc: 'Hot towels, rich lather and a close straight-razor shave.', img: S('shave-hot-towel') },
      { name: 'Royal shave', desc: 'The full ritual with a second pass, face massage and cold towel finish.', img: S('shave-head') },
      { name: 'Clean shave', desc: 'A smooth, close finish — beard to bare in one sitting.', img: I('beard-clean-shaven'), pos: '50% 30%' },
      { name: 'Head shave', desc: 'A smooth straight-razor head shave with a soothing balm.', img: S('shave-razor') },
      { name: 'Express shave', desc: 'A quicker clean-up shave for the days you’re short on time.', img: S('shave-self') },
    ],
  },
  {
    slug: 'de-tan',
    name: 'De-tan',
    short: 'Face, neck, arms and feet',
    intro: 'Sun and pollution leave skin dull and uneven. A de-tan pack lifts tan and brightens skin — on the face or wherever you need it.',
    img: S('detan-face'),
    options: [
      { name: 'Face de-tan', desc: 'A brightening pack to lift tan and even out the face.', img: S('detan-face') },
      { name: 'Face & neck de-tan', desc: 'Face and neck treated together so the tone matches.', img: S('detan-face-neck') },
      { name: 'Hands & arms de-tan', desc: 'For the tan line that every rider and runner knows.', img: S('detan-arms') },
      { name: 'Feet de-tan', desc: 'De-tan pack and massage for sun-darkened feet.', img: S('detan-feet') },
      { name: 'De-tan + clean-up combo', desc: 'Clean-up and de-tan pack in one sitting for a full refresh.', img: S('facial-clay') },
    ],
  },
  {
    slug: 'facial',
    name: 'Facials & Clean-up',
    short: 'Clean-ups, charcoal, hydrating',
    intro: 'Facials made for men’s skin — shaving, sweat and city air included. Cleanse, exfoliate, treat and calm.',
    img: S('facial-antiageing'),
    options: [
      { name: 'Basic clean-up', desc: 'Cleanse, exfoliate and steam — a quick reset for tired skin.', img: S('facial-cleanup') },
      { name: 'Charcoal facial', desc: 'Deep-cleansing charcoal for oily, congested skin.', img: S('facial-charcoal') },
      { name: 'Charcoal peel-off mask', desc: 'Lifts blackheads and excess oil from the nose and chin.', img: S('facial-peel-off') },
      { name: 'Hydrating sheet-mask facial', desc: 'Moisture for dry or post-shave skin.', img: S('facial-sheet') },
      { name: 'Anti-ageing facial', desc: 'Massage and mask to firm and refresh the skin.', img: S('facial-antiageing') },
      { name: 'Hot-towel steam facial', desc: 'Steam and hot towels to open pores before the treatment.', img: S('facial-steam') },
      { name: 'Face massage', desc: 'Pressure-point face and temple massage. Pure relaxation.', img: S('facial-massage') },
    ],
  },
  {
    slug: 'hair-spa',
    name: 'Hair Spa & Scalp',
    short: 'Spa, dandruff, hair-fall, massage',
    intro: 'Healthy hair starts at the scalp. Treatments to nourish, clear dandruff, control hair-fall and simply relax.',
    img: S('spa-classic'),
    options: [
      { name: 'Classic hair spa', desc: 'Cleanse, nourishing mask and steam for soft, healthy hair.', img: S('spa-classic') },
      { name: 'Anti-dandruff treatment', desc: 'Scalp exfoliation and treatment to clear flakes and itch.', img: S('spa-dandruff') },
      { name: 'Hair-fall control', desc: 'Strengthening scalp treatment with massage.', img: S('spa-hairfall') },
      { name: 'Scalp detox', desc: 'Clears build-up from products and pollution.', img: S('spa-tonic') },
      { name: 'Keratin smoothening', desc: 'Tames frizz and makes thick hair easier to style.', img: S('spa-keratin') },
      { name: 'Head massage', desc: 'Oil head, neck and shoulder massage to release tension.', img: S('spa-head-massage') },
      { name: 'Deep-conditioning wash', desc: 'Sulphate-free cleanse with an intensive conditioner.', img: S('spa-shampoo') },
    ],
  },
  {
    slug: 'colour',
    name: 'Hair & Beard Colour',
    short: 'Grey blending, highlights, fashion',
    intro: 'From subtle grey blending to bold fashion shades — colour that looks deliberate, not dyed.',
    img: S('colour-highlights'),
    options: [
      { name: 'Global hair colour', desc: 'One even shade, root to tip.', img: S('colour-red') },
      { name: 'Grey blending', desc: 'Softens grey for a natural, lived-in look — subtle by default.', img: I('service-grey-blending-and-colour') },
      { name: 'Highlights', desc: 'Lighter strands for depth and movement.', img: S('colour-highlights') },
      { name: 'Fashion colour', desc: 'Bold, vivid shades for when you want to be noticed.', img: S('colour-fashion') },
      { name: 'Pastel & creative colour', desc: 'Pinks, lilacs and silvers, pre-lightened properly.', img: S('colour-dye') },
      { name: 'Beard colour', desc: 'Even out patchy or grey beards with a natural tone.', img: S('colour-beard') },
    ],
  },
  {
    slug: 'hands-feet',
    name: 'Hands & Feet',
    short: 'Manicure, pedicure, nail care',
    intro: 'Clean, tidy nails and soft skin — the detail people notice when you shake hands.',
    img: S('hf-spa-pedicure'),
    options: [
      { name: 'Classic manicure', desc: 'Nail shaping, cuticle care, buff and hand massage.', img: S('hf-manicure') },
      { name: 'Classic pedicure', desc: 'Soak, scrub, nail care and foot massage.', img: S('hf-pedicure') },
      { name: 'Spa pedicure', desc: 'A longer pedicure with mask and extended massage.', img: S('hf-spa-pedicure') },
      { name: 'Nail cut & file', desc: 'A quick, neat trim and shape for hands or feet.', img: S('hf-tools') },
    ],
  },
  {
    slug: 'packages',
    name: 'Groom & Packages',
    short: 'Wedding, combos, father & son',
    intro: 'Combined services for big days and regular upkeep. Wedding packages include a trial beforehand.',
    img: S('pkg-groom'),
    pos: '50% 20%',
    options: [
      { name: 'Groom package', desc: 'Cut, beard or shave, facial and styling for the wedding day.', img: S('pkg-groom'), pos: '50% 20%' },
      { name: 'Pre-wedding package', desc: 'A series of sessions in the weeks before — skin, hair and beard.', img: S('pkg-prewedding'), pos: '50% 20%' },
      { name: 'Haircut + beard combo', desc: 'The regular: a cut and a beard shape in one visit.', img: S('pkg-cut-mirror') },
      { name: 'Father & son', desc: 'Two chairs, two cuts — book together.', img: S('pkg-father-son') },
      { name: 'Classic barber experience', desc: 'Cut, hot-towel shave and head massage. The full ritual.', img: S('pkg-barbershop') },
      { name: 'Full grooming day', desc: 'Cut, beard, facial and hands & feet — head to toe.', img: I('service-groom-packages') },
    ],
  },
];

export const getCategory = (slug: string) => serviceCategories.find((c) => c.slug === slug);
export const totalOptions = serviceCategories.reduce((n, c) => n + c.options.length, 0);
