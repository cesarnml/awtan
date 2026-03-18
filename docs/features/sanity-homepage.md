# Sanity Homepage Feature Log

## Summary

This branch introduces a Sanity-backed homepage for the Astro marketing site, modeled on the section density and editorial flow of the Koon Hotel homepage.

Current state:

- Sanity Studio is embedded at `/studio`
- The public homepage fetches published singleton content at build time
- The frontend falls back to local sample content until Sanity is configured and populated
- Navigation is modeled now for future non-homepage pages, but only the homepage is implemented in this branch

## Decisions

### Homepage only for v1

The implementation is intentionally limited to the main homepage. We are not building Sanity-driven routing or additional content pages yet.

Reason:

- keeps the first CMS integration small enough to land cleanly
- lets us validate the content model and editorial workflow before expanding page inventory

### Embedded Studio in the same repo

Sanity Studio is mounted through the Astro app at `/studio` using `@sanity/astro`.

Reason:

- one repo and one local dev environment
- easier handoff between frontend implementation and content modeling
- less setup overhead while the CMS model is still changing

### Static published-content fetch

The Astro homepage fetches published content at build time.

Reason:

- matches the marketing-site use case
- keeps hosting simple
- avoids preview/draft complexity in the first pass

Implication:

- content changes require a rebuild/redeploy to appear on the public site

### Flexible ordered sections

The `homepage` document stores an ordered `sections` array instead of a rigid one-off field set.

Reason:

- marketing can reorder modules without code changes
- the homepage structure is content-rich and likely to evolve
- still constrained enough to keep rendering predictable

### Global settings as a singleton

Shared nav and footer content lives in a `siteSettings` singleton.

Reason:

- the homepage already needs cross-page-style navigation
- future pages will likely reuse the same header/footer model

## Data Model

### Singleton documents

`homepage`

- SEO title
- SEO description
- ordered sections array

`siteSettings`

- hotel name
- tagline
- primary nav items
- footer blurb
- footer note
- footer phone/email
- social links

### Homepage section types

- `heroSection`
- `storySection`
- `roomHighlightsSection`
- `amenitiesSection`
- `offersSection`
- `testimonialsSection`
- `gallerySection`
- `newsletterSection`
- `contactSection`

### Shared object types

- `ctaLink`
- `navItem`
- `socialLink`
- `imageWithAlt`
- `roomCard`
- `amenityItem`
- `offerCard`
- `testimonialItem`

## Implementation Notes

### App wiring

- Sanity integration is configured in [`astro.config.mjs`](../../astro.config.mjs)
- Studio is exposed at `/studio` via `@sanity/astro`
- React support was added because the embedded Studio depends on it

### Content loading

- The homepage entrypoint is [`src/pages/index.astro`](../../src/pages/index.astro)
- Content loading is handled in [`src/sanity/load-homepage.ts`](../../src/sanity/load-homepage.ts)
- GROQ queries live in [`src/sanity/queries.ts`](../../src/sanity/queries.ts)
- Runtime typing lives in [`src/sanity/types.ts`](../../src/sanity/types.ts)

### Fallback behavior

If Sanity is not configured, or if required singleton content is missing, the homepage renders local sample content instead of failing the build.

This is implemented in:

- [`src/sanity/fallback.ts`](../../src/sanity/fallback.ts)

Reason:

- allows UI and schema work to progress independently
- keeps the branch demoable before CMS credentials/content are ready

### Rendering model

- The homepage is rendered through a section dispatcher in [`src/components/site/SectionRenderer.astro`](../../src/components/site/SectionRenderer.astro)
- Each homepage module has its own Astro component under [`src/components/sections`](../../src/components/sections)
- Header and footer are split into reusable site components under [`src/components/site`](../../src/components/site)

### Environment variables

Documented in:

- [`.env.example`](../../.env.example)

Current variables:

- `PUBLIC_SANITY_PROJECT_ID`
- `PUBLIC_SANITY_DATASET`
- `PUBLIC_SANITY_API_VERSION`
- `SANITY_API_READ_TOKEN`

## Verification

Current verification completed:

- `pnpm format`
- `pnpm build`

Build status:

- passing

Current non-blocking warnings:

- Sentry warns during build if auth token is unavailable in the build environment
- Vite warns that the Studio bundle is large

## Open Issues / Next Steps

- Create the actual Sanity project content for `Homepage` and `Site settings`
- Replace sample fallback copy and placeholder imagery with real hotel content
- Decide whether the newsletter CTA should become a real form or remain an external link
- Decide how booking flow links should resolve in production
- Add future pages once the homepage model is stable enough to reuse
- Consider preview/draft mode only after the published-content workflow is working well

## Change Log

### 2026-03-14

Implemented the first Sanity CMS integration for the marketing homepage.

Included:

- embedded Studio at `/studio`
- singleton schema for homepage and site settings
- section-based homepage rendering
- global nav/footer content model
- future-ready nav items that can point to placeholder routes
- Koon-style sample homepage fallback content
- env var documentation for local setup
