/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';
let mongoose = require("mongoose")
require('dotenv').config();

// --------- Mongo DB config -------------

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Mongodb connected"))
.catch(err => console.log(err));

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  comments: [String]
});

let Book = mongoose.model('Book', bookSchema);

Book.deleteMany({})
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err)
  })

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })

    .post(function (req, res){
      let book = new Book({
        title: req.body.title
      });
      book.save()
        .then((data) => {
          console.log("\nBook created:")
          console.log(data)
          res.json(data)
        })
        .catch((err) => {
          console.log(err)
        })
      //response will contain new book object including atleast _id and title
    })

    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })

    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });

};
