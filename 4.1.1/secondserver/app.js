let express = require("express");
let app = express();
let ejs = require("ejs");
let bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  let response = "";
  
  res.type('text/plain');
  for(let key in req.query) {
    response += `${key} = ${req.query[key]}\n`

  }
  res.send(response);
});

const port = 4000;
app.listen(port, () => {
  console.log("Server is listening on port: " + port);
});
