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

function getweekday(unixTime){
  let a = new Date(unixTime*1000);
  let days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  let dayOfWeek = days[a.getDay()];
  return(dayOfWeek);
}

function showForecast(response)
{
  let valueForecast=response.data.daily;
  let forecastElement=document.querySelector("#forecast");
  let forecastContent="";
  forecastContent=`<div class="row">`
  var idMax="";
  var idMin="";
  valueForecast.forEach(function (valueForecastDay, index) {
    if (index>0){
    idMax=` id="wftM${index}"`;
    idMin=` id="wftm${index}"`;
    forecastContent =
      forecastContent +
      `<div class="col colForecast">
                <div class="weather-forecast-date">${getweekday(valueForecastDay.dt)}</div>
                <img
                   src="http://openweathermap.org/img/wn/${valueForecastDay.weather[0].icon}@2x.png"
                  alt=" ${valueForecastDay.weather[0].description} "
                  width="42"
                />
             <div class="weather-forecast-temp"> 
                <span class="weather-forecast-temp-max"${idMax}>
                ${Math.round(valueForecastDay.temp.max)}º
              </span> 
              <span class="weather-forecast-temp-min"${idMin}>
                ${Math.round(valueForecastDay.temp.min)}º
              </span> 
            </div>
          </div>
     `;
  }});
  forecastContent = forecastContent + `</div>`;
  forecastElement.innerHTML = forecastContent;
 }

function getForecast(coordinates){
  console.log(coordinates);
  let apikey = "1c74a2370abc5bae9c5f1859677931c0";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=metric`;
  axios.get(url).then(showForecast);
}

function showWeather(response) {
  let valueTemp = Math.round(response.data.main.temp);
  let valueWind =Math.round(response.data.wind.speed * 3.6);
  let valueHum = Math.round(response.data.main.humidity);
  let valueCity = (response.data.name);
  let valueDescription=response.data.weather[0].description;
  let valuerealFeel=Math.round((response.data.main.feels_like));
  let icon=document.querySelector("img.icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  let nameCity=document.querySelector("#cityS");
  nameCity.innerHTML=valueCity ;
  let feelsLike=document.querySelector("#realFeel")
  feelsLike.innerHTML="RealFeel: "+valuerealFeel+" ºC";
  let humidity=document.querySelector("#humidity")
  humidity.innerHTML="Humidity: "+ valueHum + " %";
  let wind=document.querySelector("#valueWind");
  wind.innerHTML=valueWind;
  let metricsWind=document.querySelector("#valueWindMetrics")
  metricsWind.innerHTML=" Km/h"
  let temp = document.querySelector("#temperature");
  temp.innerHTML = valueTemp ;
  let other=Math.round((response.data.main.feels_like));
  let tempDes=document.querySelector("#tempDes");
  tempDes.innerHTML=valueDescription;
  let cityInput = document.querySelector("#citySearch");
  cityInput.value=""
  let latlong=response.data.coord;
  getForecast(latlong);
}

function getLocalWeather(param1, param2) {
  let apikey = "1c74a2370abc5bae9c5f1859677931c0";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${param1}&lon=${param2}&appid=${apikey}&units=metric`;
  axios.get(url).then(showWeather);
}



function showLocal(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  getLocalWeather(lat, long);
}
function getCurrentLocalWeather() {
  navigator.geolocation.getCurrentPosition(showLocal);
}

