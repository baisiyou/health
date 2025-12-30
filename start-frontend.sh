#!/bin/bash
cd "$(dirname "$0")/app" || exit 1
pwd
ls -la index.html 2>&1 || echo "index.html not found in current directory"
node server-static.mjs

