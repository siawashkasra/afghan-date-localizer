# Installation Guide

## Prerequisites

- **Node.js** 14 or higher (download from https://nodejs.org/)
- **npm** (comes with Node.js)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This installs:
- chrono-node (natural language date parser)
- jalaali-js (Jalali calendar conversion)
- webpack (bundler)

### 2. Build the Extension

```bash
npm run build
```

Or use the build script:
```bash
./build.sh
```

This creates the `dist/` folder with the bundled extension.

### 3. Load in Browser

#### Chrome, Edge, or Brave

1. Open your browser
2. Go to extensions page:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`
3. Enable **"Developer mode"** (toggle in top-right)
4. Click **"Load unpacked"**
5. Select the `dist/` folder
6. Done!

#### Firefox

1. Open Firefox
2. Go to `about:debugging`
3. Click **"This Firefox"** in the left sidebar
4. Click **"Load Temporary Add-on..."**
5. Navigate to the `dist/` folder
6. Select `manifest.json`
7. Done!

**Note:** In Firefox, temporary add-ons are removed when you close the browser.

## Verify Installation

1. Open `test.html` in your browser
2. Dates should be converted automatically
3. Press **F12** to open Developer Console
4. Look for messages like:
   ```
   Afghan Date Converter: Starting with libraries...
   Converting dates with language: dari
   Converted: November 9, 2024 → ۱۸ عقرب ۱۴۰۳
   ```

## Configure Settings

1. Click the extension icon in your toolbar
2. Select your preferred language:
   - **Dari (دری)** - Uses Dari month names
   - **Pashto (پښتو)** - Uses Pashto month names
3. Click **"Save Settings"**
4. Reload any page to see changes

## Test on Real Websites

Try these websites with dates:
- https://www.bbc.com/news
- https://en.wikipedia.org/wiki/2024
- https://www.google.com/search?q=today+date

## Troubleshooting

### "npm: command not found"

**Solution:** Install Node.js from https://nodejs.org/

Choose the LTS (Long Term Support) version.

### Build Fails

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Extension Doesn't Load

**Possible causes:**
1. Loading wrong folder (must be `dist/`, not root)
2. Developer mode not enabled
3. Build didn't complete successfully

**Solution:**
- Make sure you're loading the `dist/` folder
- Check that `dist/contentScript.js` exists
- Enable Developer mode in browser
- Try rebuilding: `npm run build`

### Dates Not Converting

**Check:**
1. Extension is enabled in browser
2. Dates are after year 2000
3. Page has been reloaded after installing
4. Console (F12) for error messages

**Solution:**
- Reload the page (Ctrl+R or Cmd+R)
- Check browser console for errors
- Verify extension is enabled
- Try reinstalling

### Extension Icon Not Showing

**Chrome/Edge/Brave:**
- Click the puzzle icon (🧩) in toolbar
- Find "Afghan Date Converter"
- Click the pin icon to pin it

**Firefox:**
- Right-click toolbar
- Select "Customize Toolbar"
- Drag extension icon to toolbar

## Updating the Extension

After making changes to source files:

1. Rebuild:
   ```bash
   npm run build
   ```

2. Reload extension in browser:
   - **Chrome/Edge/Brave:** Go to extensions page, click refresh icon
   - **Firefox:** Go to `about:debugging`, click "Reload"

3. Reload any open pages

## Development Mode

For development with auto-rebuild:

```bash
npm run dev
```

This watches for file changes and rebuilds automatically.

## Uninstalling

### Chrome/Edge/Brave

1. Go to extensions page
2. Find "Afghan Date Converter"
3. Click **"Remove"**
4. Confirm removal

### Firefox

1. Go to `about:addons`
2. Find "Afghan Date Converter"
3. Click the three dots (...)
4. Click **"Remove"**
5. Confirm removal

## Browser Compatibility

- ✅ **Chrome** (Version 88+)
- ✅ **Microsoft Edge** (Version 88+)
- ✅ **Brave Browser** (Version 1.20+)
- ✅ **Mozilla Firefox** (Version 109+)
- ✅ Any Chromium-based browser

## File Structure

After building, your `dist/` folder should contain:

```
dist/
├── contentScript.js    # Bundled script with libraries
├── manifest.json       # Extension manifest
├── popup.html          # Settings popup
├── popup.js            # Settings logic
└── icons/              # Extension icons
    └── icon-48.png
```

## Privacy & Permissions

This extension requires:
- **Storage:** To save your language preferences
- **All URLs:** To convert dates on any website

The extension:
- ✅ Works completely offline
- ✅ Does not collect any data
- ✅ Does not send data to servers
- ✅ Only modifies text locally in your browser

## Need More Help?

- Read **README.md** for feature documentation
- Read **BUILD.md** for detailed build instructions
- Check browser console (F12) for error messages
- Open **test.html** to verify functionality
