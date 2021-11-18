var formEl = document.querySelector("form");
var currDayResultsEl = document.getElementById("currDayResults");
var futureDayResultsEl = document.getElementById("futureDayResults");
var cityNameEl = document.querySelector("input");
var currDayCardTitleEl = document.querySelector("cardTitle");
var CITY = "";
var cities = [], cityData = {};
var cityId = "", cityLat = "", cityLon = "";
var j = 0;

function searchBtn() {
  var CITY = cityNameEl.value;
  var currDayDataEl = document.querySelector("figure");
  var futureDayResultsEl = document.getElementById("futureDayResults");
  formEl.reset();

  if (currDayDataEl.childElementCount === 0) {
    getLatLon(CITY);
  } else {
    currDayDataEl.replaceChildren();
    futureDayResultsEl.replaceChildren();
    getLatLon(CITY);
  }
};

function getLatLon(CITY) {
  var weatherBaseUrl = "https://api.openweathermap.org/geo/1.0/direct?";
  var weatherCity = "q=" + CITY;
  var weatherAppId = "&appid=8c2f82b97567bfc31f8b04c83b3f13c5";
  var requestUrl = weatherBaseUrl + weatherCity + weatherAppId;
  var k = cities.length;

  fetch(requestUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      cityId = CITY;
      cityLat = data[0].lat;
      cityLon = data[0].lon;
      cityData = { cityId, cityLat, cityLon };
      cities.push(cityData);
    })
    .then(function (cities) {
      getWeather(cities, j);
      populateSearchedCities(cities, j);
      addToLocalStorage(cities);
      j++;
    });
};

function addToLocalStorage() {
  localStorage.setItem("cities", JSON.stringify(cities));
}

function populateSearchedCities() {
  var CITY = cities[j].cityId;
  var lat = cities[j].cityLat;
  var lon = cities[j].cityLon;
  var weatherBaseUrl = "https://api.openweathermap.org/data/2.5/onecall?";
  var weatherCityLat = "lat=" + lat;
  var weatherCityLon = "&lon=" + lon;
  var weatherExclude = "&exclude=minutely,hourly,alerts";
  var weatherUnits = "&units=imperial";
  var weatherAppId = "&appid=8c2f82b97567bfc31f8b04c83b3f13c5";
  var searchedCityEl = document.getElementById("localStorage");
  var searchedCollectionItem = document.createElement("li");

  searchedCollectionItem.setAttribute("class", "collection-item");
  searchedCollectionItem.setAttribute("id", "savedCity");
  searchedCollectionItem.textContent = CITY;
  var savedCityUrl =
    weatherBaseUrl +
    weatherCityLat +
    weatherCityLon +
    weatherExclude +
    weatherUnits +
    weatherAppId;
  searchedCollectionItem.innerHTML = `<a href=${savedCityUrl}>${CITY}</a>`;
  searchedCityEl.appendChild(searchedCollectionItem);
};
