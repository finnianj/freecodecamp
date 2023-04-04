'use strict';
let mongoose = require("mongoose")
require('dotenv').config();

// --------- Mongo DB config -------------

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Mongodb connected"))
.catch(err => console.log(err));

const issueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});


module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(function (req, res){
      let project = req.params.project;

    })

    .post(function (req, res){
      let project = req.params.project;

    })

    .put(function (req, res){
      let project = req.params.project;

    })

    .delete(function (req, res){
      let project = req.params.project;

    });

};
