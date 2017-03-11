package com.mirrormirror.mqtt;

import com.mirrormirror.config.MqttProperties;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;
import java.security.KeyStore;
import java.security.SecureRandom;
import java.util.UUID;

@Component
public class MqttClientWrapper {
    private MqttConnectOptions connectOptions;
    private MqttClient mqttClient;
    private String topicName;

    @Autowired
    public MqttClientWrapper(MqttProperties properties,
                             @Value("${keystore.password}") char[] password,
                             @Value("${aws.mqtt.id}") String mqttId) throws Exception {
        this.topicName = properties.getTopicName();

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

        // Client names must be unique for a given MQTT connection
        String deviceName = properties.getDeviceName() + "-" + UUID.randomUUID().toString();
        System.out.println("Initialized MQTT client with name: " + deviceName);

        mqttClient = new MqttClient(String.format(properties.getUrlFormat(), mqttId), deviceName, new MemoryPersistence());
    }

    public void connect(){
        try {
            mqttClient.connect(connectOptions);
            mqttClient.subscribe(topicName);
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
