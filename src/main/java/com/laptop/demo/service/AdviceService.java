package com.laptop.demo.service;

import java.util.List;
import java.util.Map;

public interface AdviceService {
    Map<String,String> getDetails(String channel_2);
    Map<String, List<String>> getInstalls();
}
