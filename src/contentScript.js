/* contentScript.js
   Self-contained multi-calendar detector & converter.
   It finds date-like strings in text nodes and converts them to Solar Hijri with Dari or Pashto formatting.
*/

// -------------------- Configuration / month names --------------------
const MONTHS_DARI = [
  "حمل",
  "ثور",
  "جوزا",
  "سرطان",
  "اسد",
  "سنبله",
  "میزان",
  "عقرب",
  "قوس",
  "جدی",
  "دلو",
  "حوت",
];
const MONTHS_PASHTO = [
  "وری",
  "غویی",
  "غبرګولی",
  "چنګاښ",
  "زمری",
  "وږی",
  "تله",
  "لړم",
  "لړم",
  "مرغومی",
  "سلواغه",
  "کب",
];

// Note: the Pashto list above uses commonly seen names; you can adjust order/names as desired.
const SKIP_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "TEXTAREA",
  "INPUT",
  "CODE",
  "PRE",
  "NOSCRIPT",
  "IFRAME",
]);

// -------------------- Digit conversion utils --------------------
const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const ARABIC_INDIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

// Convert Persian or Arabic-Indic digits to ASCII digits
function toAsciiDigits(str) {
  return str
    .replace(/[۰-۹]/g, (ch) => String(PERSIAN_DIGITS.indexOf(ch)))
    .replace(/[٠-٩]/g, (ch) => String(ARABIC_INDIC_DIGITS.indexOf(ch)));
}

// Convert ASCII digits to Persian digits (for display in Dari)
function toPersianDigits(str) {
  return String(str).replace(/\d/g, (d) => PERSIAN_DIGITS[+d]);
}

// Normalize whitespace
function norm(str) {
  return str.replace(/\u200e|\u200f/g, "").trim();
}

