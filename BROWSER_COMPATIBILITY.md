# Browser Compatibility

## Supported Browsers

### ✅ Google Chrome
- **Minimum Version:** 88+
- **Installation:** `chrome://extensions/` → Enable Developer mode → Load unpacked
- **Status:** Fully supported
- **Notes:** Works perfectly with Manifest V3

### ✅ Microsoft Edge
- **Minimum Version:** 88+
- **Installation:** `edge://extensions/` → Enable Developer mode → Load unpacked
- **Status:** Fully supported
- **Notes:** Same as Chrome (Chromium-based)

### ✅ Brave Browser
- **Minimum Version:** 1.20+
- **Installation:** `brave://extensions/` → Enable Developer mode → Load unpacked
- **Status:** Fully supported
- **Notes:** Same as Chrome (Chromium-based)

### ✅ Mozilla Firefox
- **Minimum Version:** 109+
- **Installation:** `about:debugging` → This Firefox → Load Temporary Add-on
- **Status:** Fully supported
- **Notes:** Temporary add-ons removed on browser close

### ✅ Opera
- **Minimum Version:** 74+
- **Installation:** `opera://extensions/` → Enable Developer mode → Load unpacked
- **Status:** Should work (Chromium-based)
- **Notes:** Not officially tested but should work

### ✅ Vivaldi
- **Minimum Version:** 4.0+
- **Installation:** `vivaldi://extensions/` → Enable Developer mode → Load unpacked
- **Status:** Should work (Chromium-based)
- **Notes:** Not officially tested but should work

## Technical Details

### Manifest Version
- **Uses:** Manifest V3
- **Reason:** Maximum compatibility across all modern browsers
- **Benefits:** 
  - Works on Chrome, Edge, Brave out of the box
  - Compatible with Firefox 109+
  - Future-proof (V2 being deprecated)

### Storage API
- **Uses:** `chrome.storage.local`
- **Compatibility:** Works in both Chrome and Firefox
- **Note:** Firefox supports `chrome.*` APIs for compatibility

### Permissions
- `storage` - Save user preferences
- `<all_urls>` - Convert dates on any website

## Feature Compatibility

| Feature | Chrome | Edge | Brave | Firefox | Opera | Vivaldi |
|---------|--------|------|-------|---------|-------|---------|
| Date Conversion | ✅ | ✅ | ✅ | ✅ | ✅* | ✅* |
| Settings Storage | ✅ | ✅ | ✅ | ✅ | ✅* | ✅* |
| Popup Interface | ✅ | ✅ | ✅ | ✅ | ✅* | ✅* |
| Console Logging | ✅ | ✅ | ✅ | ✅ | ✅* | ✅* |
| All Date Formats | ✅ | ✅ | ✅ | ✅ | ✅* | ✅* |

*Not officially tested but expected to work

## Installation Differences

### Chromium-Based (Chrome, Edge, Brave, Opera, Vivaldi)
1. Go to extensions page
2. Enable Developer mode
3. Click "Load unpacked"
4. Select folder
5. **Permanent** until manually removed

### Firefox
1. Go to `about:debugging`
2. Click "This Firefox"
3. Click "Load Temporary Add-on"
4. Select `manifest.json`
5. **Temporary** - removed on browser close

## Known Limitations

### All Browsers
- Only converts dates after year 2000
- Only recognizes English date formats
- Runs once on page load (not on dynamic updates)
- Doesn't convert dates in images

### Firefox Specific
- Temporary add-ons removed when browser closes
- Need to reload extension each time you open Firefox
- For permanent installation, need to sign the extension

### Chrome Specific
- None - works perfectly

## Testing Status

| Browser | Version Tested | Status | Notes |
|---------|---------------|--------|-------|
| Chrome | Latest | ✅ Tested | Fully working |
| Edge | Latest | ✅ Tested | Fully working |
| Brave | Latest | ✅ Tested | Fully working |
| Firefox | Latest | ✅ Tested | Fully working |
| Opera | - | ⚠️ Not tested | Should work |
| Vivaldi | - | ⚠️ Not tested | Should work |

## Recommended Browser

**For Development/Testing:**
- **Chrome** - Best developer tools, permanent installation

**For Daily Use:**
- **Chrome/Edge/Brave** - Permanent installation, no need to reload
- **Firefox** - Need to reload on each browser start

## Future Compatibility

### Manifest V3
- ✅ Already using Manifest V3
- ✅ Future-proof for all browsers
- ✅ No migration needed

### Service Workers
- Current: Uses content scripts (works everywhere)
- Future: Could add service worker for background tasks
- Status: Not needed for current functionality

## Mobile Browsers

### ❌ Chrome Mobile (Android)
- **Status:** Not supported
- **Reason:** Chrome Mobile doesn't support extensions

### ⚠️ Firefox Mobile (Android)
- **Status:** Might work
- **Reason:** Firefox Mobile supports some extensions
- **Note:** Not tested, may require additional configuration

### ❌ Safari (iOS)
- **Status:** Not supported
- **Reason:** Different extension system (Safari Extensions)
- **Note:** Would require complete rewrite

## Publishing

### Chrome Web Store
- **Cost:** $5 one-time developer fee
- **Review Time:** Usually 1-3 days
- **Reaches:** Chrome, Edge, Brave, Opera

### Firefox Add-ons
- **Cost:** Free
- **Review Time:** Usually 3-7 days
- **Reaches:** Firefox only

### Edge Add-ons
- **Cost:** Free
- **Review Time:** Usually 1-3 days
- **Reaches:** Edge only (but can use Chrome Web Store)

## Summary

✅ **Works on all major browsers**  
✅ **No code changes needed**  
✅ **Single codebase for all platforms**  
✅ **Modern Manifest V3**  
✅ **Easy to install and use**

The extension is fully cross-browser compatible and ready to use on Chrome, Edge, Brave, and Firefox without any modifications!
