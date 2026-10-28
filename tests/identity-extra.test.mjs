import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validatePassport,
  validateTin,
  validateBrn,
} from '../lib/identity-extra.js';

test('Identity - Passport Validation', () => {
  // Regular citizen N-series
  const reg = validatePassport('N1234567');
  assert.equal(reg.isValid, true);
  assert.equal(reg.type, 'Regular (N-Series)');

  // Biometric PA-series
  const bio = validatePassport('PA1234567');
  assert.equal(bio.isValid, true);
  assert.equal(bio.type, 'Biometric (PA-Series)');

  // Invalid
  assert.equal(validatePassport('1234567').isValid, false);
  assert.equal(validatePassport('N123').isValid, false);
});

test('Identity - Taxpayer Identification Number (TIN)', () => {
  // 10-digit modern
  const tin10 = validateTin('1234567890');
  assert.equal(tin10.isValid, true);
  assert.equal(tin10.format, 'NEW_10_DIGIT');

  // 9-digit legacy
  const tin9 = validateTin('123456789');
  assert.equal(tin9.isValid, true);
  assert.equal(tin9.format, 'LEGACY_9_DIGIT');

  // Invalid
  assert.equal(validateTin('12345').isValid, false);
  assert.equal(validateTin('12345678901').isValid, false);
  assert.equal(validateTin('ABC123456').isValid, false);
});

test('Identity - Business Registration Number (BRN / ROC)', () => {
  const pv = validateBrn('PV 12345');
  assert.equal(pv.isValid, true);
  assert.equal(pv.type, 'Private Limited (PV)');
  assert.equal(pv.registrationNumber, '12345');

  const pb = validateBrn('PB 00123456');
  assert.equal(pb.isValid, true);
  assert.equal(pb.type, 'Public Limited (PB)');

  assert.equal(validateBrn('XYZ 123').isValid, false);
});
