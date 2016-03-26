package com.mirrormirror.service;

import com.mirrormirror.common.Constants;
import com.mirrormirror.config.GreetingConfig;
import com.mirrormirror.common.CommandResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class GreetingService {
    @Autowired
    private GreetingConfig config;
    @Autowired
    private SimpMessagingTemplate template;

    private String greeting;

    @PostConstruct
    public void setNewGreeting(){
        greeting = config.getRandomGreeting();
    }

    @Scheduled(cron="0 0 0 */1 * *")
    public void sendLoadGreetingCommand(){
        setNewGreeting();
        template.convertAndSend(Constants.commandTopic, new CommandResponse("loadGreeting"));
    }

    public String getGreeting(){
        return greeting;
    }
}
