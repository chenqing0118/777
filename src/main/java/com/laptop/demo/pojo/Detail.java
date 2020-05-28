package com.laptop.demo.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Detail implements Serializable {
//    private String channel_2;
    private String channel_3;
    private String detail;
}