// -------------------- Jalali (Solar Hijri) <-> Gregorian conversions --------------------
// Implementation adapted from public-domain conversion algorithms (jalaali-js style).
function jalaliToGregorian(jy, jm, jd) {
  jy = +jy;
  jm = +jm;
  jd = +jd;
  var gy;
  if (jy > 979) {
    gy = 1600;
    jy -= 979;
  } else {
    gy = 621;
  }
  var days =
    365 * jy + Math.floor((jy / 33) * 8) + Math.floor(((jy % 33) + 3) / 4);
  for (var i = 0; i < jm - 1; ++i) {
    days += jalaliMonthDays(i + 1, jy + (jy > 0 ? 0 : 0));
  }
  days += jd - 1;
  gy += 400 * Math.floor(days / 146097);
  days %= 146097;
  if (days > 36524) {
    gy += 100 * Math.floor((days - 1) / 36524);
    days = (days - 1) % 36524;
    if (days >= 365) days++;
  }
  gy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    gy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  var gd = days + 1;
  var sal_a = [
    0,
    31,
    isGregorianLeap(gy) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  var gm = 0;
  for (var i = 1; i < 13; i++) {
    var v = sal_a[i];
    if (gd <= v) {
      gm = i;
      break;
    }
    gd -= v;
  }
  return { gy: gy, gm: gm, gd: gd };
}
function jalaliMonthDays(month, jy) {
  // month 1..12
  if (month <= 6) return 31;
  if (month <= 11) return 30;
  return isJalaliLeap(jy) ? 30 : 29;
}
function isGregorianLeap(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
// Determine Jalali leap (approx algorithm used by jalaali-js)
function isJalaliLeap(jy) {
  var bl = jalaliLeap(jy);
  return bl === 0;
}
function jalaliLeap(jy) {
  // returns 0 for leap, 1 for normal...
  var breaks = [
    -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097,
    2192, 2262, 2324, 2394, 2456, 3178,
  ];
  var bl = breaks.length;
  var gy = jy + 621;
  var leapJ = -14;
  var jp = breaks[0];
  var jm, jump, leap, n, i;
  for (i = 1; i < bl; i += 1) {
    jm = breaks[i];
    jump = jm - jp;
    if (jy < jm) break;
    leapJ = leapJ + Math.floor(jump / 33) * 8 + Math.floor((jump % 33) / 4);
    jp = jm;
  }
  n = jy - jp;
  leapJ = leapJ + Math.floor(n / 33) * 8 + Math.floor(((n % 33) + 3) / 4);
  if (Math.floor((jump % 33) / 4) === 0 && jump % 33 === 4) leapJ += 1;
  var leapG =
    Math.floor(gy / 4) - Math.floor(((Math.floor(gy / 100) + 1) * 3) / 4) - 150;
  var march = 20 + leapJ - leapG;
  if (jump - n < 6) n = n - jump + Math.floor((jump + 4) / 33) * 33;
  var leap = Math.floor((((n + 1) % 33) - 1) % 4);
  return leap;
}
// Convert Gregorian to Jalali
function gregorianToJalali(gy, gm, gd) {
  gy = +gy;
  gm = +gm;
  gd = +gd;
  var g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  var jy;
  var gy2 = gm > 2 ? gy + 1 : gy;
  var days =
    355666 +
    365 * gy +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) +
    gd +
    g_d_m[gm - 1];
  jy = -1595 + 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  var jm =
    days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
  var jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
  return { jy: jy, jm: jm, jd: jd };
}

// -------------------- Hijri (Islamic arithmetic) -> Gregorian --------------------
// Convert Islamic date to Julian Day (arithmetical Tabular Islamic calendar)
function islamicToJD(y, m, d) {
  // y,m,d are integers
  return (
    Math.floor((11 * y + 3) / 30) +
    354 * y +
    30 * m -
    Math.floor((m - 1) / 2) +
    d +
    1948440 -
    385
  );
}
// Convert Julian Day to Gregorian date (Fliegel-Van Flandern algorithm)
function jdToGregorian(jd) {
  var j = jd;
  var l = j + 68569;
  var n = Math.floor((4 * l) / 146097);
  l = l - Math.floor((146097 * n + 3) / 4);
  var i = Math.floor((4000 * (l + 1)) / 1461001);
  l = l - Math.floor((1461 * i) / 4) + 31;
  var j2 = Math.floor((80 * l) / 2447);
  var day = l - Math.floor((2447 * j2) / 80);
  l = Math.floor(j2 / 11);
  var month = j2 + 2 - 12 * l;
  var year = 100 * (n - 49) + i + l;
  return { gy: year, gm: month, gd: day };
}
function islamicToGregorian(y, m, d) {
  var jd = islamicToJD(y, m, d);
  return jdToGregorian(jd);
}

// -------------------- Parsers for different formats --------------------
// Try ISO-like patterns: YYYY-MM-DD or YYYY/MM/DD or YYYY.MM.DD
const ISO_RE = /\b([0-9]{3,4})[\/\-\.\s]([0-9]{1,2})[\/\-\.\s]([0-9]{1,2})\b/;
// Try dd/mm/yyyy or dd-mm-yyyy or dd.mm.yyyy (day first)
const DMY_RE = /\b([0-9]{1,2})[\/\-\.\s]([0-9]{1,2})[\/\-\.\s]([0-9]{3,4})\b/;
// English month name like "9 Nov 2025" or "Nov 9, 2025"
const EN_MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "sept",
  "oct",
  "nov",
  "dec",
];
const EN_MONTHS_MAP = (function () {
  const m = {};
  ["january", "jan"].forEach((v, i) => (m[v] = 1));
  const names = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  for (let i = 0; i < names.length; i++) {
    m[names[i]] = i + 1;
    m[names[i].slice(0, 3)] = i + 1;
  }
  return m;
})();
// Persian (Jalali) numeric pattern like 1403/08/18 (possibly Persian digits)
const JALALI_RE =
  /\b[۰-۹0-9]{3,4}[\/\-\.\s][۰-۹0-9]{1,2}[\/\-\.\s][۰-۹0-9]{1,2}\b/;
// Hijri pattern like 1447/05/12 (possibly Arabic-Indic)
const HIJRI_RE =
  /\b[٠-٩0-9]{3,4}[\/\-\.\s][٠-٩0-9]{1,2}[\/\-\.\s][٠-٩0-9]{1,2}\b/;

