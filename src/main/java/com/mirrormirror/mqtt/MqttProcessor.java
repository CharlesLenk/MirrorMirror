package com.mirrormirror.mqtt;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.eclipse.paho.client.mqttv3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;

// TODO Add real logging
@Component
public class MqttProcessor implements MqttCallback {
    private static final String COMMAND_TOPIC = "/topic/mirrormirror/commands";

    private SimpMessagingTemplate template;
    private ObjectMapper mapper;
    private MqttClientWrapper mqttClient;

    @Autowired
    public MqttProcessor(MqttClientWrapper mqttClient, ObjectMapper mapper, SimpMessagingTemplate template) {
        this.mqttClient = mqttClient;
        this.mapper = mapper;
        this.template = template;

        mqttClient.setCallback(this);
        mqttClient.connect();
    }

    @Override
    public void connectionLost(Throwable cause) {
        System.out.println("MQTT connection lost with error: " + cause.getMessage());
        template.convertAndSend(COMMAND_TOPIC, "{\"command\":\"showError\", " +
                "\"option\":\"Lost connection with error: " + cause.getMessage() + "\"}");

        while (!mqttClient.isConnected()){
            mqttClient.connect();
            Util.sleepForMs(10000);
        }
    }

    @Override
    public void messageArrived(String topic, MqttMessage mqttMessage) {
        System.out.println("Received message: " + mqttMessage.toString());
        template.convertAndSend(COMMAND_TOPIC, mqttMessage.toString());
    }

    @Override
    public void deliveryComplete(IMqttDeliveryToken iMqttDeliveryToken) {
        // App is read only
    }
}
