# How Afghan Date Converter Works

## Overview

This extension scans web pages for dates in Gregorian calendar format and converts them to Afghan Solar Hijri (Jalali) calendar with Dari or Pashto month names.

## Conversion Process

### Step 1: Page Load
When a page loads, the extension:
1. Waits for the page to finish loading
2. Retrieves user settings (language preference)
3. Starts scanning the page

### Step 2: Text Scanning
The extension:
1. Walks through all text nodes in the page
2. Skips script tags, style tags, and input fields
3. Looks for date patterns in the text

### Step 3: Date Detection
Recognizes these formats:
- **ISO Format**: 2024-11-09
- **Slash Format**: 2024/11/09 or 09/11/2024
- **Dash Format**: 09-11-2024
- **English Months**: November 9, 2024 or 9 November 2024
- **Short Months**: Nov 9, 2024 or 9 Nov 2024
- **With Ordinals**: 9th November 2024

### Step 4: Year Filtering
- Extracts the year from the date
- **Only processes dates where year > 2000**
- Ignores dates from 2000 and earlier

### Step 5: Calendar Conversion
Uses the Gregorian to Jalali conversion algorithm:
1. Takes Gregorian date (year, month, day)
2. Converts to Jalali date using mathematical formula
3. Returns Jalali year, month number, and day

### Step 6: Formatting
Formats the date based on settings:

**For Dari:**
- Uses Dari month names: حمل، ثور، جوزا، etc.
- Optionally converts digits to Persian: ۱۲۳
- Format: `۱۸ عقرب ۱۴۰۳`

**For Pashto:**
- Uses Pashto month names: وری، غویی، غبرګولی، etc.
- Uses standard digits: 123
- Format: `18 لړم 1403`

### Step 7: Replacement
- Replaces the original date text with the Afghan format
- Preserves surrounding text
- Logs the conversion to console

## Example Conversion

```
Input:  "Meeting on November 9, 2024"
↓
Detect: "November 9, 2024"
↓
Parse:  Year=2024, Month=11, Day=9
↓
Check:  2024 > 2000 ✓
↓
Convert: Jalali Year=1403, Month=8, Day=18
↓
Format: "۱۸ عقرب ۱۴۰۳" (Dari)
↓
Output: "Meeting on ۱۸ عقرب ۱۴۰۳"
```

## Technical Details

### Gregorian to Jalali Algorithm
The extension uses a mathematical algorithm to convert dates:
1. Calculates total days from a reference point
2. Applies modulo operations to find Jalali year
3. Determines month and day based on Jalali calendar rules
4. Accounts for leap years in both calendars

### Month Mapping

| Jalali Month | Dari Name | Pashto Name | Days |
|--------------|-----------|-------------|------|
| 1 | حمل | وری | 31 |
| 2 | ثور | غویی | 31 |
| 3 | جوزا | غبرګولی | 31 |
| 4 | سرطان | چنګاښ | 31 |
| 5 | اسد | زمری | 31 |
| 6 | سنبله | وږی | 31 |
| 7 | میزان | تله | 30 |
| 8 | عقرب | لړم | 30 |
| 9 | قوس | لیندۍ | 30 |
| 10 | جدی | مرغومی | 30 |
| 11 | دلو | سلواغه | 30 |
| 12 | حوت | کب | 29/30* |

*30 days in leap years

### Performance
- Processes pages in milliseconds
- Only scans text nodes (not images, scripts, etc.)
- Minimal memory footprint
- No network requests

### Privacy
- All processing happens locally in your browser
- No data sent to any server
- No tracking or analytics
- No external dependencies

## Settings Storage

Settings are stored locally using Firefox's storage API:
- `language`: "dari" or "pashto"
- `usePersianDigits`: true or false

These persist across browser sessions.

## Limitations

1. **Year 2000 Cutoff**: Only converts dates after 2000
2. **Text Only**: Doesn't convert dates in images
3. **Static Content**: Runs once on page load (not on dynamic updates)
4. **Format Recognition**: Only recognizes common date formats
5. **Language**: Only detects English date formats currently

## Future Enhancements

Possible improvements:
- Support for dynamic content (MutationObserver)
- Recognize more date formats
- Support for other languages (Arabic, Persian dates)
- Bidirectional conversion (Afghan → Gregorian)
- Date picker integration
- Custom date format preferences
