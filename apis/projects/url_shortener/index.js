require('dotenv').config();
let mongoose = require("mongoose")
const mongo_key = process.env.MONGO_URI
const express = require('express');
const cors = require('cors');
const app = express();
let bodyParser = require('body-parser')

mongoose.connect(mongo_key, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Mongodb connected"))
.catch(err => console.log(err));


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
//parsing middleware

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

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
