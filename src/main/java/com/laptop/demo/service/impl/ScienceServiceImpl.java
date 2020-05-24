package com.laptop.demo.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.laptop.demo.mapper.ScienceMapper;
import com.laptop.demo.pojo.Brand;
import com.laptop.demo.pojo.Detail;
import com.laptop.demo.service.ScienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.util.ArrayList;

@Service("ScienceService")
public class ScienceServiceImpl implements ScienceService {
    @Autowired
    private ScienceMapper scienceMapper;

    @Override
    public JSONObject getScience(String channel_1, String channel_2) {
        JSONObject scienceJson = new JSONObject();
        if (channel_1.equals("配置科普")) {
            ArrayList<Detail> results = scienceMapper.getScience(channel_1, channel_2);
            for (Detail re : results) {
                scienceJson.put(re.getChannel_3(), re.getDetails().split(";;"));
            }
            System.out.println(scienceJson);
            return scienceJson;
        }
        if (channel_1.equals("使用建议")) {
            ArrayList<Detail> results = scienceMapper.getAdvice(channel_1);
            JSONObject ordinary_Json = new JSONObject();
            JSONObject update_Json = new JSONObject();
            for (Detail re : results) {
                if(re.getChannel_2().equals("新机注意事项")){
                    scienceJson.put("new_advice", re.getDetails().split(";;"));
                }
                if(re.getChannel_2().equals("日常使用建议")){
                    ordinary_Json.put(re.getChannel_3(),re.getDetails().split(";;"));
                }
                if(re.getChannel_2().equals("配件替换/加装")){
                    update_Json.put(re.getChannel_3(),re.getDetails().split(";;"));
                }
            }
            scienceJson.put("ordinary_advice",ordinary_Json);
            scienceJson.put("update_advice",update_Json);
            System.out.println(scienceJson);
            return scienceJson;
        }
        return null;
    }
    @Override
    public Brand getBrandDetail(String name){
        return scienceMapper.getBrandDetail(name);
    }
}
