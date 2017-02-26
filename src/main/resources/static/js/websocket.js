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
                hideAll();
            }
            else if (command === 'showMain'){
                hideAll();
                startAndShowWeather();
                startAndShowDate();
                showGreeting();
            }
            else if (command === "showBus"){
                hideAll();
                showBusesForStop(responseJson["option"]);
            }
             else if (command === "showStops"){
                hideAll();
                getStopsForAddress(responseJson["option"]);
            }
            else if (command === "showTodo"){
                hideAll();
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

function hideAll(){
    stopAndHideBusContent();
    stopAndHideWeather();
    stopAndHideDate();
    hideGreeting();
    hideBoard();
}

$(document).ready(function() {
    connect();
});