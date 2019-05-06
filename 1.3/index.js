var express = require('express');
var app = express();
var bodyParser = require('body-parser');
let ejs = require('ejs');


app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', function (req, res) {
    res.render('index.ejs', {
        Hello: "Hello there"
    });


});


app.get('/user', (req, res) => {
    console.log(req.query);
    
    res.set({
        'Content-type': 'text/plain',
    });

    let response = "";
    for (let attr in req.query) {
        response += attr + "=" + req.query[attr] + "\n";

    }
    res.send(response);
    res.end();



});


const PORT = 5000;

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
});