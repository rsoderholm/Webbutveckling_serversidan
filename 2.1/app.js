let express = require('express'),
    ejs = require('ejs');
let app = express();

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/echolink', (req, res) => {
    let response = "";
    console.log(req.query);
    res.set({
        'Content-type': 'text/plain'
    });
    for (let key in req.query) {
        response += key + " = " + req.query[key] + "\n";
    }
    res.send(response);
})


const port = process.env.port || 5000;

app.listen(port, () => {
    console.log("Server is listening on port: " + port);
});