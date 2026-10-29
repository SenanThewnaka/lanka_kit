import { getCitiesByDistrictName } from './cities.js';
export const OTHER_CITY_VALUE = '__other__';
/** Backend stores `Batticaloa District`; picker uses `Batticaloa`. */
export const toBackendStateProvince = (districtNameEn) => {
    const trimmed = districtNameEn.trim();
    if (!trimmed)
        return '';
    return trimmed.endsWith(' District') ? trimmed : `${trimmed} District`;
};
export const fromBackendStateProvince = (stateProvince) => {
    if (!stateProvince)
        return '';
    const trimmed = stateProvince.trim();
    return trimmed.endsWith(' District') ? trimmed.slice(0, -' District'.length).trim() : trimmed;
};
export const isListedCity = (districtNameEn, cityName) => {
    if (!cityName?.trim())
        return false;
    return getCitiesByDistrictName(districtNameEn).some((c) => c.name_en.toLowerCase() === cityName.trim().toLowerCase());
};
