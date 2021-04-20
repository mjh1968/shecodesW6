document.getElementById("typeC").style.fontSize="20px";
document.getElementById("typeC").style.color = "rgb(92, 225, 230)";
link = document.getElementById('typeC');
link.setAttribute('class', 'disabled');

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
let data = document.querySelector("#dataDes");
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
  let valueDescription=response.data.weather[0].description;
  // let valuerealFeel=Math.round((response.data.main.feels_like));
  let icon=document.querySelector("img.icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  let nameCity=document.querySelector("#cityS");
  nameCity.innerHTML=valueCity ;
  let humidity=document.querySelector("#humidity")
  humidity.innerHTML="Humidity: "+ valueHum + " %";
  let wind=document.querySelector("#wind")
  wind.innerHTML="Wind: "+ valueWind + " Km/h";
  let temp = document.querySelector("#temperature");
  temp.innerHTML = valueTemp ;
  let other=Math.round((response.data.main.feels_like));
  let tempDes=document.querySelector("#tempDes");
  tempDes.innerHTML=valueDescription;
  // feelsLike.innerHTML="RealFeel: "+other+" ºC";
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

function convert(event) {
  event.preventDefault();
  let displayT = document.querySelector("span#temperature.temp");
   
  if (event.target.innerHTML === "ºC") {
  console.log("1   "+displayT.innerHTML);
  document.getElementById("typeC").style.fontSize="20px";
  document.getElementById("typeC").style.color = "rgb(92, 225, 230)";
  document.getElementById("typeF").style.fontSize="12px";
  document.getElementById("typeF").style.color = "rgb(113, 113, 113)";
  link = document.getElementById('typeC');
  link.setAttribute('class', 'disabled');
  link=document.querySelector("a#typeF").classList
    link.remove("disabled")

  displayT.innerHTML = Math.round((displayT.innerHTML - 32) / 1.8);  
  } else {
    console.log("2   "+displayT.innerHTML);
    document.getElementById("typeF").style.fontSize="20px";
    document.getElementById("typeF").style.color = "rgb(92, 225, 230)";
    document.getElementById("typeC").style.fontSize="12px";
    document.getElementById("typeC").style.color = "rgb(113, 113, 113)";
    
    link = document.getElementById('typeF');
    link.setAttribute('class', 'disabled'); 
    
    link=document.querySelector("a#typeC").classList
    link.remove("disabled")

 
    displayT.innerHTML = Math.round(displayT.innerHTML * 1.8 + 32);
  }
}

let elementF = document.querySelector("#typeF");
elementF.addEventListener("click", convert);
let elementC = document.querySelector("#typeC");
elementC.addEventListener("click", convert);
let searchCity = document.querySelector("#formSearch");
searchCity.addEventListener("submit", search);


 let currentL=document.querySelector("#curent");
//  getCurrentLocalWeather()
// currentL.addEventListener("click",getCurrentLocalWeather);
