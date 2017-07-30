;(function() {
	var $ = require("./common/jquery.min.js");
	var Ajax = require("./function/ajax.js");
	var isRemind = require("./function/isreminds");
	var isremind = new isRemind();
	var islogins = require("./function/isLogin");

	require("./function/lrz.all.bundle");

	//判断用户是否登录
	var islogin = islogins.showFocus();

	var Certification = function() {
		if(this instanceof Certification) {

		} else {
			return new Certification();
		}
	}
	Certification.prototype = {
		conFail: function() {
			$(".returnshiming").on("touchstart", function() {
				$(".certificationfail").hide();
				$(".certificationwrap").show();
			});
			return this;
		},
		setCertification: function(mainEle, otherEle) {
		    var _this = this;
		    this.timer = 0;

		    //身份证正则
		    this.idveg = /^\d{17}[0-9a-z]$/gi;

		    // 实现身份验证功能
		    $(".certificationwrap .truename").on("input", function() {
		        if ($(".certificationwrap .idcardcon").eq(0).find("input").hasClass("imgtrues") && $(".certificationwrap .idcardcon").eq(1).find("input").hasClass("imgtrues") && $(".certificationwrap .idcardcon").find("input").eq(2).hasClass("imgtrues") && $(".certificationwrap .truename").val() && $(".certificationwrap .idcards").val()) {
		            $(".certificationwrap .idsbumit").addClass("allright");
		        }
		    })
		    $(".certificationwrap .idcards").on("input", function() {
		        if ($(this).val().match(_this.idveg) && $(".certificationwrap .idcardcon").eq(0).find("input").hasClass("imgtrues") && $(".certificationwrap .idcardcon").eq(1).find("input").hasClass("imgtrues") && $(".certificationwrap .idcardcon").find("input").eq(2).hasClass("imgtrues") && $(".certificationwrap .truename").val() && $(".certificationwrap .idcards").val()) {
		            $(".certificationwrap .idsbumit").addClass("allright");
		        }
		    })

		    //实现图片上传功能
		    $(mainEle).change(function() {

		        var _this = this;

		        this.mainEles = $(this);

		        lrz(_this.files[0], {
		            width: 640
		        })
		        .then(function (rst) {
		            $(otherEle).prop("src", rst.base64);
		            _this.mainEles.siblings(".logos1").prop("value", rst.base64);

		            if (_this.mainEles.parents(".idcardcon").index() == 1 && _this.mainEles.siblings(".logos1").val()) {
		                _this.vals = "身份证正面照片上传成功";
		            } else if (_this.mainEles.parents(".idcardcon").index() == 2 && _this.mainEles.siblings(".logos1").val()) {
		                _this.vals = "身份证反面照片上传成功";
		            } else if (_this.mainEles.parents(".idcardcon").index() == 3 && _this.mainEles.siblings(".logos1").val()) {
		                _this.vals = "身份证手持照片上传成功";
		            }

		            if (_this.mainEles.siblings(".logos1").val()) {
		                _this.mainEles.addClass("imgtrues");

		                isremind.showIsmind(".idreminds", _this.vals);

		                if ($(".certificationwrap .idcardcon").eq(0).find("input").hasClass("imgtrues") && $(".certificationwrap .idcardcon").eq(1).find("input").hasClass("imgtrues") && $(".certificationwrap .idcardcon").find("input").eq(2).hasClass("imgtrues") && $(".certificationwrap .truename").val() && $(".certificationwrap .idcards").val().match(_this.idveg)) {
		                    $(".certificationwrap .idsbumit").addClass("allright");
		                }
		            }

		            return rst;
		        });
		    });
		    return this;
		},
		submitBtn: function() {
			$(".idsbumit").on("touchstart", function() {
				//console.log($(".idcontent .logos1").val());
				Ajax({
					urls: "widget?type=member_applyshop&action=saveCheckName",
                    types: "get",
                    dataTypes: "json",
                    datas: {
                        
                    },
                    beforeSends: function() {

                    },
                    successes: function(data) {
                        var data = JSON.parse(data);
                        console.log(data);

                        if(data.result == 1) {
                            window.location.href = "../cn/personcenter.html";
                        } else {
                            $(".errormind").show();
                        }
                    },
                    errors: function(data) {
                        console.log(data);
                    }
				});
			});
			return this;
		},
		showDemo: function() {
			 $(".certificationwrap .idcardcon .title").on("touchstart", function() {
		        if ($(this).parents(".idcardcon").index() == 1) {
		            $(".isDelete").show().find(".fontimgbox").addClass("fonts").removeClass("backs").removeClass("shouchis");
		        } else if ($(this).parents(".idcardcon").index() == 2) {
		            $(".isDelete").show().find(".fontimgbox").addClass("backs").removeClass("fonts").removeClass("shouchis");
		        } else if ($(this).parents(".idcardcon").index() == 3) {
		            $(".isDelete").show().find(".fontimgbox").addClass("shouchis").removeClass("backs").removeClass("fonts");
		        }

		        $(".certificationwrap .isDelete").on("touchstart", function(event) {
		            event.preventDefault();
		            if ($(event.target).hasClass("fontimgbox") || $(event.target).hasClass("title") || $(event.target).parents().hasClass("title")) {

		            } else {
		                $(".isDelete").hide();
		            }
		        });
		    });
			 return this;
		}
	}
	var certification = new Certification();
	certification.conFail().showDemo().submitBtn().setCertification("input[name=logo1]", ".frontimg").setCertification("input[name=logo2]", ".backimg").setCertification("input[name=logo3]", ".shouchiimg");
})();