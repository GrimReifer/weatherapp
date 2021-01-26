let now = new Date();

let h2 = document.querySelector("h2");

let date = now.getDate();
let hours = now.getHours();

let minutes = now.getMinutes();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];

h2.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}, ${year}`;

function updateCity(event) {
  event.preventDefault();
  let displayCity = document.querySelector("#userLocation");
  let cityFormSearch = document.querySelector("#cityFormSearch");
  displayCity.innerHTML = cityFormSearch.value;

  searchCity(cityFormSearch.value);
}
function searchCity(city) {
  let apiKey = "64b2ed4f88b5ae0dc979c8e172053029";
  let units = "metric";
  let apiLink = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiLink}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}
searchCity("London");
//function convertToFahrenheit(event) {
//event.preventDefault();
//let temperatureF = document.querySelector("#temperature");
//temperatureF.innerHTML = 66;}

//function convertToCelsius(event) {
//event.preventDefault();
//let temperatureC = document.querySelector("#temperature");
//temperatureC.innerHTML = 19;}
let searchcity = document.querySelector("#cityForm");
searchcity.addEventListener("submit", updateCity);

//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", convertToFahrenheit);

//let celsiusLink = document.querySelector("#celsius-link");
//celsiusLink.addEventListener("click", convertToCelsius);

//let apiKey = "64b2ed4f88b5ae0dc979c8e172053029";
//let searchCity = "london";
//let units = "metric";
//let apiLink = "https://api.openweathermap.org/data/2.5/weather";
//let apiUrl = `${apiLink}?q=${searchCity}&appid=${apiKey}&units=${units}`;

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let cityInput = document.querySelector("#cityFormSearch");
  let searchCity = document.querySelector("#cityFormSearch").value;
  let changeCity = searchCity;
  cityInput.innerHTML = changeCity;

  temperatureElement.innerHTML = `${temperature}`;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "64b2ed4f88b5ae0dc979c8e172053029";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemp);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("submit", currentLocation);