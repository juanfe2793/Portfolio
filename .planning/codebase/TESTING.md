# Testing Patterns

**Analysis Date:** 2026-03-29

## Overview

**No testing framework is currently configured or in use.** The Docusaurus v3 project in `v2/` contains no test files, test configuration, or testing dependencies. The MkDocs system (root) similarly has no automated tests.

This document describes the baseline state and provides guidance for implementing tests going forward.

## Current State

**Test Framework:** Not detected

**Test Files:** None found
- No `.test.ts`, `.test.tsx`, `.spec.ts`, or `.spec.tsx` files in `v2/src/`
- No test configuration file (`jest.config.js`, `vitest.config.ts`, etc.)

**Dependencies:** No testing library installed
- `package.json` contains no dev dependencies for testing (Jest, Vitest, Testing Library, etc.)

**Build/Run Commands:** No test scripts configured
- `v2/package.json` scripts: `start`, `build`, `typecheck`, `swizzle`, `deploy`, `clear`, `serve`, `write-translations`, `write-heading-ids`
- No `test`, `test:watch`, or `coverage` commands

## Code Structure for Testing

### What Would Need Testing

**Components in `v2/src/components/`:**
- `HomepageFeatures/index.tsx` (71 lines)
  - Renders feature list with map iteration
  - Accepts FeatureItem type
  - Composition: Feature component + data array

- `HomepageFeatures/Feature()` (45 lines for full component)
  - Renders individual feature card
  - Props: `{title, Svg, description}`
  - Uses CSS Module styling and clsx for class binding

**Pages in `v2/src/pages/`:**
- `Home()` - Homepage component (45 lines)
  - Uses Docusaurus hooks: `useDocusaurusContext()`
  - Composes Layout, HomepageHeader, HomepageFeatures
  - Props destructuring: `{siteConfig}`

- `HomepageHeader()` - Header section
  - Renders hero section with site title/tagline
  - Uses clsx for className composition

### What Exists Without Tests

**Type safety:**
- TypeScript configuration present (`v2/tsconfig.json`)
- Type annotations on components: `function Home(): ReactNode`
- Type definitions: `type FeatureItem = { ... }`
- These provide compile-time validation

**Build validation:**
- `npm run typecheck` (runs `tsc`) catches type errors
- No runtime testing currently exists

## Recommended Testing Strategy

### Framework Choice

**Recommended:** Vitest + React Testing Library

**Why:**
- Vitest: Modern, fast, ESM-native (matches TypeScript/React 19 stack)
- React Testing Library: Encourages testing user behavior, not implementation details
- Both have excellent Docusaurus ecosystem support
- Lightweight dependencies suitable for documentation site

### Test File Organization

**Location:** Co-located with source files

**Pattern:**
```
v2/src/components/HomepageFeatures/
├── index.tsx
├── index.test.tsx        # New
├── styles.module.css
└── ...
```

**Naming:**
- `[ComponentName].test.tsx` or `[ComponentName].spec.tsx`
- Keep test files adjacent to components

### Test Structure

**Recommended pattern for components:**

```typescript
import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import HomepageFeatures from './index';

describe('HomepageFeatures', () => {
  it('renders feature list with correct count', () => {
    render(<HomepageFeatures />);
    // Assert on rendered output
  });

  it('renders feature titles', () => {
    render(<HomepageFeatures />);
    expect(screen.getByText('Easy to Use')).toBeInTheDocument();
  });
});
```

### Setup

**Configuration template (`vitest.config.ts`):**

```typescript
import {defineConfig} from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '.docusaurus/',
        'build/',
      ],
    },
  },
});
```

**Update `package.json` scripts:**

```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

**Add dev dependencies:**
- `vitest` - Test runner
- `@vitest/ui` - Optional UI dashboard
- `@testing-library/react` - Component testing utilities
- `@testing-library/user-event` - User interaction simulation
- `@vitejs/plugin-react` - React plugin for Vite/Vitest
- `jsdom` - DOM environment for tests
- `@vitest/coverage-v8` - Coverage reporting

## Mocking Strategy

### What to Mock

**External APIs/Hooks:**
- `useDocusaurusContext()` - Mock siteConfig for tests
- `@docusaurus/Link` - Optionally mock Link component
- SVG imports - Mock require('@site/...') calls

### What NOT to Mock

- React internals
- Theme components (`@theme/Heading`, `@theme/Layout`) - Test with real implementation if possible
- CSS module imports - jsdom handles these

### Example Mock Pattern

```typescript
import {describe, it, expect, vi} from 'vitest';
import {render, screen} from '@testing-library/react';

