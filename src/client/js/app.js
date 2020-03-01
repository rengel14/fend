// Async POST
const PostData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    })
    try {
        await response.json()
    }catch(error) {
        console.log("error", error)
    }
}

// Async GET
const RetrieveData = async (url='') =>{ 
    const request = await fetch(url)
    try {
        // Transform into JSON
        const data = await request.json()
        //if data is not empty
        if(Object.getOwnPropertyNames(data).length !== 0)
        {
            const loc = data.loc

            //Update output html fields
            document.getElementById('locProj').innerText = loc + " is " + data.time + " days away."
            document.getElementById('weatherProj').innerText = "Typical weather for then is:\nHigh - " + data.high + ", Low - " + data.low + "\n" + data.summary
            document.getElementById('loc').value = loc
            document.getElementById('locPic').src = data.pic
        }
    }
    catch(error) {
        // appropriately handle the error
        console.log("error", error)
    }
}

//constructs a function to run when the button is clicked
const SaveTrip = function() {
    PostData('http://localhost:3000/save', 
        {loc: document.getElementById('loc').value,
        date: document.getElementById('date').value})
    .then(function(data) {
        RetrieveData('http://localhost:3000/get')
    })
    console.log(document.getElementById('date').value)
}

const RemoveTrip = function() {
    //calls server to remove stored data
    PostData('http://localhost:3000/remove')

    //clears text
    document.getElementById('locProj').innerText = ""
    document.getElementById('weatherProj').innerText = ""
    document.getElementById('locPic').src = "/images/placeholder.jpg"
}

export { RetrieveData }
export { RemoveTrip }
export { SaveTrip }

try{
    module.exports = PostData
}catch (error) {
    console.log('Jest error');
  }