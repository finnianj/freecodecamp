'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {

    let input = convertHandler.getNum(req.query.input)

    if (input == "invalid unit") {
      console.log("invalid unit")
      res.json("invalid unit")
    } else if (input == 'invalid number') {
      console.log("invalid number")
      res.json("invalid number")
    } else if (input == 'invalid number and unit') {
      console.log("invalid number and unit")
      res.json("invalid number and unit")
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
