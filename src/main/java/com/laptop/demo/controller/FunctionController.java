package com.laptop.demo.controller;

import com.laptop.demo.pojo.Brand;
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
    @RequestMapping("/brand_detail")
    public void brand(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String name=request.getParameter("brand");
        Brand brand=scienceService.getBrandDetail(name);
        response.getWriter().write(String .format("{\"brand\":\"%s\",\"intro\":\"%s\"}",brand.getName(),brand.getIntro()));
    }
}
