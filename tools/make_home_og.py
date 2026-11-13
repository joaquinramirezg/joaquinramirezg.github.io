"""Make the 1200x630 LinkedIn/OG preview for the home page (public/og.png).

    python3 tools/make_home_og.py

Built to survive LinkedIn's phone preview (about 0.3x): few words, large type, two chips.
The card is seen alone, away from the page, so it carries one scale number as proof.
Numbers must match the resume byte for byte. After changing it, bump the ?v= on
ogImage in src/layouts/Base.astro so LinkedIn refetches it.
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
g.text((64, 70), "Joaquin Ramirez", font=bold(84), fill="#e8edf3")
g.text((64, 186), "GenAI copilot used by", font=reg(46), fill="#c9d3de")
g.text((64, 242), "1300+ organizations", font=bold(46), fill="#e8edf3")
y = 336
for m in ["Senior ML Engineer · tech lead", "3+ years · 4 industries"]:
    f = bold(32); tw = g.textlength(m, font=f)
    g.rounded_rectangle((64, y, 64 + tw + 48, y + 60), radius=30, fill="#16283a")
    g.text((88, y + 13), m, font=f, fill="#7cbcf0"); y += 76
g.text((64, H - 92), "UCLA Anderson MSBA '27 · Class President", font=reg(32), fill="#9fadbd")
S = 260
me = Image.open(ROOT / "public/me.jpg").convert("RGB").resize((S, S))
mask = Image.new("L", (S, S), 0); ImageDraw.Draw(mask).ellipse((0, 0, S - 1, S - 1), fill=255)
c.paste(me, (W - S - 64, (H - S) // 2 - 20), mask)
out = ROOT / "public/og.png"
c.save(out, optimize=True); print("wrote", out)
