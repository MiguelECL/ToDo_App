package com.example.todoapp_backend.model;

public class ToDo {
    private long id;
    private String name;
    private String dueDate;
    private boolean doneFlag;
    private String doneDate;
    private String priority;
    private String creationDate;

    // Constructor
    public ToDo(long id, String name, String dueDate, boolean doneFlag, String doneDate, String priority, String creationDate){
        this.id = id;
        this.name = name;
        this.dueDate = dueDate;
        this.doneFlag = doneFlag;
        this.doneDate = doneDate;
        this.priority = priority;
        this.creationDate = creationDate;
    }

    //Empty constructor
    public ToDo(){
    }

    // Getters & Setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public boolean getDoneFlag() {
        return doneFlag;
    }

    public void setDoneFlag(boolean doneFlag) {
        this.doneFlag = doneFlag;
    }

    public String getDoneDate() {
        return doneDate;
    }

    public void setDoneDate(String doneDate) {
        this.doneDate = doneDate;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }
}


