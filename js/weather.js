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
    46:'sleet'
}

var skycons = new Skycons({"color": "white"});

var updateWeather = function () {
    $.simpleWeather({
        location: '',
        woeid: '2362031',
        unit: 'f',
        success: function(weather) {
            html = '<canvas id="weather-icon" width="150" height="150"></canvas><h2> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
            html += '<div id="region">'+weather.city+', '+weather.region+'</div>';
            html += '<div>'+weather.currently+'</div>';
            html += '<div>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</div>';
            html += '<div><i class="fa fa-angle-up"></i>  High '+weather.high + ' <i class="fa fa-angle-down"></i>  Low ' + weather.low + '</div>'
            $("#weather").html(html);

            var animation = weatherCodeMap[parseInt(weather.code)];
            if (animation == null){
                animation = 'clear-day';
            }
            console.log(animation);

            skycons.set("weather-icon", animation);
            skycons.play();
        },
        error: function(error) {
            $("#weather").html('<p>'+error+'</p>');
        }
    });
};

function startAndShowWeather(){
    updateWeather();
    weatherUpdateIntervalId = setInterval(updateWeather, 600000);
}
