package com.laptop.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller

public class Test {
    @RequestMapping("/404")
    public String html404(Model model){

        return "404";
    }

    @RequestMapping("/pick-and-choose")
    public String about(Model model){

        return "pick-and-choose";
    }

    @RequestMapping("/blog-details")
    public String blog_post(Model model){

        return "blog-details";
    }

    @RequestMapping("/contact-us")
    public String contact(Model model){

        return "contact-us";
    }

    @RequestMapping("/")
    public String index(Model model){

        return "index";
    }

    @RequestMapping("/test")
    public String test(Model model){

        return "test";
    }
    @RequestMapping("/common_science")
    public String common_science(Model model){

        return "common_science";
    }
    @RequestMapping("/service-list")
    public String service_list(){
        return "service-list";
    }
    @RequestMapping("/recommend")
    public String recommend(){
        return "recommend";
    }
}
