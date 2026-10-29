import type { SriLankaCity } from './types.js';
export declare const getAllCities: () => SriLankaCity[];
export declare const getCitiesByDistrictId: (districtId: string) => SriLankaCity[];
export declare const getCitiesByDistrictName: (districtNameEn: string) => SriLankaCity[];
export declare const getCitiesByProvinceId: (provinceId: string) => SriLankaCity[];
export declare const searchCitiesInDistrict: (districtNameEn: string, query: string) => SriLankaCity[];
/** Country-wide typeahead search, not scoped to a district. Matches name_en or postcode. */
export declare const searchCities: (query: string, limit?: number) => SriLankaCity[];
export declare const getCityById: (id: string) => SriLankaCity | undefined;
export declare const getCitiesByPostcode: (postcode: string) => SriLankaCity[];
