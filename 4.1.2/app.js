let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let ejs = require("ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  res.render("second", { name: req.body.name });
});

app.post("/result", (req, res) => {
  let result = req.body;
  console.log(result);
  var response = "";
  for (let key in result) {
    if (result.hasOwnProperty(key)) {
      response += key + " = " + result[key] + "\n";
    }
  }

  res.setHeader("content-type", "text/plain");
  res.send(response);

});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server is listening on port: " + PORT);
});
