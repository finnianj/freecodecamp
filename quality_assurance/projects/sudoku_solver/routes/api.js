'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
'use strict';
let mongoose = require("mongoose")
require('dotenv').config();

// --------- Mongo DB config -------------

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Mongodb connected"))
.catch(err => console.log(err));

// ---------------------------------------

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let coordinates = req.body.coordinate.split('')
      console.log(coordinates)
      // let valid_row = solver.checkRowPlacement(req.body.puzzle, coordinates[0], coordinates[1], req.body.value)
      // let valid_col = solver.checkColPlacement(req.body.puzzle, coordinates[0], coordinates[1], req.body.value)
      let valid_reg = solver.checkRegionPlacement(req.body.puzzle, coordinates[0], coordinates[1], req.body.value)
      console.log(valid_reg)
    });

  app.route('/api/solve')
    .post((req, res) => {

    });
};
