/**
 * 25 Administrative Districts of Sri Lanka mapped to their 9 Provinces.
 */
export const SRI_LANKA_DISTRICTS = [
    // Western Province
    { name: 'Colombo', code: 'COL', province: 'Western', postalCodeRange: [0, 10999] },
    { name: 'Gampaha', code: 'GAM', province: 'Western', postalCodeRange: [11000, 11999] },
    { name: 'Kalutara', code: 'KAL', province: 'Western', postalCodeRange: [12000, 12999] },
    // Central Province
    { name: 'Kandy', code: 'KAN', province: 'Central', postalCodeRange: [20000, 20999] },
    { name: 'Matale', code: 'MTL', province: 'Central', postalCodeRange: [21000, 21999] },
    { name: 'Nuwara Eliya', code: 'NEL', province: 'Central', postalCodeRange: [22000, 22999] },
    // Southern Province
    { name: 'Galle', code: 'GAL', province: 'Southern', postalCodeRange: [80000, 80999] },
    { name: 'Matara', code: 'MAT', province: 'Southern', postalCodeRange: [81000, 81999] },
    { name: 'Hambantota', code: 'HAM', province: 'Southern', postalCodeRange: [82000, 82999] },
    // Northern Province
    { name: 'Jaffna', code: 'JAF', province: 'Northern', postalCodeRange: [40000, 40999] },
    { name: 'Kilinochchi', code: 'KIL', province: 'Northern', postalCodeRange: [44000, 44999] },
    { name: 'Mannar', code: 'MAN', province: 'Northern', postalCodeRange: [41000, 41999] },
    { name: 'Vavuniya', code: 'VAV', province: 'Northern', postalCodeRange: [43000, 43999] },
    { name: 'Mullaitivu', code: 'MUL', province: 'Northern', postalCodeRange: [42000, 42999] },
    // Eastern Province
    { name: 'Batticaloa', code: 'BAT', province: 'Eastern', postalCodeRange: [30000, 30999] },
    { name: 'Ampara', code: 'AMP', province: 'Eastern', postalCodeRange: [32000, 32999] },
    { name: 'Trincomalee', code: 'TRI', province: 'Eastern', postalCodeRange: [31000, 31999] },
    // North Western Province
    { name: 'Kurunegala', code: 'KUR', province: 'North Western', postalCodeRange: [60000, 60999] },
    { name: 'Puttalam', code: 'PUT', province: 'North Western', postalCodeRange: [61000, 61999] },
    // North Central Province
    { name: 'Anuradhapura', code: 'ANU', province: 'North Central', postalCodeRange: [50000, 50999] },
    { name: 'Polonnaruwa', code: 'POL', province: 'North Central', postalCodeRange: [51000, 51999] },
    // Uva Province
    { name: 'Badulla', code: 'BAD', province: 'Uva', postalCodeRange: [90000, 90999] },
    { name: 'Monaragala', code: 'MON', province: 'Uva', postalCodeRange: [91000, 91999] },
    // Sabaragamuwa Province
    { name: 'Ratnapura', code: 'RAT', province: 'Sabaragamuwa', postalCodeRange: [70000, 70999] },
    { name: 'Kegalle', code: 'KEG', province: 'Sabaragamuwa', postalCodeRange: [71000, 71999] },
];
export const SRI_LANKA_PROVINCES = [
    'Western',
    'Central',
    'Southern',
    'Northern',
    'Eastern',
    'North Western',
    'North Central',
    'Uva',
    'Sabaragamuwa',
];
/**
 * Key Sri Lankan Postal Codes Registry
 */
