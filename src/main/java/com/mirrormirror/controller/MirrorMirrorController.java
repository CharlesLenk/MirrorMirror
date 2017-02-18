package com.mirrormirror.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.mirrormirror.common.CommandResponse;
import com.mirrormirror.service.mqtt.MqttProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class MirrorMirrorController {
    @Autowired
    private MqttProcessor mqttProcessor;

    private RestTemplate restTemplate = new RestTemplate();

    @RequestMapping(
            value = "/mirrormirror/service/onebusaway/stop/{stopid}",
            method = RequestMethod.GET)
    public JsonNode getBusInfo(
            @PathVariable(value = "stopid") String stopId
    ){
        ResponseEntity<JsonNode> response =
                restTemplate.getForEntity("http://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/"
                        + stopId + ".json?key=TEST", JsonNode.class);
        return response.getBody();
    }

    @RequestMapping(
            value = "/mirrormirror/service/command/{command}/option/{option}",
            method = RequestMethod.GET)
    public ResponseEntity sendCommand(
            @PathVariable(value = "command") String command,
            @PathVariable(value = "option") String option
    ){
        mqttProcessor.sendCommand(new CommandResponse(command, option));
        return ResponseEntity.ok().build();
    }
}
