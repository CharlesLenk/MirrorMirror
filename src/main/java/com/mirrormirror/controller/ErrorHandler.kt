package com.mirrormirror.controller

import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

@ControllerAdvice
class ErrorHandler {
    @ExceptionHandler(RuntimeException::class)
    fun handleException(e: RuntimeException) {
        println(e.message)
    }
}
