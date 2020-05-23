package com.laptop.demo.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Detail implements Serializable {
    private String channel_2;
    private String channel_3;
    private String details;
    public Detail(String channel_3,String details){
        this.channel_3 = channel_3;
        this.details = details;
    }
}
