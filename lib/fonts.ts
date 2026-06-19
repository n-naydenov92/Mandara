import { Cormorant_Garamond, Manrope, Caveat } from 'next/font/google'

export const fontDisplay = Cormorant_Garamond({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

export const fontUi = Manrope({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500'],
  variable: '--font-ui',
  display: 'swap',
})

export const fontScript = Caveat({
  subsets: ['cyrillic', 'latin'],
  weight: ['500'],
  variable: '--font-script',
  display: 'swap',
})
