function checkForName(inputText) {
    console.log("::: Running checkForName :::" + inputText);
    const urlRegEx = new RegExp('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})')
    if(inputText.match(urlRegEx))
    {
        return("none")
    }
    else
    {
        console.log("please enter a valid URL")
        return("Invalid URL")
    }
}

export { checkForName }

try{
    module.exports = checkForName
}catch (error) {
    console.log('Jest error');
  }
