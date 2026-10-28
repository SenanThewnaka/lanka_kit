/**
 * Validation for Sri Lankan passports, TIN, and business registration numbers.
 */
/**
 * Validates a Sri Lankan Passport Number.
 * Standard citizen passports start with 'N' followed by 7 digits (e.g., N1234567).
 * Diplomatic ('D'), Official ('O'), Legacy ('M'), and new e-passports ('PA') are also supported.
 */
export function validatePassport(input) {
    if (!input || typeof input !== 'string') {
        return { isValid: false, clean: '', type: 'Unknown', error: 'Input must be a non-empty string' };
    }
    const clean = input.trim().toUpperCase().replace(/[\s-]/g, '');
    // 1. Regular N-series: N + 7 digits (e.g., N1234567)
    if (/^N\d{7}$/.test(clean)) {
        return {
            isValid: true,
            clean,
            type: 'Regular (N-Series)',
        };
    }
    // 2. Biometric PA-series: PA + 7 digits
    if (/^PA\d{7}$/.test(clean)) {
        return {
            isValid: true,
            clean,
            type: 'Biometric (PA-Series)',
        };
    }
    // 3. Diplomatic D-series: D + 7 digits
    if (/^D\d{7}$/.test(clean)) {
        return {
            isValid: true,
            clean,
            type: 'Diplomatic (D-Series)',
        };
    }
    // 4. Official O-series: O + 7 digits
    if (/^O\d{7}$/.test(clean)) {
        return {
            isValid: true,
            clean,
            type: 'Official (O-Series)',
        };
    }
    // 5. Legacy M-series: M + 7 digits
    if (/^M\d{7}$/.test(clean)) {
        return {
            isValid: true,
            clean,
            type: 'Legacy (M-Series)',
        };
    }
    return {
        isValid: false,
        clean,
        type: 'Unknown',
        error: 'Invalid Sri Lankan passport number format. Expected format like N1234567 or PA1234567.',
    };
}
/**
 * Validates an Inland Revenue Department (IRD) Taxpayer Identification Number (TIN).
 * Mandatory in Sri Lanka for opening bank accounts, motor vehicle registrations, etc.
 * Formats: 9-digit or modern 10-digit numeric.
 */
export function validateTin(input) {
    if (!input || typeof input !== 'string') {
        return { isValid: false, clean: '', format: 'UNKNOWN', error: 'Input must be a non-empty string' };
    }
    const clean = input.trim().replace(/[\s-]/g, '');
    if (!/^\d+$/.test(clean)) {
        return {
            isValid: false,
            clean,
            format: 'UNKNOWN',
            error: 'TIN must contain only numeric digits',
        };
    }
    if (clean.length === 10) {
        return {
            isValid: true,
            clean,
            format: 'NEW_10_DIGIT',
        };
    }
    if (clean.length === 9) {
        return {
            isValid: true,
            clean,
            format: 'LEGACY_9_DIGIT',
        };
    }
    return {
        isValid: false,
        clean,
        format: 'UNKNOWN',
        error: `Invalid TIN length (${clean.length} digits). Expected 9 or 10 digits.`,
    };
}
/**
 * Validates a Sri Lankan Business Registration Number (Registrar of Companies - ROC).
 * Examples:
 * - PV 12345 / PV 00123456 (Private Limited)
 * - PB 1234 (Public Limited)
 * - GA 1234 / GL 1234 (Company Limited by Guarantee)
 */
export function validateBrn(input) {
    if (!input || typeof input !== 'string') {
        return {
            isValid: false,
            clean: '',
            type: 'Unknown',
            registrationNumber: '',
            error: 'Input must be a non-empty string',
        };
    }
    const clean = input.trim().toUpperCase().replace(/\s+/g, ' ');
    // Match ROC formats: PV 12345, PV00123456, PB 1234, GA 1234
    const rocRegex = /^(PV|PB|GA|GL)\s*(\d{4,8})$/;
    const match = clean.match(rocRegex);
    if (match) {
        const prefix = match[1];
        const number = match[2];
        const standardized = `${prefix} ${number}`;
        let type = 'Foreign/Other';
        if (prefix === 'PV')
            type = 'Private Limited (PV)';
        else if (prefix === 'PB')
            type = 'Public Limited (PB)';
        else if (prefix === 'GA' || prefix === 'GL')
            type = 'Guarantee (GA/GL)';
        return {
            isValid: true,
            clean: standardized,
            type,
            registrationNumber: number,
        };
    }
    return {
        isValid: false,
        clean,
        type: 'Unknown',
        registrationNumber: '',
        error: 'Invalid Sri Lankan ROC registration number. Expected format like PV 12345 or PB 00123456.',
    };
}
