'use client'

import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from 'react'
import Lenis from 'lenis'
import { useReducedMotionSafe } from '@/components/motion/hooks/useReducedMotionSafe'

interface SmoothScrollProps {
  children: ReactNode
}

interface LenisController {
  stop: () => void
  start: () => void
}

const LenisContext = createContext<LenisController | null>(null)

export function useLenis(): LenisController | null {
  return useContext(LenisContext)
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const reducedMotion = useReducedMotionSafe()
  const lenisRef = useRef<Lenis | null>(null)

  const controller = useMemo<LenisController>(
    () => ({
      stop: () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
    }),
    [],
  )

  useEffect(() => {
    if (reducedMotion) {
      return
    }
    const instance = new Lenis()
    lenisRef.current = instance
    let frameId = 0
    const raf = (time: number) => {
      instance.raf(time)
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frameId)
      instance.destroy()
      lenisRef.current = null
    }
  }, [reducedMotion])

  return <LenisContext.Provider value={controller}>{children}</LenisContext.Provider>
}
