# Coding Conventions

**Analysis Date:** 2026-03-29

## Project Duality

This codebase maintains two distinct technology stacks side-by-side:

- **MkDocs (Python)** - Current production system in root directory
- **Docusaurus v3 (TypeScript/React)** - Migration target in `v2/` directory

Conventions differ by stack. Follow the conventions of the directory you are working in.

## TypeScript/React (Docusaurus, v2/ directory)

### Naming Patterns

**Files:**
- Component files: PascalCase with `.tsx` extension (e.g., `HomepageFeatures`)
- Config files: lowercase with hyphens in names (e.g., `docusaurus.config.ts`, `tsconfig.json`)
- CSS Modules: lowercase with `.module.css` suffix (e.g., `styles.module.css`, `index.module.css`)
- Type definitions: Inline in component files; use `type` keyword for type aliases

**Functions:**
- React components: PascalCase (e.g., `HomepageHeader`, `Home`, `Feature`)
- Utility/helper functions: camelCase
- Event handlers: camelCase with prefix pattern (e.g., `handleClick`, though none observed in codebase)

**Variables:**
- React props and state: camelCase
- Constants: camelCase (const-style, not SCREAMING_SNAKE_CASE)
- Type names: PascalCase (e.g., `FeatureItem`, `ReactNode`)

**Types:**
- Type aliases: PascalCase with `type` keyword
- Props objects: Named with `Props` suffix (e.g., in destructuring, though explicit naming not enforced)
- React type imports: Use `import type {...}` syntax

### Code Style

**Formatting:**
- No explicit formatter configured (no `.prettierrc` or `prettier.config.*`)
- Code appears to follow common React/TypeScript defaults
- Indentation: 2 spaces (observed in JSX and config files)
- Line length: No enforced limit observed

**Imports:**
- ES6 module syntax (`import`/`export`)
- Type imports separated from value imports: `import type {...}` on separate line from `import {...}`
- Third-party imports first, then relative imports

**Import Organization (observed pattern in v2/src/pages/index.tsx):**

```typescript
// 1. React and external libraries
import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

// 2. Docusaurus hooks and components
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

// 3. Site-specific components and modules
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

// 4. Local styles
import styles from './index.module.css';
```

**Path Aliases:**
- `@site/*` maps to root of v2/ directory (defined in `v2/tsconfig.json`)
- Use `@site/` prefix to import from project root

### Component Design

**React Components:**
- Functional components with arrow function syntax or function declaration (both observed)
- Props destructured in function parameters
- Type annotations for props using `type` keyword

Example from `v2/src/components/HomepageFeatures/index.tsx`:

```typescript
type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      {/* JSX content */}
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      {/* JSX content */}
    </section>
  );
}
```

**Return Types:**
- Components return `ReactNode` or no explicit return type
- Default exports used for page components
- Named exports used for utility components

### Styling

**CSS Modules:**
- Styles imported with `import styles from './filename.module.css'`
- Styles applied via `className={styles.className}` pattern
- No CSS-in-JS libraries observed

**CSS Custom Properties:**
- Infima framework variables used via CSS Custom Properties
- Example: `--ifm-color-primary`, `--ifm-code-font-size`
- Both light and dark mode support via `:root` and `[data-theme='dark']` selectors

**Utility Classes:**
- Docusaurus/Infima utility classes used directly (e.g., `col col--4`, `text--center`, `padding-horiz--md`)
- Combine with clsx utility for conditional classnames

### Comments

**When to Comment:**
- Minimal commenting observed
- Config files have structural comments for clarity
- Complex logic receives explanatory comments

Example from `v2/docusaurus.config.ts`:

```typescript
// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
future: {
  v4: true,
},
```

**JSDoc/TSDoc:**
- Not extensively used in codebase
- Config files may use inline comments for documentation

### Error Handling

**Approach:**
- No explicit error handling patterns observed in v2/src code
- Error handling deferred to framework level (Docusaurus)

**Logging:**
- No logging framework configured
- `console.*` methods not observed in source (may be in framework)

---

## Python (MkDocs, root directory)

### Naming Patterns

**Files:**
- snake_case filenames (e.g., `generate_migration_data.py`, `statistics.py`)
- Single file utilities named descriptively

**Functions:**
- snake_case function names (e.g., `process_files`, `ttest_rel`)
- Descriptive naming matching responsibility

**Variables:**
- snake_case for all variables and parameters
- SCREAMING_SNAKE_CASE not observed

### Code Style

**Formatting:**
- PEP 8 style followed
- Indentation: 4 spaces
- No `.flake8` or `pyproject.toml` linting configuration observed
- No explicit formatter configured

**Imports:**
- Standard library imports first (e.g., `os`, `csv`, `re`)
- Third-party imports second (e.g., `scipy.stats`)
- Relative imports not observed in existing code

Example from `generate_migration_data.py`:

```python
import os
import csv
import re
```

### Error Handling

**Exception Handling:**
- Try/except blocks used for file operations

Example from `generate_migration_data.py`:

```python
try:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
except Exception as e:
    print(f"Error reading {filepath}: {e}")
    continue
```

**Logging:**
- `print()` used for output and error messages
- No logging framework configured

### Comments

**When to Comment:**
- Comments used to explain sections
- String literals used to describe operations

Example from `generate_migration_data.py`:

```python
# Asset tracking
if not file.endswith('.md'):
    assets.append(filepath)
    continue

# Read content
try:
    with open(filepath, 'r', encoding='utf-8') as f:
```

---

## Shared Conventions

### Markdown Content

**Files:**
- Located in `docs/` for MkDocs content
- YAML frontmatter for metadata (if used)
- Asset files in `docs/assets/` or alongside `.md` files

**Link Format:**
- MkDocs relative links to other markdown files
- Will be migrated to Docusaurus format in `v2/docs/` and `v2/blog/`

---

## Summary for New Code

**TypeScript/React (v2/):**
- PascalCase for components, camelCase for utilities
- Use `type` keyword for type definitions
- Import types separately: `import type {...}`
- Use CSS Modules with `import styles from './file.module.css'`
- 2-space indentation
- Keep components under 100 lines for readability
- Use `@site/` path alias for project-root imports

**Python (root):**
- snake_case for everything (files, functions, variables)
- PEP 8 style with 4-space indentation
- Use try/except for file operations
- Print to output, don't use logging framework yet
- Comment complex sections

---

*Convention analysis: 2026-03-29*
