const express = require('express')
let mongoose = require("mongoose")
let bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const mongo_key = process.env.MONGO
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// --------- Mongo DB config -------------

mongoose.connect(mongo_key, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Mongodb connected"))
.catch(err => console.log(err));

const excerciseSchema = new mongoose.Schema({
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

let Link = mongoose.model('Link', excerciseSchema);
let User = mongoose.model('User', userSchema);
let Log = mongoose.model('Log', logSchema);

// --------- Mongo DB config -------------


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
