import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateNic,
  isValidNic,
  convertNic,
  convertOldToNewNic,
  convertNewToOldNic,
} from '../lib/nic.js';

test('NIC Validation - Old Format Male', () => {
  // Born 1993, Day 145 = May 24, Serial 123, Check 4, Voter V
  const res = validateNic('931451234V');
  assert.equal(res.isValid, true);
  if (res.isValid) {
    assert.equal(res.format, 'OLD');
    assert.equal(res.year, 1993);
    assert.equal(res.gender, 'Male');
    assert.equal(res.dayOfYear, 145);
    assert.equal(res.isVoter, true);
    assert.equal(res.dateOfBirthFormatted, '1993-05-24');
    assert.equal(res.equivalentNic, '199314501234');
  }
});

test('NIC Validation - Old Format Female', () => {
  // Born 1996, Day 645 (500 + 145) = Female May 24, Non-voter X
  const res = validateNic('966451234x');
  assert.equal(res.isValid, true);
  if (res.isValid) {
    assert.equal(res.format, 'OLD');
    assert.equal(res.year, 1996);
    assert.equal(res.gender, 'Female');
    assert.equal(res.dayOfYear, 145);
    assert.equal(res.isVoter, false);
    assert.equal(res.dateOfBirthFormatted, '1996-05-24');
    assert.equal(res.equivalentNic, '199664501234');
  }
});

test('NIC Validation - New Format Male', () => {
  // Born 2002, Day 001 = Jan 1
  const res = validateNic('200200101234');
  assert.equal(res.isValid, true);
  if (res.isValid) {
    assert.equal(res.format, 'NEW');
    assert.equal(res.year, 2002);
    assert.equal(res.gender, 'Male');
    assert.equal(res.dayOfYear, 1);
    assert.equal(res.dateOfBirthFormatted, '2002-01-01');
    // Cannot convert to Old NIC if born in 2000 or later
    assert.equal(res.equivalentNic, null);
  }
});

test('NIC Validation - New Format Female Convertible to Old', () => {
  // Born 1995, Day 501 = Female Jan 1
  const res = validateNic('199550101234');
  assert.equal(res.isValid, true);
  if (res.isValid) {
    assert.equal(res.format, 'NEW');
    assert.equal(res.year, 1995);
    assert.equal(res.gender, 'Female');
    assert.equal(res.dayOfYear, 1);
    assert.equal(res.dateOfBirthFormatted, '1995-01-01');
    assert.equal(res.equivalentNic, '955011234V');
  }
});

test('NIC Leap Year Quirk - Day 60 and Day 61 (DRP Sri Lanka Standard)', () => {
  // Day 61 in Sri Lanka NIC is March 1
  const resMar1 = validateNic('199306101234');
  assert.equal(resMar1.isValid, true);
  if (resMar1.isValid) {
    assert.equal(resMar1.dateOfBirthFormatted, '1993-03-01');
  }

  // Day 366 is December 31
  const resDec31 = validateNic('199336601234');
  assert.equal(resDec31.isValid, true);
  if (resDec31.isValid) {
    assert.equal(resDec31.dateOfBirthFormatted, '1993-12-31');
  }
});

test('NIC Invalid Inputs', () => {
  assert.equal(isValidNic(''), false);
  assert.equal(isValidNic('12345'), false);
  assert.equal(isValidNic('931451234Z'), false); // Invalid letter
  assert.equal(isValidNic('930001234V'), false); // Day 0 is invalid
  assert.equal(isValidNic('933671234V'), false); // Day 367 is invalid
  assert.equal(isValidNic('938671234V'), false); // Female Day > 866 is invalid
});

test('NIC Conversion Functions', () => {
  assert.equal(convertOldToNewNic('962451234V'), '199624501234');
  assert.equal(convertNewToOldNic('199624501234'), '962451234V');
  assert.equal(convertNewToOldNic('200124501234'), null); // Born > 1999
});
