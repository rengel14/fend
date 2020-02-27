const fetch = require("node-fetch")
const dotenv = require('dotenv')
dotenv.config()

/* Empty JS object to act as endpoint for all routes */
projectData = {}

/* Express to run server and routes */
const express = require('express')

/* Start up an instance of app */
const app = express()

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const cors = require('cors')

/* Initialize the main project folder*/
app.use(express.static('dist'))
app.use(cors())

const port = 3000
/* Spin up the server*/
const server = app.listen(port, listening)
function listening(){
    console.log(`running on localhost: ${port}`)
}

const SpaceToPlus = function(string) {
    string = string.match(/(\w+)/g)
    string = string.join('+')
    return string
}

const GetCoords = async (addr) =>{ 
    //base URL for the api
    const baseUrl = 'http://api.geonames.org/geoCodeAddressJSON?username=' + process.env.geonamesID + '&q='
    
    addr = SpaceToPlus(addr)

    const url = baseUrl + addr
    const response = await fetch(url)
    try {
        // Transform into JSON
        const data = await response.json()
        
        const coords = {
            lat: data.address.lat,
            lon: data.address.lng
        }
        //returns a description of current weather conditions at time of posting, the date, and the recorded feelings
        return coords
    }
    catch(error) {
        // appropriately handle the error
        console.log("error", error)
    }
}

const GetWeather = async (coords, date, loc) =>{ 
    //base URL for the api
    const baseUrl = 'https://api.darksky.net/forecast/' + process.env.DarkSkyKey + '/'
    let url = baseUrl + coords.lat + ',' + coords.lon

    //get time since epoch in seconds of midnight GMT of day entered
    const enteredDate = new Date(date).getTime() / 1000
    
    //getting time since epoch in seconds for today at midnight GMT
    let temp = new Date();
    const day = String(temp.getDate()).padStart(2, '0');
    const month = String(temp.getMonth() + 1).padStart(2, '0'); //January is 0!
    const year = temp.getFullYear();
    temp = year + '-' + month + '-' + day;
    const today = new Date(temp).getTime() / 1000

    const week = 604800 //number of seconds in a week
    
    //If trip is a week or more out, then get future data. Otherwise get current daily data
    if(enteredDate > today + week)
    {
        url = url + ',' + enteredDate
    }
    
    const response = await fetch(url)
    try {
        // Transform into JSON
        const data = await response.json()
        const obj = {
            loc: loc,
            high: data.daily.data[0].temperatureHigh,
            low: data.daily.data[0].temperatureLow,
            summary: data.daily.data[0].summary,
            time: (enteredDate - today),
            pic: ""
        }
        return obj
    }
    catch(error) {
        // appropriately handle the error
        console.log("error", error)
    }
}


const GetPic = async (params, obj) =>{ 
    //base URL for the api
    const baseUrl = 'https://pixabay.com/api/?key=' + process.env.PixabayKey + '&safesearch=true&image_type=photo&per_page=3&q='
    
    params = SpaceToPlus(params)

    let url = baseUrl + params
    const response = await fetch(url)
    try {
        // Transform into JSON
        const data = await response.json()
        obj.pic = data.hits[0].webformatURL
        console.log(data)
        return obj
    }
    catch(error) {
        // appropriately handle the error
        console.log("error", error)
    }
}

// GET route. Sends data to client
app.get('/get', function (req, res) {
    res.send(JSON.stringify(projectData))
})

// This responds a POST request for the homepage
app.post('/save', function (req, res) {
    //gets data and from client
    const data = req.body
    //if location string is blank, return a failure
    if(data.loc == "")
    {
        res.send({'status': 'failure'})
        return
    }
    
    //Convert location string into latitude longitude pair
    GetCoords(data.loc)
    .then(function(coords) {
        //get weather info for that location
        GetWeather(coords, data.date, data.loc)
        .then(function(obj) {
            //add a picture url to obj returned from weather function
            GetPic(data.loc, obj)
            .then(function (obj) {
                //store data object in global data variable
                projectData = obj
            })
            .then(function (data) {
                //sends a response back to the client side to show success
                res.send({'status': 'success'})
                console.log(projectData)
            })
        })
    })
})

app.post('/remove', function (req, res) {
    projectData = {}
    res.send({'status': 'success'})
})