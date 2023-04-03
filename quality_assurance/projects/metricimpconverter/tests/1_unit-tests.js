const { expect } = require('chai');
const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  // #1
  test('#convertHandler should correctly read a whole number input.', function () {
    assert.isNumber(convertHandler.getNum("12mi")[0]);
  });

  // #2
  test('#convertHandler should correctly read a decimal number input.', function () {
    assert.isNumber(convertHandler.getNum("12.32mi")[0]);
  });

  // #3
  test('#convertHandler should correctly read a fractional input.', function () {
    assert.isNumber(convertHandler.getNum("54/32mi")[0]);
  });

  // #4
  test('convertHandler should correctly read a fractional input with a decimal.', function () {
    assert.isNumber(convertHandler.getNum("54/3.2mi")[0]);
  });

  // #5
  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function () {
    expect(convertHandler.getNum("3/2/3mi")[0]).to.equal('i');
  });

  // #6
  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
    expect(convertHandler.getNum("mi")[0]).to.equal(1);
  });

  // #7
  test('convertHandler should correctly read each valid input unit.', function () {
    expect(convertHandler.getNum("mi")[1]).to.equal('mi');
    expect(convertHandler.getNum("km")[1]).to.equal('km');
    expect(convertHandler.getNum("gal")[1]).to.equal('gal');
    expect(convertHandler.getNum("L")[1]).to.equal('L');
    expect(convertHandler.getNum("lbs")[1]).to.equal('lbs');
    expect(convertHandler.getNum("kg")[1]).to.equal('kg');
  });

  // #8
  test('convertHandler should correctly return an error for an invalid input unit.', function () {
    expect(convertHandler.getNum("mikg")[0]).to.equal('i');
  });

  // #8
  test('convertHandler should return the correct return unit for each valid input unit.', function () {
    expect(convertHandler.spellOutUnit("km")).to.equal('kilometers');
    expect(convertHandler.spellOutUnit("mi")).to.equal('miles');
    expect(convertHandler.spellOutUnit("gal")).to.equal('gallons');
    expect(convertHandler.spellOutUnit("L")).to.equal('litres');
    expect(convertHandler.spellOutUnit("lbs")).to.equal('pounds');
    expect(convertHandler.spellOutUnit("kg")).to.equal('kilograms');
  });

});
