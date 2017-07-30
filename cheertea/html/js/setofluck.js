var $ = require("./common/zepto");
require("./common/touch");
var imgurl = window.location.host == "wx.cheertea.com" ? "http://images.cheertea.com/" : "../images/";
// 点击开关
$(".wr").on('touchstart',function(){
    if($(this).attr("src")=="../images/wr_03.gif"){
        $(this).attr('src',"../images/or_03.gif");
    }else{
        $(this).attr('src',"../images/wr_03.gif");
    }
});
// 判断字数
$(".textarea1").bind('input propertychange',function(){ 
var txtLeng = $(this).val().length;      
if( txtLeng>99){
$(".quantity").text('0');
$(".hundred").css({"color":"red"});
var fontsize = $(this).val().substring(0,100);
$(this).val( fontsize );
}else{
$(".hundred").css({"color":"#7a7a7a"}); 
$(".quantity").text(100-txtLeng);
}
  });

$(".textarea2").bind('input propertychange',function(){ 
var txtLeng = $(this).val().length;      
if( txtLeng>99){  
$(".quantity1").text('0');
$(".hundred1").css({"color":"red"}); 
var fontsize = $(this).val().substring(0,100);
$(this).val( fontsize );
}else{      
$(".hundred1").css({"color":"#7a7a7a"}); 
$(".quantity1").text(100-txtLeng);  
}
  });

$(".textarea3").bind('input propertychange',function(){ 
var txtLeng = $(this).val().length;      
if( txtLeng>99){  
$(".quantity2").text('0');
$(".hundred2").css({"color":"red"}); 
var fontsize = $(this).val().substring(0,100);
$(this).val( fontsize );
}else{
$(".hundred2").css({"color":"#7a7a7a"}); 
$(".quantity2").text(100-txtLeng);
}
  });

