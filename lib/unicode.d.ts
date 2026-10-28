/**
 * Unicode normalization and search sanitization for Sinhala and Tamil text.
 */
/**
 * Normalizes Sinhala Unicode text:
 * - Fixes redundant/duplicate ZWJs (\u200D)
 * - Removes phantom Zero Width Spaces (\u200B)
 * - Standardizes multi-character vowel signs into their canonical unified Unicode representations
 *
 * Example: cleans text before saving to database to ensure consistency.
 */
export declare function normalizeSinhala(text: string): string;
/**
 * Strips all Zero Width Joiners (\u200D), ZWNJs (\u200C), and invisible characters.
 * Use this to produce a stripped search index so that queries like 'ප්ර' match 'ප්‍ර'.
 */
export declare function stripZwj(text: string): string;
/**
 * Checks whether a given string contains Sinhala Unicode characters.
 */
export declare function containsSinhala(text: string): boolean;
/**
 * Checks whether a given string contains Tamil Unicode characters.
 */
export declare function containsTamil(text: string): boolean;
/**
 * Prepares search queries by normalizing whitespace and invisibles for reliable text lookup.
 */
export declare function sanitizeSearchQuery(query: string): string;
