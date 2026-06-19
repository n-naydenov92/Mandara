# Деплой — Вила Мандара

Сайтът се хоства на **Vercel**, вързан с GitHub репото
[`n-naydenov92/Mandara`](https://github.com/n-naydenov92/Mandara). Всеки push към `main`
прави автоматичен production деплой.

## Хостинг на снимките / медията
Не е нужно външно хранилище. Цялата медия стои в [`public/`](../public/)
(`public/images/...`, `public/videos/...`) и се сервира **автоматично от Vercel CDN**.
Пътищата в кода са абсолютни (`/images/...`, `/videos/...`) и работят 1:1 без промени.

`next/image` (конфигуриран с AVIF/WebP в [`next.config.ts`](../next.config.ts)) оптимизира
снимките per-device за компонентите, които го ползват.

> Текущите медии са **placeholder-и** (~87 MB общо, най-големите PNG-та са 3840px / 4–11 MB,
> hero видеото е ~10 MB). Всички са под GitHub лимита от 100 MB/файл. Когато дойдат
> **финалните** снимки → resize до ~2560px + WebP/оптимизиран JPG; видео → компресия към
> ~2–4 MB. Чак тогава, ако медията стане стотици MB или трябва качване без redeploy,
> се обмисля Vercel Blob / Cloudinary.

## Първоначална настройка на Vercel (еднократно)
1. [vercel.com](https://vercel.com) → **Add New… → Project**.
2. **Import** на GitHub репото `n-naydenov92/Mandara` (свържи GitHub акаунта, ако още не е).
3. Vercel разпознава Next.js автоматично — **build настройките остават по подразбиране**
   (Framework: Next.js, Build Command: `next build`). Нищо не се пипа.
4. Добави Environment Variables (виж долу) → **Deploy**.
5. Отвори генерирания `*.vercel.app` адрес и провери сайта.

## Environment Variables (Project → Settings → Environment Variables)
Всички са `NEXT_PUBLIC_*` (виж [`.env.example`](../.env.example)). За placeholder фазата
default-ите вършат работа; задай реалните стойности, щом ги имаш:

| Променлива | Бележка |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Засега `*.vercel.app` адреса; после реалния домейн |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Имейл за контакт |
| `NEXT_PUBLIC_CONTACT_PHONE` | Телефон |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp номер |
| `NEXT_PUBLIC_INSTAGRAM_URL` / `NEXT_PUBLIC_INSTAGRAM_HANDLE` | Instagram |
| `NEXT_PUBLIC_FACEBOOK_URL` | Facebook |
| `NEXT_PUBLIC_MAP_LAT` / `NEXT_PUBLIC_MAP_LNG` | Координати за картата |

> `.env` НЕ влиза в git (игнориран) — затова стойностите се задават в dashboard-а.
> Booking променливите (`__TBD__`) не са нужни за v1.

## Реален домейн (по-късно)
Vercel → Project → **Settings → Domains → Add** → въведи домейна → следвай DNS
инструкциите при регистратора (A / CNAME записи). После обнови `NEXT_PUBLIC_SITE_URL`.

## Локални команди
```bash
npm run dev          # дев сървър
npm run build        # прод билд (същия, който Vercel пуска)
npm run start        # пускане на прод билда локално
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
```

## Ръчен push (ако се прави извън Vercel auto-deploy)
```bash
git add -A
git commit -m "съобщение"
git push origin main
```
