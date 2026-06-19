'use client'

import { useState, type ReactNode } from 'react'
import { createInstance, type Resource } from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { getI18nextOptions, type Locale, type Namespace } from './settings'

interface TranslationsProviderProps {
  lng: Locale
  namespaces: Namespace[]
  resources: Resource
  children: ReactNode
}

export function TranslationsProvider({
  lng,
  namespaces,
  resources,
  children,
}: TranslationsProviderProps) {
  const [instance] = useState(() => {
    const i18n = createInstance()
    i18n.use(initReactI18next).init({ ...getI18nextOptions(lng, namespaces), resources })
    return i18n
  })

  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>
}
