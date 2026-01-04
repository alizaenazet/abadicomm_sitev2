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
  trailingSlash: "never",
  compressHTML: true,
  build: {
    inlineStylesheets: "always",
    assets: "_astro",
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["abadicomm.id"],
    },
    build: {
      rollupOptions: {
        output: {
          // Consistent chunking for better caching
          manualChunks: undefined,
        },
      },
    },
  },
  integrations: [
    svelte(),
    sitemap({
      filter: (page) => page !== "https://abadicomm.id/admin/",
    }),
    robotsTxt({
      policy: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/admin/", "/admin"],
        },
      ],
      sitemap: true,
    }),
  ],
});
