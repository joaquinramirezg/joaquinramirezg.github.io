import { getCollection } from 'astro:content';
import { execFileSync } from 'node:child_process';

// lastmod is the last commit that touched the page's own content, not the build time.
// A lastmod that changes on every build teaches crawlers to ignore it.
function lastCommit(paths: string[]): string {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...paths], { encoding: 'utf8' }).trim();
    if (out) return out;
  } catch {}
  return new Date().toISOString();
}

export async function GET() {
  const site = 'https://joaquinramirez.dev';
  const work = (await getCollection('work')).filter((w) => w.body && w.body.trim());
  const projects = (await getCollection('projects')).filter((p) => p.body && p.body.trim());
  const urls: [string, string, string[]][] = [
    ['/', '1.0', ['src/pages/index.astro', 'src/data']],
    ...projects.map((p): [string, string, string[]] => [`/projects/${p.id}/`, '0.9', [`src/content/projects/${p.id}.md`]]),
    ...work.map((w): [string, string, string[]] => [`/work/${w.id}/`, '0.8', [`src/content/work/${w.id}.md`]]),
    ['/privacy/', '0.2', ['src/pages/privacy.astro']],
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(([u, p, src]) => `  <url>\n    <loc>${site}${u}</loc>\n    <lastmod>${lastCommit(src)}</lastmod>\n    <priority>${p}</priority>\n  </url>`).join('\n') +
    `\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
