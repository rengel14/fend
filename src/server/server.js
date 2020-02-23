/* Empty JS object to act as endpoint for all routes */
projectData = [];

/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('dist'));

const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);
 function listening(){
    console.log(`running on localhost: ${port}`);
  };

// GET route. Sends data array to client
app.get('/get', function (req, res) {
  res.send(JSON.stringify(projectData));
})

// This responds a POST request for the homepage
app.post('/', function (req, res) {
  //gets data and add it to beginning of array object
  const data = req.body;
  projectData.unshift(data);
  //sends a response back to the client side to show success
  res.send({'message': 'recieved'});
})