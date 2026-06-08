# Online Course Catalog

A production-quality, pixel-perfect responsive course catalog page built with modern vanilla frontend technologies. Features live search, category filtering, and load-more functionality — all without any third-party JS frameworks.

---

## Features

- **Dynamic Course Cards** — Cards rendered entirely from JavaScript data, no hardcoded HTML.
- **Category Filtering** — Filter courses by Marketing, Management, HR & Recruiting, Design, or Development. Works seamlessly with search.
- **Live Search** — Instant, debounced, case-insensitive search by course title.
- **Load More** — Paginated display: starts with 6 cards, reveals 3 more per click. Automatically hides when all results are shown.
- **Empty State** — Helpful feedback when filters/search return no results.
- **Fully Responsive** — Optimized for screens from 320px to 1920px using CSS Grid, Flexbox, `clamp()`, and fluid spacing.
- **Accessible** — Semantic HTML, ARIA labels, keyboard focus states, screen-reader-only text, and proper heading hierarchy.
- **Performance** — Lazy-loaded images, efficient DOM updates via DocumentFragment, and minimal reflows.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 (semantic) |
| Styling | SCSS (BEM methodology) |
| Scripting | Vanilla JavaScript (ES6 modules) |
| Build Tool | Sass CLI |
| Serve | `serve` (or any static file server) |

**No frameworks, no jQuery, no Bootstrap, no Tailwind.**

---

## Folder Structure

```
.
├── css/
│   └── main.css               # Compiled stylesheet
├── js/
│   ├── data.js                # Course dataset & categories
│   ├── render.js              # DOM rendering (cards, filters, empty state)
│   ├── filters.js             # Active category state & filtering
│   ├── search.js              # Search query state & filtering
│   ├── loadMore.js            # Pagination logic
│   └── main.js                # Entry point / orchestration
├── scss/
│   ├── main.scss              # SCSS entry point
│   ├── abstracts/
│   │   ├── _functions.scss    # rem() converter
│   │   ├── _variables.scss    # Colors, typography, spacing, breakpoints
│   │   └── _mixins.scss       # Media queries, utilities
│   ├── base/
│   │   ├── _reset.scss        # CSS reset
│   │   ├── _typography.scss   # Font imports & defaults
│   │   └── _global.scss       # Page-level styles
│   ├── layout/
│   │   └── _courses.scss      # Section layout, grid, decorations
│   └── components/
│       ├── _course-card.scss  # Card styles & badge colors
│       ├── _filters.scss      # Filter button styles
│       ├── _search.scss       # Search input styles
│       ├── _button.scss       # Load-more button
│       └── _empty-state.scss  # No-results state
├── index.html                 # Main page
├── package.json
└── README.md
```

---

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd OnlineCourse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

---

## Running Locally

### Option 1: Serve pre-compiled CSS
If `css/main.css` is already built, simply run any static server:
```bash
npx serve . -l 3000
```
Then open [http://localhost:3000](http://localhost:3000).

### Option 2: Watch SCSS changes during development
```bash
npm run watch:css
```
In another terminal, serve the project:
```bash
npx serve . -l 3000
```

### Option 3: One-time CSS build
```bash
npm run build:css
```

---

## Deployment

### Vercel
1. Push the repo to GitHub.
2. Import the project on [vercel.com](https://vercel.com).
3. Set the framework preset to **Other** (static site).
4. Deploy. No build step is required since the CSS is pre-compiled.



---

## Design Decisions

- **BEM Methodology** — Strict naming ensures predictable, component-scoped styles that are easy to maintain and refactor.
- **SCSS Architecture** — Follows the 7-1 pattern (scaled down) to keep concerns separated: abstracts for design tokens, base for globals, layout for sections, and components for UI pieces.
- **ES6 Modules** — Each JS file has a single responsibility. State is isolated per module, making the codebase easy to unit-test and reason about.
- **CSS Custom Properties** — Not used because the project targets modern browsers via SCSS variables compiled at build time, reducing runtime overhead.
- `clamp()` & Fluid Spacing — Avoids excessive media-query breakpoints. The layout scales smoothly across all target breakpoints.
- **Decorative SVGs** — Included as inline elements with `aria-hidden="true"` to enhance visual appeal without affecting accessibility.

---

## Future Improvements

- Replace placeholder images (`pravatar.cc`) with optimized WebP assets served from a CDN.
- Add skeleton loading states for perceived performance on slower networks.
- Persist active filter and search query in the URL (`?category=Design&search=UX`) for shareable filtered views.
- Implement sorting options (price low/high, alphabetical).
- Add pagination as an alternative to Load More for better deep-linking and SEO.
- Introduce a build step with Vite or Parcel for automatic SCSS compilation, minification, and cache-busting.
- Add unit tests for filtering logic using Vitest or Jest.

---
