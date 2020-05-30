// var step_ul = {
//     "ordinary_trait": "<li>\n" +
//         "                        <div class=\"wizard-heading\">\n" +
//         "                            期望特质\n" +
//         "                            <span class=\"icon-user\"></span>\n" +
//         "                        </div>\n" +
//         "                        <div class=\"wizard-content\">\n" +
//         "                            <div class=\"selectImgDiv\" id=\"ordinary_trait\" style=\"margin: 0 160px;\">\n" +
//         "                                <div class=\"item\">\n" +
//         "                                    <div class=\"img_show\">\n" +
//         "                                        <img th:src=\"@{select_img/images/1.jpg}\"/>\n" +
//         "                                    </div>\n" +
//         "                                    <div class=\"img_title\"  value=1>超大的容量</div>\n" +
//         "                                    <div class=\"img_isCheck\">\n" +
//         "                                        <i class=\"iconfont icon-xuanzhong\"></i>\n" +
//         "                                    </div>\n" +
//         "                                </div>\n" +
//         "                                <div class=\"item\">\n" +
//         "                                    <div class=\"img_show\">\n" +
//         "                                        <img th:src=\"@{select_img/images/3.png}\"/>\n" +
//         "                                    </div>\n" +
//         "                                    <div class=\"img_title\" value=2>准确的色彩</div>\n" +
//         "                                    <div class=\"img_isCheck\">\n" +
//         "                                        <i class=\"iconfont icon-xuanzhong\"></i>\n" +
//         "                                    </div>\n" +
//         "                                </div>\n" +
//         "                                <div class=\"item\">\n" +
//         "                                    <div class=\"img_show\">\n" +
//         "                                        <img th:src=\"@{select_img/images/4.png}\"/>\n" +
//         "                                    </div>\n" +
//         "                                    <div class=\"img_title\" value=3>丰富的接口</div>\n" +
//         "                                    <div class=\"img_isCheck\">\n" +
//         "                                        <i class=\"iconfont icon-xuanzhong\"></i>\n" +
//         "                                    </div>\n" +
//         "                                </div>\n" +
//         "                                <div class=\"item\">\n" +
//         "                                    <div class=\"img_show\">\n" +
//         "                                        <img th:src=\"@{select_img/images/4.png}\"/>\n" +
//         "                                    </div>\n" +
//         "                                    <div class=\"img_title\" value=4>非常持久的续航(续航时间>= 9小时)</div>\n" +
//         "                                    <div class=\"img_isCheck\">\n" +
//         "                                        <i class=\"iconfont icon-xuanzhong\"></i>\n" +
//         "                                    </div>\n" +
//         "                                </div>\n" +
//         "                            </div>\n" +
//         "\n" +
//         "                            <div class=\"site-btn mb-5\">\n" +
//         "                                <a class=\"skill-btn done\" style=\"float: right;\">下一个<i class=\"fas fa-arrow-right\"></i></a>\n" +
//         "                            </div>\n" +
//         "\n" +
//         "                        </div>\n" +
//         "                    </li>",
//
//     "game_type": "<li>\n" +
//         "                        <div class=\"wizard-heading\">\n" +
//         "                            游戏类型\n" +
//         "                            <span class=\"icon-user\"></span>\n" +
//         "                        </div>\n" +
//         "                        <div class=\"wizard-content\">\n" +
//         "                            <div class=\"toggle toggle--neon\">\n" +
//         "                                <input type=\"checkbox\" id=\"game_type\" class=\"toggle--checkbox\">\n" +
//         "                                <label class=\"toggle--btn\" for=\"game_type\" data-label-on=\"网页游戏\"  data-label-off=\"客户端游戏\"></label>\n" +
//         "                            </div>\n" +
//         "                            <div class=\"site-btn mb-5\">\n" +
//         "                                <a class=\"skill-btn done\" style=\"float: right;\">下一个<i class=\"fas fa-arrow-right\"></i></a>\n" +
//         "                            </div>\n" +
//         "                        </div>\n" +
//         "                    </li>",
//
//     "specific_game": "<li>\n" +
//         "                        <div class=\"wizard-heading\">\n" +
//         "                            主玩什么游戏\n" +
//         "                            <span class=\"icon-user\"></span>\n" +
//         "                        </div>\n" +
//         "                        <div class=\"wizard-content\">\n" +
//         "                            <div class=\"selectImgDiv\" id=\"specific_game\" style=\"margin: 0 160px;\">\n" +
//         "                                <div class=\"item\">\n" +
//         "                                    <div class=\"img_show\">\n" +
//         "                                        <img th:src=\"@{select_img/images/1.jpg}\"/>\n" +
//         "                                    </div>\n" +
//         "                                    <div class=\"img_title\" value=1>英雄联盟/cf</div>\n" +
//         "                                    <div class=\"img_isCheck\">\n" +
//         "                                        <i class=\"iconfont icon-xuanzhong\"></i>\n" +
//         "                                    </div>\n" +
//         "                                </div>\n" +
//         "                                <div class=\"item\">\n" +
//         "                                    <div class=\"img_show\">\n" +
//         "                                        <img th:src=\"@{select_img/images/1.jpg}\"/>\n" +
//         "                                    </div>\n" +
//         "                                    <div class=\"img_title\" value=2>csgo/dota2</div>\n" +
//         "                                    <div class=\"img_isCheck\">\n" +
//         "                                        <i class=\"iconfont icon-xuanzhong\"></i>\n" +
//         "                                    </div>\n" +
//         "                                </div>\n" +
//         "                                <div class=\"item\">\n" +
//         "                                    <div class=\"img_show\">\n" +
//         "                                        <img th:src=\"@{select_img/images/3.png}\"/>\n" +
//         "                                    </div>\n" +
//         "                                    <div class=\"img_title\" value=3>我的世界，守望先锋，绝地求生</div>\n" +
//         "                                    <div class=\"img_isCheck\">\n" +
//         "                                        <i class=\"iconfont icon-xuanzhong\"></i>\n" +
//         "                                    </div>\n" +
//         "                                </div>\n" +
//         "                                <div class=\"item\">\n" +
//         "                                    <div class=\"img_show\">\n" +
//         "                                        <img th:src=\"@{select_img/images/4.png}\"/>\n" +
//         "                                    </div>\n" +
//         "                                    <div class=\"img_title\" value=4>gta5，使命召唤，刺客信条</div>\n" +
//         "                                    <div class=\"img_isCheck\">\n" +
//         "                                        <i class=\"iconfont icon-xuanzhong\"></i>\n" +
//         "                                    </div>\n" +
//         "                                </div>\n" +
//         "                            </div>\n" +
//         "                            <div class=\"site-btn mb-5\">\n" +
//         "                                <a class=\"skill-btn done\" style=\"float: right;\">下一个<i class=\"fas fa-arrow-right\"></i></a>\n" +
//         "                            </div>\n" +
//         "\n" +
//         "                        </div>\n" +
//         "                    </li>",
//
//     "game_vision": " <li>\n" +
//         "                        <div class=\"wizard-heading\">\n" +
//         "                            游戏画质选择\n" +
//         "                            <span class=\"icon-user\"></span>\n" +
//         "                        </div>\n" +
//         "                        <div class=\"wizard-content\">\n" +
//         "                            <div class=\"selectImgDiv\" id=\"game_vision\" style=\"margin: 0 160px;\">\n" +
//         "                                <div class=\"item\">\n" +
//         "                                    <div class=\"img_show\">\n" +
//         "                                        <img th:src=\"@{select_img/images/1.jpg}\"/>\n" +
//         "                                    </div>\n" +
//         "                                    <div class=\"img_title\" value=1>能玩即可</div>\n" +
//         "                                    <div class=\"img_isCheck\">\n" +
//         "                                        <i class=\"iconfont icon-xuanzhong\"></i>\n" +
//         "                                    </div>\n" +
//         "                                </div>\n" +
//         "                                <div class=\"item\">\n" +
//         "                                    <div class=\"img_show\">\n" +
//         "                                        <img th:src=\"@{select_img/images/3.png}\"/>\n" +
//         "                                    </div>\n" +
//         "                                    <div class=\"img_title\" value=2>中特效</div>\n" +
//         "                                    <div class=\"img_isCheck\">\n" +
//         "                                        <i class=\"iconfont icon-xuanzhong\"></i>\n" +
//         "                                    </div>\n" +
//         "                                </div>\n" +
//         "                                <div class=\"item\">\n" +
//         "                                    <div class=\"img_show\">\n" +
//         "                                        <img th:src=\"@{select_img/images/4.png}\"/>\n" +
//         "                                    </div>\n" +
//         "                                    <div class=\"img_title\" value=3>特效全开</div>\n" +
//         "                                    <div class=\"img_isCheck\">\n" +
//         "                                        <i class=\"iconfont icon-xuanzhong\"></i>\n" +
//         "                                    </div>\n" +
//         "                                </div>\n" +
//         "                            </div>\n" +
//         "                            <div class=\"site-btn mb-5\">\n" +
//         "                                <a class=\"skill-btn done\" style=\"float: right;\">下一个<i class=\"fas fa-arrow-right\"></i></a>\n" +
//         "                            </div>\n" +
//         "\n" +
//         "                        </div>\n" +
//         "                    </li>",
//
//     "produce_type": "<li>\n" +
//         "                        <div class=\"wizard-heading\">\n" +
//         "                            生产力种类\n" +
//         "                            <span class=\"icon-user\"></span>\n" +
//         "                        </div>\n" +
//         "                        <div class=\"wizard-content\">\n" +
//         "                            <div class=\"selectImgDiv\" id=\"produce_type\" style=\"margin: 0 160px;\">\n" +
//         "                                <div class=\"item\">\n" +
//         "                                    <div class=\"img_show\">\n" +
//         "                                        <img th:src=\"@{select_img/images/1.jpg}\"/>\n" +
//         "                                    </div>\n" +
//         "                                    <div class=\"img_title\" value=1>代码工作/数据处理</div>\n" +
//         "                                    <div class=\"img_isCheck\">\n" +
//         "                                        <i class=\"iconfont icon-xuanzhong\"></i>\n" +
//         "                                    </div>\n" +
//         "                                </div>\n" +
//         "                                <div class=\"item\">\n" +
//         "                                    <div class=\"img_show\">\n" +
//         "                                        <img th:src=\"@{select_img/images/3.png}\"/>\n" +
//         "                                    </div>\n" +
//         "                                    <div class=\"img_title\" value=2>绘图/视频制作</div>\n" +
//         "                                    <div class=\"img_isCheck\">\n" +
//         "                                        <i class=\"iconfont icon-xuanzhong\"></i>\n" +
//         "                                    </div>\n" +
//         "                                </div>\n" +
//         "                                <div class=\"item\">\n" +
//         "                                    <div class=\"img_show\">\n" +
//         "                                        <img th:src=\"@{select_img/images/4.png}\"/>\n" +
//         "                                    </div>\n" +
//         "                                    <div class=\"img_title\" value=3>工业设计</div>\n" +
//         "                                    <div class=\"img_isCheck\">\n" +
//         "                                        <i class=\"iconfont icon-xuanzhong\"></i>\n" +
//         "                                    </div>\n" +
//         "                                </div>\n" +
//         "                            </div>\n" +
//         "                            <div class=\"site-btn mb-5\">\n" +
//         "                                <a class=\"skill-btn done\" style=\"float: right;\">下一个<i class=\"fas fa-arrow-right\"></i></a>\n" +
//         "                            </div>\n" +
//         "\n" +
//         "                        </div>\n" +
//         "                    </li>",
//
//     "ordinary_trait_1": "<li>\n" +
//         "                        <div class=\"wizard-heading\">\n" +
//         "                            期望特质\n" +
//         "                            <span class=\"icon-user\"></span>\n" +
//         "                        </div>\n" +
//         "                        <div class=\"wizard-content\">\n" +
//         "                            <div class=\"selectImgDiv\" id=\"ordinary_trait_1\" style=\"margin: 0 160px;\">\n" +
//         "                                <div class=\"item\">\n" +
//         "                                    <div class=\"img_show\">\n" +
//         "                                        <img th:src=\"@{select_img/images/1.jpg}\"/>\n" +
//         "                                    </div>\n" +
//         "                                    <div class=\"img_title\" value=1>准确的色彩</div>\n" +
//         "                                    <div class=\"img_isCheck\">\n" +
//         "                                        <i class=\"iconfont icon-xuanzhong\"></i>\n" +
//         "                                    </div>\n" +
//         "                                </div>\n" +
//         "                                <div class=\"item\">\n" +
//         "                                    <div class=\"img_show\">\n" +
//         "                                        <img th:src=\"@{select_img/images/3.png}\"/>\n" +
//         "                                    </div>\n" +
//         "                                    <div class=\"img_title\" value=2>丰富的接口</div>\n" +
//         "                                    <div class=\"img_isCheck\">\n" +
//         "                                        <i class=\"iconfont icon-xuanzhong\"></i>\n" +
//         "                                    </div>\n" +
//         "                                </div>\n" +
//         "                                <div class=\"item\">\n" +
//         "                                    <div class=\"img_show\">\n" +
//         "                                        <img th:src=\"@{select_img/images/4.png}\"/>\n" +
//         "                                    </div>\n" +
//         "                                    <div class=\"img_title\" value=3>非常持久的续航</div>\n" +
//         "                                    <div class=\"img_isCheck\">\n" +
//         "                                        <i class=\"iconfont icon-xuanzhong\"></i>\n" +
//         "                                    </div>\n" +
//         "                                </div>\n" +
//         "                            </div>\n" +
//         "                            <div class=\"site-btn mb-5\">\n" +
//         "                                <a class=\"skill-btn done\" style=\"float: right;\">下一个<i class=\"fas fa-arrow-right\"></i></a>\n" +
//         "                            </div>\n" +
//         "\n" +
//         "                        </div>\n" +
//         "                    </li>"
// };

