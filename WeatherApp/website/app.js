/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) + '.' + d.getDate() + '.' + d.getFullYear();

// Async POST
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
    try {
        await response.json();
    }catch(error) {
        console.log("error", error);
    }
};

// Async GET
const retrieveData = async (url='') =>{ 
    const request = await fetch(url);
    try {
        // Transform into JSON
        const data = await request.json();

        //Update output html fields
        document.getElementById('date').innerText = data[0].date;
        document.getElementById('temp').innerText = data[0].weather;
        document.getElementById('content').innerText = data[0].feelings;

        //reset input html fields
        document.getElementById('zip').value = "";
        document.getElementById('feelings').value = "";
    }
    catch(error) {
        // appropriately handle the error
        console.log("error", error);
    }
};

const GetWeather = async () =>{ 
    //stores the API key I was given upon account creation on the openweather website
    const apikey = 'c599d3eeab09a9a592da504c68a00bee';
    const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?';

    //gets zip code from html input field
    const zip = document.getElementById('zip').value;
    //constructs url to query
    const url = baseUrl + 'APPID=' + apikey + '&zip=' + zip;

    const response = await fetch(url);
    try {
        // Transform into JSON
        const data = await response.json();
        
        //Construct Journal Entry object
        object = {
            'weather': data.list[0].weather[0].description,
            'date': newDate,
            'feelings': document.getElementById('feelings').value
        }
        //returns a description of current weather conditions at time of posting, the date, and the recorded feelings
        return (object);
    }
    catch(error) {
        // appropriately handle the error
        console.log("error", error);
    }
};

//constructs a function to run when the button is clicked
const ButtonFunction = function() {
    GetWeather()
        .then(function(data) {
            postData('/', data);
        })
        .then(function(data) {
            retrieveData('/get');
        });
};

//binds the function to go on click
document.getElementById('generate').addEventListener("click", ButtonFunction);