import { createClient } from "@sanity/client";

const DEFAULT_PROJECT_ID = "your-project-id";
const DEFAULT_DATASET = "production";
const DEFAULT_API_VERSION = "2025-02-19";

export const sanityRuntimeConfig = {
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? DEFAULT_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? DEFAULT_DATASET,
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION ?? DEFAULT_API_VERSION,
  token: import.meta.env.SANITY_API_READ_TOKEN,
};

export const isSanityConfigured =
  sanityRuntimeConfig.projectId !== DEFAULT_PROJECT_ID &&
  sanityRuntimeConfig.dataset.length > 0;

console.info("[sanity-env][runtime-client]", {
  PUBLIC_SANITY_PROJECT_ID: import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? null,
  PUBLIC_SANITY_DATASET: import.meta.env.PUBLIC_SANITY_DATASET ?? null,
  PUBLIC_SANITY_API_VERSION: import.meta.env.PUBLIC_SANITY_API_VERSION ?? null,
  SANITY_API_READ_TOKEN_PRESENT: Boolean(import.meta.env.SANITY_API_READ_TOKEN),
  resolvedProjectId: sanityRuntimeConfig.projectId,
  resolvedDataset: sanityRuntimeConfig.dataset,
  resolvedApiVersion: sanityRuntimeConfig.apiVersion,
  isSanityConfigured,
});

export const sanityClient = createClient({
  projectId: sanityRuntimeConfig.projectId,
  dataset: sanityRuntimeConfig.dataset,
  apiVersion: sanityRuntimeConfig.apiVersion,
  token: sanityRuntimeConfig.token,
  useCdn: !sanityRuntimeConfig.token,
  perspective: "published",
});
