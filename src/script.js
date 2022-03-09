//Week4 Challange1
function showingTime(date) {
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];

  return `${day} ${hour}:${minute}`;
}

let now = new Date();
let time = document.querySelector("#actualdate");
time.innerHTML = showingTime();

//PlusWeek5
function getForecast(coordinates) {
  let apiKey = "996fa6b115ad9d3c165a1908de494417";
  let latitude = coordinates.lat;
  let longitude = coordinates.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
function showTemperature(answer) {
  let city = document.querySelector("#shownCity");
  let humidity = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");
  let temperature = Math.round(answer.data.main.temp);
  let temperatureChanges = document.querySelector("#temperaturechanges");
  let temperatureElement = document.querySelector("#temperature");
  let weatherdescription = document.querySelector("#weatherdescription");
  let wind = document.querySelector("#wind");

  celsiusTemperature = Math.round(answer.data.main.temp);
  city.innerHTML = answer.data.name;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${answer.data.weather[0].icon}@2x.png`
  );
  temperatureElement.innerHTML = `${temperature}`;
  humidity.innerHTML = answer.data.main.humidity;
  temperatureChanges.innerHTML =
    Math.round(answer.data.main.temp_min) +
    " / " +
    Math.round(answer.data.main.temp_max);
  wind.innerHTML = Math.round(answer.data.wind.speed);
  weatherdescription.innerHTML = answer.data.weather[0].main + " in";

  getForecast(answer.data.coord);
}

function search(city) {
  let apiKey = "996fa6b115ad9d3c165a1908de494417";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search");

  let city = searchInput.value;
  search(city);
}

function showPosition(position) {
  let apiKey = "996fa6b115ad9d3c165a1908de494417";
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function findLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentPositionButton = document.querySelector("#city4");
currentPositionButton.addEventListener("click", findLocation);

let form = document.querySelector("#searchline");
form.addEventListener("submit", handleSubmit);

search("California");

// Buttonfunction
function showweatherMadrid() {
  let apiKey = "996fa6b115ad9d3c165a1908de494417";
  let units = "metric";
  let city = "Madrid";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
let madridButton = document.querySelector("#city1");
madridButton.addEventListener("click", showweatherMadrid);

function showweatherParis() {
  let apiKey = "996fa6b115ad9d3c165a1908de494417";
  let units = "metric";
  let city = "Paris";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
let parisButton = document.querySelector("#city2");
parisButton.addEventListener("click", showweatherParis);

function showweatherRome() {
  let apiKey = "996fa6b115ad9d3c165a1908de494417";
  let units = "metric";
  let city = "Rome";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
let romeButton = document.querySelector("#city3");
romeButton.addEventListener("click", showweatherRome);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
            <div class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" width="36"  >
         <div class="weather-forecast-temperatures">
           <span class="weather-forecast-temperature-max">${Math.round(
             forecastDay.temp.max
           )}° </span>
           <span class="weather-forecast-temperature-min">${Math.round(
             forecastDay.temp.min
           )}°</span>
         </div>
          </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
