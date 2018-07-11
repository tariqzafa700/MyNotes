package com.app.notes.model;

public class ResponseMessage {
	private Long id;

    private String action;

    public ResponseMessage() {
    }

    public ResponseMessage(Long id, String action) {
        this.id = id;
        this.action = action;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
