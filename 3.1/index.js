let express = require('express');
let app = express();
let fm = require('./FileManager.js');
const fileManager = new fm();

app.get('/', function (req, res) {
    res.type('text/html');
    fileManager.increaseVisitorCount();
    let html = fileManager.getHTML();
    let newHTML = html.replace('#hits#', fileManager.getVisitorCount());
    res.send(new Buffer(newHTML));

});


const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log("Server is running on port: " + PORT);
});