let express = require("express");
let app = express();
let ejs = require("ejs");
let bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  let queryString = req.query.userName;
  res.render("index", { query: queryString });
});

const port = 5000;
app.listen(5000, () => {
  console.log("Server is listening on port: " + port);
});
