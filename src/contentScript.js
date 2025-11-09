// Afghan Date Converter - Content Script with Libraries
import * as chrono from 'chrono-node';
import jalaali from 'jalaali-js';

console.log('Afghan Date Converter: Starting with libraries...');

// Month names
const DARI_MONTHS = ['حمل', 'ثور', 'جوزا', 'سرطان', 'اسد', 'سنبله', 'میزان', 'عقرب', 'قوس', 'جدی', 'دلو', 'حوت'];
const PASHTO_MONTHS = ['وری', 'غویی', 'غبرګولی', 'چنګاښ', 'زمری', 'وږی', 'تله', 'لړم', 'لیندۍ', 'مرغومی', 'سلواغه', 'کب'];
const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

// Convert to Persian digits
function toPersianDigits(num) {
  return String(num).replace(/\d/g, d => PERSIAN_DIGITS[parseInt(d)]);
}

// Convert day number to Dari words
const DARI_DAYS = {
  1: 'یکم', 2: 'دوم', 3: 'سوم', 4: 'چهارم', 5: 'پنجم',
  6: 'ششم', 7: 'هفتم', 8: 'هشتم', 9: 'نهم', 10: 'دهم',
  11: 'یازدهم', 12: 'دوازدهم', 13: 'سیزدهم', 14: 'چهاردهم', 15: 'پانزدهم',
  16: 'شانزدهم', 17: 'هفدهم', 18: 'هجدهم', 19: 'نوزدهم', 20: 'بیستم',
  21: 'بیست و یکم', 22: 'بیست و دوم', 23: 'بیست و سوم', 24: 'بیست و چهارم', 25: 'بیست و پنجم',
  26: 'بیست و ششم', 27: 'بیست و هفتم', 28: 'بیست و هشتم', 29: 'بیست و نهم', 30: 'سی‌ام',
  31: 'سی و یکم'
};

// Convert day number to Pashto words
const PASHTO_DAYS = {
  1: 'لومړۍ', 2: 'دویمه', 3: 'دریمه', 4: 'څلورمه', 5: 'پینځمه',
  6: 'شپږمه', 7: 'اوومه', 8: 'اتمه', 9: 'نهمه', 10: 'لسمه',
  11: 'یوولسمه', 12: 'دولسمه', 13: 'دیارلسمه', 14: 'څوارلسمه', 15: 'پینځلسمه',
  16: 'شپاړسمه', 17: 'اوولسمه', 18: 'اتلسمه', 19: 'نولسمه', 20: 'شلمه',
  21: 'یو ویشتمه', 22: 'دوه ویشتمه', 23: 'درې ویشتمه', 24: 'څلور ویشتمه', 25: 'پنځه ویشتمه',
  26: 'شپږ ویشتمه', 27: 'اووه ویشتمه', 28: 'اته ویشتمه', 29: 'نهه ویشتمه', 30: 'دیرشمه',
  31: 'یو دیرشمه'
};

function dayToWords(day, language) {
  const days = language === 'pashto' ? PASHTO_DAYS : DARI_DAYS;
  return days[day] || toPersianDigits(day);
}

// Format date in Afghan style - ALWAYS use Persian digits
// Format: Day Month Year (e.g., ۱۸ عقرب ۱۴۰۳)
// Reading right to left: Year Month Day
function formatAfghanDate(date, language, includeYear = true) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Use jalaali-js for conversion
  const jalali = jalaali.toJalaali(year, month, day);
  const months = language === 'pashto' ? PASHTO_MONTHS : DARI_MONTHS;
  const monthName = months[jalali.jm - 1];

  // Always use Persian digits for both Dari and Pashto
  // Format: Day-(MonthName), Year (e.g., ۱۸-(عقرب)، ۱۴۰۳)
  // For RTL display, we write: Year ,)MonthName(-Day
  // So it displays as: Day-(MonthName), Year
  if (includeYear) {
    return `${toPersianDigits(jalali.jy)} ،(${monthName})-${toPersianDigits(jalali.jd)}`;
  } else {
    return `(${monthName})-${toPersianDigits(jalali.jd)}`;
  }
}

