#!/bin/bash
echo "Cleaning up..."
pnpm clean
docker-compose -f docker/docker-compose.yml down -v
echo "Clean complete."
