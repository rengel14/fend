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

const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');

app.use(express.static('dist'))
app.use(cors());

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.post('/eval', function (req, res) {
    console.log("hit post function")
    // console.log(req.body.url)
    textapi.sentiment({
        'url': req.body.url
    }, function(error, response) {
        if (error === null) {
            console.log(response);
            res.send(JSON.stringify(response));
        }
        else {
            console.log(error)
        }
    });
})