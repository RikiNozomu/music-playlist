#!/bin/sh
set -e

# Run Prisma migrate
echo "Running Prisma migrations..."
npx prisma migrate deploy

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Execute the main container command
exec "$@"