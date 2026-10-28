/**
 * Sri Lankan vehicle registration plate validation and parsing.
 */
export const PROVINCE_MAP = {
    WP: 'Western Province',
    CP: 'Central Province',
    SP: 'Southern Province',
    NP: 'Northern Province',
    EP: 'Eastern Province',
    NW: 'North Western Province',
    NC: 'North Central Province',
    UP: 'Uva Province',
    UVA: 'Uva Province',
    SG: 'Sabaragamuwa Province',
};
function inferCategoryFromPrefix(prefix) {
    if (!prefix)
        return 'Unknown';
    const firstChar = prefix.charAt(0).toUpperCase();
    switch (firstChar) {
        case 'A':
            return 'Three Wheeler';
        case 'B':
            return 'Motor Cycle';
        case 'C':
        case 'K':
            return 'Motor Car';
        case 'D':
        case 'P':
        case 'H':
            return 'Dual Purpose / Van';
        case 'L':
        case 'N':
            return 'Lorry / Commercial';
        case 'R':
        case 'T':
            return 'Tractor';
        default:
            return 'General';
    }
}
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
export function validateVehiclePlate(input) {
    if (!input || typeof input !== 'string') {
        return {
            isValid: false,
            clean: '',
            format: 'UNKNOWN',
            category: 'Unknown',
            plateNumber: '',
            error: 'Input must be a non-empty string',
        };
    }
    const raw = input.trim();
    // 1. Check Vintage "Sri" / "ශ්‍රී" format: e.g. "14 ශ්‍රී 1234" or "14 Sri 1234" or "14-Sri-1234"
    const sriRegex = /^(\d{1,3})\s*(?:ශ්‍රී|Sri|SRI|-sri-|-SRI-)\s*(\d{4})$/i;
    const sriMatch = raw.match(sriRegex);
    if (sriMatch) {
        const clean = `${sriMatch[1]} ශ්‍රී ${sriMatch[2]}`;
        return {
            isValid: true,
            clean,
            format: 'SRI',
            category: 'General',
            plateNumber: clean,
        };
    }
    // Normalize separators: replace multiple spaces with single space, ensure standard dash
    const cleanInput = raw.replace(/\s+/g, ' ').toUpperCase();
    // 2. Check Modern Provincial with Letters: e.g. "WP CAB-1234", "CAB-1234", "WP GA-1234", "GA-1234"
    // Province can be 2-3 letters, letters 2-3 chars, 4 digits
    const modernRegex = /^(?:([A-Z]{2,3})\s+)?([A-Z]{2,3})[\s-]?(\d{4})$/;
    const modernMatch = cleanInput.match(modernRegex);
    if (modernMatch) {
        const provCode = modernMatch[1];
        const letterPrefix = modernMatch[2];
        const numberPart = modernMatch[3];
        let provinceInfo = undefined;
        if (provCode) {
            const provName = PROVINCE_MAP[provCode];
            if (provName) {
                provinceInfo = { code: provCode, name: provName };
            }
        }
        const cleanPlate = provCode
            ? `${provCode} ${letterPrefix}-${numberPart}`
            : `${letterPrefix}-${numberPart}`;
        return {
            isValid: true,
            clean: cleanPlate,
            format: 'MODERN',
            province: provinceInfo,
            category: inferCategoryFromPrefix(letterPrefix),
            plateNumber: `${letterPrefix}-${numberPart}`,
        };
    }
    // 3. Check Transitional Numeric with Province: e.g. "WP 300-1234", "SP 19-1234"
    const transProvRegex = /^([A-Z]{2,3})\s+(\d{1,3})[\s-]?(\d{4})$/;
    const transProvMatch = cleanInput.match(transProvRegex);
    if (transProvMatch) {
        const provCode = transProvMatch[1];
        const prefixNum = transProvMatch[2];
        const numberPart = transProvMatch[3];
        const provName = PROVINCE_MAP[provCode];
        const cleanPlate = `${provCode} ${prefixNum}-${numberPart}`;
        return {
            isValid: true,
            clean: cleanPlate,
            format: 'TRANSITIONAL',
            province: provName ? { code: provCode, name: provName } : undefined,
            category: 'General',
            plateNumber: `${prefixNum}-${numberPart}`,
        };
    }
    // 4. Check Vintage Numeric: e.g. "64-1234", "300-1234", "19-1234"
    const vintageRegex = /^(\d{1,3})[\s-]?(\d{4})$/;
    const vintageMatch = cleanInput.match(vintageRegex);
    if (vintageMatch) {
        const cleanPlate = `${vintageMatch[1]}-${vintageMatch[2]}`;
        return {
            isValid: true,
            clean: cleanPlate,
            format: 'VINTAGE',
            category: 'General',
            plateNumber: cleanPlate,
        };
    }
    return {
        isValid: false,
        clean: raw,
        format: 'UNKNOWN',
        category: 'Unknown',
        plateNumber: '',
        error: 'Invalid Sri Lankan vehicle plate format. Expected format like WP CAB-1234, GA-1234, 64-1234, or 14 Sri 1234',
    };
}
