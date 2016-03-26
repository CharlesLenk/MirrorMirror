package com.mirrormirror.common;

import com.google.common.base.Stopwatch;
import org.springframework.core.io.ClassPathResource;

import java.io.InputStream;
import java.security.KeyStore;
import java.util.concurrent.TimeUnit;

public class Util {
    public static KeyStore readKeyStore(String keyStorePath, char[] keyStorePassword) throws Exception{
        KeyStore ks = KeyStore.getInstance(KeyStore.getDefaultType());
        InputStream stream = new ClassPathResource(keyStorePath).getInputStream();
        try {
            ks.load(stream, keyStorePassword);
        } finally {
            if (stream != null) {
                stream.close();
            }
        }
        return ks;
    }

    public static void sleepForMs(Integer ms){
        Stopwatch timer = Stopwatch.createStarted();
        Long timeRemaining = Math.max(0, ms - timer.elapsed(TimeUnit.MILLISECONDS));
        while (timeRemaining > 0){
            try{
                Thread.sleep(timeRemaining);
            }
            catch (InterruptedException e) {
                // Goes back to sleep on early wake
            }
            finally {
                timeRemaining = Math.max(0, ms - timer.elapsed(TimeUnit.MILLISECONDS));
            }
        }
    }
}
