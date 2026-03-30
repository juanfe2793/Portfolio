# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install
```

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Docker (Local Dev with Hot-Reload)

```bash
docker compose --profile dev up
```

This mounts the local source files into the container and starts the dev server at `http://localhost:3000` with hot-reload enabled. Changes to `docs/` and `blog/` are reflected live.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Docker (Production Build)

```bash
docker compose --profile prod up
```

This builds the site and serves the static output at `http://localhost:3000`.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
