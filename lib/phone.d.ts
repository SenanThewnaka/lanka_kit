import { PhoneResult } from './types';
/**
 * Cleans phone input by removing spaces, brackets, hyphens, and leading +
 */
export declare function sanitizePhone(input: string): string;
/**
 * Validates and parses a Sri Lankan phone number.
 * Normalizes input variants like:
 * - 0771234567
 * - +94771234567
 * - 0094771234567
 * - 94771234567
 * - 771234567
 */
export declare function validatePhone(input: string): PhoneResult;
/**
 * Returns true if the phone number is a valid Sri Lankan phone number.
 */
export declare function isValidPhone(input: string): boolean;
/**
 * Formats a valid Sri Lankan phone number to E.164 (+94771234567).
 * Returns null if invalid.
 */
export declare function toE164(input: string): string | null;
