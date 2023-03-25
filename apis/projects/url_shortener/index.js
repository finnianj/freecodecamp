require('dotenv').config();
let mongoose = require("mongoose")
const mongo_key = process.env.MONGO_URI
const express = require('express');
const cors = require('cors');
const app = express();
let bodyParser = require('body-parser')
const port = process.env.PORT || 3000;



// Basic Configuration

app.use(bodyParser.urlencoded({ extended: false }));
//parsing middleware

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

mongoose.connect(mongo_key, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Mongodb connected"))
.catch(err => console.log(err));

const linkSchema = new mongoose.Schema({
  url: String,
  short_url: Number
});

let Link = mongoose.model('Link', linkSchema);

let i = 1;
// ----------------------------



app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post("/api/shorturl", function(req, res) {
  // console.log(checkURL(req.body.url))
let a = new Link({
  url: req.body.url,
  short_url: i
});

a.save().then((res) => {
    //if succeded do this block of code
    i += 1;
    console.log("i is now equal to " + i)
    // done(null, data)
  }).catch((err) => {
    console.log("Error: " + err)
  });

res.json({ "original_url": req.body.url })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
