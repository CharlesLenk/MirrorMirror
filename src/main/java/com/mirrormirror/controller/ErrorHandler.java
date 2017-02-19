package com.mirrormirror.controller;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ErrorHandler {
    @ExceptionHandler(RuntimeException.class)
    public void handleException(RuntimeException e){
        System.out.println(e.getMessage());
    }
}
