/*calculate the date*/
function formateDate(datestamp) {
  let date = new Date(datestamp);
  let daysWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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
    "Dec",
  ];
  let dayWeek = daysWeek[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let month = months[date.getMonth()];
  let numberDate = date.getDate();
  return `${dayWeek} ${hours}:${minutes}, ${month} ${numberDate}`;
}
function formateSunrise(sunriseStamp) {
  let date = new Date(sunriseStamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formateSunset(sunsetStamp) {
  let date = new Date(sunsetStamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(`#forecast`);
  let forecastHTML = `<div class = "row justify-content-between px-5">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-auto">
          <p class="weekday">${formatDay(forecastDay.dt)}</p>
          <p class="emoji">        
            <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="45"
             />       
           </p>   
           <p class="temp">${Math.round(forecastDay.temp.day)}</p>   
             <span id="celsius-fahrenheit">°C</span> 
         </div>                
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "be2b1d571d2242daa7cb5a3c859e71bb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  console.log(response.data.main.temp);
  celsiusTempGlob = response.data.main.temp;

  document.querySelector(`#bigTemp`).innerHTML = Math.round(celsiusTempGlob);
  document.querySelector(`#min`).innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector(`#max`).innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector(`#descriptonId`).innerHTML =
    response.data.weather[0].description;
  document.querySelector("li.name").innerHTML =
    response.data.name.toUpperCase();
  document.querySelector(`#humidity`).innerHTML = response.data.main.humidity;
  document.querySelector(`#windSpeed`).innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(`.time`).innerHTML = formateDate(
    response.data.dt * 1000
  );
  document
    .querySelector(`#icon`)
    .setAttribute(
      `src`,
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector(`#icon`)
    .setAttribute(`alt`, response.data.weather[0].description);

  getForecast(response.data.coord);
  document.querySelector(`#sunrise`).innerHTML = formateSunrise(
    response.data.sys.sunrise * 1000
  );
  document.querySelector(`#sunset`).innerHTML = formateSunset(
    response.data.sys.sunset * 1000
  );
  let celsiusBold = document.querySelector("#celsius");
  celsiusBold.innerHTML = "<strong color='black'>°C</strong>";
  let fahrenheitSmall = document.querySelector("#fahrenheit");
  fahrenheitSmall.innerHTML = "| °F";
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelectorAll(".temp");
  for (i = 0; i < temperatureElement.length; i++) {
    temperatureElement[i].innerHTML = Math.round(
      (celsiusTempGlob * 9) / 5 + 32
    );
  }
  let conversationToF = document.querySelectorAll("#celsius-fahrenheit");
  for (i = 0; i < conversationToF.length; i++) {
    conversationToF[i].innerHTML = "°F";
  }

  let fahrenheitBold = document.querySelector("#fahrenheit");
  fahrenheitBold.innerHTML = "<strong color='black'>°F</strong>";
  let celsiusSmall = document.querySelector("#celsius");
  celsiusSmall.innerHTML = "°C |";
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelectorAll(".temp");
  for (i = 0; i < temperatureElement.length; i++) {
    temperatureElement[i].innerHTML = Math.round(celsiusTempGlob);
  }
  let conversationToC = document.querySelectorAll("#celsius-fahrenheit");
  for (i = 0; i < conversationToC.length; i++) {
    conversationToC[i].innerHTML = "°C ";
  }
  let celsiusBold = document.querySelector("#celsius");
  celsiusBold.innerHTML = "<strong color='black'>°C</strong>";
  let fahrenheitSmall = document.querySelector("#fahrenheit");
  fahrenheitSmall.innerHTML = "| °F";
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

let celsiusTempGlob = null;

/* when a user searches for a city (example: New York), 
it should display the name of the city on the result page and 
the current temperature of the city*/

function search(city) {
  let key = "be2b1d571d2242daa7cb5a3c859e71bb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showCityUrl(event) {
  event.preventDefault();
  let city = document.querySelector(`#search-city`).value.toLowerCase();
  search(city);
}

let tempChange = document.querySelector(`#search-panel`);
tempChange.addEventListener(`submit`, showCityUrl);

// change data for current location
function searchMyLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let yourApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=be2b1d571d2242daa7cb5a3c859e71bb&units=metric`;
  axios.get(yourApiUrl).then(showTemp);
}

function showHomeTemp() {
  navigator.geolocation.getCurrentPosition(searchMyLocation);
}
let button = document.querySelector(`#home`);
button.addEventListener(`click`, showHomeTemp);

search("New York");
