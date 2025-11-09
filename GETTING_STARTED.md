# Getting Started with Afghan Date Converter

## What is This?

A browser extension that automatically converts dates to Afghan Solar Hijri calendar in Dari or Pashto.

**Powered by:**
- **chrono-node** - Parses 100+ date formats
- **jalaali-js** - Accurate calendar conversion

## Quick Start (5 Minutes)

### 1. Install Node.js

Download from: https://nodejs.org/

Choose the **LTS** (Long Term Support) version.

### 2. Build the Extension

Open terminal in this folder and run:

```bash
npm install
npm run build
```

Wait for it to complete. You should see a `dist/` folder created.

### 3. Load in Browser

**Chrome/Edge/Brave:**
```
1. Go to: chrome://extensions/
2. Enable "Developer mode" (top-right toggle)
3. Click "Load unpacked"
4. Select the dist/ folder
```

**Firefox:**
```
1. Go to: about:debugging
2. Click "This Firefox"
3. Click "Load Temporary Add-on"
4. Select dist/manifest.json
```

### 4. Test It

Open `test.html` in your browser. Dates should convert automatically!

## What It Can Do

**Format:** Year, Month Day (e.g., ۱۸ عقرب ۱۴۰۳)

### Natural Language
```
Input:  tomorrow
Output: ۱۹ عقرب ۱۴۰۳

Input:  next Friday
Output: ۲۲ عقرب ۱۴۰۳
```

### Relative Dates
```
Input:  in 3 days
Output: ۲۱ عقرب ۱۴۰۳

Input:  2 weeks ago
Output: ۱۴۰۳، عقرب ۴
```

### Standard Formats
```
Input:  November 9, 2024
Output: ۱۸ عقرب ۱۴۰۳

Input:  2024-11-09
Output: ۱۸ عقرب ۱۴۰۳

Input:  Nov 8
Output: ۱۷ عقرب
```

### With Day Names
```
Input:  Sunday, November 9, 2025
Output: ۱۴۰۴، عقرب ۱۸
```

And 100+ more formats!

## Configuration

1. Click the extension icon
2. Choose language:
   - **Dari (دری)** - Uses Dari month names
   - **Pashto (پښتو)** - Uses Pashto month names
3. Click "Save Settings"
4. Reload any page

Both languages use Persian digits (۱۲۳).

## File Structure

```
afghan-date-converter/
├── src/
│   └── contentScript.js    # Source code
├── dist/                    # Built extension (created by npm run build)
│   ├── contentScript.js    # Bundled with libraries
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   └── icons/
├── package.json             # Dependencies
├── webpack.config.js        # Build configuration
├── build.sh                 # Build script
└── test.html                # Test page
```

## Development

### Make Changes

1. Edit files in `src/` folder
2. Rebuild: `npm run build`
3. Reload extension in browser
4. Refresh any open pages

### Watch Mode

For automatic rebuilding:

```bash
npm run dev
```

This watches for changes and rebuilds automatically.

## Troubleshooting

### "npm: command not found"

Install Node.js from https://nodejs.org/

### Build Fails

```bash
rm -rf node_modules
npm install
npm run build
```

### Extension Doesn't Load

- Make sure you're loading the `dist/` folder (not root)
- Check that `dist/contentScript.js` exists
- Enable Developer mode in browser

### Dates Not Converting

1. Check console (F12) for errors
2. Make sure dates are after year 2000
3. Reload the page
4. Verify extension is enabled

## Documentation

- **START_HERE.txt** - Quick overview
- **README.md** - Full documentation
- **BUILD.md** - Build instructions
- **INSTALL.md** - Installation guide
- **CHROME_INSTALL.md** - Chrome-specific guide
- **CHANGELOG.md** - Version history

## Libraries Used

### chrono-node
- **What:** Natural language date parser
- **Why:** Handles 100+ date formats automatically
- **GitHub:** https://github.com/wanasit/chrono

### jalaali-js
- **What:** Gregorian ↔ Jalali conversion
- **Why:** Accurate calendar conversion with leap years
- **GitHub:** https://github.com/jalaali/jalaali-js

## Browser Support

- ✅ Chrome 88+
- ✅ Edge 88+
- ✅ Brave 1.20+
- ✅ Firefox 109+

## Privacy

- ✅ Works offline
- ✅ No data collection
- ✅ No external servers
- ✅ Local processing only

## Next Steps

1. ✅ Build the extension
2. ✅ Load in browser
3. ✅ Test with test.html
4. ✅ Configure language
5. ✅ Browse the web!

## Need Help?

- Check console (F12) for errors
- Read INSTALL.md for detailed troubleshooting
- Open test.html to verify functionality
- Read README.md for features

## Contributing

Feel free to:
- Report bugs
- Suggest features
- Submit improvements
- Share with others

## License

Free to use and modify.

---

**Enjoy converting dates to Afghan calendar! 🎉**