// Parse dates using chrono-node
function findDatesInText(text) {
  const results = [];

  // Use chrono to parse dates
  const parsedDates = chrono.parse(text, new Date(), { forwardDate: true });

  for (const parsed of parsedDates) {
    const originalText = parsed.text;

    // Skip if it looks like a time (HH:MM format)
    if (/^\d{1,2}:\d{2}/.test(originalText.trim())) {
      continue;
    }

    // Skip if it's only a time without date context
    if (/^(\d{1,2}:\d{2}(:\d{2})?(\s*(AM|PM|am|pm))?)$/.test(originalText.trim())) {
      continue;
    }

    // Skip if the parsed result doesn't have a date component
    if (!parsed.start.isCertain('day') && !parsed.start.isCertain('month')) {
      continue;
    }

    const date = parsed.start.date();
    const year = date.getFullYear();

    // Only process dates after year 2000
    if (year > 2000) {
      // Determine if the original text included a year
      const hasYear = /\d{4}/.test(originalText);

      results.push({
        date: date,
        original: originalText,
        index: parsed.index,
        hasYear: hasYear
      });
    }
  }

  return results;
}

// Process text nodes
function processNode(node, language) {
  if (node.nodeType !== Node.TEXT_NODE) return;

  const parent = node.parentElement;
  if (!parent) return;

  // Skip certain elements
  const skipTags = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'INPUT', 'CODE', 'PRE'];
  if (skipTags.includes(parent.tagName)) return;

  const text = node.textContent;
  if (!text || text.trim().length === 0) return;

  // Find all dates in the text
  const dates = findDatesInText(text);

  if (dates.length === 0) return;

  // Sort by index in reverse order to replace from end to start
  dates.sort((a, b) => b.index - a.index);

  let newText = text;
  for (const dateInfo of dates) {
    const afghanDate = formatAfghanDate(dateInfo.date, language, dateInfo.hasYear);
    const start = dateInfo.index;
    const end = start + dateInfo.original.length;

    newText = newText.substring(0, start) + afghanDate + newText.substring(end);
    console.log('Converted:', dateInfo.original, '→', afghanDate);
  }

  if (newText !== text) {
    node.textContent = newText;
  }
}

// Walk through all text nodes
function convertDates(language) {
  console.log('Converting dates with language:', language);

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  const nodes = [];
  let node;
  while (node = walker.nextNode()) {
    nodes.push(node);
  }

  let converted = 0;
  nodes.forEach(n => {
    const originalText = n.textContent;
    processNode(n, language);
    if (n.textContent !== originalText) converted++;
  });

  console.log(`Conversion complete. Processed ${nodes.length} text nodes, converted ${converted} nodes.`);
}

// Get settings and run
function init() {
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.local.get(['language'], result => {
      const language = result.language || 'dari';
      convertDates(language);

      // Watch for dynamic content (popups, modals, etc.)
      observeDynamicContent(language);
    });
  } else {
    const language = 'dari';
    convertDates(language);
    observeDynamicContent(language);
  }
}

// Observe dynamic content changes (for popups, modals, SPAs)
function observeDynamicContent(language) {
  // Throttle to avoid too many conversions
  let timeout = null;

  const observer = new MutationObserver((mutations) => {
    // Clear existing timeout
    if (timeout) {
      clearTimeout(timeout);
    }

    // Set new timeout to batch changes
    timeout = setTimeout(() => {
      console.log('Afghan Date Converter: Detected dynamic content changes');

      // Process only the added nodes
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Process this element and its children
            const walker = document.createTreeWalker(
              node,
              NodeFilter.SHOW_TEXT,
              null,
              false
            );

            const nodes = [];
            let textNode;
            while (textNode = walker.nextNode()) {
              nodes.push(textNode);
            }

            nodes.forEach(n => processNode(n, language));
          } else if (node.nodeType === Node.TEXT_NODE) {
            processNode(node, language);
          }
        });
      });

      timeout = null;
    }, 300); // Wait 300ms after last change
  });

  // Observe the entire document for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  console.log('Afghan Date Converter: Watching for dynamic content');
}

// Run when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
