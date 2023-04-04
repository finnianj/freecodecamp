'use strict';
let mongoose = require("mongoose")
require('dotenv').config();

// --------- Mongo DB config -------------

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Mongodb connected"))
.catch(err => console.log(err));

const issueSchema = new mongoose.Schema({
  project: {
    type: String,
    default: 'apitest'
  },
  issue_title: {
    type: String,
    required: true
  },
  issue_text: {
    type: String,
    required: true
  },
  created_by: {
    type: String,
    required: true
  },
  assigned_to: {
    type: String,
    default: ''
  },
  status_text:{
    type: String,
    default: ''
  },
  created_on: {
    type: Date,
    default: Date.now
  },
  updated_on: {
    type: Date,
    default: Date.now
  },
  open: {
    type: Boolean,
    default: true
  }
});

let Issue = mongoose.model('Issue', issueSchema);


module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(function (req, res){
      const queryObj = req.query || {}
      queryObj.project = req.params.project
      console.log(queryObj)
      Issue.find(queryObj)
        .then((data) => {
          res.json(data)
        })
        .catch((err) => {
          console.error(err)
          res.json({ error: err })
        })
    })

    .post(function (req, res){
      let issue = new Issue({
        project: req.params.project,
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        status_text: req.body.status_text
      });

      issue.save()
        .then((data) => {
          console.log(data);
          res.json(issue)
        })
        .catch((err) => {
          console.error(err)
          res.json({ error: 'required field(s) missing' })
        })
      })

    .put(function (req, res){
      let project = req.params.project;
      console.log(req.body)
        const ageToSet = 20;
        Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true, runValidators: true})
        .then((data) => {
          console.log(data);
          res.json(issue)
        })
        .catch((err) => {
          console.error(err)
          res.json({ error: err })
        })
    })

    .delete(function (req, res){
      let project = req.params.project;

    });

};