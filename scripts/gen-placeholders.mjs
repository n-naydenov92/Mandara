import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'

function placeholderSvg(width, height, c1, c2) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${c1}"/>
        <stop offset="1" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <circle cx="${width * 0.5}" cy="${height * 0.5}" r="${height * 0.28}" fill="rgba(255,255,255,0.06)"/>
    <circle cx="${width * 0.5}" cy="${height * 0.5}" r="${height * 0.18}" fill="rgba(255,255,255,0.06)"/>
  </svg>`)
}

const ESPRESSO = '#2E2218'

const items = [
  ['images/about/villa.jpg', 1600, 1067, '#8A9277', '#4F5640'],
  ['images/gallery/pool.jpg', 1600, 1067, '#9FB0B8', '#5E6E78'],
  ['images/gallery/interior.jpg', 1600, 1067, '#E0CDB0', '#A89F92'],
  ['images/gallery/terrace.jpg', 1600, 1067, '#C49350', '#8C3F23'],
  ['images/gallery/nature.jpg', 1600, 1067, '#8A9277', '#4F5640'],
  ['images/gallery/room.jpg', 1600, 1067, '#E0CDB0', '#B5623E'],
  ['images/gallery/detail.jpg', 1600, 1067, '#B5623E', ESPRESSO],
  ['images/rooms/dawn.jpg', 1200, 900, 'hsl(215, 40%, 72%)', ESPRESSO],
  ['images/rooms/sunrise.jpg', 1200, 900, 'hsl(40, 80%, 70%)', ESPRESSO],
  ['images/rooms/noon.jpg', 1200, 900, 'hsl(48, 85%, 65%)', ESPRESSO],
  ['images/rooms/sunset.jpg', 1200, 900, 'hsl(20, 68%, 55%)', ESPRESSO],
  ['images/rooms/dusk.jpg', 1200, 900, 'hsl(295, 22%, 48%)', ESPRESSO],
  ['images/rooms/night.jpg', 1200, 900, 'hsl(235, 20%, 25%)', ESPRESSO],
  ['videos/mandara-hero-poster.jpg', 1920, 1080, '#3A3528', '#16100A'],
]

for (const [rel, width, height, c1, c2] of items) {
  const out = join('public', rel)
  mkdirSync(dirname(out), { recursive: true })
  await sharp(placeholderSvg(width, height, c1, c2)).jpeg({ quality: 82 }).toFile(out)
  console.log('wrote', out)
}
