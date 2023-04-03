'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    if (req.query.input == 0) {
      console.log("Invalid number and unit")
      res.json("invalid number and unit")
    }

    let input = convertHandler.getNum(req.query.input)

    if (input == "Invalid unit") {
      console.log("Invalid unit")
      res.json("invalid unit")
    } else if (input[0] == 0) {
      console.log("Invalid number")
      res.json("invalid number")
    } else {
      let converted = convertHandler.convert(input[0], input[1])
      let rounded = Math.round(converted[0] * 100_000) / 100_000

      let string = convertHandler.getString(rounded, input[1], converted[0], converted[1])
      let json_result = {
        initNum: input[0],
        initUnit: input[1],
        returnNum: rounded,
        returnUnit: converted[1],
        string: string
      }
      res.json(json_result)
    }
  })

};
