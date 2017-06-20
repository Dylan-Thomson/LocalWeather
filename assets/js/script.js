var fahrenheit = true;
var temperature = 78.21;

$(".btn-primary").on("click", function() {
	// Check for location data
	if ("geolocation" in navigator) {
		// Get location data
		navigator.geolocation.getCurrentPosition(function(position) {
		  $("#location").text(position.coords.latitude + " " + position.coords.longitude);
		  // Build URL
			var url = "https://api.darksky.net/forecast/b2e8d595c58230947ca08220d0572147/" + position.coords.latitude + ",%20" + position.coords.longitude + "?callback=?";
			console.log(url);

			// Get weather data
			$.getJSON(url, function(data) {
				console.log(data.currently);
				// Update page with weather data
				$("#summary").text(data.currently.summary);
				temperature = data.currently.apparentTemperature;
				$("#temperature").html(data.currently.apparentTemperature + "<i class='wi wi-fahrenheit'></i>");
			});
		});
	}

	// $(this).addClass("hidden");
});


$("#temperature").on("click", function() {
	if(fahrenheit) {
		temperature = fahrenheitToCelsius(temperature).toFixed(2);
		$("#temperature").html(temperature + "<i class='wi wi-celsius'></i>");
		fahrenheit = false;
	}
	else {
		temperature = celsiusToFahrenheit(temperature).toFixed(2);
		$("#temperature").html(temperature+ "<i class='wi wi-fahrenheit'></i>");
		fahrenheit = true;
	}
});

function fahrenheitToCelsius(temp) {
	return ((temp - 32) * 5)/9;
}

function celsiusToFahrenheit(temp) {
	return (temp * 9)/5 + 32;
}