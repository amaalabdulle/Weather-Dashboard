// Add your own API key between the ""
var APIKey = "0b4e30e3e56350c47a32b96d1f57a18b";

// Here we are building the URL we need to query the database
// var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=london&appid=" + APIKey;
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
  const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey + "&units=metric";

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    // city name
    const city = $('<h1>').text(data.city.name);
    today.append(city);

    // temperature
    const temp = $('<p>').text('Temperature: ' + data.list[0].main.temp + ' ˚C');
    today.append(temp);

    // wind
    const wind = $('<p>').text('Wind: ' + data.list[0].wind.speed + ' KPH');
    today.append(wind);

    // humidity
    const humidity = $('<p>').text('Humidity: ' + data.list[0].main.humidity + ' %');
    today.append(humidity);

    // forecast section
    // adding temp, wind, and humidity to smaller cards
    
    forecast.empty();

    // Loop through the forecast data starting from index 1 (every 3 hours)
    for (let i = 1; i < data.list.length; i++) {
      const forecastData = data.list[i];

      // Create a card for each forecast
      const cardGroup = $('<div>').addClass('card-group ');
      const card = $('<div>').addClass('card col-md-2 mb-3').css('width', '18rem');;
      const cardBody = $('<div>').addClass('card-body');
      const cardDate = $('<h2>').addClass('card-title');
      const cardText = $('<p>').addClass('card-text');


      // Display time, temperature, wind, and humidity in each card
      const cardTime = $('<p>').text(new Date(forecastData.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      const cardTemp = $('<p>').text('Temperature: ' + forecastData.main.temp + ' ˚C');
      const cardWind = $('<p>').text('Wind: ' + forecastData.wind.speed + ' KPH');
      const cardHumidity = $('<p>').text('Humidity: ' + forecastData.main.humidity + ' %');

    // const cardTime = cardDate.text(new Date(forecastData.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    // const cardTemp = card.text('Temperature: ' + forecastData.main.temp + ' ˚C');
    // const cardWind = card.text('Wind: ' + forecastData.wind.speed + ' KPH');

      // Append elements to the card
      card.append(cardTime, cardText);
      cardBody.append(cardTemp, cardWind, cardHumidity);
      card.append(cardBody);
      cardGroup.append(card);
      

      // Append the card to the forecast container
      forecast.append(card);
    }
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



