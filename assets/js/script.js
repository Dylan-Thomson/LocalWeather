var temperature;
var url;
var fahrenheit = true;

// Themes for each weather condition
var weatherTheme = {
	"clear-day": {
		symbol: "wi-day-sunny",
		background: "rgb(0, 191, 255)"
	},

	"clear-night": {
		symbol: "wi-night-clear",
		background: "rgb(0, 24, 72)"
	},
	"rain": {
		symbol: "wi-rain",
		background: "rgb(117, 149, 191)"
	},
	"snow": {
		symbol: "wi-snow",
		background: "rgb(117, 149, 191)"
	},
	"sleet": {
		symbol: "wi-sleet",
		background: "rgb(117, 149, 191)"
	},
	"wind": {
		symbol: "wi-windy",
		background: "rgb(117, 149, 191)"
	},
	"fog": {
		symbol: "wi-fog",
		background:	"rgb(117, 149, 191)"
	},
	"cloudy": {
		symbol: "wi-cloudy",
		background:	"rgb(117, 149, 191)"
	},
	"partly-cloudy-day": {
		symbol: "wi-day-cloudy",
		background: "rgb(0, 191, 255)"
	},
	"partly-cloudy-night": {
		symbol: "wi-night-alt-cloudy",
		background: "rgb(0, 24, 72)"
	},
	"partly-cloudy": {
		symbol: "wi-cloud",
		background: "rgb(117, 149, 191)"
	}
}

//TODO CLEANUP CONSOLE.LOGS

if ("geolocation" in navigator) {
	// Get location data
	navigator.geolocation.getCurrentPosition(function(position) {
	  // Build URL
		url = "https://api.darksky.net/forecast/b2e8d595c58230947ca08220d0572147/" + position.coords.latitude + ",%20" + position.coords.longitude + "?lang=en";

		// Get city data -- I would use Google Maps for this, but I don't want to publicly display more API keys than I have to :)
		$.getJSON("http://ip-api.com/json/?callback=?", function(data) {
			$("#location").html("<i class='fa fa-map-marker' aria-hidden='true'></i> " + data.city + ", " + data.regionName + " - " + data.country);
		});

		// Get weather data
		$.getJSON((url + "&units=us&callback=?"), function(data) {
			console.log(data);
			$(".fa-spinner").addClass("hidden");
			$(".row").removeClass("hidden");

			// Update page with weather data
			updateWeather(data);

			// Style new content
			updateTheme(data.currently.icon);
		});
	});
}
else {
	$("#summary").text("GEOLOCATION IS NOT SUPPORTED BY YOUR BROWSER");
}

$(".slider").on("click", function() {
	fahrenheit = !fahrenheit;

	if (fahrenheit) {
		$.getJSON((url + "&units=us&callback=?"), function(data) {
			updateWeather(data);
			updateTheme(data.currently.icon);
			console.log(data)
		});
	}
	else {
		$.getJSON((url + "&units=si&callback=?"), function(data) {
			updateWeather(data);
			updateTheme(data.currently.icon);
			console.log(data);
		});	
	}
});

function updateWeather(data) {	
	$("#time").text(timeConverter(data.currently.time));
	$("#weatherIconToday").addClass(weatherTheme[data.currently.icon].symbol);
	$("#currentlySummary").text(data.currently.summary);
	$("#minutelySummary").text(data.minutely.summary);

	if(data.alerts.length > 0) {
		$("#alerts").html("");
		data.alerts.forEach(function(alert) {
			$("#alerts").append("<i class='fa fa-exclamation-triangle' aria-hidden='true'></i> " + "<a href='" + alert.uri + "' target='_blank'>" + alert.title + "</a>");
		});
	}

	if(fahrenheit) {
		$("#temperature").html(Math.round(data.currently.temperature) + "<i class='wi wi-fahrenheit'></i>");
		$("#hourlySummary").text(data.hourly.summary);
		$("#wind").html("Wind: " + Math.round(data.currently.windSpeed) + " mph" + " <i class='wi wi-wind from-" + data.currently.windBearing + "-deg'></i>");
		$("#humidity").html("Humidity: " + Math.round(data.currently.humidity * 100) + "%");
		$("#dewPoint").html("Dew Point: " + Math.round(data.currently.dewPoint) + "<i class='wi wi-degrees'></i>");
		$("#uvIndex").html("UV Index: " + data.currently.uvIndex);
		$("#visibility").html("Visibility: " + Math.round(data.currently.visibility) + " miles");
		$("#pressure").html("Air Pressure:" + Math.round(data.currently.pressure) + " mB");		
	}
	else {
		$("#temperature").html(Math.round(data.currently.temperature) + "<i class='wi wi-celsius'></i>");
		$("#hourlySummary").text(data.hourly.summary);
		$("#wind").html("Wind: " + Math.round(data.currently.windSpeed) + " m/s" + " <i class='wi wi-wind from-" + data.currently.windBearing + "-deg'></i>");
		$("#humidity").html("Humidity: " + Math.round(data.currently.humidity * 100) + "%");
		$("#dewPoint").html("Dew Point: " + Math.round(data.currently.dewPoint) + "<i class='wi wi-degrees'></i>");
		$("#uvIndex").html("UV Index: " + data.currently.uvIndex);
		$("#visibility").html("Visibility: " + Math.round(data.currently.visibility) + " km");
		$("#pressure").html("Air Pressure:" + Math.round(data.currently.pressure) + " hPa");		
	}
}

function updateTheme(str) {
		$("#weatherIconToday").removeClass();
		$("#weatherIconToday").addClass("wi");
		$("#weatherIconToday").addClass(weatherTheme[str].symbol);
		$(".flex-container").css("background", weatherTheme[str].background);
}

function fahrenheitToCelsius(temp) {
	return ((temp - 32) * 5)/9;
}

function celsiusToFahrenheit(temp) {
	return (temp * 9)/5 + 32;
}

// TODO: Refractor
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  var day = days[a.getDay()];

  if(hour > 12) {
  	return day + ", " + month + " " + date + ", " + year + " " + (hour-12) + ":" + ('0' + min).slice(-2) + " PM";
  } 
  if(hour === 12) {
  	return day + ", " + month + " " + date + ", " + year + " " + hour + ":" + ('0' + min).slice(-2) + " PM";

  }
  return day + ", " + month + " " + date + ", " + year + " " + hour + ":" + ('0' + min).slice(-2) + " AM";
}



//BUTTONS FOR TESTING THEMES, REMOVE THESE
// $("#clearday").on("click", function() {
// 		updateTheme("clear-day");
// });

// $("#clearnight").on("click", function() {
// 		updateTheme("clear-night");
// });

// $("#rain").on("click", function() {
// 		updateTheme("rain");
// });

// $("#snow").on("click", function() {
// 		updateTheme("snow");
// });

// $("#sleet").on("click", function() {
// 		updateTheme("sleet");
// });

// $("#windy").on("click", function() {
// 		updateTheme("wind");
// });

// $("#fog").on("click", function() {
// 		updateTheme("fog");
// });

// $("#cloudy").on("click", function() {
// 		updateTheme("cloudy");
// });

// $("#pcd").on("click", function() {
// 		updateTheme("partly-cloudy-day");
// });

// $("#pcn").on("click", function() {
// 		updateTheme("partly-cloudy-night");
// });

// $("#pc").on("click", function() {
// 		updateTheme("partly-cloudy");
// });
