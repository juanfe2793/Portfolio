# Plan: Move Docusaurus from v2/ to root & remove MkDocs

## Context

The Docusaurus project lives in `v2/` while the old MkDocs setup occupies the root. Content migration (Phase 2) is complete. To accelerate development, we're promoting Docusaurus to root and removing all MkDocs artifacts. CI/CD workflows will also be updated to build Docusaurus instead of MkDocs.

## Steps

### Step 1 — Delete MkDocs files and old docs/

Remove these files/directories from root:

- `mkdocs.yml`
- `pyproject.toml`
- `uv.lock`
- `mkdocs.log`
- `Dockerfile` (root — will be replaced by v2's)
- `.dockerignore`
- `docs/` (old MkDocs content, already migrated)
- `generate_migration_data.py`
- `migration-plan/`
- `migration-planning/`

### Step 2 — Move v2/ contents to root

Move all files from `v2/` to root using `git mv`:

- `v2/docusaurus.config.ts` → `docusaurus.config.ts`
- `v2/package.json` → `package.json`
- `v2/package-lock.json` → `package-lock.json`
- `v2/tsconfig.json` → `tsconfig.json`
- `v2/sidebars.ts` → `sidebars.ts`
- `v2/.nvmrc` → `.nvmrc`
- `v2/Dockerfile` → `Dockerfile`
- `v2/docker-compose.yml` → `docker-compose.yml`
- `v2/docs/` → `docs/`
- `v2/blog/` → `blog/`
- `v2/src/` → `src/`
- `v2/static/` → `static/`
- `v2/README.md` — delete (keep root README.md)

Then remove the empty `v2/` directory (skip `node_modules/`, `build/`, `.docusaurus/` — these are gitignored).

### Step 3 — Fix paths and config

**`docusaurus.config.ts`:**
- Line 69: `editUrl` — change `'.../tree/main/v2/'` → `'.../tree/main/'`
- Line 79: same fix for blog `editUrl`

**`package.json`:**
- Change `"name": "v-2"` → `"name": "portfolio"`

### Step 4 — Merge .gitignore files

Replace root `.gitignore` with a merged version:

```
# Node / Docusaurus
node_modules/
/build
.docusaurus
.cache-loader
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment
.env.local
.env.development.local
.env.test.local
.env.production.local

# OS
.DS_Store
tmp*
```

Remove `v2/.gitignore` (already moved contents to root).

### Step 5 — Update CI/CD workflows

**`.github/workflows/ci.yml`** — Replace with Docusaurus deploy:
- Setup Node 20, `npm ci`, `npm run build`
- Deploy `./build` to GitHub Pages (same actions/deploy-pages pattern)
- Keep same trigger (push to main), permissions, concurrency

**`.github/workflows/test-ci.yml`** — Replace with Docusaurus build check:
- Setup Node 20, `npm ci`, `npm run build`, `npm run typecheck`
- Keep same trigger (push to main + PRs)

### Step 6 — Update CLAUDE.md

Rewrite to reflect the new single-project structure:
- Remove all `v2/` path references
- Update build commands (no more `cd v2`)
- Remove MkDocs section
- Update key config files list

### Step 7 — Update .planning/ references

Update `STATE.md`, `ROADMAP.md`, and codebase docs to reflect:
- Phase 2 fully complete
- v2/ no longer exists (paths now at root)
- Phase 4 (CI/CD) is now partially done (workflows updated)

### Step 8 — Reinstall dependencies & verify

```bash
npm install
npm run build
npm run typecheck
```

## Critical files to modify

- `docusaurus.config.ts` — editUrl paths
- `package.json` — name field
- `.gitignore` — merge both files
- `.github/workflows/ci.yml` — full rewrite
- `.github/workflows/test-ci.yml` — full rewrite
- `CLAUDE.md` — remove v2/ references
- `.planning/STATE.md`, `.planning/ROADMAP.md` — update progress

## Verification

1. `npm run build` succeeds with no errors
2. `npm run typecheck` passes
3. `npm start` serves the site locally and pages render correctly
4. `git status` shows clean state after commit
5. No remaining references to `v2/` in config files (grep check)
