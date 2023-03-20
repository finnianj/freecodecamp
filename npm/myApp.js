require('dotenv').config()

let express = require('express');
let app = express();


app.use("/public", express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  console.log(req.method, req.path, req.ip)
  next();
});

// app.get("/", (req, res) => {
//   res.send('Response String')
// });


let html_index_path = __dirname + '/views/index.html'

app.get("/", (req, res) => {
  res.sendFile(html_index_path)
});

app.get("/json", (req, res) => {

  if (process.env.MESSAGE_STYLE == 'uppercase') {
    return res.json( {"message": "HELLO JSON"})
  } else {
    return res.json( {"message": "Hello json"})
  }

});
