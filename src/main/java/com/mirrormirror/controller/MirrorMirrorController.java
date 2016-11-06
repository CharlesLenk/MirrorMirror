package com.mirrormirror.controller;

import com.mirrormirror.common.Constants;
import com.mirrormirror.common.CommandResponse;
import com.mirrormirror.service.GreetingService;
import com.mirrormirror.service.onebusaway.remappedresponse.BusesResponse;
import com.mirrormirror.service.onebusaway.OneBusAway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MirrorMirrorController {
    @Autowired
    private SimpMessagingTemplate template;
    @Autowired
    private OneBusAway oneBusAway;
    @Autowired
    private GreetingService greetingService;

    @RequestMapping(
            value = "/mirrormirror/service/onebusaway/stop/{stopid}",
            method = RequestMethod.GET)
    public BusesResponse getBusInfo(
            @PathVariable(value = "stopid") String stopId
    ){
        return oneBusAway.getBusesForStop(stopId);
    }

    @RequestMapping(
            value = "/mirrormirror/service/greeting",
            method = RequestMethod.GET)
    public String getGreeting(){
        return greetingService.getGreeting();
    }


    @RequestMapping(
            value = "/mirrormirror/service/command/{command}/option/{option}",
            method = RequestMethod.GET)
    public ResponseEntity sendCommand(
            @PathVariable(value = "command") String command,
            @PathVariable(value = "option") String option
    ){
        template.convertAndSend(Constants.commandTopic, new CommandResponse(command, option));
        return ResponseEntity.ok().build();
    }
}
