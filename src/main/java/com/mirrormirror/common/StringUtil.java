package com.mirrormirror.common;

public class StringUtil {
    public static boolean isNullOrEmtpy(String s){
        return s == null || s.trim().equals("");
    }
}
