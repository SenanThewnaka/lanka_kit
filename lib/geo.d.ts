import { DistrictInfo, PostalLocation } from './types';
/**
 * 25 Administrative Districts of Sri Lanka mapped to their 9 Provinces.
 */
export declare const SRI_LANKA_DISTRICTS: DistrictInfo[];
export declare const SRI_LANKA_PROVINCES: readonly ["Western", "Central", "Southern", "Northern", "Eastern", "North Western", "North Central", "Uva", "Sabaragamuwa"];
/**
 * Look up location information by Sri Lankan postal code.
 */
export declare function lookupPostalCode(postalCode: string | number): PostalLocation | null;
/**
 * Returns all districts in a given province.
 */
export declare function getDistrictsByProvince(provinceName: string): DistrictInfo[];
/**
 * Searches Sri Lankan cities and postal codes by keyword.
 */
export declare function searchLocations(query: string): PostalLocation[];
