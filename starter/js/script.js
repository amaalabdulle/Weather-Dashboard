var APIKey = "0b4e30e3e56350c47a32b96d1f57a18b";
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=london&appid=" + APIKey;


const form = $('#search-form');
const formInput = $('.form-input');
const main = $('#today');

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
      // main.text(data.city.name);
      // console.log(data.city.name);

      // date

      // temperature

    

    });


})

// search history




