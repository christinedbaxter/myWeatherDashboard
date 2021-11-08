var formEl = document.querySelector("form");
var currDayResultsEl = document.getElementById("currDayResults");
var futureDayResultsEl = document.getElementById("futureDayResults");
var cityNameEl = document.querySelector("input");
var currDayCardTitleEl = document.querySelector("cardTitle");
var CITY = "";
const cities = [{ name: "", latitude: "", longitude: "" }];

function submitForm() {    
  var CITY = cityNameEl.value;  
  var currDayDataEl = document.querySelector("figure");
  var futureDayResultsEl = document.getElementById("futureDayResults");
    
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

  fetch(requestUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {      
      for (i = 0; i < data.length; i++) {
        cities[i].latitude = data[i].lat;
        cities[i].longitude = data[i].lon;
        cities[i].name = CITY;
        cities.push(cities[i]);
        
        getWeather(cities[i].latitude, cities[i].longitude, cities[i].name);
        
        // set user-selected city to local storage
        localStorage.setItem(
          "cities",
          JSON.stringify(
            cities[i]
          )
        );

        // populate saved cities from localStorage
        populateSearchedCities(
          cities[i].latitude,
          cities[i].longitude,
          cities[i].name
        );
      }
    });  
};

function populateSearchedCities(lat, lon, CITY) {
  var weatherBaseUrl = "https://api.openweathermap.org/data/2.5/onecall?";
  var weatherCityLat = "lat=" + lat;
  var weatherCityLon = "&lon=" + lon;
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
    weatherUnits +
    weatherAppId;
  searchedCollectionItem.innerHTML = `<a href=${savedCityUrl}>${CITY}</a>`;  
  searchedCityEl.appendChild(searchedCollectionItem);
};
