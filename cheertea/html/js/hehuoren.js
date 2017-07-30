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

var partner = function() {
    var _this = this;
    this.datetime = new datetime();
    // this.swiperfun = new swiperFun();

    if(this instanceof partner) {

    } else {
        return new partner();
    }
}
var id_num = 0;
var bindMySubMember = function(datas){
    if(datas.data.page==1){
      $(".partnerlist dl").find("dd").remove();
    }

   var id_number = 0;
    $.each(datas.data.data,function(i){
              id_number = id_num + i;
                        $(".partnerlist dl").append(
                            "<dd memberid='" + datas.data.data[i].memberId + "'>" + 
                              "<a href='custom.html?memberId="+datas.data.data[i].memberId+"&uname="+datas.data.data[i].uname+"'><span class='t1'>" + (id_number+1) + "</span>" + 
                              "<span class='t2'>" + "<img src='" + imgurl + "logobgs.png' data-src=" + imgchange.show(datas.data.data[i].headImg) + " alt=''>" + "<i>" + datas.data.data[i].uname + "</i>" + "</span>"+
                              "<span class='t3'>" + datas.data.data[i].subordinateCount + "</span>" +
                              "<span class='t4'>" + datas.data.data[i].orderCount + "</span></a>" +
                              "<span class='t5'>" + datas.data.data[i].whitePoint + "</span>" +
                              "<span class='t6' memberid='" + datas.data.data[i].memberId + "'>" + "<img src=" + imgurl + "partner-down.png" + " alt=''>" + "</span>" +
                            "<div class='sub-partner' memberid='" + datas.data.data[i].memberId + "'></div></dd>"
                        )
                      Echo.init({
                      offset: 200,
                      throttle: 200
                    }); 
                  }) 
}
var bindSubSubMember = function(datas,currentParentId){
	var subviewHtml = "";
    $.each(datas.data.data,function(i){
				subviewHtml += "<li><a href='custom.html?memberId="+datas.data.data[i].memberId+"&uname="+datas.data.data[i].uname+"'>"
							+"<div class='bg'><img src='" + imgurl + "partner-list.png' alt=''></div>"
							+"<div class='sub-partner-list'>"
							+"<span><img src=" + imgchange.show(datas.data.data[i].headImg) + " alt='' ><i>" + datas.data.data[i].uname + "</i></span>"
								+"<span><em>客户数量</em><i>"+datas.data.data[i].subordinateCount+"</i></span><span><em>订单</em><i>"+datas.data.data[i].orderCount+"</i></span><span><em>积分</em><i>"+datas.data.data[i].whitePoint+"</i></span><span>"+ "<img src=" + imgurl + "partner-right.png" + " alt=''>" +"</span>"
							+"</div></a>"
						  +"</li>";
						  
				  Echo.init({
            offset: 200,
            throttle: 200
          }); 
						
      }) 
    if(subviewHtml == ""){
      subviewHtml = "暂无下级合伙人";
    }

	  $(".sub-partner[memberid='"+currentParentId+"']").html(
		"<ul>"+subviewHtml+"</ul>"
		);
                      
}
partner.prototype = {
    init: function() {
        var _this = this;
        $(document).ready(function(){

          $(".search-btn").on("tap",function(){              
              getAjax(1,10,-1);
          });
          $("#search-btn1").on("tap",function(){              
              getAjax(1,10,-1);
          });
          

            function getAjax(pages,pageSizes,currentParentId){
              var backServerUrl = "widget?type=member_performance&action=getMySubordinate&page=" + pages + "&pageSize=" + pageSizes + "&currentParentId=" + currentParentId;
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
                    id_num = (pages-1)*5;
                    if(datas.code==403){
                        document.location.href ='/login.html?forward=member_index.html';  
                    }
                    $(".invite-right img").on("tap",function(){
                      document.location.href ='/promotional_poster.html?member_id='+datas.data.currentMember;  
                    })
                    var people = datas.data.totalCount;
                    if(people<1){
                      people = 0;
                    }
                    $(".partner-more i").html(people);
                    if(currentParentId == null || currentParentId == -1 ){
                        bindMySubMember(datas);//绑定我的下级会员
                    }else{
                         bindSubSubMember(datas, currentParentId);//绑定下级的下级会员
                     };
                     if(num == datas.data.totalPageCount) {
                        boolean = false;
                        return;
                      };
                     boolean = true;
                },
                completes: function () {
                    $(".isDelete").hide();
                    $(".loading").hide();
                }
              });
            };
           
            //下拉加载
           var downrange = 10; 
           var num = 1; //初始页码
           var maxnum = num + 1000; //设置加载次数
           var $main = $(".partnerlist dl "); //主体
           var totalheight = 0;
           var boolean = true;
           getAjax(num,5,-1);
           function ifLoad() {
           var scrolltotop = parseFloat($(window).scrollTop());
           var winheight = parseFloat($(window).height());
           var conheight = parseFloat($(document).height()) - downrange;
           totalheight = scrolltotop + winheight;
           if (totalheight >= conheight && num != maxnum) {
              if(boolean) {
                num++;
                boolean = false;
                getAjax(num,5,-1);

              }
             }
           }

         $(window).scroll(ifLoad);
          // $(".group_page").on("touchend", function(){
          //   num++;
          //   getAjax(num,5,1);
          // });
            //点击下级客户
              $(".partnerlist dl").on("touchstart"," dd>span.t6",function(){
                    console.log($(this).parent("dd"))                     
                    if($(this).parent("dd").hasClass("active")){
                        $(this).parent("dd").removeClass("active");
                        console.log(1)
                    }else{
                      $(this).parents("dd").addClass("active").siblings("dd").removeClass("active");
                      console.log(2)
                    
                      //获取下级客户
                      currentParentId = $(this).attr("memberid");
                      getAjax(1,10,currentParentId);
                    }                       

              }) 
           

           // 时间筛选插件
            _this.datetime.date_time();



        })
        return this;
        
    }
}
var partners = new partner();
partners.init();
