package com.laptop.demo.controller;


import com.laptop.demo.service.AdviceService;
import com.laptop.demo.service.LaptopService;
import com.laptop.demo.service.ScienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.LinkedHashMap;
import java.util.Map;

@Controller

public class PageController {
    private static final Map<String, String> HARDWARE;

    static {
        HARDWARE = new LinkedHashMap<>();
        HARDWARE.put("CPU", "CPU");
        HARDWARE.put("gpu", "显卡");
        HARDWARE.put("memory", "内存");
        HARDWARE.put("storage", "硬盘");
        HARDWARE.put("interface", "接口");
        HARDWARE.put("screen", "屏幕");
    }

    @Autowired
    private ScienceService scienceService;
    @Autowired
    private AdviceService adviceService;
    @Autowired
    private LaptopService laptopService;

    @RequestMapping("/404")
    public String html404() {

        return "404";
    }

    @RequestMapping("/pick")
    public String about(Model model) {
//        model.addAttribute("laptops", laptopService.getRecommend(0, 0, 0, 0, false, false, false, false, 0, 999999));
        model.addAttribute("laptops",laptopService.getRecommend2());
        System.out.println(laptopService.getRecommend2());
        return "pick";
    }

    @RequestMapping("/blog-details")
    public String blog_post(Model model, HttpServletRequest request) {
        String hardware = request.getParameter("hardware");
        if (hardware == null) {
            hardware = "CPU";
        }
        if (!HARDWARE.containsKey(hardware)) {
            hardware = "CPU";
        }
        model.addAttribute("hardware", HARDWARE.get(hardware));
        model.addAttribute("details", scienceService.getScience(hardware));
        return "blog-details";
    }

    @RequestMapping("/")
    public String index(Model model) {

        return "index";
    }

    @RequestMapping("/test")
    public String test() {

        return "pageController";
    }

    @RequestMapping("/common_science")
    public String common_science(Model model) {

        return "common_science";
    }

    @RequestMapping("/advices")
    public String advice(Model model) {
        model.addAttribute("advices", adviceService.getDetails("advice"));
        model.addAttribute("firsts", adviceService.getDetails("first"));
        model.addAttribute("installs", adviceService.getInstalls());
        return "advices";
    }

    @RequestMapping("/brand")
    public String brand() {
        return "brand";
    }

    @RequestMapping("/all-goods")
    public String all_goods(Model model) {
        model.addAttribute("laptops", laptopService.getRecommend(0, 0, 0, 0, false, false, false, false, 0, 999999));
        return "all-goods";
    }

}
