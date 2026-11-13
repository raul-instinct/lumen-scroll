# Coffee with character - Gatsby scroll story

A scroll-driven product page for Omri's coffee-machine gadget, based on his supplied photograph. The confirmed hardware behavior is proximity sensing and greeting people arriving for coffee. Hebrew / RTL.

The translucent body, blue base, twin circular sensors and animated eyes are recreated as a stylized CSS 3D illustration. Scroll reveals approach, wake-up and a sample greeting, then the actual product photo. The animation is illustrative: the site does not connect to hardware, identify visitors or play a real device greeting.

- `src/pages/index.js`: scroll poses, palette and chapter copy
- `src/components/Device.js`: CSS illustration and original photo
- `src/styles/global.css`: responsive layout and visuals
- `coffee-gadget.jpg`: user-supplied product photograph

Run `npm install && npm run develop`. Build with `npm run build`. GitHub Pages deploys from the existing Actions workflow. Honors reduced motion and uses no animation libraries.
