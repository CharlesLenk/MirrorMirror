function loadOneBusAway(stopId, routeFilter) {
    stopId = "1_" + stopId;
    $.ajax({
        url: "http://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/" + stopId + ".json?key=TEST",
        jsonp: "callback",
        dataType: "jsonp",
        data: {
            format: "json"
        },
        success: function (response) {
            console.log(response);
            var json = response;
            var date = new Date();

            var stopName;
            var stops = json['data']['references']['stops'];
            for (index in stops) {
                if (stops[index]['id'] === stopId) {
                    stopName = stops[index]['name'];
                }
            }

            var htmlStopName = stopName.replace(/&|\s+/g, '');
            var stopElement = $("#" + htmlStopName);
            if (stopElement.length === 0) {
                $("#buses").html($("#buses").html() + "<div id=" + htmlStopName + "></div>");
                stopElement = $("#" + htmlStopName);
            }


            var html = '<table>';
            html += '<tr><th class="bussTitle" colspan="3">' + stopName + '</th></tr>';
            var arrivals = json['data']['entry']['arrivalsAndDepartures'];
            let matchCount = 0;
            for (i = 0; i < arrivals.length && matchCount < 3; i++) {
                if ($.inArray(arrivals[i]['routeShortName'], routeFilter) !== -1) {
                    matchCount += 1;

                    var arrivalTime;
                    if (arrivals[i]['predictedArrivalTime'] !== 0) {
                        arrivalTime = arrivals[i]['predictedArrivalTime'];
                    } else {
                        arrivalTime = arrivals[i]['scheduledArrivalTime'];
                    }

                    var minutes = Math.round((arrivalTime - date.getTime()) / 60000);

                    html += '<tr>';
                    html += '<td><div class="routeNumber">' + arrivals[i]['routeShortName'] + '</div></td>';
                    html += '<td><div class="nameColumn">' + arrivals[i]['tripHeadsign'] + '</div></td>';
                    html += '<td>' + minutes + '</td>';
                    html += '</tr>';
                }
            }

            html += '</table>';
            stopElement.html(html);
        }
    });
}

function showBusesForStops(stopIds) {
    console.log(stopIds);
    for (index in stopIds) {
        loadOneBusAway(stopIds[index], ["271", "550E"]);
    }
}
