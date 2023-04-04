'use strict';
let mongoose = require("mongoose")
require('dotenv').config();

// --------- Mongo DB config -------------

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Mongodb connected"))
.catch(err => console.log(err));

const issueSchema = new mongoose.Schema({
  issue_title: {
    type: String,
    required: true
  },
  issue_text: {
    String,
    required: true
  },
  created_by: {
    String,
    required: true
  },
  assigned_to: {
    String,
    default: ''
  },
  status_text:{
    String,
    default: ''
  },
  created_on: {
    Date,
    default: Date.now
  },
  updated_on: {
    Date,
    default: Date.now
  },
  open: {
    Boolean,
    default: true
  }
});

let Issue = mongoose.model('Issue', issueSchema);

const createAndSaveIssue = (issue, done) => {
  let i = new Person(issue);

  i.save(function(err, data) {
    if (err) return console.error(err);
    console.log(data);
    done(null, data)
  });
};


module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(function (req, res){
      let project = req.params.project;

    })

    .post(function (req, res){
      let project = req.params.project;
      console.log(req.body)
      let issue = {
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        status_text: req.body.status_text
      }
      createAndSaveIssue(issue)
    })

    .put(function (req, res){
      let project = req.params.project;

    })

    .delete(function (req, res){
      let project = req.params.project;

    });

};
