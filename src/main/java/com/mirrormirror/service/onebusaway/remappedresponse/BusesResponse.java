package com.mirrormirror.service.onebusaway.remappedresponse;

import java.util.ArrayList;
import java.util.List;

public class BusesResponse {
    private List<BusArrival> buses;
    private String stopName;

    public BusesResponse() {
        buses = new ArrayList<>();
    }

    public List<BusArrival> getBuses() {
        return buses;
    }

    public void addBusArrival(BusArrival arrival) {
        buses.add(arrival);
    }

    public String getStopName() {
        return stopName;
    }

    public void setStopName(String stopName) {
        this.stopName = stopName;
    }
}
