var $ = require("./common/jquery.min");
var newimgChange = require('./function/newimgchange');
var showbox = require('./function/showBox');
// var Ajax = require("./function/ajax");
var swiperFun = require("./function/swiperFun");
var islogins = require("./function/isLogin");
var imgChange = require("./function/imgchange");
var imgchange = new imgChange();
require("./common/echo.js");
require("./common/touch");
require("./function/upload-image");
var Popup = require("./function/Popup");

var imgurl = window.location.host == "wx.cheertea.com" ? "http://images.cheertea.com/" : "../images/";
// console.log(imgurl)
var product_service = 0;
var seller_service = 0;
var delivery_speed = 0;
var composite_score = 0;
var appraise = function() {
    var _this = this;
    // this.newimgchange = new newimgChange();
    // this.swiperfun = new swiperFun();

    if(this instanceof appraise) {

    } else {
        return new appraise();
    }
}
$.fn.prevAll = function(selector){
 var prevEls = [];
 var el = this[0];
 if(!el) return $([]);
 while (el.previousElementSibling) {
        var prev = el.previousElementSibling;
        if (selector) {
          if($(prev).is(selector)) prevEls.push(prev);
        }
        else prevEls.push(prev);
        el = prev;
      }
      return $(prevEls);
};
// js获取url参数值
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
var goodsid = GetQueryString("goods_id");
var orderid = GetQueryString("order_id");
// var userid = GetQueryString("user_id");
 var sn = GetQueryString("sn");
$.fn.nextAll = function (selector) {
      var nextEls = [];
      var el = this[0];
      if (!el) return $([]);
      while (el.nextElementSibling) {
        var next = el.nextElementSibling;
        if (selector) {
          if($(next).is(selector)) nextEls.push(next);
        }
        else nextEls.push(next);
        el = next;
      }
      return $(nextEls);
    };
