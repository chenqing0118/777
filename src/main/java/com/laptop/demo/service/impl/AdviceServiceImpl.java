package com.laptop.demo.service.impl;

import com.alibaba.fastjson.JSON;
import com.laptop.demo.mapper.DetailsMapper;
import com.laptop.demo.pojo.Detail;
import com.laptop.demo.service.AdviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service("AdviceService")
public class AdviceServiceImpl implements AdviceService {
    @Autowired
    private DetailsMapper detailsMapper;
    @Override
    public Map<String, String> getDetails(String channel_2){
        Map<String, String> detailsMap=new LinkedHashMap<>();
      for(Detail advice:detailsMapper.getDetails("advice",channel_2)){
          detailsMap.put(advice.getChannel_3(),advice.getDetail());
      }
      System.out.println(detailsMap);
      return detailsMap;
    }
    @Override
    public  Map<String, List<String>> getInstalls(){
        Map<String, List<String>> installsMap=new LinkedHashMap<>();
        for (Detail install:detailsMapper.getDetails("advice","install")){
//            procedures.addAll(JSONArray.parseArray(install.getDetails()));
            installsMap.put(install.getChannel_3(), JSON.parseArray(install.getDetail(),String.class));
        }
        System.out.println(installsMap);
        return installsMap;
    }
}
