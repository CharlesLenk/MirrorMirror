var stompClient = null;
function connect() {
    var socket = new SockJS('/mirror');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe("/topic/mirrormirror/commands", function(response){
            console.log(response.body);

            var responseJson = JSON.parse(response.body);
            console.log(responseJson);
            var command = responseJson["command"];
            console.log('Command: ' + command);

            if (command === 'hideAll'){
                stopAndHideBusContent();
                stopAndHideWeather();
                stopAndHideDate();
                hideGreeting();
            }
            else if (command === 'showAll'){
                stopAndHideBusContent();
                startAndShowWeather();
                startAndShowDate();
                showGreeting();
            }
            else if (command === "showBus"){
                stopAndHideWeather();
                stopAndHideDate();
                hideGreeting();
                showBusesForStop(responseJson["option"]);
            }
            else if (command === "todoList"){
                stopAndHideBusContent();
                stopAndHideWeather();
                stopAndHideDate();
                hideGreeting();
                showBoard("In Progress");
            }
            else if (command === "rotateNextList"){
                rotateNextList();
            }
            else if (command === "rotatePreviousList"){
                rotatePreviousList();
            }
        });
    });
}

$(document).ready(function() {
    connect();
});