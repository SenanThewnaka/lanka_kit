import test from 'node:test';
import assert from 'node:assert/strict';
import { validatePhone, isValidPhone, toE164 } from '../lib/phone.js';

test('Phone Validation - Dialog 077, 076, 074', () => {
  const res1 = validatePhone('0771234567');
  assert.equal(res1.isValid, true);
  if (res1.isValid) {
    assert.equal(res1.carrier, 'Dialog');
    assert.equal(res1.e164, '+94771234567');
    assert.equal(res1.national, '077 123 4567');
    assert.equal(res1.international, '+94 77 123 4567');
  }

  const res2 = validatePhone('+94 76 999 8888');
  assert.equal(res2.isValid, true);
  if (res2.isValid) {
    assert.equal(res2.carrier, 'Dialog');
    assert.equal(res2.e164, '+94769998888');
  }
});

test('Phone Validation - Mobitel 071, 070', () => {
  const res = validatePhone('0714567890');
  assert.equal(res.isValid, true);
  if (res.isValid) {
    assert.equal(res.carrier, 'Mobitel');
    assert.equal(res.e164, '+94714567890');
  }
});

test('Phone Validation - Hutch & Airtel', () => {
  const resHutch = validatePhone('0781234567');
  assert.equal(resHutch.isValid, true);
  if (resHutch.isValid) {
    assert.equal(resHutch.carrier, 'Hutch');
  }

  const resAirtel = validatePhone('0751234567');
  assert.equal(resAirtel.isValid, true);
  if (resAirtel.isValid) {
    assert.equal(resAirtel.carrier, 'Airtel');
  }
});

test('Phone Validation - Fixed Lines (SLT)', () => {
  const resFixed = validatePhone('0112345678');
  assert.equal(resFixed.isValid, true);
  if (resFixed.isValid) {
    assert.equal(resFixed.type, 'Fixed');
    assert.equal(resFixed.carrier, 'SLT');
  }
});

test('Phone Validation - Invalid Numbers', () => {
  assert.equal(isValidPhone(''), false);
  assert.equal(isValidPhone('12345'), false);
  assert.equal(isValidPhone('0791234567'), false); // 079 is not assigned
  assert.equal(toE164('invalid'), null);
});
