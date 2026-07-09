# 3D product showcase template — three.js + studio reflections

**Live demo → https://bswxyz.github.io/formwork-heliodon/** · [How it was built](https://bswxyz.github.io/formwork-heliodon/guide/)

> A machined-metal object with photoreal reflections, no HDRI files — rotated by the visitor's scroll.

A free, MIT-licensed website template. Good for: **industrial design, hardware products, jewellery, portfolio centrepieces**.
The demo brand ("HELIODON") is fictional — every word and colour is meant to be replaced with yours.

## The signature technique

- three.js `MeshStandardMaterial` metal lit by a procedural `RoomEnvironment` (zero texture downloads)
- Scroll position drives the object's rotation; cursor adds a gentle lean
- ACES filmic tone-mapping for real metal highlight roll-off

## Use this as your own site

This repo is a **template** — everything is plain HTML/CSS/JS with **relative paths**, so it
works under *any* repo name with zero configuration.

1. Click **Use this template → Create a new repository** (top of this page).
   **Name it whatever you like** — `my-site`, `portfolio`, anything.
2. In your new repo: **Settings → Pages → Build and deployment → Deploy from a branch**,
   then pick `main` / `/ (root)` and save. (CLI: see below.)
3. Wait ~1 minute. Your site is live at `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`.

<details>
<summary>Prefer the command line?</summary>

```bash
gh repo create my-site --template bswxyz/formwork-heliodon --public --clone
cd my-site
gh api --method POST /repos/YOUR-USERNAME/my-site/pages \
  -f 'source[branch]=main' -f 'source[path]=/'
```
</details>

No build step, no dependencies to install — edit the files, push, done.
The only external requests are Google Fonts and (where used) pinned CDN copies of GSAP/three.js.

## Customize it

- Swap the object: replace the `TorusKnotGeometry` in `main.js` with any geometry or a loaded GLTF
- Material: tune `roughness` / `metalness` / `envMapIntensity` for brushed vs polished looks
- Specs list: the `<dl class="spec-grid">` in `index.html` is plain HTML

The `/guide/` page documents the signature technique in depth (with code) — keep it, rewrite it,
or delete the folder entirely.

## Files

```
index.html        the page
styles.css        all styling (design tokens in :root at the top)
main.js           the signature effect + motion
guide/index.html  how-it-works write-up (optional — yours to keep or delete)
```

## Built-in quality

- Works with JS disabled or a CDN failure (content is never permanently hidden)
- Respects `prefers-reduced-motion`; keyboard focus styles throughout
- Canvas/WebGL feature-detected with graceful fallbacks; devicePixelRatio capped for performance
- Responsive at phone / tablet / desktop widths

## License & credit

[MIT](LICENSE) — free for personal and commercial use, no attribution required
(a link back is always appreciated). Part of **FORMWORK** — a collection of
25 free website templates: **[the full gallery →](https://bswxyz.github.io/formwork/)**
