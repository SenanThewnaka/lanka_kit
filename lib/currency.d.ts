/**
 * LKR currency formatting and amount-to-words converter.
 */
export interface CurrencyFormatOptions {
    prefix?: string;
    suffix?: string;
    decimals?: number;
}
export interface AmountToWordsOptions {
    language?: 'en' | 'si';
    includeCurrency?: boolean;
}
/**
 * Format a numeric amount to Sri Lankan Rupee standard display.
 * Example: 1540000.5 -> "Rs. 1,540,000.50"
 */
export declare function formatLkr(amount: number, options?: CurrencyFormatOptions): string;
/**
 * Convert numeric amount into formal words.
 *
 * @param amount - Monetary number (e.g., 1540.50)
 * @param options - Language and formatting options
 * @returns Standard phrase (e.g., "One Thousand Five Hundred Forty Rupees and Fifty Cents Only")
 */
export declare function amountToWords(amount: number, options?: AmountToWordsOptions): string;
