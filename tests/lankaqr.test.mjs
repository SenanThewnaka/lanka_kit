import test from 'node:test';
import assert from 'node:assert/strict';
import { parseLankaQr, computeCrc16 } from '../lib/lankaqr.js';

test('LANKAQR - Parse Valid Payload', () => {
  // Sample EMVCo / LANKAQR payload with Country LK and LKR 144
  const payload = '0002010102125204541153031445406150.005802LK5910LankaStore6007Colombo63042E56';
  const res = parseLankaQr(payload);
  assert.equal(res.isValid, true);
  assert.equal(res.formatIndicator, '01');
  assert.equal(res.pointOfInitiation, 'Dynamic');
  assert.equal(res.transactionCurrencyCode, '144');
  assert.equal(res.transactionAmount, 150);
  assert.equal(res.countryCode, 'LK');
  assert.equal(res.merchantName, 'LankaStore');
  assert.equal(res.merchantCity, 'Colombo');
});

test('LANKAQR - CRC16 Calculation', () => {
  const data = '0002010102125204541153031445406150.005802LK5910LankaStore6007Colombo6304';
  const crc = computeCrc16(data);
  assert.equal(typeof crc, 'string');
  assert.equal(crc.length, 4);
});
