# Codebase Structure

**Analysis Date:** 2026-03-29

## Directory Layout

```
Portfolio/
├── docs/                       # MkDocs content (current production)
│   ├── index.md               # Homepage
│   ├── portfolio/             # Professional profile content
│   │   └── cv.md              # CV/Resume
│   ├── guides/                # Technical reference guides
│   │   ├── bash_profile.md
│   │   ├── carvel_commands.md
│   │   ├── docker_containerd_commands.md
│   │   ├── git_commands.md
│   │   ├── helm_commands.md
│   │   ├── kubectl_commands.md
│   │   └── linux_commands.md
│   ├── blog/                  # Blog section (MkDocs only)
│   │   ├── index.md
│   │   └── posts/             # Blog post files
│   ├── assets/                # Images, CSS
│   │   └── css/
│   │       └── extra.css      # Custom styling
│   └── statistics.py          # Utility script
│
├── v2/                        # Docusaurus v3 project (migration target)
│   ├── src/                   # TypeScript/React source
│   │   ├── pages/             # Page components
│   │   │   └── index.tsx      # Homepage component
│   │   ├── components/        # Reusable React components
│   │   │   └── HomepageFeatures/
│   │   │       ├── index.tsx
│   │   │       └── styles.module.css
│   │   └── css/
│   │       └── custom.css     # Custom theme CSS
│   ├── docs/                  # Content (empty, awaiting migration)
│   │   ├── intro.md           # Placeholder intro
│   │   ├── tutorial-basics/   # Placeholder tutorial files
│   │   └── tutorial-extras/
│   ├── blog/                  # Blog posts (empty, awaiting migration)
│   │   ├── authors.yml        # Blog author metadata
│   │   ├── tags.yml           # Blog tag definitions
│   │   └── [sample posts]     # Placeholder blog files
│   ├── static/                # Static assets (images, favicons)
│   │   └── img/
│   ├── docusaurus.config.ts   # Docusaurus main config
│   ├── sidebars.ts            # Navigation sidebar config
│   ├── tsconfig.json          # TypeScript config
│   ├── package.json           # Node dependencies
│   ├── package-lock.json      # Dependency lockfile
│   └── .nvmrc                 # Node version specification
│
├── migration-planning/        # Migration documentation
│   ├── content_inventory.csv  # Catalog of all MkDocs content
│   ├── url_mapping.csv        # URL path mapping between systems
│   └── static_assets.csv      # Asset inventory
│
├── utils/                     # Utility scripts (unrelated to site)
│   └── aws-scripts/           # AWS infrastructure helpers
│       ├── describe/          # AWS resource discovery scripts
│       ├── teardown/          # AWS cleanup scripts
│       └── generate_links.py
│
├── .github/                   # GitHub Actions CI/CD
│   └── workflows/
│       ├── ci.yml             # Deploy MkDocs to GitHub Pages
│       └── test-ci.yml        # Verify MkDocs build on PR
│
├── .claude/                   # Claude Code configuration
│   ├── settings.json
│   ├── settings.local.json
│   ├── get-shit-done/         # GSD agent workflows
│   └── commands/
│       └── gsd/
│
├── .planning/                 # Project planning documents
│   └── codebase/              # Architecture and structure analysis
│
├── mkdocs.yml                 # MkDocs configuration (root)
├── Dockerfile                 # Docker build for MkDocs
├── pyproject.toml             # Python dependencies (uv)
├── uv.lock                    # Python lockfile
├── CLAUDE.md                  # Developer guidance for this repo
├── README.md                  # Project overview
├── LICENSE                    # MIT for code
├── LICENSE-CC-BY-4.0          # CC BY 4.0 for content
└── .gitignore
```

## Directory Purposes

