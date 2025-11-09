#!/bin/bash

echo "🔨 Building Afghan Date Converter..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build with webpack
echo "⚙️  Building with webpack..."
npm run build

# Create dist directory if it doesn't exist
mkdir -p dist

# Copy necessary files
echo "📋 Copying files to dist/..."
cp manifest.json dist/
cp popup.html dist/
cp popup.js dist/
cp -r icons dist/ 2>/dev/null || echo "⚠️  Icons folder not found, skipping..."

echo "✅ Build complete! Extension is in the dist/ folder"
echo ""
echo "📍 Next steps:"
echo "   1. Go to chrome://extensions/ (or about:debugging for Firefox)"
echo "   2. Enable Developer mode"
echo "   3. Click 'Load unpacked' and select the dist/ folder"
echo ""
echo "🎉 Done!"