var results = {};

$(function () {
    $(".payment-wizard").children("li").not($(".active")).css("display", "none");
});

// $(window).load(function(){
$(".done").click(function () {
    var id = $(this).parent().prev().attr("id");

    var new_value;
    var change_info;
    var weight_li_ind = $("#weight").parent().parent().parent("li").index();
    var this_li_ind = $(this).parent().parent().parent("li").index();
    var newest_li_ind = $('.payment-wizard li.jump-here').index();
    var i;
    var del_id;
    var wizard_heading = $(this).parent().parent().prev().children('span');
    if (id === undefined) {
        id = $(this).parent().prev().children("input").attr("id");
        if (id === undefined) {
            //价格
            results['price'] = [$('.bxyc').attr('data-leftNum'), $('.bxyc').attr('data-rightNum')].toString();
            wizard_heading.text($('.bxyc').text())
        } else {
            //开关
            new_value = $("#" + id).val();
            console.log(new_value);
            if (id === 'game_type' && results[id] !== undefined && new_value !== results[id]) {
                console.log("innd:", weight_li_ind, this_li_ind, newest_li_ind);
                for (i = this_li_ind+1; i <=newest_li_ind; i++) {
                    if(i<=Math.min(newest_li_ind, weight_li_ind-1)){
                        $(".payment-wizard li:eq(" + i + ")").css("display", "none");
                        del_id = $(".payment-wizard li:eq(" + i + ")").children().children(".selectImgDiv").attr("id");
                        if(del_id === undefined){
                            del_id = "game_type";
                        }
                        delete results[del_id];
                    }else {
                        $(".payment-wizard li:eq(" + i + ").active").removeClass("active");
                        $(".payment-wizard li:eq(" + i + ").completed").removeClass("completed");
                    }
                }
                $('.payment-wizard li.jump-here').removeClass("jump-here");
            }
            results[id] = $("#" + id).val();

            if ($("#" + id).val() === 'on') {
                wizard_heading.text($(this).parent().prev().children("label").data("labelOn"))
            }
            if ($("#" + id).val() === 'off') {
                wizard_heading.text($(this).parent().prev().children("label").data("labelOff"))
            }
        }
    } else {
        //选图
        new_value = selectImgTake.submitTileValue(id).toString();
        console.log(new_value);
        if ((id === 'main_scene' || id === 'produce_type') && results[id] !== undefined && new_value !== results[id]) {
            change_info = [results[id], new_value].toString();
            if (id === 'main_scene') {
                if (!(change_info === '2,1,2' || change_info === '1,2,2' || change_info === '3,1,3' || change_info === '1,3,3' || change_info === '2,3,1,2,3' || change_info === '1,2,3,2,3')) {
                    console.log("innd:", weight_li_ind, this_li_ind, newest_li_ind);
                    for (i = this_li_ind+1; i <=newest_li_ind; i++) {
                        if(i<=Math.min(newest_li_ind, weight_li_ind-1)){
                            $(".payment-wizard li:eq(" + i + ")").css("display", "none");
                            del_id = $(".payment-wizard li:eq(" + i + ")").children().children(".selectImgDiv").attr("id");
                            if(del_id === undefined){
                                del_id = "game_type";
                            }
                            delete results[del_id];
                        }else {
                            $(".payment-wizard li:eq(" + i + ").active").removeClass("active");
                            $(".payment-wizard li:eq(" + i + ").completed").removeClass("completed");
                        }
                    }
                    $('.payment-wizard li.jump-here').removeClass("jump-here");
                }
                results[id] = new_value;
            }
        } else {
            results[id] = new_value;
        }
        wizard_heading.text(selectImgTake.submitTileText(id))
    }
    console.log(results);
    console.log("====");

    // var step_ul = $("#step_ul");
    var next_li;
    if (results['main_scene'] === "1") {
        // step_ul.append(step_ul['ordinary_trait']);
        next_li = $("#ordinary_trait").parent().parent("li");
        if (results['ordinary_trait'] !== undefined) {
            // step_ul.append(step_ul['weight']);
            next_li = $("#weight").parent().parent().parent("li");
        }
    }
    if (results['main_scene'] === '2' || results['main_scene'] === '1,2') {
        // step_ul.append(step_ul['game_type']);
        next_li = $("#game_type").parent().parent().parent("li");
        if (results['game_type'] !== undefined) {
            if (results['game_type'] === 'on') {
                // step_ul.append(step_ul['ordinary_trait']);
                next_li = $("#ordinary_trait").parent().parent("li");
                if (results['ordinary_trait'] !== undefined) {
                    // step_ul.append(step_ul['weight']);
                    next_li = $("#weight").parent().parent().parent("li");
                }
            }
            if (results['game_type'] === 'off') {
                // step_ul.append(step_ul['specific_game']);
                next_li = $("#specific_game").parent().parent("li");
                if (results['specific_game'] !== undefined) {
                    // step_ul.append(step_ul['game_vision']);
                    next_li = $("#game_vision").parent().parent("li");
                    if (results['game_vision'] !== undefined) {
                        // step_ul.append(step_ul['weight']);
                        next_li = $("#weight").parent().parent().parent("li");
                    }
                }
            }
        }
    }
    if (results['main_scene'] === '3' || results['main_scene'] === '1,3') {
        // step_ul.append(step_ul['produce_type']);
        next_li = $("#produce_type").parent().parent("li");
        if (results['produce_type'] !== undefined) {
            if (results['produce_type'].indexOf('1') !== -1) {
                // step_ul.append(step_ul['produce_type']);
                next_li = $("#ordinary_trait_1").parent().parent("li");
                if (results['ordinary_trait_1'] !== undefined) {
                    next_li = $("#weight").parent().parent().parent("li");
                }
            } else {
                next_li = $("#weight").parent().parent().parent("li");
            }
        }
    }
    if (results['main_scene'] === '2,3' || results['main_scene'] === '1,2,3') {
        next_li = $("#game_type").parent().parent().parent("li");
        if (results['game_type'] !== undefined) {
            if (results['game_type'] === 'on') {
                next_li = $("#produce_type").parent().parent("li");
                if (results['produce_type'] !== undefined) {
                    if (results['produce_type'].indexOf('1') !== -1) {
                        next_li = $("#ordinary_trait_1").parent().parent("li");
                        if (results['ordinary_trait_1'] !== undefined) {
                            next_li = $("#weight").parent().parent().parent("li");
                        }
                    } else {
                        next_li = $("#weight").parent().parent().parent("li");
                    }
                }
            }
            if (results['game_type'] === 'off') {
                next_li = $("#specific_game").parent().parent("li");
                if (results['specific_game'] !== undefined) {
                    next_li = $("#game_vision").parent().parent("li");
                    if (results['game_vision'] !== undefined) {
                        next_li = $("#produce_type").parent().parent("li");
                        if (results['produce_type'] !== undefined) {
                            if (results['produce_type'].indexOf('1') !== -1) {
                                next_li = $("#ordinary_trait_1").parent().parent("li");
                                if (results['ordinary_trait_1'] !== undefined) {
                                    next_li = $("#weight").parent().parent().parent("li");
                                }
                            } else {
                                next_li = $("#weight").parent().parent().parent("li");
                            }
                        }
                    }
                }
            }
        }
    }
    if (results['weight'] !== undefined) {
        next_li = $(".navBox").parent().parent("li");
        console.log('a');
        if (results['price'] !== undefined) {
            //得到最后结果
            console.log('最后结果');
            next_li = $("#cd-table").parent().parent("li");


        }
    }

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