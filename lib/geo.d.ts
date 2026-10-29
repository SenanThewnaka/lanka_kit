import { DistrictInfo, PostalLocation } from './types.js';
/**
 * 25 Administrative Districts of Sri Lanka mapped to their 9 Provinces.
 */
export declare const SRI_LANKA_DISTRICTS: DistrictInfo[];
export declare const SRI_LANKA_PROVINCES: readonly ["Western", "Central", "Southern", "Northern", "Eastern", "North Western", "North Central", "Uva", "Sabaragamuwa"];
/**
 * Look up location information by Sri Lankan postal code.
 * Returns the post office recorded for that postcode in the Sri Lanka Post directory (2022).
 * Codes outside the register fall back to an estimate from the district postcode range.
 */
export declare function lookupPostalCode(postalCode: string | number): PostalLocation | null;
/**
 * Returns all districts in a given province.
 */
export declare function getDistrictsByProvince(provinceName: string): DistrictInfo[];
/**
 * Searches Sri Lankan post offices and postal codes by keyword.
 * Matches postcode, post-office name, district and province. One result per post office.
 */
export declare function searchLocations(query: string): PostalLocation[];
