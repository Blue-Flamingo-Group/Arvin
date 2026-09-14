#!/usr/bin/env bash
# Deploy the City of Arvin measure microsite to Vercel (review link for the client).
# Mirrors ~/dev/measure-g. Scope: syronius-projects. Project: arvin-measure.
#
# Production is git-connected: a push to main auto-deploys. This script is the
# manual fallback. The site is LIVE and indexable as of 2026-09-14.
set -euo pipefail
cd "$(dirname "$0")"

vercel --prod --yes

echo "--- verify ---"
URL="$(vercel ls arvin-measure --scope syronius-projects 2>/dev/null | grep -o 'https://[^ ]*' | head -1 || true)"
if [ -n "$URL" ]; then
  curl -s -o /dev/null -w "$URL -> %{http_code}\n" "$URL"
fi
