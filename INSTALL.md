# Installation Guide

## For Chrome, Edge, and Brave

### Step-by-Step Installation

1. **Open Extensions Page**
   - Chrome: Go to `chrome://extensions/`
   - Edge: Go to `edge://extensions/`
   - Brave: Go to `brave://extensions/`

2. **Enable Developer Mode**
   - Look for a toggle switch in the top-right corner
   - Turn ON "Developer mode"

3. **Load the Extension**
   - Click the **"Load unpacked"** button
   - Navigate to your extension folder
   - Select the folder (not a specific file)
   - Click "Select Folder" or "Open"

4. **Verify Installation**
   - You should see "Afghan Date Converter" in your extensions list
   - The extension icon should appear in your toolbar
   - Status should show "Enabled"

5. **Test It**
   - Open `test.html` in your browser
   - Dates should be converted automatically
   - Press F12 to see console logs

---

## For Firefox

### Method 1: Temporary Installation (Recommended for Testing)

1. **Open Debugging Page**
   - Type `about:debugging` in the address bar
   - Press Enter

2. **Load Temporary Add-on**
   - Click **"This Firefox"** in the left sidebar
   - Click **"Load Temporary Add-on..."** button
   - Navigate to your extension folder
   - Select the `manifest.json` file
   - Click "Open"

3. **Verify Installation**
   - The extension should appear in the list
   - Check for any error messages

4. **Test It**
   - Open `test.html` in Firefox
   - Dates should be converted
   - Press Ctrl+Shift+J to see console logs

**Note:** Temporary add-ons are removed when Firefox closes.

### Method 2: Permanent Installation (Advanced)

1. **Prepare the Extension**
   - Zip all extension files
   - Rename from `.zip` to `.xpi`

2. **Disable Signature Requirement**
   - Type `about:config` in address bar
   - Search for `xpinstall.signatures.required`
   - Set to `false`

3. **Install**
   - Drag and drop the `.xpi` file into Firefox
   - Click "Add" when prompted

---

## Testing the Extension

### Quick Test

1. Open `test.html` in your browser
2. You should see dates converted to Afghan format
3. Examples:
   - `2024-11-09` → `۱۸ عقرب ۱۴۰۳` (Dari)
   - `November 9, 2024` → `18 لړم 1403` (Pashto)

### Check Console Logs

1. Press F12 (or Ctrl+Shift+J in Firefox)
2. Go to the Console tab
3. Look for messages like:
   ```
   Afghan Date Converter: Starting...
   Converting dates with language: dari
   Converted: 2024-11-09 → ۱۸ عقرب ۱۴۰۳
   Conversion complete. Processed X text nodes.
   ```

### Test on Real Websites

Try these sites with dates:
- https://www.bbc.com/news
- https://en.wikipedia.org/wiki/2024
- https://www.google.com/search?q=today+date

---

## Configuring the Extension

### Change Language Settings

1. **Open Settings**
   - Click the extension icon in your toolbar
   - Or go to extensions page and click "Details" → "Extension options"

2. **Select Language**
   - Choose **Dari (دری)** or **Pashto (پښتو)**

3. **Toggle Persian Digits** (Dari only)
   - Check the box to use ۱۲۳ instead of 123
   - Uncheck to use standard digits

4. **Save**
   - Click "Save Settings"
   - Reload any page to see changes

---

## Troubleshooting

### Extension Not Loading

**Chrome/Edge/Brave:**
- Make sure Developer mode is enabled
- Check for error messages in red
- Try reloading the extension (click refresh icon)

**Firefox:**
- Make sure you selected `manifest.json`
- Check `about:debugging` for errors
- Try loading again

### Dates Not Converting

1. **Check if extension is enabled**
   - Go to extensions page
   - Make sure it's turned ON

2. **Verify date format**
   - Only dates after year 2000 are converted
   - Check supported formats in README.md

3. **Check console**
   - Press F12
   - Look for error messages
   - Verify "Afghan Date Converter: Starting..." appears

4. **Reload the page**
   - Press Ctrl+R or Cmd+R
   - Extension runs on page load

### Settings Not Saving

1. **Check storage permissions**
   - Extension should have "storage" permission
   - Reinstall if needed

2. **Try again**
   - Click Save Settings
   - Wait for confirmation message
   - Reload a test page

### Extension Icon Not Showing

**Chrome/Edge/Brave:**
- Click the puzzle icon in toolbar
- Pin "Afghan Date Converter"

**Firefox:**
- Right-click toolbar
- Select "Customize Toolbar"
- Drag extension icon to toolbar

---

## Updating the Extension

### Chrome/Edge/Brave

1. Make changes to extension files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Reload any open pages

### Firefox

1. Make changes to extension files
2. Go to `about:debugging`
3. Click "Reload" next to the extension
4. Reload any open pages

---

## Uninstalling

### Chrome/Edge/Brave

1. Go to `chrome://extensions/`
2. Find "Afghan Date Converter"
3. Click "Remove"
4. Confirm removal

### Firefox

1. Go to `about:addons`
2. Find "Afghan Date Converter"
3. Click the three dots (...)
4. Click "Remove"
5. Confirm removal

---

## Advanced: Publishing the Extension

### Chrome Web Store

1. Create a developer account ($5 fee)
2. Zip the extension files
3. Upload to Chrome Web Store
4. Fill in details and submit for review

### Firefox Add-ons

1. Create an account at addons.mozilla.org
2. Zip the extension files
3. Submit for review
4. Wait for approval (can take a few days)

---

## Need More Help?

- Check the browser console for errors (F12)
- Read README.md for feature documentation
- Read HOW_IT_WORKS.md for technical details
- Open `test.html` to verify functionality

---

## System Requirements

- **Chrome:** Version 88 or higher
- **Edge:** Version 88 or higher
- **Brave:** Version 1.20 or higher
- **Firefox:** Version 109 or higher (for Manifest V3 support)

---

## Privacy & Permissions

This extension requires:
- **Storage:** To save your language preferences
- **All URLs:** To convert dates on any website

The extension:
- ✅ Works completely offline
- ✅ Does not collect any data
- ✅ Does not send data to servers
- ✅ Only modifies text locally in your browser
