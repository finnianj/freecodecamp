const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  // #1
  test('Create an issue with every field: POST request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .post('/api/issues/test-project')
      .send({
        issue_title: "Testing post request",
        issue_text: "Test text",
        created_by: "Finn",
        assigned_to: "Me",
        status_text: "Working on this",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.type, 'application/json')
        assert.isNotNull(res.body.id)
        assert.equal(res.body.project, 'test-project');
        done();
      })
  });

  // #2
  test('Create an issue with only required fields: POST request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .post('/api/issues/test-project')
      .send({
        issue_title: "Testing required fields",
        issue_text: "Test required",
        created_by: "Finn",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.type, 'application/json')
        assert.isNotNull(res.body.id)
        assert.equal(res.body.project, 'test-project');
        done();
      })
  });

  // #3
  test('// Create an issue with missing required fields: POST request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .post('/api/issues/test-project')
      .send({
        issue_title: "Testing missing required fields",
        issue_text: "Missing required",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200)
        assert.equal(res.body.error, 'required field(s) missing')
        assert.isUndefined(res.body.id)
        done();
      })
  });

  // #4
  test('// View issues on a project: GET request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .get('/api/issues/test-project')
      .end(function (err, res) {
        console.log(res.body)
        assert.equal(res.status, 200)
        assert.equal(res.body[0].issue_title, 'Testing post request')
        assert.isDefined(res.body[1]._id)
        done();
      })
  });

  // #5
  test('// View issues on a project with one filter: GET request to /api/issues/{project}', function (done) {
    chai
      .request(server)
      .post('/api/issues/test-project')
      .send({
        issue_title: "Ben's post",
        issue_text: "Test text",
        created_by: "Ben",
      })
      .end(function (err, res) {
        chai
          .request(server)
          .get('/api/issues/test-project?created_by=Ben')
          .end(function (err, res) {
            console.log(res.body)
            assert.equal(res.status, 200)
            assert.equal(res.body[0].issue_title, 'Ben\'s post')
            assert.isDefined(res.body[0]._id)
            done();
          })
      })
  });

});

// Write the following tests in tests/2_functional-tests.js:

// View issues on a project with one filter: GET request to /api/issues/{project}
// View issues on a project with multiple filters: GET request to /api/issues/{project}
// Update one field on an issue: PUT request to /api/issues/{project}
// Update multiple fields on an issue: PUT request to /api/issues/{project}
// Update an issue with missing _id: PUT request to /api/issues/{project}
// Update an issue with no fields to update: PUT request to /api/issues/{project}
// Update an issue with an invalid _id: PUT request to /api/issues/{project}
// Delete an issue: DELETE request to /api/issues/{project}
// Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
// Delete an issue with missing _id: DELETE request to /api/issues/{project}
