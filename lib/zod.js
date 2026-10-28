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
    validator: (val) => isValidNic(val),
    message: 'Invalid Sri Lankan National Identity Card (NIC) number',
};
/**
 * Zod refinement helper for Sri Lankan Phone numbers.
 */
export const phoneRefinement = {
    validator: (val) => isValidPhone(val),
    message: 'Invalid Sri Lankan phone number',
};
/**
 * Zod refinement helper for Sri Lankan Driving Licenses.
 */
export const licenseRefinement = {
    validator: (val) => validateDrivingLicense(val).isValid,
    message: 'Invalid Sri Lankan Driving License number',
};
/**
 * Zod refinement helper for Sri Lankan Passports.
 */
export const passportRefinement = {
    validator: (val) => validatePassport(val).isValid,
    message: 'Invalid Sri Lankan Passport number (e.g., N1234567)',
};
/**
 * Zod refinement helper for Sri Lankan Tax Identification Number (TIN).
 */
export const tinRefinement = {
    validator: (val) => validateTin(val).isValid,
    message: 'Invalid Sri Lankan Tax Identification Number (TIN: 9 or 10 digits)',
};
/**
 * Zod refinement helper for Sri Lankan Business Registration Number (BRN / ROC).
 */
export const brnRefinement = {
    validator: (val) => validateBrn(val).isValid,
    message: 'Invalid Sri Lankan Business Registration Number (e.g. PV 12345)',
};
/**
 * Zod refinement helper for Sri Lankan Vehicle Registration Number Plate.
 */
export const vehiclePlateRefinement = {
    validator: (val) => validateVehiclePlate(val).isValid,
    message: 'Invalid Sri Lankan vehicle plate number (e.g. WP CAB-1234 or 64-1234)',
};
/**
 * Zod refinement helper for Sri Lankan Bank Code (CBSL 4-digit code).
 */
export const bankCodeRefinement = {
    validator: (val) => isValidBankCode(val),
    message: 'Invalid Sri Lankan bank routing code (e.g. 7010 for Commercial Bank)',
};
/**
 * Pluggable schema validator functions (usable in Zod, Yup, Joi, or React Hook Form).
 */
export const validators = {
    nic: (value) => {
        const res = validateNic(value);
        return res.isValid ? true : res.error;
    },
    phone: (value) => {
        const res = validatePhone(value);
        return res.isValid ? true : res.error;
    },
    license: (value) => {
        const res = validateDrivingLicense(value);
        return res.isValid ? true : res.error;
    },
    passport: (value) => {
        const res = validatePassport(value);
        return res.isValid ? true : res.error;
    },
    tin: (value) => {
        const res = validateTin(value);
        return res.isValid ? true : res.error;
    },
    brn: (value) => {
        const res = validateBrn(value);
        return res.isValid ? true : res.error;
    },
    vehiclePlate: (value) => {
        const res = validateVehiclePlate(value);
        return res.isValid ? true : res.error;
    },
    bankCode: (value) => {
        return isValidBankCode(value) ? true : 'Invalid Sri Lankan bank code';
    },
};
