export declare const OTHER_CITY_VALUE = "__other__";
/** Backend stores `Batticaloa District`; picker uses `Batticaloa`. */
export declare const toBackendStateProvince: (districtNameEn: string) => string;
export declare const fromBackendStateProvince: (stateProvince?: string | null) => string;
export declare const isListedCity: (districtNameEn: string, cityName?: string | null) => boolean;
