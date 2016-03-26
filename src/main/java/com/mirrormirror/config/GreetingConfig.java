package com.mirrormirror.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.Random;

@Configuration
@ConfigurationProperties(prefix = "greeting")
@EnableConfigurationProperties
public class GreetingConfig {
    private final Random random = new Random();
    private List<String> greetings;

    public String getRandomGreeting() {
        Integer randomIdx = random.nextInt(greetings.size());
        return greetings.get(randomIdx);
    }

    public List<String> getGreetings() {
        return greetings;
    }

    public void setGreetings(List<String> greetings) {
        this.greetings = greetings;
    }
}
