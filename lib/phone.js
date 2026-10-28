/**
 * Mobile Carrier Prefix Mapping in Sri Lanka
 */
const MOBILE_PREFIX_MAP = {
    '070': 'Mobitel',
    '071': 'Mobitel',
    '072': 'Hutch',
    '074': 'Dialog',
    '075': 'Airtel',
    '076': 'Dialog',
    '077': 'Dialog',
    '078': 'Hutch',
};
/**
 * Major Fixed Line / Landline Area Codes in Sri Lanka
 */
const FIXED_AREA_CODES = {
    '011': 'Colombo',
    '021': 'Jaffna',
    '023': 'Mannar',
    '024': 'Vavuniya',
    '025': 'Anuradhapura',
    '026': 'Trincomalee',
    '027': 'Polonnaruwa',
    '031': 'Negombo',
    '032': 'Chilaw',
    '033': 'Gampaha',
    '034': 'Kalutara',
    '035': 'Kegalle',
    '036': 'Avissawella',
    '037': 'Kurunegala',
    '038': 'Panadura',
    '041': 'Matara',
    '045': 'Ratnapura',
    '047': 'Hambantota',
    '051': 'Hatton',
    '052': 'Nuwara Eliya',
    '054': 'Nawalapitiya',
    '055': 'Badulla',
    '057': 'Bandarawela',
    '063': 'Ampara',
    '065': 'Batticaloa',
    '066': 'Matale',
    '067': 'Kalmunai',
    '081': 'Kandy',
    '091': 'Galle',
};
/**
 * Cleans phone input by removing spaces, brackets, hyphens, and leading +
 */
export function sanitizePhone(input) {
    if (typeof input !== 'string')
        return '';
    return input.trim().replace(/[\s\-\(\)\.]/g, '');
}
/**
 * Validates and parses a Sri Lankan phone number.
 * Normalizes input variants like:
 * - 0771234567
 * - +94771234567
 * - 0094771234567
 * - 94771234567
 * - 771234567
 */
export function validatePhone(input) {
    const raw = typeof input === 'string' ? input.trim() : '';
    const sanitized = sanitizePhone(input);
    if (!sanitized) {
        return {
            isValid: false,
            raw,
            error: 'Phone number cannot be empty',
            code: 'EMPTY_INPUT',
        };
    }
    // Handle leading international plus/zeros
    let normalized = sanitized;
    if (normalized.startsWith('+94')) {
        normalized = normalized.substring(3);
    }
    else if (normalized.startsWith('0094')) {
        normalized = normalized.substring(4);
    }
    else if (normalized.startsWith('94')) {
        normalized = normalized.substring(2);
    }
    // If user omitted leading 0 (e.g. 771234567, length 9)
    if (normalized.length === 9 && !normalized.startsWith('0')) {
        normalized = '0' + normalized;
    }
    // Must be 10 digits starting with 0
    if (!/^[0-9]+$/.test(normalized)) {
        return {
            isValid: false,
            raw,
            error: 'Phone number must contain only numbers',
            code: 'INVALID_CHARACTERS',
        };
    }
    if (normalized.length !== 10 || !normalized.startsWith('0')) {
        return {
            isValid: false,
            raw,
            error: `Invalid Sri Lankan phone number length. Expected 10 digits starting with 0, got ${normalized.length} digits.`,
            code: 'INVALID_LENGTH',
        };
    }
    const prefix = normalized.substring(0, 3);
    let carrier = 'Unknown';
    let type = 'Unknown';
    if (MOBILE_PREFIX_MAP[prefix]) {
        carrier = MOBILE_PREFIX_MAP[prefix];
        type = 'Mobile';
    }
    else if (FIXED_AREA_CODES[prefix]) {
        carrier = 'SLT';
        type = 'Fixed';
    }
    else {
        return {
            isValid: false,
            raw,
            error: `Unknown Sri Lankan telephone area code or mobile operator prefix: ${prefix}`,
            code: 'UNKNOWN_PREFIX',
        };
    }
    const rest = normalized.substring(3);
    const part1 = rest.substring(0, 3);
    const part2 = rest.substring(3);
    const e164 = `+94${normalized.substring(1)}`;
    const national = `${prefix} ${part1} ${part2}`;
    const international = `+94 ${prefix.substring(1)} ${part1} ${part2}`;
    return {
        isValid: true,
        raw,
        clean: normalized,
        e164,
        national,
        international,
        prefix,
        carrier,
        type,
    };
}
/**
 * Returns true if the phone number is a valid Sri Lankan phone number.
 */
export function isValidPhone(input) {
    return validatePhone(input).isValid;
}
/**
 * Formats a valid Sri Lankan phone number to E.164 (+94771234567).
 * Returns null if invalid.
 */
export function toE164(input) {
    const res = validatePhone(input);
    return res.isValid ? res.e164 : null;
}
