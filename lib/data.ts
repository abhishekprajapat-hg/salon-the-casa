export type Cut = {
  name: string; line: string; img: string; top: string; sides: string; upkeep: string; pos: string; alt: string;
};
export type Beard = { name: string; text: string; img: string; pos: string; alt: string };

const I = (n: string) => `/images/${n}.jpg`;

export const cuts: Cut[] = [
  { name: 'Low fade', line: 'Tapered low around the ears and nape', img: I('cut-low-fade'), top: 'Scissor-cut, side part', sides: 'Skin to 2, low line', upkeep: '3–4 weeks', pos: '50% 30%', alt: 'Man with a low taper fade and side-parted top' },
  { name: 'Mid fade', line: 'Blended through the temple line', img: I('cut-mid-fade'), top: 'Textured, 3–5 cm', sides: 'Skin to 3, mid line', upkeep: '2–3 weeks', pos: '50% 30%', alt: 'Profile of a mid fade in black and white' },
  { name: 'High fade', line: 'Clean skin almost to the crown', img: I('cut-high-fade'), top: 'Short and lifted', sides: 'Skin, high line', upkeep: '2 weeks', pos: '50% 30%', alt: 'High skin fade with a shaved heart design' },
  { name: 'Textured crop', line: 'Choppy top, short forward fringe', img: I('cut-textured-crop'), top: 'Point-cut texture', sides: 'Fade or taper', upkeep: '3 weeks', pos: '50% 25%', alt: 'Textured crop with a forward fringe' },
  { name: 'Pompadour', line: 'Volume swept up and back', img: I('cut-pompadour'), top: 'Long, high volume', sides: 'Undercut or fade', upkeep: '3–4 weeks', pos: '50% 25%', alt: 'Pompadour with short sides' },
  { name: 'Quiff', line: 'Front lifted, loose and textured', img: I('cut-quiff'), top: 'Long at the front', sides: 'Faded, 1–2', upkeep: '3 weeks', pos: '50% 20%', alt: 'Textured quiff with faded sides' },
  { name: 'Slick-back', line: 'Combed straight back, polished', img: I('cut-slick-back'), top: 'Medium, combed back', sides: 'Tapered', upkeep: '4 weeks', pos: '50% 20%', alt: 'Slicked-back hair and short beard' },
  { name: 'Buzz cut', line: 'One length, all over', img: I('cut-buzz-cut'), top: 'Guard 1–3', sides: 'Same as top', upkeep: '2 weeks', pos: '50% 35%', alt: 'Close buzz cut on a dark background' },
  { name: 'Curly top', line: 'Natural curls, tight taper', img: I('cut-curly-top'), top: 'Curls kept long', sides: 'Tapered', upkeep: '3–4 weeks', pos: '50% 30%', alt: 'Curly top with tapered sides and a goatee' },
  { name: 'Modern mullet', line: 'Short front, length at the nape', img: I('cut-modern-mullet'), top: 'Short, textured', sides: 'Faded, long nape', upkeep: '4 weeks', pos: '50% 25%', alt: 'Modern mullet with a moustache in profile' },
];

export const beards: Beard[] = [
  { name: 'Full beard', text: 'Grown, shaped and conditioned — balanced to the jaw, with a clean neckline and cheek line.', img: I('beard-full-beard'), pos: '50% 30%', alt: 'Full dark beard in three-quarter view' },
  { name: 'Short boxed', text: 'Short and dense with crisp edges. Tidy enough for the office, strong enough for the weekend.', img: I('beard-short-boxed'), pos: '50% 35%', alt: 'Short boxed beard in black and white' },
  { name: 'Stubble', text: 'Three to five days, evened out with a trimmer and a defined neck.', img: I('beard-stubble'), pos: '50% 50%', alt: 'Close-up of heavy stubble' },
  { name: 'Faded beard', text: 'Beard blended up into a skin fade at the sideburn for a seamless line.', img: I('beard-faded-beard'), pos: '40% 30%', alt: 'Beard fading into a skin fade, in profile' },
  { name: 'Sharp line-up', text: 'Razor-defined cheek and neck lines for the cleanest possible outline.', img: I('beard-sharp-line-up'), pos: '50% 30%', alt: 'Barber lining up a beard with a straight razor' },
  { name: 'Goatee', text: 'Chin and moustache only, cheeks clean. Shaped to the lip line.', img: I('beard-goatee'), pos: '50% 40%', alt: 'Goatee in black and white' },
  { name: 'Chevron', text: 'A full moustache trimmed to the upper lip — the classic.', img: I('beard-chevron'), pos: '50% 30%', alt: 'Full chevron moustache' },
  { name: 'Handlebar', text: 'Longer moustache with ends trained and waxed upward.', img: I('beard-handlebar'), pos: '50% 40%', alt: 'Handlebar moustache in black and white' },
  { name: 'Clean-shaven', text: 'A hot-towel straight-razor shave for a close, smooth finish.', img: I('beard-clean-shaven'), pos: '50% 30%', alt: 'Clean-shaven man in black and white' },
];

