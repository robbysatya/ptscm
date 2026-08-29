#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="${1:-${DEPLOY_PATH:-/home/your_cpanel_user/public_html}}"

if [ ! -d "$PROJECT_ROOT" ]; then
  echo "Target folder not found: $PROJECT_ROOT"
  exit 1
fi

cd "$PROJECT_ROOT"

echo "==> Deploying Laravel app in $PROJECT_ROOT"

export NODE_ENV=production
export APP_ENV=production

if [ -f composer.lock ]; then
  echo "==> Installing PHP dependencies"
  composer install --no-interaction --prefer-dist --no-progress --no-ansi --no-dev
fi

if [ -f package-lock.json ]; then
  echo "==> Installing Node dependencies"
  npm ci --no-audit --no-fund
elif [ -f pnpm-lock.yaml ]; then
  echo "==> Installing Node dependencies with pnpm"
  corepack enable
  pnpm install --frozen-lockfile
elif [ -f yarn.lock ]; then
  echo "==> Installing Node dependencies with yarn"
  yarn install --frozen-lockfile
fi

if [ -f package.json ]; then
  echo "==> Building frontend assets"
  npm run build || pnpm run build || yarn build
fi

if [ -f artisan ]; then
  echo "==> Laravel optimization"
  php artisan config:clear || true
  php artisan route:clear || true
  php artisan view:clear || true
  php artisan cache:clear || true
  php artisan storage:link || true
  php artisan config:cache
  php artisan route:cache
  php artisan view:cache
  php artisan optimize

  if [ -f .env.production ] && [ ! -f .env ]; then
    cp .env.production .env
  fi

  php artisan migrate --force || true
fi

echo "==> Deployment finished successfully"
