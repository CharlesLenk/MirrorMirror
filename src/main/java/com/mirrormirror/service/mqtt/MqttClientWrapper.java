package com.mirrormirror.service.mqtt;

import com.mirrormirror.common.Util;
import com.mirrormirror.config.MqttProperties;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;
import java.security.KeyStore;
import java.security.SecureRandom;

@Component
public class MqttClientWrapper {
    @Value("${keystore.password}")
    private char[] password;
    @Value("${aws.mqtt.id}")
    private String mqttId;
    @Autowired
    private MqttProperties properties;

    private MqttConnectOptions connectOptions;
    private MqttClient mqttClient;

    @PostConstruct
    public void init() throws Exception{
        // Load CA cert
        TrustManagerFactory trustManagerFactory = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
        KeyStore keyStore = Util.readKeyStore(properties.getTrustedKeyStorePath(), password);
        trustManagerFactory.init(keyStore);

        // Load client cert
        KeyManagerFactory keyManagerFactory = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm());
        keyStore = Util.readKeyStore(properties.getClientKeyStorePath(), password);
        keyManagerFactory.init(keyStore, password);

        SSLContext sslContext = SSLContext.getInstance("SSL");
        sslContext.init(keyManagerFactory.getKeyManagers(), trustManagerFactory.getTrustManagers(), new SecureRandom());

        connectOptions = new MqttConnectOptions();
        connectOptions.setSocketFactory(sslContext.getSocketFactory());

        mqttClient = new MqttClient(String.format(properties.getUrlFormat(), mqttId), properties.getDeviceName(), new MemoryPersistence());
    }

    public void connect(){
        try {
            mqttClient.connect(connectOptions);
            mqttClient.subscribe(properties.getTopicName());
            System.out.println("MQTT client connected.");
        }
        catch (MqttException e){
            System.out.println("Failed to connect MQTT client with error: " + e.getMessage());
        }
    }

    public boolean isConnected(){
        return mqttClient.isConnected();
    }

    public void setCallback(MqttCallback callback){
        mqttClient.setCallback(callback);
    }
}
