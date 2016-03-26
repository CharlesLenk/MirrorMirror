package com.mirrormirror.service.todolist;

import java.util.ArrayList;
import java.util.List;

public class ToDoListService {
    private List<String> todoList = new ArrayList<>();

    public void addItemAtBottom(String item){
        todoList.add(item);
    }

    public void addItemAtTop(String item){
        todoList.add(0, item);
    }

    public void removeItem(Integer index){
        todoList.remove(index);
    }

    public List<String> getTodoList(){
        return todoList;
    }
}
