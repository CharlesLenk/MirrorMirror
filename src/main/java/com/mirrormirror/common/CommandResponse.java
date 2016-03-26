package com.mirrormirror.common;

public class CommandResponse {
    private String command;
    private String option;

    public CommandResponse(){}

    public CommandResponse(String command){
        this.command = command;
    }

    public CommandResponse(String command, String option){
        this.command = command;
        this.option = option;
    }

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command;
    }

    public String getOption() {
        return option;
    }

    public void setOption(String option) {
        this.option = option;
    }
}
