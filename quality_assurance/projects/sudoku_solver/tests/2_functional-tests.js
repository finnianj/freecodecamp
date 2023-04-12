const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  test('Solve a puzzle with valid puzzle string: POST request to /api/solve', function(done) {
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

  test('Solve a puzzle with missing puzzle string: POST request to /api/solve', function(done) {
    chai.request(server)
    .post('/api/solve')
    .send({
      puzzle: ""
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.property(res.body, 'error')
      done();
    });
  });

  test('Solve a puzzle with invalid characters: POST request to /api/solve', function(done) {
    chai.request(server)
    .post('/api/solve')
    .send({
      puzzle: "1.5..2.84..63.12.7.2..5...dfsfxg"
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.property(res.body, 'error')
      done();
    });
  });

  test('Solve a puzzle with incorrect length: POST request to /api/solve', function(done) {
    chai.request(server)
    .post('/api/solve')
    .send({
      puzzle: "1.5..2.84..63.12.7.2..5..."
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.property(res.body, 'error')
      done();
    });
  });

  test('Solve a puzzle that cannot be solved: POST request to /api/solve', function(done) {
    chai.request(server)
    .post('/api/solve')
    .send({
      puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.373"
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.property(res.body, 'error')
      done();
    });
  });

  test('Check a puzzle placement with all fields: POST request to /api/check', function(done) {
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

  test('Check a puzzle placement with single placement conflict: POST request to /api/check', function(done) {
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

  test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', function(done) {
    chai.request(server)
    .post('/api/check')
    .send({
      puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
      coordinate: "E2",
      value: 9
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.body.valid, false )
      assert.equal(res.body.conflict.length, 2 )
      done();
    });
  });

  test('Check a puzzle placement with all placement conflicts: POST request to /api/check', function(done) {
    chai.request(server)
    .post('/api/check')
    .send({
      puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
      coordinate: "A2",
      value: 2
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.body.valid, false )
      assert.equal(res.body.conflict.length, 3 )
      done();
    });
  });

  test('Check a puzzle placement with missing required fields: POST request to /api/check', function(done) {
    chai.request(server)
    .post('/api/check')
    .send({
      puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
      coordinate: "E2",
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.body.error, 'Required field(s) missing')
      done();
    });
  });

  test('Check a puzzle placement with invalid characters: POST request to /api/check', function(done) {
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

  test('Check a puzzle placement with incorrect length: POST request to /api/check', function(done) {
    chai.request(server)
    .post('/api/solve')
    .send({
      puzzle: "...1.5..2.84..773.12.7.29.5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
      done();
    });
  });

  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', function(done) {
    chai.request(server)
    .post('/api/check')
    .send({
      puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
      coordinate: "K2",
      value: 2
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.body.error, "Invalid coordinate" )
      done();
    });
  });

  test('Check a puzzle placement with invalid placement value: POST request to /api/check', function(done) {
    chai.request(server)
    .post('/api/check')
    .send({
      puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
      coordinate: "K2",
      value: 'F'
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.body.error, "Invalid coordinate" )
      done();
    });
  });

});
