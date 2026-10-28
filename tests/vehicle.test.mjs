import test from 'node:test';
import assert from 'node:assert/strict';
import { validateVehiclePlate } from '../lib/vehicle.js';

test('Vehicle Plate - Modern Provincial Plates', () => {
  // Western Province Motor Car
  const car = validateVehiclePlate('WP CAB-1234');
  assert.equal(car.isValid, true);
  assert.equal(car.format, 'MODERN');
  assert.equal(car.province?.code, 'WP');
  assert.equal(car.category, 'Motor Car');
  assert.equal(car.clean, 'WP CAB-1234');

  // Central Province Motor Cycle
  const bike = validateVehiclePlate('cp baa 5678');
  assert.equal(bike.isValid, true);
  assert.equal(bike.format, 'MODERN');
  assert.equal(bike.province?.code, 'CP');
  assert.equal(bike.category, 'Motor Cycle');

  // Southern Province Three Wheeler
  const wheeler = validateVehiclePlate('SP AA-9012');
  assert.equal(wheeler.isValid, true);
  assert.equal(wheeler.category, 'Three Wheeler');
});

test('Vehicle Plate - Transitional & Vintage Plates', () => {
  // Transitional with province: WP 300-1234
  const trans = validateVehiclePlate('WP 300-1234');
  assert.equal(trans.isValid, true);
  assert.equal(trans.format, 'TRANSITIONAL');
  assert.equal(trans.clean, 'WP 300-1234');

  // Vintage numeric: 64-1234
  const vintage = validateVehiclePlate('64-1234');
  assert.equal(vintage.isValid, true);
  assert.equal(vintage.format, 'VINTAGE');

  // Sri series: 14 Sri 1234 / 14 ශ්‍රී 1234
  const sri = validateVehiclePlate('14 Sri 1234');
  assert.equal(sri.isValid, true);
  assert.equal(sri.format, 'SRI');
  assert.equal(sri.clean, '14 ශ්‍රී 1234');
});

test('Vehicle Plate - Invalid inputs', () => {
  assert.equal(validateVehiclePlate('INVALID-PLATE').isValid, false);
  assert.equal(validateVehiclePlate('').isValid, false);
});
