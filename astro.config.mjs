// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://jobmatchtalent.hr",
  // base: "/jobmatch-frontend", // repository name
  trailingSlash: "never",
  vite: {
    ssr: {
      // noExternal: true,
    },
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});
