package com.laptop.demo.service;

import com.laptop.demo.pojo.Laptop;

import java.util.Dictionary;
import java.util.List;

public interface LaptopService {
    String getRecommend(int stroage, int mem, int cpu, int gpu, boolean duration, boolean weight, boolean socket, boolean color, int min, int max);
}
