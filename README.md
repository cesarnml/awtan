# Awtan Sukhumvit Hotel

## Sanity CMS

This branch embeds Sanity Studio at `/studio` and fetches published homepage content from Sanity at build time.

### Local setup

1. Copy [`.env.example`](/Users/cesar/code/awtan-sanity-integration/.env.example) to `.env` if you do not already have the Sanity variables.
2. Set:
   - Astro/frontend:
     - `PUBLIC_SANITY_PROJECT_ID`
     - `PUBLIC_SANITY_DATASET`
     - `PUBLIC_SANITY_API_VERSION`
   - Standalone Sanity Studio browser bundle:
     - `VITE_SANITY_PROJECT_ID`
     - `VITE_SANITY_DATASET`
     - `VITE_SANITY_API_VERSION`
   - Sanity Studio:
     - `SANITY_STUDIO_PROJECT_ID`
     - `SANITY_STUDIO_DATASET`
     - `SANITY_STUDIO_API_VERSION`
   - `SANITY_API_READ_TOKEN` only if you later need authenticated reads
3. Run `pnpm install`.
4. Start `pnpm dev`.
5. Start `pnpm studio:dev` for the standalone Studio during local content entry.
6. Open `http://127.0.0.1:3333` to create the singleton `Homepage` and `Site settings` documents.

If Sanity is not configured yet, the homepage renders local sample content so the app remains buildable while the schema and UI are being developed.

### Local Studio note

The embedded `/studio` route is configured in the app, but the current local dev stack still hits a Vite transform conflict when Studio runs inside the Astro dev server. The standalone Studio command avoids that conflict and should be used for local content modeling and placeholder uploads for now.

## Git Worktrees For Codex

Use one worktree per feature so each Codex session gets its own branch and directory.

### Create a worktree

```sh
./scripts/worktree.sh add hero-copy
```

That creates:

- branch `codex/hero-copy`
- directory `../awtan-hero-copy`

Then start working there:

```sh
cd ../awtan-hero-copy
pnpm install
pnpm dev
```

### Useful commands

```sh
./scripts/worktree.sh list
./scripts/worktree.sh path hero-copy
./scripts/worktree.sh remove hero-copy
```

If you need a different base branch:

```sh
./scripts/worktree.sh add checkout-redesign main
```

### Recommended workflow

1. Keep the main checkout on `main`.
2. Create one worktree per task or feature.
3. Run a separate Codex session in each worktree directory.
4. Commit and merge branches normally.
5. Remove the worktree after merge.

### Environment files and dependencies

- Each worktree has its own files and its own `node_modules`.
- Run `pnpm install` inside each worktree before developing or building.
- The helper copies the root `.env` into a new worktree if the new worktree does not already have one.
- If a worktree needs different secrets or config, edit that worktree's `.env` locally.

### Parallel Codex example

```sh
./scripts/worktree.sh add landing-refresh
./scripts/worktree.sh add billing-flow
```

Then open a Codex session in each of these directories:

- `../awtan-landing-refresh`
- `../awtan-billing-flow`
