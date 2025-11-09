# Afghan Date Localizer

Chrome extension that detects Gregorian, Jalali (Persian), and Hijri numeric dates on pages and converts them visually to Afghan Solar Hijri (Dari or Pashto).

**Important**: Only dates with Gregorian year greater than 2000 are converted.

## Install locally (developer mode)

1. Save the project folder `afghan-date-localizer/` with these files:

   - manifest.json
   - src/contentScript.js
   - src/options.html
   - src/options.js
   - icons/icon-48.png (create or paste an icon)

2. Open Chrome and go to `chrome://extensions`.
3. Enable **Developer mode** (top-right).
4. Click **Load unpacked** and select the project folder.

## Usage

- After load, open any page containing dates and the extension will attempt to convert date text.
- Click the extension icon → Options to choose `Dari (fa-AF)` or `Pashto (ps-AF)` and other settings.
- Only dates after year 2000 (Gregorian) will be converted.

## Supported Date Formats

- ISO format: 2024-11-09, 2024/11/09
- Day-first format: 09/11/2024, 09-11-2024
- English month names: November 9, 2024 or 9 Nov 2024
- Jalali dates: 1403/08/18 (converted if equivalent to post-2000 Gregorian)
- Hijri dates: 1446/05/07 (converted if equivalent to post-2000 Gregorian)
- Persian/Arabic digits are automatically recognized

## Limitations

- Very rare date formats may not be detected.
- Hijri conversion uses the arithmetic (tabular) algorithm.
- Only dates after year 2000 (Gregorian calendar) are converted.

## Next steps (optional)

- Replace the internal parsers with `chrono-node` for broader natural-language parsing (requires bundler).
- Use official Umm al-Qura calendar tables for Hijri conversions if precise regional accuracy is required.
