/**
 * Bank and branch routing directory for Sri Lanka.
 */
export const SRI_LANKA_BANKS = [
    { code: '7010', name: 'Commercial Bank of Ceylon PLC', shortName: 'Commercial Bank', popular: true, swiftCode: 'CCEYLKAX' },
    { code: '7083', name: 'Bank of Ceylon', shortName: 'BOC', popular: true, swiftCode: 'BCEYLKLX' },
    { code: '7135', name: "People's Bank", shortName: "People's Bank", popular: true, swiftCode: 'PSBLLKLX' },
    { code: '7092', name: 'Hatton National Bank PLC', shortName: 'HNB', popular: true, swiftCode: 'HBLILKLX' },
    { code: '7278', name: 'Sampath Bank PLC', shortName: 'Sampath Bank', popular: true, swiftCode: 'BSAMLKLX' },
    { code: '7169', name: 'National Development Bank PLC', shortName: 'NDB Bank', popular: true, swiftCode: 'NDBLLKLX' },
    { code: '7214', name: 'Nations Trust Bank PLC', shortName: 'NTB', popular: true, swiftCode: 'NTBLLKLX' },
    { code: '7205', name: 'Seylan Bank PLC', shortName: 'Seylan Bank', popular: true, swiftCode: 'SEYBLKLX' },
    { code: '7311', name: 'DFCC Bank PLC', shortName: 'DFCC Bank', popular: true, swiftCode: 'DFCCLKLX' },
    { code: '7719', name: 'National Savings Bank', shortName: 'NSB', popular: true, swiftCode: 'NSBLLKLX' },
    { code: '7463', name: 'Cargills Bank Limited', shortName: 'Cargills Bank', popular: true, swiftCode: 'CBKLLKLX' },
    { code: '7144', name: 'Union Bank of Colombo PLC', shortName: 'Union Bank', popular: false, swiftCode: 'UBLKLKLX' },
    { code: '7287', name: 'Pan Asia Banking Corporation PLC', shortName: 'Pan Asia Bank', popular: false, swiftCode: 'PASLLKLX' },
    { code: '7384', name: 'Amana Bank PLC', shortName: 'Amana Bank', popular: false, swiftCode: 'AMNALKLX' },
    { code: '7728', name: 'Sanasa Development Bank PLC', shortName: 'SDB Bank', popular: false, swiftCode: 'SNDBLKLX' },
    { code: '7737', name: 'Regional Development Bank', shortName: 'RDB', popular: false, swiftCode: 'RDBLLKLX' },
    { code: '7056', name: 'Standard Chartered Bank', shortName: 'Standard Chartered', popular: false, swiftCode: 'SCBLLKLX' },
    { code: '7074', name: 'The Hongkong and Shanghai Banking Corporation Ltd', shortName: 'HSBC', popular: true, swiftCode: 'HSBCLKLX' },
    { code: '7038', name: 'Citibank N.A.', shortName: 'Citibank', popular: false, swiftCode: 'CITILKLX' },
    { code: '7047', name: 'Indian Bank', shortName: 'Indian Bank', popular: false, swiftCode: 'IDIBLKLX' },
    { code: '7108', name: 'Indian Overseas Bank', shortName: 'IOB', popular: false, swiftCode: 'IOBALKLX' },
    { code: '7269', name: 'MCB Bank Limited', shortName: 'MCB Bank', popular: false, swiftCode: 'MCBBLKLX' },
    { code: '7302', name: 'Habib Bank Limited', shortName: 'Habib Bank', popular: false, swiftCode: 'HBBLLKLX' },
    { code: '7472', name: 'State Bank of India', shortName: 'SBI', popular: false, swiftCode: 'SBINLKLX' },
    { code: '7481', name: 'Public Bank Berhad', shortName: 'Public Bank', popular: false, swiftCode: 'PBLKLKLX' },
    { code: '7490', name: 'Deutsche Bank AG', shortName: 'Deutsche Bank', popular: false, swiftCode: 'DEUTLKLX' },
    { code: '7746', name: 'State Mortgage & Investment Bank', shortName: 'SMIB', popular: false },
    { code: '7755', name: 'Housing Development Finance Corporation Bank', shortName: 'HDFC Bank', popular: false },
    { code: '7782', name: 'Sri Lanka Savings Bank Limited', shortName: 'SLSB', popular: false },
];
export const COMMON_BRANCHES = {
    // Commercial Bank
    '7010': [
        { bankCode: '7010', branchCode: '001', name: 'City Office (Colombo Fort)' },
        { bankCode: '7010', branchCode: '002', name: 'Foreign Branch' },
        { bankCode: '7010', branchCode: '005', name: 'Kollupitiya' },
        { bankCode: '7010', branchCode: '010', name: 'Kandy' },
        { bankCode: '7010', branchCode: '015', name: 'Galle' },
        { bankCode: '7010', branchCode: '020', name: 'Kurunegala' },
        { bankCode: '7010', branchCode: '025', name: 'Jaffna' },
        { bankCode: '7010', branchCode: '030', name: 'Nugegoda' },
        { bankCode: '7010', branchCode: '035', name: 'Negombo' },
        { bankCode: '7010', branchCode: '040', name: 'Gampaha' },
    ],
    // Bank of Ceylon
    '7083': [
        { bankCode: '7083', branchCode: '001', name: 'Corporate Branch (BOC Tower)' },
        { bankCode: '7083', branchCode: '002', name: 'Colombo Fort' },
        { bankCode: '7083', branchCode: '005', name: 'Pettah' },
        { bankCode: '7083', branchCode: '010', name: 'Kandy Super Grade' },
        { bankCode: '7083', branchCode: '015', name: 'Galle Fort' },
        { bankCode: '7083', branchCode: '020', name: 'Kurunegala' },
        { bankCode: '7083', branchCode: '025', name: 'Jaffna Super Grade' },
        { bankCode: '7083', branchCode: '030', name: 'Nugegoda' },
    ],
    // People's Bank
    '7135': [
        { bankCode: '7135', branchCode: '001', name: 'Corporate Banking Division' },
        { bankCode: '7135', branchCode: '002', name: 'Colombo Fort' },
        { bankCode: '7135', branchCode: '010', name: 'Kandy City' },
        { bankCode: '7135', branchCode: '015', name: 'Galle City' },
        { bankCode: '7135', branchCode: '020', name: 'Kurunegala Town' },
    ],
    // Sampath Bank
    '7278': [
        { bankCode: '7278', branchCode: '001', name: 'Head Office (Colombo 02)' },
        { bankCode: '7278', branchCode: '005', name: 'Colombo Fort' },
        { bankCode: '7278', branchCode: '010', name: 'Kandy Super Grade' },
        { bankCode: '7278', branchCode: '015', name: 'Galle Super Grade' },
        { bankCode: '7278', branchCode: '030', name: 'Nugegoda Super Grade' },
    ],
    // HNB
    '7092': [
        { bankCode: '7092', branchCode: '001', name: 'Head Office (HNB Towers)' },
        { bankCode: '7092', branchCode: '002', name: 'Colombo Fort' },
        { bankCode: '7092', branchCode: '010', name: 'Kandy' },
        { bankCode: '7092', branchCode: '015', name: 'Galle' },
    ],
};
/**
 * Returns all registered Sri Lankan commercial, specialized and foreign banks.
 */
