import {
  IconLeaf,
  IconBrandInstagram,
  IconBrandFacebook,
  IconMail,
  IconPhone,
} from '@tabler/icons-react'
import { getTranslation } from '@/lib/i18n/server'
import { LocaleLink } from '@/components/ui/LocaleLink/LocaleLink'
import { Icon } from '@/components/ui/Icon/Icon'
import { NAV_ITEMS } from '@/lib/routing/paths'
import { SITE } from '@/lib/config/site'
import type { Locale } from '@/lib/i18n/settings'
import { FooterReveal } from './FooterReveal'
import styles from './Footer.module.css'

interface FooterProps {
  lng: Locale
}

export async function Footer({ lng }: FooterProps) {
  const { t, i18n } = await getTranslation(lng, ['common', 'nav'])
  const tNav = i18n.getFixedT(lng, 'nav')
  const year = new Date().getFullYear()

  return (
    <FooterReveal>
      <div className={styles.top}>
        <div className={styles.brandCol}>
          <span className={styles.brand}>
            {t('brand')}
            <Icon icon={IconLeaf} size={16} className={styles.brandHerb} />
          </span>
          <p className={styles.about}>{t('footer.about')}</p>
        </div>

        <nav className={styles.col} aria-label={tNav('home')}>
          <h2 className={styles.colTitle}>{t('footer.nav')}</h2>
          <ul className={styles.list}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <LocaleLink lng={lng} href={item.href} className={styles.link}>
                  {tNav(item.labelKey)}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.colTitle}>{t('footer.contact')}</h2>
          <ul className={styles.list}>
            <li>
              <a className={styles.contact} href={`mailto:${SITE.contact.email}`}>
                <Icon icon={IconMail} size={16} />
                {SITE.contact.email}
              </a>
            </li>
            <li>
              <a className={styles.contact} href={`tel:${SITE.contact.phone.replace(/\s/g, '')}`}>
                <Icon icon={IconPhone} size={16} />
                {SITE.contact.phone}
              </a>
            </li>
            <li>
              <a
                className={styles.contact}
                href={SITE.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon={IconBrandInstagram} size={16} />
                {SITE.social.instagramHandle}
              </a>
            </li>
            <li>
              <a
                className={styles.contact}
                href={SITE.social.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon={IconBrandFacebook} size={16} />
                Facebook
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.col}>
          <p className={styles.tagline}>{t('tagline')}</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>
          © {year} {t('brandFull')} · {t('locationShort')}
        </span>
        <span>{t('footer.rights')}</span>
      </div>
    </FooterReveal>
  )
}
