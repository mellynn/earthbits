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

## Swap real media

Hero, covers, process stills, and about tiles currently use **labeled SVG placeholders** in `public/works/`. They are not original artworks. Do **not** hotlink the old Webflow CDN.

1. Drop the real file next to the placeholder (jpg, png, or webp is fine).
2. Point the matching JSON `src` at the new path.
3. Remove `"placeholder": true` on that media object so the Placeholder badge goes away.

Keep the same filename stem if you want (for example replace `cover.svg` usage with `cover.jpg`).

### Exact paths (current placeholders)

**Hero (home)** — `content/works/flora-in-frequency.json` → `hero`

| Slot | File |
| --- | --- |
| Portrait (left) | `public/works/flora-in-frequency/hero-scan.svg` → `/works/flora-in-frequency/hero-scan.svg` |
| Square (right) | `public/works/flora-in-frequency/hero-wireframe.svg` |
| Square (center) | `public/works/flora-in-frequency/hero-vase.svg` |

**Flora in Frequency** — `content/works/flora-in-frequency.json`

| Slot | File |
| --- | --- |
| Cover | `public/works/flora-in-frequency/cover.svg` |
| Process — local flora 1–3 | `process-flora-1.svg` … `process-flora-3.svg` |
| Process — photogrammetry 1–3 | `process-scan-1.svg` … `process-scan-3.svg` |
| Process — animation | `process-animation.svg` |
| Process — materials 1–3 | `process-material-1.svg` … `process-material-3.svg` |
| Process — sound | `process-sound-1.svg`, `process-sound-2.svg` |
| Final stills 1–3 | `final-1.svg` … `final-3.svg` |

**Sidewalks** — `content/works/sidewalks.json`

| Slot | File |
| --- | --- |
| Cover | `public/works/sidewalks/cover.svg` |
| Gallery 1–3 | `public/works/sidewalks/gallery-1.svg` … `gallery-3.svg` |

**Transience** — `content/works/transience.json`

| Slot | File |
| --- | --- |
| Cover | `public/works/transience/cover.svg` |
| Gallery 1–3 | `public/works/transience/gallery-1.svg` … `gallery-3.svg` |

**Gardenscapes** — `content/works/gardenscapes.json`

| Slot | File |
| --- | --- |
| Cover | `public/works/gardenscapes/cover.svg` |
| Gallery 1–3 | `public/works/gardenscapes/gallery-1.svg` … `gallery-3.svg` |

**About tiles** (home + `/about`) — hardcoded in `app/page.tsx` and `app/about/page.tsx`

| Slot | File |
| --- | --- |
| Floral | `public/works/about/floral.svg` |
| Portrait | `public/works/about/portrait.svg` |
| Gallery | `public/works/about/gallery.svg` |

To regenerate the SVG studies after deleting them:

```bash
node scripts/generate-placeholders.mjs
```

Vimeo: set `vimeoUrl` to a numeric ID, a public URL, or an unlisted `https://vimeo.com/123456789/abcdef` (hash) link.

## Add a work

1. Duplicate an existing file in `content/works/` (for example `flora-in-frequency.json`).
2. Set a unique `slug` that matches the filename (`my-piece` → `content/works/my-piece.json`).
3. Register the file in `lib/content.ts` (import it and add it to the `works` array).
4. Put original images in `public/works/<slug>/` and set `src` on cover / media objects.

## Add a shop item

Edit `content/shop.json` and append to `items`. See `content/shop.example.json` for the field shape.

Required fields: `id`, `title`, `type` (`physical` | `nft` | `other`), `description`.

Optional: `image` (local `/works/...` path **or** an https URL on an allowed host), `imageAlt`, `externalUrl`, `externalLabel`, `price` (**only** if you have a real, current price).

Leave `price` empty otherwise. Do not invent prices, editions, mint windows, or legal text.

### Remote shop images

`next/image` only loads remote URLs whose host is listed in `next.config.ts` → `images.remotePatterns` (exported as `remoteImagePatterns`). Currently allowed families include:

- Etsy (`i.etsystatic.com`, `*.etsystatic.com`)
- Manifold (`*.manifold.xyz`)
- Cloudinary, Shopify, Imgur
- IPFS / NFT.Storage / Arweave
- Vercel Blob, S3, CloudFront
- Contentful / DatoCMS

If Mel’s listing image is on another CDN, add that hostname to `remoteImagePatterns` before setting `image` to the URL. Local files under `public/` do not need a pattern.

## Deploy to Vercel

1. Push this repo to GitHub.
2. In [Vercel](https://vercel.com), Import the repository.
3. Framework preset: Next.js. Build command: `next build`. Output: default.
4. Deploy.

CI on pull requests runs `npm ci` and `npm run build`.

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
