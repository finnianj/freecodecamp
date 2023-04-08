/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {

      test('Test POST /api/books with title', function(done) {
        chai.request(server)
        .post('/api/books')
        .send({
          title: "Test book"
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.property(res.body, '_id')
          assert.property(res.body, 'comments')
          done();
        });
      });

      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
        .post('/api/books')
        .send({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(Object.keys(res.body).length, 0)
          assert.equal(res.text, 'missing required field title')
          done();
        });
      });

    });


    suite('GET /api/books => array of books', function(){

      test('Test GET /api/books',  function(done){
        chai.request(server)
        .get('/api/books')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body)
          assert.property(res.body[0], 'title')
          done();
        });
      });

    });


    suite('GET /api/books/[id] => book object with [id]', function(){

      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
        .get('/api/books/123456')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'no book exists.')
          done();
        });
      });

      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
        .post('/api/books')
        .send({
          title: "Book to be tested"
        })
        .end(function(err, res){
          chai.request(server)
          .get(`/api/books/${res.body._id}`)
          .end(function(err, res){
            console.log(res.body)
            assert.equal(res.status, 200);
            assert.property(res.body, '_id')
            done();
          });
        });
      });

    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){

      test('Test POST /api/books/[id] with comment', function(done){
          chai.request(server)
          .post('/api/books')
          .send({
            title: "Book to add comment to"
          })
          .end(function(err, res){
            chai.request(server)
            .post(`/api/books/${res.body._id}`)
            .send({
              comment: 'I despise this book with a burning hatred'
            })
            .end(function(err, res){
              assert.equal(res.status, 200);
              assert.equal(res.body.comments[0], 'I despise this book with a burning hatred')
              done();
            });
          });
        });

      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai.request(server)
          .post('/api/books')
          .send({
            title: "Another book to add a comment to"
          })
          .end(function(err, res){
            chai.request(server)
            .post(`/api/books/${res.body._id}`)
            .send({})
            .end(function(err, res){
              assert.equal(res.status, 200);
              assert.equal(res.text, 'missing required field comment')
              done();
            });
          });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai.request(server)
        .post(`/api/books/123456`)
        .send({
          comment: "this is a bad id"
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'no book exists')
          done();
        });
      });

    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai.request(server)
          .post('/api/books')
          .send({
            title: "Book to delete"
          })
          .end(function(err, res){
            chai.request(server)
            .delete(`/api/books/${res.body._id}`)
            .end(function(err, res){
              assert.equal(res.status, 200);
              assert.equal(res.text, 'delete successful')
              done();
            });
          });
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai.request(server)
        .delete(`/api/books/123456`)
        .end(function(err, res){
          console.log(res)
          assert.equal(res.status, 200);
          assert.equal(res.text, 'Unable to delete that book.')
          done();
        });
      });

    });
});
