import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://joaquinramirez.dev',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
  devToolbar: { enabled: false },
});
