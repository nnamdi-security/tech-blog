# Nnamdi's Dev Notes

My personal technology blog — built from scratch with semantic HTML5, modern CSS, and vanilla JavaScript. It's where I publish video tutorials, podcast episodes, and written articles as I learn and build in public.

🔗 **Live site:** [techbrosis.netlify.app](https://techbrosis.netlify.app)
📦 **Repo:** [github.com/nnamdi-security/tech-blog](https://github.com/nnamdi-security/tech-blog)
✍️ **Author:** Nnamdi ([@nnamdi-security](https://github.com/nnamdi-security))

## About

This started as part of my fullstack development training and has grown into my main hub for sharing what I'm learning — mostly JavaScript tutorials for now, with podcast conversations and written articles alongside them. Everything is hand-built with no framework, no build step, and no package manager: just HTML, CSS, and JS, deployed straight to Netlify.

## Main features

- Responsive homepage with featured and latest content
- Filterable, searchable post archive
- Tutorial, podcast, and article post types
- Privacy-enhanced YouTube embeds using `youtube-nocookie.com`
- Shared header and footer loaded with `fetch()`
- Accessible mobile navigation and skip link
- Copy-to-clipboard buttons for code examples
- Unique SEO and social-sharing metadata per page
- JSON-LD structured data
- Netlify Forms contact form with honeypot spam protection
- Custom 404 and success pages
- RSS feed, sitemap, robots file, and web manifest
- No build process, package manager, or JavaScript framework

## Architecture

The project uses two complementary content sources:

1. `assets/js/posts.js` holds post metadata used to render cards, counts, related posts, sorting, search, and filters on the homepage and archive.
2. Each post is still a real HTML page with its own full article, unique SEO metadata, social tags, and JSON-LD — so search engines and social crawlers never have to depend on client-side JavaScript to read the content.

The shared header and footer live in `components/` and are loaded with `fetch()` by `assets/js/components.js`.

All paths in the HTML pages are **relative** (`./assets/...` on root pages, `../../assets/...` on post pages), so the site works both at a domain root (Netlify) and inside a sub-folder (GitHub Pages serves it from `/tech-blog/`). Avoid root-relative paths such as `/assets/css/styles.css` in pages: they break on GitHub Pages.

## Folder structure

```text
tech-blog/
├── index.html
├── 404.html
├── about/
│   └── index.html
├── contact/
│   └── index.html
├── success/
│   └── index.html
├── posts/
│   ├── index.html
│   ├── javascript-variables/
│   │   └── index.html
│   ├── javascript-array-methods/
│   │   └── index.html
│   ├── technology-podcast-episode-one/
│   │   └── index.html
│   └── building-accessible-navigation/
│       └── index.html
├── components/
│   ├── header.html
│   └── footer.html
├── assets/
│   ├── css/
│   │   ├── styles.css
│   │   └── post.css
│   ├── js/
│   │   ├── components.js
│   │   ├── navigation.js
│   │   ├── posts.js
│   │   ├── post-renderer.js
│   │   ├── filters.js
│   │   ├── copy-code.js
│   │   └── contact-validation.js
│   └── images/
│       ├── branding/
│       ├── posts/
│       └── social/
├── robots.txt
├── sitemap.xml
├── feed.xml
├── site.webmanifest
├── netlify.toml
├── .gitignore
└── README.md
```

## Run locally

The shared header and footer are loaded with `fetch()`, which browsers usually block on the `file://` protocol. Run a local HTTP server from the project root instead:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`. `npx serve .`, `php -S localhost:8000`, or VS Code Live Server all work too.

## How the shared components work

Each page includes a placeholder like:

```html
<!-- On a post page (two folders below the root) -->
<div data-component="../../components/header.html"></div>
```

`components.js` finds every element with `data-component`, fetches the partial, and inserts it. The partials themselves use root-style links (`/posts/`, `/about/`); `components.js` works out the site root from its own URL and rewrites those links so they point to the right place on any host. Post data in `posts.js` also uses root-style paths, which `resolveSitePath()` resolves the same way. Once loading completes, it emits a `components:loaded` event that `navigation.js` listens for to wire up the mobile menu, highlight the current page, and update the copyright year. If loading fails, a visible message appears and the console logs the details.

## Publishing a new post

1. **Create a page folder** with a lowercase, hyphenated slug — `posts/my-new-post/index.html`. Copy the closest existing post as a starting point (tutorial, podcast, or article). It already uses `../../` paths, which are correct for any page in `posts/<slug>/`.
2. **Update the page's metadata and content**: `<title>`, meta description, canonical URL, Open Graph and Twitter/X tags, JSON-LD, the visible title/intro, author, dates, tags, thumbnail alt text, the article or show notes, and `data-current-post` on `<body>`.
3. **Add one object to `assets/js/posts.js`** with matching `id`, `slug`, `type`, `publishedAt`, `thumbnail`, `url`, `youtubeId` (for videos), and `tags`. This one object drives cards, counts, filters, related posts, and prev/next navigation everywhere.
4. **Add the thumbnail** to `assets/images/posts/`: a `.webp` for the card and cover, and a `.jpg` for `og:image`/`twitter:image`. The easiest way is the thumbnail generator in [`tools/thumbnails/`](tools/thumbnails/README.md), which renders both files in the site's style.
5. **Update `sitemap.xml`** (and `feed.xml` if it belongs in the latest feed entries) — there's no build step, so these don't regenerate on their own.

## Adding a tag

Add it to a post's `tags` array in `assets/js/posts.js` — the tag dropdown is generated automatically from whatever unique values exist across all posts. Keep capitalization consistent (`JavaScript`, not `javascript` or `Javascript`).

## Replacing a YouTube video

Grab the ID after `v=` in the video's watch URL and drop it into all four places: the post's `<iframe>` src, the fallback YouTube link, the JSON-LD `embedUrl`, and `youtubeId` in `posts.js`. Embeds use `youtube-nocookie.com` and don't autoplay.

## Deployment

The site deploys automatically to Netlify on every push to `main`:

- **Build command:** none
- **Publish directory:** `.`
- **Contact form:** detected via `data-netlify="true"` on `contact/index.html`; a honeypot field cuts down on spam, and submissions land in the Netlify dashboard.
- **Custom 404:** Netlify serves the root `404.html` automatically for any unmatched static URL — no SPA catch-all redirect needed, since every page here is a real multi-page route.

The site also works on **GitHub Pages** (Settings → Pages → deploy from the `main` branch, `/ (root)` folder), where it is served at `https://nnamdi-security.github.io/tech-blog/`. Differences to know about:

- Netlify Forms only works on Netlify, so the contact form will not submit on GitHub Pages.
- `netlify.toml` (security and cache headers, pretty URLs) is ignored by GitHub Pages. An empty `.nojekyll` file tells GitHub Pages to serve the files as-is without running Jekyll.
- GitHub Pages serves `404.html` at whatever URL was missing, so that page includes a tiny script that sets a `<base>` URL before its stylesheets load.

## Quality checklist

Before publishing anything new:

- Test at mobile, tablet, and desktop widths
- Navigate the whole flow with keyboard only
- Confirm the mobile menu opens, closes, and responds to Escape
- Zoom to 200% and check for horizontal overflow
- Check heading order and visible focus states
- Confirm meaningful images have real alt text
- Test the contact form on a deploy preview
- Test filters together and confirm the URL updates
- Validate HTML, XML, JSON-LD, and the web manifest
- Confirm `sitemap.xml`, `robots.txt`, and `feed.xml` all use the live domain

## Performance notes

No frameworks, no large libraries. YouTube iframes are lazy-loaded, though a video iframe still pulls more data than a thumbnail facade would — a thumbnail-first, click-to-load pattern is on the roadmap. Post thumbnails are compressed WebP (about 50 KB each), with JPG copies used only for social previews.

## Roadmap

- [ ] Generate post pages, sitemap, and RSS from one data source with a small build script
- [ ] Connect a real newsletter provider
- [ ] Add a YouTube thumbnail facade (click to load the iframe)
- [ ] Calculate reading time automatically
- [ ] Add dark mode
- [ ] Add pagination once the archive grows
- [ ] Add privacy-friendly analytics
- [ ] Add HTML, accessibility, and broken-link checks via GitHub Actions
