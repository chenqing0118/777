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
    public String getRecommend(int storage, int mem, int cpu, int gpu, boolean duration, boolean weight, boolean socket, boolean color, int min, int max) {
        Laptop params = new Laptop();
        params.setStorage(storage);
        params.setMemorySize(mem);
        switch (gpu) {
            case 0:
            default:
                params.setGpu("0");
                break;
            case 1:
                params.setGpu("1");
                break;
            case 2:
                params.setGpu("2");
                break;
            case 3:
                params.setGpu("3");
                break;
            case 4:
                params.setGpu("4");
                break;
            case 5:
            case 6:
                params.setGpu("5");
                break;
        }
        if (cpu > 0) {
            params.setCpu("1");
        } else {
            params.setCpu("0");
        }
        if (duration)
            params.setDuration(9);
        else
            params.setDuration(0);
        if (weight) {
            if (gpu > 1) {
                params.setWeight(5);
            } else {
                params.setWeight(1);
            }
        } else
            params.setWeight(0);
        if (socket)
            params.setUsb(1);
        else
            params.setUsb(0);
        if (color)
            params.setGamut(1);
        else
            params.setGamut(0);

        params.setPrice(max);

        params.setMemoryRate(min);


        List<Laptop> laptops = laptopMapper.getRecommended(params);

        SimpleDateFormat format = new SimpleDateFormat("yyyy年MM月");
//        System.out.println(JSON.toJSONString(laptops));
        for (Laptop laptop : laptops) {
//           System.out.println(laptop.getReleaseTime());
//           System.out.println(format.format(new Date(laptop.getReleaseTime()*1000)));
            laptop.setReleaseMonth(format.format(laptop.getReleaseTime() * 1000));
        }
        String result = JSON.toJSONString(laptops);
        System.out.println(result);
        return result;
    }
}
