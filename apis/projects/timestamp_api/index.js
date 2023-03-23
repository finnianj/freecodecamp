// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

const convertDate = (date) => {
  const regexone = /^\d{4}-\d{2}-\d{2}$/
  const regextwo = /^\d+$/
  let utc = "";
  let unix= "";
  // clearing variables from previous search

  if (regexone.test(date)) {
    unix = Date.parse(date);
    utc = new Date(date).toGMTString();
  } else if (regextwo.test(date)) {
    unix = Date.parse(date)
    utc = new Date(date).toGMTString();
  } else {
    return "Invalid"
  }
  return [utc, unix];
}

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function(req, res, next) {
  let conversion = convertDate(req.params.date)
  if (conversion[0] == "Invalid Date") {
    return res.json({ "error": "Invalid date"} )
  }
  return res.json({ "unix": conversion[1], "utc": conversion[0] })
  next();
})

app.get("/api", function(req, res, next) {
  return res.json({ "unix": Date.now(), "utc": new Date(Date.now()).toGMTString() })
  next();
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
