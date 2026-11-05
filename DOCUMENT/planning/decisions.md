# Architecture Decision Records (ADRs)

## Index

| ID | Title | Status | Date | Link |
|----|-------|--------|------|------|
| 001 | Use Supabase for Backend & Auth | Accepted | 2026-11-05 | [001-supabase-backend.md](./001-supabase-backend.md) |
| 002 | GitHub Pages for Static Hosting | Accepted | 2026-11-05 | [002-github-pages-hosting.md](./002-github-pages-hosting.md) |
| 003 | Markdown for Documentation | Accepted | 2026-11-05 | [003-markdown-docs.md](./003-markdown-docs.md) |

---

## ADR 001: Use Supabase for Backend & Auth

**Status**: Accepted  
**Date**: 2026-11-05  
**Deciders**: Project Team

### Context
Need a backend solution that provides: PostgreSQL database, authentication, realtime subscriptions, file storage, and edge functions - all with minimal operational overhead.

### Decision
Use **Supabase** as the primary backend platform.

### Consequences
**Positive**: 
- Fully managed PostgreSQL with extensions
- Built-in Auth (email, OAuth, magic links, MFA)
- Realtime via WebSockets
- Auto-generated REST & GraphQL APIs
- Edge Functions (Deno) for serverless logic
- Generous free tier

**Negative**:
- Vendor lock-in (though PostgreSQL compatible)
- Limited control over infrastructure
- Pricing scales with usage

### Alternatives Considered
| Alternative | Why Not Chosen |
|-------------|----------------|
| Firebase | NoSQL, less SQL flexibility, vendor lock-in |
| Custom Node/Postgres | High operational overhead |
| Appwrite | Smaller ecosystem, less mature |

---

## ADR 002: GitHub Pages for Static Hosting

**Status**: Accepted  
**Date**: 2026-11-05  
**Deciders**: Project Team

### Context
Need free, reliable static site hosting with custom domain support and CI/CD integration.

### Decision
Use **GitHub Pages** for frontend hosting.

### Consequences
**Positive**:
- Free for public repos
- Native GitHub Actions integration
- Custom domain + HTTPS
- Automatic builds on push
- No separate hosting account needed

**Negative**:
- Static only (no server-side rendering)
- Build time limits on free tier
- Single branch deployment

### Alternatives Considered
| Alternative | Why Not Chosen |
|-------------|----------------|
| Vercel/Netlify | Great but adds another platform |
| Cloudflare Pages | Good alternative, but GitHub native is simpler |
| AWS S3 + CloudFront | More complex, costs at scale |

---

## ADR 003: Markdown for Documentation

**Status**: Accepted  
**Date**: 2026-11-05  
**Deciders**: Project Team

### Context
Need documentation format that: renders well on GitHub, version controls with code, supports diagrams, and is easy to edit.

### Decision
Use **Markdown (.md)** for all documentation with Mermaid.js for diagrams.

### Consequences
**Positive**:
- Native GitHub rendering
- Git-friendly (diffable, mergeable)
- Mermaid diagrams render in GitHub
- Works with docs tools (Docusaurus, MkDocs, VitePress)
- Plain text - editable anywhere

**Negative**:
- No built-in PDF export (use tools)
- Large docs need navigation structure
- No WYSIWYG by default

### Alternatives Considered
| Alternative | Why Not Chosen |
|-------------|----------------|
| Google Docs/Notion | Not version controlled with code |
| AsciiDoc | Less GitHub-native support |
| Confluence | Separate tool, not in repo |