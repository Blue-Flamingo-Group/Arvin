#!/usr/bin/env bash
# Deploy the City of Arvin measure microsite to Vercel (review link for the client).
# Mirrors ~/dev/measure-g. Scope: syronius-projects. Project: arvin-measure.
#
# NOTE: this build is noindexed in BOTH index.html (meta robots) and vercel.json
# (X-Robots-Tag). Remove both before any public launch. See README "Go-live".
set -euo pipefail
cd "$(dirname "$0")"

vercel --prod --yes

echo "--- verify ---"
URL="$(vercel ls arvin-measure --scope syronius-projects 2>/dev/null | grep -o 'https://[^ ]*' | head -1 || true)"
if [ -n "$URL" ]; then
  curl -s -o /dev/null -w "$URL -> %{http_code}\n" "$URL"
fi
