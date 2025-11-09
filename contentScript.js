// Afghan Date Converter - Content Script
console.log('Afghan Date Converter: Starting...');

// Month names
const DARI_MONTHS = ['حمل', 'ثور', 'جوزا', 'سرطان', 'اسد', 'سنبله', 'میزان', 'عقرب', 'قوس', 'جدی', 'دلو', 'حوت'];
const PASHTO_MONTHS = ['وری', 'غویی', 'غبرګولی', 'چنګاښ', 'زمری', 'وږی', 'تله', 'لړم', 'لیندۍ', 'مرغومی', 'سلواغه', 'کب'];
const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

// Convert to Persian digits
function toPersianDigits(num) {
    return String(num).replace(/\d/g, d => PERSIAN_DIGITS[parseInt(d)]);
}

// Gregorian to Jalali conversion
function gregorianToJalali(gy, gm, gd) {
    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    const gy2 = (gm > 2) ? (gy + 1) : gy;
    let days = 355666 + (365 * gy) + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
    let jy = -1595 + 33 * Math.floor(days / 12053);
    days %= 12053;
    jy += 4 * Math.floor(days / 1461);
    days %= 1461;
    if (days > 365) {
        jy += Math.floor((days - 1) / 365);
        days = (days - 1) % 365;
    }
    const jm = (days < 186) ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
    const jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
    return { year: jy, month: jm, day: jd };
}

// Format date in Afghan style
function formatAfghanDate(date, language, usePersianDigits) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const jalali = gregorianToJalali(year, month, day);
    const months = language === 'pashto' ? PASHTO_MONTHS : DARI_MONTHS;
    const monthName = months[jalali.month - 1];

    if (language === 'dari' && usePersianDigits) {
        return `${toPersianDigits(jalali.day)} ${monthName} ${toPersianDigits(jalali.year)}`;
    }
    return `${jalali.day} ${monthName} ${jalali.year}`;
}

// Parse date from text
function parseDate(text) {
    // Try ISO format: 2024-11-09
    let match = text.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (match) {
        const year = parseInt(match[1]);
        if (year > 2000) {
            const date = new Date(year, parseInt(match[2]) - 1, parseInt(match[3]));
            if (!isNaN(date.getTime())) return { date, original: match[0] };
        }
    }

    // Try slash format: 2024/11/09
    match = text.match(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
    if (match) {
        const year = parseInt(match[1]);
        if (year > 2000) {
            const date = new Date(year, parseInt(match[2]) - 1, parseInt(match[3]));
            if (!isNaN(date.getTime())) return { date, original: match[0] };
        }
    }

    // Try DD/MM/YYYY format
    match = text.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (match) {
        const year = parseInt(match[3]);
        if (year > 2000) {
            const date = new Date(year, parseInt(match[2]) - 1, parseInt(match[1]));
            if (!isNaN(date.getTime())) return { date, original: match[0] };
        }
    }

    // Try DD-MM-YYYY format
    match = text.match(/(\d{1,2})-(\d{1,2})-(\d{4})/);
    if (match) {
        const year = parseInt(match[3]);
        if (year > 2000) {
            const date = new Date(year, parseInt(match[2]) - 1, parseInt(match[1]));
            if (!isNaN(date.getTime())) return { date, original: match[0] };
        }
    }

    // Try Month DD, YYYY format
    const months = {
        'january': 1, 'jan': 1, 'february': 2, 'feb': 2, 'march': 3, 'mar': 3,
        'april': 4, 'apr': 4, 'may': 5, 'june': 6, 'jun': 6,
        'july': 7, 'jul': 7, 'august': 8, 'aug': 8, 'september': 9, 'sep': 9, 'sept': 9,
        'october': 10, 'oct': 10, 'november': 11, 'nov': 11, 'december': 12, 'dec': 12
    };

    match = text.match(/(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)\s+(\d{1,2})(?:st|nd|rd|th)?,?\s*(\d{4})/i);
    if (match) {
        const year = parseInt(match[3]);
        if (year > 2000) {
            const monthNum = months[match[1].toLowerCase()];
            const date = new Date(year, monthNum - 1, parseInt(match[2]));
            if (!isNaN(date.getTime())) return { date, original: match[0] };
        }
    }

    // Try DD Month YYYY format
    match = text.match(/(\d{1,2})(?:st|nd|rd|th)?\s+(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec),?\s*(\d{4})/i);
    if (match) {
        const year = parseInt(match[3]);
        if (year > 2000) {
            const monthNum = months[match[2].toLowerCase()];
            const date = new Date(year, monthNum - 1, parseInt(match[1]));
            if (!isNaN(date.getTime())) return { date, original: match[0] };
        }
    }

    return null;
}

// Process text nodes
function processNode(node, language, usePersianDigits) {
    if (node.nodeType !== Node.TEXT_NODE) return;

    const parent = node.parentElement;
    if (!parent) return;

    // Skip certain elements
    const skipTags = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'INPUT', 'CODE', 'PRE'];
    if (skipTags.includes(parent.tagName)) return;

    let text = node.textContent;
    let changed = false;

    // Find all dates in the text
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i++) {
        // Try 1 word
        let testText = words[i];
        let result = parseDate(testText);

        // Try 2 words
        if (!result && i < words.length - 1) {
            testText = words[i] + ' ' + words[i + 1];
            result = parseDate(testText);
        }

        // Try 3 words
        if (!result && i < words.length - 2) {
            testText = words[i] + ' ' + words[i + 1] + ' ' + words[i + 2];
            result = parseDate(testText);
        }

        // Try 4 words (for "Month DD, YYYY" with comma)
        if (!result && i < words.length - 3) {
            testText = words[i] + ' ' + words[i + 1] + ' ' + words[i + 2] + ' ' + words[i + 3];
            result = parseDate(testText);
        }

        if (result) {
            const afghanDate = formatAfghanDate(result.date, language, usePersianDigits);
            text = text.replace(result.original, afghanDate);
            changed = true;
            console.log('Converted:', result.original, '→', afghanDate);
        }
    }

    if (changed) {
        node.textContent = text;
    }
}

// Walk through all text nodes
function convertDates(language, usePersianDigits) {
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

    nodes.forEach(n => processNode(n, language, usePersianDigits));
    console.log('Conversion complete. Processed', nodes.length, 'text nodes.');
}

// Get settings and run
function init() {
    // Use chrome.storage for both Chrome and Firefox (Manifest V3)
    if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.get(['language', 'usePersianDigits'], result => {
            const language = result.language || 'dari';
            const usePersianDigits = result.usePersianDigits !== false;
            convertDates(language, usePersianDigits);
        });
    } else {
        // Fallback to defaults if no storage API
        convertDates('dari', true);
    }
}

// Run when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
