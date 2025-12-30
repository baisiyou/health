#!/bin/bash
set -e  # Exit on error

echo "🚀 Starting Frontend server..."
echo "📂 Current directory: $(pwd)"

# Change to app directory
if [ -d "app" ]; then
    echo "📁 Found app directory, changing to it..."
    cd app
elif [ -f "server-static.mjs" ]; then
    echo "✅ Already in app directory (server-static.mjs found)"
else
    echo "❌ Error: Cannot find app directory or server-static.mjs"
    echo "Current directory contents:"
    ls -la
    exit 1
fi

echo "📂 Working directory: $(pwd)"
echo "📄 Checking for index.html..."
if [ -f "index.html" ]; then
    echo "✅ index.html found"
    ls -lh index.html
else
    echo "❌ WARNING: index.html not found!"
    echo "Current directory contents:"
    ls -la | head -20
fi

echo "🚀 Starting Node.js server..."
node server-static.mjs

