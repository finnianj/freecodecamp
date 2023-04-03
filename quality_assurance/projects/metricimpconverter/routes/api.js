'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
// const input_field = document.getElementById('convert');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    console.log(req.query.input)
  })

};
