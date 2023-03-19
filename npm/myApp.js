let express = require('express');
let app = express();

// app.get("/", (req, res) => {
//   res.send('Response String')
// });

let html_index_path = __dirname + '/views/index.html'

app.get("/", (req, res) => {
  res.sendFile(html_index_path)
});
