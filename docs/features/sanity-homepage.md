# Sanity CMS Integration

## Summary

This repo now includes a first-pass Sanity CMS integration for the Astro marketing site.

The current scope is intentionally narrow:

- Sanity Studio is configured at `/studio`
- the public site reads published content for the homepage only
- shared header and footer content comes from `siteSettings`
- the app falls back to local sample content if Sanity is not configured or required singleton content is missing

This keeps the CMS rollout small enough to ship while still giving marketing a real content model for the homepage.

## What Was Added

### Embedded and standalone Studio support

Sanity is wired into Astro through [`astro.config.mjs`](../../astro.config.mjs), with `@sanity/astro` mounted at `/studio`.

The repo also includes a standalone Studio workflow via `pnpm studio:dev`, backed by [`sanity.config.ts`](../../sanity.config.ts) and [`sanity.cli.ts`](../../sanity.cli.ts).

In practice, the standalone Studio is the safer local workflow right now. The embedded `/studio` route exists, but local dev still runs into a Vite transform conflict when Studio is served inside the Astro dev server.

### Homepage content model

The homepage is modeled as a singleton `homepage` document with:

- `seoTitle`
- `seoDescription`
- an ordered `sections` array

The ordered array is the main design choice here. Instead of hard-coding one fixed homepage shape, the editor can reorder modules while the frontend keeps rendering through a controlled section map.

Implemented section types:

- `heroSection`
- `storySection`
- `roomHighlightsSection`
- `amenitiesSection`
- `offersSection`
- `testimonialsSection`
- `gallerySection`
- `newsletterSection`
- `contactSection`

Shared object types support links, images, room cards, amenities, offers, testimonials, navigation items, and social links. The schema lives in [`sanity.config.ts`](../../sanity.config.ts).

### Global site settings singleton

Shared site chrome is stored in a singleton `siteSettings` document. That currently covers:

- hotel name and tagline
- primary navigation items
- footer copy
- footer contact info
- social links

This gives the homepage a CMS-managed header and footer now, and leaves room for future pages to reuse the same settings model later.

## Data Flow

The homepage entrypoint is [`src/pages/index.astro`](../../src/pages/index.astro).

At build time it calls [`src/sanity/load-homepage.ts`](../../src/sanity/load-homepage.ts), which:

- checks whether Sanity has been configured
- fetches `homepage` and `siteSettings` in parallel
- normalizes array fields in `siteSettings`
- validates that the minimum renderable singleton content exists
- falls back to local sample payloads when config, content, or queries fail

The Sanity client is configured in [`src/sanity/client.ts`](../../src/sanity/client.ts) and explicitly uses `perspective: "published"`, so the public site only reads published content.

GROQ queries live in [`src/sanity/queries.ts`](../../src/sanity/queries.ts). Runtime TypeScript shapes for the payload are defined in [`src/sanity/types.ts`](../../src/sanity/types.ts).

## Rendering Model

The frontend renders the homepage by iterating over `homepage.sections` and dispatching each entry through [`src/components/site/SectionRenderer.astro`](../../src/components/site/SectionRenderer.astro).

That dispatcher maps Sanity section `_type` values to individual Astro section components under [`src/components/sections`](../../src/components/sections).

This split is useful for two reasons:

- the content model can stay flexible without making `index.astro` large or fragile
- each homepage module remains easy to redesign independently

## Fallback Behavior

Fallback content is defined in [`src/sanity/fallback.ts`](../../src/sanity/fallback.ts).

If Sanity is unavailable for any of these reasons:

- missing env configuration
- missing singleton content
- query failure

the app still renders a complete sample homepage and shows a notice banner on the page.

That fallback path is important for this repo because it keeps frontend work, schema work, and environment setup decoupled. The site remains buildable before the real Sanity project is fully populated.

## Environment Setup

Environment variables are documented in [`.env.example`](../../.env.example).

The integration currently uses three variable groups:

- `PUBLIC_SANITY_*` for Astro/frontend runtime access
- `VITE_SANITY_*` for the standalone Studio browser bundle
- `SANITY_STUDIO_*` as an additional Studio config source

Optional server-only reads can use:

- `SANITY_API_READ_TOKEN`

If no read token is provided, the Sanity client uses the CDN for published reads.

## Current Constraints

- This integration only drives the homepage. There is no Sanity-driven routing or page inventory beyond that yet.
- The public site reads published content only. Draft preview and visual editing are not implemented.
- Local content entry should use `pnpm studio:dev` for now because the embedded Studio path still has a dev-time Vite conflict.
- The fallback sample content is still carrying placeholder hotel copy and imagery until the real Sanity project is populated.

## Files To Know

- [`astro.config.mjs`](../../astro.config.mjs)
- [`sanity.config.ts`](../../sanity.config.ts)
- [`sanity.cli.ts`](../../sanity.cli.ts)
- [`src/pages/index.astro`](../../src/pages/index.astro)
- [`src/sanity/client.ts`](../../src/sanity/client.ts)
- [`src/sanity/load-homepage.ts`](../../src/sanity/load-homepage.ts)
- [`src/sanity/queries.ts`](../../src/sanity/queries.ts)
- [`src/sanity/types.ts`](../../src/sanity/types.ts)
- [`src/sanity/fallback.ts`](../../src/sanity/fallback.ts)
- [`src/components/site/SectionRenderer.astro`](../../src/components/site/SectionRenderer.astro)
