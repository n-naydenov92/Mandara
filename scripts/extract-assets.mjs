import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'

const html = readFileSync('docs/reference/mandara-hero.html', 'utf8')
const re = /data:image\/jpeg;base64,([A-Za-z0-9+/=]+)/g
const blobs = []
let match
while ((match = re.exec(html)) !== null) {
  blobs.push(match[1])
}
console.log('found', blobs.length, 'jpeg blobs')

const names = [
  'images/about/villa.jpg',
  'images/gallery/g1.jpg',
  'images/gallery/g2.jpg',
  'images/gallery/g3.jpg',
  'images/gallery/g4.jpg',
  'images/gallery/g5.jpg',
  'images/gallery/g6.jpg',
  'images/gallery/g7.jpg',
]

blobs.forEach((b64, index) => {
  const name = names[index]
  if (!name) {
    return
  }
  const buffer = Buffer.from(b64, 'base64')
  const out = join('public', name)
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, buffer)
  console.log('wrote', out, Math.round(buffer.length / 1024) + 'KB')
})
