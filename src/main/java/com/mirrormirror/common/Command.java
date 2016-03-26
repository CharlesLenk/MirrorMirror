package com.mirrormirror.common;

public enum Command {
    hideAll,
    showMain,
    showBus,
    showError;

    public static Command getValue(String s){
        try {
            return Command.getValue(s);
        }
        catch (Exception e){
            return showError;
        }
    }
}