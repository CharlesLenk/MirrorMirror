var greetings = [
    "You look amazing today.",
    "It's a beautiful day!",
    "You're cool!",
    "Today's a good day."
];

var loadGreeting = function () {
    var index = Math.floor(Math.random() * 4);
    $("#greeting").text(greetings[index]);
}

function showGreeting(){
    if ($("#greeting").hasClass("hidden")){
        $("#greeting").removeClass("hidden");
    }
}

function hideGreeting(){
   if (!$("#greeting").hasClass("hidden")){
      $("#greeting").addClass("hidden");
   }
}

var greetingIntervalId = setInterval(loadGreeting, 8640000);