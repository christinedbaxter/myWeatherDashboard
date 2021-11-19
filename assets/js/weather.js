
// Get weather data
function getWeather() {
  var weatherCity = cities[j].cityId;
  var cityLat = cities[j].cityLat;
  var cityLon = cities[j].cityLon;
  var requestUrl = getURL(weatherCity, cityLat, cityLon, undefined);

  fetch(requestUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      var currData = getCurrWeather(data);
      populateCurrCard(weatherCity, currData);

      var dailyWeather = getFutureWeather(data.daily);
      populateFutureCards(dailyWeather);
    });
};

function getURL(CITY, lat, lon, iconId) {
  var weatherCityLat = "lat=" + lat;
  var weatherCityLon = "&lon=" + lon;
  var weatherExclude = "&exclude=minutely,hourly,alerts";
  var weatherUnits = "&units=imperial";
  var weatherAppId = "&appid=8c2f82b97567bfc31f8b04c83b3f13c5";
  var weatherCity = "q=" + CITY;
  //var weatherMode = "&mode=html";  

  if (iconId !== undefined) {
    var weatherIconUrl = "http://openweathermap.org/img/wn/";
    var requestUrl =
      weatherIconUrl +
      iconId + "@2x.png";
    return requestUrl;
  } else if (lat !== undefined && lon !== undefined) {
    var weatherBaseUrl = "https://api.openweathermap.org/data/2.5/onecall?";
    var requestUrl =
      weatherBaseUrl +
      weatherCityLat +
      weatherCityLon +
      weatherExclude +
      weatherUnits +
      weatherAppId;
    return requestUrl;
  } else {
    var weatherBaseUrl = "https://api.openweathermap.org/geo/1.0/direct?";
    var requestUrl =
      weatherBaseUrl + weatherCity + weatherAppId;
    return requestUrl;
  };
};

function getCurrWeather(data) {
  var currWeather = data.current;
  var longDate = currWeather.dt;
  var d = new Date(longDate * 1000);
  var cDate = d.toDateString(longDate);
  var cTemp = Math.round(currWeather.temp);
  var cHumidity = currWeather.humidity;
  var cUvi = Number.parseFloat(currWeather.uvi).toFixed(2);
  var cUviColor = getUviColor(cUvi);
  var cWindSpeed = currWeather.wind_speed;
  var cWeatherIconDesc = currWeather.weather[0].description;
  var cWeatherIconId = currWeather.weather[0].icon;
  var cWeatherIcon = getURL(undefined, undefined, undefined, cWeatherIconId);
  var currData = [];

  currData.push({ cDate, cWeatherIcon, cWeatherIconDesc, cTemp, cHumidity, cUvi, cUviColor, cWindSpeed });

  return currData;
}

function getUviColor(uvi) {
  var uviNum = uvi, color = "";

  //Select correct UV background color based on Index value
  if (uviNum >= 11) {
    color = "violet";
  } else if (uviNum >= 8) {
    color = "red";
  } else if (uviNum >= 6) {
    color = "orange";
  } else if (uviNum >= 3) {
    color = "yellow";
  } else {
    color = "green";
  };

  return (color);
};

function populateCurrCard(city, currData) {
  var currDay = document.getElementById("currDayData");

  var currDayTitle = document.createElement("h4");
  currDayTitle.setAttribute("id", "cardTitle");
  currDayTitle.setAttribute("class", "cardTitle");
  currDayTitle.innerHTML = `
    ${city} ${currData[0].cDate} 
    <span>
      <img id="currWeatherIcon" src="${currData[0].cWeatherIcon}" alt="${currData[0].cWeatherIconDesc}"</img>
    </span>
   `;
  currDay.appendChild(currDayTitle);

  var currDayTemp = document.createElement("p");
  currDayTemp.setAttribute("id", "currTemp");
  currDayTemp.textContent = "Temp: " + currData[0].cTemp + "°F";
  currDay.appendChild(currDayTemp);

  var currDayHumidity = document.createElement("p");
  currDayHumidity.setAttribute("id", "currHumidity");
  currDayHumidity.textContent = "Humidity: " + currData[0].cHumidity + `% `;
  currDay.appendChild(currDayHumidity);

  var currDayWindSpeed = document.createElement("p");
  currDayWindSpeed.setAttribute("id", "currWindSpeed");
  currDayWindSpeed.textContent = "Wind: " + currData[0].cWindSpeed + " MPH";
  currDay.appendChild(currDayWindSpeed);

  var currDayUvi = document.createElement("p");
  currDayUvi.setAttribute("id", "currUvi");
  currDayUvi.innerHTML = `UV Index:
  <span style="background-color: ${currData[0].cUviColor}">${currData[0].cUvi}</span>
  `;
  currDay.appendChild(currDayUvi);
}

function getFutureWeather(dailyWeather) {
  var futureData = [];
  for (var i = 1; i < 6; i++) {
    var longDate = dailyWeather[i].dt;
    var d = new Date(longDate * 1000);
    var dDate = d.toDateString(longDate);
    var dTempL = Math.round(dailyWeather[i].temp.min);
    var dTempH = Math.round(dailyWeather[i].temp.max);
    var dHumidity = dailyWeather[i].humidity;
    var dWindSpeed = dailyWeather[i].wind_speed;
    var dUvi = dailyWeather[i].uvi;
    var dWeatherIconDesc = dailyWeather[i].weather[0].description;
    var dWeatherIconId = dailyWeather[i].weather[0].icon;
    var dWeatherIcon = getURL(undefined, undefined, undefined, dWeatherIconId);

    futureData.push({ dDate, dWeatherIcon, dWeatherIconDesc, dTempL, dTempH, dHumidity, dUvi, dWindSpeed });
  };

  return futureData;
}

function populateFutureCards(dailyWeather) {
  var results = document.getElementById("futureDayResults");

  var resultsDiv = document.createElement("div");
  resultsDiv.setAttribute("id", "futureDayData");
  resultsDiv.setAttribute("class", "col s6 m4");
  results.appendChild(resultsDiv);

  for (var i = 0; i < dailyWeather.length; i++) {

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
    resultsTitle.textContent = dailyWeather[i].dDate;
    resultsCard.appendChild(resultsTitle);

    var resultsIcon = document.createElement("p");
    resultsIcon.setAttribute("class", "divider")
    resultsCard.appendChild(resultsIcon);

    var resultsIconImg = document.createElement("img");
    resultsIconImg.setAttribute("id", "futureWeatherIcon");
    resultsIconImg.setAttribute("src", `${dailyWeather[i].dWeatherIcon} `);
    resultsIconImg.setAttribute("alt", `${dailyWeather[i].dWeatherIconDesc} `);
    resultsCard.appendChild(resultsIconImg);

    var resultsTemp = document.createElement("p");
    resultsTemp.setAttribute("id", "temp");
    resultsTemp.textContent = "Temp: (L) " +
      dailyWeather[i].dTempL + `°F` + " / (H) " + dailyWeather[i].dTempH + `°F`;
    resultsCard.appendChild(resultsTemp);

    var resultsHumidity = document.createElement("p");
    resultsHumidity.setAttribute("id", "humidity");
    resultsHumidity.textContent = "Humidity: " + dailyWeather[i].dHumidity + `% `;
    resultsCard.appendChild(resultsHumidity);

    var resultsWind = document.createElement("p");
    resultsWind.setAttribute("id", "wind");
    resultsWind.textContent = "Wind: " + dailyWeather[i].dWindSpeed + " MPH";
    resultsCard.appendChild(resultsWind);
  };
};