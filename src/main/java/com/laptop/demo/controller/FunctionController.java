package com.laptop.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.laptop.demo.pojo.Brand;
import com.laptop.demo.service.LaptopService;
import com.laptop.demo.service.ScienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@Controller
@RequestMapping("/function")
public class FunctionController {
    @Autowired
    private ScienceService scienceService;
    @Autowired
    private LaptopService laptopService;

    @RequestMapping("/brand_detail")
    public void brand(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String name = request.getParameter("brand");
        Brand brand = scienceService.getBrandDetail(name);
        response.getWriter().write(String.format("{\"brand\":\"%s\",\"intro\":\"%s\"}", brand.getName(), brand.getIntro()));
    }

    @RequestMapping("/results")
    public void results(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String main_uses = request.getParameter("main_uses");
        String ordinary_trait = request.getParameter("ordinary_trait");
        String game_type = request.getParameter("game_type");
        String game_examples = request.getParameter("game_example");
        String game_video = request.getParameter("game_vision");
        String produce_type = request.getParameter("produce_type");
        String ordinary_trait_1 = request.getParameter("ordinary_trait_1");
        String weight_type = request.getParameter("weight_type");
        String price_str = request.getParameter("price");

        int storage_constraint = 0;
        int MemSize_constraint = 0;
        int cpu_level = 0;
        int gpu_level = 0;
        boolean color_filter_on = false;
        boolean weight_filter_on = false;
        boolean duration_filter_on = false;
        boolean socket_filter_on = false;
        int price_min = 0;
        int price_max = 9999999;
        if (main_uses.contains("3")) {
            MemSize_constraint = 16;
            storage_constraint = Math.max(500, storage_constraint);
            if (produce_type != null) {
                if (produce_type.contains("3")) {
                    gpu_level = Math.max(4, gpu_level);
                    cpu_level = Math.max(4, cpu_level);
                } else if (produce_type.contains("2")) {
                    gpu_level = Math.max(2, gpu_level);
                    color_filter_on = true;
                }
            }

        }
        if (main_uses.contains("2")) {
            MemSize_constraint = 8;
            storage_constraint = Math.max(500, storage_constraint);
            if (game_type.contains("2")) {
                int max_game = 0;
                if (game_examples != "") {
                    String[] choices = game_examples.split(",");
                    for (String e : choices
                    ) {
                        max_game = Math.max(Integer.parseInt(e), max_game);
                    }
                    //确定gpu需求等级
                    switch (max_game) {
                        case 8:
                        case 7:
                        case 6:
                            gpu_level = Math.max(4, gpu_level);
                            break;
                        case 5:
                        case 4:
                        case 3:
                            gpu_level = Math.max(3, gpu_level);
                            break;
                        case 2:
                        case 1:
                        default:
                            gpu_level = Math.max(1, gpu_level);
                            ;
                    }
                    if (game_video.contains("3")) {
                        gpu_level += 1;
                    } else if (game_video.contains("1")) {
                        gpu_level -= 1;
                    }
                }
            }
        }

        if (ordinary_trait != null) {
            if (ordinary_trait.contains("1"))
                storage_constraint = 1000;
            if (ordinary_trait.contains("2"))
                color_filter_on = true;
            if (ordinary_trait.contains("3"))
                socket_filter_on = true;
            if (ordinary_trait.contains("4"))
                duration_filter_on = true;
        }

        if (ordinary_trait_1 != null) {
            if (!ordinary_trait_1.equals("")) {
                if (ordinary_trait_1.contains("1"))
                    color_filter_on = true;
                if (ordinary_trait_1.contains("2"))
                    socket_filter_on = true;
                if (ordinary_trait_1.contains("3"))
                    duration_filter_on = true;
            }

        }
        if (weight_type.contains("2")) {
            weight_filter_on = true;
        }

        int i = price_str.indexOf(',');
        if (i != 0) {
            price_min = Integer.parseInt(price_str.split(",")[0]);
            if (i != price_str.length() - 1) {
                price_max = Integer.parseInt(price_str.split(",")[1]);
            }
        } else {
            if (price_str.length() > 1) {
                price_max = Integer.parseInt(price_str.split(",")[0]);
            }
        }


        System.out.println(ordinary_trait);
        response.getWriter().write(String.valueOf(laptopService.getRecommend(storage_constraint, MemSize_constraint,
                cpu_level, gpu_level,
                duration_filter_on, weight_filter_on, socket_filter_on, color_filter_on,
                price_min, price_max)));
    }
}
