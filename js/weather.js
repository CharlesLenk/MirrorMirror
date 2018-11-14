var weatherUpdateIntervalId;

var weatherCodeMap = {
    0:'sleet',
    1:'sleet',
    2:'sleet',
    3:'sleet',
    4:'sleet',
    5:'snow',
    6:'snow',
    7:'snow',
    8:'snow',
    9:'rain',
    10:'snow',
    11:'rain',
    12:'rain',
    13:'snow',
    14:'snow',
    15:'snow',
    16:'snow',
    17:'sleet',
    18:'sleet',
    19:'fog',
    20:'fog',
    21:'fog',
    22:'fog',
    23:'wind',
    24:'wind',
    25:'cloudy',
    26:'cloudy',
    27:'partly-cloudy-night',
    28:'partly-cloudy-day',
    29:'partly-cloudy-night',
    30:'partly-cloudy-day',
    31:'clear-night',
    32:'clear-day',
    33:'clear-night',
    34:'clear-day',
    35:'sleet',
    36:'clear-day',
    37:'sleet',
    38:'sleet',
    39:'sleet',
    40:'rain',
    41:'snow',
    42:'snow',
    43:'snow',
    44:'partly-cloudy-day',
    45:'sleet',
    46:'snow',
    47:'sleet'
};

var skycons = new Skycons({"color": "white"});

var updateWeather = function () {
    $.simpleWeather({
        location: '',
        woeid: '2362031',
        unit: 'f',
        success: function(weather) {
            html = '<h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
            html += '<div id="region">'+weather.city+', '+weather.region+'</div>';
            html += '<div>'+weather.currently+'</div>';
            html += '<div>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</div>';
            html += '<div><i class="fa fa-angle-up"></i>  High '+weather.high + ' <i class="fa fa-angle-down"></i>  Low ' + weather.low + '</div>';

            html += '<div><table>';
            for (var i = 1; i < 6; i++) {
                html += '<tr>';
                html += '<td>'+weather.forecast[i].day + '.</td>';
                console.log("weather-icon-" + i);
                let canvasName = "weather-icon-" + i;
                html += '<td><canvas id="' + canvasName + '" width="25" height="25"></canvas></td>';
                html += '<td>' + weather.forecast[i].high + '</td>';
                html += '<td class="low">' + weather.forecast[i].low + '</td>';
                html += '</tr>';
            }
            html += '</table></div>';

            $("#weatherDynamic").html(html);

            for (var i = 1; i < 6; i++) {
                var animatio = weatherCodeMap[parseInt(weather.forecast[i].code)];
                if (animatio == null){
                    animatio = 'clear-day';
                }
                console.log(animatio);
                console.log("weather-icon-" + i);
                skycons.set("weather-icon-" + i, animatio);
                skycons.play();
            }

            var animation = weatherCodeMap[parseInt(weather.code)];
            if (animation == null){
                animation = 'clear-day';
            }
            console.log(animation);

            skycons.set("weather-icon", animation);
            skycons.play();
        },
        error: function(error) {
            $("#weatherDynamic").html('<p>'+error+'</p>');
        }
    });
};

function startAndShowWeather(){
    updateWeather();
    weatherUpdateIntervalId = setInterval(updateWeather, 600000);
}