// Attempt parse any date-like substring and return JS Date or null
function tryParseDateFromString(text) {
  if (!text || typeof text !== "string") return null;
  let s = text.trim();
  s = toAsciiDigits(s);

  // 1) ISO Y-M-D (treat as possibly Gregorian or Jalali — we need heuristics)
  let m;
  m = s.match(ISO_RE);
  if (m) {
    let a = Number(m[1]),
      b = Number(m[2]),
      c = Number(m[3]);
    // Heuristics: if year >= 1000 and <= 9999 -> treat as Gregorian year first
    if (a >= 1000 && a <= 9999) {
      // Gregorian attempt
      const g = new Date(a, b - 1, c);
      if (!isNaN(g)) return g;
    }
    // else maybe Jalali (year in 1300..1500 likely)
    if (a >= 100 && a <= 1500) {
      // treat as Jalali -> convert to Gregorian
      const g = jalaliToGregorian(a, b, c);
      return new Date(g.gy, g.gm - 1, g.gd);
    }
  }

  // 2) D/M/Y (day first) -> assume if year is 3-4 digits treat accordingly
  m = s.match(DMY_RE);
  if (m) {
    let d = Number(m[1]),
      mo = Number(m[2]),
      y = Number(m[3]);
    if (y > 1700) {
      // clearly Gregorian year
      const gg = new Date(y, mo - 1, d);
      if (!isNaN(gg)) return gg;
    } else if (y >= 1300 && y <= 1600) {
      // likely Jalali -> convert to Gregorian
      const g = jalaliToGregorian(y, mo, d);
      return new Date(g.gy, g.gm - 1, g.gd);
    } else if (y < 100) {
      // ambiguous two-digit year - skip
    }
  }

  // 3) English names: "9 November 2025" or "November 9, 2025"
  // Build a regex that finds month names
  const enMonthRegex = new RegExp(
    "\\b(" + Object.keys(EN_MONTHS_MAP).join("|") + ")\\b",
    "i"
  );
  if (enMonthRegex.test(s)) {
    // try patterns
    // a) MonthName DD, YYYY
    let re1 =
      /([A-Za-z]{3,9})[,\s\-]+([0-9]{1,2})(?:st|nd|rd|th)?,?\s*([0-9]{3,4})?/i;
    let r1 = s.match(re1);
    if (r1) {
      const mname = r1[1].toLowerCase();
      const mo = EN_MONTHS_MAP[mname] || 0;
      const day = Number(r1[2]);
      const year = r1[3] ? Number(r1[3]) : new Date().getFullYear();
      if (mo > 0) {
        const g = new Date(year, mo - 1, day);
        if (!isNaN(g)) return g;
      }
    }
    // b) DD MonthName YYYY
    let re2 = /([0-9]{1,2})[,\s\-]+([A-Za-z]{3,9})[,\s\-]+([0-9]{3,4})?/i;
    let r2 = s.match(re2);
    if (r2) {
      const day = Number(r2[1]);
      const mname = r2[2].toLowerCase();
      const mo = EN_MONTHS_MAP[mname] || 0;
      const year = r2[3] ? Number(r2[3]) : new Date().getFullYear();
      if (mo > 0) {
        const g = new Date(year, mo - 1, day);
        if (!isNaN(g)) return g;
      }
    }
  }

  // 4) Jalali / Persian numeric pattern (e.g. ۱۴۰۳/۰۸/۱۸ or 1403/08/18) -> convert to gregorian
  m = s.match(JALALI_RE);
  if (m) {
    const raw = m[0];
    const en = toAsciiDigits(raw);
    const parts = en.split(/[\/\-\.\s]+/).map(Number);
    if (parts.length >= 3) {
      const jy = parts[0],
        jm = parts[1],
        jd = parts[2];
      if (jy >= 1200 && jy <= 1600) {
        const g = jalaliToGregorian(jy, jm, jd);
        return new Date(g.gy, g.gm - 1, g.gd);
      }
    }
  }

  // 5) Hijri Arabic/ASCII numeric pattern -> convert to Gregorian using arithmetic algorithm
  m = s.match(HIJRI_RE);
  if (m) {
    const raw = m[0];
    const en = toAsciiDigits(raw);
    const parts = en.split(/[\/\-\.\s]+/).map(Number);
    if (parts.length >= 3) {
      const hy = parts[0],
        hm = parts[1],
        hd = parts[2];
      if (hy >= 1300 && hy <= 1600) {
        // common Hijri years approx range
        const g = islamicToGregorian(hy, hm, hd);
        return new Date(g.gy, g.gm - 1, g.gd);
      }
    }
  }

  // 6) Try to find a simple numeric year like "March 1403" (Jalali month with Jalali year)
  let simpleJ = s.match(
    /([۰-۹0-9]{3,4})\s+(فروردین|اردیبهشت|خرداد|تیر|مرداد|شهریور|مهر|آبان|آذر|دی|بهمن|اسفند|حمل|ثور|جوزا|سرطان|اسد|سنبله|میزان|عقرب|قوس|جدی|دلو|حوت)/i
  );
  if (simpleJ) {
    const y = Number(toAsciiDigits(simpleJ[1]));
    // take first day and month mapping if available — here we assume Jalali month names belong to Jalali calendar
    // We'll map few Persian names to month number:
    const persianMap = {
      حمل: 1,
      ثور: 2,
      جوزا: 3,
      سرطان: 4,
      اسد: 5,
      سنبله: 6,
      میزان: 7,
      عقرب: 8,
      قوس: 9,
      جدی: 10,
      دلو: 11,
      حوت: 12,
      فروردین: 1,
      اردیبهشت: 2,
      خرداد: 3,
      تیر: 4,
      مرداد: 5,
      شهریور: 6,
      مهر: 7,
      آبان: 8,
      آذر: 9,
      دی: 10,
      بهمن: 11,
      اسفند: 12,
    };
    const mname = simpleJ[2].toLowerCase();
    const jm = persianMap[mname] || 1;
    if (y >= 1200 && y <= 1600) {
      const g = jalaliToGregorian(y, jm, 1);
      return new Date(g.gy, g.gm - 1, g.gd);
    }
  }

  // If none matched, return null
  return null;
}

