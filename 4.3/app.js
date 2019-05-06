let express = require("express");
let app = express();
let session = require("express-session");
let ejs = require("ejs");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    // name: "server-session-cookie-id",
    secret: "my secret"
    // cookie: { "favorite-color": "red", 'favorite-animal' : 'cat' },
    // resave: false,
    // saveUninitialized: false
  })
);

app.get("/", (req, res) => {
  
  req.session.favoriteColor = "red";
  req.session.favoritePet = "cat";
  console.log(req.session);
  res.render("index.ejs");
 
});

//TODO filter out the cookie object in the print
app.get("/showSession", (req, res) => {
  res.setHeader("content-type", "text/plain");
  // console.log(req.session);
  console.log(req.session.cookie);


  let cookieString = "";
  for (let key in req.session) {
    {
      cookieString += key + " = " + req.session[key] + "\n";
    }
  }
  res.send(cookieString);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server is listening on port: " + PORT);
});
