
var x = document.querySelector(".city-name");
var date = new Date();
var day = date.getDate();
var month = date.getMonth()+1;
var year = date.getFullYear();
var hour = date.getHours();
var minute = date.getMinutes();
var currentMinutes = ( minute < 10 ? "0" : "" ) + minute;
var dateInformation=month+ "/" + day + "/" + year+" "+hour+":"+currentMinutes;
var weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";
var apiKey = "8d56337917956b6778c739bc4015b10a"; //get your own API keys
function initialize() {
  var input = document.getElementById('city-input');
  new google.maps.places.Autocomplete(input);
};
getLocation();

document.getElementById("btn-choice").addEventListener("click", function() {
  getWheater($("#city-input").val());
});

// Event handling for press Enter
document.getElementById("city-input").addEventListener(
  "keypress",
  function(event) {
    if (event.keyCode == 13) {
      getWheater($("#city-input").val());
      console.log("asd");
      $("#city-input").val("");
    }
  },
  false
);

function getLocation() {
  $.ajax({
    url: "https://geoip-db.com/json/",
    type: "GET",
    dataType: "json",
    success: function(data) {
      var lat = data.latitude;
      var long = data.longitude;
      $(".city").html(data.city);
      var city= data.city;
      $(".city-name").html(data.city);
      $(".country").html(data.country_name);
      getWheater(city);
    },
    error: function(err) {
      alert("Oops something went wrong, Please try again.");
      console.log(err);
    }
  });
}

function getWheater(city) {
  $.getJSON(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric" +
      "&appid=3a04b53f7b6d2edbaad0c1e9b9d783f1",
    function(response) {
      console.log(response);
      var city2 = city;
      var country = response.sys.country;
      var wheater = response.weather[0].main;
      var maxtemp = Math.round(response.main.temp_max);
      var mintemp = Math.round(response.main.temp_min);
      var windSpeed = Math.round(response.wind.speed);
      console.log(
        city2 +
          " " +
          country +
          " " +
          wheater +
          " " +
          maxtemp +
          " " +
          mintemp +
          " " +
          windSpeed
      );
      wheaterSet(city2, country, wheater,maxtemp, mintemp, windSpeed);
    }
  );
}

function wheaterSet(city, country, wheater,maxtemp,mintemp,windSpeed) {
  console.log(wheater);
  if (wheater == "Clear") {
    $("#wheater-video").html(
      "<video autoplay muted loop " +
        'id="myVideo"><source  src="videos/clearNight.mp4" type="video/mp4"></video>'
    );
  }
  if (wheater == "Clear" && (hour <= 20 && hour >= 6)) {
    $("#wheater-video").html(
      "<video autoplay muted loop " +
        'id="myVideo"><source  src="videos/clearDay.mp4" type="video/mp4"></video>'
    );
  }
  if (wheater == "Rain") {
    $("#wheater-video").html(
      "<video autoplay muted loop " +
        'id="myVideo"><source  src="videos/rain.mp4" type="video/mp4"></video>'
    );
  }
  if (wheater == "Clouds") {
    $("#wheater-video").html(
      "<video autoplay muted loop " +
        'id="myVideo"><source  src="videos/cloudsNight.mp4" type="video/mp4"></video>'
    );
  }
  if (wheater == "Clouds" && (hour <= 20 && hour >= 6)) {
    $("#wheater-video").html(
      "<video autoplay muted loop " +
        'id="myVideo"><source  src="videos/clouds.mp4" type="video/mp4"></video>'
    );
  }
  if (wheater == "Snow") {
    $("#wheater-video").html(
      "<video autoplay muted loop " +
        'id="myVideo"><source  src="videos/snow.mp4" type="video/mp4"></video>'
    );
  }
  if (wheater == "Mist") {
    $("#wheater-video").html(
      "<video autoplay muted loop " +
        'id="myVideo"><source  src="videos/mist.mp4" type="video/mp4"></video>'
    );
  }
  if (wheater == "Thunderstorm") {
    $("#wheater-video").html(
      "<video autoplay muted loop " +
        'id="myVideo"><source  src="videos/thunderstorm.mp4" type="video/mp4"></video>'
    );
  }
  //    $(".container-fluid").css("background", "rgba(0, 0, 0, 0.4)");
  $("#city-info").html(city + " " + country);
  $("#wheat-info").html(wheater);
  $("#temp-info").html(mintemp + " &deg;C"+"~"+maxtemp + " &deg;C");
  $("#windSpeed-info").html(windSpeed + " m/s");
  $("#wheater-info").show();
  thunderstorm;
}

