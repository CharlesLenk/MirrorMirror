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
    let date = $('#date');
    date.text(Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date()));
    
    let time = $('#time');
    time.text(Intl.DateTimeFormat('en', { hour: `numeric`, minute: `numeric`, hour12: true }).format(new Date()));
}

