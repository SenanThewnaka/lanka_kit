import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as postal from '../lib/postal/index.js';
import { lookupPostalCode, searchLocations } from '../lib/geo.js';

// Expected values come from the Sri Lanka Post "Postal Code Directory" (2022 edition),
// via sri-lanka-postal-locations. See README "Postal locations" for the full source note.

test('postal dataset has the verified row counts', () => {
  assert.equal(postal.getProvinces().length, 9);
  assert.equal(postal.getDistricts().length, 25);
  assert.equal(postal.getAllCities().length, 2137);
});

test('every district points to a real province and every city to a real district', () => {
  const provinceIds = new Set(postal.getProvinces().map((p) => p.id));
  for (const d of postal.getDistricts()) {
    assert.ok(provinceIds.has(d.province_id), `${d.name_en} has orphan province_id`);
  }
  const districtIds = new Set(postal.getDistricts().map((d) => d.id));
  for (const c of postal.getAllCities()) {
    assert.ok(districtIds.has(c.district_id), `${c.name_en} has orphan district_id`);
  }
});

test('every city has a 5-digit postcode', () => {
  for (const c of postal.getAllCities()) {
    assert.match(c.postcode, /^\d{5}$/, `${c.name_en} (${c.id})`);
  }
});

test('the 12 postcodes that were wrong in the original data resolve to the official district', () => {
  const expected = [
    ['80300', 'Ambalangoda', 'Galle'],
    ['61360', 'Kalpitiya', 'Puttalam'],
    ['51500', 'Medirigiriya', 'Polonnaruwa'],
    ['60140', 'Giriulla', 'Kurunegala'],
    ['60160', 'Pannala', 'Kurunegala'],
    ['81300', 'Hakmana', 'Matara'],
    ['70300', 'Rakwana', 'Ratnapura'],
    ['80510', 'Induruwa', 'Galle'],
    ['11650', 'Biyagama', 'Gampaha'],
    ['22080', 'Kotagala', 'Nuwara Eliya'],
    ['11710', 'Weliveriya', 'Gampaha'],
    ['10524', 'Handapangoda', 'Colombo'],
  ];
  for (const [postcode, town, district] of expected) {
    const found = lookupPostalCode(postcode);
    assert.equal(found?.city, town, `postcode ${postcode}`);
    assert.equal(found?.district, district, `postcode ${postcode}`);
  }
});

test('Colombo zone postcodes map to Colombo 01 to 15', () => {
  for (let zone = 1; zone <= 15; zone++) {
    const postcode = String(zone * 100).padStart(5, '0');
    const found = lookupPostalCode(postcode);
    assert.equal(found?.city, `Colombo ${String(zone).padStart(2, '0')}`, postcode);
    assert.equal(found?.district, 'Colombo', postcode);
  }
});

test('lookupPostalCode accepts numbers and pads them to 5 digits', () => {
  assert.equal(lookupPostalCode(100)?.postalCode, '00100');
  assert.equal(lookupPostalCode(' 20000 ')?.city, 'Kandy');
});

test('a postcode missing from the register falls back to its district range', () => {
  // 11999 is inside Gampaha's range but is not a post office in the 2022 directory.
  const found = lookupPostalCode('11999');
  assert.deepEqual(found, {
    postalCode: '11999',
    city: 'Gampaha Area',
    district: 'Gampaha',
    province: 'Western',
  });
});

test('Malabe is searchable as the register spelling Malambe', () => {
  const results = searchLocations('malabe');
  assert.equal(results[0]?.postalCode, '10115');
  assert.equal(results[0]?.city, 'Malambe');
});

test('blank coordinates are reported as undefined, not 0,0', () => {
  // Post offices added from the directory have no coordinates yet.
  const blank = postal.getCityById('2229'); // Soysapura, 10412
  assert.ok(blank, 'Soysapura row missing');
  assert.equal(blank.latitude, '');
  assert.equal(postal.getCityCoordinates(blank), undefined);
});

test('getCityCoordinates parses a real row', () => {
  const kandy = postal.getCityById('804'); // Kandy, 20000
  assert.equal(kandy?.name_en, 'Kandy');
  const coords = postal.getCityCoordinates(kandy);
  assert.ok(coords, 'Kandy should have coordinates');
  assert.ok(coords.latitude > 7 && coords.latitude < 8, `latitude ${coords.latitude}`);
  assert.ok(coords.longitude > 80 && coords.longitude < 81, `longitude ${coords.longitude}`);
});

test('the postal subpath declares no side effects, so bundlers can drop it when unused', () => {
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  assert.equal(pkg.sideEffects, false);
  assert.ok(pkg.exports['./postal'], 'missing ./postal export');
});
