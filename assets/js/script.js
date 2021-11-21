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
  var CITY = cityNameEl.value.trim();
  var currDayDataEl = document.getElementById("currDayData");
  var futureDayDataEl = document.getElementById("futureDayData");
  var starterTextCurrEl = document.getElementById("starterTextCurr");
  var starterTextFutureEl = document.getElementById("starterTextFuture")
  formEl.reset();

  if (currDayDataEl.hasChildNodes()) {
    currDayDataEl.replaceChildren();
    futureDayDataEl.replaceChildren();
    getLatLon(CITY);
  } else {
    starterTextCurrEl.remove();
    starterTextFutureEl.remove();
    getLatLon(CITY);
  }
};

function getLatLon(CITY) {
  var requestUrl = getURL(CITY, undefined, undefined, undefined);

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
  var savedCityLink = getURL(CITY, lat, lon);
  var searchedCityEl = document.getElementById("localStorage");
  var searchedCollectionItem = document.createElement("a");

  searchedCollectionItem.setAttribute("class", "collection-item");
  searchedCollectionItem.setAttribute("id", "savedCity");
  searchedCollectionItem.setAttribute("href", savedCityLink)
  searchedCollectionItem.textContent = CITY;

  searchedCityEl.appendChild(searchedCollectionItem);
};

// function linkToSavedCity(CITY, j) {
//   getWeather(cities, j);
// }

document.getElementById("input-city")
  .addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      document.getElementById("get-location").click();
    }
  });

document.getElementById("get-location").onclick = function () {
  searchBtn();
}