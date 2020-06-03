var results = {};

$(function () {
    $(".payment-wizard").children("li").not($(".active")).css("display", "none");
});

function submit_reaults(data) {
    $.ajax({
        url: "function/results",
        type: "get",
        data: data,
        success: function (data) {
            //根据数据，前端显示
            console.log("最后结果显示数据");
            var laptops = JSON.parse(data);
            laptops.forEach(function(laptop,index,laptops){
                $("section.grid").append("<div class='product hidden'>\n" +
                    "                                        <div class='product__info'>\n" +
                    "                                            <img class='product__image' src='"+laptop.pictures+"' alt='Product' />\n" +
                    "                                            <h3 class='product__title' style='color: white;font-weight: bold;font-size: 120%' text='"+laptop.name+"}'>戴尔 灵越 5593 15(酷睿i7-1065G7/8GB/256GB/MX230)</h3>\n" +
                    "                                            <br/>\n" +
                    "\n" +
                    "                                            <div class='highlight' ><span>类型：</span><span text='"+laptop.type+"'>主流轻薄本</span></div>\n" +
                    "                                            <div class='parameter extra highlight' ><span>上市时间：</span><span text='"+laptop.releaseMonth+"'>1</span></div>\n" +
                    "                                            <div class='parameter extra highlight'><span>CPU：</span><span class='cpu' text='"+laptop.cpu+"'>Intel Core i7 1065G7</span>\n" +
                    "                                                <a target='_blank' href='/blog-details?hardware=memory'>\n" +
                    "                                                    <div class='help-tip'>\n" +
                    "                                                        <span class='memorySizeTips'></span>\n" +
                    "                                                    </div>\n" +
                    "                                                </a>\n" +
                    "                                            </div>\n" +
                    "                                            <div class='parameter extra highlight'><span>显卡：</span><span text='"+laptop.gpu+"'>NVIDIA GeForce MX230</span>\n" +
                    "                                                <a target='_blank' href='/blog-details?hardware=memory'>\n" +
                    "                                                    <div class='help-tip'>\n" +
                    "                                                        <span class='memorySizeTips'></span>\n" +
                    "                                                    </div>\n" +
                    "                                                </a>\n" +
                    "                                            </div>\n" +
                    "                                            <div class='parameter extra highlight' ><span>内存大小：</span><span class='memorySize' text='"+laptop.memorySize+"'>8</span><span>G</span>\n" +
                    "                                                <a target='_blank' href='/blog-details?hardware=memory'>\n" +
                    "                                                    <div class='help-tip'>\n" +
                    "                                                        <span class='memorySizeTips'></span>\n" +
                    "                                                    </div>\n" +
                    "                                                </a>\n" +
                    "                                            </div>\n" +
                    "                                            <div class='parameter extra highlight'><span>内存类型：</span><span text='"+laptop.memoryGen+"'>DDR4</span><span>&emsp;</span><span text='"+laptop.memoryRate+"'>DDR4</span><span>MHz</span>\n" +
                    "                                                <a target='_blank' href='/blog-details?hardware=memory'>\n" +
                    "                                                    <div class='help-tip'>\n" +
                    "                                                        <span class='memorySizeTips'></span>\n" +
                    "                                                    </div>\n" +
                    "                                                </a>\n" +
                    "                                            </div>\n" +
                    "                                            <div class='parameter extra highlight'><span>硬盘大小：</span><span class='storage' text='"+laptop.storage+"'>500</span><span>G</span>\n" +
                    "                                                <a target='_blank' href='/blog-details?hardware=memory'>\n" +
                    "                                                    <div class='help-tip'>\n" +
                    "                                                        <span class='memorySizeTips'></span>\n" +
                    "                                                    </div>\n" +
                    "                                                </a>\n" +
                    "                                            </div>\n" +
                    "                                            <div class='parameter extra highlight'><span>屏幕尺寸：</span><span text='"+laptop.screenSize+"'>15.6</span><span>寸</span></div>\n" +
                    "                                            <div class='parameter extra highlight'><span>分辨率：</span><span text='"+laptop.resolution+"'>1920*1080</span>\n" +
                    "                                                <a target='_blank' href='/blog-details?hardware=memory'>\n" +
                    "                                                    <div class='help-tip'>\n" +
                    "                                                        <span class='memorySizeTips'></span>\n" +
                    "                                                    </div>\n" +
                    "                                                </a>\n" +
                    "                                            </div>\n" +
                    "                                            <div class='parameter extra highlight'><span>屏幕色域：</span><span text='"+laptop.gamut+"'>45</span><span>%NTSC</span>\n" +
                    "                                                <a target='_blank' href='/blog-details?hardware=memory'>\n" +
                    "                                                    <div class='help-tip'>\n" +
                    "                                                        <span class='memorySizeTips'></span>\n" +
                    "                                                    </div>\n" +
                    "                                                </a>\n" +
                    "                                            </div>\n" +
                    "                                            <div class='parameter extra highlight'><span>屏幕刷新率：</span><span text='"+laptop.refreshRate+"'>15.6</span><span>Hz</span>\n" +
                    "                                                <a target='_blank' href='/blog-details?hardware=memory'>\n" +
                    "                                                    <div class='help-tip'>\n" +
                    "                                                        <span class='memorySizeTips'></span>\n" +
                    "                                                    </div>\n" +
                    "                                                </a>\n" +
                    "                                            </div>\n" +
                    "                                            <div class='parameter extra highlight'><span>接口情况：USB*</span><span text='"+laptop.usb+"'>1</span><span>&emsp;Type-c*</span><span text='"+laptop.typec+"'>1</span>\n" +
                    "                                                &emsp;<span>&emsp;雷电*</span><span text='"+laptop.thunderbolt+"'>1</span><span>&emsp;显示接口：</span><span text='"+laptop.video+"'>1</span><span>&emsp;网线接口：</span><span text='"+laptop.rj45+"'>1</span>\n" +
                    "                                                <a target='_blank' href='/blog-details?hardware=memory'>\n" +
                    "                                                    <div class='help-tip'>\n" +
                    "                                                        <span class='memorySizeTips'></span>\n" +
                    "                                                    </div>\n" +
                    "                                                </a>\n" +
                    "                                            </div>\n" +
                    "                                            <div class='parameter extra highlight'><span>重量：</span><span text='"+laptop.weight+"'>1.83</span><span>KG</span></div>\n" +
                    "                                            <div class='parameter extra highlight'><span>厚度：</span><span text='"+laptop.thickness+"'>19</span><span>mm</span></div>\n" +
                    "                                            <div class='parameter extra highlight'><span>续航时间：</span><span text='"+laptop.duration+"'>9</span><span>h</span></div>\n" +
                    "                                            <div class='parameter product__price highlight'><span>价格：</span><span text='"+laptop.price+"'>4999</span></div>\n" +
                    "                                        </div>\n" +
                    "                                        <!--            <button class='action action&#45;&#45;button action&#45;&#45;buy'><i class='fa fa-shopping-cart'></i><span class='action__text'><a src='https://product.pconline.com.cn/notebook/dell/1276107.html'>购买通道</a></span></button>-->\n" +
                    "                                        <label class='action action--compare-add'><input class='check-hidden' type='checkbox' /><i class='fa fa-plus'></i><i class='fa fa-check'></i><span class='action__text action__text--invisible'>加入对比</span></label>\n" +
                    "                                    </div>\n")
                }
            )
        },
        error: function () {
            console.log("error")
        }
    })
}

