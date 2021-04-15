let now = new Date();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Tursday",
  "Friday",
  "Saturday"
];
let dayW = weekDays[now.getDay()];
let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = "0" + minutes;
}
let hour = now.getHours();
let data = document.querySelector("p#dataDes");
data.innerHTML = `${dayW}  ${hour}:${minutes}`;


function search(event) {
  event.preventDefault();
  let cityName = document.querySelector("#cityS");
  let cityInput = document.querySelector("#citySearch");
  let city = cityInput.value;
  cityName.innerHTML=city;
  let apikey = "1c74a2370abc5bae9c5f1859677931c0";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  axios.get(url).then(showWeather);
}


function showWeather(response) {
  let valueTemp = Math.round(response.data.main.temp);
  let valueWind =Math.round(response.data.wind.speed * 3.6);
  let valueHum = Math.round(response.data.main.humidity);
  let valueCity = (response.data.name);
  let nameCity=document.querySelector("#cityS");
  nameCity.innerHTML=valueCity ;
  
  let humidity=document.querySelector("#humidity")
  humidity.innerHTML="Humidity: "+ valueHum + " %";
  let wind=document.querySelector("#wind")
  wind.innerHTML="Wind: "+ valueWind + " Km/h";
  let temp = document.querySelector("#temperature");
  temp.innerHTML = valueTemp +"ºC";
  let other=Math.round((response.data.main.feels_like));
  let feelsLike=document.querySelector("#tempDes");
  feelsLike.innerHTML="Feels like: "+other+" ºC";
  let cityInput = document.querySelector("#citySearch");
  cityInput.value=""
}

function getLocalWeather(param1, param2) {
  let apikey = "1c74a2370abc5bae9c5f1859677931c0";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${param1}&lon=${param2}&appid=${apikey}&units=metric`;
  axios.get(url).then(showWeather);
}

function showLocal(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  console.log("Lat: " + lat + " Long: " + long);
  getLocalWeather(lat, long);
}

function getCurrentLocalWeather() {
  navigator.geolocation.getCurrentPosition(showLocal);
}

let searchCity = document.querySelector("#formSearch");
searchCity.addEventListener("submit", search);

let currentL=document.querySelector("#curent");
currentL.addEventListener("click",getCurrentLocalWeather);
