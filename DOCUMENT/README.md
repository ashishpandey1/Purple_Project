# PROJECT PURPLE - Documentation

> **Tech Stack**: GitHub (Hosting/Rendering) + Supabase (Backend/Database)  
> **Deployment**: End-to-end CI/CD pipeline

---

## 📁 Documentation Structure

| Folder | Purpose |
|--------|---------|
| [`architecture/`](./architecture/) | System architecture, data models, infrastructure diagrams |
| [`specs/`](./specs/) | Technical specifications, requirements, API contracts |
| [`api/`](./api/) | API documentation, endpoints, schemas, examples |
| [`guides/`](./guides/) | User guides, developer onboarding, how-to tutorials |
| [`planning/`](./planning/) | Roadmap, decisions, ADRs, sprint planning |
| [`deployment/`](./deployment/) | CI/CD pipelines, environments, runbooks, rollback procedures |
| [`chat-history/`](./chat-history/) | AI assistant conversation logs, decisions, context preservation |

---

## 🚀 Quick Links

- [Architecture Overview](./architecture/README.md)
- [Technical Specifications](./specs/README.md)
- [API Reference](./api/README.md)
- [Developer Guide](./guides/developer-guide.md)
- [Deployment Guide](./deployment/README.md)
- [Project Roadmap](./planning/roadmap.md)
- [Decision Log (ADRs)](./planning/decisions.md)

---

## 📝 Chat History & Memory

All AI assistant conversations are saved in [`chat-history/`](./chat-history/) to preserve context across sessions. Each conversation is saved as a dated markdown file with:
- User requests and requirements
- Technical decisions made
- Code changes and rationale
- Open questions and blockers

---

## 🔄 Maintenance

This documentation is maintained as **docs-as-code** - version controlled alongside the application code. Update docs when:
- Adding new features
- Changing APIs
- Modifying architecture
- Updating deployment procedures

---

*Last updated: 2026-11-05*