const POSTAL_CODES = {
    // Colombo postal zones (00100 - 01500)
    '00100': { city: 'Colombo 01 (Fort)', district: 'Colombo', province: 'Western' },
    '00200': { city: 'Colombo 02 (Slave Island)', district: 'Colombo', province: 'Western' },
    '00300': { city: 'Colombo 03 (Kollupitiya)', district: 'Colombo', province: 'Western' },
    '00400': { city: 'Colombo 04 (Bambalapitiya)', district: 'Colombo', province: 'Western' },
    '00500': { city: 'Colombo 05 (Havelock Town / Kirulapone)', district: 'Colombo', province: 'Western' },
    '00600': { city: 'Colombo 06 (Wellawatte / Pamankada)', district: 'Colombo', province: 'Western' },
    '00700': { city: 'Colombo 07 (Cinnamon Gardens)', district: 'Colombo', province: 'Western' },
    '00800': { city: 'Colombo 08 (Borella)', district: 'Colombo', province: 'Western' },
    '00900': { city: 'Colombo 09 (Dematagoda)', district: 'Colombo', province: 'Western' },
    '01000': { city: 'Colombo 10 (Maradana / Panchikawatte)', district: 'Colombo', province: 'Western' },
    '01100': { city: 'Colombo 11 (Pettah)', district: 'Colombo', province: 'Western' },
    '01200': { city: 'Colombo 12 (Hultsdorf)', district: 'Colombo', province: 'Western' },
    '01300': { city: 'Colombo 13 (Kotahena / Bloemendhal)', district: 'Colombo', province: 'Western' },
    '01400': { city: 'Colombo 14 (Grandpass)', district: 'Colombo', province: 'Western' },
    '01500': { city: 'Colombo 15 (Mutwal / Modara / Mattakkuliya)', district: 'Colombo', province: 'Western' },
    // Colombo Suburbs
    '10100': { city: 'Battaramulla', district: 'Colombo', province: 'Western' },
    '10115': { city: 'Rajagiriya', district: 'Colombo', province: 'Western' },
    '10120': { city: 'Kotte (Sri Jayawardenepura)', district: 'Colombo', province: 'Western' },
    '10200': { city: 'Malabe', district: 'Colombo', province: 'Western' },
    '10230': { city: 'Kottawa', district: 'Colombo', province: 'Western' },
    '10250': { city: 'Nugegoda', district: 'Colombo', province: 'Western' },
    '10280': { city: 'Maharagama', district: 'Colombo', province: 'Western' },
    '10300': { city: 'Piliyandala', district: 'Colombo', province: 'Western' },
    '10350': { city: 'Dehiwala', district: 'Colombo', province: 'Western' },
    '10370': { city: 'Mount Lavinia', district: 'Colombo', province: 'Western' },
    '10400': { city: 'Moratuwa', district: 'Colombo', province: 'Western' },
    '10500': { city: 'Homagama', district: 'Colombo', province: 'Western' },
    '10640': { city: 'Avissawella', district: 'Colombo', province: 'Western' },
    // Gampaha District
    '11000': { city: 'Gampaha', district: 'Gampaha', province: 'Western' },
    '11300': { city: 'Kelaniya', district: 'Gampaha', province: 'Western' },
    '11500': { city: 'Negombo', district: 'Gampaha', province: 'Western' },
    '11540': { city: 'Katunayake (BIA)', district: 'Gampaha', province: 'Western' },
    '11600': { city: 'Ja-Ela', district: 'Gampaha', province: 'Western' },
    '11700': { city: 'Wattala', district: 'Gampaha', province: 'Western' },
    '11850': { city: 'Kiribathgoda', district: 'Gampaha', province: 'Western' },
    // Kalutara District
    '12000': { city: 'Kalutara', district: 'Kalutara', province: 'Western' },
    '12500': { city: 'Panadura', district: 'Kalutara', province: 'Western' },
    '12580': { city: 'Horana', district: 'Kalutara', province: 'Western' },
    '12070': { city: 'Beruwala', district: 'Kalutara', province: 'Western' },
    '12090': { city: 'Aluthgama', district: 'Kalutara', province: 'Western' },
    // Kandy District
    '20000': { city: 'Kandy', district: 'Kandy', province: 'Central' },
    '20400': { city: 'Peradeniya', district: 'Kandy', province: 'Central' },
    '20500': { city: 'Gampola', district: 'Kandy', province: 'Central' },
    '20100': { city: 'Katugastota', district: 'Kandy', province: 'Central' },
    // Galle District
    '80000': { city: 'Galle', district: 'Galle', province: 'Southern' },
    '80240': { city: 'Hikkaduwa', district: 'Galle', province: 'Southern' },
    '80300': { city: 'Ambalangoda', district: 'Galle', province: 'Southern' },
    '80480': { city: 'Karapitiya', district: 'Galle', province: 'Southern' },
    // Matara District
    '81000': { city: 'Matara', district: 'Matara', province: 'Southern' },
    '81100': { city: 'Mirissa', district: 'Matara', province: 'Southern' },
    '81200': { city: 'Weligama', district: 'Matara', province: 'Southern' },
    // Hambantota District
    '82000': { city: 'Hambantota', district: 'Hambantota', province: 'Southern' },
    '82200': { city: 'Tangalle', district: 'Hambantota', province: 'Southern' },
    // Jaffna District
    '40000': { city: 'Jaffna', district: 'Jaffna', province: 'Northern' },
    '40030': { city: 'Nallur', district: 'Jaffna', province: 'Northern' },
    '40080': { city: 'Chavakachcheri', district: 'Jaffna', province: 'Northern' },
    '40200': { city: 'Point Pedro', district: 'Jaffna', province: 'Northern' },
    // Kurunegala District
    '60000': { city: 'Kurunegala', district: 'Kurunegala', province: 'North Western' },
    '60200': { city: 'Kuliyapitiya', district: 'Kurunegala', province: 'North Western' },
    // Anuradhapura District
    '50000': { city: 'Anuradhapura', district: 'Anuradhapura', province: 'North Central' },
    // Ratnapura District
    '70000': { city: 'Ratnapura', district: 'Ratnapura', province: 'Sabaragamuwa' },
    // Badulla District
    '90000': { city: 'Badulla', district: 'Badulla', province: 'Uva' },
    '90100': { city: 'Bandarawela', district: 'Badulla', province: 'Uva' },
    '90090': { city: 'Ella', district: 'Badulla', province: 'Uva' },
    // Batticaloa & Trincomalee
    '30000': { city: 'Batticaloa', district: 'Batticaloa', province: 'Eastern' },
    '31000': { city: 'Trincomalee', district: 'Trincomalee', province: 'Eastern' },
    '32000': { city: 'Ampara', district: 'Ampara', province: 'Eastern' },
};
/**
 * Look up location information by Sri Lankan postal code.
 */
