package com.mirrormirror.controller

import com.fasterxml.jackson.databind.JsonNode
import com.mirrormirror.config.PrivatePropConfig
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.client.RestTemplate
import java.net.URLDecoder

@RestController
class MirrorController @Autowired
constructor(private val properties: PrivatePropConfig){
    private val restTemplate = RestTemplate()

    @PostMapping("/mirrormirror/service/doAgentGet")
    fun makeRequest(
            @RequestBody url: String
    ): JsonNode {
        return restTemplate.getForEntity(mapKeysToUrl(URLDecoder.decode(url, "UTF-8")), JsonNode::class.java).body
    }

    private fun mapKeysToUrl(url: String): String {
        var url = url
        for (key in properties.apikeys.keys) {
            url = url.replace(key, properties.apikeys[key] ?: "", true)
        }
        return url
    }

    @GetMapping("/mirrormirror/reboot")
    fun reboot() {
        Runtime.getRuntime().exec("sudo reboot now")
    }
}
