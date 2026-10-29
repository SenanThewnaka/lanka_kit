import { PROVINCES } from './data.js';
export const getProvinces = () => [...PROVINCES].sort((a, b) => a.name_en.localeCompare(b.name_en));
export const getProvinceById = (id) => PROVINCES.find((p) => p.id === id);
export const getProvinceByName = (nameEn) => PROVINCES.find((p) => p.name_en.toLowerCase() === nameEn.trim().toLowerCase());
