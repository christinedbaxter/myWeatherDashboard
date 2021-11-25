const cityNameEl = document.querySelector("input");

function searchBtn() {
  let city = cityNameEl.value.trim();
  clearWeatherData();
  let cityData = getGeoCoordinates(city);
  let data = getWeatherData(cityData);
  getCurrentWeather(data, city);
  getFutureWeather(data, city);
  addCityToHistory(city);
};

function clearWeatherData() {
  let currDayDataEl = document.getElementById("currDayData");
  let futureDayDataEl = document.getElementById("futureDayData");
  let starterTextCurrEl = document.getElementById("starterTextCurr");
  let starterTextFutureEl = document.getElementById("starterTextFuture")
  let formEl = document.querySelector("form");
  formEl.reset();

  if (!currDayDataEl.hasChildNodes()) {
    starterTextCurrEl.remove();
    starterTextFutureEl.remove();
  } else {
    currDayDataEl.replaceChildren();
    futureDayDataEl.replaceChildren();
  }
};

function getGeoCoordinates(city) {
  let weatherAppId = "a77eee0f49abe8e6331cd9b225df2834";
  let geoCoordUrl =
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${weatherAppId}`;

  fetch(geoCoordUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      let cities = [], cityData = {};
      let cityId = city;
      let cityLat = data[0].lat;
      let cityLon = data[0].lon;
      cityData = { cityId, cityLat, cityLon };
      cities.push(cityData);

      addToLocalStorage(cities);

      return cityData;
    })
};

function getWeatherData(cityData) {
  let city = cityData.cityId;
  let lat = cityData.lat;
  let lon = cityData.lon;
  let weatherAppId = "a77eee0f49abe8e6331cd9b225df2834";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${weatherAppId}`;

  fetch(weatherUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      return (data);
    });
};

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

// Get current weather data
function getCurrentWeather(data, city) {
  let cityId = city;
  let cityLat = data.lat;
  let cityLon = data.lon;
  let longDate = data.daily.dt;
  let d = new Date(longDate * 1000);
  let cDate = d.toDateString(longDate);
  let cTemp = current.temp;
  let cHumidity = current.humidity;
  let cUvi = Number.parseFloat(current.uvi).toFixed(2);
  let cUviColor = getUviColor(cUvi);
  let cWindSpeed = current.wind_speed;
  let cWeatherDesc = current.weather.description;
  let cWeatherIconId = getWeatherIcon(current.weather.icon);
  let cTimeZone = data.timezone;
  let cData = [];

  cData.push({ cityId, cityLat, cityLon, cDate, cTemp, cHumidity, cUvi, cUviColor, cWindSpeed, cWeatherDesc, cWeatherIconId, cTimeZone });

  populateCurrCard(cData);
};

function getFutureWeather(data, city) {
  let cityId = city;
  let cityLat = data.lat;
  let cityLon = data.log;
  let dTimeZone = data.timezone;
  let dailyWeather = data.daily;
  let fData = [];

  for (let i = 1; i < 6; i++) {
    let longDate = dailyWeather[i].dt;
    let d = new Date(longDate * 1000);
    let dDate = d.toDateString(longDate);
    let dTempL = dailyWeather[i].temp.min;
    let dTempH = dailyWeather[i].temp.max;
    let dHumidity = dailyWeather[i].humidity;
    let dUvi = dailyWeather[i].uvi;
    let dUviColor = getUviColor(dUvi);
    let dWindSpeed = dailyWeather[i].wind_speed;
    let dWeatherDesc = dailyWeather[i].description;
    let dWeatherIconId = getWeatherIcon(dailyWeather[i].icon);

    fData.push({ cityId, cityLat, cityLon, dTimeZone, dDate, dTempL, dTempH, dHumidity, dUvi, dUviColor, dWindSpeed, dWeatherDesc, dWeatherIconId });

    populateFutureCards(fData);
  }
};

function getWeatherIcon(dIconId) {
  let weatherIconUrl = `http://openweathermap.org/img/wn/${dIconId}@2x.png`;
  return weatherIconUrl;
};