export const kit = [
  { cls: 'k1', name: 'The clipper', img: I('kit-the-clipper'), alt: 'Cordless clipper standing in a charging dock beside combs' },
  { cls: 'k2', name: 'Cutting shears', img: I('kit-cutting-shears'), alt: 'Cutting and thinning shears laid on a wooden station' },
  { cls: 'k3', name: 'Thinning shears', img: I('kit-thinning-shears'), alt: 'Thinning shears and comb working through the back of a short cut' },
  { cls: 'k4', name: 'Beard trimmer', img: I('kit-beard-trimmer'), alt: 'Gold beard trimmer and brush on a barber mat' },
  { cls: 'k5', name: 'Straight razors', img: I('kit-straight-razors'), alt: 'Two folding straight razors on wood' },
  { cls: 'k6', name: 'Brushes & combs', img: I('kit-brushes-and-combs'), alt: 'Wooden brushes, combs and tins on a dark surface', pos: '50% 40%' },
  { cls: 'k7', name: 'The dryer', img: I('kit-the-dryer'), alt: 'Barber blow-drying a client’s hair', pos: '50% 30%' },
  { cls: 'k8', name: 'The station', img: I('kit-the-station'), alt: 'Black leather barber chair and mirror station by a brick wall' },
  { cls: 'k9', name: 'The chair', img: I('kit-barber-chair'), alt: 'Black and chrome barber chair' },
  { cls: 'k10', name: 'Pomade & powder', img: I('kit-pomade-and-powder'), alt: 'Pomade jar, shaving brush, clipper and comb' },
  { cls: 'k11', name: 'Beard oil', img: I('kit-beard-oil'), alt: 'Hands dropping beard oil from an amber bottle' },
] as { cls: string; name: string; img: string; alt: string; pos?: string }[];

export const services = [
  { slug: 'haircut', name: 'Haircut & style', text: 'Consultation, precision cut, wash and a finish you can recreate at home.', img: I('service-haircut-and-style') },
  { slug: 'haircut', name: 'Skin fade & taper', text: 'Clipper-blended from skin, refined with scissors and a razor-sharp outline.', img: I('service-skin-fade-and-taper') },
  { slug: 'beard', name: 'Beard sculpt & line-up', text: 'Shape, length and line work, finished with hot towel and beard oil.', img: I('service-beard-sculpt-and-line-up') },
  { slug: 'shave', name: 'Hot-towel shave', text: 'Pre-shave oil, hot towels and a straight-razor shave. Unhurried.', img: I('service-hot-towel-shave') },
  { slug: 'colour', name: 'Grey blending & colour', text: 'Natural-looking grey blending for hair and beard — subtle by default.', img: I('service-grey-blending-and-colour') },
  { slug: 'packages', name: 'Groom packages', text: 'Wedding-day cuts, shaves and beard work, with a trial beforehand.', img: I('service-groom-packages') },
];

export const lookbook = [
  { img: I('lookbook-pompadour-shaved-sides'), cap: 'Pompadour, shaved sides', w: 340, ratio: '3 / 4', gray: 1 },
  { img: I('lookbook-low-light'), cap: 'Low light', w: 300, ratio: '2 / 3', gray: 1 },
  { img: I('service-grey-blending-and-colour'), cap: 'Curls & beard', w: 420, ratio: '1 / 1', gray: 1 },
  { img: I('lookbook-high-top-fade'), cap: 'High top fade', w: 300, ratio: '2 / 3', gray: 0 },
  { img: I('lookbook-clean-back-line'), cap: 'Clean back line', w: 340, ratio: '3 / 4', gray: 0 },
  { img: I('lookbook-swept-back'), cap: 'Swept back', w: 300, ratio: '2 / 3', gray: 0 },
  { img: I('lookbook-shadow-study'), cap: 'Shadow study', w: 300, ratio: '2 / 3', gray: 1 },
];

export const marquee = ['Low fade', 'Textured crop', 'Pompadour', 'Beard sculpt', 'Hot-towel shave', 'Line-up', 'Grey blending'];

export const principles = [
  { num: 'i.', title: 'Listen first', text: 'Every appointment opens with a proper consultation: your hair, your beard, your routine and what you want to change.' },
  { num: 'ii.', title: 'Classic craft', text: 'Scissor work, clipper blending and the straight razor — traditional barbering techniques done precisely.' },
  { num: 'iii.', title: 'Modern finish', text: 'Contemporary shapes chosen for how they grow out, with product advice so the look lasts between visits.' },
];

export const barbers = [
  { name: '[Barber name]', role: '[Role] · [Specialty]', img: I('barber-placeholder-1'), offset: 0 },
  { name: '[Barber name]', role: '[Role] · [Specialty]', img: I('barber-placeholder-2'), offset: 64 },
  { name: '[Barber name]', role: '[Role] · [Specialty]', img: I('barber-placeholder-3'), offset: 0 },
];

export const bookingDefaultImg = I('book-salon-interior');

export const instagramTiles = [1, 2, 3, 4, 5, 6].map((n) => I(`instagram-${n}`));

export const pad = (i: number) => String(i + 1).padStart(2, '0');
