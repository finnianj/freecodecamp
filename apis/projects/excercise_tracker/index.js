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
  description: String,
  date: String,
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
        res.json({ username: data.username, _id: data.id });
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
  // check if date field is emoty

  User.findById({ _id: req.body[':_id']})
    .then(data => {

      let new_exercise = new Exercise({
        username: data.username,
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date
      });

      new_exercise.save()
        .then((data) => {
            console.log("Created: " + data)
            res.json(data);
        })
        .catch((err) => {
          console.log("Error: " + err)
        });
    })

    .catch(err => {
      console.log(err)
    })




});


// --------- Routing -------------
