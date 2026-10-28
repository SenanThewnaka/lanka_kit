import { isValidNic, validateNic } from './nic';
import { isValidPhone, validatePhone } from './phone';
import { validateDrivingLicense } from './license';
import { validatePassport, validateTin, validateBrn } from './identity-extra';
import { validateVehiclePlate } from './vehicle';
import { isValidBankCode } from './banks';

/**
 * Zod refinement helper for Sri Lankan NIC.
 */
export const nicRefinement = {
  validator: (val: string) => isValidNic(val),
  message: 'Invalid Sri Lankan National Identity Card (NIC) number',
};

/**
 * Zod refinement helper for Sri Lankan Phone numbers.
 */
export const phoneRefinement = {
  validator: (val: string) => isValidPhone(val),
  message: 'Invalid Sri Lankan phone number',
};

/**
 * Zod refinement helper for Sri Lankan Driving Licenses.
 */
export const licenseRefinement = {
  validator: (val: string) => validateDrivingLicense(val).isValid,
  message: 'Invalid Sri Lankan Driving License number',
};

/**
 * Zod refinement helper for Sri Lankan Passports.
 */
export const passportRefinement = {
  validator: (val: string) => validatePassport(val).isValid,
  message: 'Invalid Sri Lankan Passport number (e.g., N1234567)',
};

/**
 * Zod refinement helper for Sri Lankan Tax Identification Number (TIN).
 */
export const tinRefinement = {
  validator: (val: string) => validateTin(val).isValid,
  message: 'Invalid Sri Lankan Tax Identification Number (TIN: 9 or 10 digits)',
};

/**
 * Zod refinement helper for Sri Lankan Business Registration Number (BRN / ROC).
 */
export const brnRefinement = {
  validator: (val: string) => validateBrn(val).isValid,
  message: 'Invalid Sri Lankan Business Registration Number (e.g. PV 12345)',
};

/**
 * Zod refinement helper for Sri Lankan Vehicle Registration Number Plate.
 */
export const vehiclePlateRefinement = {
  validator: (val: string) => validateVehiclePlate(val).isValid,
  message: 'Invalid Sri Lankan vehicle plate number (e.g. WP CAB-1234 or 64-1234)',
};

/**
 * Zod refinement helper for Sri Lankan Bank Code (CBSL 4-digit code).
 */
export const bankCodeRefinement = {
  validator: (val: string) => isValidBankCode(val),
  message: 'Invalid Sri Lankan bank routing code (e.g. 7010 for Commercial Bank)',
};

/**
 * Pluggable schema validator functions (usable in Zod, Yup, Joi, or React Hook Form).
 */
export const validators = {
  nic: (value: string) => {
    const res = validateNic(value);
    return res.isValid ? true : res.error;
  },
  phone: (value: string) => {
    const res = validatePhone(value);
    return res.isValid ? true : res.error;
  },
  license: (value: string) => {
    const res = validateDrivingLicense(value);
    return res.isValid ? true : res.error;
  },
  passport: (value: string) => {
    const res = validatePassport(value);
    return res.isValid ? true : res.error;
  },
  tin: (value: string) => {
    const res = validateTin(value);
    return res.isValid ? true : res.error;
  },
  brn: (value: string) => {
    const res = validateBrn(value);
    return res.isValid ? true : res.error;
  },
  vehiclePlate: (value: string) => {
    const res = validateVehiclePlate(value);
    return res.isValid ? true : res.error;
  },
  bankCode: (value: string) => {
    return isValidBankCode(value) ? true : 'Invalid Sri Lankan bank code';
  },
};
