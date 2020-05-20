/**
 * Created by zxm on 2017/5/20.
 */
$(function () {
    selectImgTake.init('selectItemDiv',1);
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
        });
    },
    "getSelectImgs":function(divId){
        var selectImgDivs = $("#"+divId+" .item[ischecked='true']");
        return selectImgDivs;
    },
    "cancelInit":function(divId){
        console.log('c');
        $("#"+divId+" .item").off("click");
        $(".img_isCheck i").css("display","none");
        $("#"+divId+" .item").removeAttr("ischecked");
    }
}