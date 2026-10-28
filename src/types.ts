/**
 * Types and interfaces for Sri Lankan Identity & Verification Toolkit (lanka-id)
 */

export type NicFormat = 'OLD' | 'NEW';
export type Gender = 'Male' | 'Female';

export interface NicValidationSuccess {
  isValid: true;
  nic: string;
  format: NicFormat;
  year: number;
  dayOfYear: number;
  gender: Gender;
  dateOfBirth: Date;
  dateOfBirthFormatted: string; // YYYY-MM-DD
  age: number;
  isVoter: boolean;
  serialNumber: string;
  checkDigit: string;
  equivalentNic: string | null; // Converted to the alternate format if possible
  meta: {
    isLeapYearRegistered: boolean;
    dayOfYearRaw: number;
  };
}

export interface NicValidationError {
  isValid: false;
  nic: string;
  error: string;
  code:
    | 'EMPTY_INPUT'
    | 'INVALID_LENGTH'
    | 'INVALID_CHARACTERS'
    | 'INVALID_DAY_OF_YEAR'
    | 'FUTURE_BIRTH_DATE'
    | 'INVALID_FORMAT';
}

export type NicResult = NicValidationSuccess | NicValidationError;

export type TelcoCarrier =
  | 'Dialog'
  | 'Mobitel'
  | 'Hutch'
  | 'Airtel'
  | 'SLT'
  | 'Unknown';

export type PhoneType = 'Mobile' | 'Fixed' | 'TollFree' | 'Unknown';

export interface PhoneValidationSuccess {
  isValid: true;
  raw: string;
  clean: string;
  e164: string; // e.g. +94771234567
  national: string; // e.g. 077 123 4567
  international: string; // e.g. +94 77 123 4567
  prefix: string; // e.g. 077
  carrier: TelcoCarrier;
  type: PhoneType;
}

export interface PhoneValidationError {
  isValid: false;
  raw: string;
  error: string;
  code: 'EMPTY_INPUT' | 'INVALID_CHARACTERS' | 'INVALID_LENGTH' | 'UNKNOWN_PREFIX';
}

export type PhoneResult = PhoneValidationSuccess | PhoneValidationError;

export interface DistrictInfo {
  name: string;
  code: string;
  province: string;
  postalCodeRange?: [number, number];
}

export interface PostalLocation {
  postalCode: string;
  city: string;
  district: string;
  province: string;
}

export interface LankaQrInfo {
  isValid: boolean;
  rawPayload: string;
  formatIndicator?: string;
  pointOfInitiation?: 'Static' | 'Dynamic';
  merchantAccountInfo?: Record<string, string>;
  merchantCategoryCode?: string;
  transactionCurrency?: string;
  transactionCurrencyCode?: string; // 144 = LKR
  transactionAmount?: number;
  countryCode?: string; // LK
  merchantName?: string;
  merchantCity?: string;
  postalCode?: string;
  additionalData?: Record<string, string>;
  crcValid?: boolean;
  error?: string;
}
