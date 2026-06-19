'use client'

import { useSyncExternalStore } from 'react'

const MOBILE_QUERY = '(max-width: 768px)'

function subscribe(callback: () => void) {
  const query = window.matchMedia(MOBILE_QUERY)
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}

function getSnapshot() {
  return window.matchMedia(MOBILE_QUERY).matches
}

// SSR-ът и първият клиентски (hydration) рендер връщат true → винаги се
// рендира подреденият (stacked) вариант. Закотнатата сцена се включва чак
// след монтиране, когато потвърдим десктоп — така няма hydration mismatch
// между двете много различни дървета.
function getServerSnapshot() {
  return true
}

export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
