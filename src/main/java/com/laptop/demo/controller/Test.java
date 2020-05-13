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

    @RequestMapping("/about-us")
    public String about(Model model){

        return "about-us";
    }

    @RequestMapping("/blog")
    public String blog(Model model){

        return "blog";
    }

    @RequestMapping("/blog-detail")
    public String blog_post(Model model){

        return "blog-detail";
    }

    @RequestMapping("/contact-us")
    public String contact(Model model){

        return "contact-us";
    }

    @RequestMapping("/")
    public String index(Model model){

        return "index";
    }

    @RequestMapping("/index-2")
    public String index2(Model model){

        return "index-2";
    }

    @RequestMapping("/project-details")
    public String project_details(Model model){

        return "project-details";
    }
    @RequestMapping("/project-list")
    public String project_list(Model model){

        return "project-list";
    }
    @RequestMapping("/service-details")
    public String service_details(Model model){

        return "service-details";
    }
    @RequestMapping("/service-list")
    public String service_list(Model model){

        return "service-list";
    }
    @RequestMapping("/test")
    public String test(Model model){

        return "test";
    }
}
