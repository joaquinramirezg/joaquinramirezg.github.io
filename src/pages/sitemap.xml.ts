import { getCollection } from 'astro:content';

export async function GET() {
  const site = 'https://joaquinramirez.dev';
  const now = new Date().toISOString().slice(0, 10);
  const work = (await getCollection('work')).filter((w) => w.body && w.body.trim());
  const projects = (await getCollection('projects')).filter((p) => p.body && p.body.trim());
  const urls: [string, string][] = [
    ['/', '1.0'],
    ...projects.map((p): [string, string] => [`/projects/${p.id}/`, '0.9']),
    ...work.map((w): [string, string] => [`/work/${w.id}/`, '0.8']),
    ['/privacy.html', '0.2'],
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(([u, p]) => `  <url>\n    <loc>${site}${u}</loc>\n    <lastmod>${now}</lastmod>\n    <priority>${p}</priority>\n  </url>`).join('\n') +
    `\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
