# Guides & Tutorials

## Overview
Practical guides for developers and users.

## Contents

| File | Audience | Description |
|------|----------|-------------|
| `developer-guide.md` | Developers | Local setup, workflow, conventions |
| `supabase-setup.md` | Developers | Supabase CLI, local dev, migrations |
| `github-pages-deploy.md` | Developers | Static site deployment to GitHub Pages |
| `ci-cd-pipeline.md` | Developers | GitHub Actions workflows |
| `database-migrations.md` | Developers | Creating, running, rolling back migrations |
| `realtime-usage.md` | Developers | Subscribing to changes, presence |
| `troubleshooting.md` | All | Common issues, debugging tips |

## Developer Quick Start

```bash
# 1. Clone & install
git clone <repo-url>
cd project-purple
npm install

# 2. Start Supabase locally
supabase start

# 3. Run migrations
supabase db reset

# 4. Start dev server
npm run dev
```

## Conventions
- **Branching**: `main` → `feature/*` → PR → `main`
- **Commits**: Conventional Commits (`feat:`, `fix:`, `docs:`)
- **PRs**: Require review + CI pass
- **Env**: `.env.local` for secrets (never commit)

---

*See [planning](../planning/) for roadmap and decisions*