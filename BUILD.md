# Build Instructions

This extension now uses libraries for better date parsing and conversion:
- **chrono-node**: Natural language date parsing
- **jalaali-js**: Accurate Gregorian to Jalali conversion

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Build Steps

### 1. Install Dependencies

```bash
npm install
```

This will install:
- chrono-node (date parsing)
- jalaali-js (Jalali calendar conversion)
- webpack (bundler)

### 2. Build the Extension

```bash
npm run build
```

This creates a bundled `contentScript.js` in the `dist/` folder.

### 3. Copy Files to dist/

The build process creates `dist/contentScript.js`. You also need to copy:

```bash
cp manifest.json dist/
cp popup.html dist/
cp popup.js dist/
cp -r icons dist/
```

Or use this one-liner:

```bash
npm run build && cp manifest.json popup.html popup.js dist/ && cp -r icons dist/
```

### 4. Load the Extension

**Chrome/Edge/Brave:**
1. Go to `chrome://extensions/`
2. Enable Developer mode
3. Click "Load unpacked"
4. Select the `dist/` folder

**Firefox:**
1. Go to `about:debugging`
2. Click "This Firefox"
3. Click "Load Temporary Add-on"
4. Select `dist/manifest.json`

## Development Mode

For development with auto-rebuild:

```bash
npm run dev
```

This watches for changes and rebuilds automatically.

## Why Use Libraries?

### chrono-node Benefits:
- ✅ Parses natural language dates ("next Friday", "in 3 days")
- ✅ Handles ambiguous dates intelligently
- ✅ Supports multiple date formats automatically
- ✅ Handles timezones and relative dates
- ✅ Battle-tested with thousands of edge cases

### jalaali-js Benefits:
- ✅ Accurate Jalali calendar conversion
- ✅ Handles leap years correctly
- ✅ Well-maintained and tested
- ✅ Used by many Persian/Afghan applications

## File Structure

```
afghan-date-converter/
├── src/
│   └── contentScript.js    (source with imports)
├── dist/                    (built extension)
│   ├── contentScript.js    (bundled)
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   └── icons/
├── package.json
├── webpack.config.js
└── BUILD.md
```

## Troubleshooting

### "npm: command not found"
Install Node.js from https://nodejs.org/

### Build fails
Try:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Extension doesn't load
Make sure you're loading the `dist/` folder, not the root folder.

## Without Building (Simple Version)

If you don't want to use the build system, the original `contentScript.js` in the root folder still works without libraries. It has manual date parsing but covers most common cases.

To use the simple version:
1. Use the files in the root folder (not `dist/`)
2. Load the extension from the root folder
3. No build step needed

## Updating the Extension

After making changes:

1. Edit files in `src/`
2. Run `npm run build`
3. Reload extension in browser
4. Refresh any open pages

## Production Build

The default build is already optimized for production:
- Minified code
- Tree-shaking (removes unused code)
- Optimized bundle size

## Bundle Size

- Without libraries: ~8 KB
- With libraries: ~150 KB (chrono-node is large but powerful)

The trade-off is worth it for much better date detection!
