# joaquinramirez.dev

The source of my portfolio, served by GitHub Pages at
[joaquinramirez.dev](https://joaquinramirez.dev).

Hand-written HTML and CSS. No framework, no build step, no dependencies:
deploying it means pushing to `main`. The home page is the quick scan (work,
projects, skills); each case study and each flagship project has its own page,
so a link shared on LinkedIn opens straight to it with its own preview card.

## What is in it

Four case studies written as interview scripts rather than summaries, covering
an LLM copilot and its agents, a multi-tenant RAG pipeline, combinatorial
optimization for contract allocation, and real-time fraud detection. Two of
them carry architecture diagrams, hand-authored as inline SVG so they theme
with the page and need no image files or diagramming library.

Project pages for the work worth five minutes, starting with
[AlwaysHome](https://joaquinramirez.dev/projects/alwayshome/): the demo, the
result, where AI is and is not used, and the decisions behind it.

## Why it is built this way

The constraint was that it has to stay fast and legible with no maintenance,
because the alternative is a portfolio that breaks silently between the day it
is built and the day someone opens it.

- **No JavaScript framework.** The content is in the HTML, which means it
  renders without JS and is readable by crawlers that do not execute it.
  Lighthouse (mobile, Nov 2026, home, a case study and a project page):
  99 to 100 performance, 100 accessibility, 100 best practices, 100 SEO.
- **Heavy media loads on demand.** The project demo is a still frame until
  the reader presses play.
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

    index.html       home page
    site.css site.js shared styles, analytics events and the demo player
    work/<slug>/     one page per case study, each with its own og.png
    projects/<slug>/ one page per flagship project (demo, figures, og.png)
    p/               project card thumbnails
    privacy.html     analytics disclosure
    resume.pdf       current resume, kept in sync with the live version
    inter-var.woff2  self-hosted variable font
    og.png           social preview card
    sitemap.xml robots.txt llms.txt favicon.*
