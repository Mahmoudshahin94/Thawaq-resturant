# مطعم الذواق (Al-Thawaq) — Digital Menu

Bilingual (Arabic RTL / English) QR-code menu for **مطعم الذواق**.
Built with Next.js 14 (App Router), Tailwind CSS, NextAuth, Neon Postgres and Vercel Blob.

Live: https://thawaq-menu.vercel.app

## Features

- Mobile-first display-only menu: category cards, search and item detail pages (no cart or ordering)
- Arabic (RTL) / English toggle, dark / light theme (dark by default)
- Admin dashboard: categories, items (multi-image), hero banners, settings, QR code
- QR code page + print-ready `public/thawaq-menu-qr.png`

## Tech stack

| Layer    | Technology                                   |
|----------|----------------------------------------------|
| Framework| Next.js 14 (App Router), TypeScript          |
| Styling  | Tailwind CSS, framer-motion                  |
| Database | Neon Postgres (`@neondatabase/serverless`)   |
| Auth     | NextAuth v4 (credentials, JWT)               |
| Images   | Vercel Blob (uploads), Unsplash (seed photos)|
| QR       | qrcode.react, qrcode + sharp (print file)    |

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run seed:db              # creates tables + loads the Thawaq menu (idempotent)
npm run dev
```

### Environment variables

| Variable               | Purpose                                                        |
|------------------------|----------------------------------------------------------------|
| `DATABASE_URL`         | Neon pooled connection string (`neonctl connection-string`)    |
| `NEXTAUTH_SECRET`      | `openssl rand -base64 32`                                      |
| `NEXTAUTH_URL`         | Site URL (`http://localhost:3000` locally)                     |
| `NEXT_PUBLIC_SITE_URL` | Public menu URL shown/encoded by the QR code page              |
| `ADMIN_USERNAME`       | Admin login user                                               |
| `ADMIN_PASSWORD`       | Admin login password                                           |
| `BLOB_READ_WRITE_TOKEN`| Vercel Blob token (created by `vercel blob store add`)         |

Never commit `.env.local`; set the same variables in Vercel (`vercel env add`).

## Database

- Schema: [`db/schema.sql`](db/schema.sql) — `categories`, `items`, `item_images`, `settings`, `banners`
  (translated from the former InstantDB schema).
- Data: [`db/thawaq-menu.json`](db/thawaq-menu.json) — 2 categories, 14 items.
- Seed: `npm run seed:db` (safe to re-run; rows have deterministic ids).
- Public data is served by `GET /api/menu`; all writes go through `/api/admin/*` and `/api/upload`,
  which require an admin session.

## Deployment (Vercel CLI)

```bash
vercel link
vercel blob store add thawaq-images
vercel env add DATABASE_URL production      # repeat for the other variables
vercel --prod
```

After the URL changes, update `NEXTAUTH_URL` / `NEXT_PUBLIC_SITE_URL`, redeploy, and regenerate the QR file:

```bash
node scripts/make-qr.mjs https://your-domain.com public/thawaq-menu-qr.png
```

## Admin panel

| Page       | URL                           |
|------------|-------------------------------|
| Login      | `/admin/login`                |
| Dashboard  | `/admin/dashboard`            |
| Categories | `/admin/dashboard/categories` |
| Items      | `/admin/dashboard/items`      |
| Banners    | `/admin/dashboard/banners`    |
| Settings   | `/admin/dashboard/settings`   |
| QR code    | `/admin/dashboard/qrcode`     |

