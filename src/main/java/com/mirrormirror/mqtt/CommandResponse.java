package com.mirrormirror.mqtt;

public class CommandResponse {
    private String command;
    private String option;

    public CommandResponse(String command){
        this.command = command;
        this.option = option;
    }

    public CommandResponse(String command, String option){
        this.command = command;
        this.option = option;
    }

    public String getCommand() {
        return command;
    }

    public String getOption() {
        return option;
    }
}
