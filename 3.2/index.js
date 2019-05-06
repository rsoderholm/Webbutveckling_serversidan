var express = require("express");
var app = express();

var ejs = require("ejs");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  console.log(res);
  var environmentVariables = process.env;
  var response;
  console.log(req.headers);

  for (var key in environmentVariables) {
    if (environmentVariables.hasOwnProperty(key)) {
      response += key + " : " + environmentVariables[key] + "\n";
    }
  }

  //   res.setHeader("content-type", "text/plain");
  // console.log(response);
  // console.log(environmentVariables);
  res.render("index", { environmentVariables: environmentVariables });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
