/**
 * Bank and branch routing directory for Sri Lanka.
 */
export interface BankInfo {
    code: string;
    name: string;
    shortName: string;
    popular: boolean;
    swiftCode?: string;
}
export interface BranchInfo {
    bankCode: string;
    branchCode: string;
    name: string;
}
export declare const SRI_LANKA_BANKS: BankInfo[];
export declare const COMMON_BRANCHES: Record<string, BranchInfo[]>;
/**
 * Returns all registered Sri Lankan commercial, specialized and foreign banks.
 */
export declare function getBanks(): BankInfo[];
/**
 * Returns the most frequently used commercial banks in Sri Lanka.
 */
export declare function getPopularBanks(): BankInfo[];
/**
 * Checks whether a given 4-digit code is a valid registered bank code.
 */
export declare function isValidBankCode(code: string): boolean;
/**
 * Lookup a bank by its 4-digit code, short name, or full name (case-insensitive).
 */
export declare function lookupBank(query: string): BankInfo | undefined;
/**
 * Search banks matching query keyword.
 */
export declare function searchBanks(query: string): BankInfo[];
/**
 * Get common branches for a given bank code.
 */
export declare function getBranches(bankCode: string): BranchInfo[];
