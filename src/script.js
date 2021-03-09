// feature 1

let now=new Date();
let currentTime=document.querySelector("#current-time");
let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day=days[now.getDay()];
let hours=now.getHours();
if (hours <10){
  hours= `0${hours}`;
}
let minutes=now.getMinutes();
if (minutes <10){
  minutes=`0${minutes}`;
}

currentTime.innerHTML= `${day} ${hours}:${minutes}`;

// feature 2


function showTemperature(response){
  console.log(response.data);
  document.querySelector("#city").innerHTML=`📍 ${response.data.name}`;
  //document.querySelector("#city").innerHTML= response.data.name;
  //document.querySelector("#temperature").innerHTML=Math.round(response.main.data.temp);
  document.querySelector("#temperature").innerHTML=Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML=response.data.main.humidity;
  document.querySelector("#wind").innerHTML=Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML=response.data.weather[0].main;
}

function search (event){
  event.preventDefault();
  //let searchInput=document.querySelector("#city-input");
  //let h1= document.querySelector("#city");
  //h1.innerHTML= `📍 ${searchInput.value}`;  
  let units= "metric";
  let city = document.querySelector("#city-input").value;
  let apiKey="91a393a925da1a29653db26755f33f28";
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
 
  axios.get(apiUrl).then(showTemperature);
}



let form= document.querySelector("#search-form");
form.addEventListener("submit", search);

function searchLocation(position){
  let latitude= position.coords.latitude;
  let longitude=position.coords.longitude;
  let apiKey="91a393a925da1a29653db26755f33f28";
  let apiUrl= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation (event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
  
}

let currentLocationButton=document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);