vi.mock('@docusaurus/useDocusaurusContext', () => ({
  default: () => ({
    siteConfig: {
      title: 'Test Site',
      tagline: 'Test Tagline',
    },
  }),
}));

describe('Home', () => {
  it('renders with mocked context', () => {
    // Test implementation
  });
});
```

## Test Data / Fixtures

### Fixture Location

Proposed: `v2/src/__fixtures__/` or `v2/src/test-utils/`

### Example Fixtures

**Mock data for FeatureItem:**

```typescript
// v2/src/__fixtures__/featureItems.ts
export const mockFeatureItems = [
  {
    title: 'Test Feature 1',
    Svg: () => <svg />,
    description: <>Test description</>,
  },
  // ... more items
];
```

**Test utilities:**

```typescript
// v2/src/test-utils/index.ts
import {ReactElement} from 'react';
import {render as rtlRender, RenderOptions} from '@testing-library/react';

// Wrapper for custom providers if needed
export function render(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return rtlRender(ui, {options});
}

export * from '@testing-library/react';
```

## Coverage

**Target:** No specific enforcement currently. Recommended: >80% for critical components.

**View Coverage:**
```bash
npm run test:coverage
# Generates report in: coverage/index.html
```

**Critical areas to prioritize:**
- Component rendering logic
- Props handling
- Conditional rendering
- Integration with Docusaurus hooks

## Test Types

### Unit Tests

**Scope:** Individual components in isolation

**Approach:**
```typescript
describe('Feature component', () => {
  it('renders title from props', () => {
    const props = {
      title: 'My Feature',
      Svg: () => <svg />,
      description: <>Desc</>,
    };
    render(<Feature {...props} />);
    expect(screen.getByText('My Feature')).toBeInTheDocument();
  });
});
```

### Integration Tests

**Scope:** Multiple components working together (e.g., HomepageFeatures + Feature)

**Approach:**
```typescript
describe('HomepageFeatures integration', () => {
  it('renders all features from FeatureList', () => {
    render(<HomepageFeatures />);
    expect(screen.getByText('Easy to Use')).toBeInTheDocument();
    expect(screen.getByText('Focus on What Matters')).toBeInTheDocument();
    expect(screen.getByText('Powered by React')).toBeInTheDocument();
  });
});
```

### E2E Tests

**Status:** Not recommended for documentation site

**If needed:** Use Playwright (already in `pyproject.toml` for MkDocs)
- Configure separately from unit tests
- Run in dedicated E2E workflow
- Test full page loads, navigation, search

## Common Patterns

### Async Testing

**If components fetch data (future):**

```typescript
import {render, screen, waitFor} from '@testing-library/react';

it('loads and displays data', async () => {
  render(<AsyncComponent />);

  await waitFor(() => {
    expect(screen.getByText(/loaded/)).toBeInTheDocument();
  });
});
```

### User Interaction Testing

```typescript
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it('handles click events', async () => {
  const user = userEvent.setup();
  render(<InteractiveComponent />);

  const button = screen.getByRole('button', {name: /click me/i});
  await user.click(button);

  expect(screen.getByText(/clicked/)).toBeInTheDocument();
});
```

### Snapshot Testing

**Not recommended** as primary approach. Use only for stable components:

```typescript
it('matches snapshot', () => {
  const {container} = render(<Feature {...mockProps} />);
  expect(container).toMatchSnapshot();
});
```

## CI/CD Integration

**Current workflows (`.github/workflows/`):**
- `ci.yml` - Deploys MkDocs (Python) to GitHub Pages
- `test-ci.yml` - Verifies MkDocs build

**Add for Docusaurus testing:**

```yaml
name: Test Docusaurus

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: cd v2 && npm ci
      - run: cd v2 && npm run typecheck
      - run: cd v2 && npm test -- --coverage
      - run: cd v2 && npm run build
```

## Files and Locations

**Config files to create:**
- `v2/vitest.config.ts` - Vitest configuration
- `v2/src/test-utils/index.ts` - Shared test utilities
- `v2/src/__fixtures__/` - Test data and mocks

**Test files (to be created):**
- `v2/src/pages/index.test.tsx`
- `v2/src/components/HomepageFeatures/index.test.tsx`
- `v2/src/components/HomepageFeatures/Feature.test.tsx` (if Feature extracted)

**Coverage reports:**
- `v2/coverage/` - Generated by test:coverage command
- Add to `.gitignore`: `/v2/coverage/`

---

*Testing analysis: 2026-03-29*

**Status:** Framework not yet implemented. Ready for implementation when needed.
