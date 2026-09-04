# earthbits

Personal site for **Earthbits** (Mel Hab) — new media artist working at the intersection of nature and technology.

This replaces the Webflow site with a personally owned Next.js app. Content lives in local JSON; there is no CMS.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Static content in `/content`
- Vercel-friendly (`npm run build`)

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home — hero, about, exhibits, work grid |
| `/work` | Four-project index |
| `/work/[slug]` | Project detail (about, optional Vimeo, process, gallery) |
| `/about` | Full bio, exhibits, contact |
| `/shop` | Works for sale (data-driven; empty / coming soon until listings are added) |

Nav: Home, Work, Shop, About.

## Add a work

1. Duplicate an existing file in `content/works/` (for example `flora-in-frequency.json`).
2. Set a unique `slug` that matches the filename (`my-piece` → `content/works/my-piece.json`).
3. Register the file in `lib/content.ts` (import it and add it to the `works` array).
4. Put original images in `public/works/<slug>/` and set `src` on cover / media objects:

```json
{
  "alt": "Flora in Frequency cover",
  "src": "/works/flora-in-frequency/cover.jpg"
}
```

If `src` is omitted, a labeled placeholder is shown.

5. Optional Vimeo: set `vimeoUrl` to a Vimeo URL or numeric ID (`https://vimeo.com/123456789` or `123456789`). Leave it empty to keep the labeled embed slot.

Process steps use `layout`: `thirds`, `pair`, or `wide`, plus a `media` array of the same shape as cover.

## Add a shop item

Edit `content/shop.json` and append to `items`. See `content/shop.example.json` for the field shape.

Required fields:

- `id` — unique string
- `title`
- `type` — `physical` | `nft` | `other`
- `description`

Optional:

- `image` — path under `/public` (example: `/works/prints/wildflowers.jpg`)
- `imageAlt`
- `externalUrl` — Etsy, Manifold, or another listing
- `externalLabel` — link text
- `price` — **only if you have a real, current price**. Leave `""` or omit it otherwise.

The shop page shows a coming-soon state when a category has no items. Do not invent prices, editions, mint windows, or legal text.

Soft links to Etsy and a 2023 Manifold archive live under **Elsewhere**. They are labeled external and are not current inventory.

## Media

Placeholders are intentional. Swap them by adding files under `public/` and pointing JSON `src` fields at those paths. Do not hotlink the old Webflow CDN.

## Deploy to Vercel

1. Push this repo to GitHub (already the case for `mellynn/earthbits`).
2. In [Vercel](https://vercel.com), Import the repository.
3. Framework preset: Next.js. Build command: `next build`. Output: default.
4. Deploy.

## Point earthbits.xyz later

When the Vercel project is live:

1. In the Vercel project → Settings → Domains, add `earthbits.xyz` and `www.earthbits.xyz`.
2. At the DNS host, add the records Vercel shows (usually an A record for the apex and a CNAME for `www`).
3. After DNS propagates, set the primary domain and keep `www` redirected if you want.

Until then, the site is previewable on the Vercel URL and locally.

## Identity

- Brand: earthbits / Earthbits · New Media Artist
- Email: helloearthbits@gmail.com
- Instagram / Twitter: [earthbits__](https://www.instagram.com/earthbits__/)
