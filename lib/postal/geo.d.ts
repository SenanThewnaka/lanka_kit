import type { SriLankaCity } from './types.js';
export interface Coordinates {
    latitude: number;
    longitude: number;
}
/** Parses a city's stored string lat/lon into numbers. Returns undefined if either is missing or invalid. */
export declare const getCityCoordinates: (city: SriLankaCity) => Coordinates | undefined;
/** Great-circle distance between two coordinates in kilometers (haversine formula). */
export declare const getDistanceKm: (a: Coordinates, b: Coordinates) => number;
export interface NearestCityResult {
    city: SriLankaCity;
    distanceKm: number;
}
/**
 * Finds the closest known postal town(s) to a coordinate. Useful for reverse-geocoding
 * a GPS position to a district or postcode without an external API call.
 */
export declare const findNearestCities: (coordinates: Coordinates, limit?: number) => NearestCityResult[];
