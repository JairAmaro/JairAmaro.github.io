import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false
  },
  site: 'https://JairAmaro.github.io', // bien
  base: '/', // ✅ necesario para que funcione en producción
  integrations: [react(), tailwind(), sitemap()]
});
