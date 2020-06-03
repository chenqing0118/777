package com.laptop.demo.mapper;

import com.laptop.demo.pojo.Laptop;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface LaptopMapper {
    List<Laptop> getRecommended(Laptop params);
    List<Laptop> getRecommended2();
}
