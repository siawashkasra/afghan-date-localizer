# Chrome Installation Guide

## Quick Install (3 Steps)

### Step 1: Open Extensions Page
- Open Chrome
- Type `chrome://extensions/` in the address bar
- Press Enter

### Step 2: Enable Developer Mode
- Look at the **top-right corner**
- Find the "Developer mode" toggle
- **Turn it ON** (it should turn blue)

### Step 3: Load the Extension
- Click the **"Load unpacked"** button (top-left)
- A file browser will open
- Navigate to your extension folder
- Select the folder containing `manifest.json`
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
Afghan Date Converter: Starting...
Converting dates with language: dari
Converted: 2024-11-09 → ۱۸ عقرب ۱۴۰۳
```

## Configure Settings

1. Click the extension icon in your toolbar
   - If you don't see it, click the puzzle icon and pin it
2. Choose your language (Dari or Pashto)
3. Toggle Persian digits if desired
4. Click "Save Settings"
5. Reload any page to see changes

## Common Issues

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
2. Reload the extension folder
3. Try loading it again

## Update the Extension

After making changes:
1. Go to `chrome://extensions/`
2. Find "Afghan Date Converter"
3. Click the **refresh icon** (🔄)
4. Reload any open pages

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

## Need Help?

- Check the Console (F12) for error messages
- Read the full INSTALL.md for detailed troubleshooting
- Open test.html to verify the extension works
