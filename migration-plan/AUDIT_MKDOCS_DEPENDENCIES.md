# MkDocs Dependencies & Configuration Audit

This report provides a comprehensive audit of the current MkDocs setup, including plugins, extensions, theme configurations, and dependencies. It is intended to guide the migration from MkDocs to Docusaurus by identifying what features need equivalents, custom solutions, or migration strategies.

## Summary Statistics

* **Total Plugins:** 3
* **Total Markdown Extensions:** 14
* **Total Project Dependencies:** 4
* **Deprecated/Unmaintained Packages:** 1 (`mkdocs-exclude` is an older plugin; much of its functionality is now natively supported by MkDocs via `exclude_docs` or standard `.gitignore` behavior. This should be easily replaced by standard Docusaurus exclude rules).

---

## Project Dependencies (from `pyproject.toml`)

These are the explicit Python dependencies installed via `uv`.

| Dependency | Version | Description |
| :--- | :--- | :--- |
| `mkdocs-material` | `>=9.7.2` | The primary theme and framework used for the site. Bundles the blog plugin, search, and integrates heavily with `pymdown-extensions`. |
| `mkdocs-exclude` | `>=1.0.2` | Plugin to exclude specific files or directories from being built. **(Flagged as potentially unmaintained)**. |
| `playwright` | `>=1.57.0` | Browser automation library, likely used for local visual frontend verification and screenshots. |
| `ghp-import` | `>=2.1.0` | Utility for deploying the built site to GitHub Pages. |

*(Note: `pymdown-extensions` is an implicit dependency bundled with `mkdocs-material` that provides the majority of the Markdown extensions used.)*

---

## Plugins

Configured in `mkdocs.yml` under the `plugins` section.

| Plugin | Source | Description & Configuration |
| :--- | :--- | :--- |
| `search` | MkDocs Native | Provides site-wide search capabilities. |
| `blog` | Material for MkDocs | Adds blog functionality. <br>**Config:** `blog_dir: blog`, `post_excerpt: required` |
| `exclude` | `mkdocs-exclude` | Excludes files from the build output. <br>**Config:** Glob excludes `"utils/aws-scripts/**"` |

---

## Markdown Extensions

Configured in `mkdocs.yml` under the `markdown_extensions` section. These extensions dictate the Markdown syntax available to content authors.

| Extension | Category | Description & Configuration |
| :--- | :--- | :--- |
| `admonition` | Standard MkDocs | Supports callouts and warning blocks (e.g., `!!! note`). |
| `abbr` | Standard MkDocs | Supports abbreviations in text. |
| `attr_list` | Standard MkDocs | Allows adding HTML attributes to Markdown elements (e.g., `{: .class}`). Crucial for custom layouts like grids. |
| `def_list` | Standard MkDocs | Supports definition lists. |
| `footnotes` | Standard MkDocs | Supports footnotes. |
| `md_in_html` | Standard MkDocs | Allows Markdown parsing inside raw HTML blocks. Crucial for custom `<div class="grid" markdown>` layouts. |
| `pymdownx.details` | Pymdown | Collapsible blocks/admonitions (`??? note`). |
| `pymdownx.superfences` | Pymdown | Nested code blocks, essential for formatting code inside lists or admonitions. |
| `pymdownx.tabbed` | Pymdown | Tabbed content blocks (`=== "Tab"`). <br>**Config:** `alternate_style: true` |
| `pymdownx.emoji` | Pymdown | Renders emoji codes (e.g., `:smile:`). <br>**Config:** `emoji_index: twemoji`, `emoji_generator: to_svg` |
| `pymdownx.highlight` | Pymdown | Syntax highlighting for code blocks. <br>**Config:** `anchor_linenums: true`, `line_spans: __span`, `pygments_lang_class: true` |
| `pymdownx.inlinehilite` | Pymdown | Inline code syntax highlighting. |
| `pymdownx.snippets` | Pymdown | Allows including external files or snippets into Markdown. |
| `pymdownx.tasklist` | Pymdown | Checkbox lists. <br>**Config:** `custom_checkbox: true` |

---

## Theme Information

The site utilizes the **Material for MkDocs** theme with heavy feature enablement.

* **Theme Name:** `material`
* **Fonts:**
  * Text: `Inter`
  * Code: `JetBrains Mono`
* **Color Palette:**
  * Uses a dual preferred-color-scheme setup (Light/Dark toggle).
  * **Primary Color:** `teal`
  * **Accent Color:** `cyan`
* **Features Enabled:**
  * **Navigation:** `navigation.tabs`, `navigation.tabs.sticky`, `navigation.sections`, `navigation.expand`, `navigation.path`, `navigation.indexes`, `navigation.top`, `navigation.instant`, `navigation.tracking`
  * **Search:** `search.suggest`, `search.highlight`, `search.share`
  * **Table of Contents (TOC):** `toc.follow`, `toc.integrate`
  * **Content:** `content.code.copy`, `content.code.annotate`
* **Custom Customizations:**
  * **Extra CSS:** `assets/css/extra.css` is included to override or extend standard theme styling.
  * **Social Links:** Configured under `extra.social` with links to GitHub, LinkedIn, and Email using FontAwesome icons.

---

## Complexity & Migration Notes

When migrating to Docusaurus, special attention should be paid to the following custom implementations and complex syntaxes heavily used in MkDocs:

1. **Admonitions & Callouts (`!!!` / `???`):** Docusaurus uses `:::note` syntax for admonitions. All `!!!` and `???` blocks need translation.
2. **Tabs (`===`):** Material uses `=== "Tab Name"` for tabs, which will need to be converted to Docusaurus `<Tabs>` and `<TabItem>` React components.
3. **Grid Layouts:** MkDocs uses `attr_list` and `md_in_html` to render grids via `<div class="grid cards" markdown>`. This is highly specific to the Material theme and will require custom CSS/React components in Docusaurus to replicate the card grid layout.
4. **Blog Plugin:** The Material blog structure dictates an `index.md` inside `blog/` and excerpts. Docusaurus has built-in blog functionality, but frontmatter dates, authors, and excerpt syntax (`<!-- more -->`) might need adjustment.
5. **Code Annotations & Features:** Some specific code features like `content.code.annotate` might not have direct 1:1 built-in mapping in Docusaurus and may require custom MDX plugins or specialized React components.
