# Coding Conventions

**Analysis Date:** 2026-03-29

## Overview

This codebase contains two parallel systems with distinct conventions:

1. **Docusaurus v3 (TypeScript/React)** - Primary focus for new code in `v2/`
2. **MkDocs (Python/Markdown)** - Legacy system in root directory (production)

Conventions below reflect the Docusaurus system as the primary development target.

## Naming Patterns

### Files

**TypeScript/TSX Files:**
- Use lowercase with hyphens for multi-word names (kebab-case)
- Example: `HomepageFeatures/index.tsx`, `styles.module.css`
- Component entry points use `index.tsx` within component directories

**CSS Modules:**
- Use `.module.css` suffix for scoped styles
- Example: `index.module.css`, `styles.module.css`
- Located alongside component files in `v2/src/components/` subdirectories

**Config Files:**
- `docusaurus.config.ts` - Main Docusaurus configuration (Config type annotation)
- `sidebars.ts` - Sidebar configuration with SidebarsConfig type
- `tsconfig.json` - TypeScript configuration (extends @docusaurus/tsconfig)

**Documentation:**
- Markdown files use lowercase with hyphens
- Example: `git_commands.md`, `docker_containerd_commands.md`

### Functions and Components

**React Components:**
- Use PascalCase for component function names
- Example: `HomepageHeader()`, `Feature()`, `HomepageFeatures()`
- Components return `ReactNode` type explicitly
- Single export: `export default function ComponentName(): ReactNode`

**Helper Functions:**
- Use camelCase for utility/helper functions
- Example: `process_files()` in Python; equivalent would be `processFiles()` in TypeScript

**Type-based Naming:**
- Use CONSTANT_CASE for constants
- Example: `FeatureList: FeatureItem[]`

### Variables and Constants

**Component Props:**
- Use camelCase for prop destructuring
- Example: `{title, Svg, description}` in Feature component

**Constants:**
- Use CONSTANT_CASE when appropriate
- Example: `const FeatureList: FeatureItem[] = [...]`

**Imports:**
- Type imports use `type` keyword: `import type {ReactNode} from 'react'`
- Component imports: `import clsx from 'clsx'`
- Path aliases: `@site/`, `@theme/`, `@docusaurus/`

### Types and Interfaces

**Type Definitions:**
- Use explicit type declarations for components: `function Home(): ReactNode`
- Custom types defined inline for small structures: `type FeatureItem = { ... }`
- Use satisfies keyword for type narrowing: `} satisfies Preset.Options`

**Props Typing:**
- Type component parameters: `function Feature({title, Svg, description}: FeatureItem)`
- Use composition for complex props

## Code Style

### Formatting

**Tool:** No explicit formatter configured (Docusaurus uses defaults)

**Key Style Guidelines:**
- 2-space indentation (inferred from package.json and existing code)
- JSX attributes: space before closing `>` (standard React)
- Strings: single quotes preferred in JavaScript (shown in imports)
- Trailing commas in multi-line structures: present (modern standard)

### Linting

**No ESLint/Prettier config found in `v2/` directory.**

TypeScript is configured through:
- `@docusaurus/tsconfig` (extends base Docusaurus TypeScript config)
- `tsconfig.json` in `v2/` with `baseUrl: "."`
- Type checking run via: `npm run typecheck` (calls `tsc`)

**For new code:** Follow Docusaurus defaults and existing file conventions.

## Import Organization

**Order (observed):**

1. React/type imports: `import type {ReactNode} from 'react'`
2. Third-party utilities: `import clsx from 'clsx'`
3. Docusaurus imports: `import Link from '@docusaurus/Link'`, `import useDocusaurusContext from '@docusaurus/useDocusaurusContext'`
4. Custom components/layouts: `import Layout from '@theme/Layout'`, `import HomepageFeatures from '@site/src/components/HomepageFeatures'`
5. Theme imports: `import Heading from '@theme/Heading'`
6. Local styles: `import styles from './index.module.css'`

**Path Aliases:**
- `@site/` - Project root (resolves to `.` in tsconfig)
- `@theme/` - Docusaurus theme components
- `@docusaurus/` - Docusaurus core modules

## Error Handling

**No error handling patterns currently implemented.** Codebase contains only presentational components without async operations or error states.

**Future guidance:** When adding error handling:
- Use TypeScript for type safety
- Leverage React error boundaries if needed
- Follow Docusaurus plugin patterns for runtime errors

## Logging

**No logging framework configured.** Development uses Docusaurus dev server console output.

**Python side:** Uses standard `print()` statements (see `generate_migration_data.py`)

**Example (Python):**
```python
print(f"Error reading {filepath}: {e}")
print("CSV files created successfully.")
```

## Comments

**JSDoc/TSDoc:** Not used in current codebase.

**Inline Comments:** Minimal. Configuration files use `//` comments explaining setup.

Example from `docusaurus.config.ts`:
```typescript
// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
// Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
```

**Guidelines (inferred from CLAUDE.md):**
- Use comments sparingly; only comment complex code
- Configuration files benefit from clarifying comments

## Function Design

**Size:** Small, focused functions. Example component at `v2/src/pages/index.tsx` is 45 lines including all logic.

**Parameters:**
- Type parameters explicitly: `function Feature({title, Svg, description}: FeatureItem)`
- Destructure in function signature when possible
- Use object types for multi-param functions

**Return Values:**
- Always explicitly type return: `(): ReactNode`
- Return JSX from React components
- Use composition: components render other components

**Example pattern (v2/src/pages/index.tsx):**
```typescript
function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      {/* JSX content */}
    </header>
  );
}
```

## Module Design

**Exports:**
- Single default export per file (convention in both TypeScript and Python)
- Example: `export default function Home(): ReactNode`
- Config files: `export default config`

**Barrel Files:**
- Not used; component index.tsx files export component directly

**File Organization:**
- Components live in `v2/src/components/[ComponentName]/index.tsx`
- Styles colocated: `v2/src/components/[ComponentName]/styles.module.css`
- Pages in `v2/src/pages/`
- Configuration at root level: `docusaurus.config.ts`, `sidebars.ts`

## Python Conventions (Legacy MkDocs)

**File naming:** Lowercase with underscores
- Example: `generate_migration_data.py`

**Function naming:** Lowercase with underscores
- Example: `process_files(start_dir)`

**Style:** Standard Python conventions
- Type hints not used in current codebase
- CSV/file operations handled with stdlib

## Special Patterns

### Docusaurus-Specific

**Config pattern (docusaurus.config.ts):**
- Defines `Config` type from `@docusaurus/types`
- Uses `satisfies` keyword for preset options: `} satisfies Preset.Options`
- Export default configuration object

**React hooks in Docusaurus:**
- `useDocusaurusContext()` - Access site config in components
- All custom imports from Docusaurus ecosystem

**CSS styling:**
- CSS Modules for component scoping: `import styles from './styles.module.css'`
- Global styles in `v2/src/css/custom.css`
- Class binding with `clsx()` utility

### HTML/JSX Patterns

**Self-closing tags:** `<Svg className={styles.featureSvg} role="img" />`

**Attributes:**
- Use camelCase: `className`, `onClick`, `onChange`
- Role attributes for accessibility: `role="img"`
- Standard JSX patterns

---

*Convention analysis: 2026-03-29*
