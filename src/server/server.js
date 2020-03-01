const fetch = require("node-fetch")
const dotenv = require('dotenv')
dotenv.config()

/* Empty JS object to act as endpoint for all routes */
let projectData = {}

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

const GetWeather = async (coords, date) =>{ 
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
            loc: "",
            high: data.daily.data[0].temperatureHigh,
            low: data.daily.data[0].temperatureLow,
            summary: data.daily.data[0].summary,
            time: Math.floor(Math.abs(enteredDate - today) / 86400),
            pic: ""
        }
        return obj
    }
    catch(error) {
        // appropriately handle the error
        console.log("error", error)
    }
}


const GetPic = async (params) =>{ 
    //base URL for the api
    const baseUrl = 'https://pixabay.com/api/?key=' + process.env.PixabayKey + '&safesearch=true&image_type=photo&per_page=3&q='
    
    params = SpaceToPlus(params)

    let url = baseUrl + params

    const response = await fetch(url)
    try {
        // Transform into JSON
        const data = await response.json()
        const pic = data.hits[0].webformatURL
        return pic
    }
    catch(error) {
        // appropriately handle the error
        console.log("error", error)
        return "/images/notFound.jpg"
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
    
    const coordPromise = GetCoords(data.loc)
    const weatherPromise = coordPromise
        .then((coords) => GetWeather(coords, data.date))

    const picPromise = GetPic(data.loc)

    Promise.all([weatherPromise, picPromise])
        .then((values) => {
            let obj = values[0]
            const picUrl = values[1]
            obj.loc = data.loc
            obj.pic = picUrl
            projectData = obj
            res.send({'status': 'success'})
            console.log(obj)
        })
})

app.post('/remove', function (req, res) {
    projectData = {}
    res.send({'status': 'success'})
})

try{
    module.exports = GetWeather
}catch (error) {
    console.log('Jest error');
}