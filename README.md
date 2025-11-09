# Afghan Date Converter

A browser extension for **Chrome, Firefox, Edge, and Brave** that automatically converts Gregorian dates (after year 2000) to Afghan Solar Hijri calendar in Dari or Pashto.

Uses **chrono-node** for superior date parsing and **jalaali-js** for accurate calendar conversion.

## Features

- ✅ Converts dates after year 2000
- ✅ Supports 100+ date formats automatically
- ✅ Natural language support ("tomorrow", "next Friday")
- ✅ Relative dates ("in 3 days", "2 weeks ago")
- ✅ Choose between Dari (دری) or Pashto (پښتو)
- ✅ Always uses Persian digits (۱۲۳) for both languages
- ✅ Format: Day-(MonthName), Year (e.g., ۱۸-(عقرب)، ۱۴۰۳)
- ✅ Handles day names (e.g., "Sunday, November 9, 2025")
- ✅ Works on dynamic content (popups, modals, SPAs)
- ✅ Works on all websites
- ✅ Battle-tested libraries

## Quick Start

### Prerequisites
- Node.js 14+ (download from https://nodejs.org/)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Build the extension
npm run build

# 3. Load in browser (see below)
```

### Load in Browser

**Chrome/Edge/Brave:**
1. Go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right)
3. Click **"Load unpacked"**
4. Select the `dist/` folder

**Firefox:**
1. Go to `about:debugging`
2. Click **"This Firefox"**
3. Click **"Load Temporary Add-on"**
4. Select `dist/manifest.json`

## Usage

1. After installation, the extension works automatically
2. Click the extension icon to open settings
3. Choose your preferred language (Dari or Pashto)
4. Click "Save Settings"
5. Reload any page to see the changes

**Note:** Both Dari and Pashto always use Persian digits (۱۲۳) for consistency.

## Examples

**Format:** Day-(MonthName), Year (e.g., ۱۸-(عقرب)، ۱۴۰۳)  
**Note:** Month name in parentheses, no month digit

**English Input:** November 9, 2024  
**Dari Output:** ۱۸-(عقرب)، ۱۴۰۳  
**Pashto Output:** ۱۸-(لړم)، ۱۴۰۳

**English Input:** tomorrow  
**Dari Output:** ۱۹-(عقرب)، ۱۴۰۳  
**Pashto Output:** ۱۹-(لړم)، ۱۴۰۳

**English Input:** next Friday  
**Dari Output:** ۲۲-(عقرب)، ۱۴۰۳  
**Pashto Output:** ۲۲-(لړم)، ۱۴۰۳

**English Input:** Nov 8 (short format)  
**Dari Output:** ۱۷-(عقرب)  
**Pashto Output:** ۱۷-(لړم)

**English Input:** in 3 days  
**Dari Output:** ۲۱-(عقرب)، ۱۴۰۳  
**Pashto Output:** ۲۱-(لړم)، ۱۴۰۳

**English Input:** Sunday, November 9, 2025  
**Dari Output:** ۱۸-(عقرب)، ۱۴۰۴  
**Pashto Output:** ۱۸-(لړم)، ۱۴۰۴

## Supported Date Formats

Thanks to **chrono-node**, the extension understands:

### Natural Language
- "tomorrow", "yesterday"
- "next week", "last month"
- "next Friday", "last Monday"

### Relative Dates
- "in 3 days", "2 weeks ago"
- "3 months from now"

### Standard Formats
- `2024-11-09` (ISO format)
- `2024/11/09` (Slash format)
- `09/11/2024` (Day first)
- `09-11-2024` (Day first with dash)
- `November 9, 2024` (Full month name)
- `Nov 9, 2024` (Short month name)
- `9 November 2024` (Day first with month name)
- `9th November 2024` (With ordinal)
- `Sunday, November 9, 2024` (With day name)

### Short Formats (Without Year)
- `Nov 8` (Short month)
- `November 8` (Full month)
- `8 Nov` (Day first)
- `8 November` (Day first, full month)

### With Time
- `Nov 8 at 3pm`
- `November 8, 2024 10:30 AM`
- `2024-11-09T14:30:00`

And many more! chrono-node handles 100+ date formats automatically.

## Testing

Open `test.html` in your browser to see various date formats being converted.

## Month Names

### Dari (دری)
حمل، ثور، جوزا، سرطان، اسد، سنبله، میزان، عقرب، قوس، جدی، دلو، حوت

### Pashto (پښتو)
وری، غویی، غبرګولی، چنګاښ، زمری، وږی، تله، لړم، لیندۍ، مرغومی، سلواغه، کب

## Libraries Used

### chrono-node
Natural language date parser that understands human-readable dates.
- GitHub: https://github.com/wanasit/chrono
- Handles 100+ date formats
- Battle-tested by thousands of users

### jalaali-js
Accurate Gregorian ↔ Jalali calendar conversion.
- GitHub: https://github.com/jalaali/jalaali-js
- Proper leap year handling
- Used by major Persian/Afghan applications

## Development

### Watch Mode
```bash
npm run dev
```

Automatically rebuilds when you change files.

### Clean Build
```bash
npm run clean
npm install
npm run build
```

### Update Libraries
```bash
npm update
npm run build
```

## Troubleshooting

### "npm: command not found"
Install Node.js from https://nodejs.org/

### Build fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Extension doesn't load
- Make sure you're loading the `dist/` folder (not root)
- Check for errors in the browser console (F12)

### Dates not converting
1. Check console (F12) for error messages
2. Make sure dates are after year 2000
3. Reload the page after installing

## Important Notes

- Only dates with Gregorian year **greater than 2000** are converted
- Dates from year 2000 and earlier remain unchanged
- **Times are NOT converted** (e.g., "00:15", "3:30 PM" remain unchanged)
- Only actual dates are converted
- The extension uses the Solar Hijri (Jalali) calendar
- Works on dynamically loaded content

## Privacy

This extension:
- ✅ Works completely offline
- ✅ Does not collect any data
- ✅ Does not send data to any server
- ✅ Only modifies text on web pages locally

## Browser Compatibility

- ✅ **Google Chrome** (Version 88+)
- ✅ **Microsoft Edge** (Version 88+)
- ✅ **Brave Browser** (Version 1.20+)
- ✅ **Mozilla Firefox** (Version 109+)
- ✅ Any Chromium-based browser

## File Structure

```
afghan-date-converter/
├── src/
│   └── contentScript.js    # Source with library imports
├── dist/                    # Built extension (load this)
│   ├── contentScript.js    # Bundled
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   └── icons/
├── package.json
├── webpack.config.js
├── build.sh                 # Build script
└── README.md
```

## License

Free to use and modify.

## Version

1.1 - Library-powered version with chrono-node and jalaali-js

## Credits

- **chrono-node** by Wanasit Tanakitrungruang
- **jalaali-js** by Jalaali community
