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
      console.log(req.body)
      solver.checkRowPlacement(req.body.puzzlestring)

    });

  app.route('/api/solve')
    .post((req, res) => {

    });
};
