import { CITIES } from './data.js';
import type { SriLankaCity } from './types.js';

const EARTH_RADIUS_KM = 6371;

export interface Coordinates {
  latitude: number;
  longitude: number;
}

/** Parses a city's stored string lat/lon into numbers. Returns undefined if either is missing or invalid. */
export const getCityCoordinates = (city: SriLankaCity): Coordinates | undefined => {
  if (city.latitude === '' || city.longitude === '') return undefined;
  const latitude = Number(city.latitude);
  const longitude = Number(city.longitude);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return undefined;
  return { latitude, longitude };
};

const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

/** Great-circle distance between two coordinates in kilometers (haversine formula). */
export const getDistanceKm = (a: Coordinates, b: Coordinates): number => {
  const dLat = toRadians(b.latitude - a.latitude);
  const dLon = toRadians(b.longitude - a.longitude);
  const lat1 = toRadians(a.latitude);
  const lat2 = toRadians(b.latitude);

  const h =
    Math.sin(dLat / 2) ** 2 + Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return EARTH_RADIUS_KM * c;
};

export interface NearestCityResult {
  city: SriLankaCity;
  distanceKm: number;
}

/**
 * Finds the closest known postal town(s) to a coordinate. Useful for reverse-geocoding
 * a GPS position to a district or postcode without an external API call.
 */
export const findNearestCities = (coordinates: Coordinates, limit = 1): NearestCityResult[] => {
  const results: NearestCityResult[] = [];
  for (const city of CITIES) {
    const cityCoords = getCityCoordinates(city);
    if (!cityCoords) continue;
    results.push({ city, distanceKm: getDistanceKm(coordinates, cityCoords) });
  }
  results.sort((a, b) => a.distanceKm - b.distanceKm);
  return results.slice(0, Math.max(0, limit));
};
