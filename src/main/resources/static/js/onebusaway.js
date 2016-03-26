var busesUpdateIntervalId;

function loadOneBusAway(stopId){
    $.getJSON("http://localhost:8080/mirrormirror/service/onebusaway/stop/" + stopId, function(json) {
        var html = '<div class="bussTitle">' + json['stopName'] + '</div>';
        html +='<table>';
        for (index in json['buses']){
            html += '<tr>';
            html += '<td>' + json['buses'][index]['routeName'] + '</td>';
            html += '<td><div class="nameColumn">' + json['buses'][index]['tripHeadsign'] + '<br>'
            html += moment(json['buses'][index]['arrivalTime']).format('hh:mm A') + '</div></td>';
            html += '<td>' + json['buses'][index]['minutesUntilArrival'] + '</td>';
            html += '</tr>';
        }
        html+='</table>';
        $("#buses").html(html);
    });
}

function showBusesForStop(stopId){
    loadOneBusAway(stopId);
    clearInterval(busesUpdateIntervalId);
    busesUpdateIntervalId = setInterval(loadOneBusAway(stopId), 30000);
    $("#buses").removeClass("hidden");
}

function stopAndHideBusContent(){
   if (!$("#buses").hasClass("hidden")){
      $("#buses").addClass("hidden");
      clearInterval(busesUpdateIntervalId);
   }
}