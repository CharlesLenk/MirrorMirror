var busesUpdateIntervalId;

var loadFunction = function loadOneBusAway(stopId){
    $.getJSON("http://localhost:8080/mirrormirror/service/onebusaway/stop/" + stopId, function(json) {
        var date = new Date();

        var stopName;
        var stops = json['data']['references']['stops'];
        for (index in stops) {
            if (stops[index]['id'] === stopId) {
                stopName = stops[index]['name'];
            }
        }

        var html = '<div class="bussTitle">' + stopName + '</div>';
        html +='<table>';

        var arrivals = json['data']['entry']['arrivalsAndDepartures'];
        for (index in arrivals) {
            var arrivalTime;
            if (arrivals[index]['predictedArrivalTime']['time'] !== 0) {
                arrivalTime = arrivals[index]['predictedArrivalTime'];
            } else {
                arrivalTime = arrivals[index]['scheduledArrivalTime'];
            }

            var minutes = Math.round((arrivalTime - date.getTime()) / 60000);

            html += '<tr>';
            html += '<td>' + arrivals[index]['routeShortName'] + '</td>';
            html += '<td><div class="nameColumn">' + arrivals[index]['tripHeadsign'] + '<br>'
            html += moment(arrivalTime).format('hh:mm A') + '</div></td>';
            html += '<td>' + minutes + '</td>';
            html += '</tr>';
        }

        html+='</table>';
        $("#buses").html(html);
    });
}

function showBusesForStop(stopId){
    loadFunction(stopId);
    clearInterval(busesUpdateIntervalId);
    busesUpdateIntervalId = setInterval(loadFunction, 30000, stopId);
    $("#buses").removeClass("hidden");
}

function stopAndHideBusContent(){
   if (!$("#buses").hasClass("hidden")){
      $("#buses").addClass("hidden");
      clearInterval(busesUpdateIntervalId);
   }
}