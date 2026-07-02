import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: 'https://web.comovas.es',
  integrations: [mdx(), sitemap(), preact()],
  vite: {
    plugins: [tailwindcss()]
  }
});
