import { DistrictInfo, PostalLocation } from './types.js';
import { CITIES, DISTRICTS, PROVINCES } from './postal/data.js';

/**
 * 25 Administrative Districts of Sri Lanka mapped to their 9 Provinces.
 */
export const SRI_LANKA_DISTRICTS: DistrictInfo[] = [
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
] as const;

/**
 * Postal data (postcode -> post office -> district -> province) comes from the verified
 * Sri Lanka Post directory dataset in ./postal/data. It is built once, on first use.
 */
interface PostalIndex {
  all: PostalLocation[];
  byPostcode: Map<string, PostalLocation>;
}

let cachedIndex: PostalIndex | undefined;

const buildIndex = (): PostalIndex => {
  const provinceNameById = new Map(PROVINCES.map((p) => [p.id, p.name_en]));
  const districtById = new Map(
    DISTRICTS.map((d) => [
      d.id,
      { name: d.name_en, province: provinceNameById.get(d.province_id) ?? '' },
    ]),
  );
  const all: PostalLocation[] = [];
  const byPostcode = new Map<string, PostalLocation>();
  for (const city of CITIES) {
    const district = districtById.get(city.district_id);
    const location: PostalLocation = {
      postalCode: city.postcode,
      city: city.name_en,
      district: district?.name ?? '',
      province: district?.province ?? '',
    };
    all.push(location);
    // A postcode can serve more than one post office; lookupPostalCode returns the first in dataset order.
    if (!byPostcode.has(city.postcode)) byPostcode.set(city.postcode, location);
  }
  return { all, byPostcode };
};

const getIndex = (): PostalIndex => (cachedIndex ??= buildIndex());

/**
 * Alternative spellings that users type but the official register does not use.
 * Keys and values are lowercase. Searching for the key also searches for the value.
 * Malabe is printed as Malambe (postcode 10115) in the Sri Lanka Post directory.
 */
const SEARCH_ALIASES: Record<string, string> = {
  malabe: 'malambe',
};

/**
 * Look up location information by Sri Lankan postal code.
 * Returns the post office recorded for that postcode in the Sri Lanka Post directory (2022).
 * Codes outside the register fall back to an estimate from the district postcode range.
 */
export function lookupPostalCode(postalCode: string | number): PostalLocation | null {
  const code = String(postalCode).trim().padStart(5, '0');
  const found = getIndex().byPostcode.get(code);
  if (found) return { ...found };

  // Fallback: estimate district and province from postal code range
  const numCode = parseInt(code, 10);
  if (!isNaN(numCode)) {
    const matchedDistrict = SRI_LANKA_DISTRICTS.find(
      (d) =>
        d.postalCodeRange &&
        numCode >= d.postalCodeRange[0] &&
        numCode <= d.postalCodeRange[1]
    );
    if (matchedDistrict) {
      return {
        postalCode: code,
        city: `${matchedDistrict.name} Area`,
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
export function getDistrictsByProvince(provinceName: string): DistrictInfo[] {
  const norm = provinceName.trim().toLowerCase();
  return SRI_LANKA_DISTRICTS.filter(
    (d) => d.province.toLowerCase() === norm
  );
}

/**
 * Searches Sri Lankan post offices and postal codes by keyword.
 * Matches postcode, post-office name, district and province. One result per post office.
 */
export function searchLocations(query: string): PostalLocation[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const terms = [q];
  const alias = SEARCH_ALIASES[q];
  if (alias) terms.push(alias);

  return getIndex()
    .all.filter((loc) =>
      terms.some(
        (t) =>
          loc.postalCode.includes(t) ||
          loc.city.toLowerCase().includes(t) ||
          loc.district.toLowerCase().includes(t) ||
          loc.province.toLowerCase().includes(t)
      )
    )
    .map((loc) => ({ ...loc }));
}
