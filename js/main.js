$(document).ready(function () {
    updateDate();
    setInterval(updateDate, 15000);

    initWeather();
    updateWeather('47.6101,-122.2015', darkSkyApiKey);
    setInterval(updateWeather, 600000);

    loadGreeting();
    setInterval(loadGreeting, 8640000);

    showBusesForStops([67655, 67640]);
    setInterval(showBusesForStops, 60000, [67655, 67640]);
});

function updateDate() {
    let dateTime = moment(new Date());
    let date = $('#date');
    date.text(dateTime.format('dddd, MMMM Do'));
    let time = $('#time');
    time.text(dateTime.format('hh:mm A'));
}

var greetings = [
    "You look amazing today.",
    "It's a beautiful day!",
    "You're cool!",
    "Today's a good day."
];

function loadGreeting() {
    var index = Math.floor(Math.random() * 4);
    $("#greeting").text(greetings[index]);
}
