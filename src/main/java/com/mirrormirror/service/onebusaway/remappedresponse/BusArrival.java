package com.mirrormirror.service.onebusaway.remappedresponse;

import java.util.Date;

public class BusArrival {
    private String routeName;
    private String tripHeadsign;
    private Date arrivalTime;
    private Long minutesUntilArrival;

    public BusArrival(String routeName, Date arrivalTime, Long minutesUntilArrival, String tripHeadSign) {
        this.routeName = routeName;
        this.arrivalTime = arrivalTime;
        this.minutesUntilArrival = minutesUntilArrival;
        this.tripHeadsign = tripHeadSign;
    }

    public String getRouteName() {
        return routeName;
    }

    public Date getArrivalTime() {
        return arrivalTime;
    }

    public Long getMinutesUntilArrival() {
        return minutesUntilArrival;
    }

    public String getTripHeadsign() {
        return tripHeadsign;
    }
}
