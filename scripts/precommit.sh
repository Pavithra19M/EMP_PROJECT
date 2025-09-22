#!/bin/bash
set -e
echo "🔍 Running frontend checks..."
cd frontend
npm run lint
npm run test:coverage
echo "🔍 Running backend checks..."
cd ../backend
npm run lint
npm run test:coverage
echo "✅ All checks passed. Ready to commit!"