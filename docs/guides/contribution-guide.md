---
id: contribution-guide
title: Documentation Contribution Guide
description: Guidelines and style standards for contributing to the documentation.
---

# Documentation Contribution Guide

Welcome! This guide is intended for both human developers and AI agents contributing to the
documentation. Following these guidelines ensures consistency, quality, and maintainability across
all documentation pages.

## Content Organization

- **Docs Scope**: Standard technical documentation, runbooks, architectures, and guides live in the
  `/docs` directory.
- **Blog Scope**: Time-sensitive announcements, opinion pieces, and updates live in the `/blog`
  directory.
- **Front Matter**: Always include relevant metadata at the top of your markdown files:
  ```markdown
  ---
  id: my-doc-id
  title: My Document Title
  description: A short, concise description of the document.
  ---
  ```

## Writing Style & Tone

- **Clarity and Brevity**: Keep sentences concise and to the point. Avoid jargon where possible, or
  define it on first use.
- **Active Voice**: Prefer active voice over passive voice. (e.g., "The system processes the
  request" instead of "The request is processed by the system").
- **Audience**: Assume a technical audience (engineers, platform operators) but do not assume
  familiarity with the specific system context unless explicitly linked.
- **Formatting**: Use **bold** for emphasis or UI elements, and `inline code` for filenames,
  variables, and commands.

## Code Snippets and Commands

- Always specify the language for code blocks to enable syntax highlighting:
  ```bash
  # Good
  kubectl get pods -n kube-system
  ```
- Use complete, verifiable, and executable examples where possible.
- Avoid trailing whitespaces in code blocks.
- Document necessary prerequisites or context before presenting complex commands.

## Docusaurus Features

- **Admonitions**: Use admonitions to call out important information.

  ```markdown
  :::note This is a note. :::

  :::tip This is a helpful tip. :::

  :::warning This is a warning! :::

  :::danger This is critical information. :::
  ```

- **MDX Components**: Docusaurus supports MDX. When using JSX inside markdown, ensure proper
  escaping of HTML entities (e.g., use `&rarr;` instead of `->`, `&gt;` instead of `>`) to prevent
  Acorn parsing errors during the build.
- **Icons**: Utilize standard emoji shortcodes (e.g., `:fontawesome-brands-github:`) supported by
  the platform rather than raw SVGs to ensure correct scaling.

## Pre-Commit and Formatting

We use [Prettier](https://prettier.io/) to enforce standard formatting across Markdown and code
files. Before submitting changes, ensure your files are formatted correctly:

```bash
npm run format
```

For syntax validation and format checking without modifying files, run:

```bash
npm run format:check
```

## AI Agent Directives

If you are an AI agent operating in this repository, please adhere to the following strict
guidelines:

- Validate that any generated MDX syntax compiles correctly.
- Always run `npm run format` after modifying markdown files.
- Refer to `AGENTS.md` (if available in the directory scope) for additional programmatic checks and
  constraints.
- When generating tables or lists, strictly follow Prettier's formatting rules.
