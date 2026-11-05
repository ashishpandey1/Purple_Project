# Developer Guide

## Quick Start

### Prerequisites
- Node.js 20+
- Git
- Supabase CLI: `npm install -g supabase`
- GitHub CLI (optional): `gh`

### Local Development Setup

```bash
# 1. Clone repository
git clone <your-repo-url>
cd project-purple

# 2. Install dependencies
npm install

# 3. Start Supabase locally
supabase start

# 4. Apply migrations
supabase db reset

# 5. Start development server
npm run dev
```

### Environment Variables
Create `.env.local` (never commit):
```env
# Supabase (get from supabase status or dashboard)
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=your-anon-key

# Optional: Service role for admin scripts
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## Workflow

### Branch Strategy
```
main (protected)
  └── feature/short-description
  └── fix/issue-description
  └── docs/update-description
```

### Commit Convention
```
type(scope): description

feat(auth): add Google OAuth login
fix(api): handle null response from posts endpoint
docs(readme): update quick start section
chore(deps): update supabase-js to v2
```

### Pull Request Process
1. Create feature branch from `main`
2. Make changes with tests
3. Run linting: `npm run lint`
4. Run tests: `npm run test`
5. Open PR with description
6. Require 1 approval + CI pass
7. Squash merge to `main`

---

## Supabase Local Development

### Common Commands
```bash
# Start all services
supabase start

# Stop services
supabase stop

# Reset database (runs all migrations)
supabase db reset

# Create new migration
supabase migration new migration_name

# Generate TypeScript types
supabase gen types typescript --local > src/types/database.ts

# Open Supabase Studio
supabase studio

# Link to remote project
supabase link --project-ref <project-ref>

# Push migrations to remote
supabase db push
```

### Database Workflow
1. Edit migration files in `supabase/migrations/`
2. Test locally: `supabase db reset`
3. When satisfied: `supabase db push` (to remote)

---

## GitHub Actions CI/CD

### Workflows
| File | Trigger | Purpose |
|------|---------|---------|
| `.github/workflows/ci.yml` | PR, push | Lint, test, type-check |
| `.github/workflows/deploy.yml` | Tag `v*` | Deploy to production |

### Required Secrets (GitHub Settings → Secrets → Actions)
| Secret | Description |
|--------|-------------|
| `SUPABASE_PROD_REF` | Supabase project ref |
| `SUPABASE_PROD_KEY` | Service role key (prod) |
| `SUPABASE_STAGING_REF` | Staging project ref |
| `SUPABASE_STAGING_KEY` | Service role key (staging) |

---

## Testing

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

---

## Debugging

### Supabase Logs
```bash
# View all logs
supabase logs

# Follow specific service
supabase logs -f postgres
supabase logs -f auth
supabase logs -f realtime
```

### Common Issues

| Issue | Solution |
|-------|----------|
| `supabase start` fails | `supabase stop && docker system prune -f && supabase start` |
| Types out of date | `supabase gen types typescript --local > src/types/database.ts` |
| Migration conflicts | `supabase db reset` (destroys local data) |
| Auth not working locally | Check `supabase/config.toml` for auth settings |

---

## Useful Resources
- [Supabase Docs](https://supabase.com/docs)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [GitHub Pages Docs](https://docs.github.com/en/pages)

---

*Update this guide as the project evolves.*