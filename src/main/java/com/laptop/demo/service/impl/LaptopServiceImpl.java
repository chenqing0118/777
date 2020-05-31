package com.laptop.demo.service.impl;

import com.alibaba.fastjson.JSON;
import com.laptop.demo.mapper.LaptopMapper;
import com.laptop.demo.pojo.Laptop;
import com.laptop.demo.service.LaptopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("LaptopService")
public class LaptopServiceImpl implements LaptopService {
    @Autowired
    private LaptopMapper laptopMapper;
    @Override
    public List<Laptop> getRecommend(){
        List<Laptop> laptops =laptopMapper.getRecommended();
        for (Laptop laptop:laptops){
            laptop.setVideo(JSON.parseArray((String) laptop.getVideo(),String.class));
        }
//        System.out.println(laptops);
        return laptops;
    }
}
