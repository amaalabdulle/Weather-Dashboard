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

var searchedCities = [];

form.on('submit', function(event) {
  event.preventDefault();

  const cityName = formInput.val();

    today.empty();
    forecast.empty();

    // const cityName = formInput.val();
    const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey + "&units=metric";


    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // city name & icon
            const weatherIconUrl = 'https://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png';
            const weatherIcon = $('<img>').attr('src', weatherIconUrl).addClass('weather-icon');
            const city = $('<h1>').text(data.city.name);
            city.append(weatherIcon);
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

            // adding the 5 day 3 hour forecast to the forecast section
            
            forecast.empty();

            // Loop through the forecast data starting from index 1 (every 3 hours)
            for (let i = 0; i < data.list.length; i+=8) {
                const forecastData = data.list[i];

                // Create a card for each forecast
                const cardGroup = $('<div>').addClass('card-group ');
                const card = $('<div>').addClass('card col-md-2 mb-3');
                const cardBody = $('<div>').addClass('card-body');
                const cardText = $('<p>').addClass('card-text');
                const iconURL = 'http://openweathermap.org/img/w/' + forecastData.weather[0].icon + '.png';

                // Display time, temperature, wind, and humidity in each card
                const cardDate = $('<h4>').addClass('card-title').text(forecastData.dt_txt);
                const icon = $('<img>').attr('src', iconURL).addClass('weather-icon');
                const cardTemp = $('<p>').text('Temp: ' + forecastData.main.temp + ' ˚C');
                const cardWind = $('<p>').text('Wind: ' + forecastData.wind.speed + ' KPH');
                const cardHumidity = $('<p>').text('Humidity: ' + forecastData.main.humidity + ' %');

                // Append elements to the card
                card.append(cardDate, cardText);
                cardBody.append(icon, cardTemp, cardWind, cardHumidity);
                card.append(cardBody);
                cardGroup.append(card);
                
                // Append the card to the forecast container
                forecast.append(card);

                // making the previous search inputs as buttons
                if (cityName.trim() !== '' && !searchedCities.includes(cityName)) {
                    const cityButton = $('<button>').text(cityName);
                    history.append(cityButton);
                    searchedCities.push(cityName);
                    search.val(""); // clears the search bar

                    // making the history buttons clickable
                    cityButton.on('click', function () {
                        const clickedCity = $(this).text();
                        formInput.val(clickedCity);
            
                        form.submit(); // resubmits the form once the cityButton is clicked
                    })
                }

                // Store the searched cities in local storage
                localStorage.setItem('searchedCities', JSON.stringify(searchedCities));
                // // retreiving the local storage
                $(document).ready(function () {
                    const storedCities = localStorage.getItem('searchedCities');
                    if (storedCities) {
                        searchedCities = JSON.parse(storedCities);
                    }
                });
            }
        });
});