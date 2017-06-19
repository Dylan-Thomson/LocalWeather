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
				$("#temperature").html(data.currently.apparentTemperature + "<i class='wi wi-fahrenheit'></i>");
			});
		});
	}
});
