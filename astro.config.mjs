import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false
  },
  site: 'https://JairAmaro.github.io',  // Especifica tu URL de GitHub Pages para hacer el deploy esto entendi de la documentacion
  integrations: [react(), tailwind(), sitemap()]
});

// dummie commit