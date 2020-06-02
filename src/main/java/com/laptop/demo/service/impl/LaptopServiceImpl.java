package com.laptop.demo.service.impl;

import com.alibaba.fastjson.JSON;
import com.laptop.demo.mapper.LaptopMapper;
import com.laptop.demo.pojo.Laptop;
import com.laptop.demo.service.LaptopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service("LaptopService")
public class LaptopServiceImpl implements LaptopService {
    @Autowired
    private LaptopMapper laptopMapper;
    @Override
    public List<Laptop> getRecommend(){
        SimpleDateFormat format =  new SimpleDateFormat("yyyy年MM月");
        List<Laptop> laptops =laptopMapper.getRecommended();
//        System.out.println(JSON.toJSONString(laptops));
       for (Laptop laptop :laptops){
//           System.out.println(laptop.getReleaseTime());
//           System.out.println(format.format(new Date(laptop.getReleaseTime()*1000)));
           laptop.setReleaseMonth(format.format(laptop.getReleaseTime()*1000));
       }
        return laptops;
    }
}
