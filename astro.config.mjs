// @ts-check
import sentry from "@sentry/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sentry({
      project: "awtan",
      org: "cnml",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
});
