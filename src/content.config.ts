import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One file per production role or case study. A non-empty body makes a /work/<slug>/ page.
const work = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    where: z.string(),
    summary: z.string(),
    metrics: z.array(z.string()).default([]),
    stack: z.string(),
    order: z.number(),
    compact: z.boolean().default(false),
    pageTitle: z.string().optional(),
    minutes: z.number().optional(),
    angle: z.string().optional(),
    description: z.string().optional(),
    featured: z.object({ big: z.string(), label: z.string() }).optional(),
  }),
});

// One file per project. A non-empty body makes a /projects/<slug>/ page (flagship projects only).
const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    where: z.string(),
    summary: z.string(),
    shows: z.string(),
    metrics: z.array(z.string()).default([]),
    stack: z.string(),
    code: z.string().url().optional(),
    demo: z.string().url().optional(),
    order: z.number(),
    thumb: z.string(),
    kicker: z.string().optional(),
    byline: z.string().optional(),
    lead: z.string().optional(),
    pageMetrics: z.array(z.string()).optional(),
    note: z.string().optional(),
    description: z.string().optional(),
    ogAlt: z.string().optional(),
    featured: z.object({ big: z.string(), label: z.string() }).optional(),
  }),
});

export const collections = { work, projects };
