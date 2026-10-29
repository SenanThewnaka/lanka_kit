import { CITIES } from './data.js';
const EARTH_RADIUS_KM = 6371;
/** Parses a city's stored string lat/lon into numbers. Returns undefined if either is missing or invalid. */
export const getCityCoordinates = (city) => {
    if (city.latitude === '' || city.longitude === '')
        return undefined;
    const latitude = Number(city.latitude);
    const longitude = Number(city.longitude);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude))
        return undefined;
    return { latitude, longitude };
};
const toRadians = (degrees) => (degrees * Math.PI) / 180;
/** Great-circle distance between two coordinates in kilometers (haversine formula). */
export const getDistanceKm = (a, b) => {
    const dLat = toRadians(b.latitude - a.latitude);
    const dLon = toRadians(b.longitude - a.longitude);
    const lat1 = toRadians(a.latitude);
    const lat2 = toRadians(b.latitude);
    const h = Math.sin(dLat / 2) ** 2 + Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
    return EARTH_RADIUS_KM * c;
};
/**
 * Finds the closest known postal town(s) to a coordinate. Useful for reverse-geocoding
 * a GPS position to a district or postcode without an external API call.
 */
export const findNearestCities = (coordinates, limit = 1) => {
    const results = [];
    for (const city of CITIES) {
        const cityCoords = getCityCoordinates(city);
        if (!cityCoords)
            continue;
        results.push({ city, distanceKm: getDistanceKm(coordinates, cityCoords) });
    }
    results.sort((a, b) => a.distanceKm - b.distanceKm);
    return results.slice(0, Math.max(0, limit));
};
