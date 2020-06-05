package com.laptop.demo.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChooseParam {
    private int storage;
    private int mem;
    private int cpulevel;
    private int gpulevel;
    private int weightOn;
    private int colorOn;
    private int durationOn;
    private int portOn;
    private int pricemin;
    private int pricemax;
}
