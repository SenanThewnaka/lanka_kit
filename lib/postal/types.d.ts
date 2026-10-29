/**
 * Sri Lanka provinces, districts and postal towns.
 *
 * Ported from sri-lanka-postal-locations by Hareeshkar Ravi (MIT). The
 * postcode-to-town-to-district assignments are checked against the official
 * Sri Lanka Post postcode directory. See NOTICE.md for data sources.
 */
export interface SriLankaProvince {
    id: string;
    name_en: string;
    name_si: string;
    name_ta: string;
}
export interface SriLankaDistrict {
    id: string;
    province_id: string;
    name_en: string;
    name_si: string;
    name_ta: string;
}
export interface SriLankaCity {
    id: string;
    district_id: string;
    name_en: string;
    name_si: string;
    name_ta: string;
    sub_name_en: string | null;
    sub_name_si: string | null;
    sub_name_ta: string | null;
    postcode: string;
    latitude: string;
    longitude: string;
}
