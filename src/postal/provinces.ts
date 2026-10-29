import { PROVINCES } from './data.js';
import type { SriLankaProvince } from './types.js';

export const getProvinces = (): SriLankaProvince[] =>
  [...PROVINCES].sort((a, b) => a.name_en.localeCompare(b.name_en));

export const getProvinceById = (id: string): SriLankaProvince | undefined =>
  PROVINCES.find((p) => p.id === id);

export const getProvinceByName = (nameEn: string): SriLankaProvince | undefined =>
  PROVINCES.find((p) => p.name_en.toLowerCase() === nameEn.trim().toLowerCase());
