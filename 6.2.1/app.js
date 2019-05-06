//server

let express = require("express"),
  bodyParser = require("body-parser"),
  ejs = require("ejs"),
  morgan = require("morgan"),
  mysql = require("mysql"),
  stripTags = require("striptags");
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "posts"
});

let app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("combined"));

var strippedTags = input => {
  for (let key in input) {
    input[key] = stripTags(input[key]);
  }
  return input;
};

app.get("/", (req, res) => {
  connection.query("Select * FROM POSTS", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
    }
    res.render("index", { posts: results });
  });
});

app.get("/addpost", (req, res) => {
  res.render("addpost");
});

app.post("/addpost", (req, res) => {
  let newPost = req.body;

  newPost.time =
    new Date().toDateString() + " " + new Date().toLocaleTimeString();

  let sanitizedPost = strippedTags(newPost);

  connection.query("INSERT INTO posts SET ?", sanitizedPost, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Inserted record!");
      res.redirect("/");
    }
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server is listening on port: " + PORT);
});
