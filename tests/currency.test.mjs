import test from 'node:test';
import assert from 'node:assert/strict';
import { formatLkr, amountToWords } from '../lib/currency.js';

test('Currency - LKR Formatting', () => {
  assert.equal(formatLkr(1500), 'Rs. 1,500.00');
  assert.equal(formatLkr(1540250.75), 'Rs. 1,540,250.75');
  assert.equal(formatLkr(0), 'Rs. 0.00');
  assert.equal(formatLkr(-500), '-Rs. 500.00');
  assert.equal(formatLkr(2500, { prefix: 'LKR ' }), 'LKR 2,500.00');
  assert.equal(formatLkr(2500, { decimals: 0 }), 'Rs. 2,500');
});

test('Currency - English Words for Cheques and Invoices', () => {
  assert.equal(
    amountToWords(1540.5),
    'One Thousand Five Hundred Forty Rupees and Fifty Cents Only'
  );
  assert.equal(amountToWords(100), 'One Hundred Rupees Only');
  assert.equal(amountToWords(1), 'One Rupee Only');
  assert.equal(amountToWords(0.75), 'Zero Rupees and Seventy Five Cents Only');
  assert.equal(amountToWords(1000000), 'One Million Rupees Only');
  assert.equal(amountToWords(0), 'Zero Rupees Only');
});

test('Currency - Sinhala Words for Invoices', () => {
  const siWord1 = amountToWords(100, { language: 'si' });
  assert.ok(siWord1.includes('රුපියල්'));
  assert.ok(siWord1.includes('පමණි'));

  const siWord2 = amountToWords(1540.5, { language: 'si' });
  assert.ok(siWord2.includes('ශත'));
  assert.ok(siWord2.includes('පමණි'));
});
