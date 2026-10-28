import test from 'node:test';
import assert from 'node:assert/strict';
import {
  lookupPostalCode,
  getDistrictsByProvince,
  searchLocations,
  SRI_LANKA_DISTRICTS,
} from '../lib/geo.js';

test('Geo - Total 25 Districts', () => {
  assert.equal(SRI_LANKA_DISTRICTS.length, 25);
});

test('Geo - Postal Code Lookup', () => {
  const colomboFort = lookupPostalCode('00100');
  assert.notEqual(colomboFort, null);
  assert.equal(colomboFort?.city, 'Colombo 01 (Fort)');
  assert.equal(colomboFort?.district, 'Colombo');
  assert.equal(colomboFort?.province, 'Western');

  const nugegoda = lookupPostalCode('10250');
  assert.notEqual(nugegoda, null);
  assert.equal(nugegoda?.city, 'Nugegoda');
  assert.equal(nugegoda?.district, 'Colombo');

  const kandy = lookupPostalCode('20000');
  assert.notEqual(kandy, null);
  assert.equal(kandy?.city, 'Kandy');
  assert.equal(kandy?.province, 'Central');

  const athurugiriya = lookupPostalCode('10150');
  assert.notEqual(athurugiriya, null);
  assert.equal(athurugiriya?.city, 'Athurugiriya');
  assert.equal(athurugiriya?.district, 'Colombo');
  assert.equal(athurugiriya?.province, 'Western');

  const galle = lookupPostalCode('80000');
  assert.notEqual(galle, null);
  assert.equal(galle?.city, 'Galle');
  assert.equal(galle?.province, 'Southern');
});

test('Geo - Province District Filtering', () => {
  const westernDistricts = getDistrictsByProvince('Western');
  assert.equal(westernDistricts.length, 3); // Colombo, Gampaha, Kalutara
  const names = westernDistricts.map((d) => d.name);
  assert.deepEqual(names, ['Colombo', 'Gampaha', 'Kalutara']);
});

test('Geo - Location Search', () => {
  const results = searchLocations('Malabe');
  assert.equal(results.length > 0, true);
  assert.equal(results[0].postalCode, '10200');
});
