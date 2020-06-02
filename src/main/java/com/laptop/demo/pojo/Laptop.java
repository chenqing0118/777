package com.laptop.demo.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Laptop {
    private int id;
    private String name;
    private String type;
    private int price;
    private long releaseTime;
    private String releaseMonth;
    private String cpu;
    private int cores;
    private int threads;
    private float cpuClock;
    private float cpuTurbo;
    private int singleMark;
    private int multiMark;
    private int cpuOutdated;
    private String gpu;
    private int gpuMark;
    private int gpuOutdated;
    private int memorySize;
    private String memoryGen;
    private int memoryRate;
    private int storage;
    private float screenSize;
    private String resolution;
    private int refreshRate;
    private int gamut;
    private float duration;
    private int usb;
    private int typec;
    private int thunderbolt;
    private String video;
    private int rj45;
    private float thickness;
    private float weight;
    private String pictures;
}
