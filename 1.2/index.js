var express = require('express');
var fileSystem = require('fs');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');

app.use(morgan('dev'));



app.get('/', function (req, res) {
    var environmentVariables = process.env;
    var response;

    for (var key in environmentVariables) {
        if (environmentVariables.hasOwnProperty(key)) {
            response += key + " : " + environmentVariables[key] + "\n";
        }

    }

    res.setHeader('content-type', 'text/plain');
    console.log(response);
    res.send(response);

});


const PORT = 5000;

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
});