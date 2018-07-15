package com.mirrormirror.mqtt

import com.mirrormirror.config.MqttProperties
import org.eclipse.paho.client.mqttv3.*
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Component
import java.security.SecureRandom
import java.util.*
import javax.net.ssl.KeyManagerFactory
import javax.net.ssl.SSLContext
import javax.net.ssl.TrustManagerFactory

@Component
class MqttClientWrapper @Autowired
constructor(properties: MqttProperties,
            private val template: SimpMessagingTemplate,
            @Value("\${keystore.password}") password: CharArray,
            @Value("\${aws.mqtt.id}") mqttId: String) : MqttCallback {

    private val connectOptions: MqttConnectOptions
    private val mqttClient: MqttClient
    private val topicName: String = properties.topicName

    val isConnected: Boolean
        get() = mqttClient.isConnected

    init {
        // Load CA cert
        val trustManagerFactory = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm())
        val trustStore = readKeyStore(properties.trustedKeyStorePath, password)
        trustManagerFactory.init(trustStore)

        // Load client cert
        val keyManagerFactory = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm())
        val keyStore = readKeyStore(properties.clientKeyStorePath, password)
        keyManagerFactory.init(keyStore, password)

        val sslContext = SSLContext.getInstance("SSL")
        sslContext.init(keyManagerFactory.keyManagers, trustManagerFactory.trustManagers, SecureRandom())

        connectOptions = MqttConnectOptions()
        connectOptions.socketFactory = sslContext.socketFactory

        // Client names must be unique for a given MQTT connection
        val deviceName = properties.deviceName + "-" + UUID.randomUUID().toString()
        println("Initialized MQTT client with name: $deviceName")

        mqttClient = MqttClient(String.format(properties.urlFormat, mqttId), deviceName, MemoryPersistence())
        mqttClient.setCallback(this)
        connect()
    }

    fun connect() {
        try {
            mqttClient.connect(connectOptions)
            mqttClient.subscribe(topicName)
            println("MQTT client connected.")
        } catch (e: MqttException) {
            println("Failed to connect MQTT client with error: " + e.message)
        }
    }

    override fun connectionLost(cause: Throwable) {
        println("MQTT connection lost with error: " + cause.message)
        template.convertAndSend(COMMAND_TOPIC, "{\"command\":\"showError\", " +
                "\"option\":\"Lost connection with error: " + cause.message + "\"}")

        while (!mqttClient.isConnected) {
            connect()
            sleepForMs(10000L)
        }
    }

    override fun messageArrived(topic: String, mqttMessage: MqttMessage) {
        println("Received message: " + mqttMessage.toString())
        template.convertAndSend(COMMAND_TOPIC, mqttMessage.toString())
    }

    override fun deliveryComplete(iMqttDeliveryToken: IMqttDeliveryToken) {
        // App is read only
    }

    companion object {
        private const val COMMAND_TOPIC = "/topic/mirrormirror/commands"
    }
}
