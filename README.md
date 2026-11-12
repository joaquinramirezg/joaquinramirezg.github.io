# joaquinramirez.dev

The source of my portfolio, built with [Astro](https://astro.build) and served
by GitHub Pages at [joaquinramirez.dev](https://joaquinramirez.dev).

Every page is static HTML generated at build time: no client framework, no
runtime JavaScript beyond a few small inline scripts (theme toggle, copy email,
analytics events). Pushing to `main` builds and deploys through GitHub Actions.

## What is in it

- **Home**: the quick scan. Hero, a "Start here" strip, production work, projects,
  skills, education, about, and a contact block with a copyable email.
- **Case studies** at `/work/<slug>/`: an LLM copilot and its agents, a
  multi-tenant RAG pipeline, combinatorial optimization for contract allocation,
  and real-time fraud detection, written as interview scripts with hand-drawn
  inline SVG diagrams that follow the theme.
- **Project pages** at `/projects/<slug>/` for the work worth five minutes,
  starting with [AlwaysHome](https://joaquinramirez.dev/projects/alwayshome/):
  a demo video of the live app, the result, where AI is and is not used, and
  the decisions behind it.

Every page sets its own title, description and 1200x630 preview image, so a
link shared on LinkedIn shows that page, not the site in general.

## Adding a project

1. Write `src/content/projects/<slug>.md`. The front matter fills the home card
   (title, summary, metrics, stack, code and demo links, thumbnail). A body is
   optional: a non-empty body also creates `/projects/<slug>/`, so only flagship
   projects get a page.
2. Put media in `public/projects/<slug>/` and a 16:9 card thumbnail in `public/p/`.
3. `python3 tools/make_og.py projects <slug> --shot public/projects/<slug>/demo-poster.webp`
4. `npm run dev` to check it, then commit and push.

Case studies work the same way in `src/content/work/`; the schema is in
`src/content.config.ts`.

## Run it

    npm ci
    npm run dev      # http://localhost:4321
    npm run build    # static site in dist/

## Why it is built this way

- **Static output**, so it stays fast and readable by crawlers that do not run
  JavaScript. Lighthouse (mobile, Nov 2026, home, a case study and a project
  page): 98 to 100 performance, 100 accessibility, 100 best practices, 100 SEO.
- **Content as files.** One Markdown file per project or case study generates
  its page, its home card, its sitemap entry and its preview image.
- **Self-hosted variable font**, no third-party font request.
- **Cookieless analytics** (Umami), no cookie banner, with a
  [privacy page](https://joaquinramirez.dev/privacy.html) describing exactly
  what is collected.
- **Light and dark themes** from CSS custom properties, following the system
  setting with a toggle that remembers the visitor's choice; contrast checked
  against WCAG AA in both.
- **Heavy media on demand.** The demo video loads only when played.
- **JSON-LD** `Person`, `WebSite`, `Article` and `SoftwareApplication` schema,
  a generated `sitemap.xml`, `robots.txt`, `llms.txt` and canonical URLs.

## Layout

    src/pages/                 home, /work/[slug], /projects/[slug], sitemap.xml
    src/content/work/          one Markdown file per role or case study
    src/content/projects/      one Markdown file per project
    src/layouts/Base.astro     head, nav, footer, theme and email scripts
    src/styles/                site.css (base) and v2.css (layout)
    public/                    images, video, resume, fonts, static pages
    tools/make_og.py           preview image generator
    .github/workflows/         build and deploy to GitHub Pages
