# Awtan Sukhumvit Hotel

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