export function lookupPostalCode(postalCode) {
    const code = String(postalCode).trim().padStart(5, '0');
    const found = POSTAL_CODES[code];
    if (found) {
        return {
            postalCode: code,
            city: found.city,
            district: found.district,
            province: found.province,
        };
    }
    // Fallback: estimate district and province from postal code range
    const numCode = parseInt(code, 10);
    if (!isNaN(numCode)) {
        const matchedDistrict = SRI_LANKA_DISTRICTS.find((d) => d.postalCodeRange &&
            numCode >= d.postalCodeRange[0] &&
            numCode <= d.postalCodeRange[1]);
        if (matchedDistrict) {
            return {
                postalCode: code,
                city: `${matchedDistrict.name} Region`,
                district: matchedDistrict.name,
                province: matchedDistrict.province,
            };
        }
    }
    return null;
}
/**
 * Returns all districts in a given province.
 */
export function getDistrictsByProvince(provinceName) {
    const norm = provinceName.trim().toLowerCase();
    return SRI_LANKA_DISTRICTS.filter((d) => d.province.toLowerCase() === norm);
}
/**
 * Searches Sri Lankan cities and postal codes by keyword.
 */
export function searchLocations(query) {
    const q = query.trim().toLowerCase();
    if (!q)
        return [];
    const results = [];
    for (const [code, info] of Object.entries(POSTAL_CODES)) {
        if (code.includes(q) ||
            info.city.toLowerCase().includes(q) ||
            info.district.toLowerCase().includes(q) ||
            info.province.toLowerCase().includes(q)) {
            results.push({
                postalCode: code,
                city: info.city,
                district: info.district,
                province: info.province,
            });
        }
    }
    return results;
}
