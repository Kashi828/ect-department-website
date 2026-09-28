# ECT Website Redesign

This revision moves the site away from a conventional college-portal look and into a premium editorial technology direction.

## Visual direction
- Dark graphite + warm paper + electric-lime accent
- Oversized Space Grotesk editorial typography
- Technical labels, signal strip, grid overlays and lab-style metadata
- Bento panels and asymmetric layouts rather than standard academic cards
- Responsive mobile navigation

## Motion
The project already had the `motion` package, so the redesign uses its React API (`motion/react`) for Framer Motion-style interactions:
- Page fade-in transitions
- Scroll-triggered section reveals
- Staggered faculty cards
- Hero slide transitions and auto-rotation
- Hover lift/translate interactions
- Event and achievement reveal animations
- Lightbox open/close animation
- Reduced-motion support

## Faculty portraits
The supplied teacher photos were added under `public/people/` and connected to the fallback faculty data. The supplied portraits include Praveen, Sunil Kumar, Rekha, Reji, Ananthasankar, Sonia and Aneesha. Saritha remains on the faculty list with an initials placeholder because no portrait for that faculty member was supplied.

## Run locally
```bash
npm install
npm run dev
```

The Sanity integration and all existing content fallbacks remain in place.
