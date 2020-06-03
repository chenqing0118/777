//标签选择发送数据
var carQueryData = {
    "startRow": 1, //第几页开始
    "brandOrCarLevel": "",//搜索
    "brand": "", //品牌
    "defaultSort": "", //排序
    "ndownPaymentStart": "", //首付
    "ndownPaymentEnd": "",
    "nmonthlyPaymentStart": "", //月供
    "nmonthlyPaymentEnd": "",
    "priceStart": "", //车价Start
    "priceEnd": "",
    "downPaymentRatio": "", //首付比例 发送给后台时拼接在此后 10%首付-0%首付
    "downPaymentRatioList": {
        "zeropayments": "", //0首付 
        "fivepayments": "", //5%首付 
    },
    "newCarShelf": "", //新车上架
    "carRaisingWorryFree": "", //养车无忧
    "monthlySupplyDrop": "", //月供直降
    "newEnergy": "", //新能源
    "carLevel": "", //车型  carLevel=SUV-中型车-紧凑型车，你用-拼接成字符串过来 
    //以下字段不传  拼接在priceStart后面
    "carLevelList": {
        "minCar": "", //微小型车
        "smallCar": "", //紧凑型
        "middleCar": "", //中型车
        "middleLargeCar": "", //中大型车
        "suvCar": "", //SUV
        "mpvCar": "", //MPV
        "runCar": "", //跑车
    }

};
//标签选择页面渲染数据
var carRenderData = {
    "startRow": 1, //第几页开始
    "brand": "", //品牌
    "brandOrCarLevel": "",//搜索
    "defaultSort": "", //排序
    "ndownPayment": "", //首付
    "nmonthlyPayment": "", //月供
    "price": "", //车价Start
    "zeropayments": "", //0首付 
    "fivepayments": "", //5%首付 
    "newCarShelf": "", //新车上架
    "carRaisingWorryFree": "", //养车无忧
    "monthlySupplyDrop": "", //月供直降
    "newEnergy": "", //新能源
    "minCar": "", //微小型车
    "smallCar": "", //紧凑型
    "middleCar": "", //中型车
    "middleLargeCar": "", //中大型车
    "suvCar": "", //SUV
    "mpvCar": "", //MPV
    "runCar": "", //跑车
};
// carQueryData carRenderData 两个是为了操作页面处理逻辑的   可跟据实际情况使用
// ——————————————————————————————————————————————————————————————————————————


// // 第二个滑块代码
$('.monthlyInstallment').on('click', function () {
    navSelectChangeThisCss(this, ".selecteList_month", [".selecteList_downPayment", ".selecteList"], [".downPayment", ".defaultSort"]);
});
$('.nmonthlyPayment_ul li').on('click', function () {
    $(this).addClass("selected");
    $(this).siblings().removeClass("selected");
    setTimeout(function () {
    }, 100);
    var newData = $(this).attr("data-nmonthlyPayment");
    carQueryData.nmonthlyPaymentStart = newData.split("_")[0];
    carQueryData.nmonthlyPaymentEnd = newData.split("_")[1];
    carRenderData.nmonthlyPayment = "" + $(this).text();
    if (carQueryData.nmonthlyPaymentEnd === "11000") {
        carQueryData.nmonthlyPaymentEnd = "";
    }
    if (carQueryData.nmonthlyPaymentStart === "0") {
        carQueryData.nmonthlyPaymentStart = "";
    }
    var formNum = Number(carQueryData.nmonthlyPaymentStart);
    var toNum = Number(carQueryData.nmonthlyPaymentEnd);
    console.log(formNum,toNum);
    if (toNum === 0) {
        toNum = 11000;
    }
    var sliderRange2 = $(".range_2").data("ionRangeSlider");
    sliderRange2.update({//数据更新
        from: formNum,
        to: toNum
    });
    //滑动重新初始化
    moveSliderRange2(formNum, toNum);
});

//月供滑动
$(".range_2").ionRangeSlider({
    min: 0, //最小值 
    max: 11000, //最大值
    from: 0, //默认从哪个值开始选
    to: 11000, //默认选到哪个值
    type: 'double', //设置类型
    step: 1,
    prefix: "", //设置数值前缀
    postfix: "元", //设置数值后缀
    prettify: true,
    hasGrid: true,
    onChange: function (data) {//数据变化时触发
        console.log(data);
        moveSliderRange2(data.from, data.to);
    },
});

function moveSliderRange2(leftNum, rightNum) {
    if (leftNum >= 0 && rightNum <= 10000) {
        $('.bxyc').text(leftNum + '-' + rightNum + '元');
        $('.bxyc').attr("data-leftNum", leftNum);
        $('.bxyc').attr("data-rightNum", rightNum);
    } else if (leftNum === 11000 && rightNum === 11000) {
        $('.bxyc').text('10000元以上');
        $('.bxyc').attr("data-leftNum", 10000);
        $('.bxyc').attr("data-rightNum", "");
    } else if (leftNum > 0 && leftNum < 10000 && rightNum > 10000) {
        $('.bxyc').text(leftNum + '元以上');
        $('.bxyc').attr("data-leftNum", leftNum);
        $('.bxyc').attr("data-rightNum", "");
    } else if (leftNum >= 10000 && rightNum > 10000) {
        $('.bxyc').text('10000元以上');
        $('.bxyc').attr("data-leftNum", "10000");
        $('.bxyc').attr("data-rightNum", "");
    } else if (leftNum === 0 && rightNum > 10000) {
        $('.bxyc').text("不限");
        $('.bxyc').attr("data-leftNum", "0");
        $('.bxyc').attr("data-rightNum", "");
    }
}

$('.confirmButton2').on('click', function () {
});