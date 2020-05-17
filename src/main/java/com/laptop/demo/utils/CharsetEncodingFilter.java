package com.laptop.demo.utils;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(filterName = "CharsetEncodingFilter")
public class CharsetEncodingFilter implements Filter {
    public void destroy() {
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        // 设置字符编码链锁
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) resp;
        response.setHeader("Content-type", "text/html;charset=UTF-8");        //让浏览器用utf8来解析返回的数据
        response.setCharacterEncoding("UTF-8");        //告知servlet用UTF-8转码，而不是用默认的ISO-8859-1
        chain.doFilter(req, resp);
    }

    public void init(FilterConfig config) throws ServletException {
    }

}
