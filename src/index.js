function formatDate (timestamp){
    let date = new Date (timestamp);
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[date.getDay()];
    let hours = date.getHours();
    if (hours<10){
        hours= `0${hours}`
    }
    let minutes = date.getMinutes();
    if (minutes<10){
        minutes= `0${minutes}`
    }
    return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response){
    let dateElement = document.querySelector("#date");
    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let feelsLikeElement = document.querySelector("#feels-temperature");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind-speed");
    let iconElement = document.querySelector("#icon");

    dateElement.innerHTML = formatDate(response.data.time*1000);
    cityElement.innerHTML = response.data.city;
    
    celsiusTemperature = response.data.temperature.current;
    celsiusFeelsLike = response.data.temperature.feels_like;

    if (Math.round(celsiusFeelsLike) > Math.round(celsiusTemperature)) {
    feelsLikeElement.style.color = "rgb(221, 73, 108)";
    } else if (Math.round(celsiusFeelsLike) < Math.round(celsiusTemperature)) {
    feelsLikeElement.style.color = "#0069d9";
    } else {
    feelsLikeElement.style.color = "#3b3c3d";
    }

    temperatureElement.innerHTML= Math.round(celsiusTemperature);
    feelsLikeElement.innerHTML = Math.round(celsiusFeelsLike);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    iconElement.setAttribute ("alt", response.data.condition.description);

    getForecast(
        response.data.coordinates.latitude,
        response.data.coordinates.longitude
    );
}

function getForecast(lat,lon){
    let apiKey = "8f8ba35f23t75fbc75d7do5424f8040b";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}`;
    axios.get(apiUrl).then(displayForecast);
}

function search (city){
    let apiKey = "8f8ba35f23t75fbc75d7do5424f8040b";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(displayTemperature);

}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
   search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);



function showCelsiusTemperature (event){
    event.preventDefault();
    
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML= Math.round(celsiusTemperature);

     let feelsLikeElement = document.querySelector("#feels-temperature");
     feelsLikeElement.innerHTML = Math.round(celsiusFeelsLike);
}

function displayForecast(response){

    forecastData = response.data.daily;
    let forecast = response.data.daily;

    let forecastHTML = "";

    forecast.forEach(function(day, index){
        if (index < 6){
            forecastHTML = forecastHTML + 
            `
            <div>
             <div>${formatDay(day.time)}</div>
             <img src="${day.condition.icon_url}" alt="">
             <div>
              <span class = "forecast-max">${Math.round(day.temperature.maximum)}°</span>
              <span class = "forecast-min">${Math.round(day.temperature.minimum)}°</span>
             </div>
            </div>

            `;
        }

    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
}

let celsiusTemperature = null;
let celsiusFeelLike = null;
let forecastData = null;




let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);




search("Stockholm");