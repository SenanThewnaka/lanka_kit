/**
 * Validation for Sri Lankan passports, TIN, and business registration numbers.
 */
export interface PassportResult {
    isValid: boolean;
    clean: string;
    type: 'Regular (N-Series)' | 'Diplomatic (D-Series)' | 'Official (O-Series)' | 'Legacy (M-Series)' | 'Biometric (PA-Series)' | 'Unknown';
    error?: string;
}
export interface TinResult {
    isValid: boolean;
    clean: string;
    format: 'NEW_10_DIGIT' | 'LEGACY_9_DIGIT' | 'UNKNOWN';
    error?: string;
}
export interface BrnResult {
    isValid: boolean;
    clean: string;
    type: 'Private Limited (PV)' | 'Public Limited (PB)' | 'Guarantee (GA/GL)' | 'Foreign/Other' | 'Unknown';
    registrationNumber: string;
    error?: string;
}
/**
 * Validates a Sri Lankan Passport Number.
 * Standard citizen passports start with 'N' followed by 7 digits (e.g., N1234567).
 * Diplomatic ('D'), Official ('O'), Legacy ('M'), and new e-passports ('PA') are also supported.
 */
export declare function validatePassport(input: string): PassportResult;
/**
 * Validates an Inland Revenue Department (IRD) Taxpayer Identification Number (TIN).
 * Mandatory in Sri Lanka for opening bank accounts, motor vehicle registrations, etc.
 * Formats: 9-digit or modern 10-digit numeric.
 */
export declare function validateTin(input: string): TinResult;
/**
 * Validates a Sri Lankan Business Registration Number (Registrar of Companies - ROC).
 * Examples:
 * - PV 12345 / PV 00123456 (Private Limited)
 * - PB 1234 (Public Limited)
 * - GA 1234 / GL 1234 (Company Limited by Guarantee)
 */
export declare function validateBrn(input: string): BrnResult;
