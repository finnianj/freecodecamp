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
      if (req.body.title == "" || req.body.title == undefined ) return res.send("missing required field title")
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
          console.log("\nRequest to create book failed.\n")
          console.log(err)
          res.send("\nmissing required field title\n")
        })
      //response will contain new book object including atleast _id and title
    })

    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      Book.findById(bookid)
        .then((data) => {
          if (data == null || data[0] == {} ) return res.send("no book exists")
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
      if ( comment == null || comment == undefined ) {
        return res.send("missing required field comment")
      } else if ( bookid == null || bookid == undefined ) {
        return res.send("missing id")
      }
      Book.findById(bookid)
        .then((book) => {
          if (book == null) return res.send("no book exists")
          console.log("\nAdding comment to the following book:\n")
          console.log(book)
          book.comments.push(comment);
          book.save()
           .then((data) => {
             console.log("\nSuccess\n")
             console.log(data)
             return res.json(data)
           })
           .catch((err) => {
             console.log("\nCould not add comment\n")
             console.log(err)
             return res.send("no book exists")
           })
        })
        .catch((err) => {
          console.log("\nCould not find book\n")
          console.log(err)
          return res.send("no book exists")
        })
     })

    .delete(function(req, res){
      let bookid = req.params.id;
      if (!bookid) {
        Book.deleteMany({})
          .then((data) => {
            console.log("\nDeleted all books.\n")
            return res.send("complete delete successful")
          })
          .catch((err) => {
            console.log("\nUnable to delete all books.\n")
            return res.send("Unable to delete all books.")
          })
      }
      Book.findByIdAndDelete(bookid)
        .then((data) => {
          if (data == null) return res.send("no book exists.")
          console.log("\nDeleted one book.\n")
          console.log(data)
          return res.send("delete successful")
        })
        .catch((err) => {
          console.log("\nUnable to delete that book.\n")
          return res.send("Unable to delete that books.")
        })
      //if successful response will be 'delete successful'
    });

};
