/**
 * Postal locations: provinces → districts → postal towns, with postcodes,
 * coordinates, and helpers for location pickers and typeahead search.
 *
 * Import from the subpath to keep the main bundle small:
 *   import { getDistricts } from 'lanka-kit/postal';
 */
export type { SriLankaProvince, SriLankaDistrict, SriLankaCity } from './types.js';
export type { Coordinates, NearestCityResult } from './geo.js';

export { getProvinces, getProvinceById, getProvinceByName } from './provinces.js';

export {
  getDistricts,
  getDistrictById,
  getDistrictByName,
  getDistrictsByProvinceId,
} from './districts.js';

export {
  getAllCities,
  getCitiesByDistrictId,
  getCitiesByDistrictName,
  getCitiesByProvinceId,
  searchCitiesInDistrict,
  searchCities,
  getCityById,
  getCitiesByPostcode,
} from './cities.js';

export { getCityCoordinates, getDistanceKm, findNearestCities } from './geo.js';

export {
  OTHER_CITY_VALUE,
  toBackendStateProvince,
  fromBackendStateProvince,
  isListedCity,
} from './normalize.js';