appraise.prototype = {
    init: function() {
        var _this = this;
        $(document).ready(function(){
            // 点击选取评价
        $(".appraiseOld span").on('touchstart',function(){
          if($(this).hasClass('gray')){
          $(this).addClass('orange');
          $(this).attr("class", "orange");
}else{
          $(this).attr("class", "gray");
    }
});

            // 商品服务星级评价
              $(".star1 span").on("touchend",function(){
                $(this).siblings().removeClass("active");
                  $(this).prevAll("span").addClass("active");
                  $(this).addClass("active");
                  if($(this).index()==0){
                    $(".grade1").html("低");
                  }else if($(this).index()==2 || $(this).index()==1 ){
                    $(".grade1").html("中");
                  }else{
                    $(".grade1").html("高");
                  }
                  product_service = $(this).index()+1;
              })
            // 卖家服务星级评价
              $(".star2 span").on("touchend",function(){
                $(this).siblings().removeClass("active");
                  $(this).prevAll("span").addClass("active");
                  $(this).addClass("active");
                   if($(this).index()==0){
                    $(".grade2").html("低");
                  }else if($(this).index()==2 || $(this).index()==1 ){
                    $(".grade2").html("中");
                  }else{
                    $(".grade2").html("高");
                  }
                  seller_service = $(this).index()+1;
              })
              // 发货速度星级评价
              $(".star3 span").on("touchend",function(){
                $(this).siblings().removeClass("active");
                  $(this).prevAll("span").addClass("active");
                  $(this).addClass("active");
                   if($(this).index()==0){
                    $(".grade3").html("低");
                  }else if($(this).index()==2 || $(this).index()==1 ){
                    $(".grade3").html("中");
                  }else{
                    $(".grade3").html("高");
                  }
                  delivery_speed = $(this).index()+1;
              })
              // 综合评分星级评价
              $(".star4 span").on("touchend",function(){
                $(this).siblings().removeClass("active");
                  $(this).prevAll("span").addClass("active");
                  $(this).addClass("active");
                   if($(this).index()==0){
                    $(".grade4").html("差评");
                  }else if($(this).index()==2 || $(this).index()==1 ){
                    $(".grade4").html("中评");
                  }else{
                    $(".grade4").html("好评");
                  }
                  composite_score = $(this).index()+1;
              })
            
            var datas = {};

// 选择标签评价  
           $.ajax({
                  url:'http://wx.cheertea.com/shop/goodsEvaluate!showGoodsTag.do',
                  type:'post',
                  xhrField: {
                    withCredentials: true
                  },
                  crossDomain: true,
                  data:{
                            goods_id:goodsid,
                          },
                  dataType:'json',
                  success: function(data){   
                      console.log(data); 
                        if(data.res_code==1){
                          var result = data.res_data.tag_content;
                          console.log(result);
                          for(var i =0;i<6;i++){
                            $(".gray strong").eq(i).html(result[i].tag_content);
                            $(".gray em").eq(i).html(result[i].like_num);
                          }
                          
                            }                                      
                    },
                  error: function(res) {
                    console.log(res);
                  }
              });
        })
// 图片上传
  function UpBackImgs(mainEle, otherEle) {
      var _this = this;
      var imgurl="";
      $(mainEle).on("change", " li input", function(event) {
          var that = this;
          mainEles = $(this);
          lrz(that.files[0], {
              width: 640
          })
          .then(function (rst) {
              console.log(rst);
              // 图片上传ajax
                  $.ajax({
                  url:'http://wx.cheertea.com/shop/goodsEvaluate!upload.do',
                  type:'post',
                  xhrField: {
                    withCredentials: true
                  },
                  data:{
                           ratingphoto:rst.base64,
                        },
                  crossDomain: true,
                  dataType:'json',
                  success: function(res){
                    if(res.res_code=1){
                      // mainEles.val(res_data.imageUrl);
                      mainEles.attr("imageUrl",res.res_data.imageUrl);
                      console.log(mainEles);
                    }       
                    },         
                  error: function(res) {
                    console.log(res);
                  },
              });

              mainEles.siblings("img").prop("src", rst.base64).addClass("addimg").siblings("input[name=" + otherEle + "]").val(rst.base64);
              return rst;
          });
  
          if (mainEles.parent("li").next().index() <= 5) {
              mainEles.parent("li").next().find("input").addClass("inputshow").siblings("img").prop("src", "http://images.cheertea.com/add.png");

          }
          mainEles.siblings("em").show();
  
      })
  }
  new UpBackImgs(".imgboxs", 'ratingphoto');

  /*实现图片点击消失的功能*/
  
  function ImgFadeOut(mainEle, otherEle, someEle) {
      $(mainEle).on("touchstart", function(event) {
          event.preventDefault();
          $(this).parent().remove();
          $(otherEle).append(
              "<li>" +
              "<img src='../images/noaddimgimg.png' alt=''>" +
              "<input type='hidden' name='photo'>" +
              "<input type='file'>" +
              "<em></em>" +
              "</li>"
          );
  
          if (!$(someEle).eq(4).find("input").hasClass("inputshow")) {
              for (var i = 0; i < $(someEle).length; i++) {
                  if ($(someEle).eq(i).find("img").hasClass("addimg")) {
                      this.adds = i;
                  }
              }
              $(someEle).eq(this.adds + 1).find("input").addClass("inputshow").siblings("img").prop("src", "http://images.cheertea.com/add.png");
          }
      })
  }
  new ImgFadeOut(".imgboxs li em", ".imgboxs", ".imgboxs li");
 


        
        return this;
    }
}
var appraises = new appraise();
appraises.init();
// 发表评论ajax
$(".publish a").on('touchstart',function(){
  var content="";
  content = $(".appraiseTextarea").val();
  var tag_content =new Array();
for(var i=0;i<$(".orange strong").length;i++){
    tag_content.push($(".orange strong").eq(i).html());
}
  var image_url = "";
for(var i=0;i<$(".inputshow").length;i++){
  if(typeof($(".inputshow").eq(i).attr('imageUrl'))!="undefined"){
     image_url += $(".inputshow").eq(i).attr('imageUrl')+";";
  }
  }
   image_url=image_url.substr(0, image_url.length - 1);
// 判断评价不为空
          if(composite_score!=0 && content!=""){
                  $.ajax({
                  url:'http://wx.cheertea.com/shop/goodsEvaluate!Evaluate.do',
                  type:'post',
                  xhrField: {
                    withCredentials: true
                  },
                  data:{
                        // user_id:userid,
                        order_id:orderid,
                        goods_id:goodsid,
                        product_service:product_service,
                        seller_service:seller_service,
                        delivery_speed:delivery_speed,
                        composite_score:composite_score,
                        content:content,
                        tag_content:JSON.stringify(tag_content),
                        image_url:image_url,
                  },
                  crossDomain: true,
                  dataType:'json',
                  success: function(res){ 
                    if(res.res_code==0){
                        window.location.href = "http://wx.cheertea.com/login.html?forward=member_index.html"
                     } else if(res.res_code==-1){
                          Popup("alert", "您已经评价！").show();
                     } 
                      else if(res.res_code==1){
                        Popup("jumper", "您已评价成功","http://wx.cheertea.com/member_index.html").show();
                      }                          
                    },         
                  error: function(res) {
                    console.log(res);
                  }
              });
          }else{
              Popup("alert", "综合评分和评价内容不能为空！").show();
          }
});
// 商品详细信息ajax
                  $.ajax({
                  url:'http://wx.cheertea.com/shop/goodsEvaluate!getGoodsDetail.do',
                  type:'post',
                  xhrField: {
                    withCredentials: true
                  },
                  data:{
                      goods_id:goodsid,
                      order_id:orderid,
                  },
                  crossDomain: true,
                  dataType:'json',
                  success: function(res){                            
                            if(res.res_code==1)                       
                            {
                              var str = res.res_data.goodsMap;
                              // 时间10位转换
                              function getLocalTime(nS) {      
                             return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");      
                                                      } 
                              // 时间13位转化 
                              function getLocalTime1(nS) {      
                             return new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");      
                                                      } 
                                var time2 = str.op_time;
                                console.log(time2)
                                var time1 = (getLocalTime1(time2).substring(0,9));
                                console.log(time1)
                                $(".orderTime span").html(time1);
                                $(".fr em").html(sn);
                                $(".store img").attr('src',imgchange.show(res.res_data.company.com_image));
                                $(".store span").html(res.res_data.company.com_name);
                                $(".appraiseImg img").attr('src',imgchange.show(str.original));
                                $(".t1 a").html(str.name);
                                $(".t2 i").html(str.price);
                                $(".t2 strong").html(str.mktprice);
                                $(".pic1").attr('href','http://wx.cheertea.com/cn/product_info.html?goods_id='+str.goods_id);
                            }
                            
                    },         
                  error: function(res) {
                    console.log(res);
                  },
              });
// 换一批标签ajax
      $(".another").on("touchend",function(){
           $.ajax({
                  url:'http://wx.cheertea.com/shop/goodsEvaluate!RangshowGoodsTag.do',
                  type:'post',
                  xhrField: {
                    withCredentials: true
                  },
                  crossDomain: true,
                  data:{
                            goods_id:goodsid,
                          },
                  dataType:'json',
                  success: function(data){   
                      console.log(data); 
                        if(data.res_code==1){
                          var result = data.res_data.tag_content;
                          console.log(result);
                          for(var i =0;i<6;i++){
                            $(".gray strong").eq(i).html(result[i].tag_content);
                            $(".gray em").eq(i).html(result[i].like_num);
                          }
                          
                            }                                      
                    },
                  error: function(res) {
                    console.log(res);
                  }
              });

});