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
  console.log(date)
  console.log(typeof date)
