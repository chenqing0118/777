package com.laptop.demo.service;

import com.alibaba.fastjson.JSONObject;
import com.laptop.demo.pojo.Brand;

public interface ScienceService {
    JSONObject getScience(String channel_1,String channel_2);
    Brand getBrandDetail(String name);
}
