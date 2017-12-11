
$(document).ready(function () {
  // Global vars so I can use them everywhere
  let API_KEY = '3fcca8c908cfa8226db6ebe55fec4f77',
      fTemp = '&units=imperial',
      cTemp = '&units=metric',
      lat,
      lon;


  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        var api = 'http://api.openweathermap.org/data/2.5/weather?lat='+ lat + '&lon=' + lon + '&appid=' + API_KEY;

        function getCTemp () { 
          $.getJSON(api + cTemp, function(data) {
            $("#weatherTemp").html(Math.round(data.main.temp) + " °C");
            $("#toggler").html("Fahrenheit");
          });
        }

        function getFTemp () {
          $.getJSON(api + fTemp, function(data) {
            $("#weatherTemp").html(Math.round(data.main.temp)  + " °F");
            $("#toggler").html("Celcius");
          });
        }

       function getIcons (weather) {
          switch (weather) {
            case 'clear':
              return "<i class='wi wi-day-sunny' style='color: orange;'></i>";
            case 'rain':
              return "<i class='wi wi-rain' style='color: #4682b4;'></i>"
            case 'snow':
              return "<i class='wi wi-snow' style='color: #87ceeb;'></i>";
            case 'clouds':
              return "<i class='wi wi-cloud' style='color: #708090;;'></i>";
            default:
              break;
          }
        }

        $.getJSON(api + cTemp, function(data) {
          $("#location").html(data.name);
          let weatherInfo = capitalizeFirstLetter(data.weather[0].description);
          $("#weatherInfo").html(weatherInfo);      
          $("#weatherIcon").html(getIcons(data.weather[0].main.toLowerCase()));
          getCTemp();
        });
        
        $("#toggler").on("click", function() {
          if ($("#toggler").text().toLowerCase() === "fahrenheit") {
            getFTemp();
          } else {
            getCTemp();
          }
        });
    });
  }
});
