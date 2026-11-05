# Deployment Documentation

## Overview
End-to-end deployment pipelines, environments, and runbooks.

## Contents

| File | Description |
|------|-------------|
| `environments.md` | Local, Staging, Production configs |
| `github-actions.md` | CI/CD workflows, triggers, secrets |
| `supabase-deployment.md` | Database migrations, edge functions, secrets |
| `github-pages.md` | Static site build & deploy |
| `rollback-procedures.md` | How to rollback each component |
| `monitoring.md` | Health checks, alerts, logging |
| `runbooks/` | Incident response procedures |

## Environments

| Environment | URL | Purpose | Auto-deploy |
|-------------|-----|---------|-------------|
| Local | `localhost:3000` | Development | `supabase start` |
| Staging | `staging.project-purple.vercel.app` | Testing | PR merge to `staging` |
| Production | `project-purple.vercel.app` | Live users | Tag release `v*` |

## CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
on:
  push:
    tags: ['v*']
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Supabase
        run: supabase db push --project-ref ${{ secrets.SUPABASE_PROD_REF }}
      - name: Deploy to GitHub Pages
        run: npm run build && npm run deploy
```

## Secrets Management
- **GitHub**: Repository Settings → Secrets → Actions
- **Supabase**: Dashboard → Settings → API
- **Vercel/Netlify**: Project Settings → Environment Variables

---

*Never commit secrets. Use `.env.example` for required variables.*