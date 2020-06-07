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
            $("section.grid").html("");
            $(".tips").html("");
            var j_data = JSON.parse(data);
            // 'error'：1表示筛选过严无数据，0正常
            // 'loosen'：1表示放宽过金额限制（即把金额上限x1.5再查一次），0正常
            // 'content'结果列表（之前的json）
            var error = j_data.error;
            var loosen = j_data.loosen;
            var laptops = j_data.content;

            if (error === 1) {
                $(".tips").append("<blockquote>您的条件太苛刻啦(＃°Д°)，没有适合您的产品，您可以选择适当放宽条件。</blockquote>");
            } else {
                if (loosen === 1) {
                    $(".tips").append("<div><blockquote> 您的价格范围太苛刻了，没有适合您的产品。以下是放宽价格限制后的推荐结果。</blockquote></div>");
                }
                laptops.forEach(function (laptop, index, laptops) {
                    console.log('update');
                    $("section.grid").append("<div class='product' style='display: none'>\n" +
                        "                                        <div class='product__info'>\n" +
                        "                                            <img class='product__image' src='" + laptop.pictures + "' alt='Product' style='cursor: pointer' />\n" +
                        "                                            <h3 class='product__title' style='color: white' >" + laptop.name + "</h3>\n" +
                        "                                            <div class='highlight' ><span>类型：</span><span >" + laptop.type + "</span></div>\n" +
                        "                                            <div class='parameter extra highlight' ><span>上市时间：</span><span>" + laptop.releaseMonth + "</span></div>\n" +
                        "                                            <div class='parameter extra highlight'><span>CPU：</span><span class='cpu' >" + laptop.cpu + "</span>\n" +
                        "                                                <span>&emsp;</span><span class='cores' >" + laptop.cores + "</span><span>核</span><span class='threads'>" + laptop.threads + "</span><span>线程</span><span>&emsp;</span>\n" +
                        "                                                <span class='clock' >" + laptop.cpuClock + "</span><span>-</span><span class='turbo'>" + laptop.cpuTurbo + "</span><span>GHz</span>\n" +
                        "                                                <span class='singleMark' style='display: none'>" + laptop.singleMark + "</span><span class='multiMark' style='display: none'>" + laptop.multiMark + "</span>\n" +
                        "                                                <span class='cpuOutdated' style='display: none'>" + laptop.cpuOutdated + "</span>\n" +
                        "                                                <a target='_blank' href='/blog-details?hardware=cpu'>\n" +
                        "                                                    <div class='help-tip'>\n" +
                        "                                                        <span class='cpuTips'></span>\n" +
                        "                                                    </div>\n" +
                        "                                                </a>\n" +
                        "                                                <a target='_blank' href='/blog-details?hardware=cpu'>\n" +
                        "                                                    <div class='alert-tip'>\n" +
                        "                                                        <span class='cpuAlerts'>该型号已较为老旧。</span>\n" +
                        "                                                    </div>\n" +
                        "                                                </a>\n" +
                        "                                            </div>\n" +
                        "                                            <div class='parameter extra highlight'><span>显卡：</span><span>" + laptop.gpu + "</span>\n" +
                        "                                                <span class='gpuMark' style='display: none'>" + laptop.gpuMark + "</span><span class='gpuOutdated' style='display: none'>" + laptop.gpuOutdated + "</span>\n" +
                        "                                                <a target='_blank' href='/blog-details?hardware=gpu'>\n" +
                        "                                                    <div class='help-tip'>\n" +
                        "                                                        <span class='gpuTips'></span>\n" +
                        "                                                    </div>\n" +
                        "                                                </a>\n" +
                        "                                                <a target='_blank' href='/blog-details?hardware=gpu'>\n" +
                        "                                                    <div class='alert-tip'>\n" +
                        "                                                        <span class='gpuAlerts'>该型号已较为老旧。</span>\n" +
                        "                                                    </div>\n" +
                        "                                                </a>\n" +
                        "                                            </div>\n" +
                        "                                            <div class='parameter extra highlight' ><span>内存大小：</span><span class='memorySize'>" + laptop.memorySize + "</span><span>G</span>\n" +
                        "                                                <a target='_blank' href='/blog-details?hardware=memory'>\n" +
                        "                                                    <div class='help-tip'>\n" +
                        "                                                        <span class='memorySizeTips'></span>\n" +
                        "                                                    </div>\n" +
                        "                                                </a>\n" +
                        "                                            </div>\n" +
                        "                                            <div class='parameter extra highlight'><span>内存类型：</span><span class='memoryType'>" + laptop.memoryGen + "</span><span>&emsp;</span>\n" +
                        "                                                <span class='memoryRate'>" + laptop.memoryRate + "</span><span>MHz</span>\n" +
                        "                                                <a target='_blank' href='/blog-details?hardware=memory'>\n" +
                        "                                                    <div class='help-tip'>\n" +
                        "                                                        <span class='memoryTypeTips'></span>\n" +
                        "                                                    </div>\n" +
                        "                                                </a>\n" +
                        "                                            </div>\n" +
                        "                                            <div class='parameter extra highlight'><span>硬盘大小：</span><span class='storage'>" + laptop.storage + "</span><span>G</span>\n" +
                        "                                                <a target='_blank' href='/blog-details?hardware=storage'>\n" +
                        "                                                    <div class='help-tip'>\n" +
                        "                                                        <span class='storageTips'></span>\n" +
                        "                                                    </div>\n" +
                        "                                                </a>\n" +
                        "                                            </div>\n" +
                        "                                            <div class='parameter extra highlight'><span>屏幕尺寸：</span><span class='screenSize'>" + laptop.screenSize + "</span><span>寸</span>\n" +
                        "                                                <a target='_blank' href='/blog-details?hardware=screen'>\n" +
                        "                                                    <div class='alert-tip'>\n" +
                        "                                                        <span class='screenSizeAlerts'>尺寸较大，不易放入普通双肩包。</span>\n" +
                        "                                                    </div>\n" +
                        "                                                </a>\n" +
                        "                                            </div>\n" +
                        "                                            <div class='parameter extra highlight'><span>分辨率：</span><span class='resolution'>" + laptop.resolution + "</span>\n" +
                        "                                                <a target='_blank' href='/blog-details?hardware=screen'>\n" +
                        "                                                    <div class='help-tip'>\n" +
                        "                                                        <span class='resolutionTips'></span>\n" +
                        "                                                    </div>\n" +
                        "                                                </a>\n" +
                        "                                            </div>\n" +
                        "                                            <div class='parameter extra highlight'><span>屏幕色域：</span><span class='gamut'>" + laptop.gamut + "</span><span>%NTSC</span>\n" +
                        "                                                <a target='_blank' href='/blog-details?hardware=screen'>\n" +
                        "                                                    <div class='help-tip'>\n" +
                        "                                                        <span class='gamutTips'></span>\n" +
                        "                                                    </div>\n" +
                        "                                                </a>\n" +
                        "                                            </div>\n" +
                        "                                            <div class='parameter extra highlight'><span>屏幕刷新率：</span><span class='refreshRate'>" + laptop.refreshRate + "</span><span>Hz</span>\n" +
                        "                                                <a target='_blank' href='/blog-details?hardware=screen'>\n" +
                        "                                                    <div class='help-tip'>\n" +
                        "                                                        <span class='refreshRateTips'></span>\n" +
                        "                                                    </div>\n" +
                        "                                                </a>\n" +
                        "                                            </div>\n" +
                        "                                            <div class='parameter extra highlight'><span>接口情况：USB*</span><span class='usb'>" + laptop.usb + "</span><span>&emsp;Type-c*</span><span>" + laptop.typec + "</span>\n" +
                        "                                                &emsp;<span>&emsp;雷电*</span><span class='thunderbolt'>" + laptop.thunderbolt + "</span><span>&emsp;显示接口：</span><span>" + laptop.video + "</span><span>&emsp;网线接口：</span><span class='rj45'>" + laptop.rj45 + "</span>\n" +
                        "                                                <a target='_blank' href='/blog-details?hardware=interface'>\n" +
                        "                                                    <div class='help-tip'>\n" +
                        "                                                        <span class='interfaceTips'></span>\n" +
                        "                                                    </div>\n" +
                        "                                                </a>\n" +
                        "                                            </div>\n" +
                        "                                            <div class='parameter extra highlight'><span>重量：</span><span class='weight'>" + laptop.weight + "</span><span>KG</span>\n" +
                        "                                                <a target='_blank'>\n" +
                        "                                                    <div class='alert-tip'>\n" +
                        "                                                        <span class='weightAlerts'>此机器较为沉重。</span>\n" +
                        "                                                    </div>\n" +
                        "                                                </a>\n" +
                        "                                            </div>\n" +
                        "                                            <div class='parameter extra highlight'><span>厚度：</span><span class='thickness'>" + laptop.thickness + "</span><span>mm</span>\n" +
                        "                                                <a target='_blank'>\n" +
                        "                                                    <div class='alert-tip'>\n" +
                        "                                                        <span class='thicknessAlerts'>此机器较厚。</span>\n" +
                        "                                                    </div>\n" +
                        "                                                </a>\n" +
                        "                                            </div>\n" +
                        "                                            <div class='parameter extra highlight'><span>续航时间：</span><span>" + laptop.duration + "</span><span>h</span></div>" +
                        "                                            <div class='parameter product__price highlight'><span>参考价：</span><span>" + laptop.price + "</span></div>\n" +
                        "                                        </div>\n" +
                        "                                        <label class='action action--compare-add'><input class='check-hidden' type='checkbox' /><i class='fa fa-plus'></i><i class='fa fa-check'></i><span class='action__text action__text--invisible'>加入对比</span></label>\n" +
                        "                                    </div>")
                    }
                );
            }

            first_ini();
            product_compare();
            click_img();
        },
        error: function () {
            console.log("error")
        }
    })
}

