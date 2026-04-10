# Juan Felipe Gómez Manzanares | Professional Portfolio & Technical Blog

Personal portfolio and technical blog for a **Staff Software Engineer** specializing in cloud-native infrastructure, API gateways, Kubernetes, and SRE. Built with **Docusaurus v3** (React 19 / TypeScript), deployed to GitHub Pages.

**Live site:** [https://juanfe2793.github.io/Portfolio/](https://juanfe2793.github.io/Portfolio/)

---

## Repository Structure

| Path | Purpose |
|---|---|
| `src/pages/` | React page components (home page) |
| `src/components/` | Shared components (Timeline, SkillBadge, SocialLinks, …) |
| `src/css/custom.css` | Design system tokens and global styles |
| `docs/portfolio/` | CV / Resume |
| `docs/case-studies/` | Architecture Hub — deep-dive case studies |
| `docs/guides/` | The Staff's Playbook — DevOps/SRE cheatsheets |
| `blog/` | Technical blog posts |
| `utils/aws-scripts/` | AWS helper scripts (unrelated to the site) |

---

## Local Development

Requires **Node.js >=20**.

```bash
npm install          # Install dependencies
npm start            # Dev server at http://localhost:3000
npm run build        # Production build
npm run typecheck    # TypeScript type check
npm run serve        # Serve production build locally
npm run clear        # Clear Docusaurus cache
```

### Docker

```bash
docker compose --profile dev up    # Dev server with hot-reload on :3000
docker compose --profile prod up   # Production build on :3000
```

---

## Deployment

Automatically deployed to GitHub Pages on push to `main` via GitHub Actions (`.github/workflows/ci.yml`). PRs and pushes to `main` also run a build + typecheck CI check (`.github/workflows/test-ci.yml`).

---

## License

Dual-licensed:

| Scope | License |
|---|---|
| Code (configs, components, scripts) | [MIT](LICENSE) |
| Content (blog posts, guides, CV) | [CC BY 4.0](LICENSE-CC-BY-4.0) |
