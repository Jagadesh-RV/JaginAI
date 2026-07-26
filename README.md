# Jagin AI 🧠

**Jagin AI** is an Enterprise Knowledge Intelligence Platform designed to transform how organizations discover, understand, verify, and utilize their knowledge. 

Unlike conventional AI chatbots that often hallucinate or provide unverified information, Jagin AI combines **hybrid retrieval**, **reasoning agents**, **citation verification**, and deep **enterprise integrations** to deliver highly trustworthy answers grounded exclusively in your organization's own knowledge base.

---

## 🌟 Key Features

- **Trust before Automation (Zero Hallucination Architecture):** Every answer provided by the AI is strictly grounded in verifiable evidence. Citations are automatically generated and linked to the source documents.
- **Advanced Hybrid Retrieval:** We utilize a two-pronged approach: BM25 for precise keyword matching and dense vector search (semantic search) for contextual understanding, ensuring unparalleled retrieval accuracy.
- **Agentic Reasoning & Collaboration:** Powered by LangGraph, our system features specialized, collaborative agents:
  - *Planner Agent:* Breaks down complex queries into steps.
  - *Retrieval Agent:* Fetches relevant data from various sources.
  - *Verification Agent:* Cross-checks the information against the knowledge base.
  - *Reflection & Memory Agents:* Learns from interactions and maintains context.
- **Explainable AI (XAI):** The platform doesn't just give you an answer; it provides confidence scores and a transparent reasoning trace detailing exactly how conclusions were reached.
- **Enterprise-Grade Security & Multi-Tenancy:** Built with zero-trust principles. Features robust Role-Based Access Control (RBAC), strict data isolation per tenant, and comprehensive audit logging by design.

---

## 🏗️ Architecture & Tech Stack

Jagin AI follows a **Modular Monolith** architecture that allows for rapid development while being fully prepared to transition into microservices as the platform scales. The project is managed as a monorepo leveraging [Turborepo](https://turbo.build/) and [pnpm](https://pnpm.io/).

### 💻 Frontend
- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS
- **State Management:** Zustand, TanStack Query

### ⚙️ Backend
- **Framework:** Node.js with NestJS for a robust, strongly-typed API
- **ORM:** Prisma ORM for type-safe database access

### 🗄️ Database & Storage
- **Primary Database:** PostgreSQL
- **Vector Search:** `pgvector` extension for PostgreSQL
- **Caching & Queues:** Redis (via BullMQ)
- **File Storage:** S3-compatible object storage for document assets

### 🧠 AI Layer
- **Orchestration:** LangGraph for agent workflows
- **Data Framework:** LlamaIndex for RAG pipelines
- **LLM Gateway:** LiteLLM for routing requests to multiple language models securely

### 🚀 Infrastructure & DevOps
- **Containerization:** Docker
- **Task Queues:** BullMQ
- **Reverse Proxy:** Nginx

---

## 📂 Comprehensive Monorepo Structure

Our Turborepo-powered monorepo is organized to maximize code sharing and separation of concerns:

```text
jagin-ai/
├── apps/                    # Core Applications
│   ├── web/                 # Next.js web application (User Interface)
│   ├── api/                 # NestJS API (Core Backend Services)
│   ├── worker/              # Background processing & document ingestion
│   └── docs-site/           # Public-facing documentation site
├── packages/                # Shared Libraries & Internal Packages
│   ├── ai/                  # AI utilities, agent definitions, and prompt templates
│   ├── auth/                # Authentication & authorization logic (Session, RBAC)
│   ├── config/              # Shared configurations (ESLint, TSConfig, Prettier)
│   ├── database/            # Prisma schema, migrations, and database client
│   ├── logger/              # Centralized logging utilities
│   ├── shared/              # Shared utility functions and constants
│   ├── storage/             # S3 storage adapters and file handling
│   ├── types/               # TypeScript interfaces and global type definitions
│   ├── ui/                  # Shared React component library (Tailwind based)
│   └── validation/          # Zod schemas for request/response validation
├── docker/                  # Docker Compose and container infrastructure files
├── docs/                    # Project documentation (Vision, Architecture, etc.)
├── infrastructure/          # Infrastructure as Code (Terraform/Pulumi)
├── scripts/                 # Utility scripts for CI/CD and local development
├── services/                # External service adapters
├── tests/                   # End-to-End (E2E) and integration test suites
└── tools/                   # Internal CLI tools for developer productivity
```

---

## 🚀 Getting Started

Follow these instructions to set up Jagin AI on your local machine for development and testing.

### Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v20+ recommended)
- [pnpm](https://pnpm.io/) (v9+)
- [Docker & Docker Compose](https://www.docker.com/) (Required for local PostgreSQL and Redis)
- Git

### Local Development Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-org/jagin-ai.git
   cd jagin-ai
   ```

2. **Install Dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**
   ```bash
   cp .env.example .env.development
   # Open .env.development and configure necessary keys (e.g., OpenAI API Key, DB URIs)
   ```

4. **Spin up Infrastructure Services (DB, Redis):**
   ```bash
   docker-compose -f docker/docker-compose.yml up -d
   ```

5. **Run Database Migrations:**
   Ensure the database is initialized with the correct schema.
   ```bash
   pnpm --filter @jagin/database run db:push
   ```
   *Note: For production, use `db:migrate` instead.*

6. **Start the Development Server:**
   This command uses Turborepo to start the web app, API, and worker concurrently.
   ```bash
   pnpm run dev
   ```

The Web UI will typically be accessible at `http://localhost:3000` and the API at `http://localhost:3001`.

---

## 🛠️ Development Workflow

We use standard Turborepo commands to manage the workspace. Here are the most common commands you will use:

- `pnpm run dev`: Start all apps in development mode.
- `pnpm run build`: Build all applications and packages for production.
- `pnpm run lint`: Run ESLint across all packages and apps.
- `pnpm run test`: Run the test suite (Jest/Vitest).
- `pnpm run typecheck`: Run TypeScript compiler checks.
- `pnpm run format`: Format codebase using Prettier.
- `pnpm run clean`: Clean up build artifacts and `node_modules`.

### Code Quality Tools
This project strictly enforces code quality using Husky, Commitlint, ESLint, and Prettier. Ensure your commits follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

---

## 📚 Documentation & Resources

For a deep dive into the project's vision, design decisions, and architectural blueprints, please refer to the `docs/` directory:

- [Product Vision](docs/vision.md)
- [System Architecture](docs/architecture.md)
- [AI Agent Workflows](docs/ai-workflows.md)
- [Engineering Standards](docs/engineering-standards.md)

---

## 🤝 Contributing

We welcome contributions! Please follow our branching strategy:
- `main` is the stable production branch.
- `develop` is the active development branch.
- Feature branches should be created from `develop` and follow the naming convention `feature/<issue-id>-<short-description>`.

Before creating a Pull Request, please ensure that all tests pass (`pnpm run test`) and the linter shows no errors (`pnpm run lint`).

---

## 📄 License

Copyright © 2026 Jagin AI. All rights reserved.
