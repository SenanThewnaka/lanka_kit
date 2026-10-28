import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getBanks,
  getPopularBanks,
  lookupBank,
  isValidBankCode,
  searchBanks,
  getBranches,
} from '../lib/banks.js';

test('Banks - Directory and Popular Banks', () => {
  const allBanks = getBanks();
  assert.ok(allBanks.length >= 25, 'Should have at least 25 registered banks');

  const popular = getPopularBanks();
  assert.ok(popular.length >= 6, 'Should have key popular banks');
  assert.ok(popular.some((b) => b.code === '7010'), 'Commercial Bank should be popular');
  assert.ok(popular.some((b) => b.code === '7083'), 'BOC should be popular');
});

test('Banks - Lookup and Validation', () => {
  assert.equal(isValidBankCode('7010'), true);
  assert.equal(isValidBankCode('7278'), true);
  assert.equal(isValidBankCode('9999'), false);

  const combank = lookupBank('7010');
  assert.ok(combank);
  assert.equal(combank?.shortName, 'Commercial Bank');

  const sampath = lookupBank('sampath bank');
  assert.ok(sampath);
  assert.equal(sampath?.code, '7278');

  const swiftLookup = lookupBank('BCEYLKLX');
  assert.ok(swiftLookup);
  assert.equal(swiftLookup?.code, '7083');
});

test('Banks - Search and Branches', () => {
  const searchResults = searchBanks('Ceylon');
  assert.ok(searchResults.length >= 2); // Commercial Bank of Ceylon & Bank of Ceylon

  const branches = getBranches('7010');
  assert.ok(branches.length >= 5);
  assert.ok(branches.some((br) => br.name.includes('Kandy')));
});
