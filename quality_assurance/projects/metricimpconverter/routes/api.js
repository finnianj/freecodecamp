'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    if (req.query.input == 0) {
      console.log("Invalid number and unit")
      return null;
    }

    let input = convertHandler.getNum(req.query.input)

    if (input == "Invalid unit") {
      console.log("Invalid unit")
    } else if (input[0] == 0) {
      console.log("Invalid number")
    } else {
      let converted = convertHandler.convert(input[0], input[1])
      let rounded = Math.round(converted[0] * 100_000) / 100_000

      let string = convertHandler.getString(rounded, input[1], converted[0], converted[1])
      console.log(string)
    }
  })

};
