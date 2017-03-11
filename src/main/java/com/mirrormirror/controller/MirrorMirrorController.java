package com.mirrormirror.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.mirrormirror.mqtt.CommandResponse;
import com.mirrormirror.config.PrivatePropConfig;
import com.mirrormirror.mqtt.MqttProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@RestController
public class MirrorMirrorController {
    @Autowired
    private PrivatePropConfig properties;

    private RestTemplate restTemplate = new RestTemplate();

    @RequestMapping(
            value = "/mirrormirror/service/doAgentGet",
            method = RequestMethod.POST)
    public JsonNode makeRequest(
            @RequestBody String url
    ) throws UnsupportedEncodingException {
        url = URLDecoder.decode(url,"UTF-8");
        url = mapKeysToUrl(url);
        ResponseEntity<JsonNode> response = restTemplate.getForEntity(url, JsonNode.class);
        return response.getBody();
    }

    private String mapKeysToUrl(String url){
        for (String key : properties.getApikeys().keySet()){
            url = url.replace(key, properties.getApikeys().get(key));
        }
        return url;
    }

    @RequestMapping(
            value = "/mirrormirror/reboot",
            method = RequestMethod.GET
    )
    @ResponseStatus(value = HttpStatus.OK)
    public void reboot() throws IOException{
        Runtime.getRuntime().exec("sudo reboot now");
    }
}
