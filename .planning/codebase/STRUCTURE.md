# Codebase Structure

**Analysis Date:** 2026-03-29

## Directory Layout

```
Portfolio/
├── .github/                    # GitHub configuration
│   └── workflows/              # CI/CD workflows
│       ├── ci.yml              # MkDocs deployment to GitHub Pages
│       └── test-ci.yml         # MkDocs build verification
├── .planning/                  # GSD planning documents
│   └── codebase/               # Codebase analysis outputs
├── docs/                       # MkDocs content (current production)
│   ├── index.md                # Home page
│   ├── portfolio/              # Portfolio section
│   ├── guides/                 # Technical guides collection
│   ├── blog/                   # Blog posts
│   │   └── posts/              # Individual blog posts
│   ├── assets/                 # Media and static assets
│   │   └── css/                # Custom CSS
│   └── statistics.py           # Content statistics utility
├── v2/                         # Docusaurus v3 project (migration target)
│   ├── src/                    # React source code
│   │   ├── pages/              # Page components
│   │   │   ├── index.tsx        # Homepage
│   │   │   ├── index.module.css # Homepage styles
│   │   │   └── markdown-page.md # Markdown page template
│   │   ├── components/          # Reusable React components
│   │   │   └── HomepageFeatures/ # Homepage features section
│   │   │       ├── index.tsx     # Features component
│   │   │       └── styles.module.css
│   │   └── css/                # Global styles
│   │       └── custom.css       # Custom CSS overrides
│   ├── docs/                   # Documentation content (awaiting migration)
│   │   ├── tutorial-basics/     # Placeholder tutorial files
│   │   └── tutorial-extras/     # Additional tutorial files
│   ├── blog/                   # Blog content (awaiting migration)
│   │   └── 2021-08-26-welcome/ # Placeholder blog post
│   ├── static/                 # Static assets (images, favicon)
│   │   └── img/                # Image assets
│   ├── build/                  # Production build output (generated)
│   ├── .docusaurus/            # Docusaurus cache (generated)
│   ├── docusaurus.config.ts    # Docusaurus configuration
│   ├── sidebars.ts             # Documentation sidebar structure
│   ├── tsconfig.json           # TypeScript configuration
│   ├── package.json            # Node dependencies and scripts
│   ├── package-lock.json       # Dependency lock file
│   ├── README.md               # v2 project documentation
│   ├── .nvmrc                  # Node version specification
│   └── .gitignore              # Git ignore for v2
├── migration-planning/         # Migration tracking data
│   ├── content_inventory.csv   # Content mapping from MkDocs to Docusaurus
│   ├── url_mapping.csv         # URL path mappings
│   └── static_assets.csv       # Static asset inventory
├── migration-plan/             # Migration analysis and planning
│   └── AUDIT_MKDOCS_DEPENDENCIES.md # MkDocs dependency audit
├── utils/                      # Utility scripts
│   └── aws-scripts/            # AWS helper scripts (unrelated to site)
├── mkdocs.yml                  # MkDocs configuration (current production)
├── pyproject.toml              # Python project configuration and dependencies
├── uv.lock                     # Python dependency lock file
├── Dockerfile                  # Docker image for MkDocs (optional)
├── .dockerignore                # Docker ignore patterns
├── CLAUDE.md                   # Claude Code instructions for project
├── README.md                   # Project root documentation
├── LICENSE                     # MIT license
├── LICENSE-CC-BY-4.0           # CC BY 4.0 license for content
├── generate_migration_data.py  # Migration data generation script
├── mkdocs.log                  # MkDocs build log
└── .gitignore                  # Root git ignore file
```

## Directory Purposes

**`.github/workflows/`:**
- Purpose: GitHub Actions CI/CD automation
- Contains: YAML workflow definitions
- Key files: `ci.yml` (MkDocs build & deploy), `test-ci.yml` (PR validation)

**`docs/`:**
- Purpose: MkDocs content source (current production)
- Contains: Markdown files organized by content type
- Key files: `index.md` (homepage), portfolio CV, technical guides, blog posts

**`v2/src/pages/`:**
- Purpose: Docusaurus page components (TSX/React)
- Contains: Top-level page components and module CSS
- Key files: `index.tsx` (homepage), `index.module.css` (styles)

**`v2/src/components/`:**
- Purpose: Reusable React components for Docusaurus
- Contains: Feature components with encapsulated styles
- Key files: `HomepageFeatures/` component directory

**`v2/src/css/`:**
- Purpose: Global stylesheet overrides
- Contains: CSS that applies across all pages
- Key files: `custom.css` for theme customization

**`v2/docs/`:**
- Purpose: Docusaurus documentation content (migration target, currently scaffolding)
- Contains: Markdown files and tutorial placeholders
- Key files: Empty directories awaiting migrated content

**`v2/blog/`:**
- Purpose: Docusaurus blog content (migration target, currently scaffolding)
- Contains: Blog post directories with metadata
- Key files: Placeholder blog post structure

**`v2/static/`:**
- Purpose: Static assets served directly (images, icons, etc.)
- Contains: Favicon, logo, and other unchanging assets
- Key files: `img/` subdirectory for image files

