var express = require('express');
var cors = require('cors');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});


app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  console.log(req.file, req.body)
  res.json
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})
