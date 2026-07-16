# Nnamdi's Dev Notes

A complete static technology blog built with semantic HTML5, modern CSS, and vanilla JavaScript. It contains video tutorials, podcast episodes, written articles, client-side search and filters, shared components, SEO metadata, structured data, an RSS feed, and a Netlify-compatible contact form.

## Architecture

The project deliberately uses two complementary content sources:

1. `assets/js/posts.js` contains post metadata used to render cards, counts, related posts, sorting, search, and filters.
2. Each individual post remains a real HTML page containing its full article, unique SEO metadata, social tags, and JSON-LD.

This gives you convenient homepage maintenance without making search engines or social crawlers depend on client-side JavaScript for important post content.

The shared header and footer are stored in `components/` and loaded with `fetch()` by `assets/js/components.js`. Root-relative paths such as `/components/header.html` keep the same URL on deeply nested post pages when deployed at a Netlify domain root.

## Main features

- Responsive homepage with featured and latest content
- Filterable post archive
- Tutorial, podcast, and article page examples
- Privacy-enhanced YouTube embeds using `youtube-nocookie.com`
- Shared header and footer loaded with `fetch()`
- Accessible mobile navigation and skip link
- Copy-to-clipboard buttons for code examples
- Unique SEO and social-sharing metadata
- JSON-LD structured data
- Netlify Forms contact form with honeypot protection
- Custom 404 and success pages
- RSS feed, sitemap, robots file, and web manifest
- No build process, package manager, or JavaScript framework

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

## Values to replace before publishing

Use your editor's project-wide search to find and replace:

- `techbrosis.netlify.app`
- `REPLACE-ME`
- `REPLACE_ME`
- `M7lc1UVf-VE`, which is a sample YouTube video ID
- Sample author biography, guest profile, dates, timestamps, and post copy
- The placeholder newsletter form
- Sample social artwork and thumbnails

## Run locally

The shared header and footer are loaded with `fetch()`. Browsers usually block those requests when a page is opened directly through the `file://` protocol, so run a local HTTP server from the project root.

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

Other options include:

- VS Code Live Server
- `npx serve .`
- `php -S localhost:8000`

## How the shared components work

Each page includes placeholders such as:

```html
<div data-component="/components/header.html"></div>
```

`components.js` finds every element with `data-component`, downloads the partial, and inserts the returned HTML. When loading completes, it emits a `components:loaded` event. `navigation.js` responds by setting up the mobile menu, highlighting the current page, and updating the copyright year.

If loading fails, a visible message appears and a detailed error is written to the browser console.

## Publish a new post

### 1. Create a page folder

Use a lowercase, hyphenated slug:

```text
posts/my-new-post/index.html
```

Copy the closest sample page:

- Tutorial: `posts/javascript-array-methods/index.html`
- Podcast: `posts/technology-podcast-episode-one/index.html`
- Article: `posts/building-accessible-navigation/index.html`

### 2. Update the page

Change all of these values:

- `<title>`
- Meta description
- Canonical URL
- Open Graph metadata
- Twitter/X metadata
- JSON-LD
- Visible title and introduction
- Author, publication date, update date, duration, or reading time
- Tags
- Thumbnail and alternative text
- Article, show notes, or tutorial content
- `data-current-post` on the `<body>` element

Keep this important metadata and the main article directly in the HTML.

### 3. Add one object to `assets/js/posts.js`

```js
{
    id: "my-new-post",
    title: "My New Post",
    slug: "my-new-post",
    type: "article",
    description: "A concise SEO description.",
    excerpt: "A short card description.",
    publishedAt: "2026-08-01",
    updatedAt: null,
    author: "Michael Erastus",
    thumbnail: "/assets/images/posts/my-new-post.webp",
    thumbnailAlt: "A useful description of the image",
    url: "/posts/my-new-post/",
    youtubeId: null,
    duration: null,
    readingTime: "6 min read",
    featured: false,
    tags: ["JavaScript", "Accessibility"]
}
```

Cards, latest-post sorting, counts, filters, related posts, and previous/next navigation will update from this object.

### 4. Add the thumbnail

Place it in `assets/images/posts/`.

Recommended sizes:

- Post card or cover: 1600 × 1000 pixels
- Social preview: 1200 × 630 pixels
- Prefer compressed WebP or AVIF for photos
- Use SVG for simple illustrations when appropriate
- Include useful alternative text for meaningful images

