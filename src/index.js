function formatDate (timestamp){
    let date = new Date (timestamp);
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Fraiday","Saturday"]
    let day = days[date.getDay()];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return `${day}, ${hours}:${minutes}`;
    console.log(timestamp);

}



function displayTemperature(response){
    let dateElement = document.querySelector("#date");
    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind-speed");

    dateElement.innerHTML = formatDate(response.data.time*1000);
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML= Math.round(response.data.temperature.current);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    

}


let apiKey = "8f8ba35f23t75fbc75d7do5424f8040b";
let city = "sydney";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;


axios.get(apiUrl).then(displayTemperature);