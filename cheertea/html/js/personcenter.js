;(function() {
	var $ = require("./common/zepto");
	var Ajax = require("./function/ajax.js");
	var pagejump = require("./function/PageJump.js");

	require("./common/touch");
	var Emoji = require("./function/emoji");

	/***********************实现个人中心页面的功能**************************/
	/*实现亮起功能*/
	function PersonRemind() {
	    this.len = $(".newpersoncenterwrap .customerservice li").length;
	    for (var i = 0; i < this.len; i++) {
	        if (parseFloat($(".newpersoncenterwrap .customerservice li").eq(i).find(".remind").html()) > 0) {
	            $(".newpersoncenterwrap .customerservice li").eq(i).find(".remind").show();
	        } else {
	            $(".newpersoncenterwrap .customerservice li").eq(i).find(".remind").hide();
	        }
	    }
	}
	new PersonRemind();

	/*实现TAB切换功能*/

	function PersonTab(mainEle, otherEle, tabchoice, conchoice) {
	    $(mainEle).tap(function() {
	        $(this).addClass(tabchoice).siblings().removeClass(tabchoice);
	        $(otherEle).eq($(this).index()).addClass(conchoice).siblings().removeClass(conchoice);
	    })
	}
	new PersonTab(".newpersoncenterwrap .bannertabcon li", ".newpersoncenterwrap .bannercon", "personchoice", "conshow");

	/*实现弹出框效果*/
	$(".newpersoncenterwrap .identification").tap(function() {
	    var _this = this;

	    this.tapss = $(this);
	    this.timer = 0;

	    function Taps() {
	        clearInterval(_this.timer);
	        this.content = "身份信息审核中，请耐心等待审核结果";
	        $(".newpersoncenterwrap .personremind").html(this.content);
	        $(".newpersoncenterwrap .personremind").addClass("personremindchoice");
	        _this.tapss.off("tap");

	        _this.timer = setInterval(function() {
	            $(".newpersoncenterwrap .personremind").removeClass("personremindchoice");
	            _this.tapss.on("tap", function() {
	                new Taps();
	            })
	        }, 3000)
	    }
	    // new Taps();

	})

	/*点击实现弹出框*/
	$(".newpersoncenterwrap .merchants").tap(function() {
	    var _this = this;

	    this.tapsc = $(this);
	    this.timer = 0;

	    function Tapsc() {
	        clearInterval(_this.timer);
	        this.contents = "请先进行个人实名认证";
	        $(".newpersoncenterwrap .personremind").html(this.contents);
	        $(".newpersoncenterwrap .personremind").addClass("personremindchoices");
	        _this.tapsc.off("tap");

	        _this.timer = setInterval(function() {
	            $(".newpersoncenterwrap .personremind").removeClass("personremindchoices");
	            _this.tapsc.on("tap", function() {
	                new Tapsc();
	            })
	        }, 3000)
	    }
	    new Tapsc();
	});

	var Personcenter = {
		showAjax: function() {
			Ajax({
	            urls: "member/memberIndex!getData.do",
	            types: "get",
	            dataTypes: "json",
	            successes: function(data) {
	                datas = JSON.parse(data);
	                console.log(datas);
	                if(datas.res_code == 0) {

						pagejump.loginJump((window.location.href).split("/")[(window.location.href).split("/").length - 1])
						////保存当前需要跳转的页面
						//window.sessionStorage.setItem()
						//window.location.href = "../cn/login.html";
	                } else {
	                	var face = datas.res_data.member.face == "" ? datas.res_data.member.weixin_face : datas.res_data.member.face;
	                	$(".bannerbox img").attr("src", face);
	                	$(".maincon .name span").html(datas.res_data.member.nickname);
	                	$(".personothers .vip span").html(datas.res_data.member.lvname);

	                	//白积分
	                	$(".moneycon").eq(0).find("span em").html(datas.res_data.whitePoint);

	                	//红积分
	                	$(".moneycon").eq(1).find("span em").html(datas.res_data.redPoint);

	                	//绿积分
	                	$(".moneycon").eq(2).find("span em").html(datas.res_data.member.point_green);

	                	//预存款
	                	$(".moneycon").eq(3).find("span em").html(datas.res_data.member.advance);

	                	$(".customerservice li").eq(0).find(".remind").html(datas.res_data.topay_num);
	                	$(".customerservice li").eq(1).find(".remind").html(datas.res_data.todelivery_num);
	                	$(".customerservice li").eq(2).find(".remind").html(datas.res_data.toreceive_num);
	                	$(".customerservice li").eq(3).find(".remind").html(datas.res_data.toservice_num);

	                	if(datas.CheckName) {
	                		switch(datas.res_data.CheckName.check_status) {
	                			case 0:
	                				$(".identification").html("正在审核");
	                				$(".identification").attr("href", "shimingrenzheng.html/0");
	                				break;
	                			case 1:
	                				$(".identification").html("已审核");
	                				$(".identification").attr("href", "shimingrenzheng.html/1");
	                				break;
	                			case -1:
	                				$(".identification").html("未通过");
	                				$(".identification").attr("href", "shimingrenzheng.html/-1");
	                				break;
	                		}
	                	} else {
	                		$(".identification").html("去认证");
	                	}
	                }

					//页面需要显示unicode编码的字符，可以后台或前端进行转换,数据库保存的是utf8mb4编码,读出来后，需要转换一次
					$(".emoji").emoji();
					console.log($(".emoji").emoji())
	            },
	            errors: function(data) {
	                console.log(data);
	            }
	        });
	        return this;
		},
		logOff: function() {
			$(".logoff").tap(function() {
				Ajax({
		            urls: "member/logout!logout.do",
		            types: "get",
		            dataTypes: "json",
		            successes: function(data) {
		                logdata = JSON.parse(data);
		                console.log(logdata);
		               	window.location.href = "../cn/login.html";
		            },
		            errors: function(data) {
		                console.log(data);
		            }
		        });
		        return this;
			});
		}
	}
	Personcenter.showAjax().logOff();
})();