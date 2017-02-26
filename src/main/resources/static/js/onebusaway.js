var busesUpdateIntervalId;

var loadFunction = function loadOneBusAway(stopId){
    stopId = "1_" + stopId;
    $.post("http://localhost:8080/mirrormirror/service/doAgentGet", "http://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/" + stopId + ".json?key={oba.key}",
    function(json) {
        console.log(json);
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
            html += '<td><div class="nameColumn">' + arrivals[index]['tripHeadsign'] + '<br>';
            html += moment(arrivalTime).format('hh:mm A') + '</div></td>';
            html += '<td>' + minutes + '</td>';
            html += '</tr>';
        }

        html+='</table>';
        $("#buses").html(html);
    });
}

var directions = {
    "N": "<span style=\"color: #2554C7\">North</span>",
    "NE": "<span style=\"color: #2554C7\">North</span><span style=\"color: #FFA62F\">east</span>",
    "E": "<span style=\"color: #FFA62F\">East</span>",
    "SE": "<span style=\"color: red\">South</span><span style=\"color: #FFA62F\">east</span>",
    "S": "<span style=\"color: red\">South</span>",
    "SW": "<span style=\"color: red\">South</span><span style=\"color: green\">west</span>",
    "W": "<span style=\"color: green\">West</span>",
    "NW": "<span style=\"color: #2554C7\">North</span><span style=\"color: green\">west</span>"
}

function getStopsForAddress(address){
    $.post("http://localhost:8080/mirrormirror/service/doAgentGet", "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key={googlemaps.key}",
    function(locationJson) {
        var lat = locationJson["results"][0]["geometry"]["location"]["lat"];
        var lng = locationJson["results"][0]["geometry"]["location"]["lng"];
        var formattedAddress = locationJson["results"][0]["formatted_address"].split(",")[0];
        $.post("http://localhost:8080/mirrormirror/service/doAgentGet", "http://api.pugetsound.onebusaway.org/api/where/stops-for-location.json?key={oba.key}&radius=150&lat=" + lat + "&lon=" + lng,
        function(stopJson) {
            console.log(stopJson);
            var routes = stopJson["data"]["references"]["routes"];
            var routeMap = {};
            for (index in routes) {
                routeMap[routes[index]["id"]] = routes[index]["shortName"];
            }

            var html = '<div class="bussTitle">Stops near ' + formattedAddress + '</div><table class="listTable">';
            var stops = stopJson["data"]["list"];
            for (index in stops){
                html += '<tr>';
                html += '<td>' + stops[index]["id"].substring(2) + '</td>';
                html += '<td><div class="nameColumn">' + stops[index]["name"];
                var stopDirection =  directions[stops[index]["direction"]];
                if (stopDirection){
                    html += " " + stopDirection;
                }
                html += "<br>";
                var routeIds = [];
                for (routeIndex in stops[index]['routeIds']) {
                    routeIds.push(routeMap[stops[index]['routeIds'][routeIndex]]);
                }
                html += "Routes: " + routeIds.join(", ");
                html += '</div></td></tr>';
            }
            html+='</table></div>';
            $("#buses").html(html);
            $("#buses").removeClass("hidden");
        });
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