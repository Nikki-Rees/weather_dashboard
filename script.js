
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.querySelector(".cityInput");

const pastSearchesContainer = document.querySelector(".pastSearchContainer");
let pastSearchList = document.querySelector("#pastSearchList");



$(".pastSearchContainer").on('click', "button", function (event) {
    event.preventDefault();
    searchCity($(this).text());
})


let cities = JSON.parse(localStorage.getItem("cities"));
if (!cities) {
    cities = [];
};

renderCities();
if (cities.length > 0) {

    searchCity(cities[cities.length - 1]);

}

// create a search function to retrieve input from search bar on button click

function renderCities() {

    $(".pastSearchContainer").empty();

    for (let i = 0; i < cities.length; i++) {

        let pastCitySearches = $("<button>").text(cities[i]);
        $(".pastSearchContainer").append(pastCitySearches);

    }

}

searchBtn.addEventListener('click', function (event) {

    let cityName = $('.cityInput').val().trim();

    cities.push(cityName);
    renderCities();

    localStorage.setItem("cities", JSON.stringify(cities));
    if (cityName === "") {
        return;
    }



    event.preventDefault();

    searchCity(cityName);
})

function searchCity(cityName) {

    const apiKey = "&appid=a6734ec95af468f519df63f9df4bfd44";
    const unitsMetric = "&units=metric";


    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + unitsMetric + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {

        let lat = ("lat=" + response.coord.lat);
        let lon = ("&lon=" + response.coord.lon);
        let date = ("&dt=" + response.dt);


        //get legible date format, put in to a function??
        const milliseconds = (response.dt) * 1000;
        const dateObject = new Date(milliseconds);
        const dateFormat = dateObject.toLocaleString()

        $("#cityname").text(response.name + " " + dateFormat);


        function searchWeather() {
            const queryURL = "https://api.openweathermap.org/data/2.5/onecall?" + lat + lon + date + unitsMetric + "&exclude=minutely,hourly" + apiKey;
            $.ajax({
                url: queryURL,
                method: "GET"

            }).then(function (response) {
                console.log(response);

                $("#windSpeed").text("Wind speed: " + response.current.wind_speed + 'MPH');
                $("#humidity").text("Humidity: " + response.current.humidity + "%");
                $("#temperature").text("Temperature: " + response.current.temp + '°C');
                $("#uvIndex").text("UV Index: " + response.current.uvi);

                let iconcode = response.current.weather[0].icon;
                let iconurl = "http://openweathermap.org/img/wn/" + iconcode + ".png";
                $('#wicon').attr('src', iconurl);
                // let iconCode = response.weather.icon;
                // $("#icon").append('<img src= "http://openweathermap.org/img/wn/' + iconCode + '@2x.png">');

                for (let i = 0; i < 5; i++) {

                    const forMilliseconds = (response.daily[i].dt) * 1000;
                    const forDateObject = new Date(forMilliseconds);
                    const forDateFormat = forDateObject.toLocaleString();

                    let forecasticoncode = (response.daily[i].weather[0].icon);
                    let forecasticonurl = "http://openweathermap.org/img/wn/" + forecasticoncode + ".png";

                    let currentCard = "#day" + (i + 1);


                    $(currentCard + " .forecastDate").text(forDateFormat);
                    $(currentCard + " .forecastHumidity").text("Humidity: " + response.daily[i].humidity + "%");
                    $(currentCard + " .forecastTemperature").text("Temperature: " + response.daily[i].temp.day + "°C");
                    $(currentCard + " .forecastIcon").attr('src', forecasticonurl);

                }

            })

        }

        searchWeather();

    })

}