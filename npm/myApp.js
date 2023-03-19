let express = require('express');
let app = express();


app.use("/public", express.static(__dirname + '/public'));

// app.get("/", (req, res) => {
//   res.send('Response String')
// });


let html_index_path = __dirname + '/views/index.html'

app.get("/", (req, res) => {
  res.sendFile(html_index_path)
});

app.get("/json", (req, res) => {
  res.json( {"message": "Hello json"})
});
