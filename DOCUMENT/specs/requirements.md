# Project Requirements

## Overview
PROJECT PURPLE - A web application using GitHub Pages + Supabase with end-to-end deployment.

## Functional Requirements

### FR-001: Authentication
- User registration (email/password)
- Social login (Google, GitHub)
- Magic link authentication
- Password reset flow
- Session management
- Role-based access control (user, admin)

### FR-002: QR Code Payment Integration
- **Reference**: `phine-pay-qr-code.jpeg` (in specs folder)
- Generate QR codes for payments
- Support Phine Pay (or similar) payment provider
- Display QR code on checkout/payment page
- Handle payment callbacks/webhooks
- Payment status tracking (pending, completed, failed, refunded)

### FR-003: Real-time Features
- Live payment status updates
- Notification system
- Presence indicators (if collaborative features)

### FR-004: Data Management
- User profiles
- Transaction history
- Payment records
- Audit logs

---

## Non-Functional Requirements

### NFR-001: Performance
- Page load < 3 seconds
- API response < 500ms (p95)
- Support 1000+ concurrent users

### NFR-002: Security
- HTTPS enforced
- Supabase RLS on all tables
- Secure API key management
- Input validation & sanitization
- Rate limiting on payment endpoints

### NFR-003: Reliability
- 99.9% uptime
- Automated backups (Supabase)
- Graceful degradation
- Error tracking & alerting

### NFR-004: Maintainability
- Documentation as code (Markdown)
- TypeScript for type safety
- Automated testing (unit + E2E)
- CI/CD with GitHub Actions

### NFR-005: Scalability
- Horizontal scaling via Supabase
- CDN for static assets (GitHub Pages)
- Database connection pooling

---

## Technical Requirements

### TR-001: Stack
- **Frontend**: [TBD - React/Vue/Svelte/Vanilla]
- **Backend**: Supabase (PostgreSQL + Auth + Realtime + Storage + Edge Functions)
- **Hosting**: GitHub Pages (static) + Supabase (managed services)
- **CI/CD**: GitHub Actions
- **Language**: TypeScript

### TR-002: Deployment
- **Environments**: Local → Staging → Production
- **Branch Strategy**: main → feature/* → PR → main
- **Release**: Git tags (v1.0.0) trigger production deploy
- **Rollback**: Git revert + `supabase db push` previous migration

### TR-003: Database
- PostgreSQL 15+ (Supabase managed)
- Migrations via Supabase CLI
- RLS policies for all user data
- Automated daily backups (Supabase)

### TR-004: Monitoring
- Error tracking: Sentry (free tier)
- Analytics: Plausible or GA4
- Uptime: GitHub Actions + external monitor

---

## UI/UX Requirements

### QR Code Payment Flow
1. User initiates payment
2. System generates QR code via payment provider API
3. Display QR code with timer/countdown
4. Poll/webhook for payment status
5. Show success/failure state
6. Record transaction in database

---

## Open Questions

| Question | Status | Decision |
|----------|--------|----------|
| Frontend framework? | Open | |
| Payment provider exact API? | Open | |
| Custom domain? | Open | |
| Email service (Supabase vs SendGrid vs Resend)? | Open | |
| Need for Edge Functions? | Open | |
| Multi-language support? | Open | |

---

## References
- [QR Code Image](./phine-pay-qr-code.jpeg) - Payment UI reference
- [Architecture Overview](../architecture/README.md)
- [API Contracts](../api/README.md)
- [Deployment Guide](../deployment/README.md)
- [ADR: Supabase Backend](../planning/decisions.md#adr-001-use-supabase-for-backend--auth)
- [ADR: GitHub Pages Hosting](../planning/decisions.md#adr-002-github-pages-for-static-hosting)

---

*Last updated: 2026-11-05*  
*Update as requirements are clarified.*