### 5. Update static discovery files

Add the new page to:

- `sitemap.xml`
- `feed.xml` when it belongs among the latest feed entries

Because this site has no build step, those files do not regenerate automatically.

## Add a tag

Add the tag to a post's `tags` array in `assets/js/posts.js`. The tag dropdown is generated automatically from the unique values in all post objects.

Keep capitalization consistent. For example, use `JavaScript` everywhere rather than mixing `Javascript`, `javascript`, and `JavaScript`.

## Replace a YouTube video

A YouTube watch URL normally looks like:

```text
https://www.youtube.com/watch?v=VIDEO_ID
```

Copy the value after `v=` and replace the sample ID in:

1. The post's `<iframe>` URL
2. The fallback YouTube link
3. JSON-LD `embedUrl`
4. `youtubeId` in `assets/js/posts.js`

The embeds do not autoplay and use YouTube's privacy-enhanced domain.

## Update SEO metadata

Every page has direct metadata in its `<head>`. Update:

- Page title
- Meta description
- Canonical URL
- Open Graph title, description, image, URL, and type
- Twitter/X title, description, and image
- JSON-LD on individual post pages

After Netlify assigns your site URL, replace every instance of `https://techbrosis.netlify.app` with the real production URL.

## Social-preview images

Create images at 1200 × 630 pixels for reliable LinkedIn and X previews. Keep important text away from the edges because platforms can crop images.

The starter image is:

```text
assets/images/social/default-social.svg
```

For better results, create one preview image per important post and update that page's Open Graph and Twitter/X image tags.

## GitHub setup

Create a new empty GitHub repository. From this project directory, run:

```bash
git init
git add .
git commit -m "Build initial static technology blog"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Do not commit passwords, private API keys, `.env` files, or other secrets.

## Deploy to Netlify

1. Sign in to Netlify.
2. Select **Add new site** and **Import an existing project**.
3. Connect GitHub and choose the repository.
4. Leave the build command empty.
5. Set the publish directory to `.`.
6. Deploy the site.
7. Replace `techbrosis.netlify.app` throughout the repository with your Netlify URL.
8. Commit and push those replacements.

Each new push to the connected production branch triggers another deployment automatically.

### Contact form

Netlify detects the form in `contact/index.html` because it has `data-netlify="true"`. The hidden `form-name` field identifies it, and the honeypot field helps reduce automated spam. Submissions appear in the Netlify dashboard.

### Custom 404 page

Netlify automatically serves the root-level `404.html` when a static URL does not exist. Do not add a catch-all redirect intended for a single-page application; this project uses real multi-page URLs.

### Custom domain

In Netlify, open **Domain management**, add your domain, and follow its DNS instructions. Netlify can provision HTTPS after DNS is configured.

Then update:

- Canonical URLs
- Open Graph URLs
- JSON-LD URLs
- Share links
- `robots.txt`
- `sitemap.xml`
- `feed.xml`

## Quality checklist

Before launch:

- Replace every placeholder value.
- Test every page at mobile, tablet, and desktop widths.
- Navigate the complete site using only a keyboard.
- Confirm the mobile menu opens, closes, and responds to Escape.
- Zoom to 200% and look for horizontal overflow.
- Check heading order and visible focus states.
- Confirm meaningful images have accurate alternative text.
- Submit the Netlify form on a deploy preview.
- Test all filters together and confirm the URL updates.
- Test code-copy buttons over HTTPS or localhost.
- Validate HTML, XML, JSON-LD, and the web manifest.
- Check social previews after the production URL is live.
- Confirm `sitemap.xml`, `robots.txt`, and `feed.xml` use the real domain.

## Performance decisions

The project avoids frameworks and large libraries. YouTube iframes are lazy-loaded, but a video iframe still downloads more data than a thumbnail facade. A future improvement could display a YouTube thumbnail first and create the iframe only after the visitor presses Play.

The starter artwork is SVG for portability and sharp rendering. Replace it with compressed WebP or AVIF images when you introduce photography.

## Future improvements

- Generate post pages, sitemap, and RSS from one data source with a small build script
- Connect a real newsletter provider
- Add a YouTube thumbnail facade
- Calculate reading time automatically
- Add dark mode
- Add pagination when the archive grows
- Add privacy-friendly analytics
- Add HTML, accessibility, and broken-link checks in GitHub Actions
- Move to a static-site generator when maintaining many HTML pages becomes repetitive
