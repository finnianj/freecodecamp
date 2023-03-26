const express = require('express')
let mongoose = require("mongoose")
let bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const mongo_key = process.env['MONGO']
require('dotenv').config()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// --------- Mongo DB config -------------

mongoose.connect(mongo_key, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Mongodb connected"))
.catch(err => console.log(err));

const exerciseSchema = new mongoose.Schema({
  username: String,
  userId: String,
  description: String,
  date: {type: Date, default: new Date()},
  duration: Number
});

const logSchema = new mongoose.Schema({
  username: String,
  count: Number,
  log: [{
    description: String,
    duration: Number,
    date: String,
  }]
});

const userSchema = new mongoose.Schema({
  username: String,
});

let Exercise = mongoose.model('Link', exerciseSchema);
let User = mongoose.model('User', userSchema);
let Log = mongoose.model('Log', logSchema);

// User.deleteMany({}).then((res) => {
//     //if succeded do this block of code
//     console.log(res)
//   }).catch((err) => {
//     console.log("Error: " + err)
// });

// Exercise.deleteMany({}).then((res) => {
//     //if succeded do this block of code
//     console.log(res)
//   }).catch((err) => {
//     console.log("Error: " + err)
// });

// --------- Mongo DB config -------------

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

// --------- Routing -------------

app.post('/api/users', function(req, res) {

  let new_user = new User({
      username: req.body.username,
    });

  new_user.save()
    .then((data) => {
        console.log("Created: " + data)
        res.json({ username: data.username, _id: data._id });
    })
    .catch((err) => {
      console.log("Error: " + err)
    });


});


app.get('/api/users', function(req, res) {
  User.find({})
    .then(data => {
      console.log(data)
      res.json(data)
    })
    .catch(err => {
      console.log(err)
      res.json(err)
    })
})

app.post('/api/users/:_id/exercises', function(req, res) {

  let new_exercise = new Exercise({
    userId: req.params._id,
    description: req.body.description,
    duration: req.body.duration,
  });

  if ( req.body.date != '') {
    new_exercise.date = new Date(req.body.date)
  }

  User.findById({ _id: req.params._id})
    .then(user => {
      new_exercise.save()
        .then((data) => {
            console.log("Created exercise: " + data)
            res.json({
              _id: user._id,
              username: user.username,
              date: new_exercise.date.toDateString(),
              duration: new_exercise.duration,
              description: new_exercise.description
            });
        })
        .catch((err) => {
          console.log("Error: " + err)
        });
    })
    .catch(err => {
      console.log(err)
    })




});


app.get('/api/users/:_id/logs', function(req, res) {
  User.findById({ _id: req.params._id })
    .then(user => {
      console.log("User found " + user)
      Exercise.find({ userId: user._id })
        .then(exercises => {

            console.log(exercises)
          exercises = exercises.map((i) => {
            return {
                    description: i.description,
                    duration: i.duration,
                    date: i.date.toDateString()
                    }
          })
          res.json({
            _id: user._id,
            username: user.username,
            count: exercises.length,
            log: exercises
          })
        })
        .catch(err => {
          console.log("Could not find exercises: " + err)
        })
    })
    .catch(err => {
      console.log("No user found: " + err)
    })
})


// --------- Routing -------------
