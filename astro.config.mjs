// @ts-check
import react from "@astrojs/react";
import sentry from "@sentry/astro";
import sanity from "@sanity/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

process.loadEnvFile?.();

const isProduction = process.env.NODE_ENV === "production";
const sanityProjectId =
  process.env.PUBLIC_SANITY_PROJECT_ID ?? "your-project-id";
const sanityDataset = process.env.PUBLIC_SANITY_DATASET ?? "production";
const sanityApiVersion = process.env.PUBLIC_SANITY_API_VERSION ?? "2025-02-19";

console.info("[sanity-env][astro-config]", {
  PUBLIC_SANITY_PROJECT_ID: process.env.PUBLIC_SANITY_PROJECT_ID ?? null,
  PUBLIC_SANITY_DATASET: process.env.PUBLIC_SANITY_DATASET ?? null,
  PUBLIC_SANITY_API_VERSION: process.env.PUBLIC_SANITY_API_VERSION ?? null,
  SANITY_API_READ_TOKEN_PRESENT: Boolean(process.env.SANITY_API_READ_TOKEN),
  resolvedProjectId: sanityProjectId,
  resolvedDataset: sanityDataset,
  resolvedApiVersion: sanityApiVersion,
  isProduction,
});

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["sanity", "@sanity/astro", "@sanity/visual-editing"],
    },
  },

  integrations: [
    react(),
    sanity({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: true,
      studioBasePath: "/studio",
      studioRouterHistory: "hash",
    }),
    ...(isProduction
      ? [
          sentry({
            project: "awtan",
            org: "cnml",
            authToken: process.env.SENTRY_AUTH_TOKEN,
          }),
        ]
      : []),
  ],
});
