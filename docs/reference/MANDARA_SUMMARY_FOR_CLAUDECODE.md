# Вила Мандара — Пълен Summary за Claude Code

## 1. КАКВО Е НАПРАВЕНО (Прототип в HTML)

### ✅ Навигация
- **Структура**: `≡ МЕНЮ` ляво · `М А Н Д А Р А` + билка центъра · `BG/EN` + `Резервация` дясно
- **Overlay меню**: Слайд от ляво (420px панел), Omai стил
- **Анимация**: GSAP — hamburger се трансформира в X, links влизат с stagger slideIn
- **Backdrop**: тъмен blur при отваряне, клик извън затваря
- **Съдържание на менюто**:
  - Links с BG + EN label вдясно
  - Долу: *„Далеч от всичко. Близо до себе си."* + `@vilamandara`
  - Ботаническа SVG билка долу-дясно

### ✅ Hero секция
- **Видео фон**: autoplay, muted, loop, playsinline, `object-fit: cover`
- **Клони**: 4 SVG branch слоя (TL, TR, BL, BR) — GSAP parallax при скрол
- **Текст**: `добре дошли` (Caveat) + `Тук времето тече различно.` (Cormorant italic) + CTA
- **Долна лента**: ротиран текст ляво · scroll indicator центъра · социални икони дясно
- **CTA**: `Запитване за престой →` — solid terra, pill shape

### ✅ Секция 02 — За нас (Split Layout)
- **Layout**: 2 колони — текст ляво, арчена снимка дясно
- **Текст**: eyebrow (Caveat) + H2 (Cormorant 300) + body + italic closing line
- **Снимка**: `border-radius: 999px 999px 20px 20px` (arch top)
- **Анимация**: AOS fade-up stagger

### ✅ Секция 03 — Gallery Preview
- **Layout**: Editorial grid 3 колони — items 1 и 3 span 2 rows
- **7 снимки** (base64 embedded)
- **Ефект**: AOS `fade-up` с stagger delay 0/100/200ms на ред
- **Header**: eyebrow + H2 + „Виж всички →" link
- **Placeholder**: реалните снимки се заменят с `<img src="/images/...">`

---

## 2. КАКВО ПРЕДСТОИ (Remaining sections + pages)

### Homepage секции (все още не са направени)
```
04  Стаи (Настаняване preview)  — 6 стаи cards с hover
05  Изживяване                  — targeting по аудитория
06  За региона                  — карта + маршрути
07  5★ Услуги                   — premium tease
08  Footer + CTA                — „Готови ли сте?" + footer
```

### Отделни страници
```
/accommodation     Настаняване — стаи, цени, капацитет, условия
/reservations      Резервации — форма/календар
/about             За вила Мандара — история, философия
/experience        Изживяване — за кого е, активности
/gallery           Пълна галерия с filter tabs
/region            За региона — карта, забележителности
/five-star-services 5★ Услуги
```

### Технически задачи
- [ ] Astro 4 project setup
- [ ] i18next (BG/EN) за всички текстове
- [ ] Реално видео за Hero (drone footage на вилата)
- [ ] Реални снимки (фотосесия на вилата)
- [ ] Формspree или Web3Forms за inquiry форма
- [ ] Google Maps embed за локация страница
- [ ] Vercel deploy + домейн

---

## 3. ДИЗАЙН СИСТЕМА

### Цветова палитра — Mandara Earth
```css
--cream:    #F5EDE0  /* основен фон 60% */
--ivory:    #FAF6EE  /* cards, popup-и */
--sand:     #E0CDB0  /* разделители */
--stone:    #A89F92  /* secondary text */
--olive:    #8A9277  /* природни акценти */
--forest:   #4F5640  /* footer */
--terra:    #B5623E  /* CTA, акценти — само 5% */
--clay:     #8C3F23  /* hover state на terra */
--espresso: #2E2218  /* основен текст */
--ember:    #C49350  /* gold акценти */
--night:    #16100A  /* hero background */
```

### Типография
```
Cormorant Garamond  →  заглавия, display (300 / 400 / italic 300 / italic 400)
DM Sans             →  UI, навигация, бутони (400 / 500)
Caveat              →  ръкописни акценти — пести се, max 1 на viewport (500)
```

**Google Fonts link:**
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@400;500&family=Caveat:wght@500&display=swap&subset=cyrillic" rel="stylesheet">
```

**Типографска йерархия:**
| Елемент | Шрифт | Размер | Тегло |
|---|---|---|---|
| Hero title | Cormorant Garamond | clamp(3.25rem, 6.5vw, 5.75rem) | 300 italic |
| H2 секция | Cormorant Garamond | clamp(2rem, 4vw, 3.75rem) | 300 |
| H3 cards | Cormorant Garamond | 1.5–1.8rem | 400 |
| Eyebrow script | Caveat | 1.5–2rem | 500 |
| Body text | Cormorant Garamond | 1–1.15rem | 300 italic |
| UI / Nav / Buttons | DM Sans | 0.68–0.72rem | 500 uppercase |
| Labels | DM Sans | 0.62–0.65rem | 500 uppercase, tracking 0.22em |

### Spacing & Layout
```css
--ease: cubic-bezier(0.22, 1, 0.36, 1)  /* luxury easing */

