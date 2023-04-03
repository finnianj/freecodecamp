'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    let input = convertHandler.getNum(req.query.input)
    let converted = convertHandler.convert(input[0], input[1])
    console.log(converted)

    let string = convertHandler.getString(input[0], input[1], converted[0], converted[1])
    console.log(string)
    let rounded = Math.round(converted[0] * 100_000) / 100_000
    console.log("Rounded value: " + rounded)
  })

};