function click_img(){
    cpuDetail=['文字办公，影音娱乐，部分腾讯游戏。','中端级别，满足多数使用场景。','发烧级别，基本没有限制。'];
    gpuDetail=['文字办公，影音娱乐。','入门级别，适合腾讯游戏全家桶。','中端级别，满足多数使用场景。','发烧级别，基本没有限制。'];
    memorySizeDetail = ['容量小，仅文字办公，影音娱乐。','主流容量，满足多数使用场景。','大容量，一般不是瓶颈。'];
    memoryRateDetail = ['主流频率，满足多数使用场景。','高频率，部分游戏有提升效果。'];
    storageDetail = ['容量小，不适合放较多软件和资料。','主流容量，满足多数使用场景。','大容量，可劲儿存。'];
    gamutDetail = ['低色域屏幕，总体观感一般。','高色域屏幕，色彩更丰富、准确。'];
    refreshRateDetail = ['普通刷新率，适合多数用户。','高刷新率，射击类游戏体验更好。'];
    interfacesDetail = ['USB接口数较多。', '雷电接口外接设备能力强。', '可使用网线连网。', '接口较少，可能需要配合转接头或拓展坞。'];
    $(document).ready(function () {
        $('.product__image').click(function () {
            productHtml=$(this).parent().html();
            $('#product_browse .compare__effect').html(productHtml);
            // alerts
            if (parseFloat($('#product_browse span.weight').text()) < 2.6) {
                $('#product_browse span.weightAlerts').parent().parent().remove();
            }
            if (parseFloat($('#product_browse span.thickness').text()) < 25.0) {
                $('#product_browse span.thicknessAlerts').parent().parent().remove();
            }
            if (parseFloat($('#product_browse span.screenSize').text()) < 16.5) {
                $('#product_browse span.screenSizeAlerts').parent().parent().remove();
            }
            if (parseInt($('#product_browse span.cpuOutdated').text()) ===0) {
                $('#product_browse span.cpuAlerts').parent().parent().remove();
            }
            if (parseInt($('#product_browse span.gpuOutdated').text()) ===0) {
                $('#product_browse span.gpuAlerts').parent().parent().remove();
            }
            // tips
            cpuMark=parseInt($('#product_browse span.multiMark').text());
            cpuTips=$('#product_browse span.cpuTips');
            if (cpuMark<805){
                cpuTips.text(cpuDetail[0]);
            }else if(cpuMark<1346){
                cpuTips.text(cpuDetail[1]);
            }else {
                cpuTips.text(cpuDetail[2]);
            }

            gpuMark=parseInt($('#product_browse span.gpuMark').text());
            gpuTips=$('#product_browse span.gpuTips');
            if (gpuMark<1){
                gpuTips.text(gpuDetail[0]);
            }else if(gpuMark<2947){
                gpuTips.text(gpuDetail[1]);
            }else if (gpuMark<5929){
                gpuTips.text(gpuDetail[2]);
            }else{
                gpuTips.text(gpuDetail[3]);
            }

            Size=parseInt($('#product_browse span.memorySize').text());
            memorySizeTips=$('#product_browse span.memorySizeTips');
            if (Size<=8){
                memorySizeTips.text(memorySizeDetail[0]);
            }else if(Size<=16){
                memorySizeTips.text(memorySizeDetail[1]);
            }else {
                memorySizeTips.text(memorySizeDetail[2]);
            }

            Rate=parseInt($('#product_browse span.memoryRate').text());
            memoryTypeTips=$('#product_browse span.memoryTypeTips');
            if (Rate<=2666){
                memoryTypeTips.text(memoryRateDetail[0]);
            }else {
                memoryTypeTips.text(memoryRateDetail[1]);
            }

            Size=parseInt($('#product_browse span.storage').text());
            storageTips=$('#product_browse span.storageTips');
            if (Size<=256){
                storageTips.text(storageDetail[0]);
            }else if(Size<=512){
                storageTips.text(storageDetail[1]);
            }else {
                storageTips.text(storageDetail[2]);
            }

            proGamut=parseInt($('#product_browse span.gamut').text());
            gamutTips=$('#product_browse span.gamutTips');
            if (proGamut<70){
                gamutTips.text(gamutDetail[0]);
            }else {
                gamutTips.text(gamutDetail[1]);
            }

            proRefresh=parseInt($('#product_browse span.refreshRate').text());
            refreshRateTips=$('#product_browse span.refreshRateTips');
            if (proRefresh<70){
                refreshRateTips.text(refreshRateDetail[0]);
            }else {
                refreshRateTips.text(refreshRateDetail[1]);
            }

            resolutionTips=$('#product_browse span.resolutionTips');
            switch ($('#product_browse span.resolution').text()) {
                case '1366×768' :
                    resolutionTips.text('低分辨率，观感较差。');
                    break;
                case '1680×1050':
                    resolutionTips.text('略低于市场主流分辨率。');
                    break;
                case '1920×1080':
                    resolutionTips.text('市场主流分辨率。');
                    break;
                default:
                    resolutionTips.text('高分辨率，画面细节更丰富,更适合图像工作者。');
                    break;
            }

            interfaceTips=$('#product_browse span.interfaceTips');
            if (parseInt($('#product_browse span.usb').text()) > 1) {
                interfaceTips.append(interfacesDetail[0]);
            } else {
                interfaceTips.append(interfacesDetail[3]);
            }
            if (parseInt($('#product_browse span.thunderbolt').text()) > 0) {
                interfaceTips.append(interfacesDetail[1]);
            }
            if (parseInt($('#product_browse span.rj45').text()) > 0) {
                interfaceTips.append(interfacesDetail[2]);
            }
            $('#product_browse').modal('show');
        });
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

function first_ini() {
    /*初始化*/
    var counter = 0; /*计数器*/
    var itemStart = 0; /*offset*/
    var itemSize = 4; /*size*/

    /*首次加载*/
    getData(itemStart, itemSize);
    /*监听加载更多*/
    $(document).on('click', '#more', function () {
        counter++;
        itemStart = counter * itemSize;

        getData(itemStart, itemSize);
    });

}

function getData(offset, size) {
    var products = document.getElementsByClassName("product");
    var sum = products.length;

    if (offset != 0) {
        var elem = document.getElementById('more');
        elem.parentNode.removeChild(elem);
    }
    /****业务逻辑块：实现拼接html内容并append到页面*********/

    //console.log(offset , size, sum);

    /*如果剩下的记录数不够一行，就让一行取剩下的记录数
    * 例如一行是5，只剩2条，则只取2条
    *

    */
    if (sum - offset < size) {
        size = sum - offset;
    }

    /*使用for循环模拟SQL里的limit(offset,size)*/
    for (var i = offset; i < (offset + size); i++) {
        products[i].setAttribute('id', i);
        // products[i].classList.remove("hidden");
        products[i].style.display = "block";
    }
    last_id = offset + size - 1;
    $('#' + last_id).after(' <div class="site-btn mb-5" id="more"><a href="#" class="skill-btn" id="more-a">加载更多</a></div>');

    /*隐藏more按钮*/

    if ((offset + size) >= sum) {

        $("#more-a").text('推荐完毕');
    }


}

/**
 * main.js
 */

function product_compare() {

    Level = [['综合性能相对较低，', '综合性能相对较高，'], ['性能相对较弱，', '性能相对较强，'], ['容量相对小，', '容量相对大，'], ['低色域屏幕，', '高色域屏幕，']];
    cpu = [['可以满足文字办公影音需求。', '可以胜任更繁重的工作。'], ['可以满足多数游戏。', '单核性能强，游戏更加流畅。'], ['基本满足生产工具需求。', '作为生产工具可节约更多时间。']];
    gpu = [['无压力满足文字办公影音需求。'], ['可以满足一些国民游戏。', '多数游戏中低特效。', '游戏基本无限制。'], ['不会有严重影响。', '支持显卡加速的计算（人工智能，渲染）节约部分时间']];
    memorySize = [['满足文字办公影音需求。', '可以同时开启更多软件。'], ['可以满足多数游戏。', '游戏无压力。'], ['作为生产工具必备容量。', '作为生产工具多多益善。']];
    memoryRate = ['频率相对低，可以满足需求。', '频率相对高，对少部分游戏有提升效果。'];
    storage = [['不适合存放大量资料。', '存放较多资料和软件。'], ['游戏玩家基础容量。', '可存放多款大型游戏。'], ['生产工具基础容量。', '可安装许多软件，保存大量项目文件。']];
    gamut = [['不会影响文字办公和网页浏览。', '更好的观影体验。'], ['游戏画面展现一般。', '更真实的游戏画面体验。'], ['不会影响代码类的工作。', '图像工作者必备。']];
    refreshRate = ['普通刷新率，满足多数需求。', '高刷新率，竞技游戏更加连贯。'];
    interfaces = ['USB接口数较多。', '雷电接口外接设备能力强。', '可使用网线连网。', '接口类型较少，可能需要配合转接头或拓展坞。'];

    var viewEl = document.querySelector('.view'),
        gridEl = viewEl.querySelector('.grid'),
        items = [].slice.call(gridEl.querySelectorAll('.product')),
        basket;
    // console.log('view');
    // console.log(viewEl);
    // console.log(gridEl.querySelectorAll('.product'));

// the compare basket
    function CompareBasket() {
        this.el = document.querySelector('.compare-basket');
        // console.log(this.el);
        // console.log('el');
        this.compareCtrl = this.el.querySelector('.action--compare');
        this.compareWrapper = document.querySelector('.compare');
        this.closeCompareCtrl = this.compareWrapper.querySelector('.action--close');

        this.itemsAllowed = 2;
        this.totalItems = 0;
        this.items = [];

        // compares items in the compare basket: opens the compare products wrapper
        this.compareCtrl.addEventListener('click', this._compareItems.bind(this));
        // close the compare products wrapper
        var self = this;
        this.closeCompareCtrl.addEventListener('click', function () {
            // toggle compare basket
            classie.add(self.el, 'compare-basket--active');
            // animate..
            classie.remove(viewEl, 'view--compare');
        });
    }

    CompareBasket.prototype.add = function (item) {
        // check limit
        if (this.isFull()) {
            return false;
        }

        classie.add(item, 'product--selected');

        // create item preview element
        var preview = this._createItemPreview(item);
        // prepend it to the basket
        this.el.insertBefore(preview, this.el.childNodes[0]);
        // insert item

        this.items.push(preview);
        console.log(this.items);

        this.totalItems++;
        if (this.isFull()) {
            classie.add(this.el, 'compare-basket--full');
        }

        classie.add(this.el, 'compare-basket--active');
    };

    CompareBasket.prototype._createItemPreview = function (item) {
        // console.log('itempreview');
        var self = this;

        var preview = document.createElement('div');
        // console.log('preview');
        preview.className = 'product-icon';
        preview.setAttribute('data-idx', items.indexOf(item));

        var removeCtrl = document.createElement('button');
        removeCtrl.className = 'action action--remove';
        removeCtrl.innerHTML = '<i class="fa fa-remove"></i><span class="action__text action__text--invisible">Remove product</span>';
        removeCtrl.addEventListener('click', function () {
            self.remove(item);
        });

        var productImageEl = item.querySelector('img.product__image').cloneNode(true);

        preview.appendChild(productImageEl);
        preview.appendChild(removeCtrl);

        var productInfo = item.querySelector('.product__info').innerHTML;
        preview.setAttribute('data-info', productInfo);

        return preview;
    };

    CompareBasket.prototype.remove = function (item) {
        classie.remove(this.el, 'compare-basket--full');
        classie.remove(item, 'product--selected');
        var preview = this.el.querySelector('[data-idx = "' + items.indexOf(item) + '"]');
        this.el.removeChild(preview);
        this.totalItems--;

        var indexRemove = this.items.indexOf(preview);
        this.items.splice(indexRemove, 1);

        if (this.totalItems === 0) {
            classie.remove(this.el, 'compare-basket--active');
        }

        // checkbox
        var checkbox = item.querySelector('.action--compare-add > input[type = "checkbox"]');
        if (checkbox.checked) {
            checkbox.checked = false;
        }
    };

    CompareBasket.prototype._compareItems = function () {
        var self = this;

        // remove all previous items inside the compareWrapper element
        [].slice.call(this.compareWrapper.querySelectorAll('div.compare__item')).forEach(function (item) {
            self.compareWrapper.removeChild(item);
        });

        for (i = 0; i < this.totalItems; ++i) {
            console.log('items');
            var compareItemWrapper = document.createElement('div');
            compareItemWrapper.className = 'compare__item';

            var compareItemEffectEl = document.createElement('div');
            compareItemEffectEl.className = 'compare__effect';

            compareItemEffectEl.innerHTML = this.items[i].getAttribute('data-info');
            // alert(compareItemEffectEl.querySelector('span.cpu').textContent);
            compareItemWrapper.appendChild(compareItemEffectEl);

            this.compareWrapper.insertBefore(compareItemWrapper, this.compareWrapper.childNodes[0]);
        }

        //高亮字段
        var columnList = document.getElementsByClassName('column');
        for (i = 0; i < columnList.length; i++) {

            columnList[i].style.fontWeight = 'bold';
            columnList[i].style.fontsize = '120%';
        }


        var compareList = document.querySelectorAll('div.compare__item');
        useArray = results['main_uses'].split(',');
        cpu0 = compareList[0].querySelector('span.cpu').textContent;
        cpu1 = compareList[1].querySelector('span.cpu').textContent;
        singleMark0 = parseInt(compareList[0].querySelector('span.singleMark').textContent);
        singleMark1 = parseInt(compareList[1].querySelector('span.singleMark').textContent);
        multiMark0 = parseInt(compareList[0].querySelector('span.multiMark').textContent);
        multiMark1 = parseInt(compareList[1].querySelector('span.multiMark').textContent);
        for (i = 0; i < 2; i++) {
            if (compareList[i].querySelector('span.cpuOutdated').textContent === '0')
                compareList[i].querySelectorAll('div.parameter')[1].querySelectorAll('a')[1].remove();
        }
        if (cpu0 === cpu1) {
            compareList[0].querySelectorAll('div.parameter')[1].querySelectorAll('a')[0].remove();
            compareList[1].querySelectorAll('div.parameter')[1].querySelectorAll('a')[0].remove();
        } else {
            index0 = (multiMark0 > multiMark1 ? 1 : 0);
            index1 = (multiMark0 > multiMark1 ? 0 : 1);
            compareList[0].querySelector('span.cpuTips').textContent += Level[0][index0];
            compareList[1].querySelector('span.cpuTips').textContent += Level[0][index1];
            for (i = 0; i < useArray.length; i++) {
                switch (useArray[i]) {
                    case '1':
                        compareList[0].querySelector('span.cpuTips').textContent += cpu[0][index0];
                        compareList[1].querySelector('span.cpuTips').textContent += cpu[0][index1];
                        break;
                    case '2':
                        if (singleMark0 > singleMark1) {
                            compareList[0].querySelector('span.cpuTips').textContent += cpu[1][1];
                            compareList[1].querySelector('span.cpuTips').textContent += cpu[1][0];
                        } else {
                            compareList[0].querySelector('span.cpuTips').textContent += cpu[1][0];
                            compareList[1].querySelector('span.cpuTips').textContent += cpu[1][1];
                        }
                        break;
                    case '3':
                        compareList[0].querySelector('span.cpuTips').textContent += cpu[2][index0];
                        compareList[1].querySelector('span.cpuTips').textContent += cpu[2][index1];
                        break;
                }
            }
            if (singleMark0 > singleMark1 && useArray.indexOf('2') > -1) {

            }

        }

        gpuMark0 = parseInt(compareList[0].querySelector('span.gpuMark').textContent);
        gpuMark1 = parseInt(compareList[1].querySelector('span.gpuMark').textContent);
        for (i = 0; i < 2; i++) {
            if (compareList[i].querySelector('span.gpuOutdated').textContent === '0')
                compareList[i].querySelectorAll('div.parameter')[2].querySelectorAll('a')[1].remove();
        }
        if (gpuMark0 === gpuMark1) {
            compareList[0].querySelectorAll('div.parameter')[2].querySelectorAll('a')[0].remove();
            compareList[1].querySelectorAll('div.parameter')[2].querySelectorAll('a')[0].remove();
        } else {
            index0 = (gpuMark0 > gpuMark1 ? 1 : 0);
            index1 = (gpuMark0 > gpuMark1 ? 0 : 1);
            compareList[0].querySelector('span.gpuTips').textContent += Level[1][index0];
            compareList[1].querySelector('span.gpuTips').textContent += Level[1][index1];
            for (i = 0; i < useArray.length; i++) {
                switch (useArray[i]) {
                    case '1':
                        compareList[0].querySelector('span.gpuTips').textContent += gpu[0][0];
                        compareList[1].querySelector('span.gpuTips').textContent += gpu[0][0];
                        break;
                    case '2':
                        if (gpuMark0 < 2946 && gpuMark0 > 0) {
                            compareList[0].querySelector('span.gpuTips').textContent += gpu[1][0];
                        } else if (gpuMark0 <= 5647) {
                            compareList[0].querySelector('span.gpuTips').textContent += gpu[1][1];
                        } else {
                            compareList[0].querySelector('span.gpuTips').textContent += gpu[1][2];
                        }
                        if (gpuMark1 < 2946 && gpuMark1 > 0) {
                            compareList[1].querySelector('span.gpuTips').textContent += gpu[1][0];
                        } else if (gpuMark1 <= 5647) {
                            compareList[1].querySelector('span.gpuTips').textContent += gpu[1][1];
                        } else {
                            compareList[1].querySelector('span.gpuTips').textContent += gpu[1][2];
                        }
                        break;
                    case '3':
                        compareList[0].querySelector('span.gpuTips').textContent += gpu[2][index0];
                        compareList[1].querySelector('span.gpuTips').textContent += gpu[2][index1];
                        break;
                }

            }


        }

        memorySize0 = parseInt(compareList[0].querySelector('span.memorySize').textContent);
        memorySize1 = parseInt(compareList[1].querySelector('span.memorySize').textContent);
        if (memorySize0 === memorySize1) {
            compareList[0].querySelectorAll('div.parameter')[3].querySelector('a').remove();
            compareList[1].querySelectorAll('div.parameter')[3].querySelector('a').remove();
        } else {
            index0 = (memorySize0 > memorySize1 ? 1 : 0);
            index1 = (memorySize0 > memorySize1 ? 0 : 1);
            compareList[0].querySelector('span.memorySizeTips').textContent += Level[2][index0];
            compareList[1].querySelector('span.memorySizeTips').textContent += Level[2][index1];
            for (i = 0; i < useArray.length; i++) {
                switch (useArray[i]) {
                    case '1':
                        compareList[0].querySelector('span.memorySizeTips').textContent += memorySize[0][index0];
                        compareList[1].querySelector('span.memorySizeTips').textContent += memorySize[0][index1];
                        break;
                    case '2':
                        if (Math.min(memorySize0, memorySize1) > 16) {
                            compareList[0].querySelector('span.memorySizeTips').textContent += memorySize[1][1];
                            compareList[1].querySelector('span.memorySizeTips').textContent += memorySize[1][1];
                        } else {
                            compareList[0].querySelector('span.memorySizeTips').textContent += memorySize[1][index0];
                            compareList[1].querySelector('span.memorySizeTips').textContent += memorySize[1][index1];
                        }
                        break;
                    case '3':
                        if (Math.min(memorySize0, memorySize1) > 16) {
                            compareList[0].querySelector('span.memorySizeTips').textContent += memorySize[2][1];
                            compareList[1].querySelector('span.memorySizeTips').textContent += memorySize[2][1];
                        } else {
                            compareList[0].querySelector('span.memorySizeTips').textContent += memorySize[2][index0];
                            compareList[1].querySelector('span.memorySizeTips').textContent += memorySize[2][index1];
                        }
                        break;
                }

            }


        }

        memoryRate0 = parseInt(compareList[0].querySelector('span.memoryRate').textContent);
        memoryRate1 = parseInt(compareList[1].querySelector('span.memoryRate').textContent);
        if (memoryRate0 === memoryRate1 || useArray.indexOf('2') === -1) {
            compareList[0].querySelectorAll('div.parameter')[4].querySelector('a').remove();
            compareList[1].querySelectorAll('div.parameter')[4].querySelector('a').remove();
        } else {
            index0 = (memoryRate0 > memoryRate1 ? 1 : 0);
            index1 = (memoryRate0 > memoryRate1 ? 0 : 1);
            compareList[0].querySelector('span.memoryTypeTips').textContent += memoryRate[index0];
            compareList[1].querySelector('span.memoryTypeTips').textContent += memoryRate[index1];
        }

        storage0 = parseInt(compareList[0].querySelector('span.storage').textContent);
        storage1 = parseInt(compareList[1].querySelector('span.storage').textContent);
        if (storage0 === storage1) {
            compareList[0].querySelectorAll('div.parameter')[5].querySelector('a').remove();
            compareList[1].querySelectorAll('div.parameter')[5].querySelector('a').remove();
        } else {
            index0 = (storage0 > storage1 ? 1 : 0);
            index1 = (storage0 > storage1 ? 0 : 1);
            compareList[0].querySelector('span.storageTips').textContent += Level[2][index0];
            compareList[1].querySelector('span.storageTips').textContent += Level[2][index1];
            for (i = 0; i < useArray.length; i++) {
                switch (useArray[i]) {
                    case '1':
                        if (Math.max(storage0, storage1) <= 256) {
                            compareList[0].querySelector('span.storageTips').textContent += storage[0][0];
                            compareList[1].querySelector('span.storageTips').textContent += storage[0][0];
                        } else if (Math.min(storage0, storage1) > 300) {
                            compareList[0].querySelector('span.storageTips').textContent += storage[0][1];
                            compareList[1].querySelector('span.storageTips').textContent += storage[0][1];
                        } else {
                            compareList[0].querySelector('span.storageTips').textContent += storage[0][index0];
                            compareList[1].querySelector('span.storageTips').textContent += storage[0][index1];
                        }
                        break;
                    case '2':
                        if (Math.max(storage0, storage1) <= 512) {
                            compareList[0].querySelector('span.storageTips').textContent += storage[1][0];
                            compareList[1].querySelector('span.storageTips').textContent += storage[1][0];
                        } else if (Math.min(storage0, storage1) >= 600) {
                            compareList[0].querySelector('span.storageTips').textContent += storage[1][1];
                            compareList[1].querySelector('span.storageTips').textContent += storage[1][1];
                        } else {
                            compareList[0].querySelector('span.storageTips').textContent += storage[1][index0];
                            compareList[1].querySelector('span.storageTips').textContent += storage[1][index1];
                        }
                        break;
                    case '3':
                        if (Math.max(storage0, storage1) <= 512) {
                            compareList[0].querySelector('span.storageTips').textContent += storage[2][0];
                            compareList[1].querySelector('span.storageTips').textContent += storage[2][0];
                        } else if (Math.min(storage0, storage1) >= 600) {
                            compareList[0].querySelector('span.storageTips').textContent += storage[2][1];
                            compareList[1].querySelector('span.storageTips').textContent += storage[2][1];
                        } else {
                            compareList[0].querySelector('span.storageTips').textContent += storage[2][index0];
                            compareList[1].querySelector('span.storageTips').textContent += storage[2][index1];
                        }
                        break;
                }

            }


        }

        for (i = 0; i < 2; i++) {
            if (parseFloat(compareList[i].querySelector('span.screenSize').textContent) < 16.5) {
                compareList[i].querySelectorAll('div.parameter')[6].querySelector('a').remove();
            }
        }

        for (i = 0; i < 2; i++) {
            index = (parseInt(compareList[i].querySelector('span.gamut').textContent) < 70 ? 0 : 1);
            compareList[i].querySelector('span.gamutTips').textContent += Level[3][index];
            for (j = 0; j < useArray.length; j++) {
                switch (useArray[j]) {
                    case '1':
                        compareList[i].querySelector('span.gamutTips').textContent += gamut[0][index];
                        break;
                    case '2':
                        compareList[i].querySelector('span.gamutTips').textContent += gamut[1][index];
                        break;
                    case '3':
                        compareList[i].querySelector('span.gamutTips').textContent += gamut[2][index];
                        break;
                }
            }
        }

        for (i = 0; i < 2; i++) {
            switch (compareList[i].querySelector('span.resolution').textContent) {
                case '1366×768' :
                    compareList[i].querySelector('span.resolutionTips').textContent += '低分辨率，观感较差。';
                    break;
                case '1680×1050':
                    compareList[i].querySelector('span.resolutionTips').textContent += '略低于市场主流分辨率。';
                    break;
                case '1920×1080':
                    compareList[i].querySelector('span.resolutionTips').textContent += '市场主流分辨率。';
                    break;
                default:
                    compareList[i].querySelector('span.resolutionTips').textContent += '高分辨率，画面细节更丰富，更适合图像工作者。';
                    break;
            }
        }

        for (i = 0; i < 2; i++) {
            if (parseInt(compareList[i].querySelector('span.refreshRate').textContent) < 100) {
                compareList[i].querySelector('span.refreshRateTips').textContent += refreshRate[0];
            } else {
                compareList[i].querySelector('span.refreshRateTips').textContent += refreshRate[1];
            }
        }


        for (i = 0; i < 2; i++) {
            if (parseFloat(compareList[i].querySelector('span.weight').textContent) < 2.6) {
                compareList[i].querySelectorAll('div.parameter')[11].querySelector('a').remove();
            }
        }

        for (i = 0; i < 2; i++) {
            if (parseFloat(compareList[i].querySelector('span.thickness').textContent) < 25.0) {
                compareList[i].querySelectorAll('div.parameter')[12].querySelector('a').remove();
            }
        }

        for (i = 0; i < 2; i++) {
            if (parseInt(compareList[i].querySelector('span.usb').textContent) > 1) {
                compareList[i].querySelector('span.interfaceTips').textContent += interfaces[0];
            } else {
                compareList[i].querySelector('span.interfaceTips').textContent += interfaces[3];
            }
            if (parseInt(compareList[i].querySelector('span.thunderbolt').textContent) > 0) {
                compareList[i].querySelector('span.interfaceTips').textContent += interfaces[1];
            }
            if (parseInt(compareList[i].querySelector('span.rj45').textContent) > 0) {
                compareList[i].querySelector('span.interfaceTips').textContent += interfaces[2];
            }
        }

        setTimeout(function () {
            // toggle compare basket
            classie.remove(self.el, 'compare-basket--active');
            // animate..
            classie.add(viewEl, 'view--compare');
        }, 25);
    };

    CompareBasket.prototype.isFull = function () {
        return this.totalItems === this.itemsAllowed;
    };

    function init() {
        // initialize an empty basket
        console.log('init');
        basket = new CompareBasket();
        initEvents();
    }

    function initEvents() {
        console.log(items);
        $('.product-icon').remove();
        items.forEach(function (item) {
            var checkbox = item.querySelector('.action--compare-add > input[type = "checkbox"]');
            checkbox.checked = false;

            // ctrl to add to the "compare basket"
            checkbox.addEventListener('click', function (ev) {
                console.log('click_check');
                if (ev.target.checked) {
                    if (basket.isFull()) {
                        ev.preventDefault();
                        return false;
                    }
                    basket.add(item);
                } else {
                    basket.remove(item);
                }
            });
        });
    }

    init();
}
