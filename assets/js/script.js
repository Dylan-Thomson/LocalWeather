$(".btn-primary").on("click", function() {
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
		  $("#location").text(position.coords.latitude + " " + position.coords.longitude);
			var url = "https://api.darksky.net/forecast/b2e8d595c58230947ca08220d0572147/" + position.coords.latitude + ",%20" + position.coords.longitude + "?callback=?";
			console.log(url);
			$.getJSON(url, function(data) {
				console.log(data.currently);
				$("#summary").text(data.currently.summary);
				$("#temperature").text(data.currently.apparentTemperature + "F");
			});
		});
	}

});
