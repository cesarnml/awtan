#!/usr/bin/env bash

set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  scripts/worktree.sh add <name> [base]
  scripts/worktree.sh remove <name-or-path> [--force]
  scripts/worktree.sh list
  scripts/worktree.sh path <name>

Examples:
  scripts/worktree.sh add hero-copy
  scripts/worktree.sh add billing-flow main
  scripts/worktree.sh remove hero-copy
  scripts/worktree.sh list

Notes:
  - New branches are created as codex/<name>
  - New worktrees are created next to the repo as ../awtan-<name>
  - If a root .env exists and the new worktree does not have one, it is copied over
EOF
}

die() {
  echo "Error: $*" >&2
  exit 1
}

require_git_repo() {
  git rev-parse --show-toplevel >/dev/null 2>&1 || die "run this from inside the git repository"
}

repo_root() {
  git rev-parse --show-toplevel
}

repo_name() {
  basename "$(repo_root)"
}

sanitize_name() {
  printf '%s' "$1" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9._-]+/-/g; s/^-+//; s/-+$//'
}

worktree_path_for_name() {
  local root parent repo safe_name
  root="$(repo_root)"
  parent="$(dirname "$root")"
  repo="$(repo_name)"
  safe_name="$(sanitize_name "$1")"
  printf '%s/%s-%s' "$parent" "$repo" "$safe_name"
}

copy_env_if_needed() {
  local root target
  root="$(repo_root)"
  target="$1"

  if [[ -f "$root/.env" && ! -f "$target/.env" ]]; then
    cp "$root/.env" "$target/.env"
    echo "Copied .env into $target"
  fi
}

cmd_add() {
  local raw_name safe_name base path branch
  raw_name="${1:-}"
  base="${2:-main}"

  [[ -n "$raw_name" ]] || die "missing worktree name"

  safe_name="$(sanitize_name "$raw_name")"
  [[ -n "$safe_name" ]] || die "worktree name became empty after sanitizing"

  path="$(worktree_path_for_name "$safe_name")"
  branch="codex/$safe_name"

  [[ ! -e "$path" ]] || die "path already exists: $path"
  git show-ref --verify --quiet "refs/heads/$branch" && die "branch already exists: $branch"

  git worktree add -b "$branch" "$path" "$base"
  copy_env_if_needed "$path"

  cat <<EOF
Created worktree:
  path:   $path
  branch: $branch

Next steps:
  cd $path
  pnpm install
  pnpm dev
EOF
}

resolve_remove_target() {
  local input path
  input="${1:-}"
  [[ -n "$input" ]] || die "missing worktree name or path"

  if [[ -d "$input" ]]; then
    printf '%s' "$input"
    return
  fi

  path="$(worktree_path_for_name "$input")"
  [[ -d "$path" ]] || die "worktree not found: $input"
  printf '%s' "$path"
}

cmd_remove() {
  local input force_flag path
  input="${1:-}"
  force_flag="${2:-}"
  path="$(resolve_remove_target "$input")"

  if [[ "$force_flag" == "--force" ]]; then
    git worktree remove --force "$path"
  else
    git -C "$path" diff --quiet || die "worktree has unstaged changes: $path"
    git -C "$path" diff --cached --quiet || die "worktree has staged changes: $path"
    git worktree remove "$path"
  fi

  git worktree prune
  echo "Removed worktree: $path"
}

cmd_list() {
  git worktree list
}

cmd_path() {
  local name
  name="${1:-}"
  [[ -n "$name" ]] || die "missing worktree name"
  worktree_path_for_name "$name"
}

main() {
  local command
  require_git_repo
  command="${1:-}"

  case "$command" in
    add)
      shift
      cmd_add "${1:-}" "${2:-}"
      ;;
    remove)
      shift
      cmd_remove "${1:-}" "${2:-}"
      ;;
    list)
      cmd_list
      ;;
    path)
      shift
      cmd_path "${1:-}"
      ;;
    ""|-h|--help|help)
      usage
      ;;
    *)
      die "unknown command: $command"
      ;;
  esac
}

main "$@"
