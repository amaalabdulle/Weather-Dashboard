// Add your own API key between the ""
var APIKey = "0b4e30e3e56350c47a32b96d1f57a18b";

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=london&appid=" + APIKey;

const form = $('#search-form');
const formInput = $('.form-input');
const today = $('#today');
const search = $('#search-button');
const citySearch = $('#search-input');
const history = $('#history');
const forecast = $('#forecast');


form.on('submit', function(event) {
  event.preventDefault();

  const cityName = formInput.val();
  const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + ",uk&appid=" + APIKey + "&units=metric";

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    // city name
    const city = $('<h1>').text(data.name);
    today.append(city);

    // temperature
    const temp = $('<p>').text('Temperature: ' + data.main.temp + ' ˚C');
    today.append(temp);

    // wind
    const wind = $('<p>').text('Wind: ' + data.wind.speed + ' KPH');
    today.append(wind);

    // humidity
    const humidity = $('<p>').text('Humidity: ' + data.main.humidity + ' %');
    today.append(humidity);

    // forecast section

    // adding temp, wind, and humidity to smaller cards
    
    forecast.append(temp);
    

    




    });
});

// making the search history as buttons
// var searchedCities = [];

// search.on("click", function(event) {
//     event.preventDefault();
//     const cityName = citySearch.val(); 
    
//     if (cityName.trim() !== '' && !searchedCities.includes(cityName)) {
//     const cityButton = $('<button>').text(cityName);
//     history.append(cityButton);
//     searchedCities.push(cityName);
//     search.val(""); // clears the search bar
//     }
// });

// adding the 5 day 3 hour forecast to the forecast section



