# Afghan Date Localizer

Chrome extension that detects Gregorian, Jalali (Persian), and Hijri numeric dates on pages and converts them visually to Afghan Solar Hijri (Dari or Pashto).

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
- Click the extension icon → Options to choose `Dari` or `Pashto` and other settings (or go to the extension options page).

## Limitations

- Very rare date formats may not be detected.
- Hijri conversion uses the arithmetic (tabular) algorithm.
- If you want perfect coverage for every locale/format, bundling libraries such as chrono-node and a maintained Hijri library is recommended.

## Next steps (optional)

- Replace the internal parsers with `chrono-node` for broader natural-language parsing (requires bundler).
- Use official Umm al-Qura calendar tables for Hijri conversions if precise regional accuracy is required.
