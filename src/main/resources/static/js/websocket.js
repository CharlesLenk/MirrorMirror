var stompClient = null;
function connect() {
    var socket = new SockJS('/hello');
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
                stopAndHideWeather();
                stopAndHideDate();
                hideGreeting();
            }
            else if (command === 'showAll'){
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
            else if (command === "loadGreeting"){
                loadGreeting();
            }
        });
    });
}

//function showGreeting(message) {
//    var response = document.getElementById('response');
//    var p = document.createElement('p');
//    p.style.wordWrap = 'break-word';
//    p.appendChild(document.createTextNode(message));
//    response.appendChild(p);
//}

$(document).ready(function() {
    connect();
});