# parapet-docs

Static documentation site for [parapet.io](https://parapet.io). No build step,
no dependencies — `index.html`, `styles.css`, `script.js`, and a stack of
Google Fonts loaded via `<link>`. GitHub Pages serves the `docs/` directory
directly.

## Local preview

```bash
python3 -m http.server 4000
```

Then open <http://localhost:4000>.

## Structure

- `index.html` — every page section, anchored by id, grouped into collapsible
  sidebar sub-menus.
- `styles.css` — design tokens, layout, responsive sidebar, dark code blocks.
- `script.js` — mobile nav toggle, active-section highlighting, sidebar group
  auto-expansion when scrolling, copy-to-clipboard for code blocks.

## Editing

The sidebar groups are plain `<details>` elements; each group's `<a>` children
target `#section-id` anchors in the main content. To add a section:

1. Add a new `<a href="#new-id">…</a>` line inside the relevant `<details>` in
   the sidebar.
2. Add a matching `<section class="section" id="new-id">…</section>` to the
   main content area.

That is everything — `script.js` picks the new link up automatically.
