# Powers of Forensic Minds — static site

A static rebuild of **forensicpsychfl.com**, ready for GitHub Pages with your
custom domain. Same conventions as your other sites: a shared `js/script.js`
injects the header and footer on every page, design tokens live as CSS custom
properties in `css/styles.css`, and a `CNAME` file holds the custom domain.

## Files

```
index.html        Home page
fees.html         Fee schedule
blog.html         Blog index
the-risk-gap.html "The Risk Gap" post
2025/10/02/...    Redirect from the old WordPress permalink
css/styles.css    All styling + design tokens (:root variables at the top)
js/script.js      Injects header/footer; edit phone/email/booking in the SITE object
CNAME             forensicpsychfl.com
.nojekyll         Tells GitHub Pages to skip Jekyll processing
robots.txt        Allows crawlers + points to sitemap
sitemap.xml       Sitemap (home, fees, blog, post)
images/           Where local images go once you leave WordPress (see below)
```

## Deploy to GitHub Pages

1. Create a repo (e.g. `forensicpsychfl`) and push these files to the `main`
   branch root (the `.html` files must sit at the repo root).
2. Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a
   branch*, Branch = `main`, Folder = `/ (root)`. Save.
3. Under **Custom domain**, enter `forensicpsychfl.com` and save. The included
   `CNAME` file already sets this; GitHub will verify it.
4. DNS at GoDaddy — point the domain at GitHub Pages:
   - Four **A** records for the apex `@`: `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - One **CNAME** for `www` → `<your-username>.github.io`
   - Remove the old WordPress A/CNAME records for these hosts.
5. Wait for DNS to propagate, then tick **Enforce HTTPS** in Settings → Pages.

You can preview locally first by just opening `index.html` in a browser.

## Editing content

- **Phone, email, booking link, brand name** live in one place: the `SITE`
  object at the top of `js/script.js`. Change them there and they update in the
  header and footer everywhere.
- **Page copy** is plain HTML in `index.html` and `fees.html`.
- **Colors, fonts, spacing** are the `:root` variables at the top of
  `css/styles.css`.
- **Booking** points to your Airtable form. Update the URL in `fees.html`
  (three places) and in `js/script.js` if it ever changes.

## Cutting the last tie to WordPress (images)

To get the site live immediately, two images still load from your WordPress
CDN (`i0.wp.com`). That keeps working while WordPress/Jetpack is active, but to
be fully independent:

1. Download the images listed in `images/SOURCES.txt` into the `images/` folder.
2. In `index.html`, change the hero `<img src="https://i0.wp.com/...">` to
   `src="images/hero.webp"`.
3. In `js/script.js`, change `logo:` in the `SITE` object to `"images/logo.jpg"`.
4. In both `.html` files, the favicon `<link rel="icon" ...>` can point to a
   local `images/logo.jpg` too.

## The blog

Your **Forensic Mindz Blog** is included:

- `blog.html` — the blog index (lists posts)
- `the-risk-gap.html` — the one published post, "The Risk Gap," with the full
  text, sources, and featured image preserved
- `2025/10/02/the-risk-gap/index.html` — a tiny redirect so the *old* WordPress
  permalink (`/2025/10/02/the-risk-gap/`) still works and forwards to the new
  page. Keeps any existing links/shares alive.

### Adding a new post

1. Copy `the-risk-gap.html`, rename it (e.g. `competency-basics.html`), and
   replace the title, date, byline, image, and body.
2. Add a matching `<article class="post-card">` block at the top of the list in
   `blog.html` so it shows on the index.
3. Add its URL to `sitemap.xml`.

That's the whole pattern — no build step, no database.
