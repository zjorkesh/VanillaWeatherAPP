function formatDate (timestamp){
    let date = new Date (timestamp);
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Fraiday","Saturday"];
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
    temperatureElement.innerHTML= Math.round(response.data.temperature.current);
    feelsLikeElement.innerHTML = Math.round(response.data.temperature.feels_like);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    iconElement.setAttribute ("alt", response.data.condition.description);
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

search("Stockholm");