import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeSinhala,
  stripZwj,
  containsSinhala,
  containsTamil,
  sanitizeSearchQuery,
} from '../lib/unicode.js';

test('Unicode - Sinhala Normalization', () => {
  // Cleans duplicate ZWJ
  const rawWithDoubleZwj = 'ප්‍ර\u200Dවෘත්ති';
  const clean = normalizeSinhala(rawWithDoubleZwj);
  assert.ok(!clean.includes('\u200D\u200D'));

  // Strips zero-width space
  const rawWithZws = 'කොළ\u200Bඹ';
  assert.equal(normalizeSinhala(rawWithZws), 'කොළඹ');
});

test('Unicode - Strip ZWJ for Database Search', () => {
  const withZwj = 'ප්‍රවෘත්ති'; // Contains ZWJ
  const stripped = stripZwj(withZwj);
  assert.ok(!stripped.includes('\u200D'));
  assert.equal(sanitizeSearchQuery(withZwj), stripped.toLowerCase());
});

test('Unicode - Script Detection', () => {
  assert.equal(containsSinhala('ශ්‍රී ලංකා'), true);
  assert.equal(containsSinhala('Hello World'), false);

  assert.equal(containsTamil('இலங்கை'), true);
  assert.equal(containsTamil('Hello World'), false);
});
