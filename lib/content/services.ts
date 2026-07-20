/* Реалните услуги, които вилата предлага. Преизползват се на две места:
   тийзъра на началната страница (ServicesTeaser) и страницата „Изживявания"
   (ExperienceShowcase). Презентацията (икони, layout) живее в компонентите. */

export const FLAGSHIP_SERVICES = [
  { key: 'shopping', image: '/images/homepage/pazaruvane.webp' },
  { key: 'gym', image: '/images/homepage/fitnes-center-naydenov.webp' },
  { key: 'massage', image: '/images/homepage/usluga-masaj.webp' },
  { key: 'chef', image: '/images/homepage/chasten-gotvach.webp' },
] as const

export type FlagshipService = (typeof FLAGSHIP_SERVICES)[number]
export type FlagshipServiceKey = FlagshipService['key']
