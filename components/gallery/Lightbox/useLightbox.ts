'use client'

import { useEffect, useRef } from 'react'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

export interface LightboxItem {
  src: string
  width: number
  height: number
  alt: string
}

interface UseLightboxResult {
  open: (index: number) => void
}

export function useLightbox(items: LightboxItem[]): UseLightboxResult {
  const lightboxRef = useRef<PhotoSwipeLightbox | null>(null)

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      dataSource: items.map((item) => ({
        src: item.src,
        width: item.width,
        height: item.height,
        alt: item.alt,
      })),
      pswpModule: () => import('photoswipe'),
    })
    lightbox.init()
    lightboxRef.current = lightbox

    return () => {
      lightbox.destroy()
      lightboxRef.current = null
    }
  }, [items])

  const open = (index: number) => {
    lightboxRef.current?.loadAndOpen(index)
  }

  return { open }
}
