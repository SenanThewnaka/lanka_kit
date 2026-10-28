import { LankaQrInfo } from './types';
/**
 * Computes EMVCo standard CRC-16 (CCITT, polynomial 0x1021, initial 0xFFFF)
 */
export declare function computeCrc16(data: string): string;
/**
 * Parses TLV (Tag-Length-Value) blocks according to EMVCo / LANKAQR standard.
 */
export declare function parseTlv(payload: string): Map<string, string>;
/**
 * Parses and validates an EMVCo-compliant LANKAQR string.
 */
export declare function parseLankaQr(payload: string): LankaQrInfo;
