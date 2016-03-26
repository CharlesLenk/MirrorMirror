package com.mirrormirror.service.onebusaway.rawresponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ObaResponse {
    private Integer code;
    private long currentTime;
    private Data data;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public long getCurrentTime() {
        return currentTime;
    }

    public void setCurrentTime(long currentTime) {
        this.currentTime = currentTime;
    }

    public Data getData() {
        return data;
    }

    public void setData(Data data) {
        this.data = data;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public class Data{
        private Entry entry;
        private References references;

        public Entry getEntry() {
            return entry;
        }

        public void setEntry(Entry entry) {
            this.entry = entry;
        }

        public References getReferences() {
            return references;
        }

        public void setReferences(References references) {
            this.references = references;
        }

        @JsonIgnoreProperties(ignoreUnknown = true)
        public class Entry{
            private ArrivalAndDeparture[] arrivalsAndDepartures;

            public ArrivalAndDeparture[] getArrivalsAndDepartures() {
                return arrivalsAndDepartures;
            }

            public void setArrivalsAndDepartures(ArrivalAndDeparture[] arrivalsAndDepartures) {
                this.arrivalsAndDepartures = arrivalsAndDepartures;
            }
        }
    }
}