// -------------------- Formatting for target locales --------------------
function formatSolarHijriForLocale(dateObj, locale, usePersianDigits) {
  // dateObj is JS Date
  const gY = dateObj.getFullYear(),
    gM = dateObj.getMonth() + 1,
    gD = dateObj.getDate();
  const j = gregorianToJalali(gY, gM, gD);
  const months = locale === "ps-AF" ? MONTHS_PASHTO : MONTHS_DARI;
  const jday = j.jd;
  const jmon = months[j.jm - 1] || j.jm;
  const jyear = j.jy;
  let out = `${jday} ${jmon} ${jyear}`;
  if (locale === "fa-AF" && usePersianDigits) out = toPersianDigits(out);
  return out;
}

// -------------------- Safe text-node replacement --------------------
function walkAndReplace(root, locale, opts) {
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  let node;
  const replacements = []; // store {node, newText} then apply to not break walker
  while ((node = walker.nextNode())) {
    const parent = node.parentNode;
    if (!parent) continue;
    if (SKIP_TAGS.has(parent.nodeName)) continue;
    // avoid contentEditable areas or inputs
    if (parent.isContentEditable) continue;
    const text = node.nodeValue;
    if (!text || !/[0-9۰-۹٠-٩A-Za-z]/.test(text)) continue; // quick reject
    // We will scan for candidate substrings using common patterns and tryParseDateFromString
    // For performance, split by sentence-like separators and analyze each chunk
    let newText = text;
    // find all candidate substrings by matching sequences containing digits and letters up to length
    const candidateRE = /[^\s]{1,40}[0-9۰-۹٠-٩][^\s]{0,40}/g;
    let m;
    let offsetShift = 0;
    while ((m = candidateRE.exec(text)) !== null) {
      const substr = m[0];
      const idx = m.index;
      const parsed = tryParseDateFromString(substr);
      if (parsed) {
        const formatted = formatSolarHijriForLocale(
          parsed,
          locale,
          opts.usePersianDigits
        );
        // replace the specific substring occurrence (only the matched substring)
        const start = idx,
          end = idx + substr.length;
        newText =
          newText.slice(0, start + offsetShift) +
          formatted +
          newText.slice(end + offsetShift);
        offsetShift += formatted.length - substr.length;
      }
    }
    if (newText !== text) {
      replacements.push({ node, newText });
    }
  }
  // apply replacements
  for (const r of replacements) r.node.nodeValue = r.newText;
}

// -------------------- Update <time datetime> elements --------------------
function updateTimeElements(locale, opts) {
  if (!opts.convertTimeElements) return;
  document.querySelectorAll("time[datetime]").forEach((t) => {
    try {
      const raw = t.getAttribute("datetime");
      if (!raw) return;
      // attempt ISO parse
      let d = new Date(raw);
      if (isNaN(d)) {
        // maybe date only; try ascii conversion
        const parsed = tryParseDateFromString(raw);
        if (parsed) d = parsed;
      }
      if (!isNaN(d)) {
        t.textContent = formatSolarHijriForLocale(
          d,
          locale,
          opts.usePersianDigits
        );
      }
    } catch (e) {}
  });
}

// -------------------- Main runner --------------------
function runConversionWithPrefs(prefs) {
  const language = prefs.language || "fa-AF";
  const options = {
    convertTimeElements: prefs.convertTimeElements !== false,
    usePersianDigits: prefs.usePersianDigits !== false,
  };
  try {
    walkAndReplace(document.body, language, options);
    updateTimeElements(language, options);
  } catch (e) {
    console.error("Afghan Date Localizer: conversion error", e);
  }
}

// initial run
chrome.storage.sync.get(
  {
    language: "fa-AF",
    convertTimeElements: true,
    usePersianDigits: true,
  },
  (prefs) => {
    runConversionWithPrefs(prefs);
  }
);

// Observe mutations (for single-page apps), but throttle to avoid heavy loops
let mutationTimer = null;
const observer = new MutationObserver((mutations) => {
  if (mutationTimer) return;
  mutationTimer = setTimeout(() => {
    chrome.storage.sync.get(
      {
        language: "fa-AF",
        convertTimeElements: true,
        usePersianDigits: true,
      },
      (prefs) => {
        runConversionWithPrefs(prefs);
        mutationTimer = null;
      }
    );
  }, 800);
});
observer.observe(document.documentElement || document.body, {
  childList: true,
  subtree: true,
});
