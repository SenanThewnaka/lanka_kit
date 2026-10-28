/**
 * Computes EMVCo standard CRC-16 (CCITT, polynomial 0x1021, initial 0xFFFF)
 */
export function computeCrc16(data) {
    let crc = 0xffff;
    for (let i = 0; i < data.length; i++) {
        crc ^= data.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            if ((crc & 0x8000) !== 0) {
                crc = ((crc << 1) ^ 0x1021) & 0xffff;
            }
            else {
                crc = (crc << 1) & 0xffff;
            }
        }
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
}
/**
 * Parses TLV (Tag-Length-Value) blocks according to EMVCo / LANKAQR standard.
 */
export function parseTlv(payload) {
    const map = new Map();
    let cursor = 0;
    while (cursor + 4 <= payload.length) {
        const tag = payload.substring(cursor, cursor + 2);
        const length = parseInt(payload.substring(cursor + 2, cursor + 4), 10);
        cursor += 4;
        if (isNaN(length) || cursor + length > payload.length) {
            break;
        }
        const value = payload.substring(cursor, cursor + length);
        cursor += length;
        map.set(tag, value);
    }
    return map;
}
/**
 * Parses and validates an EMVCo-compliant LANKAQR string.
 */
export function parseLankaQr(payload) {
    const clean = payload.trim();
    if (!clean) {
        return {
            isValid: false,
            rawPayload: payload,
            error: 'Empty LANKAQR payload',
        };
    }
    const tlv = parseTlv(clean);
    const formatIndicator = tlv.get('00');
    const pointOfInitiationCode = tlv.get('01');
    const countryCode = tlv.get('58');
    const currencyCode = tlv.get('53');
    const crc = tlv.get('63');
    if (!formatIndicator) {
        return {
            isValid: false,
            rawPayload: clean,
            error: 'Missing EMVCo format indicator tag (00)',
        };
    }
    // Validate CRC if present
    let crcValid = undefined;
    if (crc && clean.length >= 8) {
        const dataWithoutCrcValue = clean.substring(0, clean.length - 4);
        const calculatedCrc = computeCrc16(dataWithoutCrcValue);
        crcValid = calculatedCrc.toUpperCase() === crc.toUpperCase();
    }
    // Extract merchant account info (tags 26 - 51)
    const merchantAccountInfo = {};
    for (let t = 26; t <= 51; t++) {
        const tagStr = String(t).padStart(2, '0');
        const val = tlv.get(tagStr);
        if (val) {
            merchantAccountInfo[tagStr] = val;
        }
    }
    // Parse additional data (tag 62)
    let additionalData = undefined;
    const tag62 = tlv.get('62');
    if (tag62) {
        const subTlv = parseTlv(tag62);
        additionalData = {};
        for (const [k, v] of subTlv.entries()) {
            additionalData[k] = v;
        }
    }
    const rawAmount = tlv.get('54');
    const transactionAmount = rawAmount ? parseFloat(rawAmount) : undefined;
    const isLanka = countryCode === 'LK' || currencyCode === '144';
    return {
        isValid: isLanka && (crcValid === undefined || crcValid === true),
        rawPayload: clean,
        formatIndicator,
        pointOfInitiation: pointOfInitiationCode === '11'
            ? 'Static'
            : pointOfInitiationCode === '12'
                ? 'Dynamic'
                : undefined,
        merchantAccountInfo,
        merchantCategoryCode: tlv.get('52'),
        transactionCurrency: currencyCode === '144' ? 'LKR (Sri Lankan Rupee)' : currencyCode,
        transactionCurrencyCode: currencyCode,
        transactionAmount,
        countryCode,
        merchantName: tlv.get('59'),
        merchantCity: tlv.get('60'),
        postalCode: tlv.get('61'),
        additionalData,
        crcValid,
    };
}
