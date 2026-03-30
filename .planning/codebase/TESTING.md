# Testing Patterns

**Analysis Date:** 2026-03-29

## Status: Minimal Testing Infrastructure

**No dedicated test framework configured.** The codebase relies on build verification via CI/CD workflows rather than unit/integration tests.

---

## Build Verification (De Facto Testing)

### Test Framework

**Framework:** None - Uses CI/CD build verification

**Build Verification Approach:**
- MkDocs build verification in `.github/workflows/test-ci.yml`
- Docusaurus has no build test configured
- Build failures block deployment

**Commands:**
```bash
# MkDocs verification
uv run mkdocs build              # Build static site; fails if errors detected

# Docusaurus (manual)
cd v2
npm run build                    # Production build
npm run typecheck                # TypeScript type checking with tsc
```

### Run Commands in CI

**MkDocs (test-ci.yml):**
```bash
pip install uv
uv sync --frozen                 # Install frozen dependencies
uv run mkdocs build              # Build and verify - fails on error
```

**Docusaurus (no CI test job):**
- No automated build test in CI/CD workflows
- Typecheck available locally: `npm run typecheck`

---

## Test Framework Configuration

**test-ci.yml** (`.github/workflows/test-ci.yml`):
- Runs on push to `main` and all pull requests
- Python 3.11 environment
- Concurrent builds cancelled to save resources
- Environment variable: `NO_MKDOCS_2_WARNING=1`

**No Jest, Vitest, or other JS testing framework configured** - though dependencies are minimal.

**No Python testing framework configured** - pytest, unittest, etc. not in dependencies.

---

## TypeScript Type Checking (v2/)

### Available Tool

**TypeScript Compiler (tsc):**
- Package: `typescript` v5.6.2
- Run command: `npm run typecheck`
- Configuration: `v2/tsconfig.json`

**tsconfig.json settings:**
```json
{
  "extends": "@docusaurus/tsconfig",
  "compilerOptions": {
    "baseUrl": "."
  },
  "exclude": [".docusaurus", "build"]
}
```

**Docusaurus tsconfig settings (inherited):**
```json
{
  "compilerOptions": {
    "allowJs": true,
    "esModuleInterop": true,
    "jsx": "preserve",
    "target": "ES2022",
    "lib": ["ES2022", "DOM"],
    "moduleResolution": "bundler",
    "module": "esnext",
    "noEmit": true,
    "skipLibCheck": true
  }
}
```

This configuration:
- Allows JavaScript files
- Uses ES2022 as target
- Preserves JSX for Docusaurus processing
- Skips library type checking

### When to Use

Use `npm run typecheck` to:
- Verify TypeScript compilation before commits
- Catch type errors early
- Validate component props and return types

---

## Python Testing

**No testing framework configured.**

**Available verification:**
- MkDocs markdown extension validation during build
- YAML frontmatter validation (implicit)
- Regex pattern matching validation in `generate_migration_data.py` (ad-hoc)

### Python Code Verification

**generate_migration_data.py** includes basic exception handling:

```python
try:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
except Exception as e:
    print(f"Error reading {filepath}: {e}")
    continue
```

This is the extent of error handling - no formal test structure.

---

## What Is Being Tested Today

**MkDocs Build Verification:**
- Markdown syntax validity
- YAML configuration correctness
- Theme rendering (Material theme)
- Code block syntax highlighting
- Link integrity (relative link structure)
- Plugin execution (blog plugin, search plugin, exclude plugin)

**Docusaurus Build Verification (Manual):**
- TypeScript compilation (via `npm run typecheck`)
- React component rendering
- Dependency resolution

---

## Test Coverage

**Status:** Not measured

**No coverage reporting configured.**

- `package.json` has no test/coverage commands
- `pyproject.toml` has no test dependencies
- No `.nycrc`, `.coveragerc`, or similar coverage config files

---

## Migration Path for Tests

**Recommended approach for future testing:**

### For Docusaurus (v2/):
1. Add Vitest or Jest to devDependencies
2. Place test files co-located with components: `Component.test.tsx`
3. Add test script: `"test": "vitest"`
4. Integrate into CI/CD workflow

### For Python (root):
1. Add pytest to `pyproject.toml` dependencies
2. Create `tests/` directory
3. Place test files: `test_generate_migration_data.py`
4. Add test script in CI/CD

### For Integration Tests:
1. Add Playwright for E2E (already in dependencies: `playwright>=1.57.0`)
2. Create `.github/workflows/e2e.yml` for full site validation
3. Test against both MkDocs (root) and Docusaurus (v2/) builds

---

## Code Quality Checks Not Yet Automated

**Available but not enforced in CI:**
- `npm run typecheck` for TypeScript (v2/) - manual only
- Linting - no linter configured (ESLint, Biome, or Ruff)
- Formatting - no formatter configured (Prettier, Black, or Biome)

**Recommendations:**
- Enable TypeScript strict mode in CI
- Add ESLint to Docusaurus v2/ project
- Add Biome or Ruff to Python project

---

## Special Directories

**Test Data:**
- `migration-planning/` - Contains CSV files with content inventory and URL mappings
  - `content_inventory.csv` - Word counts, syntax complexity (generated)
  - `url_mapping.csv` - Old MkDocs URLs → new Docusaurus URLs (generated)
  - `static_assets.csv` - List of asset files (generated)

**Generated on demand by:** `python generate_migration_data.py`

---

## Debugging

**MkDocs:**
- Build with verbose output: `uv run mkdocs build --verbose`
- Check generated `site/` directory structure

**Docusaurus:**
- Check `.docusaurus/` build cache directory (excluded from git)
- Run in dev mode for hot reload: `npm start`
- Check `build/` directory after production build

**TypeScript:**
```bash
cd v2
npm run typecheck                # Show all type errors
tsc --noEmit                     # Explicit tsc call
```

---

## Current Gaps

1. **No unit tests** for components or utilities
2. **No integration tests** for page rendering
3. **No E2E tests** for full site workflows
4. **No linting** for code quality
5. **No formatting** enforcement
6. **No mutation testing** or coverage tracking
7. **No accessibility testing** (a11y)
8. **No performance testing** for build times or bundle size

---

## Strengths

1. **Build verification prevents broken deployments** - MkDocs build must succeed to deploy
2. **TypeScript available** for type safety (though not enforced)
3. **CI/CD automation** prevents manual testing overhead
4. **Dependency management** with locked package files (`package-lock.json`, `uv.lock` if present)

---

*Testing analysis: 2026-03-29*
