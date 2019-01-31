var weatherCodeMap = {
    0: 'sleet',
    1: 'sleet',
    2: 'sleet',
    3: 'sleet',
    4: 'sleet',
    5: 'snow',
    6: 'snow',
    7: 'snow',
    8: 'snow',
    9: 'rain',
    10: 'snow',
    11: 'rain',
    12: 'rain',
    13: 'snow',
    14: 'snow',
    15: 'snow',
    16: 'snow',
    17: 'sleet',
    18: 'sleet',
    19: 'fog',
    20: 'fog',
    21: 'fog',
    22: 'fog',
    23: 'wind',
    24: 'wind',
    25: 'cloudy',
    26: 'cloudy',
    27: 'partly-cloudy-night',
    28: 'partly-cloudy-day',
    29: 'partly-cloudy-night',
    30: 'partly-cloudy-day',
    31: 'clear-night',
    32: 'clear-day',
    33: 'clear-night',
    34: 'clear-day',
    35: 'sleet',
    36: 'clear-day',
    37: 'sleet',
    38: 'sleet',
    39: 'sleet',
    40: 'rain',
    41: 'snow',
    42: 'snow',
    43: 'snow',
    44: 'partly-cloudy-day',
    45: 'sleet',
    46: 'snow',
    47: 'sleet'
};

var skycons = new Skycons({"color": "white"});

function initWeather() {
    let html = '';
    for (var i = 1; i <= 5; i++) {
        let name = "weather-row-" + i + "-";
        html += '<tr>';
        html += '<td id="' + (name + "day") + '">' + name + '</td>';
        html += '<td><canvas id="' + (name + "icon-forecast") + '" width="40" height="40"></canvas></td>';
        html += '<td id="' + (name + "high") + '"></td>';
        html += '<td class="low" id="' + (name + "low") + '"></td>';
        html += '</tr>';
    }
    $("#weatherTable").html(html);
}

function updateWeather(location, apiKey) {
    $.simpleWeather({
        location: location,
        apiKey: apiKey,
        unit: 'f',
        success: function (weather) {
            $("#temperature").html(weather.temp + '&deg;' + weather.units.temp.toUpperCase());
            let html = '<div>' + weather.currently + '</div>';
            html += '<div>' + weather.wind.direction + ' ' + weather.wind.speed + ' ' + weather.units.speed + '</div>';
            html += '<div><i class="fa fa-angle-up"></i>  High ' + weather.high + ' <i class="fa fa-angle-down"></i> Low ' + weather.low + '</div>';
            $("#weatherDynamic").html(html);

            let animation;
            for (var i = 1; i <= 5; i++) {
                let name = "weather-row-" + i + "-";
                $("#" + name + "day").text(weather.forecast[i].day + ".");
                $("#" + name + "high").text(weather.forecast[i].high);
                $("#" + name + "low").text(weather.forecast[i].low);
                skycons.set(name + "icon-forecast", weather.forecast[i].icon);
                skycons.play();
            }

            animation = weatherCodeMap[parseInt(weather.code)];
            if (animation == null) {
                animation = 'clear-day';
            }
            skycons.set("weather-icon", animation);
            skycons.play();
        },
        error: function (error) {
            console.error(error);
            $("#weatherDynamic").html('<p>' + error + '</p>');
        }
    });
}
