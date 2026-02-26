# Juan Felipe Gómez Manzanares | Professional Portfolio & Technical Blog

Welcome to my digital home! I am a **Software Infrastructure Engineer** with over 10 years of experience driving the lifecycle of Compute and Network infrastructure. 

Currently, I serve as a **Staff Software Engineer** in **Twilio’s Platform Infrastructure Team**, specializing in AWS, Kubernetes, Service Communications, and Infrastructure as Code. I've led critical initiatives handling **3M+ RPS** and maintaining **99.99%+ availability**.

---

## 🌐 Live Site
The rendered version of this portfolio is available at:
**[https://juanfe2793.github.io/JuanPipe/](https://juanfe2793.github.io/JuanPipe/)**

---

## Repository Structure
*   `docs/portfolio/`: Professional profile, metrics, and CV.
*   `docs/blog/`: Technical articles and engineering deep dives.
*   `docs/guides/`: A collection of DevOps, SRE, and Cloud cheatsheets.
*   `utils/`: Helper scripts for AWS and infrastructure management.

---

## 🛠️ Local Development Guide

This guide explains how to build and preview the portfolio locally before pushing changes.

### 🐍 Using Python & MkDocs (via uv)
1.  **Prerequisites:**
    Install [uv](https://docs.astral.sh/uv/getting-started/installation/).
2.  **Install Dependencies:**
    ```bash
    uv sync
    ```
3.  **Run Development Server:**
    ```bash
    uv run mkdocs serve
    ```
    Access at [http://localhost:8000](http://localhost:8000).

### 🐳 Using Docker
1.  **Build the Image:**
    ```bash
    docker build -t portfolio-site .
    ```
2.  **Run the Container:**
    ```bash
    docker run -p 8000:8000 portfolio-site
    ```
    Access at [http://localhost:8000](http://localhost:8000).

---

## 🚀 Deployment
The site is automatically deployed to GitHub Pages via GitHub Actions when pushing to the `main` branch. 
Check the **Actions** tab to monitor deployment status.
