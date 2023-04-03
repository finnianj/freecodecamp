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
    assert.isFalse(convertHandler.getNum("3/2/3mi")[0]);
  });

});
