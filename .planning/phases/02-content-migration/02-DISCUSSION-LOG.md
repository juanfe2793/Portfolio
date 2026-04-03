# Phase 2: Content Migration - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-03
**Phase:** 02-content-migration
**Areas discussed:** CV conversion approach, Blog author profile depth, Guides sidebar organization

---

## CV Conversion Approach

| Option | Description | Selected |
|--------|-------------|----------|
| Functional but simplified | Lose 2-column grid, plain markdown links for social icons, :::success admonition | ✓ |
| Faithful layout conversion | MDX inline HTML to preserve 2-column layout, emoji/text icon substitutes | |

**User's choice:** Functional but simplified
**Notes:** Phase 3 will add back the fancy layout with proper MDX components. For Phase 2, readable and builds clean is the goal.

---

## Blog Author Profile Depth

| Option | Description | Selected |
|--------|-------------|----------|
| Full profile with author page | name, title, url, image_url, page: true, socials (linkedin, github) | ✓ |
| Minimal — name + image only | Just name, title, image_url. No author page, no socials | |

**User's choice:** Full profile with author page
**Notes:** Matches professional brand goal.

---

## Blog Placeholder Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Delete all placeholders upfront | Clear all Docusaurus tutorial skeleton before migrating | ✓ |
| Leave them, replace as migrated | Only remove a placeholder when migrating its replacement | |

**User's choice:** Delete all placeholders upfront
**Notes:** Clean slate approach — no risk of placeholder content appearing in intermediate builds.

---

## Guides Sidebar Organization

| Option | Description | Selected |
|--------|-------------|----------|
| Auto-generated flat list | _category_.json with "Guides" label, auto sidebar order | ✓ |
| Custom ordering in sidebars.ts | Explicit list in a logical order | |
| Grouped by technology area | Subcategories: Container, Infrastructure, Shell | |

**User's choice:** Auto-generated flat list
**Notes:** Zero-maintenance approach; all 9 guide files are plain markdown, no MDX needed.

---

## Claude's Discretion

- Exact frontmatter structure for migrated docs
- Whether to use a conversion script or manual file-by-file migration
- sidebars.ts configuration details

## Deferred Ideas

None.
