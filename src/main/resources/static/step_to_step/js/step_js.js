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
            console.log("最后结果显示数据")


        },
        error: function () {
            console.log("error")
        }
    })
}

// $(window).load(function(){
$(".done").click(function () {
    var id = $(this).parent().prev().attr("id");

    var new_value;
    var change_info;
    var weight_li_ind = $("#weight_type").parent().parent("li").index();
    var this_li_ind = $(this).parent().parent().parent("li").index();
    var newest_li_ind = $('.payment-wizard li.jump-here').index();
    var i;
    var del_id;
    var wizard_heading = $(this).parent().parent().prev().children('span');
    if (id === undefined) {
        // 价格
        results['price'] = [$('.bxyc').attr('data-leftNum'), $('.bxyc').attr('data-rightNum')].toString();
        wizard_heading.text($('.bxyc').text())
    } else {//选图
        new_value = selectImgTake.submitTileIndex(id).toString();
        console.log(new_value);
        if ((id === 'main_uses' || id === 'produce_type' || id === 'game_type') && results[id] !== undefined && new_value !== results[id]) {
            change_info = [results[id], new_value].toString();
            if (id === 'main_uses') {
                if (!(change_info === '2,1,2' || change_info === '1,2,2' || change_info === '3,1,3' || change_info === '1,3,3' || change_info === '2,3,1,2,3' || change_info === '1,2,3,2,3')) {
                    console.log("innd:", weight_li_ind, this_li_ind, newest_li_ind);
                    for (i = this_li_ind + 1; i <= newest_li_ind; i++) {
                        if (i <= Math.min(newest_li_ind, weight_li_ind - 1)) {
                            $(".payment-wizard li:eq(" + i + ")").css("display", "none");
                            del_id = $(".payment-wizard li:eq(" + i + ")").children().children(".selectImgDiv").attr("id");
                            delete results[del_id];
                        } else {
                            $(".payment-wizard li:eq(" + i + ").active").removeClass("active");
                            $(".payment-wizard li:eq(" + i + ").completed").removeClass("completed");
                        }
                    }
                    $('.payment-wizard li.jump-here').removeClass("jump-here");
                }
                results[id] = new_value;
            }
            if (id==='game_type'){
                console.log("innd:", weight_li_ind, this_li_ind, newest_li_ind);
                for (i = this_li_ind + 1; i <= newest_li_ind; i++) {
                    if (i <= Math.min(newest_li_ind, weight_li_ind - 1)) {
                        $(".payment-wizard li:eq(" + i + ")").css("display", "none");
                        del_id = $(".payment-wizard li:eq(" + i + ")").children().children(".selectImgDiv").attr("id");
                        delete results[del_id];
                    } else {
                        $(".payment-wizard li:eq(" + i + ").active").removeClass("active");
                        $(".payment-wizard li:eq(" + i + ").completed").removeClass("completed");
                    }
                }
                $('.payment-wizard li.jump-here').removeClass("jump-here");
            }
            if (id=== 'produce_type'){
                if(new_value === '1'){
                    console.log("更新生产方式")
                }
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
    if (results['main_uses'] === "1") {
        // step_ul.append(step_ul['ordinary_trait']);
        next_li = $("#ordinary_trait").parent().parent("li");
        if (results['ordinary_trait'] !== undefined) {
            // step_ul.append(step_ul['weight_type']);
            next_li = $("#weight_type").parent().parent("li");
        }
    }
    if (results['main_uses'] === '2' || results['main_uses'] === '1,2') {
        // step_ul.append(step_ul['game_type']);
        next_li = $("#game_type").parent().parent("li");
        if (results['game_type'] !== undefined) {
            if (results['game_type'] === '1') {
                // step_ul.append(step_ul['ordinary_trait']);
                next_li = $("#ordinary_trait").parent().parent("li");
                if (results['ordinary_trait'] !== undefined) {
                    // step_ul.append(step_ul['weight_type']);
                    next_li = $("#weight_type").parent().parent("li");
                }
            }
            if (results['game_type'] === '2') {
                // step_ul.append(step_ul['game_example']);
                next_li = $("#game_example").parent().parent("li");
                if (results['game_example'] !== undefined) {
                    // step_ul.append(step_ul['game_vision']);
                    next_li = $("#game_vision").parent().parent("li");
                    if (results['game_vision'] !== undefined) {
                        // step_ul.append(step_ul['weight_type']);
                        next_li = $("#weight_type").parent().parent("li");
                    }
                }
            }
        }
    }
    if (results['main_uses'] === '3' || results['main_uses'] === '1,3') {
        // step_ul.append(step_ul['produce_type']);
        next_li = $("#produce_type").parent().parent("li");
        if (results['produce_type'] !== undefined) {
            if (results['produce_type'] === '1') {
                // step_ul.append(step_ul['produce_type']);
                next_li = $("#ordinary_trait_1").parent().parent("li");
                if (results['ordinary_trait_1'] !== undefined) {
                    next_li = $("#weight_type").parent().parent("li");
                }
            } else {
                next_li = $("#weight_type").parent().parent("li");
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
                            next_li = $("#weight_type").parent().parent("li");
                        }
                    } else {
                        next_li = $("#weight_type").parent().parent("li");
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
                                    next_li = $("#weight_type").parent().parent("li");
                                }
                            } else {
                                next_li = $("#weight_type").parent().parent("li");
                            }
                        }
                    }
                }
            }
        }
    }
    if (results['weight_type'] !== undefined) {
        next_li = $(".navBox").parent().parent("li");
        console.log('a');
        if (results['price'] !== undefined) {
            //得到最后结果
            submit_reaults(results);

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