package com.mirrormirror.service.mqtt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mirrormirror.common.Constants;
import com.mirrormirror.common.Util;
import com.mirrormirror.service.mqtt.MqttClientWrapper;
import com.mirrormirror.common.CommandResponse;
import org.eclipse.paho.client.mqttv3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;

// TODO Add real logging
@Component
public class MqttProcessor implements MqttCallback {
    @Autowired
    SimpMessagingTemplate template;
    @Autowired
    ObjectMapper mapper;
    @Autowired
    MqttClientWrapper mqttClient;

    @PostConstruct
    public void init() {
        mqttClient.setCallback(this);
        mqttClient.connect();
    }

    @Override
    public void connectionLost(Throwable cause) {
        System.out.println("MQTT connection lost with error: " + cause.getMessage());
        template.convertAndSend(Constants.commandTopic,
                new CommandResponse("showError", "Lost connection with error: " + cause.getMessage()));

        while (!mqttClient.isConnected()){
            mqttClient.connect();
            Util.sleepForMs(10000);
        }
    }

    @Override
    public void messageArrived(String topic, MqttMessage mqttMessage) {
        System.out.println("Received message: " + mqttMessage.toString());
        try {
            CommandResponse command = mapper.readValue(mqttMessage.toString(), CommandResponse.class);
            template.convertAndSend(Constants.commandTopic, command);
        }
        catch (IOException e){
            System.out.println("Failed to parse MQTT message as command: " + mqttMessage.toString() + "\nError: " + e.getMessage());
        }
    }

    @Override
    public void deliveryComplete(IMqttDeliveryToken iMqttDeliveryToken) {
        // App is read only
    }
}
