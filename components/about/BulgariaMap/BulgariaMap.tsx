import { getTranslation } from '@/lib/i18n/server'
import { Section } from '@/components/ui/Section/Section'
import { Container } from '@/components/ui/Container/Container'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { Reveal } from '@/components/motion/Reveal/Reveal'
import { MAP_VIEWBOX, BULGARIA_PATH, VILLA_POINT, MAP_CITIES } from '@/lib/content/bulgariaMap'
import type { Locale } from '@/lib/i18n/settings'
import styles from './BulgariaMap.module.css'

interface BulgariaMapProps {
  lng: Locale
}

const VIEW_W = 1000
const VIEW_H = 639
const CITY_DOT_R = 7
const VILLA_DOT_R = 9
const VILLA_HALO_R = 17
const LEFT_THIRD = 33
const RIGHT_THIRD = 67

const LEAF_PATH = 'M0 0 C 26 14 30 46 0 92 C -30 46 -26 14 0 0 Z'
const LEAF_VEIN = 'M0 8 L0 84'
const LEAF_FAN = [
  { rotate: 18, scale: 1.1 },
  { rotate: 52, scale: 0.92 },
  { rotate: 88, scale: 0.76 },
] as const

function LeafCluster() {
  return (
    <g>
      {LEAF_FAN.map(({ rotate, scale }) => (
        <g key={rotate} transform={`rotate(${rotate}) scale(${scale})`}>
          <path className={styles.leafBody} d={LEAF_PATH} />
          <path className={styles.leafVein} d={LEAF_VEIN} />
        </g>
      ))}
    </g>
  )
}

type LabelSide = 'left' | 'right' | 'top'

function labelSide(x: number): LabelSide {
  const percent = (x / VIEW_W) * 100
  if (percent <= LEFT_THIRD) {
    return 'right'
  }
  if (percent >= RIGHT_THIRD) {
    return 'left'
  }
  return 'top'
}

function percent(value: number, max: number): string {
  return `${((value / max) * 100).toFixed(2)}%`
}

export async function BulgariaMap({ lng }: BulgariaMapProps) {
  const { t } = await getTranslation(lng, 'about')

  return (
    <Section tone="transparent">
      <div className={styles.backdrop} aria-hidden="true" />
      <svg className={`${styles.foliage} ${styles.foliageTop}`} viewBox="0 0 150 140" aria-hidden="true">
        <g transform="translate(30 12)">
          <LeafCluster />
        </g>
      </svg>
      <svg className={`${styles.foliage} ${styles.foliageBottom}`} viewBox="0 0 150 140" aria-hidden="true">
        <g transform="translate(120 128) rotate(180)">
          <LeafCluster />
        </g>
      </svg>
      <Container>
        <Reveal className={styles.header} duration={1.4}>
          <Eyebrow>{t('location.map.eyebrow')}</Eyebrow>
          <h2 className={styles.title}>{t('location.map.title')}</h2>
        </Reveal>

        <Reveal className={styles.figureWrap} delay={0.1} duration={1.4}>
          <figure className={styles.figure}>
            <div className={styles.map}>
              <svg
                className={styles.canvas}
                viewBox={MAP_VIEWBOX}
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
                focusable="false"
              >
                <path className={styles.country} d={BULGARIA_PATH} />
                {MAP_CITIES.map((city) => (
                  <line
                    key={city.key}
                    className={styles.link}
                    x1={VILLA_POINT.x}
                    y1={VILLA_POINT.y}
                    x2={city.x}
                    y2={city.y}
                  />
                ))}
                {MAP_CITIES.map((city) => (
                  <circle key={city.key} className={styles.cityDot} cx={city.x} cy={city.y} r={CITY_DOT_R} />
                ))}
                <circle className={styles.villaHalo} cx={VILLA_POINT.x} cy={VILLA_POINT.y} r={VILLA_HALO_R} />
                <circle className={styles.villaDot} cx={VILLA_POINT.x} cy={VILLA_POINT.y} r={VILLA_DOT_R} />
              </svg>

              <span
                className={styles.villaLabel}
                style={{ left: percent(VILLA_POINT.x, VIEW_W), top: percent(VILLA_POINT.y, VIEW_H) }}
              >
                {t('location.map.villa')}
              </span>

              {MAP_CITIES.map((city) => (
                <span
                  key={city.key}
                  className={styles.cityLabel}
                  data-side={labelSide(city.x)}
                  style={{ left: percent(city.x, VIEW_W), top: percent(city.y, VIEW_H) }}
                >
                  <span className={styles.cityName}>{t(`location.map.cities.${city.key}.name`)}</span>
                  <span className={styles.cityDist}>{t(`location.map.cities.${city.key}.distance`)}</span>
                  <span className={styles.cityDistShort}>{t(`location.map.cities.${city.key}.distanceShort`)}</span>
                </span>
              ))}
            </div>
            <figcaption className={styles.caption}>{t('location.map.caption')}</figcaption>
          </figure>
        </Reveal>
      </Container>
    </Section>
  )
}
