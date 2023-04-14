const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
  test('Translation with text and locale fields: POST request to /api/translate', function(done) {
    chai.request(server)
    .post('/api/translate')
    .send({
      text: "yoghurt",
      locale: "british-to-american"
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.body.translation, '<span class=\"highlight\">yogurt</span>')
      done();
    });
  });
  test('Translation with text and invalid locale field: POST request to /api/translate', function(done) {
    chai.request(server)
    .post('/api/translate')
    .send({
      text: "yoghurt",
      locale: "british"
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.body.translation, undefined)
      done();
    });
  });
  test('Translation with missing text field: POST request to /api/translate', function(done) {
    chai.request(server)
    .post('/api/translate')
    .send({
      locale: "british-to-american"
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.body.translation, undefined)
      done();
    });
  });
  test('Translation with missing locale field: POST request to /api/translate', function(done) {
    chai.request(server)
    .post('/api/translate')
    .send({
      text: "yoghurt",
      locale: ""
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.body.translation, undefined)
      done();
    });
  });
  test('Translation with empty text: POST request to /api/translate', function(done) {
    chai.request(server)
    .post('/api/translate')
    .send({
      text: "",
      locale: "british-to-american"
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.body.translation, undefined)
      done();
    });
  });
  test('Translation with text that needs no translation: POST request to /api/translate', function(done) {
    chai.request(server)
    .post('/api/translate')
    .send({
      text: "Today is a lovely day",
      locale: "british-to-american"
    })
    .end(function(err, res){
      assert.equal(res.status, 200);
      assert.equal(res.body.translation, 'Everything looks good to me!')
      done();
    });
  });

});
