# Chrome Installation Guide

## Prerequisites

Install Node.js from https://nodejs.org/ (choose LTS version)

## Quick Install (4 Steps)

### Step 1: Build the Extension

Open terminal in the extension folder and run:

```bash
npm install
npm run build
```

### Step 2: Open Extensions Page

- Open Chrome
- Type `chrome://extensions/` in the address bar
- Press Enter

### Step 3: Enable Developer Mode

- Look at the **top-right corner**
- Find the "Developer mode" toggle
- **Turn it ON** (it should turn blue)

### Step 4: Load the Extension

- Click the **"Load unpacked"** button (top-left)
- A file browser will open
- Navigate to your extension folder
- Select the **`dist/`** folder (important!)
- Click **"Select Folder"**

## ✅ Done!

You should now see:
- "Afghan Date Converter" in your extensions list
- A card showing the extension details
- Status: "Enabled"

## Test It

1. Open `test.html` in Chrome
2. Dates should automatically convert to Afghan format
3. Press **F12** to open Developer Tools
4. Check the **Console** tab for conversion logs

You should see:
```
Afghan Date Converter: Starting with libraries...
Converting dates with language: dari
Converted: November 9, 2024 → ۱۸ عقرب ۱۴۰۳
```

## Configure Settings

1. Click the extension icon in your toolbar
   - If you don't see it, click the puzzle icon (🧩) and pin it
2. Choose your language (Dari or Pashto)
3. Click "Save Settings"
4. Reload any page to see changes

## Common Issues

### "npm: command not found"

**Solution:** Install Node.js from https://nodejs.org/

### "Load unpacked" button is grayed out

**Solution:** Enable Developer mode first (toggle in top-right)

### Extension not showing in toolbar

**Solution:** 
1. Click the puzzle icon (🧩) in toolbar
2. Find "Afghan Date Converter"
3. Click the pin icon to pin it

### Dates not converting

**Solution:**
1. Make sure the extension is enabled
2. Check that dates are after year 2000
3. Reload the page (Ctrl+R)
4. Check console (F12) for errors

### Extension shows errors

**Solution:**
1. Click "Remove" on the extension
2. Rebuild: `npm run build`
3. Try loading it again

### Build fails

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Update the Extension

After making changes:

1. Rebuild:
   ```bash
   npm run build
   ```

2. Go to `chrome://extensions/`
3. Find "Afghan Date Converter"
4. Click the **refresh icon** (🔄)
5. Reload any open pages

## Remove the Extension

1. Go to `chrome://extensions/`
2. Find "Afghan Date Converter"
3. Click **"Remove"**
4. Confirm removal

## Works on These Browsers

- ✅ Google Chrome
- ✅ Microsoft Edge (use `edge://extensions/`)
- ✅ Brave Browser (use `brave://extensions/`)
- ✅ Any Chromium-based browser

## What Gets Converted

The extension converts dates like:
- "November 9, 2024" → "۱۸ عقرب ۱۴۰۳"
- "tomorrow" → "۱۹ عقرب ۱۴۰۳"
- "next Friday" → "۲۲ عقرب ۱۴۰۳"
- "Nov 8" → "۱۷ عقرب"
- "in 3 days" → "۲۱ عقرب ۱۴۰۳"

And 100+ more date formats!

## Need Help?

- Check the Console (F12) for error messages
- Read the full INSTALL.md for detailed troubleshooting
- Open test.html to verify the extension works
- Read README.md for feature documentation
