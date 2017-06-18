$(".btn-primary").on("click", function() {
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
		  $("#location").text(position.coords.latitude + " " + position.coords.longitude);
			var url = "https://api.darksky.net/forecast/b2e8d595c58230947ca08220d0572147/" + position.coords.latitude + ", " + position.coords.longitude;
		});
	}

});
