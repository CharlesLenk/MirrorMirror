/*
 * simpleWeather modified to use the darksky API
 * Author: Charles Lenk
 */
/*! simpleWeather v3.1.0 - http://simpleweatherjs.com */
(function($) {
    'use strict';

    function getAltTemp(unit, temp) {
        if(unit === 'f') {
            return Math.round((5.0/9.0)*(temp-32.0));
        } else {
            return Math.round((9.0/5.0)*temp+32.0);
        }
    }

    function getDay(secondsFromEpoch) {
        let days =["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let date = new Date();
        date.setTime(secondsFromEpoch * 1000);
        return days[date.getDay()];
    }

    $.extend({
        simpleWeather: function(options){
            options = $.extend({
                location: '',
                unit: 'f',
                apiKey: '',
                success: function(weather){},
                error: function(message){}
            }, options);

            if (!(/^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/.test(options.location))) {
                options.error('Location invalid. Must be formatted latitude,longitude');
            }
            let units = options.unit.toLowerCase() === 'f' ? 'us' : 'si';
            let weatherUrl = 'https://api.darksky.net/forecast/' + options.apiKey + '/' + options.location + '/?units=' + units + '&exclude=minutely,hourly,alerts,flags';
            $.ajax({
                url: weatherUrl,
                jsonp: "callback",
                dataType: "jsonp",
                data: {
                    format: "json"
                },
                success: function(result) {
                    if (result !== null) {
                        let compass = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];

                        let weather = {};
                        weather.time = result.currently.time;
                        weather.temp = Math.round(result.currently.temperature);
                        weather.currently = result.currently.summary;
                        weather.icon = result.currently.icon;
                        weather.high = Math.round(result.daily.data[0].temperatureHigh);
                        weather.low = Math.round(result.daily.data[0].temperatureLow);
                        weather.humidity = result.currently.humidity;
                        weather.visibility = result.currently.visibility;
                        weather.sunrise = result.daily.data[0].sunriseTime;
                        weather.sunset = result.daily.data[0].sunsetTime;
                        weather.timezone = result.timezone;
                        weather.summary = result.daily.summary;

                        weather.units = {
                            temp: options.unit.toUpperCase(),
                            distance: options.unit === "f" ? "mi" : "km",
                            speed: options.unit === "f" ? "mph" : "m/s",
                        };

                        weather.wind = {
                            direction: compass[Math.round(result.currently.windBearing / 22.5)],
                            speed: Math.round(result.currently.windSpeed)
                        };

                        weather.alt = {
                            temp: getAltTemp(options.unit, weather.temp),
                            high: getAltTemp(options.unit, weather.high),
                            low: getAltTemp(options.unit, weather.low),
                            unit: options.unit === 'f' ? "C" : "F"
                        };

                        weather.forecast = [];
                        for (var i = 0; i < result.daily.data.length; i++) {
                            let forecast = {};
                            forecast.time = result.daily.data[i].time;
                            forecast.high = Math.round(result.daily.data[i].temperatureHigh);
                            forecast.low = Math.round(result.daily.data[i].temperatureLow);
                            forecast.day = getDay(result.daily.data[i].time);
                            forecast.icon = result.daily.data[i].icon;
                            forecast.alt = {
                                high: getAltTemp(options.unit, forecast.high),
                                low: getAltTemp(options.unit, forecast.low)
                            };
                            weather.forecast.push(forecast);
                        }

                        options.success(weather);
                    } else {
                        options.error('There was a problem retrieving the latest weather information.');
                    }
                }
            });
            return this;
        }
    });
})(jQuery);
