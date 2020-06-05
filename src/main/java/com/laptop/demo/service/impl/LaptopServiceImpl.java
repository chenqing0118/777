package com.laptop.demo.service.impl;

import com.alibaba.fastjson.JSON;
import com.laptop.demo.mapper.LaptopMapper;
import com.laptop.demo.pojo.ChooseParam;
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
    public JSON getRecommend(int storage, int mem, int cpu, int gpu, boolean duration, boolean weight, boolean socket, boolean color, int min, int max) {
        ChooseParam params = new ChooseParam();
        params.setStorage(storage);
        params.setMem(mem);
        params.setCpulevel(cpu);
        params.setGpulevel(gpu);
        params.setPricemin(min - 500);
        params.setPricemax(max + 1000);
        if (weight) {
            if (gpu > 1)
                params.setWeightOn(2);
            else
                params.setWeightOn(1);
        } else
            params.setWeightOn(0);
        if (duration)
            params.setDurationOn(8);
        else
            params.setDurationOn(0);
        if (socket)
            params.setPortOn(1);
        else
            params.setPortOn(0);
        if (color)
            params.setColorOn(1);
        else
            params.setColorOn(0);


        List<Laptop> laptops = laptopMapper.getRecommended(params);

        SimpleDateFormat format = new SimpleDateFormat("yyyy年MM月");
//        System.out.println(JSON.toJSONString(laptops));
        for (Laptop laptop : laptops) {
//           System.out.println(laptop.getReleaseTime());
//           System.out.println(format.format(new Date(laptop.getReleaseTime()*1000)));
            laptop.setReleaseMonth(format.format(laptop.getReleaseTime() * 1000));
        }

        JSON result = (JSON) JSON.parse(JSON.toJSONString(laptops));
        System.out.println(result);
        return result;
    }

    @Override
    public List<Laptop> getRecommend2() {
        List<Laptop> laptops = laptopMapper.getRecommended2();
        SimpleDateFormat format = new SimpleDateFormat("yyyy年MM月");
        for (Laptop laptop : laptops) {
//           System.out.println(laptop.getReleaseTime());
//           System.out.println(format.format(new Date(laptop.getReleaseTime()*1000)));
            laptop.setReleaseMonth(format.format(laptop.getReleaseTime() * 1000));
        }
        return laptops;
    }
}
