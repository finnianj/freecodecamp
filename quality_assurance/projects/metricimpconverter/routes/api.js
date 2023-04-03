'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    let input = convertHandler.getNum(req.query.input)
    console.log("User input: " + input.join(''))
    let converted = convertHandler.convert(input[0], input[1])
    console.log(converted)
  })

};
