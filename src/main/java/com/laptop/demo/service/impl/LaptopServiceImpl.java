package com.laptop.demo.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.laptop.demo.mapper.LaptopMapper;
import com.laptop.demo.pojo.ChooseParam;
import com.laptop.demo.pojo.Laptop;
import com.laptop.demo.service.LaptopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

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
        Collections.shuffle(laptops);
        JSONObject output = new JSONObject();
        if (laptops.size() < 18) {
            output.put("loosen", 1);
            params.setPricemax((max * 3) / 2 + 1000);
            laptops = laptopMapper.getRecommended(params);
            if (laptops.size() >= 6) {
                output.put("error", 0);
            } else {
                output.put("error", 1);
            }
        } else {
            output.put("error", 0);
            output.put("loosen", 0);
        }

        Random random = new Random();
        int length = laptops.size();
        int step = length / 6;
        List<Laptop> choose = new ArrayList<>();
        SimpleDateFormat format = new SimpleDateFormat("yyyy年MM月");
        if (length <= 18) {
            for (int i = 0; i < Math.min(length, 12); i++) {
                choose.add(laptops.get(i));
            }
        } else {
            for (int i = 0; i < 6; i++) {
                int rand = random.nextInt(step - 2);
                choose.add(laptops.get(i * step + rand));
                choose.add(laptops.get(i * step + rand + 1));
            }
        }
        Collections.shuffle(choose);
        for (Laptop laptop : choose) {
//           System.out.println(laptop.getReleaseTime());
//           System.out.println(format.format(new Date(laptop.getReleaseTime()*1000)));
            laptop.setReleaseMonth(format.format(laptop.getReleaseTime() * 1000));
        }
        output.put("content", (JSON) JSON.parse(JSON.toJSONString(choose)));
//        System.out.println(JSON.toJSONString(laptops));
        System.out.println(output);
        return output;
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
