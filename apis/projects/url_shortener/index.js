require('dotenv').config();
const express = require('express');
let mongoose = require("mongoose")
const mongo_key = process.env['MONGO_KEY']

const cors = require('cors');
const app = express();
let bodyParser = require('body-parser')
const dns = require('dns');


// Basic Configuration
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(mongo_key, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Mongodb connected"))
.catch(err => console.log(err));

const linkSchema = new mongoose.Schema({
  url: String,
  short_url: Number

});

let Link = mongoose.model('Link', linkSchema);

let i = 10;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

Link.deleteMany({}).then((res) => {
    //if succeded do this block of code
    console.log(res)
  }).catch((err) => {
    console.log("Error: " + err)
});

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/shorturl/:id', function(req, res) {
  Link.find({ short_url: parseInt(req.params.id, 10) }).then((ok) => {
    console.log(ok)
    res.redirect(ok[0].url);
  }).catch((err) => {
    console.log("Error: " + err)
  });
});

app.post("/api/shorturl", async function(req, res, done) {
let regex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);

  if (req.body.url.match(regex)) {
    console.log("valid")
    let a = new Link({
      url: req.body.url,
      short_url: i
    });

    a.save().then((res) => {
          //if succeded do this block of code
          console.log("Created: " + res)
          i += 10;
          console.log("short url id has been incremented. It is now equal to " + i)
          done(null, res)
      }).catch((err) => {
        console.log("Error: " + err)
      });

    res.json({ original_url: req.body.url, short_url: a.short_url })
  } else {
    console.log("invalid")
    res.json({ error: 'invalid url'})
  }

})


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