function convertForecast(type){
  var ntimes;
  var elementDayForecast;
  var elementtemp;
  var temp;
  var tempConv;
  
  if (type === "ºC") { 
    for (ntimes = 1; ntimes < 8; ntimes++) {
      elementDayForecast="span#wftM"+ntimes;
      elementtemp=document.querySelector(elementDayForecast);
      temp=elementtemp.innerHTML
      temp=temp.replace("º","");
      tempConv = Math.round((temp - 32) / 1.8);
      elementtemp.innerHTML=tempConv+"º";

      elementDayForecast="span#wftm"+ntimes;
      elementtemp=document.querySelector(elementDayForecast);
      temp=elementtemp.innerHTML
      temp=temp.replace("º","");
      tempConv = Math.round((temp - 32) / 1.8);
      elementtemp.innerHTML=tempConv+"º";

    };

  } else {
    for (ntimes = 1; ntimes < 8; ntimes++) {
      elementDayForecast="span#wftM"+ntimes;
      elementtemp=document.querySelector(elementDayForecast);
      temp=elementtemp.innerHTML
      temp=temp.replace("º","");
      tempConv = Math.round(temp * 1.8 + 32);
      elementtemp.innerHTML=tempConv+"º";

      elementDayForecast="span#wftm"+ntimes;
      elementtemp=document.querySelector(elementDayForecast);
      temp=elementtemp.innerHTML
      temp=temp.replace("º","");
      tempConv = Math.round(temp * 1.8 + 32);
      elementtemp.innerHTML=tempConv+"º";
    };
  }
}

function convert(event) {
  event.preventDefault();
 
  let displayT = document.querySelector("span#temperature.temp");
  let displayW = document.querySelector("#valueWind");
  let metricsWind=document.querySelector("#valueWindMetrics")
  let displayRF=document.querySelector("#realFeel");

  if (event.target.innerHTML === "ºC") { 
    document.getElementById("typeC").style.fontSize="25px";
    document.getElementById("typeC").style.color = "rgb(92, 225, 230)";
    document.getElementById("typeF").style.fontSize="12px";
    document.getElementById("typeF").style.color = "rgb(113, 113, 113)";
    link = document.getElementById('typeC');
    link.setAttribute('class', 'disabled');
    link=document.querySelector("a#typeF").classList
    link.remove("disabled")
    displayT.innerHTML = Math.round((displayT.innerHTML - 32) / 1.8);  
    displayW.innerHTML = Math.round((displayW.innerHTML / 0.621371192));
    displayRF.innerHTML=displayRF.innerHTML.replace("ºF","");
    displayRF.innerHTML=displayRF.innerHTML.replace("RealFeel:","");
    displayRF.innerHTML="RealFeel: "+ Math.round((displayRF.innerHTML - 32) / 1.8)+" ºC";  
    metricsWind.innerHTML=" Km/h";

  } else {
    document.getElementById("typeF").style.fontSize="25px";
    document.getElementById("typeF").style.color = "rgb(92, 225, 230)";
    document.getElementById("typeC").style.fontSize="12px";
    document.getElementById("typeC").style.color = "rgb(113, 113, 113)";
    link = document.getElementById('typeF');
    link.setAttribute('class', 'disabled'); 
    link=document.querySelector("a#typeC").classList
    link.remove("disabled")
    displayT.innerHTML = Math.round(displayT.innerHTML * 1.8 + 32);
    displayW.innerHTML = Math.round((displayW.innerHTML * 0.621371192));
    displayRF.innerHTML=displayRF.innerHTML.replace("ºC","");
    displayRF.innerHTML=displayRF.innerHTML.replace("RealFeel:","");
    displayRF.innerHTML  ="RealFeel: "+ Math.round(displayRF.innerHTML * 1.8 + 32)+" ºF";
    metricsWind.innerHTML=" mph";
  }
  convertForecast(event.target.innerHTML);
}

function search(city) {
   
  let cityName = document.querySelector("#cityS");
  // let cityInput = document.querySelector("#citySearch");
  // let city = cityInput.value;
  cityName.innerHTML=city;
  let apikey = "1c74a2370abc5bae9c5f1859677931c0";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  axios.get(url).then(showWeather);
}


function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#citySearch");
  search(cityInput.value);
}

let elementF = document.querySelector("#typeF");
elementF.addEventListener("click", convert);
let elementC = document.querySelector("#typeC");
elementC.addEventListener("click", convert);
let searchCity = document.querySelector("#formSearch");
searchCity.addEventListener("submit", handleSubmit);

search("Lisbon");



