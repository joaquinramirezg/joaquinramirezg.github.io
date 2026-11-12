"""One-off: turn the v1.8 static pages (legacy/) into Astro content files.

Bodies stay HTML inside the .md files, flattened to one block (no blank lines,
no indentation) so Markdown passes them through untouched. New projects can be
written in plain Markdown.
"""
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
L = ROOT / "legacy"
idx = (L / "index.html").read_text()


def flat(h: str) -> str:
    return "\n".join(line.strip() for line in h.strip().splitlines() if line.strip())


def y(v) -> str:
    return json.dumps(v, ensure_ascii=False)


def text(h: str) -> str:
    return html.unescape(re.sub(r"<[^>]+>", "", h)).strip()


# ---------------- work ----------------
work_sec = idx[idx.index('<section id="work">'):idx.index('<section id="projects">')]
cards = re.findall(r'<div class="card( compact)?">(.*?)\n    </div>\n', work_sec, re.S)
slug_by_title = {
    "AI copilot and agents for HR teams": "hr-copilot",
    "The retrieval pipeline behind the copilot": "retrieval-pipeline",
    "Contract allocation for a commodity exporter": "contract-allocation",
    "Fraud detection across 35 financial institutions": "fraud-detection",
    "Computer vision intake for medical recruiting": "cv-intake",
    "Sales forecasting for a new retail channel": "sales-forecasting",
}
for order, (compact, c) in enumerate(cards, 1):
    title = text(re.search(r"<h3>(.*?)</h3>", c, re.S).group(1))
    slug = slug_by_title[title]
    where = text(re.search(r'<span class="where">(.*?)</span>', c).group(1))
    summary = re.search(r"<p>(.*?)</p>", c, re.S).group(1).strip()
    metrics = [html.unescape(m) for m in re.findall(r'<span class="metric">(.*?)</span>', c)]
    tags = text(re.search(r'<p class="tags">(.*?)</p>', c, re.S).group(1)).rstrip(" ·")
    fm = {"title": title, "where": where, "summary": html.unescape(summary), "metrics": metrics,
          "stack": tags, "order": order, "compact": bool(compact)}
    body = ""
    page = L / f"{slug}.html"
    if page.exists():
        p = page.read_text()
        fm["pageTitle"] = text(re.search(r"<h1>(.*?)</h1>", p).group(1))
        fm["minutes"] = int(re.search(r"Case study · (\d+) min read", p).group(1))
        fm["angle"] = text(re.search(r'<article class="case">\s*<p class="where">(.*?)</p>', p, re.S).group(1))
        fm["description"] = html.unescape(re.search(r'<meta name="description" content="(.*?)">', p).group(1))
        b = re.search(r'<article class="case">\s*<p class="where">.*?</p>\n(.*?)\n    </article>', p, re.S).group(1)
        body = flat(b)
    out = "---\n" + "\n".join(f"{k}: {y(v)}" for k, v in fm.items()) + "\n---\n" + (body + "\n" if body else "")
    (ROOT / "src/content/work" / f"{slug}.md").write_text(out)
    print("work", slug, "page" if body else "card")

# ---------------- projects ----------------
proj_sec = idx[idx.index('<section id="projects">'):idx.index('<section id="skills">')]
lis = re.findall(r'<li class="card project" id="project-([a-z-]+)">(.*?)\n      </li>', proj_sec, re.S)
for order, (slug, li) in enumerate(lis, 1):
    thumb = re.search(r'<div class="project-thumb">(.*?)\n        </div>\n        <div class="project-body">', li, re.S).group(1)
    title = text(re.search(r"<h3>(.*?)</h3>", li, re.S).group(1))
    where = text(re.search(r'<span class="where">(.*?)</span>', li).group(1))
    ps = re.findall(r"<p>(.*?)</p>", li, re.S)
    shows = re.search(r'<p class="shows"><b>Shows:</b> (.*?)</p>', li, re.S).group(1)
    metrics = [html.unescape(m) for m in re.findall(r'<span class="metric">(.*?)</span>', li)]
    tags = re.search(r'<p class="tags">(.*?)</p>', li, re.S).group(1)
    stack = text(re.split(r"<a ", tags)[0]).rstrip(" ·")
    links = re.findall(r'<a href="([^"]+)"[^>]*>(.*?)</a>', tags)
    code = next((u for u, t in links if "github.com" in u), None)
    demo = next((u for u, t in links if "vercel.app" in u), None)
    fm = {"title": title, "where": where, "summary": html.unescape(ps[0].strip()), "shows": html.unescape(shows),
          "metrics": metrics, "stack": stack, "code": code, "demo": demo, "order": order,
          "thumb": flat(thumb)}
    body = ""
    page = L / f"{slug}.html"
    if page.exists():
        p = page.read_text()
        head = re.search(r'<header class="page-head">(.*?)</header>', p, re.S).group(1)
        fm["kicker"] = text(re.search(r'<div class="kicker">(.*?)</div>', head).group(1))
        fm["byline"] = text(re.search(r'<span class="where">(.*?)</span>', head).group(1))
        fm["lead"] = text(re.search(r'<p class="lead">(.*?)</p>', head, re.S).group(1))
        fm["pageMetrics"] = [html.unescape(m) for m in re.findall(r'<span class="metric">(.*?)</span>', head)]
        fm["note"] = text(re.search(r'<p class="note">(.*?)</p>', head, re.S).group(1))
        fm["description"] = html.unescape(re.search(r'<meta name="description" content="(.*?)">', p).group(1))
        fm["ogAlt"] = html.unescape(re.search(r'<meta property="og:image:alt" content="(.*?)">', p).group(1))
        sec = re.search(r'<section class="page-body" id="demo">\s*<div class="wrap">\n(.*?)\n  </div>\n</section>', p, re.S).group(1)
        body = flat(sec.replace('<article class="case">', "").replace("</article>", ""))
    out = "---\n" + "\n".join(f"{k}: {y(v)}" for k, v in fm.items() if v is not None) + "\n---\n" + (body + "\n" if body else "")
    (ROOT / "src/content/projects" / f"{slug}.md").write_text(out)
    print("project", slug, "page" if body else "card")

# ---------------- home fragments kept as HTML ----------------
for sec in ["skills", "education", "about"]:
    s = idx[idx.index(f'<section id="{sec}">'):]
    s = s[:s.index("</section>")]
    inner = re.search(r'<div class="wrap">\n    <h2>.*?</h2>\n(.*)\n  </div>', s, re.S).group(1)
    (ROOT / "src/data" / f"{sec}.html").write_text(flat(inner) + "\n")
print("done")
