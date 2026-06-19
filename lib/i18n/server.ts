import 'server-only'
import { createInstance, type i18n as I18nInstance, type Resource } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import {
  DEFAULT_NAMESPACE,
  getI18nextOptions,
  type Locale,
  type Namespace,
} from './settings'

const loadResources = resourcesToBackend(
  (language: string, namespace: string) =>
    import(`../../locales/${language}/${namespace}.json`),
)

async function createI18nInstance(
  lng: Locale,
  ns: Namespace | Namespace[],
): Promise<I18nInstance> {
  const instance = createInstance()
  await instance.use(initReactI18next).use(loadResources).init(getI18nextOptions(lng, ns))
  return instance
}

export async function getTranslation(
  lng: Locale,
  ns: Namespace | Namespace[] = DEFAULT_NAMESPACE,
) {
  const instance = await createI18nInstance(lng, ns)
  const namespace = Array.isArray(ns) ? (ns[0] ?? DEFAULT_NAMESPACE) : ns
  return {
    t: instance.getFixedT(lng, namespace),
    i18n: instance,
  }
}

export async function getResources(
  lng: Locale,
  namespaces: Namespace[],
): Promise<Resource> {
  const entries = await Promise.all(
    namespaces.map(async (ns) => {
      const mod = await import(`../../locales/${lng}/${ns}.json`)
      return [ns, mod.default] as const
    }),
  )
  return { [lng]: Object.fromEntries(entries) }
}
