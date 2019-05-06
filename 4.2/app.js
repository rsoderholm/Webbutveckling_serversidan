let express = require("express");
let app = express();
let ejs = require("ejs");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {

  var now = new Date();
  let timeAndDate = `${dateOfWeek(now.getDay())}, ${now.toLocaleString()}`

  res.cookie("name", "Robin", {
    maxAge: 1000 * 10800,
    httpOnly: true
  });
  res.cookie("time", timeAndDate, {
    maxAge: 1000 * 10800,
    httpOnly: true
  });
  res.render('index');
});

app.get('/cookie', (req, res) => {
  res.setHeader('content-type', 'text/plain');
  res.send(getCookieAsString(req));
});

/*
  Returns the cookie as a string in the format I want it
*/

var getCookieAsString = function (req) {
  let myCookie = req.cookies;
  let cookieString = "";

  for (let key in myCookie) {
    if (myCookie.hasOwnProperty(key)) {
      cookieString += `${key} = ${myCookie[key]}\n`
    }
  }
  return cookieString;
};

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server is listening on port: " + PORT);
});

let dateOfWeek = function (date) {

  let weekday = new Array(7);

  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  return weekday[date];
}