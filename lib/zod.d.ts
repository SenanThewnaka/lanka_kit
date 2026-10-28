/**
 * Zod refinement helper for Sri Lankan NIC.
 */
export declare const nicRefinement: {
    validator: (val: string) => boolean;
    message: string;
};
/**
 * Zod refinement helper for Sri Lankan Phone numbers.
 */
export declare const phoneRefinement: {
    validator: (val: string) => boolean;
    message: string;
};
/**
 * Zod refinement helper for Sri Lankan Driving Licenses.
 */
export declare const licenseRefinement: {
    validator: (val: string) => boolean;
    message: string;
};
/**
 * Zod refinement helper for Sri Lankan Passports.
 */
export declare const passportRefinement: {
    validator: (val: string) => boolean;
    message: string;
};
/**
 * Zod refinement helper for Sri Lankan Tax Identification Number (TIN).
 */
export declare const tinRefinement: {
    validator: (val: string) => boolean;
    message: string;
};
/**
 * Zod refinement helper for Sri Lankan Business Registration Number (BRN / ROC).
 */
export declare const brnRefinement: {
    validator: (val: string) => boolean;
    message: string;
};
/**
 * Zod refinement helper for Sri Lankan Vehicle Registration Number Plate.
 */
export declare const vehiclePlateRefinement: {
    validator: (val: string) => boolean;
    message: string;
};
/**
 * Zod refinement helper for Sri Lankan Bank Code (CBSL 4-digit code).
 */
export declare const bankCodeRefinement: {
    validator: (val: string) => boolean;
    message: string;
};
/**
 * Pluggable schema validator functions (usable in Zod, Yup, Joi, or React Hook Form).
 */
export declare const validators: {
    nic: (value: string) => string | true;
    phone: (value: string) => string | true;
    license: (value: string) => string | true | undefined;
    passport: (value: string) => string | true | undefined;
    tin: (value: string) => string | true | undefined;
    brn: (value: string) => string | true | undefined;
    vehiclePlate: (value: string) => string | true | undefined;
    bankCode: (value: string) => true | "Invalid Sri Lankan bank code";
};
