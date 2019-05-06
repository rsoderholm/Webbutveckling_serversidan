let express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  ejs = require("ejs");

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
let Schema = mongoose.Schema;

let logSchema = new Schema({
  time: String,
  REMOTE_ADDR: String,
  HTTP_USER_AGENT: String
});
mongoose.connect("mongodb://localhost:27017/test");

let LogEntry = mongoose.model("logEntry", logSchema);

app.get("/", (req, res) => {
  //   console.log(req.headers);
  res.setHeader("content-type", "text/plain");

  let newLogEntry = new LogEntry({
    time: new Date().toDateString(),
    REMOTE_ADDR: req.ip,
    HTTP_USER_AGENT: req.headers["user-agent"]
  });
  saveToDB(newLogEntry);

  LogEntry.find({}, function(err, entries) {
    if (err) {
      console.log(err);
    } else {
      res.send(entries);
    }
  });
});

var saveToDB = entry => {
  entry.save().then(() => console.log("saved"));
};

var getEntries = () => {
  LogEntry.find({}, function(err, entries) {
    if (err) {
      console.log(err);
    } else {
      //  console.log(entries);
    }
    return entries;
  });
};


const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server is listening on port: " + PORT);
});