function check_submit() {
    var next_li;
    next_li = $("#weight_type").parent().parent("li");
    if (results['weight_type'] !== undefined) {
        next_li = $(".navBox").parent().parent("li");
        if (results['price'] !== undefined) {
            //得到最后结果
            submit_reaults(results);

            next_li = $("#cd-table").parent().parent("li");
        }
    }
    return next_li;
}

function change_step(this_li_ind) {
    var weight_li_ind = $("#weight_type").parent().parent("li").index();
    var newest_li_ind = $('.payment-wizard li.jump-here').index();
    var i;
    var del_id;

    console.log("innd:", weight_li_ind, this_li_ind, newest_li_ind);
    for (i = this_li_ind + 1; i <= newest_li_ind; i++) {
        if (i <= Math.min(newest_li_ind, weight_li_ind - 1)) {
            var li = $(".payment-wizard li:eq(" + i + ")");
            li.css("display", "none");
            del_id = li.children().children(".selectImgDiv").attr("id");
            delete results[del_id];

            $(".payment-wizard li:eq(" + i + ").completed").removeClass("completed");
        } else {
            var li_active = $(".payment-wizard li:eq(" + i + ").active");
            li_active.removeClass("active");
            li_active.children(".wizard-content").slideUp();
            $(".payment-wizard li:eq(" + i + ").completed").children(".wizard-content").slideUp();

            $("#cd-table").parent().prev('wizard-heading').slideUp();
            $("#cd-table").parent().parent().css("display", "none");
        }
    }
    $('.payment-wizard li.jump-here').removeClass("jump-here");
}

