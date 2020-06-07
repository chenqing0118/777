/**
 * Created by zxm on 2017/5/20.
 */
$(function () {
    selectImgTake.init('main_uses',3,true);
    selectImgTake.init('game_type',1,true);
    selectImgTake.init('ordinary_trait',4);
    selectImgTake.init('game_example',8,true);
    selectImgTake.init('game_vision',1,true);
    selectImgTake.init('produce_type',3,true);
    selectImgTake.init('ordinary_trait_1',3);
    selectImgTake.init('weight_type',1,true);
    // selectImgTake.cancelInit('selectItemDiv');
});

var selectImgTake = {
    "init":function(divId,maxSelectNumber,required){
        if(required === undefined){
            required =false
        }

        if(maxSelectNumber==null||maxSelectNumber===""){
            selectImgTake.initSelectEvent(divId,-1);
        }else{
            selectImgTake.initSelectEvent(divId,maxSelectNumber,required);
        }
    },
    "initSelectEvent":function(divId,maxSelectNumber,required){
        var items = $("#"+divId+" .item");
        if(required){
            items.first().find(".img_isCheck i").css("display","block");
            items.first().attr("ischecked","true");
        }

        items.on("click",function(){
            var i_display = $(this).find(".img_isCheck i").css("display");
            var selectImgDivs = selectImgTake.getSelectImgs(divId);
            if(i_display==="none"){
                if(maxSelectNumber!==-1 && maxSelectNumber!==1){
                    if(selectImgDivs.length>=maxSelectNumber){
                        alert("最多只能选择"+maxSelectNumber+"张图片");
                        return;
                    }
                }
                if(maxSelectNumber===1){
                    items.not($(this)).find(".img_isCheck i").css("display","none");
                    items.not($(this)).removeAttr("ischecked");
                }
                $(this).find(".img_isCheck i").css("display","block");
                $(this).attr("ischecked","true");
            }else{
                if(required){
                    if(selectImgDivs.length !== 1){
                        $(this).find(".img_isCheck i").css("display","none");
                        $(this).removeAttr("ischecked");
                    }
                }else {
                    $(this).find(".img_isCheck i").css("display","none");
                    $(this).removeAttr("ischecked");
                }
            }

            // selectImgTake.submitTileIndex(divId);
        });
    },
    "getSelectImgs":function(divId){
        return $("#"+divId+" .item[ischecked='true']");
    },
    "submitTileIndex":function (divId) {
        var value = [];
        selectImgTake.getSelectImgs(divId).each(function(){
            value.push($(this).index()+1);
        });
        // console.log(value);
        return value;
    },
    "submitTileText":function (divId) {
        var text = [];
        selectImgTake.getSelectImgs(divId).each(function(){
            text.push($(this).children('.img_title').text());
        });
        // console.log(text);
        return text;
    },
    "cancelInit":function(divId){
        $("#"+divId+" .item").off("click");
        $(".img_isCheck i").css("display","none");
        $("#"+divId+" .item").removeAttr("ischecked");
    }
}