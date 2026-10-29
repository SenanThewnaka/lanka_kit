import { DISTRICTS } from './data.js';
import type { SriLankaDistrict } from './types.js';

export const getDistricts = (): SriLankaDistrict[] =>
  [...DISTRICTS].sort((a, b) => a.name_en.localeCompare(b.name_en));

export const getDistrictById = (id: string): SriLankaDistrict | undefined =>
  DISTRICTS.find((d) => d.id === id);

export const getDistrictByName = (nameEn: string): SriLankaDistrict | undefined =>
  DISTRICTS.find((d) => d.name_en.toLowerCase() === nameEn.trim().toLowerCase());

export const getDistrictsByProvinceId = (provinceId: string): SriLankaDistrict[] =>
  DISTRICTS.filter((d) => d.province_id === provinceId).sort((a, b) =>
    a.name_en.localeCompare(b.name_en),
  );
