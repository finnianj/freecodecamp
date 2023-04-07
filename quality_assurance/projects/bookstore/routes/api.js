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

// Book.deleteMany({})
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.error(err)
//   })

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      Book.find({})
        .then((data) => {
          let formatted_data = data.map((b) => b = { _id: b.id, title: b.title, commentcount: b.comments.length })
          console.log("\nAll books:\n")
          console.log(formatted_data)
          res.json(formatted_data)
        })
        .catch((err) => {
          console.log("Request for all books failed.\n")
          console.log(err)
        })
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
          console.log("Request to create book failed.\n")
          console.log(err)
          res.send("missing required field title\n")
        })
      //response will contain new book object including atleast _id and title
    })

    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      Book.find({ _id: bookid })
        .then((data) => {
          console.log("\nThank you for searching for a book. Here are the results:\n")
          console.log(data)
          res.json(data)
        })
        .catch((err) => {
          console.log("\nRequest for individual book.\n")
          console.log(err)
          res.send("no book exists.")
        })
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      if ( comment == null || comment || undefined ) {
        res.send("missing required field comment")
      } else if ( bookid == null || bookid || undefined ) {
        res.send("missing id")
      }
      //json res format same as .get
    })

    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });

};
