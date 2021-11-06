function getLatLon() {  
  let cityNameEl = document.querySelector("input");
  let cityName = cityNameEl.value;  
  let button = document.getElementById("get-location");

  button.addEventListener("click", function () {
    var weatherBaseUrl = "https://api.openweathermap.org/geo/1.0/direct?";
    var weatherCity = "q=" + cityName;
    var weatherAppId = "&appid=8c2f82b97567bfc31f8b04c83b3f13c5";

    var requestUrl = weatherBaseUrl + weatherCity + weatherAppId;    

    fetch(requestUrl)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        for (i = 0; i < data.length; i++) {
          let lat = data[i].lat;
          let lon = data[i].lon;          
          getWeather(lat, lon, cityName);
        }
      });
  });
};