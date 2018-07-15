package com.mirrormirror.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.PropertySource
import java.util.*

@Configuration
@PropertySource("classpath:private.properties")
@ConfigurationProperties
@EnableConfigurationProperties
open class PrivatePropConfig {
    var apikeys: Map<String, String> = HashMap()
}
