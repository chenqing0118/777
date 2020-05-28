package com.laptop.demo.mapper;

import com.laptop.demo.pojo.Brand;
import com.laptop.demo.pojo.Detail;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Mapper
@Repository
public interface DetailsMapper {
    ArrayList<Detail> getDetails(@Param("channel_1") String channel_1, @Param("channel_2") String channel_2);

    Brand getBrandDetail(@Param("name") String name);
}
