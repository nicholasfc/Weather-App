const appId = "2d82a18766a7b73f0e74b7131f6cc1c2";
let units = "metric";

function searchWeather(searchTerm) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&APPID=${appId}&units=${units}`
  )
    .then(result => {
      return result.json();
    })
    .then(result => {
      init(result);
    });
}
function init(resultFromServer) {
  console.log(resultFromServer);
  let weatherDescriptionHeader = document.getElementById(
    "weather-description--header"
  );
  let temparetureElement = document.getElementById("temperature");
  let humidityElement = document.getElementById("humidity");
  let windSpeedElement = document.getElementById("wind-speed");
  let cityHeaderElement = document.getElementById("city-header");
  let weatherIcon = document.getElementById("document-icon-img");
  let weatherContainer = document.getElementById("weatherContainer");

  weatherIcon.src = `http://openweathermap.org/img/w/${resultFromServer.weather[0].icon}.png`;
  let resultDescription = resultFromServer.weather[0].description;
  weatherDescriptionHeader.innerText =
    resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

  temparetureElement.innerHTML = `${resultFromServer.main.temp.toFixed(
    1
  )} Celcius`; //add ºC

  windSpeedElement.innerHTML = `${(
    resultFromServer.wind.speed *
    (18 / 5)
  ).toFixed(1)} km/hr winds`; // put km/h
  cityHeaderElement.innerHTML = resultFromServer.name;
  humidityElement.innerHTML = `${resultFromServer.main.humidity}% humidty`;
  weatherContainer.style.visibility = "visible";
}

document.getElementById("search-btn").addEventListener("click", () => {
  let searchTerm = document.getElementById("search-input").value;
  if (searchTerm) searchWeather(searchTerm);
});
