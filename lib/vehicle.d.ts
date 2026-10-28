/**
 * Sri Lankan vehicle registration plate validation and parsing.
 */
export interface VehiclePlateResult {
    isValid: boolean;
    clean: string;
    format: 'MODERN' | 'TRANSITIONAL' | 'VINTAGE' | 'SRI' | 'UNKNOWN';
    province?: {
        code: string;
        name: string;
    };
    category: 'Motor Car' | 'Motor Cycle' | 'Three Wheeler' | 'Dual Purpose / Van' | 'Lorry / Commercial' | 'Tractor' | 'General' | 'Unknown';
    plateNumber: string;
    error?: string;
}
export declare const PROVINCE_MAP: Record<string, string>;
/**
 * Validates and analyzes a Sri Lankan vehicle registration plate number.
 *
 * Examples:
 * - "WP CAB-1234" (Modern 3-letter Western Province Car)
 * - "CP BAA-5678" (Modern Central Province Motor Cycle)
 * - "SP AAX-9012" (Modern Southern Province Three Wheeler)
 * - "WP 300-1234" (Transitional numeric prefix)
 * - "64-1234" (Vintage 2-digit series)
 * - "14 ශ්‍රී 1234" / "14 Sri 1234" (Vintage Sri series)
 */
export declare function validateVehiclePlate(input: string): VehiclePlateResult;
