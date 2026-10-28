import {
  Gender,
  NicFormat,
  NicResult,
  NicValidationError,
  NicValidationSuccess,
} from './types';

/**
 * Month-day mapping according to Sri Lankan Department of Registration of Persons (DRP).
 * DRP registers day-of-year on a fixed 366-day calendar where February is allocated 29 days
 * regardless of whether the birth year is a leap year.
 */
const DRP_MONTH_DAYS = [
  { month: 1, name: 'January', days: 31 },
  { month: 2, name: 'February', days: 29 },
  { month: 3, name: 'March', days: 31 },
  { month: 4, name: 'April', days: 30 },
  { month: 5, name: 'May', days: 31 },
  { month: 6, name: 'June', days: 30 },
  { month: 7, name: 'July', days: 31 },
  { month: 8, name: 'August', days: 31 },
  { month: 9, name: 'September', days: 30 },
  { month: 10, name: 'October', days: 31 },
  { month: 11, name: 'November', days: 30 },
  { month: 12, name: 'December', days: 31 },
];

/**
 * Check if a given year is a leap year in the Gregorian calendar.
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Cleans and standardizes an NIC input string (trims whitespace, converts check letter to uppercase).
 */
export function sanitizeNic(input: string): string {
  if (typeof input !== 'string') return '';
  return input.trim().toUpperCase().replace(/[\s-]/g, '');
}

/**
 * Calculates calendar month and day from the DRP day-of-year (1-366).
 */
function resolveDrpDate(
  year: number,
  dayOfYear: number
): { month: number; day: number; isFeb29Adjustment: boolean } {
  let remainingDays = dayOfYear;
  let resolvedMonth = 1;
  let resolvedDay = 1;

  for (const m of DRP_MONTH_DAYS) {
    if (remainingDays <= m.days) {
      resolvedMonth = m.month;
      resolvedDay = remainingDays;
      break;
    }
    remainingDays -= m.days;
  }

  // Handle February 29 in non-leap years
  let isFeb29Adjustment = false;
  if (resolvedMonth === 2 && resolvedDay === 29 && !isLeapYear(year)) {
    isFeb29Adjustment = true;
    resolvedDay = 28; // fallback to Feb 28 for Date object validity
  }

  return {
    month: resolvedMonth,
    day: resolvedDay,
    isFeb29Adjustment,
  };
}

/**
 * Calculates current age based on birth date.
 */
