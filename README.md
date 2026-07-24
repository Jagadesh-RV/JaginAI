# Jagin AI 🧠

**Jagin AI** is an Enterprise Knowledge Intelligence Platform designed to transform how organizations discover, understand, verify, and utilize their knowledge.

Unlike conventional AI chatbots, Jagin AI combines hybrid retrieval, reasoning agents, citation verification, and enterprise integrations to deliver trustworthy answers grounded in organizational knowledge.

## 🌟 Key Features
- **Trust before automation:** Every answer is grounded in verifiable evidence.
- **Hybrid Retrieval:** BM25 keyword search combined with semantic vector search for high precision.
- **Agentic Reasoning:** Specialized collaborative agents (Planner, Retrieval, Verification, Reflection, Memory) to handle complex workflows.
- **Explainable AI:** AI provides confidence scores and explains how conclusions were reached.
- **Enterprise Security & Multi-Tenancy:** RBAC, data isolation, and audit logging by design.

## 🏗️ Architecture & Tech Stack
This project follows a **Modular Monolith** architecture (transitioning to Microservices at scale) and is managed as a monorepo using [Turborepo](https://turbo.build/) and [pnpm](https://pnpm.io/).

- **Frontend:** Next.js, React, Tailwind CSS, Zustand, TanStack Query
- **Backend:** Node.js, NestJS (API), Prisma ORM
- **Database:** PostgreSQL (with `pgvector`), Redis, S3-compatible storage
- **AI Layer:** LangGraph, LlamaIndex, LiteLLM
- **Infrastructure:** Docker, BullMQ, Nginx

## 📂 Monorepo Structure

```text
jagin-ai/
├── apps/               # Applications
│   ├── web/            # Next.js web application
│   ├── api/            # NestJS API
│   ├── worker/         # Background processing
│   └── docs-site/      # Public documentation
├── packages/           # Shared packages
│   ├── ui/             # Shared React components
│   ├── database/       # Prisma schema & client
│   ├── auth/           # Authentication logic
│   ├── ai/             # AI utilities
│   └── config/         # Shared configuration
├── docs/               # Project documentation (Vision, Architecture, etc.)
└── docker/             # Docker compose and infrastructure files
```

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (v8+)
- [Docker](https://www.docker.com/) (for running PostgreSQL and Redis)

### Setup
1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   Copy `.env.example` to `.env.development` and configure your local variables.

3. **Start infrastructure services:**
   ```bash
   docker-compose -f docker/docker-compose.yml up -d
   ```

4. **Run Database Migrations:**
   ```bash
   pnpm --filter @jagin/database run db:push
   ```

5. **Start the development server:**
   ```bash
   pnpm run dev
   ```

## 📚 Documentation
Comprehensive documentation for product vision, architecture, and engineering standards is located in the `docs/` directory.

Please refer to the existing files within `docs/` to learn more about the project's foundational guidelines and blueprints.