function populateCurrCard(cData) {
  let currDay = document.getElementById("currDayData");

  let resultsCardCurrData = document.createElement("div");
  resultsCardCurrData.setAttribute("id", "currentCard");
  resultsCardCurrData.setAttribute("class", "card small blue-grey darken-1 col s12");
  currDay.appendChild(resultsCardCurrData);

  let resultsCardCurrImg = document.createElement("div");
  resultsCardCurrImg.setAttribute("class", "card-image valign-wrapper");
  resultsCardCurrData.appendChild(resultsCardCurrImg);

  let resultsCurrIconImg = document.createElement("img");
  resultsCurrIconImg.setAttribute("id", "currWeatherIcon");
  resultsCurrIconImg.setAttribute("src", `${cData.cWeatherIconId}`);
  resultsCurrIconImg.setAttribute("alt", `${cData.cWeatherIconDesc}`);
  resultsCardCurrImg.appendChild(resultsCurrIconImg);

  let resultsCurrIconTitle = document.createElement("span");
  resultsCurrIconTitle.setAttribute("id", "currCardTitle");
  resultsCurrIconTitle.setAttribute("class", "card-title black-text left-align");
  resultsCurrIconTitle.textContent = cData.city + ", " + cData.cDate;
  resultsCardCurrImg.appendChild(resultsCurrIconTitle);

  let resultsCurrCardContent = document.createElement("div");
  resultsCurrCardContent.setAttribute("class", "card-content white-text left-align");
  resultsCardCurrData.appendChild(resultsCurrCardContent);

  let currDayTemp = document.createElement("p");
  currDayTemp.setAttribute("id", "currTemp");
  currDayTemp.setAttribute("class", "currDayData left-align");
  currDayTemp.textContent = "Temp: " + cData.cTemp + "°F";
  resultsCurrCardContent.appendChild(currDayTemp);

  let currDayHumidity = document.createElement("p");
  currDayHumidity.setAttribute("id", "currHumidity");
  currDayHumidity.setAttribute("class", "currDayData left-align");
  currDayHumidity.textContent = "Humidity: " + cData.cHumidity + "%";
  resultsCurrCardContent.appendChild(currDayHumidity);

  let currDayWindSpeed = document.createElement("p");
  currDayWindSpeed.setAttribute("id", "currWindSpeed");
  currDayWindSpeed.setAttribute("class", "currDayData left-align");
  currDayWindSpeed.textContent = "Wind: " + cData.cWindSpeed + " MPH";
  resultsCurrCardContent.appendChild(currDayWindSpeed);

  let currDayUvi = document.createElement("p");
  currDayUvi.setAttribute("id", "currUvi");
  currDayUvi.setAttribute("class", "currDayData left-align");
  currDayUvi.innerHTML = `UV Index:
  <span style="background-color: ${cData.cUviColor}">${cData.cUvi}</span>
  `;
  resultsCurrCardContent.appendChild(currDayUvi);
};

function populateFutureCards(fData) {
  let futureDay = document.getElementById("futureDayData");

  let resultsCardData = document.createElement("div");
  resultsCardData.setAttribute("id", "futureCard");
  resultsCardData.setAttribute("class", "card small blue-grey darken-1 col s12 m3 l2.5");
  futureDay.appendChild(resultsCardData);

  let resultsIconImg = document.createElement("img");
  resultsIconImg.setAttribute("id", "futureWeatherIcon");
  resultsIconImg.setAttribute("src", `${fData.dWeatherIcon}`);
  resultsIconImg.setAttribute("alt", `${fData.dWeatherIconDesc}`);
  resultsCardData.appendChild(resultsIconImg);

  let resultsIconTitle = document.createElement("p");
  resultsIconTitle.setAttribute("id", "futureCardTitle");
  resultsIconTitle.setAttribute("class", "card-title black-text");
  resultsIconTitle.textContent = fData.dDate;
  resultsCardData.appendChild(resultsIconTitle);

  let resultsCardContent = document.createElement("div");
  resultsCardContent.setAttribute("class", "card-content white-text");
  resultsCardData.appendChild(resultsCardContent);

  let resultsTemp = document.createElement("p");
  resultsTemp.setAttribute("id", "temp");
  resultsTemp.textContent = "Temp: (L)" +
    fData.dTempL + "°F" + " / (H)" + fData.dTempH + "°F";
  resultsCardContent.appendChild(resultsTemp);

  let resultsHumidity = document.createElement("p");
  resultsHumidity.setAttribute("id", "humidity");
  resultsHumidity.textContent = "Humidity: " + fData.dHumidity + "%";
  resultsCardContent.appendChild(resultsHumidity);

  let resultsWind = document.createElement("p");
  resultsWind.setAttribute("id", "wind");
  resultsWind.textContent = "Wind: " + fData.dWindSpeed + " MPH";
  resultsCardContent.appendChild(resultsWind);

  let resultsUvi = document.createElement("p");
  resultsUvi.setAttribute("id", "futureUvi");
  resultsUvi.setAttribute("class", "futureDayData left-align");
  resultsUvi.innerHTML = `UV Index:
  <span style="background-color: ${fData.cUviColor}">${fData.cUvi}</span>
  `;
  resultsCurrCardContent.appendChild(resultsUvi);
};

function addCityToHistory(city) {

  let searchedCityEl = document.getElementById("localStorage");
  let searchedCollectionItem = document.createElement("li");
  searchedCollectionItem.setAttribute("class", "collection-item");
  searchedCollectionItem.setAttribute("id", "savedCity");
  searchedCollectionItem.textContent = city;
  searchedCityEl.appendChild(searchedCollectionItem);
};

function addToLocalStorage(cities) {
  localStorage.setItem("cities", JSON.stringify(cities));
}

document.getElementById("get-location").onclick = function () {
  searchBtn();
};