function calculateAge(birthDate: Date, referenceDate: Date = new Date()): number {
  let age = referenceDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = referenceDate.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && referenceDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

/**
 * Formats a Date object to YYYY-MM-DD.
 */
function formatDateToIso(year: number, month: number, day: number): string {
  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
}

/**
 * Converts an Old NIC (9 digits + V/X) to New NIC (12 digits).
 */
export function convertOldToNewNic(oldNic: string): string | null {
  const clean = sanitizeNic(oldNic);
  if (!/^[0-9]{9}[VX]$/.test(clean)) return null;

  const year = '19' + clean.substring(0, 2);
  const days = clean.substring(2, 5);
  const serial = '0' + clean.substring(5, 8);
  const check = clean.substring(8, 9);

  return `${year}${days}${serial}${check}`;
}

/**
 * Converts a New NIC (12 digits) to Old NIC (9 digits + V) if born between 1900 and 1999.
 */
export function convertNewToOldNic(newNic: string): string | null {
  const clean = sanitizeNic(newNic);
  if (!/^[0-9]{12}$/.test(clean)) return null;

  const year = parseInt(clean.substring(0, 4), 10);
  // Old NIC format was only used for individuals born before 2000
  if (year < 1900 || year >= 2000) return null;

  // The 8th digit (index 7) in converted new NIC is always '0'
  if (clean[7] !== '0') return null;

  const shortYear = clean.substring(2, 4);
  const days = clean.substring(4, 7);
  const serial = clean.substring(8, 11);
  const check = clean.substring(11, 12);

  return `${shortYear}${days}${serial}${check}V`;
}

/**
 * Converts an NIC to its alternate equivalent format if applicable.
 */
export function convertNic(nic: string): string | null {
  const clean = sanitizeNic(nic);
  if (clean.length === 10) return convertOldToNewNic(clean);
  if (clean.length === 12) return convertNewToOldNic(clean);
  return null;
}

/**
 * Validates and extracts comprehensive identity information from a Sri Lankan NIC.
 * Supports both Old (9 digits + V/X) and New (12 digits) formats.
 */
export function validateNic(input: string): NicResult {
  const clean = sanitizeNic(input);

  if (!clean) {
    return {
      isValid: false,
      nic: input,
      error: 'NIC input cannot be empty',
      code: 'EMPTY_INPUT',
    };
  }

  // Check length
  if (clean.length !== 10 && clean.length !== 12) {
    return {
      isValid: false,
      nic: clean,
      error: `Invalid NIC length (${clean.length}). Old NICs must be 10 characters (9 digits + V/X), New NICs must be 12 digits.`,
      code: 'INVALID_LENGTH',
    };
  }

  let format: NicFormat;
  let year: number;
  let dayOfYearRaw: number;
  let serialNumber: string;
  let checkDigit: string;
  let isVoter = true;

  if (clean.length === 10) {
    format = 'OLD';
    if (!/^[0-9]{9}[VX]$/.test(clean)) {
      return {
        isValid: false,
        nic: clean,
        error:
          'Old NIC format must contain exactly 9 numbers followed by V (voter) or X (non-voter).',
        code: 'INVALID_CHARACTERS',
      };
    }

    year = 1900 + parseInt(clean.substring(0, 2), 10);
    dayOfYearRaw = parseInt(clean.substring(2, 5), 10);
    serialNumber = clean.substring(5, 8);
    checkDigit = clean.substring(8, 9);
    isVoter = clean.endsWith('V');
  } else {
    format = 'NEW';
    if (!/^[0-9]{12}$/.test(clean)) {
      return {
        isValid: false,
        nic: clean,
        error: 'New NIC format must contain exactly 12 numeric digits.',
        code: 'INVALID_CHARACTERS',
      };
    }

    year = parseInt(clean.substring(0, 4), 10);
    dayOfYearRaw = parseInt(clean.substring(4, 7), 10);
    serialNumber = clean.substring(7, 11);
    checkDigit = clean.substring(11, 12);
  }

  // Gender and day-of-year offset logic
  let gender: Gender;
  let dayOfYear: number;

  if (dayOfYearRaw > 500) {
    gender = 'Female';
    dayOfYear = dayOfYearRaw - 500;
  } else {
    gender = 'Male';
    dayOfYear = dayOfYearRaw;
  }

  // Validate day of year range (1 - 366)
  if (dayOfYear < 1 || dayOfYear > 366) {
    return {
      isValid: false,
      nic: clean,
      error: `Invalid birth day-of-year (${dayOfYearRaw}). Day of year must be between 001-366 for males, or 501-866 for females.`,
      code: 'INVALID_DAY_OF_YEAR',
    };
  }

  // Compute exact Date of Birth
  const { month, day, isFeb29Adjustment } = resolveDrpDate(year, dayOfYear);
  const dateOfBirth = new Date(Date.UTC(year, month - 1, day));
  const now = new Date();

  // Validate against future birth dates
  if (dateOfBirth.getTime() > now.getTime()) {
    return {
      isValid: false,
      nic: clean,
      error: `Extracted date of birth (${formatDateToIso(year, month, day)}) is in the future.`,
      code: 'FUTURE_BIRTH_DATE',
    };
  }

  const age = calculateAge(dateOfBirth, now);
  if (format === 'NEW') {
    isVoter = age >= 18;
  }

  const equivalentNic =
    format === 'OLD' ? convertOldToNewNic(clean) : convertNewToOldNic(clean);

  return {
    isValid: true,
    nic: clean,
    format,
    year,
    dayOfYear,
    gender,
    dateOfBirth,
    dateOfBirthFormatted: formatDateToIso(year, month, day),
    age,
    isVoter,
    serialNumber,
    checkDigit,
    equivalentNic,
    meta: {
      isLeapYearRegistered: isFeb29Adjustment,
      dayOfYearRaw,
    },
  };
}

/**
 * Returns true if the given input is a valid Sri Lankan NIC.
 */
export function isValidNic(input: string): boolean {
  return validateNic(input).isValid;
}

/**
 * Parses an NIC and returns the extracted payload or throws an Error.
 */
export function parseNic(input: string): NicValidationSuccess {
  const result = validateNic(input);
  if (!result.isValid) {
    throw new Error(`[lanka-id] ${(result as NicValidationError).error}`);
  }
  return result;
}

/**
 * Formats an NIC nicely for display (e.g. 962451234V or 199624501234).
 */
export function formatNic(input: string): string {
  const clean = sanitizeNic(input);
  if (clean.length === 10) {
    return `${clean.substring(0, 9)}${clean.charAt(9).toUpperCase()}`;
  }
  return clean;
}
