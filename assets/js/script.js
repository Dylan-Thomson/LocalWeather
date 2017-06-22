var temperature;

var icons = {
	"clear-day": "wi-day-sunny",
	"clear-night": "wi-night-clear",
	"rain": "wi-rain",
	"snow": "wi-snow",
	"sleet": "wi-sleet",
	"wind": "wi-windy",
	"fog": "wi-fog",
	"cloudy": "wi-cloudy",
	"partly-cloudy-day": "wi-day-cloudy",
	"partly-cloudy-night": "wi-night-alt-cloudy",
	"partly-cloudy": "wi-day-cloudy"
}

if ("geolocation" in navigator) {
	// Get location data
	navigator.geolocation.getCurrentPosition(function(position) {
	  // Build URL
		var url = "https://api.darksky.net/forecast/b2e8d595c58230947ca08220d0572147/" + position.coords.latitude + ",%20" + position.coords.longitude + "?lang=en&units=us&callback=?";
		console.log(url);

		// Get city data -- I would use Google Maps for this, but I don't want to publicly display more API keys than I have to :)
		$.getJSON("http://ip-api.com/json/?callback=?", function(data) {
			console.log(data.city)
			$("#location").html("<i class='fa fa-map-marker' aria-hidden='true'></i> " + data.city + ", " + data.regionName + " - " + data.country);
		});

		// Get weather data
		$.getJSON(url, function(data) {
			console.log(data);
			// Update page with weather data
			temperature = Math.round(data.currently.temperature);
			$(".fa-spinner").addClass("hidden");
			$("#time").text("Updated: " + timeConverter(data.currently.time));
			$("#temperature").html(temperature + "<i class='wi wi-fahrenheit'></i>");
			$("#weatherIconToday").addClass(icons[data.currently.icon]);
			$("#summary").text(data.currently.summary);
			// console.log(timeConverter(data.currently.time));
		});
	});
}
else {
	$("#summary").text("GEOLOCATION IS NOT SUPPORTED BY YOUR BROWSER");
}

// Convert Temperature between F and C
var fahrenheit = true;
$("#temperature").on("click", function() {
	if(fahrenheit) {
		temperature = fahrenheitToCelsius(temperature);
		$("#temperature").html(Math.round(temperature) + "<i class='wi wi-celsius'></i>");
		fahrenheit = false;
	}
	else {
		temperature = celsiusToFahrenheit(temperature);
		$("#temperature").html(Math.round(temperature) + "<i class='wi wi-fahrenheit'></i>");
		fahrenheit = true;
	}
});

function fahrenheitToCelsius(temp) {
	return ((temp - 32) * 5)/9;
}

function celsiusToFahrenheit(temp) {
	return (temp * 9)/5 + 32;
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  if(hour > 12) {
  	return  date + " " + month + " " + year + " " + (hour-12) + ":" + ('0' + min).slice(-2) + " PM";
  } 
  return date + " " + month + " " + year + " " + hour + ":" + ('0' + min).slice(-2) + " AM";
}