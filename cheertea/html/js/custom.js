var $ = require("./common/zepto");
var newimgChange = require('./function/newimgchange');
var datetime = require('./function/datetime');
var showbox = require('./function/showBox');
var Ajax = require("./function/ajax");
var swiperFun = require("./function/swiperFun");
var islogins = require("./function/isLogin");
var imgChange = require("./function/imgchange");
var imgchange = new imgChange();
require("./common/echo.js");
require("./common/touch");

var imgurl = window.location.host == "wx.cheertea.com" ? "http://images.cheertea.com/" : "../images/";
// console.log(imgurl)
  if(window.location.host == "wx.cheertea.com") {
      imgurl = "http://images.cheertea.com/";
      } else if(window.location.host == "test.cheertea.com") {
          imgurl = "http://images.cheertea.com/";
      } else {
          imgurl = "../images/";
  }
var custom = function() {
    var _this = this;
    this.datetime = new datetime();
    // this.swiperfun = new swiperFun();

    if(this instanceof custom) {

    } else {
        return new custom();
    }
}

var getQueryStringByName=function getQueryStringByName(name){
    var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
    if(result == null || result.length < 1){
        return "";
    }
    return result[1];
}

var currentMemberId = getQueryStringByName("memberId");
var currentMemberName = getQueryStringByName("uname");

$(".header h2").html(decodeURIComponent(currentMemberName)+"的客户列表");
custom.prototype = {
    init: function() {
        var _this = this;
        $(document).ready(function(){

          $(".search-btn").on("tap",function(){              
              getAjax(1,10,currentMemberId);
          });
          $("#search-btn1").on("tap",function(){              
              getAjax(1,10,currentMemberId);
          });

            function getAjax(pages,pageSizes,currentParentIds){

              var backServerUrl = "widget?type=member_performance&action=getSubordinate&page=" + pages + "&pageSize=" + pageSizes + "&memberId=" + currentParentIds;
              var searchParam = {};
              var nickNameOrID = $(".search-text").val();
              if(nickNameOrID!=null&&nickNameOrID!=""){
                  searchParam.nickNameOrID = nickNameOrID;
              } 
              var startTime = $("#startTime").val();
              if(startTime!=null&&startTime!=""){
                  searchParam.startTime = startTime;
              } 
              var endTime = $("#endTime").val();
              if(endTime!=null&&endTime!=""){
                  searchParam.endTime = endTime;
              } 
              // function getDate(date){
              //    var dates = date.split("-");
              //    var dateReturn = '';
                 
              //    for(var i=0; i<dates.length; i++){
              //     dateReturn+=dates[i];
              //    }
              //    return dateReturn;
              //   }

            // if(startTime!=null&&startTime!="" && (getDate(startTime)-getDate(endTime)>0)){
            //       searchParam.startTime = startTime;
            //   }
            //   if(endTime!=null&&endTime!=""&& (getDate(startTime)-getDate(endTime)>0)){
                
            //       searchParam.endTime = endTime;
            //   } 



              if(searchParam!=null&&searchParam!=undefined){
                if(searchParam.nickNameOrID!=null){
                  backServerUrl += "&nickNameOrID="+searchParam.nickNameOrID; 
                }
                if(searchParam.startTime!=null){
                  backServerUrl += "&startTime="+searchParam.startTime; 
                }
                if(searchParam.endTime!=null){
                  backServerUrl += "&endTime="+searchParam.endTime; 
                }
              }


            Ajax({
                urls:backServerUrl,
                types:"get",
                dataTypes:"json",                
                beforeSends: function() {
                      $(".isDelete").show();
                      $(".loading").show();
                  },
                successes: function(data){
                    datas = JSON.parse(data);
                    
                    if(datas.code==403){
                        document.location.href ='/login.html?forward=member_index.html';  

                    }else{
                        var currentTotalCount = 0;
                        if(datas!=null && datas.data!=null && datas.data.totalCount!=null){
                            currentTotalCount = datas.data.totalCount;    
                            $(".invite-right img").on("tap",function(){
                                 document.location.href ='/promotional_poster.html?member_id='+ datas.data.currentMember;  
                            })                        
                        }
                        $(".partner-more i").html(currentTotalCount);

                        if(datas.data.page==1){
                            $(".customlist dl").find("dd").remove();
                        }

                        $.each(datas.data.data,function(i){
                        $(".customlist dl").append(
                            "<dd>" + 
                              "<span>" + "<img src='" + imgurl + "logobgs.png' data-src=" + imgchange.show(datas.data.data[i].headImg) + " alt=''>" + "<i>" + datas.data.data[i].uname + "</i>" + "</span>"+
                              "<span>" + datas.data.data[i].subordinateCount + "</span>" +
                              "<span>" + datas.data.data[i].whitePoint + "</span>" +
                              "<span>" + datas.data.data[i].addTime + "</span>" +
                            "</dd>"
                        )
                          Echo.init({
                          offset: 200,
                          throttle: 200
                        }); 
                      }) ;
                      if(pages == datas.data.totalPageCount) {
                        boolean = false;
                        return;
                      };
                       boolean = true;
                    }


                },
                completes: function () {
                    $(".isDelete").hide();
                    $(".loading").hide();
                }
              });
            };
             // getAjax(1,5,currentMemberId);
            //下拉加载
           var downrange = 10; 
           var num = 1; //初始页码
           var maxnum = num + 1000; //设置加载次数
           var $main = $(".partnerlist dl "); //主体
           var totalheight = 0;
           var boolean = true;
           getAjax(num,10,currentMemberId);
           function ifLoad() {
           var scrolltotop = parseFloat($(window).scrollTop());
           var winheight = parseFloat($(window).height());
           var conheight = parseFloat($(document).height()) - downrange;
           totalheight = scrolltotop + winheight;
           if (totalheight >= conheight && num != maxnum) {
              if(boolean) {
                num++;
                boolean = false;
                getAjax(num,10,currentMemberId);

              }
             }
           }
         $(window).scroll(ifLoad);
            //客户名下的客户


            // 时间筛选插件
            _this.datetime.date_time();
        })
        return this;
        
    }
}
var customs = new custom();
customs.init();