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
        const res = await response.json();
        return(res)
    }catch(error) {
        console.log("error", error);
    }
};

function handleSubmit(event) {
    event.preventDefault()

    document.getElementById('results').innerHTML = "Running... "

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    const error = Client.checkForName(formText)


    if(error == "none"){
        document.getElementById('name').innerText = ""
        postData('http://localhost:8081/eval', { url: formText })
        .then(function(res) {
            document.getElementById('results').innerHTML = 
            '\n\t<p>Polarity: ' + res.polarity + ' (with ' + Math.round(res.polarity_confidence*100)/100 + ' confidence)</p>' + 
            '\n\t<p>Subjectivity: ' + res.subjectivity + ' (with ' + Math.round(res.subjectivity_confidence*100)/100 + ' confidence)</p>\n'
        })
    }
    else
    {
        console.log(error)
        document.getElementById('results').innerHTML = "Error: " + error
    }
}

export { handleSubmit }
