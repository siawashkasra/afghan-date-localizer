# Changelog

## Version 1.3 - Format Update & Dynamic Content (Current)

### 🎯 Changes

1. **New Date Format**
   - Changed from "Day Month Year" to "Year, Month Day"
   - Example: ۱۴۰۳، عقرب ۱۸ (instead of ۱۸ عقرب ۱۴۰۳)
   - Short format: عقرب ۱۷ (instead of ۱۷ عقرب)

2. **Dynamic Content Support**
   - Now works on popups, modals, and dynamically loaded content
   - Uses MutationObserver to watch for DOM changes
   - Automatically converts dates in SPAs (Single Page Applications)
   - Throttled to avoid performance issues

### ✨ Examples

| Input | Old Format | New Format |
|-------|-----------|------------|
| November 9, 2024 | ۱۸ عقرب ۱۴۰۳ | ۱۴۰۳، عقرب ۱۸ |
| Nov 8 | ۱۷ عقرب | عقرب ۱۷ |
| tomorrow | ۱۹ عقرب ۱۴۰۳ | ۱۴۰۳، عقرب ۱۹ |

---

## Version 1.2 - Library-Powered

### 🎯 Major Changes

**Switched to professional libraries for superior date parsing:**

1. **chrono-node** - Natural language date parser
   - Parses 100+ date formats automatically
   - Handles natural language ("tomorrow", "next Friday")
   - Supports relative dates ("in 3 days", "2 weeks ago")
   - Battle-tested by thousands of users

2. **jalaali-js** - Accurate Jalali calendar conversion
   - Proper leap year handling
   - Used by major Persian/Afghan applications
   - Well-maintained and tested

### ✨ New Features

- ✅ Natural language support
  - "tomorrow", "yesterday"
  - "next week", "last month"
  - "next Friday", "last Monday"

- ✅ Relative dates
  - "in 3 days", "2 weeks ago"
  - "3 months from now"

- ✅ 100+ date formats
  - All standard formats
  - Natural language
  - Relative dates
  - Dates with times
  - And many more!

- ✅ Better accuracy
  - Handles ambiguous dates intelligently
  - Context-aware parsing
  - Timezone support

### 🔧 Technical Changes

- Added webpack build system
- Added npm package management
- Source code in `src/` folder
- Built extension in `dist/` folder
- Requires Node.js and build step

### 📊 What's Better

| Feature | Before | After |
|---------|--------|-------|
| Date formats | ~10 | 100+ |
| Natural language | ❌ | ✅ |
| Relative dates | ❌ | ✅ |
| Code complexity | High | Low |
| Maintenance | Manual | Automatic |
| Bundle size | 8 KB | 150 KB |

---

## Version 1.1 - Manual Improvements

### ✅ Fixed Issues

1. **Short dates now work**
   - `Nov 8` → `۱۷ عقرب`
   - `December 15` → `۲۴ قوس`

2. **Day names are handled**
   - `Sunday, November 9, 2025` → `۱۸ عقرب ۱۴۰۴`
   - Day names automatically removed

3. **Format corrected**
   - Both Dari and Pashto use Persian digits
   - Dari: `۱۸ عقرب ۱۴۰۳`
   - Pashto: `۱۸ لړم ۱۴۰۳`

4. **Short format support**
   - Dates without year show short format
   - `Nov 9` → `۱۸ عقرب`

---

## Version 1.0 - Initial Release

### Features

- Convert Gregorian dates to Afghan Solar Hijri
- Support for Dari and Pashto languages
- Multiple date format support
- Works on Chrome, Firefox, Edge, Brave
- Only converts dates after year 2000

---

## Migration Guide

### From v1.1 to v1.2

**What changed:**
- Now requires Node.js and build step
- Extension files moved to `dist/` folder
- Much better date parsing

**How to upgrade:**

1. Install Node.js from https://nodejs.org/
2. Run: `npm install`
3. Run: `npm run build`
4. Load `dist/` folder in browser (not root!)

**Benefits:**
- Parse 100+ date formats
- Natural language support
- Relative dates
- Less maintenance
- More reliable

---

## Future Plans

- [ ] Support for dynamic content (MutationObserver)
- [ ] Bidirectional conversion (Afghan → Gregorian)
- [ ] Custom date format preferences
- [ ] More language options
- [ ] Date picker integration
