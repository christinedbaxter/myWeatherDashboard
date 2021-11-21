
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

  var resultsCardCurrData = document.createElement("div");
  resultsCardCurrData.setAttribute("id", "futureCard");
  resultsCardCurrData.setAttribute("class", "card small blue-grey darken-1 col s12");
  currDay.appendChild(resultsCardCurrData);

  var resultsCardCurrImg = document.createElement("div");
  resultsCardCurrImg.setAttribute("class", "card-image valign-wrapper");
  resultsCardCurrData.appendChild(resultsCardCurrImg);

  var resultsCurrIconImg = document.createElement("img");
  resultsCurrIconImg.setAttribute("id", "currWeatherIcon");
  resultsCurrIconImg.setAttribute("src", `${currData[0].cWeatherIcon}`);
  resultsCurrIconImg.setAttribute("alt", `${currData[0].cWeatherIconDesc}`);
  resultsCardCurrImg.appendChild(resultsCurrIconImg);

  var resultsCurrIconTitle = document.createElement("span");
  resultsCurrIconTitle.setAttribute("id", "currCardTitle");
  resultsCurrIconTitle.setAttribute("class", "card-title black-text left-align");
  resultsCurrIconTitle.textContent = city + ", " + currData[0].cDate;
  resultsCardCurrImg.appendChild(resultsCurrIconTitle);

  var resultsCurrCardContent = document.createElement("div");
  resultsCurrCardContent.setAttribute("class", "card-content white-text left-align");
  resultsCardCurrData.appendChild(resultsCurrCardContent);

  var currDayTemp = document.createElement("p");
  currDayTemp.setAttribute("id", "currTemp");
  currDayTemp.setAttribute("class", "currDayData left-align");
  currDayTemp.textContent = "Temp: " + currData[0].cTemp + "°F";
  resultsCurrCardContent.appendChild(currDayTemp);

  var currDayHumidity = document.createElement("p");
  currDayHumidity.setAttribute("id", "currHumidity");
  currDayHumidity.setAttribute("class", "currDayData left-align");
  currDayHumidity.textContent = "Humidity: " + currData[0].cHumidity + `% `;
  resultsCurrCardContent.appendChild(currDayHumidity);

  var currDayWindSpeed = document.createElement("p");
  currDayWindSpeed.setAttribute("id", "currWindSpeed");
  currDayWindSpeed.setAttribute("class", "currDayData left-align");
  currDayWindSpeed.textContent = "Wind: " + currData[0].cWindSpeed + " MPH";
  resultsCurrCardContent.appendChild(currDayWindSpeed);

  var currDayUvi = document.createElement("p");
  currDayUvi.setAttribute("id", "currUvi");
  currDayUvi.setAttribute("class", "currDayData left-align");
  currDayUvi.innerHTML = `UV Index:
  <span style="background-color: ${currData[0].cUviColor}">${currData[0].cUvi}</span>
  `;
  resultsCurrCardContent.appendChild(currDayUvi);
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
  var futureDay = document.getElementById("futureDayData");

  for (var i = 0; i < dailyWeather.length; i++) {

    var resultsCardData = document.createElement("div");
    resultsCardData.setAttribute("id", "futureCard");
    resultsCardData.setAttribute("class", "card small blue-grey darken-1 col s12 m3 l2.5");
    futureDay.appendChild(resultsCardData);

    // var resultsCardImg = document.createElement("div");
    // resultsCardImg.setAttribute("class", "card-image");
    // resultsCardData.appendChild(resultsCardImg);

    var resultsIconImg = document.createElement("img");
    resultsIconImg.setAttribute("id", "futureWeatherIcon");
    resultsIconImg.setAttribute("src", `${dailyWeather[i].dWeatherIcon}`);
    resultsIconImg.setAttribute("alt", `${dailyWeather[i].dWeatherIconDesc}`);
    resultsCardData.appendChild(resultsIconImg);

    var resultsIconTitle = document.createElement("p");
    resultsIconTitle.setAttribute("id", "futureCardTitle");
    resultsIconTitle.setAttribute("class", "card-title black-text");
    resultsIconTitle.textContent = dailyWeather[i].dDate;
    resultsCardData.appendChild(resultsIconTitle);

    var resultsCardContent = document.createElement("div");
    resultsCardContent.setAttribute("class", "card-content white-text");
    resultsCardData.appendChild(resultsCardContent);

    var resultsTemp = document.createElement("p");
    resultsTemp.setAttribute("id", "temp");
    resultsTemp.textContent = "Temp: (L)" +
      dailyWeather[i].dTempL + `°F` + " / (H)" + dailyWeather[i].dTempH + `°F`;
    resultsCardContent.appendChild(resultsTemp);

    var resultsHumidity = document.createElement("p");
    resultsHumidity.setAttribute("id", "humidity");
    resultsHumidity.textContent = "Humidity: " + dailyWeather[i].dHumidity + `% `;
    resultsCardContent.appendChild(resultsHumidity);

    var resultsWind = document.createElement("p");
    resultsWind.setAttribute("id", "wind");
    resultsWind.textContent = "Wind: " + dailyWeather[i].dWindSpeed + " MPH";
    resultsCardContent.appendChild(resultsWind);
  };
};