"""Make the 1200x630 LinkedIn/OG preview for a case study or project.

    python3 tools/make_og.py work hr-copilot
    python3 tools/make_og.py projects my-weekend-project [--shot public/projects/<slug>/demo-poster.webp]

Reads title and metrics from src/content/<kind>/<slug>.md, writes public/<kind>/<slug>/og.png.
Needs Pillow (pip install pillow) and macOS system fonts.
"""
import json, re, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
F = "/System/Library/Fonts/Supplemental/"
bold = lambda n: ImageFont.truetype(F + "Arial Bold.ttf", n)
reg = lambda n: ImageFont.truetype(F + "Arial.ttf", n)

def front(kind, slug):
    s = (ROOT / "src/content" / kind / f"{slug}.md").read_text()
    fm = s.split("---")[1]
    d = {}
    for line in fm.strip().splitlines():
        k, v = line.split(":", 1)
        try: d[k.strip()] = json.loads(v.strip())
        except Exception: d[k.strip()] = v.strip()
    return d

def wrap(d, text, font, width):
    out, cur = [], ""
    for w in text.split():
        t = (cur + " " + w).strip()
        if d.textlength(t, font=font) <= width: cur = t
        else: out.append(cur); cur = w
    return out + [cur]

kind, slug = sys.argv[1], sys.argv[2]
shot = sys.argv[sys.argv.index("--shot") + 1] if "--shot" in sys.argv else None
d = front(kind, slug)
title = d.get("pageTitle") or d["title"]
mets = (d.get("pageMetrics") or d.get("metrics") or [])[:3]
W, H = 1200, 630
c = Image.new("RGB", (W, H), "#0f141b"); g = ImageDraw.Draw(c)
textw = 520 if shot else 1050
# Label by sector, not employer name: US readers do not know the companies (ruling Nov 13).
SECTOR = {"Crehana": "B2B HR-tech SaaS", "Canvia": "IT consulting", "APTIM": "US engineering firm", "Belcorp": "Consumer goods"}
emp = d["where"].split(" · ")[0].split(" (")[0]
label = ("CASE STUDY · " + SECTOR.get(emp, emp)) if kind == "work" else "PROJECT"
g.text((64, 64), label.upper(), font=bold(24), fill="#5aa9e6")
y = 118
for ln in wrap(g, title, bold(52 if shot else 58), textw): g.text((64, y), ln, font=bold(52 if shot else 58), fill="#e8edf3"); y += 64
y += 30; x = 64
for m in mets:
    f = bold(26); tw = g.textlength(m, font=f)
    if x + tw + 40 > (64 + textw): x = 64; y += 64
    g.rounded_rectangle((x, y, x + tw + 40, y + 50), radius=25, fill="#16283a"); g.text((x + 20, y + 11), m, font=f, fill="#7cbcf0"); x += tw + 52
g.text((64, H - 84), "Joaquin Ramirez · joaquinramirez.dev", font=reg(26), fill="#9fadbd")
if shot:
    im = Image.open(ROOT / shot).convert("RGB"); im.thumbnail((560, 520))
    c.paste(im, (W - im.width - 40, (H - im.height) // 2))
else:
    me = Image.open(ROOT / "public/me.jpg").convert("RGB").resize((200, 200))
    mask = Image.new("L", (200, 200), 0); ImageDraw.Draw(mask).ellipse((0, 0, 199, 199), fill=255)
    c.paste(me, (W - 264, H - 264), mask)
out = ROOT / "public" / kind / slug / "og.png"; out.parent.mkdir(parents=True, exist_ok=True)
c.save(out, optimize=True); print("wrote", out)
