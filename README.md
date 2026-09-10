# joaquinramirez.dev

The source of my portfolio, served by GitHub Pages at
[joaquinramirez.dev](https://joaquinramirez.dev).

One page of hand-written HTML and CSS. No framework, no build step, no
dependencies: `index.html` is the whole site, roughly 40KB, and deploying it
means pushing to `main`.

## What is in it

Four case studies written as interview scripts rather than summaries, covering
an LLM copilot and its agents, a multi-tenant RAG pipeline, combinatorial
optimization for contract allocation, and real-time fraud detection. Two of
them carry architecture diagrams, hand-authored as inline SVG so they theme
with the page and need no image files or diagramming library.

## Why it is built this way

The constraint was that it has to stay fast and legible with no maintenance,
because the alternative is a portfolio that breaks silently between the day it
is built and the day someone opens it.

- **No JavaScript framework.** The content is in the HTML, which means it
  renders without JS and is readable by crawlers that do not execute it.
  Lighthouse: 100 performance, 100 SEO, 100 best practices, 96 to 100
  accessibility on mobile and desktop.
- **Self-hosted variable font**, so there is no third-party font request and
  nothing to go stale.
- **Cookieless analytics** (Umami), no cookie banner needed, with a
  [privacy page](https://joaquinramirez.dev/privacy.html) that describes
  exactly what is collected.
- **Theme-aware** via CSS custom properties, including the SVG diagrams, with
  contrast verified against WCAG AA in both light and dark.
- **JSON-LD** `Person` and `WebSite` schema, `sitemap.xml`, `robots.txt` and
  a canonical URL.

## Layout

    index.html       the entire site
    privacy.html     analytics disclosure
    resume.pdf       current resume, kept in sync with the live version
    inter-var.woff2  self-hosted variable font
    og.png           social preview card
    sitemap.xml robots.txt llms.txt favicon.*
