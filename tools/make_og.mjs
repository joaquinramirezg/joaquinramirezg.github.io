// Make the 1200x630 link previews (LinkedIn, WhatsApp, Slack) in the site's own type and colors.
//
//   node tools/make_og.mjs          (needs `npm run build` first and Playwright installed)
//
// Writes public/og.png for the home page, public/work/<slug>/og.png for every case study and
// public/projects/<slug>/og.png for every project page. Titles and figures come from
// src/content, so numbers stay identical to the site and resume. After a change, bump the
// ?v= on ogImage in src/layouts/Base.astro and src/pages/work/[slug].astro so LinkedIn refetches.
import { createRequire } from 'node:module';
import { readFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const { chromium } = createRequire(import.meta.url)('playwright');
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const MIME = { woff2: 'font/woff2', webp: 'image/webp', png: 'image/png', jpg: 'image/jpeg' };
// Inline every asset: a page set with setContent cannot load file:// URLs.
const pub = (p) => `data:${MIME[p.split('.').pop()]};base64,` + readFileSync(join(ROOT, 'public', p)).toString('base64');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const SECTOR = { Crehana: 'B2B HR-tech SaaS', Canvia: 'IT consulting', APTIM: 'US engineering firm', Belcorp: 'Consumer goods' };

function front(kind, slug) {
  const s = readFileSync(join(ROOT, 'src/content', kind, slug + '.md'), 'utf8');
  const [, fm, body] = s.split(/^---$/m);
  const d = {};
  for (const line of fm.trim().split('\n')) {
    const i = line.indexOf(':'); const k = line.slice(0, i).trim(); const v = line.slice(i + 1).trim();
    try { d[k] = JSON.parse(v); } catch { d[k] = v.replace(/^"|"$/g, ''); }
  }
  d.hasPage = body && body.trim().length > 0;
  return d;
}

const css = `
@font-face { font-family: IS; src: url(${pub('instrument-sans-var.woff2')}) format('woff2'); font-weight: 400 700; }
@font-face { font-family: DM; src: url(${pub('dm-mono-400.woff2')}) format('woff2'); font-weight: 400; }
@font-face { font-family: DM; src: url(${pub('dm-mono-500.woff2')}) format('woff2'); font-weight: 500; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #f4f3ef; color: #121212; font-family: IS; padding: 56px 64px; display: flex; flex-direction: column; position: relative; }
.lab { font: 500 22px/1.3 DM; color: #57564f; display: flex; align-items: center; gap: 14px; }
.lab::before { content: ""; width: 14px; height: 14px; background: #d8431f; }
.foot { margin-top: auto; border-top: 2px solid #121212; padding-top: 22px; display: flex; justify-content: space-between; font: 400 24px/1.3 DM; color: #57564f; }
.foot b { font-weight: 500; color: #121212; }
`;

const home = () => `<style>${css}
h1 { font-size: 150px; line-height: .9; letter-spacing: -0.05em; font-weight: 500; margin-top: 34px; }
p { margin-top: 28px; font-size: 28px; line-height: 1.3; max-width: 780px; }
img { position: absolute; right: 64px; top: 56px; width: 250px; height: 250px; object-fit: cover; object-position: 50% 18%; border-radius: 2px; }
</style>
<div class="lab">Machine learning engineer · Data scientist</div>
<h1>Joaquin<br>Ramirez</h1>
<p>Senior ML Engineer and AI tech lead. GenAI agents, fraud detection, computer vision, optimization and forecasting.</p>
<img src="${pub('portrait-sm.webp')}">
<div class="foot"><span>UCLA Anderson MSBA '27 · Class President</span><b>joaquinramirez.dev</b></div>`;

const page = (label, title, lead, figs, shot) => `<style>${css}
.body { display: flex; gap: 48px; margin-top: 34px; align-items: flex-start; }
.txt { flex: 1; }
h1 { font-size: ${shot ? 60 : 84}px; line-height: 1.02; letter-spacing: -0.035em; font-weight: 500; }
p { margin-top: 26px; font-size: 30px; line-height: 1.3; max-width: 980px; }
ul { list-style: none; margin-top: 30px; padding: 0; display: flex; flex-wrap: wrap; gap: 0; }
li { font: 500 ${shot ? 24 : 28}px/1.3 DM; padding: 0 22px; border-left: 2px solid #d6d4cc; margin-bottom: 10px; }
li:first-child { padding-left: 0; border-left: 0; }
${shot ? 'ul { display: block; } li { padding: 0; border: 0; }' : ''}
img { width: 520px; max-height: 380px; object-fit: cover; object-position: top; border: 2px solid #d6d4cc; border-radius: 2px; display: block; }
</style>
<div class="lab">${esc(label)}</div>
<div class="body"><div class="txt"><h1>${esc(title)}</h1>${lead ? `<p>${esc(lead)}</p>` : ''}<ul>${figs.map((f) => `<li>${esc(f)}</li>`).join('')}</ul></div>${shot ? `<img src="${pub(shot)}">` : ''}</div>
<div class="foot"><span>Joaquin Ramirez</span><b>joaquinramirez.dev</b></div>`;

const jobs = [{ out: 'og.png', html: home() }];
for (const kind of ['work', 'projects']) {
  for (const f of readdirSync(join(ROOT, 'src/content', kind))) {
    const slug = f.replace(/\.md$/, ''); const d = front(kind, slug);
    if (!d.hasPage) continue;
    const emp = String(d.where).split(' · ')[0].split(' (')[0];
    const label = kind === 'work' ? 'Case study · ' + (SECTOR[emp] || emp) : 'Project';
    const figs = (kind === 'projects' ? d.metrics : d.pageMetrics || d.metrics || []).slice(0, 3);
    const lead = kind === 'work' ? (d.bullets || [])[0] : null;
    // Do not repeat a figure the lead sentence already states.
    const said = (f) => lead && (f.match(/\S*\d\S*/g) || []).some((n) => { const k = n.replace(/^[<~+\u2212-]+/, ''); return new RegExp('(^|[\\s~])' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?=[\\s,.]|$)').test(lead); });
    const shot = kind === 'projects' ? `projects/${slug}/demo-poster.webp` : null;
    jobs.push({ out: `${kind}/${slug}/og.png`, html: page(label, d.pageTitle || d.title, lead, figs.filter((f) => !said(f)), shot) });
  }
}
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
for (const j of jobs) {
  await p.setContent(j.html, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready);
  mkdirSync(dirname(join(ROOT, 'public', j.out)), { recursive: true });
  await p.screenshot({ path: join(ROOT, 'public', j.out) }); console.log('wrote public/' + j.out);
}
await b.close();
