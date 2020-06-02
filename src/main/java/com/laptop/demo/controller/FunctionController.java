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

@Controller
@RequestMapping("/function")
public class FunctionController {
    @Autowired
    private ScienceService scienceService;
    @Autowired
    private LaptopService laptopService;

    @RequestMapping("/brand_detail")
    public void brand(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String name=request.getParameter("brand");
        Brand brand=scienceService.getBrandDetail(name);
        response.getWriter().write(String .format("{\"brand\":\"%s\",\"intro\":\"%s\"}",brand.getName(),brand.getIntro()));
    }

    @RequestMapping("/results")
    public void results(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String main_uses=request.getParameter("main_uses");
        String ordinary_trait = request.getParameter("ordinary_trait");
        System.out.println(main_uses);
        System.out.println(ordinary_trait);
//        response.getWriter().write(String.valueOf(laptopService.getRecommend()));
    }
}
