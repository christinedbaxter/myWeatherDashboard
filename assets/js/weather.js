// Get weather data
function getWeather(userCityLat, userCityLon, cityName) {
  var cityLat = userCityLat;
  var cityLon = userCityLon;  
  var weatherCity = cityName;  
  var weatherBaseUrl = "https://api.openweathermap.org/data/2.5/onecall?";  
  var weatherCityLat = "lat=" + cityLat;
  var weatherCityLon = "&lon=" + cityLon;
  var weatherExclude = "&exclude=minutely,hourly,alerts"
  var weatherAppId = "&appid=8c2f82b97567bfc31f8b04c83b3f13c5";  
  var weatherParams = "";
  var weatherIcon = "https://openweathermap.org/img/wn/";
  var requestUrl =
    weatherBaseUrl +
    weatherCityLat + 
    weatherCityLon + 
    weatherExclude + 
    weatherAppId;
    console.log(requestUrl);

  fetch(requestUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
        console.log(data);        
        var currWeather = data.current;
        var currDate = Date(currWeather.date);
        var currTemp = currWeather.temp;
        var currHumidity = currWeather.humidity;
        var currWindSpeed = currWeather.wind_speed;
        var currUvi = currWeather.uvi;
        console.log(weatherCity);
        console.log(currDate);
        console.log(currTemp);
        console.log(currHumidity);
        console.log(currWindSpeed);
        console.log(currUvi);
        for (i = 0; i < data.length; i++) {            

      }
    });
}