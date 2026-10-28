/**
 * Unicode normalization and search sanitization for Sinhala and Tamil text.
 */

// Sinhala Unicode range: \u0D80 - \u0DFF
// Tamil Unicode range: \u0B80 - \u0BFF

const ZWJ = '\u200D'; // Zero Width Joiner
const ZWNJ = '\u200C'; // Zero Width Non-Joiner
const ZWS = '\u200B'; // Zero Width Space

/**
 * Normalizes Sinhala Unicode text:
 * - Fixes redundant/duplicate ZWJs (\u200D)
 * - Removes phantom Zero Width Spaces (\u200B)
 * - Standardizes multi-character vowel signs into their canonical unified Unicode representations
 *
 * Example: cleans text before saving to database to ensure consistency.
 */
export function normalizeSinhala(text: string): string {
  if (!text || typeof text !== 'string') return '';

  let normalized = text;

  // 1. Remove Zero-Width Spaces
  normalized = normalized.replace(/\u200B/g, '');

  // 2. Collapse multiple ZWJs into a single ZWJ
  normalized = normalized.replace(/\u200D{2,}/g, ZWJ);

  // 3. Remove orphan ZWJs at string boundary or around spaces
  normalized = normalized.replace(/(^\u200D+|\u200D+$)/g, '');
  normalized = normalized.replace(/\s\u200D+/g, ' ');
  normalized = normalized.replace(/\u200D+\s/g, ' ');

  // 4. Normalize composite vowels:
  // කො: kombuva (\u0DD9) + aela-pilla (\u0DCF) -> \u0DDC (o vowel sign)
  normalized = normalized.replace(/\u0DD9\u0DCF/g, '\u0DDC');
  // කෝ: kombuva (\u0DD9) + diga aela-pilla (\u0DDF) -> \u0DDD (oo vowel sign)
  normalized = normalized.replace(/\u0DD9\u0DDF/g, '\u0DDD');
  // කෞ: kombuva (\u0DD9) + gayanukitta (\u0DDE) -> \u0DDE (au vowel sign)
  normalized = normalized.replace(/\u0DD9\u0DDE/g, '\u0DDE');

  return normalized.trim();
}

/**
 * Strips all Zero Width Joiners (\u200D), ZWNJs (\u200C), and invisible characters.
 * Use this to produce a stripped search index so that queries like 'ප්ර' match 'ප්‍ර'.
 */
export function stripZwj(text: string): string {
  if (!text || typeof text !== 'string') return '';
  return text.replace(/[\u200B\u200C\u200D\uFEFF]/g, '');
}

/**
 * Checks whether a given string contains Sinhala Unicode characters.
 */
export function containsSinhala(text: string): boolean {
  if (!text || typeof text !== 'string') return false;
  return /[\u0D80-\u0DFF]/.test(text);
}

/**
 * Checks whether a given string contains Tamil Unicode characters.
 */
export function containsTamil(text: string): boolean {
  if (!text || typeof text !== 'string') return false;
  return /[\u0B80-\u0BFF]/.test(text);
}

/**
 * Prepares search queries by normalizing whitespace and invisibles for reliable text lookup.
 */
export function sanitizeSearchQuery(query: string): string {
  if (!query || typeof query !== 'string') return '';
  return stripZwj(normalizeSinhala(query)).toLowerCase().trim();
}
