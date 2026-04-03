# Phase 2: Content Migration - Context

**Gathered:** 2026-04-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Migrate all MkDocs content (CV, blog posts, technical guides) to Docusaurus so every page renders correctly with no broken links or syntax errors. Success means `npm run build` passes clean and all 11 URL redirects are activated and tested.

Theming, visual polish, and custom React components are Phase 3 scope — Phase 2 produces a functional (not beautiful) Docusaurus site.

</domain>

<decisions>
## Implementation Decisions

### CV Conversion (docs/portfolio/cv.md → v2/docs/portfolio/cv.mdx)
- **D-01:** Functional but simplified layout — lose the MkDocs Material 2-column grid div structure for now; Phase 3 will add it back with proper MDX components.
- **D-02:** Replace Material/FontAwesome icon shortcodes (`:material-file-document:`, `:fontawesome-brands-linkedin:`, etc.) with plain markdown text links: `[LinkedIn](url) | [GitHub](url) | [Email](url)`.
- **D-03:** Convert the single admonition (`!!! success "Key Achievements"`) to Docusaurus syntax: `:::success[Key Achievements]`.
- **D-04:** Target file is `v2/docs/portfolio/cv.mdx` (MDX extension to allow future React component use).

### Blog Setup
- **D-05:** Replace entire `v2/blog/authors.yml` content with Juan Felipe's author entry: full profile with `page: true` to generate `/blog/authors/juanfe`. Include: name, title (Staff Software Engineer), url (LinkedIn), image_url (GitHub avatar `https://github.com/juanfe2793.png`), socials: `{ linkedin: juangomez27, github: juanfe2793 }`.
- **D-06:** MkDocs blog uses `categories:` frontmatter — convert to Docusaurus `tags:` field during migration.
- **D-07:** Blog post `<!-- more -->` truncation markers carry over as-is (Docusaurus uses the same syntax).

### Placeholder Clearance
- **D-08:** Delete ALL Docusaurus scaffold placeholder files upfront before migrating any content. This includes: `v2/blog/2019-05-28-first-blog-post.md`, `v2/blog/2019-05-29-long-blog-post.md`, `v2/blog/2021-08-01-mdx-blog-post.mdx`, `v2/blog/2021-08-26-welcome/`, `v2/docs/intro.md`, `v2/docs/tutorial-basics/`, `v2/docs/tutorial-extras/`. Clean slate before any migration work.

### Guides Organization (docs/guides/*.md → v2/docs/guides/)
- **D-09:** Auto-generated flat sidebar — no custom ordering, no subcategories. Add `v2/docs/guides/_category_.json` with `{ "label": "Guides", "position": 2 }` to control sidebar label and position.
- **D-10:** Guide files are nearly all plain markdown with code blocks. Zero MkDocs admonitions found in guides. Migration is effectively a file copy with link/path adjustments.

### Static Assets
- **D-11:** Copy all assets from `docs/assets/` to `v2/static/` and update any references in migrated content.

### Redirect Activation
- **D-12:** Activate all 11 redirects in `v2/docusaurus.config.ts` after all content is migrated (final plan). Test each entry from `migration-planning/url_mapping.csv`.

### Claude's Discretion
- Exact frontmatter structure for migrated docs (Docusaurus accepts minimal frontmatter — use title at minimum)
- Whether to use a conversion script or manual file-by-file migration (guides are so clean that scripting may be overkill)
- sidebars.ts configuration (auto-generation should work without changes)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Content Sources (MkDocs)
- `docs/portfolio/cv.md` — CV source with Material-specific syntax to convert
- `docs/blog/posts/welcome.md` — Only blog post to migrate
- `docs/guides/*.md` — 9 guide files (aws_cli, bash_profile, carvel, docker_containerd, git, helm, index, kubectl, linux, saltstack)
- `docs/blog/index.md` — Blog index page

### Migration Mapping
- `migration-planning/url_mapping.csv` — Authoritative old→new URL map for all 11 redirects (source_path, old_url, new_url)
- `migration-planning/content_inventory.csv` — Full content inventory
- `migration-planning/static_assets.csv` — Static asset inventory

### Target Configuration
- `v2/docusaurus.config.ts` — Redirect plugin config (11 entries commented out, to be activated in Plan 2.4)
- `v2/sidebars.ts` — Sidebar config (currently auto-generates from docs/ directory)
- `v2/blog/authors.yml` — Replace placeholder content with Juan's author entry
- `v2/blog/tags.yml` — Existing tags file (keep, may need entries added)

### Requirements
- `.planning/REQUIREMENTS.md` — CONT-01 through CONT-06 (content migration requirements)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `v2/blog/authors.yml`: Exists but has placeholder Docusaurus team entries — full replacement needed
- `v2/blog/tags.yml`: Exists — may need tag entries matching the `categories` values in blog posts
- `v2/static/img/`: Has Docusaurus default images — fine for Phase 2, Phase 3 replaces with brand assets

### Established Patterns
- Blog posts use `<!-- more -->` truncation markers — same syntax works in Docusaurus, no conversion needed
- Docusaurus `onBrokenLinks: 'throw'` is set in config — broken links will fail the build, so clean migration is enforced
- `truncateMarker: /<!--\s*(truncate)\s*-->/` is configured — `<!-- more -->` won't work as-is (MkDocs), need `<!-- truncate -->` instead

### Integration Points
- `v2/docusaurus.config.ts` redirect plugin: all 11 entries are commented out — activate by uncommenting after content exists
- `v2/sidebars.ts`: currently set to `autoGenerated: true` for docs — guides will appear automatically once files are in `v2/docs/guides/`
- `v2/docs/` and `v2/blog/` are the migration targets — placeholder content must be cleared first

</code_context>

<specifics>
## Specific Ideas

- CV simplified layout reference (from discussion): `[LinkedIn](url) | [GitHub](url) | [Email](url)` inline links replacing icon shortcodes
- `:::success[Key Achievements]` is the exact Docusaurus admonition syntax for the CV's `!!! success "Key Achievements"` block
- Author profile: `image_url: https://github.com/juanfe2793.png` (GitHub avatar — no separate upload needed)
- Note on truncation: MkDocs blog uses `<!-- more -->`, Docusaurus expects `<!-- truncate -->` — this needs conversion in `welcome.md`

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within Phase 2 scope.

</deferred>

---

*Phase: 02-content-migration*
*Context gathered: 2026-04-03*
