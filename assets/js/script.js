$(".btn-primary").on("click", function() {
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
		  $("#location").text(position.coords.latitude + " " + position.coords.longitude);
		});
	}
});
