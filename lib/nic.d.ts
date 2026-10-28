import { NicResult, NicValidationSuccess } from './types';
/**
 * Check if a given year is a leap year in the Gregorian calendar.
 */
export declare function isLeapYear(year: number): boolean;
/**
 * Cleans and standardizes an NIC input string (trims whitespace, converts check letter to uppercase).
 */
export declare function sanitizeNic(input: string): string;
/**
 * Converts an Old NIC (9 digits + V/X) to New NIC (12 digits).
 */
export declare function convertOldToNewNic(oldNic: string): string | null;
/**
 * Converts a New NIC (12 digits) to Old NIC (9 digits + V) if born between 1900 and 1999.
 */
export declare function convertNewToOldNic(newNic: string): string | null;
/**
 * Converts an NIC to its alternate equivalent format if applicable.
 */
export declare function convertNic(nic: string): string | null;
/**
 * Validates and extracts comprehensive identity information from a Sri Lankan NIC.
 * Supports both Old (9 digits + V/X) and New (12 digits) formats.
 */
export declare function validateNic(input: string): NicResult;
/**
 * Returns true if the given input is a valid Sri Lankan NIC.
 */
export declare function isValidNic(input: string): boolean;
/**
 * Parses an NIC and returns the extracted payload or throws an Error.
 */
export declare function parseNic(input: string): NicValidationSuccess;
/**
 * Formats an NIC nicely for display (e.g. 962451234V or 199624501234).
 */
export declare function formatNic(input: string): string;
