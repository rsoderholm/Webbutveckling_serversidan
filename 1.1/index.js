var express = require('express');
var fileSystem = require('fs');
var app = express();

var counter = 0;

app.get('/', function (req, res) {
    counter++;
    writeToFile();
    console.log(getCounterFromFile());
    res.send(getCounterFromFile());

});

function getCounterFromFile() {
    var data;
    try {
        data = fileSystem.readFileSync('text.txt', 'utf8');
        console.log("Data: " + data);
    } catch (e) {
        console.log("Error: " + e.stack);
    }
    return data;
}


function writeToFile() {
    fileSystem.writeFileSync('text.txt', counter);
}


app.listen(5000, function () {
    console.log("Server is running...")
});