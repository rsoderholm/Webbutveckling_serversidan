var express = require("express");
var app = express();
var bodyParser = require("body-parser");
let fs = require('fs');
var multer = require("multer");
let crypto = require('crypto');
let path = require('path');

let storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + path.extname(file.originalname)); // Adds file extension to saved file as multer doesn't do this natively.
    });
  }
});

let upload = multer({
  storage: storage,
  limits: {
    fileSize: 10240000
  }
});

app.use('/', express.static(__dirname));
app.use(bodyParser.json());

app.post("/upload", upload.single("myFile"), (req, res, next) => {

  var response = "";


  switch (req.file.mimetype) {
    case 'text/plain':
      res.setHeader('Content-type', 'text/plain')
      fs.readFile(req.file.path, 'utf-8', (err, data) => {
        console.log(req.file.path);
        res.send(data);
      });
      break;

    case 'image/jpeg':
      res.setHeader('Content-type', 'text/html');
      response = `<img src='./${req.file.path}'>`;
      res.send(response);
      break;

    case 'image/png':
      res.setHeader('Content-type', 'text/html');
      response = `<img src='./${req.file.path}'>`;
      res.send(response);
      break;

    default:
      res.setHeader('Content-type', 'text/plain');
      response = `Filename: ${req.file.filename}\nFilepath: ${req.file.path}\nFileSize: ${req.file.size/1024} Kb`
      res.send(response);
      break;


  }



});

app.get("/", function (req, res) {
  res.render("index.ejs");
});


const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});