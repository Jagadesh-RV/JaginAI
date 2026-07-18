#!/bin/bash
echo "Setting up Jagin AI development environment..."
pnpm install
cp .env.example .env.development
docker-compose -f docker/docker-compose.yml up -d
echo "Setup complete."
