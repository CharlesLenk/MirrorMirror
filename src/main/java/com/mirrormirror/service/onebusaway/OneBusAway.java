package com.mirrormirror.service.onebusaway;

import com.mirrormirror.common.DateUtil;
import com.mirrormirror.service.onebusaway.remappedresponse.BusArrival;
import com.mirrormirror.service.onebusaway.remappedresponse.BusesResponse;
import com.mirrormirror.service.onebusaway.rawresponse.ArrivalAndDeparture;
import com.mirrormirror.service.onebusaway.rawresponse.ObaResponse;
import com.mirrormirror.service.onebusaway.rawresponse.Stop;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.Date;

@Component
public class OneBusAway {

    public BusesResponse getBusesForStop(String stopId) {
        RestTemplate template = new RestTemplate();
        ResponseEntity<ObaResponse> response = template.getForEntity("http://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/" + stopId + ".json?key=TEST", ObaResponse.class);
        ArrivalAndDeparture[] arrivals = response.getBody().getData().getEntry().getArrivalsAndDepartures();

        Date now = Date.from(Instant.now());
        BusesResponse busesResponse = new BusesResponse();
        for (ArrivalAndDeparture arrival : arrivals) {
            Date arrivalTime;
            if (arrival.getPredictedArrivalTime().getTime() != 0) {
                arrivalTime = arrival.getPredictedArrivalTime();
            } else {
                arrivalTime = arrival.getScheduledArrivalTime();
            }

            busesResponse.addBusArrival(new BusArrival(
                    arrival.getRouteShortName(),
                    arrivalTime,
                    DateUtil.getMinutesBetweenDates(arrivalTime, now),
                    arrival.getTripHeadsign()));
        }
        busesResponse.setStopName(getStopName(stopId, response.getBody()));
        return busesResponse;
    }

    private String getStopName(String stopId, ObaResponse ObaResponse){
        Stop[] stops = ObaResponse.getData().getReferences().getStops();

        for (Stop stop : stops) {
            if (stop.getId().equals(stopId)) {
                return stop.getName();
            }
        }
        return "Error getting stop name!";
    }
}
