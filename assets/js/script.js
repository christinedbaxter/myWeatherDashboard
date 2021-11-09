var formEl = document.querySelector("form");
var currDayResultsEl = document.getElementById("currDayResults");
var futureDayResultsEl = document.getElementById("futureDayResults");
var cityNameEl = document.querySelector("input");
var currDayCardTitleEl = document.querySelector("cardTitle");
var CITY = "";
const cities = [{ name: "", latitude: "", longitude: "" }];
var j = 0;

function searchBtn() {    
  var CITY = cityNameEl.value;  
  var currDayDataEl = document.querySelector("figure");
  var futureDayResultsEl = document.getElementById("futureDayResults");
  formEl.reset();
    
  if (currDayDataEl.childElementCount === 0) {
    getLatLon(CITY);
    getWeather();
    addToLocalStorage();
    populateSearchedCities(cities);
  } else {
    currDayDataEl.replaceChildren();
    futureDayResultsEl.replaceChildren();    
    getLatLon(CITY);    
    getWeather();
    addToLocalStorage();
    populateSearchedCities(cities);
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
      console.log(j);
      console.log(k);
      cities[j].name = CITY;
      cities[j].latitude = data[0].lat;
      cities[j].longitude = data[0].lon;
      cities.push({ "name": cities.name, "latitude": cities.latitude, "longitude": cities.longitude })[k];
      console.log(j);
      console.log(k);
      j++;
      k++;
      console.log(j);
      console.log(k);
    });  
};

function addToLocalStorage() {  
  localStorage.setItem("cities", JSON.stringify(cities));
}

function populateSearchedCities(cities) {
  console.log(cities);
    
  var CITY = cities[j] ['name'][value] ;

  var lat = cities[j].latitude;
  var lon = cities[j].longitude;
  
  console.log(CITY, lat, lon);

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
    weatherUnits +
    weatherAppId;
  searchedCollectionItem.innerHTML = `<a href=${savedCityUrl}>${CITY}</a>`;  
  searchedCityEl.appendChild(searchedCollectionItem);
};
