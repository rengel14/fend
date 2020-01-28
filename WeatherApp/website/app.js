/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Async POST
const postData = async ( url = '', data = {})=>{
    console.log(data);
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        return newData;
    }catch(error) {
        console.log("error", error);
    }
};

// Async GET
const retrieveData = async (url='') =>{ 
    const request = await fetch(url);
    try {
        // Transform into JSON
        const allData = await request.json()
    }
    catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
};

// TODO-Chain your async functions to post an animal then GET the resulting data
function postGet(){
    postData('/animal', {fav:'lion'})
      .then(function(data){
        retrieveData('/all')
    })
}
// TODO-Call the chained function
postGet()
