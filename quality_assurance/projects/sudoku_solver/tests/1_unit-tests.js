const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('Unit Tests', () => {
  test('Logic handles a valid puzzle string of 81 characters', function(done) {
    chai.request(server)
    .post('/api/solve')
    .send({
      puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.property(res.body, 'solution')
      done();
    });
  });

  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function(done) {
    chai.request(server)
    .post('/api/solve')
    .send({
      puzzle: "1.5..2.84..f3.12.7.2g.5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.body.error, 'Invalid characters in puzzle')
      done();
    });
  });

  test('Logic handles a puzzle string that is not 81 characters in length', function(done) {
    chai.request(server)
    .post('/api/solve')
    .send({
      puzzle: "1.5..2.84...3.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.."
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
      done();
    });
  });

  test('Logic handles a valid row placement', function(done) {
    chai.request(server)
    .post('/api/check')
    .send({
      puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
      coordinate: "A1",
      value: 7
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.body.valid, true )
      done();
    });
  });

  test('Logic handles an invalid row placement', function(done) {
    chai.request(server)
    .post('/api/check')
    .send({
      puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
      coordinate: "A2",
      value: 4
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.body.valid, false )
      assert.equal(res.body.conflict, "row" )
      done();
    });
  });

  test('Logic handles a valid column placement', function(done) {
    chai.request(server)
    .post('/api/check')
    .send({
      puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
      coordinate: "A2",
      value: 3
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.body.valid, true )
      done();
    });
  });

  test('Logic handles an invalid column placement', function(done) {
    chai.request(server)
    .post('/api/check')
    .send({
      puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
      coordinate: "A2",
      value: 4
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.body.valid, false )
      done();
    });
  });

  test('Logic handles a valid region (3x3 grid) placement', function(done) {
    chai.request(server)
    .post('/api/check')
    .send({
      puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
      coordinate: "E2",
      value: 1
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.body.valid, true )
      done();
    });
  });

  test('Logic handles an invalid region (3x3 grid) placement', function(done) {
    chai.request(server)
    .post('/api/check')
    .send({
      puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
      coordinate: "E2",
      value: 2
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.body.valid, false )
      done();
    });
  });

  test('Valid puzzle strings pass the solver', function(done) {
    chai.request(server)
    .post('/api/solve')
    .send({
      puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.property(res.body, 'solution')
      done();
    });
  });

  test('Invalid puzzle strings fail the solver', function(done) {
    chai.request(server)
    .post('/api/solve')
    .send({
      puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.."
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.property(res.body, 'error')
      done();
    });
  });

  test('Solver returns the expected solution for an incomplete puzzle', function(done) {
    chai.request(server)
    .post('/api/solve')
    .send({
      puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.body.solution, '135762984946381257728459613694517832812936745357824196473298561581673429269145378')
      done();
    });
  });



});