Section padding:  clamp(4rem, 7vw, 7rem) vertical
Container max:    1280px
Side padding:     clamp(1.5rem, 5vw, 5rem)
Gap gallery:      1rem
Border radius arch: 999px 999px 20px 20px
Border radius card: 12px
```

### Иконки
**Tabler Icons** — stroke-width 1.5
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
```

---

## 4. НАВИГАЦИЯ И URL СТРУКТУРА

```
/                    Начало
/accommodation       Настаняване
/reservations        Резервации
/about               За вила Мандара
/experience          Изживяване
/gallery             Галерия
/region              За региона
/five-star-services  5★ Услуги
```

**Nav items:** Начало / Настаняване / Резервации / За вила Мандара / Изживяване / Галерия / За региона / 5★ Услуги

---

## 5. СТАИ — ИМЕНА

| Стая | EN | Цвят акцент |
|---|---|---|
| Зора | Dawn | hsl(215,40%,72%) — синьо |
| Изгрев | Sunrise | hsl(40,80%,70%) — злато |
| Пладне | Noon | hsl(48,85%,65%) — жълто |
| Залез | Sunset | hsl(20,68%,55%) — terra |
| Здрач | Dusk | hsl(295,22%,48%) — лилаво |
| Нощ | Night | hsl(235,20%,25%) — тъмно |

**Концепция**: Всяка стая има сезонна картичка с билка, която се сменя 4 пъти/год. автоматично (JS date).

---

## 6. КОПИ / TONE OF VOICE

- **BG**: кратко, поетично, не корпоративно
- **Hero tagline**: „Тук времето тече различно."
- **Brand tagline**: „Далеч от всичко. Близо до себе си."
- **За нас closing**: „Останете, докато усетите, че сте у дома."
- **Instagram**: @vilamandara (placeholder)
- **Локация**: Вилно Селище Мандара · Горна Ковачица

---

## 7. ТЕХНИЧЕСКИ СТЕК

```
Framework:    Astro 4+
Styling:      Tailwind CSS 3+
Language:     TypeScript
i18n:         astro-i18next (BG default, EN)
Animations:   GSAP 3 + ScrollTrigger (hero/branches)
              AOS 2.3.4 (sections)
Scroll:       Lenis (@studio-freight/lenis)
Gallery:      PhotoSwipe v5 (lightbox)
Icons:        Tabler Icons
Forms:        Formspree (placeholder)
Deploy:       Vercel (free tier)
```

**CDN links за HTML prototype:**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css">
<script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

---

## 8. АНИМАЦИОННИ ПРАВИЛА

1. **Hero branches**: GSAP ScrollTrigger scrub — клоните се отдалечават при скрол
2. **Section reveals**: AOS `fade-up`, duration 900ms, stagger 100ms
3. **Gallery**: AOS `fade-up` с delay 0/100/200ms по колони
4. **Menu**: GSAP — hamburger → X трансформация + links slideIn stagger
5. **Hover cards**: `transform: translateY(-4px)` + shadow lift
6. **Arched image hover**: `scale(1.04)` на img вътре
7. **prefers-reduced-motion**: всички анимации disabled

---

## 9. PLACEHOLDER ДАННИ (Заменят се с реални)

```
Видео:        /videos/mandara-hero.mp4
Снимки:       /images/[section]/[name].jpg
Email:        contact@vilamandara.bg
Телефон:      +359 ___ ______
WhatsApp:     +359 ___ ______
Instagram:    @vilamandara
Facebook:     facebook.com/vilamandara
Координати:   lat/lng на Горна Ковачица
Formspree:    https://formspree.io/f/__TBD__
```

---

## 10. ВАЖНИ РЕШЕНИЯ

- **Routing**: Astro MPA + View Transitions (не SPA) — за SEO
- **Booking**: Без в v1, само inquiry форма. Smoobu в v2.
- **Галерия**: PhotoSwipe v5 на /gallery с filter tabs (Вила / Басейн / Стаи / Природа)
- **Карта BG**: Custom SVG, не Google Maps — terra маршрути, ember Мандара маркер
- **Цени**: Показват се само на /accommodation, не на homepage
- **5★ Услуги**: Само tease на homepage, пълното на /five-star-services
- **Сезонни билки**: JS `new Date().getMonth()` → автоматична смяна

