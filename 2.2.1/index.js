var express = require("express");
var app = express();
var bodyParser = require("body-parser");
let ejs = require("ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.render("index.ejs", {});
});

app.post("/echoform", (req, res) => {
  res.set({ "Content-type": "text/plain" });

  let response = "";
  for (let attr in req.body) {
    response += attr + " : " + req.body[attr] + "\n";
  }
  res.send(response);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
