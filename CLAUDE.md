# Вила Мандара — Project Guide

Премиум сайт за вила „Мандара". Комуникацията с потребителя е на **български**.

## Задължителни skills (прилагай ги на ВСЕКИ промпт)
Документите в `skills/` са задължителни винаги, от самото начало:
- **clean-code** — SRP/DRY/KISS/YAGNI; функции ≤20 реда; именувани константи (без магически числа); винаги скоби; guard clauses; без закоментиран код; имена вместо коментари.
- **react-best-practices** — именуван `interface XxxProps`; без `any`; discriminated-union state (не boolean флагове); derive, don't sync; колокирано състояние; никога компонент в компонент; стабилни keys; handler-и `handle*`; ред context→state→derived→handlers→effects→return; React 19 `ref` като prop.
- **senior-architect** — SOLID; всичко външно зад граница (i18n, форма, Smoobu — сменяеми); конструкция отделно от употреба.
- **frontend-design** — този skill е за MUI тъмни fintech дашборди и **противоречи** на вилния бранд. Прилага се **само за инженерно качество**: a11y, дисциплина на анимациите (UI ≤250ms), loading/empty/error състояния, WCAG AA контраст, focus rings, клавиатурна навигация, `prefers-reduced-motion`. НЕ ползвай MUI/тъмна палитра/indigo.

## Стек (най-нови версии — без бъдеща миграция)
Next.js 16 (App Router) · React 19.2 · TypeScript 6 · **CSS Modules** (без Tailwind/MUI) · i18next + react-i18next · Motion (Framer Motion) + Lenis · PhotoSwipe v5 (галерия) · @tabler/icons-react.

`params` е Promise (Next 16) → винаги `await params`.

## i18n
BG по подразбиране в корен `/`; EN на `/en`. Реализира се с `middleware.ts`, който rewrite-ва непрефиксираните пътища към вътрешен `app/[lng]` сегмент (lng=bg), пазейки чисти URL-и.

## Дизайн „Mandara Earth" (брандът води визията)
Палитра: cream #F5EDE0, ivory #FAF6EE, sand #E0CDB0, stone #A89F92, olive #8A9277, forest #4F5640, terra #B5623E (CTA ~5%), clay #8C3F23, espresso #2E2218 (текст), ember #C49350, night #16100A (hero). Шрифтове: Cormorant Garamond (заглавия/italic), DM Sans (UI), Caveat (ръкописни акценти). Easing: `cubic-bezier(0.22,1,0.36,1)`. Токени в `styles/tokens.css`.

## Booking
Smoobu е финален избор, но **само планиран**, не интегриран — сменяема gateway граница (`lib/booking/bookingGateway.ts`). v1 = inquiry форма.

## Placeholders (потребителят ще ги даде)
Лого, hero видео, снимки, имейл, телефон/WhatsApp, Instagram/Facebook, координати, капацитет. Всички през `lib/config/site.ts` + env.

## Команди
```
npm run dev          # дев сървър
npm run build        # прод билд
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
```

## Референции
`docs/reference/MANDARA_SUMMARY_FOR_CLAUDECODE.md` (пълно задание), `docs/reference/mandara-hero.html` (HTML прототип — само референция за визия/анимации, НЕ се преизползва).
