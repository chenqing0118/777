package com.laptop.demo;

import com.laptop.demo.utils.CharsetEncodingFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Configuration
    public class WebComponent2Config {
        @Bean
        public FilterRegistrationBean charestFilterRegistration() {
            //新建过滤器注册类
            FilterRegistrationBean registration = new FilterRegistrationBean();
            // 添加我们写好的过滤器
            registration.setFilter( new CharsetEncodingFilter());
            // 设置过滤器的URL模式
            registration.addUrlPatterns("/*");
            //设置过滤器顺序
            registration.setOrder(1);
            return registration;
        }

    }
}
