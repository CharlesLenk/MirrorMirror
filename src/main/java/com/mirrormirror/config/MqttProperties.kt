package com.mirrormirror.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties(prefix = "mqtt")
open class MqttProperties {
    var urlFormat: String = ""
    var deviceName: String = ""
    var topicName: String = ""
    var clientKeyStorePath: String = ""
    var trustedKeyStorePath: String = ""
}
