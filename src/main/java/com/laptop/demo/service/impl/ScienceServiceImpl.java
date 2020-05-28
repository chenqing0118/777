package com.laptop.demo.service.impl;

import com.laptop.demo.mapper.DetailsMapper;
import com.laptop.demo.pojo.Brand;
import com.laptop.demo.pojo.Detail;
import com.laptop.demo.service.ScienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service("ScienceService")
public class ScienceServiceImpl implements ScienceService {
    @Autowired
    private DetailsMapper detailsMapper;

    @Override
    public Map<String,String> getScience( String channel_2) {
        Map<String, String> sciencesMap=new LinkedHashMap<>();
        for (Detail science: detailsMapper.getDetails("science",channel_2))
        {
            sciencesMap.put(science.getChannel_3(),science.getDetail());
        }
//        System.out.println(sciencesMap);
        return sciencesMap;
    }
    @Override
    public Brand getBrandDetail(String name){
        return detailsMapper.getBrandDetail(name);
    }
}
