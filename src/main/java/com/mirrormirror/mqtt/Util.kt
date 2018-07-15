package com.mirrormirror.mqtt

import org.springframework.core.io.ClassPathResource
import java.security.KeyStore
import java.util.*
import kotlin.math.max

fun readKeyStore(keyStorePath: String, keyStorePassword: CharArray): KeyStore {
    val ks = KeyStore.getInstance(KeyStore.getDefaultType())
    val keyStoreStream = ClassPathResource(keyStorePath).inputStream
    keyStoreStream.use { stream -> ks.load(stream, keyStorePassword) }
    return ks
}

fun sleepForMs(ms: Long?) {
    val startDate = Date()
    var timeRemaining = max(0, (ms ?: 0) - (startDate.time - Date().time))
    while (timeRemaining > 0) {
        try {
            Thread.sleep(timeRemaining)
        } catch (e: InterruptedException) {
            // Goes back to sleep on early wake
        } finally {
            timeRemaining = max(0, (ms ?: 0) - (startDate.time - Date().time))
        }
    }
}
