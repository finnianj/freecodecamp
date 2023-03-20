require('dotenv').config()

let express = require('express');
let app = express();


app.use("/public", express.static(__dirname + '/public'));
// This serves assets from 2nd arg directory to requests made to 1st arg directory
// The request is made in the link tag of index.html

app.use(function(req, res, next) {
  console.log(req.method, req.path, req.ip)
  next();
});

// This is a middleware function that logs request information for any request to any path.
// Adding another argument before the function would specify which path to trigger the function on.
// You can also specify with app.get, app.post etc.


let html_index_path = __dirname + '/views/index.html'

app.get("/", (req, res) => {
  res.sendFile(html_index_path)
});

// This serves index.html



app.get("/json", (req, res) => {

  if (process.env.MESSAGE_STYLE == 'uppercase') {
    return res.json( {"message": "HELLO JSON"})
  } else {
    return res.json( {"message": "Hello json"})
  }

});

// This serves json and uses environment variables to determine the output.
