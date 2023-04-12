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
      console.log("\n\n")
      console.log(req.body)
      console.log(req.body.coordinate)
      if ( !req.body.puzzle || !req.body.coordinate || !req.body.value ) {
        console.log('Required field(s) missing')
        return res.json({ error: 'Required field(s) missing' })
      }
      let coordinates = req.body.coordinate.split('')
      if (!solver.validate(req.body.puzzle)) {
        console.log('Invalid characters in puzzle')
        return res.json({ error: 'Invalid characters in puzzle' })
      } else if (req.body.puzzle.length != 81) {
        console.log('Expected puzzle to be 81 characters long')
        return res.json({ error: 'Expected puzzle to be 81 characters long' })
      }

      if (solver.checkValidCoordinates(coordinates) == false) {
        console.log('Invalid coordinate')
        return res.json({ error: 'Invalid coordinate'})
      } else if (solver.checkValidValue(req.body.value) == false) {
        console.log('Invalid valid')
        return res.json({ error: 'Invalid value'})
      }

      if (solver.checkExactSquare(req.body.puzzle, coordinates[0], coordinates[1], req.body.value)) {
        return res.json({ valid: true })
      }
      let valid_row = ["row", solver.checkRowPlacement(req.body.puzzle, coordinates[0], coordinates[1], req.body.value)]
      let valid_col = ["column", solver.checkColPlacement(req.body.puzzle, coordinates[0], coordinates[1], req.body.value)]
      let valid_reg = ["region", solver.checkRegionPlacement(req.body.puzzle, coordinates[0], coordinates[1], req.body.value)]
      let errors = [valid_row, valid_col, valid_reg].filter(i => i[1] == false)
      console.log(errors)
      let conflicts = errors.map(e => e[0])
      if (errors.length > 0) {
        return res.json({ valid: false, conflict: conflicts })
      }
      return res.json({ valid: true })
    });

  app.route('/api/solve')
    .post((req, res) => {
      console.log(req.body)
      if ( !req.body.puzzle ) {
        console.log('Required field(s) missing')
        return res.json({ error: 'Required field missing' })
      }

      if (!solver.validate(req.body.puzzle)) {
        console.log('Invalid characters in puzzle')
        return res.json({ error: 'Invalid characters in puzzle' })
      } else if (req.body.puzzle.length != 81) {
        console.log('Expected puzzle to be 81 characters long')
        return res.json({ error: 'Expected puzzle to be 81 characters long' })
      }
      solver.solve(req.body.puzzle)

    });
};
