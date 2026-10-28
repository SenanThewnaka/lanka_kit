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
export function validateDrivingLicense(input: string): LicenseResult {
  if (typeof input !== 'string') {
    return { isValid: false, clean: '', format: 'UNKNOWN', error: 'Input must be a string' };
  }

  const clean = input.trim().toUpperCase().replace(/[\s-]/g, '');
  if (!clean) {
    return { isValid: false, clean: '', format: 'UNKNOWN', error: 'License number cannot be empty' };
  }

  // Modern computerized format: e.g. B1234567
  if (/^[A-Z][0-9]{7}$/.test(clean)) {
    return {
      isValid: true,
      clean,
      format: 'NEW',
    };
  }

  // Legacy format: 7 or 8 digits
  if (/^[0-9]{7,8}$/.test(clean)) {
    return {
      isValid: true,
      clean,
      format: 'OLD',
    };
  }

  return {
    isValid: false,
    clean,
    format: 'UNKNOWN',
    error: 'Invalid driving license format. Expected modern format (e.g. B1234567) or legacy numeric format.',
  };
}

export function isValidDrivingLicense(input: string): boolean {
  return validateDrivingLicense(input).isValid;
}
