# Project Roadmap

## Vision
Build PROJECT PURPLE with GitHub + Supabase - a fully deployed, documented, and maintainable application.

---

## Milestones

### 🎯 Phase 1: Foundation (Week 1-2)
- [ ] **Supabase Project Setup**
  - [ ] Create Supabase project
  - [ ] Configure Auth providers
  - [ ] Set up local development with Supabase CLI
  - [ ] Document connection details in `specs/database-schema.md`

- [ ] **Repository & CI/CD**
  - [ ] Initialize git repo (if not exists)
  - [ ] Set up GitHub Actions workflow
  - [ ] Configure secrets (Supabase keys, etc.)
  - [ ] Document in `deployment/github-actions.md`

- [ ] **Documentation Baseline** ✅ *Done*
  - [x] Folder structure created
  - [x] ADR process established
  - [x] Chat history system active

### 🎯 Phase 2: Core Development (Week 3-6)
- [ ] **Database Schema**
  - [ ] Design tables in `specs/database-schema.md`
  - [ ] Create migrations
  - [ ] Set up Row Level Security (RLS) policies

- [ ] **API Layer**
  - [ ] Define endpoints in `api/endpoints.md`
  - [ ] Implement Supabase client helpers
  - [ ] Add TypeScript types generation

- [ ] **Frontend Setup**
  - [ ] Choose framework (React/Vue/Svelte/Vanilla)
  - [ ] Set up build pipeline
  - [ ] Configure GitHub Pages deployment

### 🎯 Phase 3: Features (Week 7-10)
- [ ] **Authentication Flow**
  - [ ] Sign up / Sign in pages
  - [ ] Protected routes
  - [ ] User profile management

- [ ] **Core Features** *(Define based on requirements)*
  - [ ] Feature 1
  - [ ] Feature 2
  - [ ] Feature 3

- [ ] **Realtime Features**
  - [ ] Live updates via Supabase Realtime
  - [ ] Presence indicators (if needed)

### 🎯 Phase 4: Production Ready (Week 11-12)
- [ ] **Testing**
  - [ ] Unit tests
  - [ ] Integration tests
  - [ ] E2E tests

- [ ] **Monitoring & Observability**
  - [ ] Error tracking (Sentry)
  - [ ] Analytics (Plausible/GA)
  - [ ] Uptime monitoring

- [ ] **Documentation Complete**
  - [ ] All guides written
  - [ ] API docs published
  - [ ] Runbooks for operations

- [ ] **Launch** 🚀
  - [ ] Production deployment
  - [ ] Custom domain configured
  - [ ] Post-launch monitoring

---

## Current Focus
**Phase 1: Foundation** - Setting up Supabase project and CI/CD pipeline

## Blockers
- Need to create Supabase project
- Need to decide on frontend framework
- Need to clarify project domain/requirements

---

*Update this roadmap weekly. Link detailed specs from each item.*