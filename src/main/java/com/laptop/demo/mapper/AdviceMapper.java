package com.laptop.demo.mapper;

import com.laptop.demo.pojo.Detail;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Mapper
@Repository
public interface AdviceMapper {
    ArrayList<Detail> getDetails(String channel);
}
