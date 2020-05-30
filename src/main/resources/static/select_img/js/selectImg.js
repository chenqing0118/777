/**
 * Created by zxm on 2017/5/20.
 */
$(function () {
    selectImgTake.init('main_uses',3);
    selectImgTake.init('ordinary_trait',4);
    selectImgTake.init('game_example',4);
    selectImgTake.init('game_vision',1);
    selectImgTake.init('produce_type',3);
    selectImgTake.init('ordinary_trait_1',3);
    // selectImgTake.cancelInit('selectItemDiv');
});

var selectImgTake = {
    "init":function(divId,maxSelectNumber){
        if(maxSelectNumber==null||maxSelectNumber===""){
            selectImgTake.initSelectEvent(divId,-1);
        }else{
            selectImgTake.initSelectEvent(divId,maxSelectNumber);
        }
    },
    "initSelectEvent":function(divId,maxSelectNumber){
        $("#"+divId+" .item").on("click",function(){
            var i_display = $(this).find(".img_isCheck i").css("display");
            if(i_display==="none"){
                if(maxSelectNumber!==-1 && maxSelectNumber!==1){
                    var selectImgDivs = selectImgTake.getSelectImgs(divId);
                    if(selectImgDivs.length>=maxSelectNumber){
                        alert("最多只能选择"+maxSelectNumber+"张图片");
                        return;
                    }
                }
                if(maxSelectNumber===1){
                    $("#"+divId+" .item").not($(this)).find(".img_isCheck i").css("display","none");
                    $("#"+divId+" .item").not($(this)).removeAttr("ischecked");
                }
                $(this).find(".img_isCheck i").css("display","block");
                $(this).attr("ischecked","true");
            }else{
                $(this).find(".img_isCheck i").css("display","none");
                $(this).removeAttr("ischecked");
            }

            // selectImgTake.submitTileValue(divId);
        });
    },
    "getSelectImgs":function(divId){
        return $("#"+divId+" .item[ischecked='true']");
    },
    "submitTileValue":function (divId) {
        var value = [];
        selectImgTake.getSelectImgs(divId).each(function(){
            value.push($(this).children('.img_title').attr("value"));
        });
        console.log(value);
        return value;
    },
    "submitTileText":function (divId) {
        var text = [];
        selectImgTake.getSelectImgs(divId).each(function(){
            text.push($(this).children('.img_title').text());
        });
        console.log(text);
        return text;
    },
    "cancelInit":function(divId){
        console.log('c');
        $("#"+divId+" .item").off("click");
        $(".img_isCheck i").css("display","none");
        $("#"+divId+" .item").removeAttr("ischecked");
    }
}