// $(window).load(function(){
$(".done").click(function () {
    var id = $(this).parent().prev().attr("id");

    //得到值results
    var new_value;
    var change_info;
    var this_li_ind = $(this).parent().parent().parent("li").index();
    var wizard_heading = $(this).parent().parent().prev().children('span');
    if (id === undefined) {
        // 价格
        var bxyc = $('.bxyc');
        results['price'] = [bxyc.attr('data-leftNum'), bxyc.attr('data-rightNum')].toString();
        wizard_heading.text(bxyc.text())
    } else {
        //选图
        new_value = selectImgTake.submitTileIndex(id).toString();
        // console.log(new_value);
        if ((id === 'main_uses' || id === 'produce_type' || id === 'game_type') && results[id] !== undefined && new_value !== results[id]) {
            change_info = [results[id], new_value].toString();
            if (id === 'main_uses') {
                if (!(change_info === '2,1,2' || change_info === '1,2,2' || change_info === '3,1,3' || change_info === '1,3,3' || change_info === '2,3,1,2,3' || change_info === '1,2,3,2,3')) {
                    change_step(this_li_ind);
                }
            }
            if (id === 'game_type') {
                change_step(this_li_ind);
            }
            if (id === 'produce_type') {
                change_step(this_li_ind);
            }
        }
        results[id] = new_value;
        wizard_heading.text(selectImgTake.submitTileText(id))
    }
    console.log(results);
    console.log("====");

    //决定下一个li
    var next_li;
    if (results['main_uses'] === "1") {
        next_li = $("#ordinary_trait").parent().parent("li");
        if (results['ordinary_trait'] !== undefined) {
            next_li = check_submit();
        }
    }
    if (results['main_uses'] === '2' || results['main_uses'] === '1,2') {
        next_li = $("#game_type").parent().parent("li");
        if (results['game_type'] !== undefined) {
            if (results['game_type'] === '1') {
                next_li = $("#ordinary_trait").parent().parent("li");
                if (results['ordinary_trait'] !== undefined) {
                    next_li = check_submit();
                }
            }
            if (results['game_type'] === '2') {
                next_li = $("#game_example").parent().parent("li");
                if (results['game_example'] !== undefined) {
                    next_li = $("#game_vision").parent().parent("li");
                    if (results['game_vision'] !== undefined) {
                        next_li = check_submit();
                    }
                }
            }
        }
    }
    if (results['main_uses'] === '3' || results['main_uses'] === '1,3') {
        next_li = $("#produce_type").parent().parent("li");
        if (results['produce_type'] !== undefined) {
            if (results['produce_type'] === '1') {
                next_li = $("#ordinary_trait_1").parent().parent("li");
                if (results['ordinary_trait_1'] !== undefined) {
                    next_li = check_submit();
                }
            } else {
                next_li = check_submit();
            }
        }
    }
    if (results['main_uses'] === '2,3' || results['main_uses'] === '1,2,3') {
        next_li = $("#game_type").parent().parent("li");
        if (results['game_type'] !== undefined) {
            if (results['game_type'] === '1') {
                next_li = $("#produce_type").parent().parent("li");
                if (results['produce_type'] !== undefined) {
                    if (results['produce_type'] === '1') {
                        next_li = $("#ordinary_trait_1").parent().parent("li");
                        if (results['ordinary_trait_1'] !== undefined) {
                            next_li = check_submit();
                        }
                    } else {
                        next_li = check_submit();
                    }
                }
            }
            if (results['game_type'] === '2') {
                next_li = $("#game_example").parent().parent("li");
                if (results['game_example'] !== undefined) {
                    next_li = $("#game_vision").parent().parent("li");
                    if (results['game_vision'] !== undefined) {
                        next_li = $("#produce_type").parent().parent("li");
                        if (results['produce_type'] !== undefined) {
                            if (results['produce_type'] === '1') {
                                next_li = $("#ordinary_trait_1").parent().parent("li");
                                if (results['ordinary_trait_1'] !== undefined) {
                                    next_li = check_submit();
                                }
                            } else {
                                next_li = check_submit();
                            }
                        }
                    }
                }
            }
        }
    }

    //显示下一个li
    if ($('.payment-wizard li').hasClass("jump-here")) {
        console.log('jump');
        $(this).parent().parent().parent("li").removeClass("active").addClass("completed");
        $(this).parent().parent(".wizard-content").slideUp();
        $('.payment-wizard li.jump-here').removeClass("jump-here");
    } else {
        console.log('default');
        $(this).parent().parent().parent("li").removeClass("active").addClass("completed");
        $(this).parent().parent(".wizard-content").slideUp();
        // $(this).parent().parent().parent("li").next("li:not('.completed')").addClass('active').children('.wizard-content').slideDown();
        next_li.css("display", "block");
        next_li.addClass('active').children('.wizard-content').slideDown();
    }
});

$('.payment-wizard li .wizard-heading').click(function () {
    if ($(this).parent().hasClass('completed')) {
        var this_li_ind = $(this).parent("li").index();
        var li_ind = $('.payment-wizard li.active').index();
        if (this_li_ind < li_ind) {
            $('.payment-wizard li.active').addClass("jump-here");
        }
        $(this).parent().addClass('active').removeClass('completed');
        $(this).siblings('.wizard-content').slideDown();
    }
});
// })