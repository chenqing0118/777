package com.laptop.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.laptop.demo.service.ScienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Test {
    @Autowired
    private ScienceService scienceService;

    @RequestMapping("/404")
    public String html404(Model model) {

        return "404";
    }

    @RequestMapping("/pick-and-choose")
    public String about(Model model) {

        return "pick-and-choose";
    }

    @RequestMapping("/blog-details")
    public String blog_post(Model model) {

        String channel_1 = "配置科普";
        String channel_2 = "CPU";

        if (scienceService.getScience(channel_1, channel_2) != null) {
            JSONObject science = scienceService.getScience(channel_1, channel_2);
            model.addAttribute("science",science);
        } else {
            System.out.println("查询失败");
        }
        return "blog-details";
    }

    @RequestMapping("/contact-us")
    public String contact(Model model) {

        return "contact-us";
    }

    @RequestMapping("/")
    public String index(Model model) {

        return "index";
    }

    @RequestMapping("/test")
    public String test(Model model) {

        return "test";
    }

    @RequestMapping("/common_science")
    public String common_science(Model model) {

        return "common_science";
    }

    @RequestMapping("/recommend")
    public String recommend(){
        return "recommend";
    }
}
