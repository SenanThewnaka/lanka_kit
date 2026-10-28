/**
 * LKR currency formatting and amount-to-words converter.
 */
const ONES_EN = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
];
const TENS_EN = [
    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety',
];
function convertThreeDigitsEn(num) {
    let result = '';
    const hundreds = Math.floor(num / 100);
    const remainder = num % 100;
    if (hundreds > 0) {
        result += ONES_EN[hundreds] + ' Hundred';
        if (remainder > 0) {
            result += ' ';
        }
    }
    if (remainder > 0) {
        if (remainder < 20) {
            result += ONES_EN[remainder];
        }
        else {
            const tens = Math.floor(remainder / 10);
            const ones = remainder % 10;
            result += TENS_EN[tens];
            if (ones > 0) {
                result += ' ' + ONES_EN[ones];
            }
        }
    }
    return result;
}
/**
 * Format a numeric amount to Sri Lankan Rupee standard display.
 * Example: 1540000.5 -> "Rs. 1,540,000.50"
 */
export function formatLkr(amount, options = {}) {
    if (typeof amount !== 'number' || isNaN(amount)) {
        return 'Rs. 0.00';
    }
    const prefix = options.prefix !== undefined ? options.prefix : 'Rs. ';
    const suffix = options.suffix || '';
    const decimals = options.decimals !== undefined ? options.decimals : 2;
    const isNegative = amount < 0;
    const absAmount = Math.abs(amount);
    const parts = absAmount.toFixed(decimals).split('.');
    const intPart = parts[0];
    const decPart = parts[1];
    // International grouping format
    const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const formattedNum = decimals > 0 ? `${withCommas}.${decPart}` : withCommas;
    const sign = isNegative ? '-' : '';
    return `${sign}${prefix}${formattedNum}${suffix}`;
}
/**
 * Convert a numeric monetary amount to English words for cheques and invoices.
 * Example: 1540.50 -> "One Thousand Five Hundred Forty Rupees and Fifty Cents Only"
 */
function integerToWordsEn(num) {
    if (num === 0)
        return 'Zero';
    const scales = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
    let chunks = [];
    let temp = num;
    while (temp > 0) {
        chunks.push(temp % 1000);
        temp = Math.floor(temp / 1000);
    }
    let words = [];
    for (let i = chunks.length - 1; i >= 0; i--) {
        const chunk = chunks[i];
        if (chunk > 0) {
            const chunkWords = convertThreeDigitsEn(chunk);
            const scale = scales[i];
            words.push(scale ? `${chunkWords} ${scale}` : chunkWords);
        }
    }
    return words.join(' ');
}
// Sinhala Numbers Data
const SI_ONES = {
    0: 'බිංදුව',
    1: 'එක',
    2: 'දෙක',
    3: 'තුන',
    4: 'හතර',
    5: 'පහ',
    6: 'හය',
    7: 'හත',
    8: 'අට',
    9: 'නවය',
    10: 'දහය',
    11: 'එකොළහ',
    12: 'දොළහ',
    13: 'දහතුන',
    14: 'දාහතර',
    15: 'පහළොව',
    16: 'දාසය',
    17: 'දාහත',
    18: 'දහඅට',
    19: 'දහනවය',
    20: 'විස්ස',
    30: 'තිහ',
    40: 'හතළිහ',
    50: 'පනහ',
    60: 'හැට',
    70: 'හැත්තෑව',
    80: 'අසූව',
    90: 'අනූව',
};
const SI_PREFIX = {
    1: 'එක්',
    2: 'දෙ',
    3: 'තුන්',
    4: 'හාර',
    5: 'පන්',
    6: 'හය',
    7: 'හත්',
    8: 'අට',
    9: 'නවසීය',
};
function integerToWordsSi(num) {
    if (num === 0)
        return 'බිංදුව';
    if (num < 0)
        return 'සෘණ ' + integerToWordsSi(Math.abs(num));
    if (num <= 20) {
        return SI_ONES[num];
    }
    if (num < 100) {
        const tens = Math.floor(num / 10) * 10;
        const remainder = num % 10;
        if (remainder === 0)
            return SI_ONES[tens];
        const tensPrefix = {
            20: 'විසි',
            30: 'තිස්',
            40: 'හතළිස්',
            50: 'පනස්',
            60: 'හැට',
            70: 'හැත්තෑ',
            80: 'අසූ',
            90: 'අනූ',
        };
        return (tensPrefix[tens] || '') + ' ' + SI_ONES[remainder];
    }
    if (num < 1000) {
        const hundreds = Math.floor(num / 100);
        const remainder = num % 100;
        const hText = hundreds === 1 ? 'එක්සිය' : (SI_PREFIX[hundreds] || SI_ONES[hundreds]) + 'සිය';
        if (remainder === 0)
            return hText + 'යයි';
        return hText + ' ' + integerToWordsSi(remainder);
    }
    if (num < 1000000) {
        const thousands = Math.floor(num / 1000);
        const remainder = num % 1000;
        const tText = thousands === 1 ? 'එක්දහස්' : integerToWordsSi(thousands) + ' දහස්';
        if (remainder === 0)
            return thousands === 1 ? 'එක්දහසයි' : tText + 'යි';
        return tText + ' ' + integerToWordsSi(remainder);
    }
    const millions = Math.floor(num / 1000000);
    const remainder = num % 1000000;
    const mText = integerToWordsSi(millions) + ' මිලියන';
    if (remainder === 0)
        return mText;
    return mText + ' ' + integerToWordsSi(remainder);
}
/**
 * Convert numeric amount into formal words.
 *
 * @param amount - Monetary number (e.g., 1540.50)
 * @param options - Language and formatting options
 * @returns Standard phrase (e.g., "One Thousand Five Hundred Forty Rupees and Fifty Cents Only")
 */
export function amountToWords(amount, options = {}) {
    if (typeof amount !== 'number' || isNaN(amount)) {
        return options.language === 'si' ? 'රුපියල් බිංදුවයි පමණි' : 'Zero Rupees Only';
    }
    const lang = options.language || 'en';
    const includeCurrency = options.includeCurrency !== false;
    const isNegative = amount < 0;
    const absAmount = Math.abs(amount);
    const rupees = Math.floor(absAmount);
    const cents = Math.round((absAmount - rupees) * 100);
    if (lang === 'si') {
        let result = '';
        if (rupees > 0) {
            result += 'රුපියල් ' + integerToWordsSi(rupees);
        }
        else {
            result += 'රුපියල් බිංදුවයි';
        }
        if (cents > 0) {
            result += ' ශත ' + integerToWordsSi(cents);
        }
        result += ' පමණි';
        return isNegative ? 'සෘණ ' + result : result;
    }
    // English
    const rupeesWords = integerToWordsEn(rupees);
    let result = '';
    if (includeCurrency) {
        const rupeeText = rupees === 1 ? 'Rupee' : 'Rupees';
        result = `${rupeesWords} ${rupeeText}`;
        if (cents > 0) {
            const centsWords = integerToWordsEn(cents);
            const centText = cents === 1 ? 'Cent' : 'Cents';
            result += ` and ${centsWords} ${centText}`;
        }
        result += ' Only';
    }
    else {
        result = rupeesWords;
        if (cents > 0) {
            result += ` Point ${integerToWordsEn(cents)}`;
        }
    }
    return isNegative ? `Negative ${result}` : result;
}
