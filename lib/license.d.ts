/**
 * Sri Lankan Driving License verification
 */
export interface LicenseResult {
    isValid: boolean;
    clean: string;
    format: 'NEW' | 'OLD' | 'UNKNOWN';
    error?: string;
}
/**
 * Validates Sri Lankan Driving License format.
 * - New format: 1 letter (usually 'B') followed by 7 digits (e.g. B1234567).
 * - Legacy format: 7 or 8 digits.
 */
export declare function validateDrivingLicense(input: string): LicenseResult;
export declare function isValidDrivingLicense(input: string): boolean;
