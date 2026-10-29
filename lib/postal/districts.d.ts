import type { SriLankaDistrict } from './types.js';
export declare const getDistricts: () => SriLankaDistrict[];
export declare const getDistrictById: (id: string) => SriLankaDistrict | undefined;
export declare const getDistrictByName: (nameEn: string) => SriLankaDistrict | undefined;
export declare const getDistrictsByProvinceId: (provinceId: string) => SriLankaDistrict[];
