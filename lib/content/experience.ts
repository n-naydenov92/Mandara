export const EXPERIENCE_THEME_KEYS = ['gastronomy', 'wellness', 'nature', 'events'] as const
export type ExperienceThemeKey = (typeof EXPERIENCE_THEME_KEYS)[number]

export interface ExperienceSlide {
  src: string
  slideKey: string
}

/* Placeholder снимки (преизползват /public/images/*) — ще се сменят с реална
   фотосесия. Етикетите на слайдовете живеят в locales/<lng>/experience.json
   под themes.<theme>.slides.<slideKey>. */
export const EXPERIENCE_MEDIA = {
  gastronomy: [
    { src: '/images/gallery/g4.jpg', slideKey: 'menu' },
    { src: '/images/gallery/g2.jpg', slideKey: 'outdoor' },
    { src: '/images/gallery/g5.jpg', slideKey: 'wine' },
  ],
  wellness: [
    { src: '/images/gallery/g1.jpg', slideKey: 'spa' },
    { src: '/images/about/villa.jpg', slideKey: 'yoga' },
    { src: '/images/gallery/g4.jpg', slideKey: 'pool' },
  ],
  nature: [
    { src: '/images/gallery/g5.jpg', slideKey: 'trails' },
    { src: '/images/about/villa.jpg', slideKey: 'herbs' },
    { src: '/images/gallery/g4.jpg', slideKey: 'monastery' },
  ],
  events: [
    { src: '/images/gallery/g4.jpg', slideKey: 'intimate' },
    { src: '/images/gallery/g2.jpg', slideKey: 'celebrations' },
    { src: '/images/gallery/g5.jpg', slideKey: 'dinner' },
  ],
} as const satisfies Record<ExperienceThemeKey, readonly ExperienceSlide[]>
