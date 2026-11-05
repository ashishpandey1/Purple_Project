# PROJECT PURPLE

A modern payment application built with **React + TypeScript + Vite** on the frontend, **Supabase** (PostgreSQL + Auth + Realtime) on the backend, deployed to **GitHub Pages** with **GitHub Actions** CI/CD.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Supabase CLI: `npm install -g supabase`
- GitHub account

### Local Development

```bash
# 1. Clone and install
git clone <your-repo-url>
cd project-purple
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 3. Start Supabase locally
supabase start

# 4. Apply migrations
supabase db reset

# 5. Start dev server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |
| `npm run db:reset` | Reset local Supabase database |
| `npm run db:push` | Push migrations to remote |
| `npm run db:types` | Generate TypeScript types from schema |
| `npm run deploy` | Deploy to GitHub Pages |

## 🏗 Architecture

```
┌─────────────────┐     ┌──────────────────┐
│   GitHub Pages  │────▶│   Supabase       │
│   (Static Host) │     │   (Backend)      │
└─────────────────┘     └──────────────────┘
                              │
                    ┌─────────┼─────────┐
                    ▼         ▼         ▼
               PostgreSQL   Auth     Realtime
               (Data)       (Users)   (Live Updates)
```

## 📁 Project Structure

```
project-purple/
├── .github/workflows/     # CI/CD pipelines
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Library configurations
│   ├── pages/             # Page components
│   ├── types/             # TypeScript types
│   ├── utils/             # Utility functions
│   ├── App.tsx            # App root + routing
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── supabase/
│   ├── config.toml        # Supabase CLI config
│   └── migrations/        # Database migrations
├── DOCUMENT/              # Project documentation
├── .env.example           # Environment template
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔐 Authentication

Supports multiple auth methods via Supabase Auth:
- Email/Password
- Magic Links
- OAuth: Google, GitHub

## 💳 QR Code Payments

- Generate QR codes for payments (mock implementation)
- Real-time status updates via Supabase Realtime
- 5-minute expiration timer
- Transaction history

## 🚀 Deployment

### GitHub Pages (Frontend)
1. Push to `main` → CI runs
2. Tag release `v1.0.0` → Deploy workflow triggers
3. Builds and deploys to `gh-pages` branch

### Supabase (Backend)
- Migrations deployed via `supabase db push`
- Configure secrets in GitHub: `SUPABASE_PROD_REF`, `SUPABASE_PROD_ACCESS_TOKEN`

### Required GitHub Secrets
| Secret | Description |
|--------|-------------|
| `SUPABASE_PROD_URL` | Production Supabase URL |
| `SUPABASE_PROD_ANON_KEY` | Production anon key |
| `SUPABASE_PROD_REF` | Production project ref |
| `SUPABASE_PROD_ACCESS_TOKEN` | Supabase CLI access token |

## 📚 Documentation

See [`DOCUMENT/`](./DOCUMENT/) for:
- [Architecture](./DOCUMENT/architecture/)
- [API Reference](./DOCUMENT/api/)
- [Developer Guide](./DOCUMENT/guides/developer-guide.md)
- [Deployment Guide](./DOCUMENT/deployment/)
- [Requirements](./DOCUMENT/specs/requirements.md)
- [Roadmap](./DOCUMENT/planning/roadmap.md)
- [Decisions (ADRs)](./DOCUMENT/planning/decisions.md)

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite, React Router
- **Backend**: Supabase (PostgreSQL, Auth, Realtime, Storage)
- **Styling**: Custom CSS with CSS Variables
- **Testing**: Vitest
- **CI/CD**: GitHub Actions
- **Hosting**: GitHub Pages + Supabase Cloud

## 📝 License

MIT License - feel free to use for your own projects!