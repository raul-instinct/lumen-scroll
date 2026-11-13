# Orbit One - scroll-driven GatsbyJS demo

A fictional gadget that rotates, zooms and changes the page palette as you scroll, in the style of Apple product pages. Pure CSS 3D device, one React page, no animation libraries. Hebrew / RTL copy.

- `src/pages/index.js` - scroll stages (pose + colour per scroll position) and chapter copy
- `src/components/Device.js` - the 3D device markup
- `src/styles/global.css` - look and feel, mobile layout

Run: `npm install && npm run develop`. Deploys to GitHub Pages via the workflow in `.github/workflows`.
