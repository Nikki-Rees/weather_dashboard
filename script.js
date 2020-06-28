

// Weather API key  a6734ec95af468f519df63f9df4bfd44
// Install Moment JS

// create a search function to retrieve input from search bar on button click

// create a call to local storage to save cities searched in to side bar container

//write ajax query to pull data from Weather API

//const queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=currentappid=2b0c71a2c585343f3141a53f97ed6b36"

let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=a6734ec95af468f519df63f9df4bfd44"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
    console.log(response.name);
})

// Insert City name in to H2 tags within the main container and today's date

// append the current days search data in to the main container
// change the css on the UV index if falling in to high range (change to red )

// append the future forecast in to each of the forecast boxes, date, temperature, humidity and logo 