**`migration-planning/`:**
- Purpose: Track content migration from MkDocs to Docusaurus
- Contains: CSV files mapping content and structure
- Key files: `content_inventory.csv`, `url_mapping.csv`, `static_assets.csv`

**`migration-plan/`:**
- Purpose: Document migration analysis and decisions
- Contains: Audit reports and planning documentation
- Key files: `AUDIT_MKDOCS_DEPENDENCIES.md`

## Key File Locations

**Entry Points:**
- `mkdocs.yml`: MkDocs configuration and navigation structure
- `/v2/docusaurus.config.ts`: Docusaurus configuration and theme setup
- `/v2/src/pages/index.tsx`: Homepage component (Docusaurus)
- `.github/workflows/ci.yml`: Automated deployment workflow

**Configuration:**
- `pyproject.toml`: Python dependencies and project metadata
- `/v2/package.json`: Node dependencies and build scripts
- `/v2/tsconfig.json`: TypeScript compiler configuration
- `/v2/sidebars.ts`: Docusaurus documentation sidebar (auto-generated from `/v2/docs/`)

**Core Logic:**
- `docs/`: All content for current production site
- `/v2/src/`: React components for future Docusaurus site
- `generate_migration_data.py`: Script to generate migration tracking CSVs

**Testing:**
- `.github/workflows/test-ci.yml`: Validates MkDocs build on PRs
- `/v2/package.json` - `typecheck` script: TypeScript validation

## Naming Conventions

**Files:**
- Markdown files: kebab-case (e.g., `bash_profile.md`, `docker_containerd_commands.md`)
- React components: PascalCase (e.g., `HomepageFeatures/index.tsx`)
- CSS modules: kebab-case with `.module.css` suffix (e.g., `index.module.css`)
- Configuration files: lowercase with file extension (e.g., `mkdocs.yml`, `docusaurus.config.ts`)

**Directories:**
- Content directories: kebab-case (e.g., `blog/posts/`, `tutorial-basics/`)
- Component directories: PascalCase (e.g., `HomepageFeatures/`)
- Feature directories: lowercase (e.g., `docs/`, `guides/`, `portfolio/`)

## Where to Add New Code

**New MkDocs Content:**
- Blog posts: Add `.md` file to `/docs/blog/posts/`
- Technical guides: Add `.md` file to `/docs/guides/`
- Portfolio content: Add `.md` file to `/docs/portfolio/`
- Update navigation in `mkdocs.yml` nav section

**New Docusaurus Content (during migration):**
- Documentation files: Add `.md` files to `/v2/docs/` (sidebar auto-generates)
- Blog posts: Add directory to `/v2/blog/` with `index.md` and metadata
- Update `/v2/sidebars.ts` if manual organization needed

**New React Components:**
- Page components: Add to `/v2/src/pages/` directory
- Reusable components: Add subdirectory to `/v2/src/components/`
- Include `.module.css` for component-scoped styles
- Example structure: `/v2/src/components/MyComponent/index.tsx` with `/v2/src/components/MyComponent/styles.module.css`

**New Utilities/Scripts:**
- Python utilities: Add to root directory (e.g., `generate_migration_data.py`)
- AWS scripts: Add to `/utils/aws-scripts/`
- Build/config scripts: Add to relevant system root (`/` for MkDocs, `/v2/` for Docusaurus)

**Migration Planning:**
- Content mapping: Update CSV files in `/migration-planning/`
- Audit findings: Add to `/migration-plan/AUDIT_MKDOCS_DEPENDENCIES.md`

## Special Directories

**`v2/.docusaurus/`:**
- Purpose: Docusaurus build cache
- Generated: Yes
- Committed: No (in `.gitignore`)
- Use: Speeds up incremental builds, safe to delete

**`v2/build/`:**
- Purpose: Production build output from Docusaurus
- Generated: Yes (`npm run build`)
- Committed: No (in `.gitignore`)
- Use: Static files ready for deployment

**`node_modules/`:**
- Purpose: Installed Node dependencies
- Generated: Yes (`npm install`)
- Committed: No (in `.gitignore`)
- Use: JavaScript and TypeScript package dependencies

**`.planning/codebase/`:**
- Purpose: Codebase analysis documentation (GSD output)
- Generated: Yes (by mapping agent)
- Committed: Yes (version control)
- Use: Reference for code organization and conventions

## TypeScript Configuration

**`/v2/tsconfig.json`:**
- Extends Docusaurus standard config (`@docusaurus/tsconfig`)
- Configures `baseUrl: "."` for path resolution
- Excludes build directories (`.docusaurus`, `build`)
- Used for editor type checking only (not included in Docusaurus build)

## Build Outputs

**MkDocs:**
- Output directory: `./site/` (generated by `mkdocs build`)
- Deployed to: GitHub Pages via `.github/workflows/ci.yml`

**Docusaurus:**
- Output directory: `./v2/build/` (generated by `npm run build`)
- Ready for: Manual deployment or future migration to production

---

*Structure analysis: 2026-03-29*
