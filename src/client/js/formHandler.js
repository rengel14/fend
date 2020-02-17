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
        console.log(res)
        return(res)
    }catch(error) {
        console.log("error", error);
    }
};

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")

    postData('http://localhost:8081/eval', { url: formText })
    .then(function(res) {
        document.getElementById('results').innerHTML = 
        '\n\t<p>Polarity: ' + res.polarity + ' (with ' + Math.round(res.polarity_confidence*100)/100 + ' confidence)</p>' + 
        '\n\t<p>Subjectivity: ' + res.subjectivity + ' (with ' + Math.round(res.subjectivity_confidence*100)/100 + ' confidence)</p>\n'
    })

    // let data = {url: formText}
    // fetch('http://localhost:8080/eval', {body: JSON.stringify(data)})
    // .then(res => res.json())
    // .then(function(res) {
    //     document.getElementById('results').innerHTML = res.message
    // })
}



export { handleSubmit }
