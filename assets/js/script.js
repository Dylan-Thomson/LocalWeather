var temperature;
var url = "";
var usData = {};
var fahrenheit = true;

// Get location and populate page with weather data
$(document).ready(function() {
	init();
});

// Themes for each weather condition
var weatherTheme = {
	"default": {
		symbol: "wi-storm-showers",
		background: "rain"
	},
	"clear-day": {
		symbol: "wi-day-sunny",
		background: "clearDay"
	},
	"clear-night": {
		symbol: "wi-night-clear",
		background: "clearNight"
	},
	"rain": {
		symbol: "wi-rain",
		background: "rain"
	},
	"snow": {
		symbol: "wi-snow",
		background: "snow"
	},
	"sleet": {
		symbol: "wi-sleet",
		background: "sleet"
	},
	"wind": {
		symbol: "wi-windy",
		background: "wind"
	},
	"fog": {
		symbol: "wi-fog",
		background:	"fog"
	},
	"cloudy": {
		symbol: "wi-cloudy",
		background:	"cloudy"
	},
	"partly-cloudy-day": {
		symbol: "wi-day-cloudy",
		background: "pcDay"
	},
	"partly-cloudy-night": {
		symbol: "wi-night-alt-cloudy",
		background: "pcNight"
	},
	"partly-cloudy": {
		symbol: "wi-cloud",
		background: "pc"
	}
}

// Get location/weather data and update page
function init() {
	// Get location data
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
			
		  // Build URL
			url = "https://api.darksky.net/forecast/b2e8d595c58230947ca08220d0572147/" + position.coords.latitude + ",%20" + position.coords.longitude + "?lang=en";

			// Get city data 
			$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&key=AIzaSyCC_hAkRMemvf2aFYjZ0_EibEM0X7FAh4E", function(data) {
				$("#location").html("<i class='fa fa-map-marker' aria-hidden='true'></i> " + data.results[0].formatted_address);
			});

			// Initialize page with weather data
			initWeatherDataUS(url, function(data) {
				// Save US data
				usData = data;
			});


		});
	}
	else {
		onPageLoad();
		$("#summary").text("GEOLOCATION IS NOT SUPPORTED BY YOUR BROWSER");
	}

	// Change units when toggle switch is clicked
	$(".slider").on("click", function() {
		fahrenheit = !fahrenheit;

		if (fahrenheit) {
			displayUnitsUS(usData);
			updateTheme(usData.currently.icon);
		}
		else {
			displayUnitsSI(usData);
			updateTheme(usData.currently.icon);
		}
	});
}

function initWeatherDataUS(url, callback) {
	$.getJSON((url + "&units=us&callback=?"), function(data) {
		onPageLoad();
		
		// Update page with weather data
		displayWeather(data);

		// Style new content
		updateTheme(data.currently.icon);

		if(callback) {
			callback(data);
		}
	});
}

function displayWeather(data) {
	// Display unit independent content
	$("#time").text(timeConverter(data.currently.time));
	$("#weatherIconToday").addClass(weatherTheme[data.currently.icon].symbol);
	$("#currentlySummary").text(data.currently.summary);
	$("#minutelySummary").text(data.minutely.summary);
	$("#hourlySummary").text(data.hourly.summary);
	$("#humidity").html("Humidity: " + Math.round(data.currently.humidity * 100) + "%");
	$("#uvIndex").html("UV Index: " + data.currently.uvIndex);

	// Display alerts if any
	if(data.alerts) {
		$("#alerts").html("");
		data.alerts.forEach(function(alert) {
			$("#alerts").append("<i class='fa fa-exclamation-triangle' aria-hidden='true'></i> " + "<a href='" + alert.uri + "' target='_blank'>" + alert.title + "</a>");
		});
	}

	// Display data using US units
	displayUnitsUS(data);
}

// Update data with US units
function displayUnitsUS(data) {
	$("#temperature").html(Math.round(data.currently.temperature) + "<i class='wi wi-fahrenheit'></i>");
	$("#wind").html("Wind: " + Math.round(data.currently.windSpeed) + " mph" + " <i class='wi wi-wind from-" + data.currently.windBearing + "-deg'></i>");
	$("#dewPoint").html("Dew Point: " + Math.round(data.currently.dewPoint) + "<i class='wi wi-degrees'></i>");
	$("#visibility").html("Visibility: " + Math.round(data.currently.visibility) + " miles");
	$("#pressure").html("Air Pressure:" + Math.round(data.currently.pressure) + " mb");
}

// Update data with SI units
function displayUnitsSI(data) {
	$("#temperature").html(Math.round(fahrenheitToCelsius(data.currently.temperature)) + "<i class='wi wi-celsius'></i>");
	$("#wind").html("Wind: " + Math.round(mphToMps(data.currently.windSpeed)) + " m/s" + " <i class='wi wi-wind from-" + data.currently.windBearing + "-deg'></i>");
	$("#dewPoint").html("Dew Point: " + Math.round(fahrenheitToCelsius(data.currently.dewPoint)) + "<i class='wi wi-degrees'></i>");
	$("#visibility").html("Visibility: " + Math.round(mileToKm(data.currently.visibility)) + " km");
	$("#pressure").html("Air Pressure:" + Math.round(data.currently.pressure) + " hPa");		
}

// Update weather icon and background color
function updateTheme(str) {
		if(weatherTheme[str].symbol) {
			$("#weatherIconToday").removeClass().addClass("wi " + weatherTheme[str].symbol);
		}
		else {
			$("#weatherIconToday").removeClass().addClass("wi " + weatherTheme["default"].symbol);
			$(".flex-container").removeClass().addClass("flex-container container-fluid " + weatherTheme["default"].background);
		}
		$(".flex-container").removeClass().addClass("flex-container container-fluid " + weatherTheme[str].background);

}

// Unit Conversions
function fahrenheitToCelsius(temp) {
	return ((temp - 32) * 5)/9;
}
function mileToKm(distance) {
	return distance * 1.60934;
}

function mphToMps(velocity) {
	return velocity * 0.44704;
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

// Hide spinner and unhide rows
function onPageLoad() {
	$(".fa-spinner").addClass("hidden");
	$(".row").removeClass("hidden");
}


// BUTTONS FOR TESTING THEMES, REMOVE THESE
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
