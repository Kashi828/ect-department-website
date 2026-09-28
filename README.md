# ECT Department Website — Next.js + Sanity

A department website for the Department of Electronics with Computer
Technology, NSS College Rajakumari — built with **Next.js 14 (App Router)**,
**Tailwind CSS**, and **Sanity** as the headless CMS/backend, so staff can add
events, achievements, faculty, toppers and alumni from a login-protected admin
screen without touching code.

## What's inside

```
app/                 pages (App Router) — one folder per section
  studio/[[...tool]] the embedded Sanity Studio (your admin panel, at /studio)
components/          shared UI (nav, hero, event tabs, achievements accordion, etc.)
content/sample-data.js  fallback content shown until Sanity is connected
lib/                 Sanity client + GROQ queries
sanity/schemaTypes/  the content models editors will see in the Studio
sanity.config.js     Studio configuration
```

The site works immediately with the sample content in `content/sample-data.js`
— you don't need Sanity set up just to preview it. Once you connect a Sanity
project, every page automatically switches to live, editable content.

## 1. Install

Requires Node.js 18+.

```bash
npm install
```

## 2. Run it locally (with sample content)

```bash
npm run dev
```

Open http://localhost:3000 — this works right away, no accounts needed.

## 3. Connect the CMS (so staff can edit content)

1. Go to https://www.sanity.io/manage and create a free account + new project.
2. Copy your **Project ID**.
3. Copy `.env.local.example` to `.env.local` and fill in:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
4. Restart `npm run dev`, then open http://localhost:3000/studio — this is
   the admin panel. Sign in with your Sanity account and add:
   - **Site Settings** (one document): phone, email, social links, the
     scrolling announcement text, and the homepage headline.
   - **Events**, **Achievements**, **Topper/Faculty** entries, **Alumni**.
5. Refresh the site — your real content now replaces the sample data.

Studio access is controlled by Sanity's own login (email/Google), so only
people you invite (via sanity.io/manage → your project → Members) can edit
content. No separate auth system to build or maintain.

## 4. Deploy

The easiest path is **Vercel** (made by the Next.js team, free tier is enough
for a department site):

1. Push this folder to a GitHub repo.
2. Go to https://vercel.com → New Project → import the repo.
3. Add the same two environment variables from `.env.local` in Vercel's
   project settings.
4. Deploy. Your admin panel will live at `your-site.vercel.app/studio`.

You can use your college's own domain by adding it under the Vercel
project's Domains tab.

## Editing the design

- Colours and fonts: `tailwind.config.js` (`maroon`, `gold`, `ivory`, etc.)
  and the Google Fonts `@import` in `app/globals.css`.
- Page layout/copy: each file in `app/*/page.js`.
- Shared header/nav/footer: `components/`.

## Notes

- Photos: add an `image` field via the Studio for faculty/toppers if you
  want real photos instead of initials — the `person` schema already has a
  `photo` field wired up (`lib/sanity.js` exposes `urlFor()` to render it).
- This project was written and reviewed by hand in this conversation; it
  hasn't been run through `npm install && next build` in this environment,
  so do a quick `npm run build` locally before deploying to catch anything
  version-specific to your Node setup.
