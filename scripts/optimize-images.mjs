// Оптимизира всички растерни снимки в public/images към WebP.
// PNG/JPG са тежки (до 10 MB) — WebP q80 сваля ~85–95% без видима загуба.
// Размерите се запазват, за да останат валидни всички width/height константи в кода.
//
// Употреба:
//   node scripts/optimize-images.mjs           # конвертира и трие оригиналите
//   node scripts/optimize-images.mjs --keep    # пази оригиналите (само създава .webp)
//   node scripts/optimize-images.mjs --dry     # само отчита, не пипа файлове

import { readdir, stat, unlink } from 'node:fs/promises'
import { join, extname } from 'node:path'
import sharp from 'sharp'

const IMAGES_DIR = 'public/images'
const WEBP_QUALITY = 80
const SOURCE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg'])
const BYTES_PER_MB = 1024 * 1024

const keepOriginals = process.argv.includes('--keep')
const dryRun = process.argv.includes('--dry')

async function collectImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await collectImages(path)))
      continue
    }
    if (SOURCE_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      files.push(path)
    }
  }
  return files
}

function toMb(bytes) {
  return (bytes / BYTES_PER_MB).toFixed(2)
}

async function optimizeImage(source) {
  const target = source.replace(/\.(png|jpe?g)$/i, '.webp')
  const before = (await stat(source)).size

  if (dryRun) {
    return { source, before, after: null }
  }

  await sharp(source).webp({ quality: WEBP_QUALITY }).toFile(target)
  const after = (await stat(target)).size

  if (!keepOriginals) {
    await unlink(source)
  }
  return { source, target, before, after }
}

async function main() {
  const images = await collectImages(IMAGES_DIR)
  if (images.length === 0) {
    console.log(`Няма PNG/JPG за конвертиране в ${IMAGES_DIR}.`)
    return
  }

  let totalBefore = 0
  let totalAfter = 0

  for (const source of images) {
    const { before, after } = await optimizeImage(source)
    totalBefore += before
    if (after === null) {
      console.log(`[dry] ${source}  ${toMb(before)} MB`)
      continue
    }
    totalAfter += after
    const saved = Math.round(100 - (after / before) * 100)
    console.log(`${source}  ${toMb(before)} MB → ${toMb(after)} MB webp  (-${saved}%)`)
  }

  console.log('\n————')
  console.log(`Файлове: ${images.length}`)
  console.log(`Преди:   ${toMb(totalBefore)} MB`)
  if (!dryRun) {
    console.log(`След:    ${toMb(totalAfter)} MB  (-${Math.round(100 - (totalAfter / totalBefore) * 100)}%)`)
    if (!keepOriginals) {
      console.log('Оригиналните PNG/JPG са изтрити (възстановими през git).')
    }
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
