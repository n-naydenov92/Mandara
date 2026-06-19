export interface SiteContact {
  email: string
  phone: string
  whatsapp: string
}

export interface SiteSocial {
  instagramUrl: string
  instagramHandle: string
  facebookUrl: string
}

export interface SiteMap {
  lat: number
  lng: number
}

export interface SiteConfig {
  url: string
  contact: SiteContact
  social: SiteSocial
  map: SiteMap
}

export const SITE: SiteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vilamandara.bg',
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'contact@vilamandara.bg',
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '+359 000 000 000',
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? '+359 000 000 000',
  },
  social: {
    instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://instagram.com/vilamandara',
    instagramHandle: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? '@vilamandara',
    facebookUrl: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? 'https://facebook.com/vilamandara',
  },
  map: {
    lat: Number(process.env.NEXT_PUBLIC_MAP_LAT ?? 0),
    lng: Number(process.env.NEXT_PUBLIC_MAP_LNG ?? 0),
  },
}
