# Afghan Date Converter

A browser extension for **Chrome, Firefox, Edge, and Brave** that automatically converts Gregorian dates (after year 2000) to Afghan Solar Hijri calendar in Dari or Pashto.

## Features

- ✅ Converts dates after year 2000 only
- ✅ Supports multiple date formats:
  - ISO: 2024-11-09
  - Slash: 2024/11/09
  - Day first: 09/11/2024
  - English months: November 9, 2024 or 9 November 2024
- ✅ Choose between Dari (دری) or Pashto (پښتو)
- ✅ Optional Persian digits for Dari (۱۲۳ instead of 123)
- ✅ Works on all websites
- ✅ Simple and lightweight

## Installation

### For Chrome/Edge/Brave

1. Open Chrome (or Edge/Brave)
2. Go to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top-right)
4. Click **"Load unpacked"**
5. Select the extension folder
6. Done!

### For Firefox

1. Open Firefox
2. Type `about:debugging` in the address bar
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Navigate to the extension folder and select `manifest.json`

**Note:** In Firefox, temporary add-ons are removed when you close the browser.

## Usage

1. After installation, the extension works automatically
2. Click the extension icon to open settings
3. Choose your preferred language (Dari or Pashto)
4. Toggle Persian digits for Dari if desired
5. Click "Save Settings"
6. Reload any page to see the changes

## Testing

Open `test.html` in Firefox to see various date formats being converted.

## Examples

**English Input:** November 9, 2024  
**Dari Output:** ۱۸ عقرب ۱۴۰۳  
**Pashto Output:** 18 لړم 1403

**English Input:** 2024-05-15  
**Dari Output:** ۲۶ ثور ۱۴۰۳  
**Pashto Output:** 26 غویی 1403

## Supported Date Formats

- `2024-11-09` (ISO format)
- `2024/11/09` (Slash format)
- `09/11/2024` (Day first)
- `09-11-2024` (Day first with dash)
- `November 9, 2024` (Full month name)
- `Nov 9, 2024` (Short month name)
- `9 November 2024` (Day first with month name)
- `9th November 2024` (With ordinal)

## Important Notes

- Only dates with Gregorian year **greater than 2000** are converted
- Dates from year 2000 and earlier remain unchanged
- The extension uses the Solar Hijri (Jalali) calendar
- Works on dynamically loaded content

## Month Names

### Dari (دری)
حمل، ثور، جوزا، سرطان، اسد، سنبله، میزان، عقرب، قوس، جدی، دلو، حوت

### Pashto (پښتو)
وری، غویی، غبرګولی، چنګاښ، زمری، وږی، تله، لړم، لیندۍ، مرغومی، سلواغه، کب

## Troubleshooting

1. **Extension not working?**
   - Check if it's enabled in `about:addons`
   - Reload the page after installing
   - Check browser console (F12) for error messages

2. **Dates not converting?**
   - Make sure the date is after year 2000
   - Check if the date format is supported
   - Open console to see conversion logs

3. **Wrong language showing?**
   - Click extension icon and check settings
   - Make sure you clicked "Save Settings"
   - Reload the page after changing settings

## Privacy

This extension:
- ✅ Works completely offline
- ✅ Does not collect any data
- ✅ Does not send data to any server
- ✅ Only modifies text on web pages locally

## License

Free to use and modify.

## Version

1.0 - Initial release
