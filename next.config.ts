import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Само WebP: AVIF енкодерът (sharp/libvips) увисва при определени снимки на
    // конкретни размери (напр. w=640), което оставя плочки в галерията празни.
    // WebP кодира бързо и надеждно и се поддържа от всички съвременни браузъри.
    formats: ['image/webp'],
  },
}

export default nextConfig
