#!/bin/bash
# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# Change to app directory
cd "$SCRIPT_DIR/app" || {
    echo "Error: Cannot change to app directory"
    echo "Current directory: $(pwd)"
    echo "Script directory: $SCRIPT_DIR"
    exit 1
}
echo "Current working directory: $(pwd)"
echo "Checking for index.html..."
ls -la index.html 2>&1 || echo "WARNING: index.html not found in current directory"
echo "Starting server..."
node server-static.mjs

