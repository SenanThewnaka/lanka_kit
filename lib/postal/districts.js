import { DISTRICTS } from './data.js';
export const getDistricts = () => [...DISTRICTS].sort((a, b) => a.name_en.localeCompare(b.name_en));
export const getDistrictById = (id) => DISTRICTS.find((d) => d.id === id);
export const getDistrictByName = (nameEn) => DISTRICTS.find((d) => d.name_en.toLowerCase() === nameEn.trim().toLowerCase());
export const getDistrictsByProvinceId = (provinceId) => DISTRICTS.filter((d) => d.province_id === provinceId).sort((a, b) => a.name_en.localeCompare(b.name_en));
