var temperature;

// Themes for each weather condition
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
		color: "rgb(235, 233, 218)"
	},
	"cloudy": {
		symbol: "wi-cloudy",
		background:	"rgb(90, 89, 104)",
		symbolColor: "rgb(154, 153, 163)",
		color: "rgb(235, 233, 218)"
	},
	"partly-cloudy-day": {
		symbol: "wi-day-cloudy",
		background: "rgb(138, 208, 206)",
		symbolColor: "rgb(255, 214, 134)",
		color: "rgb(55, 142, 139)"
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

$("#clearday").on("click", function() {
		$("#weatherIconToday").addClass(weatherTheme["clear-day"].symbol);
		$(".row").css("background", weatherTheme["clear-day"].background);
		$("#weatherIconToday").css("color", weatherTheme["clear-day"].symbolColor);
		$(".row").css("color", weatherTheme["clear-day"].color);
});

$("#clearnight").on("click", function() {
		$("#weatherIconToday").addClass(weatherTheme["clear-night"].symbol);
		$(".row").css("background", weatherTheme["clear-night"].background);
		$("#weatherIconToday").css("color", weatherTheme["clear-night"].symbolColor);
		$(".row").css("color", weatherTheme["clear-night"].color);
});

$("#rain").on("click", function() {
		$("#weatherIconToday").addClass(weatherTheme["rain"].symbol);
		$(".row").css("background", weatherTheme["rain"].background);
		$("#weatherIconToday").css("color", weatherTheme["rain"].symbolColor);
		$(".row").css("color", weatherTheme["rain"].color);
});

$("#snow").on("click", function() {
		$("#weatherIconToday").addClass(weatherTheme["snow"].symbol);
		$(".row").css("background", weatherTheme["snow"].background);
		$("#weatherIconToday").css("color", weatherTheme["snow"].symbolColor);
		$(".row").css("color", weatherTheme["snow"].color);
});

$("#sleet").on("click", function() {
		$("#weatherIconToday").addClass(weatherTheme["sleet"].symbol);
		$(".row").css("background", weatherTheme["sleet"].background);
		$("#weatherIconToday").css("color", weatherTheme["sleet"].symbolColor);
		$(".row").css("color", weatherTheme["sleet"].color);
});

$("#windy").on("click", function() {
		$("#weatherIconToday").addClass(weatherTheme["wind"].symbol);
		$(".row").css("background", weatherTheme["wind"].background);
		$("#weatherIconToday").css("color", weatherTheme["wind"].symbolColor);
		$(".row").css("color", weatherTheme["wind"].color);
});

$("#fog").on("click", function() {
		$("#weatherIconToday").addClass(weatherTheme["fog"].symbol);
		$(".row").css("background", weatherTheme["fog"].background);
		$("#weatherIconToday").css("color", weatherTheme["fog"].symbolColor);
		$(".row").css("color", weatherTheme["fog"].color);
});

$("#cloudy").on("click", function() {
		$("#weatherIconToday").addClass(weatherTheme["cloudy"].symbol);
		$(".row").css("background", weatherTheme["cloudy"].background);
		$("#weatherIconToday").css("color", weatherTheme["cloudy"].symbolColor);
		$(".row").css("color", weatherTheme["cloudy"].color);
});

$("#pcd").on("click", function() {
		$("#weatherIconToday").addClass(weatherTheme["partly-cloudy-day"].symbol);
		$(".row").css("background", weatherTheme["partly-cloudy-day"].background);
		$("#weatherIconToday").css("color", weatherTheme["partly-cloudy-day"].symbolColor);
		$(".row").css("color", weatherTheme["partly-cloudy-day"].color);
});

$("#pcn").on("click", function() {
		$("#weatherIconToday").addClass(weatherTheme["partly-cloudy-night"].symbol);
		$(".row").css("background", weatherTheme["partly-cloudy-night"].background);
		$("#weatherIconToday").css("color", weatherTheme["partly-cloudy-night"].symbolColor);
		$(".row").css("color", weatherTheme["partly-cloudy-night"].color);
});

$("#pc").on("click", function() {
		$("#weatherIconToday").addClass(weatherTheme["partly-cloudy"].symbol);
		$(".row").css("background", weatherTheme["partly-cloudy"].background);
		$("#weatherIconToday").css("color", weatherTheme["partly-cloudy"].symbolColor);
		$(".row").css("color", weatherTheme["partly-cloudy"].color);
});

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
			$(".fa-spinner").addClass("hidden");
			temperature = Math.round(data.currently.temperature);
			$("#time").text(timeConverter(data.currently.time));
			$("#temperature").html(temperature + "<i class='wi wi-fahrenheit'></i>");
			$("#weatherIconToday").addClass(weatherTheme[data.currently.icon].symbol);

			$("#summary").text(data.currently.summary);
			// $("#pressure").html("Air Pressure:" + data.currently.pressure);
			$("#humidity").html("Humidity: " + Math.round(data.currently.humidity * 100) + "%");
			$("#wind").html("Wind: " + data.currently.windSpeed + "MPH");

			// Style new content
			$(".row").css("background", weatherTheme[data.currently.icon].background);
			$(".row").css("color", weatherTheme	[data.currently.icon].color);
			$("#weatherIconToday").css("color", weatherTheme[data.currently.icon].symbolColor);
		});
	});
}
else {
	$("#summary").text("GEOLOCATION IS NOT SUPPORTED BY YOUR BROWSER");
}


// Convert Temperature between F and C
var fahrenheit = true;
$("#temperature").on("click", function() {
	// TODO: Refractor
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

// TODO: Refractor
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
  if(hour = 12) {
  	return  date + " " + month + " " + year + " " + hour + ":" + ('0' + min).slice(-2) + " PM";

  }
  return date + " " + month + " " + year + " " + hour + ":" + ('0' + min).slice(-2) + " AM";
}