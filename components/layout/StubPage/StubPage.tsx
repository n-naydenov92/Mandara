import type { ReactNode } from 'react'
import { getTranslation } from '@/lib/i18n/server'
import { Section } from '@/components/ui/Section/Section'
import { Container } from '@/components/ui/Container/Container'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import type { Locale } from '@/lib/i18n/settings'
import styles from './StubPage.module.css'

interface StubPageProps {
  lng: Locale
  navKey: string
  children?: ReactNode
}

export async function StubPage({ lng, navKey, children }: StubPageProps) {
  const { i18n } = await getTranslation(lng, ['nav', 'common'])
  const tNav = i18n.getFixedT(lng, 'nav')
  const tCommon = i18n.getFixedT(lng, 'common')

  return (
    <>
      <section className={styles.head}>
        <Container>
          <Eyebrow tone="ember">{tCommon('locationShort')}</Eyebrow>
          <h1 className={styles.title}>{tNav(navKey)}</h1>
        </Container>
      </section>
      <Section tone="transparent">
        <Container>{children ?? <p className={styles.soon}>{tCommon('comingSoon')}</p>}</Container>
      </Section>
    </>
  )
}
