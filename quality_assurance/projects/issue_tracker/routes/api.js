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

Issue.deleteMany({})

module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(function (req, res){
      const queryObj = req.query || {}
      queryObj.project = req.params.project
      console.log("\nSearching for:")
      console.log(queryObj)
      Issue.find(queryObj)
        .then((data) => {
          console.log("Data found\n")
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
          console.log("Data created.\n\n")
          res.json(issue)
        })
        .catch((err) => {
          console.error(err)
          res.json({ error: 'required field(s) missing' })
        })
      })

    .put(function (req, res){
      const id = req.body['_id']
      console.log("\nNew item:\n")
      console.log("id: " + id)
      console.log(req.body)
      console.log(req.params.project)
      if ( !id || id == undefined) {
        console.log("missing id")
        return res.json({ error: 'missing _id' })
      }
      const updateObj = { ...req.body }
      delete updateObj._id
      updateObj.project = req.params.project
      if ( Object.keys(updateObj).length == 1  ) {
        console.log("missing update field")
        res.json({ error: 'no update field(s) sent', '_id': id })
        return
      }

      updateObj.updated_on = Date.now()

      Issue.findOneAndUpdate({ _id: id}, { $set: updateObj }, { new: true, upsert: false, runValidators: true })
        .then(data => {
          if (data == null) {
            console.log("update failed\n")
            return res.json({ error: 'could not update', _id: id })
          } else {
            console.log("successful update\n")
            console.log(data)
            console.log("\n\n")
            res.json({  result: 'successfully updated', '_id': id })
            return
          }
        })
        .catch(err => {
          console.log("update failed\n")

          return res.json({ error: 'could not update', _id: id })
        })

    })


    .delete(function (req, res) {
      console.log("\n\nNew delete item:\n")
      console.log(req.body)
      const id = req.body['_id']
      console.log("Id: " + id)
      if ( id == undefined ) {
        console.log("No ID")
        res.json({ error: 'missing _id' })
        return
      }

      Issue.findOneAndDelete({ _id: id})
      .then(data => {
        if (data == null) {
          console.log("Deletion failed\n")
          return res.json({ error: 'could not delete', '_id': id })
        } else {
          console.log("Deleted")
          console.log(data)
          res.json({ result: 'successfully deleted', '_id': id })
          return
        }
      })
      .catch(error => {
        console.log("Failure: " + error)
        res.json({ error: 'could not delete', '_id': id })
        return
      })

    });

};
