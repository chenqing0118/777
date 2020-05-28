package com.laptop.demo.service;

import com.alibaba.fastjson.JSONObject;
import com.laptop.demo.pojo.Brand;

import java.util.Map;

public interface ScienceService {
    Map<String,String> getScience( String channel_2);
    Brand getBrandDetail(String name);
}
