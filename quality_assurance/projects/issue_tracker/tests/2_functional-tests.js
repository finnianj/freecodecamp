const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
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
        assert.isNotNull(res.body.id, 'Giovanni')
        assert.equal(res.body.project, 'test-project');
        done();
      })
  });

});

// Write the following tests in tests/2_functional-tests.js:

// Create an issue with every field: POST request to /api/issues/{project}
// Create an issue with only required fields: POST request to /api/issues/{project}
// Create an issue with missing required fields: POST request to /api/issues/{project}
// View issues on a project: GET request to /api/issues/{project}
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
