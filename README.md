# Digital Product Passport (DPP)

A unified digital product identity platform for three brands:

- **Hollywood Buds** — cannabis cultivation + distribution
- **High Threaded** — apparel + lifestyle
- **NFT Joint** — Web3 / on-chain product layer

Every product gets a permanent slug, a public passport page, and a verifiable record. Not a store. An identity system.

---

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (Postgres + Auth + RLS)
- Deployed anywhere that runs Next.js (Vercel recommended)

## Project structure

```
.
├── app/
│   ├── layout.tsx                  Root layout, fonts, header/footer
│   ├── page.tsx                    Home — system explainer + brand index
│   ├── globals.css                 Paper texture, typography tokens
│   ├── product/
│   │   └── [qr_slug]/
│   │       ├── page.tsx            Public passport page
│   │       └── not-found.tsx       Invalid-slug fallback
│   └── scan/
│       └── page.tsx                Scan landing + ?code= redirect + scan log
├── components/
│   ├── BrandBadge.tsx
│   ├── BrandSection.tsx
│   ├── Container.tsx
│   ├── MetadataLedger.tsx          The "passport record" component
│   ├── ProductCard.tsx
│   ├── SiteFooter.tsx
│   └── SiteHeader.tsx
├── lib/
│   ├── brands.ts                   Brand theme + metadata field configs
│   └── supabase/
│       ├── client.ts               Browser client
│       ├── server.ts               Server (RSC / route handler) client
│       └── queries.ts              All data access in one place
├── types/
│   └── index.ts                    Shared TS types + Database type
├── supabase/
│   └── schema.sql                  Full schema, RLS policies, seed data
├── .env.local.example
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## Run locally

### 1. Install

```bash
npm install
```

### 2. Create a Supabase project

Go to [supabase.com](https://supabase.com), create a project.

In the Supabase dashboard:

1. **SQL Editor → New query** → paste the entire contents of `supabase/schema.sql` → **Run**.  
   This creates tables, RLS policies, indexes, and seeds 5 sample products.
2. **Project Settings → API** → copy your **Project URL** and **anon public** key.

### 3. Configure env

```bash
cp .env.local.example .env.local
```

Fill in:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run

```bash
npm run dev
```

Visit:

- `http://localhost:3000` — home + brand index
- `http://localhost:3000/product/hb-sunset-og-001` — Hollywood Buds passport
- `http://localhost:3000/product/ht-hoodie-bone-014` — High Threaded passport
- `http://localhost:3000/product/nj-genesis-001` — NFT Joint passport
- `http://localhost:3000/scan?code=hb-sunset-og-001` — scan redirect

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel: **New Project → Import** the repo.
3. Add env vars from `.env.local` (set `NEXT_PUBLIC_SITE_URL` to your prod URL).
4. Deploy.

QR codes on physical products should point to:

```
https://YOUR-DOMAIN/scan?code=<qr_slug>
```

Using the `/scan?code=` route (not a direct `/product/...` link) gives you:

- A single trackable scan endpoint
- Scan event logging (`scan_events` table)
- Easy migration if slugs ever change

---

## Data model

### `brands`
Brand registry. One row per brand. Drives theming and copy.

### `products`
The core passport table.

| field        | type                | notes                                    |
|--------------|---------------------|------------------------------------------|
| `id`         | uuid                | internal                                 |
| `name`       | text                | display name                             |
| `brand`      | enum (3 values)     | FK to `brands.slug`                      |
| `type`       | enum (cannabis / apparel / nft) | drives which metadata fields surface |
| `description`| text                |                                          |
| `qr_slug`    | text, **unique**    | the public URL token                     |
| `media_url`  | text                | hero image                               |
| `metadata`   | jsonb               | type-specific fields (THC, GSM, contract...) |
| `status`     | enum (active / draft / archived) | only `active` is publicly visible |
| `created_at` | timestamptz         |                                          |
| `updated_at` | timestamptz         | auto-updated via trigger                 |

### `scan_events`
Append-only log of every `/scan` hit. Writable by anyone, readable only by authenticated roles. This is your analytics base for the future SaaS layer.

### RLS posture

- **Public** can `SELECT` from `brands` and from `products WHERE status = 'active'`.
- **Public** can `INSERT` into `scan_events` but cannot read them.
- **Authenticated** users can do everything on `products` — this is the seam where you'll plug an admin dashboard in next.

---

## Design choices worth knowing

**Why `jsonb metadata` instead of separate tables per product type?**  
The three brands have different fields (THC% vs GSM vs contract address). A single `metadata` jsonb keeps the core schema universal while letting each product type carry whatever it needs. `lib/brands.ts → PRIMARY_METADATA_FIELDS` controls which fields surface prominently in the passport ledger UI per type.

**Why `qr_slug` instead of using the UUID?**  
Slugs are short, brand-prefixed, and human-recognizable on a printed tag (`hb-sunset-og-001` reads cleanly; `9f3c...4a21` does not). UUIDs are kept internal.

**Why `/scan?code=` instead of putting QR codes directly on `/product/...`?**  
A single scan endpoint gives you tracking, redirect logic, and forward-compatibility. If you ever need to revoke a slug, rebrand, or A/B test landing experiences, the redirect layer is where you do it without reprinting physical tags.

**Why server components everywhere?**  
Passport pages are mostly read-only and benefit from edge caching + RSC streaming. `revalidate = 60` on the home and passport routes gives you ISR for free — updates from Supabase appear within a minute without rebuilds.

---

## Extending toward SaaS

Concrete next steps the codebase is already shaped for:

1. **Admin dashboard** — protected route group `app/(admin)/...` using Supabase Auth. The `products_auth_all` RLS policy is already in place.
2. **Tenant model** — add an `organizations` table and a `tenant_id` on `products` / `brands`. The brands enum becomes a regular table.
3. **QR generation** — add a server action that takes a `qr_slug`, returns a PNG/SVG. Wrap with `${NEXT_PUBLIC_SITE_URL}/scan?code=${slug}`.
4. **Webhooks** — on `products` insert/update, fire to Shopify, Loop, lab pipelines.
5. **On-chain bridge for NFT Joint** — verify wallet ownership via signature, attach owner address to the passport metadata.
6. **NFC support** — physical NFC chips ship with a URL; same `/scan` route handles both QR and NFC.

---

## Scripts

```bash
npm run dev         # local dev
npm run build       # production build
npm run start       # serve production build
npm run typecheck   # tsc no-emit
npm run lint        # next lint
```
