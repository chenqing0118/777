package com.laptop.demo.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.laptop.demo.mapper.AdviceMapper;
import com.laptop.demo.pojo.Detail;
import com.laptop.demo.service.AdviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service("AdviceService")
public class AdviceServiceImpl implements AdviceService {
    @Autowired
    private AdviceMapper adviceMapper;
    @Override
    public Map<String, String> getDetails(String channel){
        Map<String, String> detailsMap=new LinkedHashMap<>();
      for(Detail advice:adviceMapper.getDetails(channel)){
          detailsMap.put(advice.getChannel_3(),advice.getDetails());
      }
//        System.out.println(detailsMap);
      return detailsMap;
    }
    @Override
    public  Map<String, List<String>> getInstalls(){
        Map<String, List<String>> installsMap=new LinkedHashMap<>();
        for (Detail install:adviceMapper.getDetails("install")){
//            procedures.addAll(JSONArray.parseArray(install.getDetails()));
            installsMap.put(install.getChannel_3(), JSON.parseArray(install.getDetails(),String.class));
        }
        System.out.println(installsMap);
        return installsMap;
    }
}
