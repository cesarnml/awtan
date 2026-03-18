import { defineCliConfig } from "sanity/cli";

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ??
  process.env.VITE_SANITY_PROJECT_ID ??
  process.env.PUBLIC_SANITY_PROJECT_ID ??
  "your-project-id";
const dataset =
  process.env.SANITY_STUDIO_DATASET ??
  process.env.VITE_SANITY_DATASET ??
  process.env.PUBLIC_SANITY_DATASET ??
  "production";

console.info("[sanity-env][sanity-cli]", {
  VITE_SANITY_PROJECT_ID: process.env.VITE_SANITY_PROJECT_ID ?? null,
  VITE_SANITY_DATASET: process.env.VITE_SANITY_DATASET ?? null,
  VITE_SANITY_API_VERSION: process.env.VITE_SANITY_API_VERSION ?? null,
  SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID ?? null,
  SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET ?? null,
  SANITY_STUDIO_API_VERSION: process.env.SANITY_STUDIO_API_VERSION ?? null,
  resolvedProjectId: projectId,
  resolvedDataset: dataset,
});

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
});
