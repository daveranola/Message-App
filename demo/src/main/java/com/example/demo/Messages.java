package com.example.demo;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Messages {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int messageId;
    private int senderId;
    private String content;
    @Column(name = "time_sent", updatable = false, insertable = false)
    private LocalDateTime timeSent;

    public int getMessageId() {
        return messageId;
    }

    public void setMessageId(int messageId) {
        this.messageId = messageId;
    }

    public int getSenderId() {
        return senderId;
    }

    public void setSenderId(int senderId) {
        this.senderId = senderId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getTimeSent() {
        return timeSent;
    }

    public void setTimeSent(LocalDateTime timeSent) {
        this.timeSent = timeSent;
    }
}
