$(document).ready(function () {
    updateDate();
    setInterval(updateDate, 15000);

    initWeather();
    updateWeather('47.6101,-122.2015', darkSkyApiKey);
    setInterval(function() {
        updateWeather('47.6101,-122.2015', darkSkyApiKey);
    }, 600000);

    loadGreeting();
    setInterval(loadGreeting, 8640000);

    showBusesForStops();
    setInterval(showBusesForStops, 60000);
});

function updateDate() {
    let date = $('#date');
    date.text(Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date()));
    let time = $('#time');
    time.text(Intl.DateTimeFormat('en', { hour: `numeric`, minute: `numeric`, hour12: true }).format(new Date()));
}

let general_greetings = [
    "You look amazing today.",
    "It's a beautiful day!",
    "You're cool!",
    "Today's a good day."
];

function loadGreeting() {
    var current_greetings = general_greetings.slice();
    if ((new Date()).getDay() == 6) {
        current_greetings.push("It's Friday!");
    }

    var index = Math.floor(Math.random() * current_greetings.length);
    $("#greeting").text(current_greetings[index]);
}
