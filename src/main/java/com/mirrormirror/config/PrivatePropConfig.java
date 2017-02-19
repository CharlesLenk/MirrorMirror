package com.mirrormirror.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import java.util.HashMap;
import java.util.Map;

@Configuration
@PropertySource("classpath:private.properties")
@ConfigurationProperties
@EnableConfigurationProperties
public class PrivatePropConfig {
    private Map<String, String> apikeys = new HashMap<>();

    public Map<String, String> getApikeys() {
        return apikeys;
    }

    public void setApikeys(Map<String, String> apikeys) {
        this.apikeys = apikeys;
    }
}
