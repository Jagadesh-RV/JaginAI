# Jagin AI

Jagin AI is an enterprise-grade AI Knowledge Intelligence Platform.

## Architecture

This project is structured as a monorepo using [Turborepo](https://turbo.build/) and [pnpm workspaces](https://pnpm.io/).

### Apps
- `web`: Next.js frontend
- `api`: Node.js backend services
- `worker`: Background job processing
- `admin`: Internal administration panel

### Packages
- `@jagin/ui`: Shared React components
- `@jagin/logger`: Shared Pino logger
- `@jagin/config`: Environment configuration
- `@jagin/validation`: Zod schemas
- `@jagin/types`: Shared TypeScript types

## Prerequisites
- Node.js >= 20.0.0
- pnpm >= 9.0.0
- Docker

## Getting Started

1. **Install dependencies**
   ```bash
   pnpm install
   ```
2. **Setup environment**
   Copy `.env.example` to `.env.development`.
3. **Start local infrastructure**
   ```bash
   docker-compose -f docker/docker-compose.yml up -d
   ```
4. **Run development server**
   ```bash
   pnpm dev
   ```
