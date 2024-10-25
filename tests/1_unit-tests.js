const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('convertHandler should correctly read a whole number input', function () {
    assert.equal(convertHandler.getNum('123km'), 123, 'Failure on whole number input (\'123km\').');
  });
  test('convertHandler should correctly read a decimal number input', () => {
    assert.equal(convertHandler.getNum('123.45mi'), 123.45, 'Failure on decimal number input (\'123.45mi\').');
  });
  test('convertHandler should correctly read a fractional input', () => {
    assert.equal(convertHandler.getNum('123/45gal'), 2.7333333333333334, 'Failure on fractional number input (\'123/45gal\').');
  });
  test('convertHandler should correctly read a fractional input with a decimal', () => {
    assert.equal(convertHandler.getNum('123.45/678.90L'), 0.18183826778612464, 'Failure on fractional number with decimal input (\'123.45/678.90L\').');
  });
  test('convertHandler should correctly return an error on a double-fraction', () => {
    assert.equal(convertHandler.getNum('1/2/3kg'), 'invalid number', 'Failure on double/fraction number input (\'1/2/3kg\')');
  });
  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', () => {
    assert.equal(convertHandler.getNum('lbs'), 1, 'Failure defaulting to a numerical value of 1 when no numerical input is provided.');
  });
  test('convertHandler should correctly read each valid input unit', () => {
    const validUnits = ['gAl', 'L', 'Mi', 'KM', 'LbS', 'kg', 'l', 'LBs', 'gAL'];
    validUnits.forEach(unit => {
      assert.notEqual(convertHandler.getUnit(unit), 'invalid unit', `Failure reading a valid input unit - '${unit}'`);
    });
  });
  test('convertHandler should correctly return an error for an invalid input unit', () => {
    assert.equal(convertHandler.getUnit('xyz'), 'invalid unit', 'Failure returning an error for an invalid input unit.');
  });
  test('convertHandler should return the correct return unit for each valid input unit', () => {
    const validUnitPairs = { 'gAl': 'gal', 'l': 'L', 'Mi': 'mi', 'KM': 'km', 'LbS': 'lbs', 'kg': 'kg', 'L': 'L', 'LBs': 'lbs', 'gAL': 'gal' };
    Object.keys(validUnitPairs).forEach(inputUnit => {
      assert.equal(convertHandler.getUnit(inputUnit), validUnitPairs[inputUnit], `Failure returning the correct unit (\'${validUnitPairs[inputUnit]}\') for the valid input unit (\'${inputUnit}\').`);
    });
  });
  test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', () => {
    const spellOutUnits = { gal: 'gallons', L: 'liters', mi: 'miles', km: 'kilometers', lbs: 'pounds', kg: 'kilograms' };
    Object.keys(spellOutUnits).forEach(unit => {
      assert.equal(convertHandler.spellOutUnit(unit), spellOutUnits[unit], `Failure returning correct spelled-out unit (\'${spellOutUnits[unit]}\') for the valid input unit (\'${unit}\').`);
    });
  });
  test('convertHandler should correctly convert gal to L', () => {
    assert.equal(convertHandler.convert(2, 'gal'), 7.57082, 'Failure correctly converting gal to L.');
  });
  test('convertHandler should correctly convert L to gal', () => {
    assert.equal(convertHandler.convert(1.5, 'L'), 0.39626, 'Failure correctly converting L to gal.');
  });
  test('convertHandler should correctly convert mi to km', () => {
    assert.equal(convertHandler.convert(1, 'mi'), 1.60934, 'Failure correctly converting mi to km.');
  });
  test('convertHandler should correctly convert km to mi', () => {
    assert.equal(convertHandler.convert(0.35294117647058826, 'km'), 0.21931, 'Failure correctly converting km to mi.');
  });
  test('convertHandler should correctly convert lbs to kg', () => {
    assert.equal(convertHandler.convert(123, 'lbs'), 55.79182, 'Failure correctly converting lbs to kg.');
  });
  test('convertHandler should correctly convert kg to lbs', () => {
    assert.equal(convertHandler.convert(0.987654321, 'kg'), 2.17741, 'Failure correctly converting kg to lbs.');
  });
});