export function getBanks() {
    return [...SRI_LANKA_BANKS];
}
/**
 * Returns the most frequently used commercial banks in Sri Lanka.
 */
export function getPopularBanks() {
    return SRI_LANKA_BANKS.filter((b) => b.popular);
}
/**
 * Checks whether a given 4-digit code is a valid registered bank code.
 */
export function isValidBankCode(code) {
    if (!code || typeof code !== 'string')
        return false;
    const clean = code.trim();
    return SRI_LANKA_BANKS.some((b) => b.code === clean);
}
/**
 * Lookup a bank by its 4-digit code, short name, or full name (case-insensitive).
 */
export function lookupBank(query) {
    if (!query || typeof query !== 'string')
        return undefined;
    const clean = query.trim().toLowerCase();
    return SRI_LANKA_BANKS.find((b) => b.code === clean ||
        b.shortName.toLowerCase() === clean ||
        b.name.toLowerCase() === clean ||
        (b.swiftCode && b.swiftCode.toLowerCase() === clean));
}
/**
 * Search banks matching query keyword.
 */
export function searchBanks(query) {
    if (!query || typeof query !== 'string')
        return [];
    const clean = query.trim().toLowerCase();
    return SRI_LANKA_BANKS.filter((b) => b.code.includes(clean) ||
        b.name.toLowerCase().includes(clean) ||
        b.shortName.toLowerCase().includes(clean));
}
/**
 * Get common branches for a given bank code.
 */
export function getBranches(bankCode) {
    if (!bankCode || typeof bankCode !== 'string')
        return [];
    const clean = bankCode.trim();
    return COMMON_BRANCHES[clean] || [];
}
