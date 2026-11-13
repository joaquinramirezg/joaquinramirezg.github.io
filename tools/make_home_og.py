"""Make the 1200x630 LinkedIn/OG preview for the home page (public/og.png).

    python3 tools/make_home_og.py

Same visual system as make_og.py (case studies): label, headline, metric chips, photo.
Every line comes from the hero; numbers must match the resume. After changing it,
bump the ?v= on ogImage in src/layouts/Base.astro so LinkedIn refetches it.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
F = "/System/Library/Fonts/Supplemental/"
bold = lambda n: ImageFont.truetype(F + "Arial Bold.ttf", n)
reg = lambda n: ImageFont.truetype(F + "Arial.ttf", n)

W, H = 1200, 630
c = Image.new("RGB", (W, H), "#0f141b"); g = ImageDraw.Draw(c)
g.rectangle((0, 0, 10, H), fill="#5aa9e6")
g.text((64, 64), "MACHINE LEARNING ENGINEER · DATA SCIENTIST", font=bold(24), fill="#5aa9e6")
g.text((64, 112), "Joaquin Ramirez", font=bold(76), fill="#e8edf3")
g.text((64, 214), "Led Crehana's GenAI copilot and its agents", font=reg(34), fill="#c9d3de")
y, x = 290, 64
for m in ["1300+ organizations", "48K+ users", "adoption 9x"]:
    f = bold(26); tw = g.textlength(m, font=f)
    g.rounded_rectangle((x, y, x + tw + 40, y + 50), radius=25, fill="#16283a")
    g.text((x + 20, y + 11), m, font=f, fill="#7cbcf0"); x += tw + 52
g.text((64, H - 132), "UCLA Anderson MSBA · Class President", font=reg(28), fill="#9fadbd")
g.text((64, H - 84), "joaquinramirez.dev", font=bold(28), fill="#5aa9e6")
S = 240
me = Image.open(ROOT / "public/me.jpg").convert("RGB").resize((S, S))
mask = Image.new("L", (S, S), 0); ImageDraw.Draw(mask).ellipse((0, 0, S - 1, S - 1), fill=255)
c.paste(me, (W - S - 64, H - S - 64), mask)
out = ROOT / "public/og.png"
c.save(out, optimize=True); print("wrote", out)
