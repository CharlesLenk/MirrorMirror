$(document).ready(function () {
    updateDate();
    setInterval(updateDate, 15000);

    initWeather();
    updateWeather('47.6101,-122.2015', darkSkyApiKey);
    setInterval(function() {
        updateWeather('47.6101,-122.2015', darkSkyApiKey);
    }, 600000);
});

function updateDate() {
    let dateTime = $('#dateTime');
    dateTime.text(Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric', hour: `numeric`, minute: `numeric`, hour12: true }).format(new Date()));
}

