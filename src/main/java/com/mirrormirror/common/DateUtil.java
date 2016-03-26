package com.mirrormirror.common;

import java.util.Date;

public class DateUtil {
    public static long getMinutesBetweenDates(Date date1, Date date2){
        long milliseconds = date1.getTime() - date2.getTime();
        long minutes = milliseconds/60000;
        long remainder = milliseconds%60000;
        if (remainder > 30000){
            minutes += 1;
        }
        return minutes;
    }
}
