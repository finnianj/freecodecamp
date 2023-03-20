require('dotenv').config()
let bodyParser = require('body-parser')


let express = require('express');
let app = express();


app.use(bodyParser.urlencoded({ extended: false }));
// This allows you to access encoded data in the body of post requests

app.use("/public", express.static(__dirname + '/public'));
// This serves assets from 2nd arg directory to requests made to 1st arg directory
// The request is made in the link tag of index.html

app.use(function(req, res, next) {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string)
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


app.get("/now", function(req, res, next) {
  req.time = new Date().toString()
  next();
}, function(req, res){
  return res.json({"time": req.time})
})

// Here there is a middleware function chained with the final handler. Notice how you have to use next to progress through the chain.


app.get("/:word/echo", function(req, res, next) {
  return res.json({"echo": req.params.word})
  next();
})

// This route uses the params to return json. Params access the route parameters used in the URL pathway
// Basically if I make a request to the URL /chocolate/echo, it will respond with {echo: chocolate}


app.get("/name", function(req, res, next) {
  return res.json({ "name": req.query.first + " " + req.query.last })
})

// This handler accesses the req.query object, which parses data from the query string in the URL:
// eg. /name?first=Mick&last=Jagger


app.post("/name", function(req, res) {
  res.json({ "name": req.body.first + " " + req.body.last })
})

// Because we have added body parser middleware above, when the form in index.html is submitted
// The encoded query (?first=Johnlast=Doe) is taken from the post body and uses the same syntax
// as url queries.
