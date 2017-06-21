var temperature = 78.21;

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

		$.getJSON("http://ip-api.com/json/?callback=?", function(data) {
			console.log(data.city)
			$("#location").text(data.city + ", " + data.regionName + " - " + data.country);
		});

		// Get weather data
		$.getJSON(url, function(data) {
			console.log(data.currently);
			// Update page with weather data
			$("#summary").text(data.currently.summary);
			temperature = data.currently.temperature;
			$("#temperature").html(temperature + "<i class='wi wi-fahrenheit'></i>");
			$("i").addClass(icons[data.currently.icon]);
		});
	});
}
else {
	$("#temperature").text("GEOLOCATION IS NOT SUPPORTED BY YOUR BROWSER");
}

// Convert Temperature between F and C
var fahrenheit = true;
$("#temperature").on("click", function() {
	if(fahrenheit) {
		temperature = fahrenheitToCelsius(temperature);
		$("#temperature").html(temperature.toFixed(2) + "<i class='wi wi-celsius'></i>");
		fahrenheit = false;
	}
	else {
		temperature = celsiusToFahrenheit(temperature);
		$("#temperature").html(temperature.toFixed(2) + "<i class='wi wi-fahrenheit'></i>");
		fahrenheit = true;
	}
});

function fahrenheitToCelsius(temp) {
	return ((temp - 32) * 5)/9;
}

function celsiusToFahrenheit(temp) {
	return (temp * 9)/5 + 32;
}