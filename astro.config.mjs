// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import svelte from "@astrojs/svelte";

import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://abadicomm.id",
  output: "static",
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'always',
    assets: '_astro'
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["abadicomm.id"],
    },
  },
  integrations: [
    svelte(), 
    sitemap({
      filter: (page) => page !== 'https://abadicomm.id/admin/',
    }),
    robotsTxt({
      policy: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/admin/', '/admin'],
        },
      ],
      sitemap: true,
    })
  ],
});