**docs/**
- Purpose: All content for MkDocs (current production system)
- Contains: Markdown files for homepage, portfolio/CV, technical guides, blog posts
- Key files: `index.md` (homepage), `portfolio/cv.md` (resume), `guides/*.md` (command references)
- Note: Blog plugin configured to use `blog/` subdirectory; content separated into `blog/posts/`

**v2/**
- Purpose: Docusaurus v3 project (in-progress migration target)
- Contains: TypeScript/React components, configuration, build artifacts
- Key directories: `src/` (React source), `docs/` (documentation), `blog/` (blog posts), `static/` (assets)
- Status: Scaffold created; content migration awaiting

**v2/src/pages/**
- Purpose: Route-based page components (becomes top-level URLs)
- Contains: React TSX files for pages like homepage
- Pattern: `index.tsx` renders at site root `/`

**v2/src/components/**
- Purpose: Reusable React UI components
- Contains: Presentational components with TypeScript types
- Pattern: Folder per component with `index.tsx` + `styles.module.css`

**v2/docs/**
- Purpose: Documentation content for Docusaurus
- Contains: Markdown files for guides, tutorials
- Current state: Placeholder Docusaurus template content; awaiting migration from `docs/guides/`

**v2/blog/**
- Purpose: Blog posts for Docusaurus blog plugin
- Contains: Markdown files, YAML metadata (authors, tags)
- Current state: Placeholder files; awaiting migration from `docs/blog/posts/`

**migration-planning/**
- Purpose: Tracks what content exists and where it should map in new system
- Contains: CSV files documenting inventory and URL mappings
- Key files: `content_inventory.csv` (all content pieces), `url_mapping.csv` (MkDocs path → Docusaurus path)
- Used by: Reference during manual migration tasks

**utils/aws-scripts/**
- Purpose: Standalone infrastructure helper scripts
- Contains: Python scripts for AWS resource discovery and cleanup
- Note: Excluded from site build via `mkdocs.yml` exclude plugin; unrelated to portfolio site itself

**.github/workflows/**
- Purpose: CI/CD automation for GitHub Pages deployment
- Contains: GitHub Actions workflow definitions
- Key files: `ci.yml` (auto-deploy on push to main), `test-ci.yml` (validate build on PR)

## Key File Locations

**Entry Points:**
- `mkdocs.yml`: MkDocs main configuration (root directory)
- `v2/docusaurus.config.ts`: Docusaurus main configuration
- `.github/workflows/ci.yml`: MkDocs deployment pipeline
- `docs/index.md`: MkDocs homepage content
- `v2/src/pages/index.tsx`: Docusaurus homepage component

**Configuration:**
- `pyproject.toml`: Python dependencies and project metadata
- `v2/package.json`: Node.js dependencies and build scripts
- `v2/tsconfig.json`: TypeScript compiler configuration
- `Dockerfile`: Docker image definition for MkDocs

**Core Logic:**
- `v2/sidebars.ts`: Docusaurus sidebar navigation auto-generation
- `v2/src/components/HomepageFeatures/index.tsx`: Feature card components (Docusaurus)
- `docs/guides/*.md`: Technical reference guides (MkDocs)

**Styling:**
- `docs/assets/css/extra.css`: MkDocs custom CSS
- `v2/src/css/custom.css`: Docusaurus custom CSS
- `v2/src/components/HomepageFeatures/styles.module.css`: Component-scoped styles (CSS Modules)

**Testing/CI:**
- `.github/workflows/ci.yml`: MkDocs build validation and deployment
- `.github/workflows/test-ci.yml`: PR validation

**Development:**
- `CLAUDE.md`: Project guidance and commands (this repository)
- `README.md`: User-facing project overview

## Naming Conventions

**Files:**
- Content: `kebab-case.md` (e.g., `bash_profile.md`, `docker_containerd_commands.md`)
- Components: `PascalCase/index.tsx` (e.g., `HomepageFeatures/index.tsx`)
- Styles: `kebab-case.module.css` or `kebab-case.css` (e.g., `custom.css`, `styles.module.css`)
- Config: `kebab-case.yml` or `.config.ts` (e.g., `docusaurus.config.ts`, `mkdocs.yml`)

**Directories:**
- Feature/section folders: `kebab-case` or `snake_case` (e.g., `portfolio/`, `aws-scripts/`, `tutorial-basics/`)
- Component folders: `PascalCase` (e.g., `HomepageFeatures/`)
- Special folders: prefixed with dot for hidden/config (e.g., `.github/`, `.claude/`)

**Imports:**
- Docusaurus: Uses path aliases via `@site/` (points to project root), `@theme/` (theme components)
- React: Standard ES6 `import` syntax with relative paths or aliases

## Where to Add New Code

**New Feature (MkDocs - current production):**
- Primary content: `docs/guides/` or `docs/portfolio/` depending on type
- Blog posts: `docs/blog/posts/` with YAML frontmatter (date, title, excerpt)
- Tests: Not applicable (static site, no executable code)

**New Feature (Docusaurus - migration):**
- Documentation pages: `v2/docs/[section]/page.md` with auto-sidebar registration via `sidebars.ts`
- Blog posts: `v2/blog/YYYY-MM-DD-slug.md` or `v2/blog/YYYY-MM-DD-slug/index.mdx` with `authors.yml` reference
- Page components: `v2/src/pages/page-name.tsx` (becomes `/page-name/` URL)
- Reusable components: `v2/src/components/ComponentName/index.tsx` with `v2/src/components/ComponentName/styles.module.css`
- Custom CSS: Add to `v2/src/css/custom.css` or component-scoped `*.module.css`

**Utilities:**
- Infrastructure scripts: `utils/aws-scripts/[category]/script.py` (excluded from site build)
- Site-related helpers: Consider whether to place in `utils/` or inline in config

**Utilities & Shared Code:**
- Python helpers: `generate_migration_data.py` at root for content migration tooling
- TypeScript helpers: Would go in `v2/src/` (currently only has React components)

## Special Directories

**node_modules/ (v2/):**
- Purpose: NPM package cache
- Generated: Yes (created by `npm install`)
- Committed: No (in `.gitignore`)

**build/ (v2/):**
- Purpose: Production build output for Docusaurus
- Generated: Yes (created by `npm run build`)
- Committed: No (in `.gitignore`)

**.docusaurus/ (v2/):**
- Purpose: Docusaurus cache directory for incremental builds
- Generated: Yes (created automatically by Docusaurus)
- Committed: No (in `.gitignore`)

**site/ (root):**
- Purpose: MkDocs production build output
- Generated: Yes (created by `mkdocs build`)
- Committed: No (in `.gitignore`)

**.claude/:**
- Purpose: Claude Code specific configurations and workflows
- Generated: Partially (settings.json managed by user, GSD workflows added by agent)
- Committed: Yes (part of repo)

**.planning/:**
- Purpose: Project planning and analysis documents
- Generated: Yes (created by GSD agents during mapping and planning phases)
- Committed: Yes (tracks project planning history)

## Content Organization Pattern

**MkDocs structure (docs/):**
```
docs/
├── index.md                          # Root homepage
├── portfolio/cv.md                   # Portfolio subsection
├── guides/                           # Multiple guide files
│   ├── index.md                      # Guides overview
│   ├── bash_profile.md
│   ├── docker_containerd_commands.md
│   └── ... (other guides)
└── blog/                             # Blog section
    ├── index.md
    └── posts/                        # Individual blog post files
```

**Navigation (mkdocs.yml):**
- Explicit nav hierarchy in `mkdocs.yml` controls sidebar menu
- Blog plugin auto-generates blog section and indexes posts

**Docusaurus structure (v2/):**
```
v2/
├── docs/                             # Will mirror guides/portfolio structure
│   ├── intro.md                      # (Currently placeholder)
│   └── tutorial-*/                   # (To be replaced with content)
└── blog/                             # Blog posts
    ├── authors.yml                   # Author metadata
    ├── tags.yml                      # Tag definitions
    └── YYYY-MM-DD-slug.md            # Post files
```

**Navigation (v2/sidebars.ts):**
- Currently auto-generates from directory structure (`autogenerated`)
- Can be switched to manual definition for precise control

---

*Structure analysis: 2026-03-29*
