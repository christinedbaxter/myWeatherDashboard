
// Get weather data
function getWeather() {

  console.log(cities);

  console.log(j);
  //console.log(cities[j].name);

  var weatherCity = cities[j].cityId;
  var cityLat = cities[j].cityLat;
  var cityLon = cities[j].cityLon;
  console.log(weatherCity, cityLat, cityLon);

  var weatherBaseUrl = "https://api.openweathermap.org/data/2.5/onecall?";
  var weatherCityLat = "lat=" + cityLat;
  var weatherCityLon = "&lon=" + cityLon;
  var weatherExclude = "&exclude=minutely,hourly,alerts";
  var weatherUnits = "&units=imperial";
  var weatherAppId = "&appid=8c2f82b97567bfc31f8b04c83b3f13c5";
  var weatherIcon = "https://openweathermap.org/img/wn/";
  var requestUrl =
    weatherBaseUrl +
    weatherCityLat +
    weatherCityLon +
    weatherExclude +
    weatherUnits +
    weatherAppId;

  fetch(requestUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      var currWeather = data.current;
      var longDate = currWeather.dt;
      var d = new Date(longDate * 1000);
      var cDate = d.toDateString(longDate);
      var cTemp = currWeather.temp;
      var cHumidity = currWeather.humidity;
      var cUvi = currWeather.uvi;
      var cWindSpeed = currWeather.wind_speed;
      populateCurrCard(weatherCity, cDate, cTemp, cHumidity, cUvi, cWindSpeed);

      var dailyWeather = data.daily;
      for (var i = 1; i < 6; i++) {
        var longDate = dailyWeather[i].dt;
        var d = new Date(longDate * 1000);
        var dDate = d.toDateString(longDate);
        var dTempL = dailyWeather[i].temp.min;
        var dTempH = dailyWeather[i].temp.max;
        var dHumidity = dailyWeather[i].humidity;
        var dWindSpeed = dailyWeather[i].wind_speed;
        var dUvi = dailyWeather[i].uvi;
        populateFutureCards(dDate, dTempL, dTempH, dHumidity, dWindSpeed, dUvi);
      }
    });
}

function populateCurrCard(city, date, temp, cHumidity, uvi, cWindSpeed) {
  console.log(city, date, temp, cHumidity, uvi, cWindSpeed);
  var currDay = document.getElementById("currDayData");

  var currDayTitle = document.createElement("h4");
  currDayTitle.setAttribute("id", "cardTitle");
  currDayTitle.setAttribute("class", "cardTitle");
  currDayTitle.textContent = city + " (" + date + ")";
  currDay.appendChild(currDayTitle);

  var currDayTemp = document.createElement("p");
  currDayTemp.setAttribute("id", "currTemp");
  currDayTemp.textContent = "Temp: " + temp;
  currDay.appendChild(currDayTemp);

  var currDayHumidity = document.createElement("p");
  currDayHumidity.setAttribute("id", "currHumidity");
  currDayHumidity.textContent = "Humidity: " + cHumidity + ` %`;
  currDay.appendChild(currDayHumidity);

  var currDayUvi = document.createElement("p");
  currDayUvi.setAttribute("id", "currUvi");
  currDayUvi.textContent = "UV Index: " + uvi;
  currDay.appendChild(currDayUvi);

  var currDayWindSpeed = document.createElement("p");
  currDayWindSpeed.setAttribute("id", "currWindSpeed");
  currDayWindSpeed.textContent = "Wind: " + cWindSpeed + " MPH";
  currDay.appendChild(currDayWindSpeed);
}

function populateFutureCards(date, dTempL, dTempH, dHumidity, dWindSpeed) {
  console.log(date, dTempL, dTempH, dHumidity, dWindSpeed);
  var results = document.getElementById("futureDayResults");

  var resultsDiv = document.createElement("div");
  resultsDiv.setAttribute("id", "futureDayData");
  resultsDiv.setAttribute("class", "col s6 m4");
  results.appendChild(resultsDiv);

  var resultsCardData = document.createElement("div");
  resultsCardData.setAttribute("id", "card-data");
  resultsCardData.setAttribute("class", "card blue-grey darken-1");
  resultsDiv.appendChild(resultsCardData);

  var resultsCard = document.createElement("div");
  resultsCard.setAttribute("class", "card-content white-text");
  resultsCardData.appendChild(resultsCard);

  var resultsTitle = document.createElement("p");
  resultsTitle.setAttribute("id", "cardTitle");
  resultsTitle.setAttribute("class", "cardTitle");
  resultsTitle.textContent = date;
  resultsCard.appendChild(resultsTitle);

  var resultsIcon = document.createElement("p");
  resultsIcon.setAttribute("id", "icon");
  resultsIcon.setAttribute("class", "divider")
  resultsIcon.textContent = "WEATHER ICON HERE";
  resultsCard.appendChild(resultsIcon);

  var resultsTemp = document.createElement("p");
  resultsTemp.setAttribute("id", "temp");
  resultsTemp.textContent = "Temp: (L) " + dTempL + " / (H) " + dTempH;
  resultsCard.appendChild(resultsTemp);

  var resultsHumidity = document.createElement("p");
  resultsHumidity.setAttribute("id", "humidity");
  resultsHumidity.textContent = "Humidity: " + dHumidity + ` %`;
  resultsCard.appendChild(resultsHumidity);

  var resultsWind = document.createElement("p");
  resultsWind.setAttribute("id", "wind");
  resultsWind.textContent = "Wind: " + dWindSpeed + " MPH";
  resultsCard.appendChild(resultsWind);
}