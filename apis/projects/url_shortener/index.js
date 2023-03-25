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

const createAndSaveLink = (done, url) => {
  let a = new Link({
    url: url,
    short_url: i
  });

  a.save(function(err, data) {
    if (err) return console.error(err);
    console.log(data);
    i += 1;
    done(null, data)
  });

};

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post("/api/shorturl", function(req, res) {
  res.json({ "original_url": req.body.url })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
