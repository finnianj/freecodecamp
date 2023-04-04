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
Issue.deleteMany({})
  .then((data) => {
    console.log(data);
    let issue = new Issue({
      project: "finn",
      issue_title: "Title",
      issue_text: "Text",
      created_by: "Finn",
    })

    issue.save()
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.error(err)
            })
  })
  .catch((err) => {
    console.error(err)
  })

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
      const id = req.body['_id']
      if ( !id ) {
        return res.json({ error: 'missing _id' })
      }
      const updateObj = { ...req.body }
      delete updateObj._id
      delete updateObj.project
      if ( Object.keys(updateObj).length == 0  ) {
        res.json({ error: 'no update field(s) sent', '_id': id })
        return
      }

      updateObj.updated_on = Date.now()

      Issue.findOneAndUpdate({ _id: id}, { $set: updateObj }, { new: true, upsert: false })
        .then((data) => {
          res.json({  result: 'successfully updated', '_id': id })
        })
        .catch((err) => {
          return res.json({ error: 'could not update', _id: id })
        })

      res.json({ error: 'could not update', _id: id })

    })


    .delete(function (req, res){
      let project = req.params.project;

    });

};
