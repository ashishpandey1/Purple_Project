# API Documentation

## Overview
REST and Realtime API documentation for PROJECT PURPLE.

## Contents

| File | Description |
|------|-------------|
| `endpoints.md` | All REST endpoints with examples |
| `schemas.md` | Request/response JSON schemas |
| `authentication.md` | Supabase JWT, API keys, RLS |
| `realtime.md` | WebSocket channels, events, filters |
| `errors.md` | Error codes, formats, handling |
| `rate-limits.md` | Quotas, limits, best practices |
| `changelog.md` | API version history |

## Quick Reference

**Base URL**: `https://<project-ref>.supabase.co/rest/v1`  
**Auth**: `apikey` header + `Authorization: Bearer <jwt>`  
**Realtime**: `wss://<project-ref>.supabase.co/realtime/v1`

## Tools
- **Postman Collection**: `api/postman-collection.json`
- **OpenAPI Spec**: `api/openapi.yaml`
- **TypeScript Types**: `api/types/` (auto-generated)

---

*Generate docs with: `supabase gen types typescript --project-id <ref> > api/types/database.ts`*