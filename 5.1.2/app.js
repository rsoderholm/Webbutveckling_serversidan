let express = require("express"),
  app = express(),
  nodemailer = require("nodemailer"),
  bodyParser = require("body-parser"),
  ejs = require("ejs");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 5000;

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/sendmail", (req, res) => {
  console.log(req.body);
  var transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: req.body.from,
      pass: req.body.password
    }
  });

  var mailOptions = {
    from: req.body.from,
    to: req.body.recipient,
    subject: req.body.subject,
    text: req.body.content
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send("Error: " + error);
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.send(req.body.content);
    }
  });
});

app.listen(PORT, () => {
  console.log("Server is listening on port: " + PORT);
});
