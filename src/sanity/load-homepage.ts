import {
  sanityClient,
  sanityRuntimeConfig,
  isSanityConfigured,
} from "./client";
import { getFallbackPayload } from "./fallback";
import { homepageQuery, siteSettingsQuery } from "./queries";
import type { HomepageDocument, HomepagePayload, SiteSettings } from "./types";

function normalizeSiteSettings(siteSettings: SiteSettings | null): SiteSettings | null {
  if (!siteSettings) {
    return null;
  }

  return {
    ...siteSettings,
    navItems: Array.isArray(siteSettings.navItems) ? siteSettings.navItems : [],
    socialLinks: Array.isArray(siteSettings.socialLinks)
      ? siteSettings.socialLinks
      : [],
  };
}

function hasRenderableHomepage(
  homepage: HomepageDocument | null,
  siteSettings: SiteSettings | null,
) {
  return Boolean(
    homepage &&
    Array.isArray(homepage.sections) &&
    homepage.sections.length > 0 &&
    siteSettings &&
    siteSettings.hotelName,
  );
}

export async function loadHomepagePage(): Promise<HomepagePayload> {
  if (!isSanityConfigured) {
    return getFallbackPayload(
      "config-missing",
      "Sanity is not configured yet. Add PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, and PUBLIC_SANITY_API_VERSION to switch this page from sample content to live CMS data.",
    );
  }

  try {
    const [homepage, rawSiteSettings] = await Promise.all([
      sanityClient.fetch<HomepageDocument | null>(homepageQuery),
      sanityClient.fetch<SiteSettings | null>(siteSettingsQuery),
    ]);
    const siteSettings = normalizeSiteSettings(rawSiteSettings);

    if (!hasRenderableHomepage(homepage, siteSettings)) {
      return getFallbackPayload(
        "content-missing",
        `Sanity is connected to ${sanityRuntimeConfig.projectId}/${sanityRuntimeConfig.dataset}, but the singleton homepage or site settings content is still missing. Create both documents in /studio to replace the sample content.`,
      );
    }

    return {
      homepage,
      siteSettings,
      source: "sanity",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown Sanity query failure";

    return getFallbackPayload(
      "query-error",
      `Sanity is configured, but the published-content query failed: ${message}`,
    );
  }
}
