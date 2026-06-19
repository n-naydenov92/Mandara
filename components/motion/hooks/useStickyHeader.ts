'use client'

import { useEffect, useState } from 'react'
import { STICKY_HEADER_OFFSET } from '@/lib/i18n/settings'

export function useStickyHeader(offset: number = STICKY_HEADER_OFFSET): boolean {
  const [isStuck, setIsStuck] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsStuck(window.scrollY > offset)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [offset])

  return isStuck
}
