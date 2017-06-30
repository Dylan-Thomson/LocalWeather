var temperature;

// Themes for each weather condition
// TODO: Move styles to CSS using classes
var weatherTheme = {
	"clear-day": {
		symbol: "wi-day-sunny",
		background: "rgb(189, 247, 255)",
		symbolColor: "rgb(255, 203, 90)",
		color: "rgb(255, 255, 255)"
	},

	"clear-night": {
		symbol: "wi-night-clear",
		background: "rgb(75, 89, 94)",
		symbolColor: "rgb(233, 227, 211)",
		color: "rgb(255, 255, 255)"
	},
	"rain": {
		symbol: "wi-rain",
		background: "rgb(138, 208, 205)",
		symbolColor: "rgb(55, 142, 139)",
		color: "rgb(255, 255, 255)"
	},
	"snow": {
		symbol: "wi-snow",
		background: "rgb(75, 89, 94)",
		symbolColor: "rgb(255,250,250)",
		color: "rgb(255, 255, 255)"
	},
	"sleet": {
		symbol: "wi-sleet",
		background: "rgb(75, 89, 94)",
		symbolColor: "rgb(142, 195, 195)",
		color: "rgb(255, 255, 255)"
	},
	"wind": {
		symbol: "wi-windy",
		background: "rgb(90, 89, 104)",
		symbolColor: "rgb(235, 233, 218)",
		color: "rgb(235, 233, 218)"
	},
	"fog": {
		symbol: "wi-fog",
		background:	"rgb(90, 89, 104)",
		symbolColor: "rgb(154, 153, 163)",
		color: "rgb(255, 255, 255)"
	},
	"cloudy": {
		symbol: "wi-cloudy",
		background:	"rgb(90, 89, 104)",
		symbolColor: "rgb(154, 153, 163)",
		color: "rgb(255, 255, 255)"
	},
	"partly-cloudy-day": {
		symbol: "wi-day-cloudy",
		background: "rgb(138, 208, 206)",
		symbolColor: "rgb(255, 214, 134)",
		color: "rgb(255, 255, 255)"
	},
	"partly-cloudy-night": {
		symbol: "wi-night-alt-cloudy",
		background: "rgb(75, 89, 94)",
		symbolColor: "rgb(133, 143, 146)",
		color: "rgb(255, 255, 255)"
	},
	"partly-cloudy": {
		symbol: "wi-day-cloudy",
		background: "rgb(138, 208, 206)",
		symbolColor: "rgb(255, 255, 255)",
		color: "rgb(255, 255, 255)"
	}
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
			$(".fa-spinner").addClass("hidden");
			$(".row").removeClass("hidden");

			// Update page with weather data
			temperature = Math.round(data.currently.temperature);
			$("#time").text(timeConverter(data.currently.time));
			$("#temperature").html(temperature + "<i class='wi wi-fahrenheit'></i>");
			$("#weatherIconToday").addClass(weatherTheme[data.currently.icon].symbol);

			$("#currentlySummary").text(data.currently.summary);
			$("#minutelySummary").text(data.minutely.summary);
			$("#hourlySummary").text(data.hourly.summary);
			$("#wind").html("Wind: " + Math.round(data.currently.windSpeed) + " MPH" + " <i class='wi wi-wind from-" + data.currently.windBearing + "-deg'></i>");
			$("#humidity").html("Humidity: " + Math.round(data.currently.humidity * 100) + "%");
			$("#dewPoint").html("Dew Point: " + Math.round(data.currently.dewPoint) + "<i class='wi wi-degrees'></i>");
			$("#uvIndex").html("UV Index: " + data.currently.uvIndex);
			$("#visibility").html("Visibility: " + data.currently.visibility + " miles");

			$("#pressure").html("Air Pressure:" + Math.round(data.currently.pressure) + " mB");
			// Style new content
			updateTheme(data.currently.icon);
		});
	});
}
else {
	$("#summary").text("GEOLOCATION IS NOT SUPPORTED BY YOUR BROWSER");
}


// Convert Temperature between F and C
var fahrenheit = true;
// $("#temperature").on("click", function() {
// 	// TODO: Refractor
// 	if(fahrenheit) {
// 		temperature = fahrenheitToCelsius(temperature);
// 		$("#temperature").html(Math.round(temperature) + "<i class='wi wi-celsius'></i>");
// 		fahrenheit = false;
// 	}
// 	else {
// 		temperature = celsiusToFahrenheit(temperature);
// 		$("#temperature").html(Math.round(temperature) + "<i class='wi wi-fahrenheit'></i>");
// 		fahrenheit = true;
// 	}
// });

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

//TODO replace css with addclass
function updateTheme(str) {
		$("#weatherIconToday").removeClass();
		$("#weatherIconToday").addClass("wi");
		$("#weatherIconToday").addClass(weatherTheme[str].symbol);
		// $(".flex-container").css("background", weatherTheme[str].background);
		// $("#weatherIconToday").css("color", weatherTheme[str].symbolColor);
		// $(".flex-container").css("color", weatherTheme[str].color);
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
