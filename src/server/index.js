const dotenv = require('dotenv');
dotenv.config();

const path = require('path')
const express = require('express')
const aylien = require("aylien_textapi");

// set aylien API credentias
const textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
  });

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.post('/eval', function (req, res) {
    console.log("hit post function")
    console.log(req.body)
    textapi.sentiment({
        'url': req.body
    }, function(error, response) {
        if (error === null) {
            console.log(response);
            res.send(response);
        }
        else {
            console.log(error)
        }
    });
})