package com.mirrormirror.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "mqtt")
public class MqttProperties {
    private String urlFormat;
    private String deviceName;
    private String topicName;
    private String clientKeyStorePath;
    private String trustedKeyStorePath;

    public String getUrlFormat() {
        return urlFormat;
    }

    public void setUrlFormat(String urlFormat) {
        this.urlFormat = urlFormat;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getTopicName() {
        return topicName;
    }

    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }

    public String getClientKeyStorePath() {
        return clientKeyStorePath;
    }

    public void setClientKeyStorePath(String clientKeyStorePath) {
        this.clientKeyStorePath = clientKeyStorePath;
    }

    public String getTrustedKeyStorePath() {
        return trustedKeyStorePath;
    }

    public void setTrustedKeyStorePath(String trustedKeyStorePath) {
        this.trustedKeyStorePath = trustedKeyStorePath;
    }
}
