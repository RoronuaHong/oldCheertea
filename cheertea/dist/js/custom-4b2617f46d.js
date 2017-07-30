/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(7);
	var newimgChange = __webpack_require__(4);
	var datetime = __webpack_require__(19);
	var showbox = __webpack_require__(6);
	var Ajax = __webpack_require__(8);
	var swiperFun = __webpack_require__(9);
	var islogins = __webpack_require__(11);
	var imgChange = __webpack_require__(10);
	var imgchange = new imgChange();
	__webpack_require__(12);
	__webpack_require__(13);

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

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(5);

	var newimgChange = module.exports = function() {
		if(this instanceof newimgChange) {

		} else {
			return new newimgChange();
		}
	}
	newimgChange.prototype = {
		constructor: newimgChange,
		loadBanner: function(name, times, loops, sum) {
			var bannerSwiper = new Swiper(name, {
			    pagination: '.swiper-pagination',
			    autoplay: times,
			    autoplayDisableOnInteraction: false,
			    loop: loops,
			    slidesPerView: sum,
				observer: true,
				observeParents: true,
			});
			return this;
		},
		loadPath: function(name, loops, sum) {
			var pathSwiper = new Swiper(name, {
			    autoplayDisableOnInteraction: false,
			    watchSlidesProgress: true,
			    watchSlidesVisibility: true,
			    loop: loops,
			    slidesPerView: sum,
				observer: true,
				observeParents: true,
			});
			return this;
		},
		loadUp: function(name,times,loops,sum) {
			 var newsSwiper = new Swiper(name, {
		        direction: 'vertical',
		        slidesPerView: sum,
		        paginationClickable: true,
		        spaceBetween: 0,
		        loop: loops,
		        autoHeight: true,
		        autoplay: times,
		        mousewheelControl: true,
		        observer: true,
				observeParents: true
		    });
			return this;
		}
	}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Swiper 3.4.2
	 * Most modern mobile touch slider and framework with hardware accelerated transitions
	 * 
	 * http://www.idangero.us/swiper/
	 * 
	 * Copyright 2017, Vladimir Kharlampidi
	 * The iDangero.us
	 * http://www.idangero.us/
	 * 
	 * Licensed under MIT
	 * 
	 * Released on: March 10, 2017
	 */
	!function(){"use strict";var e,a=function(s,i){function r(e){return Math.floor(e)}function n(){var e=T.params.autoplay,a=T.slides.eq(T.activeIndex);a.attr("data-swiper-autoplay")&&(e=a.attr("data-swiper-autoplay")||T.params.autoplay),T.autoplayTimeoutId=setTimeout(function(){T.params.loop?(T.fixLoop(),T._slideNext(),T.emit("onAutoplay",T)):T.isEnd?i.autoplayStopOnLast?T.stopAutoplay():(T._slideTo(0),T.emit("onAutoplay",T)):(T._slideNext(),T.emit("onAutoplay",T))},e)}function o(a,t){var s=e(a.target);if(!s.is(t))if("string"==typeof t)s=s.parents(t);else if(t.nodeType){var i;return s.parents().each(function(e,a){a===t&&(i=t)}),i?t:void 0}if(0!==s.length)return s[0]}function l(e,a){a=a||{};var t=window.MutationObserver||window.WebkitMutationObserver,s=new t(function(e){e.forEach(function(e){T.onResize(!0),T.emit("onObserverUpdate",T,e)})});s.observe(e,{attributes:void 0===a.attributes||a.attributes,childList:void 0===a.childList||a.childList,characterData:void 0===a.characterData||a.characterData}),T.observers.push(s)}function p(e){e.originalEvent&&(e=e.originalEvent);var a=e.keyCode||e.charCode;if(!T.params.allowSwipeToNext&&(T.isHorizontal()&&39===a||!T.isHorizontal()&&40===a))return!1;if(!T.params.allowSwipeToPrev&&(T.isHorizontal()&&37===a||!T.isHorizontal()&&38===a))return!1;if(!(e.shiftKey||e.altKey||e.ctrlKey||e.metaKey||document.activeElement&&document.activeElement.nodeName&&("input"===document.activeElement.nodeName.toLowerCase()||"textarea"===document.activeElement.nodeName.toLowerCase()))){if(37===a||39===a||38===a||40===a){var t=!1;if(T.container.parents("."+T.params.slideClass).length>0&&0===T.container.parents("."+T.params.slideActiveClass).length)return;var s={left:window.pageXOffset,top:window.pageYOffset},i=window.innerWidth,r=window.innerHeight,n=T.container.offset();T.rtl&&(n.left=n.left-T.container[0].scrollLeft);for(var o=[[n.left,n.top],[n.left+T.width,n.top],[n.left,n.top+T.height],[n.left+T.width,n.top+T.height]],l=0;l<o.length;l++){var p=o[l];p[0]>=s.left&&p[0]<=s.left+i&&p[1]>=s.top&&p[1]<=s.top+r&&(t=!0)}if(!t)return}T.isHorizontal()?(37!==a&&39!==a||(e.preventDefault?e.preventDefault():e.returnValue=!1),(39===a&&!T.rtl||37===a&&T.rtl)&&T.slideNext(),(37===a&&!T.rtl||39===a&&T.rtl)&&T.slidePrev()):(38!==a&&40!==a||(e.preventDefault?e.preventDefault():e.returnValue=!1),40===a&&T.slideNext(),38===a&&T.slidePrev()),T.emit("onKeyPress",T,a)}}function d(e){var a=0,t=0,s=0,i=0;return"detail"in e&&(t=e.detail),"wheelDelta"in e&&(t=-e.wheelDelta/120),"wheelDeltaY"in e&&(t=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(a=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(a=t,t=0),s=10*a,i=10*t,"deltaY"in e&&(i=e.deltaY),"deltaX"in e&&(s=e.deltaX),(s||i)&&e.deltaMode&&(1===e.deltaMode?(s*=40,i*=40):(s*=800,i*=800)),s&&!a&&(a=s<1?-1:1),i&&!t&&(t=i<1?-1:1),{spinX:a,spinY:t,pixelX:s,pixelY:i}}function u(e){e.originalEvent&&(e=e.originalEvent);var a=0,t=T.rtl?-1:1,s=d(e);if(T.params.mousewheelForceToAxis)if(T.isHorizontal()){if(!(Math.abs(s.pixelX)>Math.abs(s.pixelY)))return;a=s.pixelX*t}else{if(!(Math.abs(s.pixelY)>Math.abs(s.pixelX)))return;a=s.pixelY}else a=Math.abs(s.pixelX)>Math.abs(s.pixelY)?-s.pixelX*t:-s.pixelY;if(0!==a){if(T.params.mousewheelInvert&&(a=-a),T.params.freeMode){var i=T.getWrapperTranslate()+a*T.params.mousewheelSensitivity,r=T.isBeginning,n=T.isEnd;if(i>=T.minTranslate()&&(i=T.minTranslate()),i<=T.maxTranslate()&&(i=T.maxTranslate()),T.setWrapperTransition(0),T.setWrapperTranslate(i),T.updateProgress(),T.updateActiveIndex(),(!r&&T.isBeginning||!n&&T.isEnd)&&T.updateClasses(),T.params.freeModeSticky?(clearTimeout(T.mousewheel.timeout),T.mousewheel.timeout=setTimeout(function(){T.slideReset()},300)):T.params.lazyLoading&&T.lazy&&T.lazy.load(),T.emit("onScroll",T,e),T.params.autoplay&&T.params.autoplayDisableOnInteraction&&T.stopAutoplay(),0===i||i===T.maxTranslate())return}else{if((new window.Date).getTime()-T.mousewheel.lastScrollTime>60)if(a<0)if(T.isEnd&&!T.params.loop||T.animating){if(T.params.mousewheelReleaseOnEdges)return!0}else T.slideNext(),T.emit("onScroll",T,e);else if(T.isBeginning&&!T.params.loop||T.animating){if(T.params.mousewheelReleaseOnEdges)return!0}else T.slidePrev(),T.emit("onScroll",T,e);T.mousewheel.lastScrollTime=(new window.Date).getTime()}return e.preventDefault?e.preventDefault():e.returnValue=!1,!1}}function c(a,t){a=e(a);var s,i,r,n=T.rtl?-1:1;s=a.attr("data-swiper-parallax")||"0",i=a.attr("data-swiper-parallax-x"),r=a.attr("data-swiper-parallax-y"),i||r?(i=i||"0",r=r||"0"):T.isHorizontal()?(i=s,r="0"):(r=s,i="0"),i=i.indexOf("%")>=0?parseInt(i,10)*t*n+"%":i*t*n+"px",r=r.indexOf("%")>=0?parseInt(r,10)*t+"%":r*t+"px",a.transform("translate3d("+i+", "+r+",0px)")}function m(e){return 0!==e.indexOf("on")&&(e=e[0]!==e[0].toUpperCase()?"on"+e[0].toUpperCase()+e.substring(1):"on"+e),e}if(!(this instanceof a))return new a(s,i);var h={direction:"horizontal",touchEventsTarget:"container",initialSlide:0,speed:300,autoplay:!1,autoplayDisableOnInteraction:!0,autoplayStopOnLast:!1,iOSEdgeSwipeDetection:!1,iOSEdgeSwipeThreshold:20,freeMode:!1,freeModeMomentum:!0,freeModeMomentumRatio:1,freeModeMomentumBounce:!0,freeModeMomentumBounceRatio:1,freeModeMomentumVelocityRatio:1,freeModeSticky:!1,freeModeMinimumVelocity:.02,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",coverflow:{rotate:50,stretch:0,depth:100,modifier:1,slideShadows:!0},flip:{slideShadows:!0,limitRotation:!0},cube:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94},fade:{crossFade:!1},parallax:!1,zoom:!1,zoomMax:3,zoomMin:1,zoomToggle:!0,scrollbar:null,scrollbarHide:!0,scrollbarDraggable:!1,scrollbarSnapOnRelease:!1,keyboardControl:!1,mousewheelControl:!1,mousewheelReleaseOnEdges:!1,mousewheelInvert:!1,mousewheelForceToAxis:!1,mousewheelSensitivity:1,mousewheelEventsTarged:"container",hashnav:!1,hashnavWatchState:!1,history:!1,replaceState:!1,breakpoints:void 0,spaceBetween:0,slidesPerView:1,slidesPerColumn:1,slidesPerColumnFill:"column",slidesPerGroup:1,centeredSlides:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,onlyExternal:!1,threshold:0,touchMoveStopPropagation:!0,touchReleaseOnEdges:!1,uniqueNavElements:!0,pagination:null,paginationElement:"span",paginationClickable:!1,paginationHide:!1,paginationBulletRender:null,paginationProgressRender:null,paginationFractionRender:null,paginationCustomRender:null,paginationType:"bullets",resistance:!0,resistanceRatio:.85,nextButton:null,prevButton:null,watchSlidesProgress:!1,watchSlidesVisibility:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,lazyLoading:!1,lazyLoadingInPrevNext:!1,lazyLoadingInPrevNextAmount:1,lazyLoadingOnTransitionStart:!1,preloadImages:!0,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,control:void 0,controlInverse:!1,controlBy:"slide",normalizeSlideIndex:!0,allowSwipeToPrev:!0,allowSwipeToNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",passiveListeners:!0,containerModifierClass:"swiper-container-",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideDuplicateActiveClass:"swiper-slide-duplicate-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slideDuplicateNextClass:"swiper-slide-duplicate-next",slidePrevClass:"swiper-slide-prev",slideDuplicatePrevClass:"swiper-slide-duplicate-prev",wrapperClass:"swiper-wrapper",bulletClass:"swiper-pagination-bullet",bulletActiveClass:"swiper-pagination-bullet-active",buttonDisabledClass:"swiper-button-disabled",paginationCurrentClass:"swiper-pagination-current",paginationTotalClass:"swiper-pagination-total",paginationHiddenClass:"swiper-pagination-hidden",paginationProgressbarClass:"swiper-pagination-progressbar",paginationClickableClass:"swiper-pagination-clickable",paginationModifierClass:"swiper-pagination-",lazyLoadingClass:"swiper-lazy",lazyStatusLoadingClass:"swiper-lazy-loading",lazyStatusLoadedClass:"swiper-lazy-loaded",lazyPreloaderClass:"swiper-lazy-preloader",notificationClass:"swiper-notification",preloaderClass:"preloader",zoomContainerClass:"swiper-zoom-container",observer:!1,observeParents:!1,a11y:!1,prevSlideMessage:"Previous slide",nextSlideMessage:"Next slide",firstSlideMessage:"This is the first slide",lastSlideMessage:"This is the last slide",paginationBulletMessage:"Go to slide {{index}}",runCallbacksOnInit:!0},g=i&&i.virtualTranslate;i=i||{};var f={};for(var v in i)if("object"!=typeof i[v]||null===i[v]||(i[v].nodeType||i[v]===window||i[v]===document||void 0!==t&&i[v]instanceof t||"undefined"!=typeof jQuery&&i[v]instanceof jQuery))f[v]=i[v];else{f[v]={};for(var w in i[v])f[v][w]=i[v][w]}for(var y in h)if(void 0===i[y])i[y]=h[y];else if("object"==typeof i[y])for(var x in h[y])void 0===i[y][x]&&(i[y][x]=h[y][x]);var T=this;if(T.params=i,T.originalParams=f,T.classNames=[],void 0!==e&&void 0!==t&&(e=t),(void 0!==e||(e=void 0===t?window.Dom7||window.Zepto||window.jQuery:t))&&(T.$=e,T.currentBreakpoint=void 0,T.getActiveBreakpoint=function(){if(!T.params.breakpoints)return!1;var e,a=!1,t=[];for(e in T.params.breakpoints)T.params.breakpoints.hasOwnProperty(e)&&t.push(e);t.sort(function(e,a){return parseInt(e,10)>parseInt(a,10)});for(var s=0;s<t.length;s++)(e=t[s])>=window.innerWidth&&!a&&(a=e);return a||"max"},T.setBreakpoint=function(){var e=T.getActiveBreakpoint();if(e&&T.currentBreakpoint!==e){var a=e in T.params.breakpoints?T.params.breakpoints[e]:T.originalParams,t=T.params.loop&&a.slidesPerView!==T.params.slidesPerView;for(var s in a)T.params[s]=a[s];T.currentBreakpoint=e,t&&T.destroyLoop&&T.reLoop(!0)}},T.params.breakpoints&&T.setBreakpoint(),T.container=e(s),0!==T.container.length)){if(T.container.length>1){var b=[];return T.container.each(function(){b.push(new a(this,i))}),b}T.container[0].swiper=T,T.container.data("swiper",T),T.classNames.push(T.params.containerModifierClass+T.params.direction),T.params.freeMode&&T.classNames.push(T.params.containerModifierClass+"free-mode"),T.support.flexbox||(T.classNames.push(T.params.containerModifierClass+"no-flexbox"),T.params.slidesPerColumn=1),T.params.autoHeight&&T.classNames.push(T.params.containerModifierClass+"autoheight"),(T.params.parallax||T.params.watchSlidesVisibility)&&(T.params.watchSlidesProgress=!0),T.params.touchReleaseOnEdges&&(T.params.resistanceRatio=0),["cube","coverflow","flip"].indexOf(T.params.effect)>=0&&(T.support.transforms3d?(T.params.watchSlidesProgress=!0,T.classNames.push(T.params.containerModifierClass+"3d")):T.params.effect="slide"),"slide"!==T.params.effect&&T.classNames.push(T.params.containerModifierClass+T.params.effect),"cube"===T.params.effect&&(T.params.resistanceRatio=0,T.params.slidesPerView=1,T.params.slidesPerColumn=1,T.params.slidesPerGroup=1,T.params.centeredSlides=!1,T.params.spaceBetween=0,T.params.virtualTranslate=!0),"fade"!==T.params.effect&&"flip"!==T.params.effect||(T.params.slidesPerView=1,T.params.slidesPerColumn=1,T.params.slidesPerGroup=1,T.params.watchSlidesProgress=!0,T.params.spaceBetween=0,void 0===g&&(T.params.virtualTranslate=!0)),T.params.grabCursor&&T.support.touch&&(T.params.grabCursor=!1),T.wrapper=T.container.children("."+T.params.wrapperClass),T.params.pagination&&(T.paginationContainer=e(T.params.pagination),T.params.uniqueNavElements&&"string"==typeof T.params.pagination&&T.paginationContainer.length>1&&1===T.container.find(T.params.pagination).length&&(T.paginationContainer=T.container.find(T.params.pagination)),"bullets"===T.params.paginationType&&T.params.paginationClickable?T.paginationContainer.addClass(T.params.paginationModifierClass+"clickable"):T.params.paginationClickable=!1,T.paginationContainer.addClass(T.params.paginationModifierClass+T.params.paginationType)),(T.params.nextButton||T.params.prevButton)&&(T.params.nextButton&&(T.nextButton=e(T.params.nextButton),T.params.uniqueNavElements&&"string"==typeof T.params.nextButton&&T.nextButton.length>1&&1===T.container.find(T.params.nextButton).length&&(T.nextButton=T.container.find(T.params.nextButton))),T.params.prevButton&&(T.prevButton=e(T.params.prevButton),T.params.uniqueNavElements&&"string"==typeof T.params.prevButton&&T.prevButton.length>1&&1===T.container.find(T.params.prevButton).length&&(T.prevButton=T.container.find(T.params.prevButton)))),T.isHorizontal=function(){return"horizontal"===T.params.direction},T.rtl=T.isHorizontal()&&("rtl"===T.container[0].dir.toLowerCase()||"rtl"===T.container.css("direction")),T.rtl&&T.classNames.push(T.params.containerModifierClass+"rtl"),T.rtl&&(T.wrongRTL="-webkit-box"===T.wrapper.css("display")),T.params.slidesPerColumn>1&&T.classNames.push(T.params.containerModifierClass+"multirow"),T.device.android&&T.classNames.push(T.params.containerModifierClass+"android"),T.container.addClass(T.classNames.join(" ")),T.translate=0,T.progress=0,T.velocity=0,T.lockSwipeToNext=function(){T.params.allowSwipeToNext=!1,T.params.allowSwipeToPrev===!1&&T.params.grabCursor&&T.unsetGrabCursor()},T.lockSwipeToPrev=function(){T.params.allowSwipeToPrev=!1,T.params.allowSwipeToNext===!1&&T.params.grabCursor&&T.unsetGrabCursor()},T.lockSwipes=function(){T.params.allowSwipeToNext=T.params.allowSwipeToPrev=!1,T.params.grabCursor&&T.unsetGrabCursor()},T.unlockSwipeToNext=function(){T.params.allowSwipeToNext=!0,T.params.allowSwipeToPrev===!0&&T.params.grabCursor&&T.setGrabCursor()},T.unlockSwipeToPrev=function(){T.params.allowSwipeToPrev=!0,T.params.allowSwipeToNext===!0&&T.params.grabCursor&&T.setGrabCursor()},T.unlockSwipes=function(){T.params.allowSwipeToNext=T.params.allowSwipeToPrev=!0,T.params.grabCursor&&T.setGrabCursor()},T.setGrabCursor=function(e){T.container[0].style.cursor="move",T.container[0].style.cursor=e?"-webkit-grabbing":"-webkit-grab",T.container[0].style.cursor=e?"-moz-grabbin":"-moz-grab",T.container[0].style.cursor=e?"grabbing":"grab"},T.unsetGrabCursor=function(){T.container[0].style.cursor=""},T.params.grabCursor&&T.setGrabCursor(),T.imagesToLoad=[],T.imagesLoaded=0,T.loadImage=function(e,a,t,s,i,r){function n(){r&&r()}var o;e.complete&&i?n():a?(o=new window.Image,o.onload=n,o.onerror=n,s&&(o.sizes=s),t&&(o.srcset=t),a&&(o.src=a)):n()},T.preloadImages=function(){function e(){void 0!==T&&null!==T&&T&&(void 0!==T.imagesLoaded&&T.imagesLoaded++,T.imagesLoaded===T.imagesToLoad.length&&(T.params.updateOnImagesReady&&T.update(),T.emit("onImagesReady",T)))}T.imagesToLoad=T.container.find("img");for(var a=0;a<T.imagesToLoad.length;a++)T.loadImage(T.imagesToLoad[a],T.imagesToLoad[a].currentSrc||T.imagesToLoad[a].getAttribute("src"),T.imagesToLoad[a].srcset||T.imagesToLoad[a].getAttribute("srcset"),T.imagesToLoad[a].sizes||T.imagesToLoad[a].getAttribute("sizes"),!0,e)},T.autoplayTimeoutId=void 0,T.autoplaying=!1,T.autoplayPaused=!1,T.startAutoplay=function(){return void 0===T.autoplayTimeoutId&&(!!T.params.autoplay&&(!T.autoplaying&&(T.autoplaying=!0,T.emit("onAutoplayStart",T),void n())))},T.stopAutoplay=function(e){T.autoplayTimeoutId&&(T.autoplayTimeoutId&&clearTimeout(T.autoplayTimeoutId),T.autoplaying=!1,T.autoplayTimeoutId=void 0,T.emit("onAutoplayStop",T))},T.pauseAutoplay=function(e){T.autoplayPaused||(T.autoplayTimeoutId&&clearTimeout(T.autoplayTimeoutId),T.autoplayPaused=!0,0===e?(T.autoplayPaused=!1,n()):T.wrapper.transitionEnd(function(){T&&(T.autoplayPaused=!1,T.autoplaying?n():T.stopAutoplay())}))},T.minTranslate=function(){return-T.snapGrid[0]},T.maxTranslate=function(){return-T.snapGrid[T.snapGrid.length-1]},T.updateAutoHeight=function(){var e,a=[],t=0;if("auto"!==T.params.slidesPerView&&T.params.slidesPerView>1)for(e=0;e<Math.ceil(T.params.slidesPerView);e++){var s=T.activeIndex+e;if(s>T.slides.length)break;a.push(T.slides.eq(s)[0])}else a.push(T.slides.eq(T.activeIndex)[0]);for(e=0;e<a.length;e++)if(void 0!==a[e]){var i=a[e].offsetHeight;t=i>t?i:t}t&&T.wrapper.css("height",t+"px")},T.updateContainerSize=function(){var e,a;e=void 0!==T.params.width?T.params.width:T.container[0].clientWidth,a=void 0!==T.params.height?T.params.height:T.container[0].clientHeight,0===e&&T.isHorizontal()||0===a&&!T.isHorizontal()||(e=e-parseInt(T.container.css("padding-left"),10)-parseInt(T.container.css("padding-right"),10),a=a-parseInt(T.container.css("padding-top"),10)-parseInt(T.container.css("padding-bottom"),10),T.width=e,T.height=a,T.size=T.isHorizontal()?T.width:T.height)},T.updateSlidesSize=function(){T.slides=T.wrapper.children("."+T.params.slideClass),T.snapGrid=[],T.slidesGrid=[],T.slidesSizesGrid=[];var e,a=T.params.spaceBetween,t=-T.params.slidesOffsetBefore,s=0,i=0;if(void 0!==T.size){"string"==typeof a&&a.indexOf("%")>=0&&(a=parseFloat(a.replace("%",""))/100*T.size),T.virtualSize=-a,T.rtl?T.slides.css({marginLeft:"",marginTop:""}):T.slides.css({marginRight:"",marginBottom:""});var n;T.params.slidesPerColumn>1&&(n=Math.floor(T.slides.length/T.params.slidesPerColumn)===T.slides.length/T.params.slidesPerColumn?T.slides.length:Math.ceil(T.slides.length/T.params.slidesPerColumn)*T.params.slidesPerColumn,"auto"!==T.params.slidesPerView&&"row"===T.params.slidesPerColumnFill&&(n=Math.max(n,T.params.slidesPerView*T.params.slidesPerColumn)));var o,l=T.params.slidesPerColumn,p=n/l,d=p-(T.params.slidesPerColumn*p-T.slides.length);for(e=0;e<T.slides.length;e++){o=0;var u=T.slides.eq(e);if(T.params.slidesPerColumn>1){var c,m,h;"column"===T.params.slidesPerColumnFill?(m=Math.floor(e/l),h=e-m*l,(m>d||m===d&&h===l-1)&&++h>=l&&(h=0,m++),c=m+h*n/l,u.css({"-webkit-box-ordinal-group":c,"-moz-box-ordinal-group":c,"-ms-flex-order":c,"-webkit-order":c,order:c})):(h=Math.floor(e/p),m=e-h*p),u.css("margin-"+(T.isHorizontal()?"top":"left"),0!==h&&T.params.spaceBetween&&T.params.spaceBetween+"px").attr("data-swiper-column",m).attr("data-swiper-row",h)}"none"!==u.css("display")&&("auto"===T.params.slidesPerView?(o=T.isHorizontal()?u.outerWidth(!0):u.outerHeight(!0),T.params.roundLengths&&(o=r(o))):(o=(T.size-(T.params.slidesPerView-1)*a)/T.params.slidesPerView,T.params.roundLengths&&(o=r(o)),T.isHorizontal()?T.slides[e].style.width=o+"px":T.slides[e].style.height=o+"px"),T.slides[e].swiperSlideSize=o,T.slidesSizesGrid.push(o),T.params.centeredSlides?(t=t+o/2+s/2+a,0===s&&0!==e&&(t=t-T.size/2-a),0===e&&(t=t-T.size/2-a),Math.abs(t)<.001&&(t=0),i%T.params.slidesPerGroup==0&&T.snapGrid.push(t),T.slidesGrid.push(t)):(i%T.params.slidesPerGroup==0&&T.snapGrid.push(t),T.slidesGrid.push(t),t=t+o+a),T.virtualSize+=o+a,s=o,i++)}T.virtualSize=Math.max(T.virtualSize,T.size)+T.params.slidesOffsetAfter;var g;if(T.rtl&&T.wrongRTL&&("slide"===T.params.effect||"coverflow"===T.params.effect)&&T.wrapper.css({width:T.virtualSize+T.params.spaceBetween+"px"}),T.support.flexbox&&!T.params.setWrapperSize||(T.isHorizontal()?T.wrapper.css({width:T.virtualSize+T.params.spaceBetween+"px"}):T.wrapper.css({height:T.virtualSize+T.params.spaceBetween+"px"})),T.params.slidesPerColumn>1&&(T.virtualSize=(o+T.params.spaceBetween)*n,T.virtualSize=Math.ceil(T.virtualSize/T.params.slidesPerColumn)-T.params.spaceBetween,T.isHorizontal()?T.wrapper.css({width:T.virtualSize+T.params.spaceBetween+"px"}):T.wrapper.css({height:T.virtualSize+T.params.spaceBetween+"px"}),T.params.centeredSlides)){for(g=[],e=0;e<T.snapGrid.length;e++)T.snapGrid[e]<T.virtualSize+T.snapGrid[0]&&g.push(T.snapGrid[e]);T.snapGrid=g}if(!T.params.centeredSlides){for(g=[],e=0;e<T.snapGrid.length;e++)T.snapGrid[e]<=T.virtualSize-T.size&&g.push(T.snapGrid[e]);T.snapGrid=g,Math.floor(T.virtualSize-T.size)-Math.floor(T.snapGrid[T.snapGrid.length-1])>1&&T.snapGrid.push(T.virtualSize-T.size)}0===T.snapGrid.length&&(T.snapGrid=[0]),0!==T.params.spaceBetween&&(T.isHorizontal()?T.rtl?T.slides.css({marginLeft:a+"px"}):T.slides.css({marginRight:a+"px"}):T.slides.css({marginBottom:a+"px"})),T.params.watchSlidesProgress&&T.updateSlidesOffset()}},T.updateSlidesOffset=function(){for(var e=0;e<T.slides.length;e++)T.slides[e].swiperSlideOffset=T.isHorizontal()?T.slides[e].offsetLeft:T.slides[e].offsetTop},T.currentSlidesPerView=function(){var e,a,t=1;if(T.params.centeredSlides){var s,i=T.slides[T.activeIndex].swiperSlideSize;for(e=T.activeIndex+1;e<T.slides.length;e++)T.slides[e]&&!s&&(i+=T.slides[e].swiperSlideSize,t++,i>T.size&&(s=!0));for(a=T.activeIndex-1;a>=0;a--)T.slides[a]&&!s&&(i+=T.slides[a].swiperSlideSize,t++,i>T.size&&(s=!0))}else for(e=T.activeIndex+1;e<T.slides.length;e++)T.slidesGrid[e]-T.slidesGrid[T.activeIndex]<T.size&&t++;return t},T.updateSlidesProgress=function(e){if(void 0===e&&(e=T.translate||0),0!==T.slides.length){void 0===T.slides[0].swiperSlideOffset&&T.updateSlidesOffset();var a=-e;T.rtl&&(a=e),T.slides.removeClass(T.params.slideVisibleClass);for(var t=0;t<T.slides.length;t++){var s=T.slides[t],i=(a+(T.params.centeredSlides?T.minTranslate():0)-s.swiperSlideOffset)/(s.swiperSlideSize+T.params.spaceBetween);if(T.params.watchSlidesVisibility){var r=-(a-s.swiperSlideOffset),n=r+T.slidesSizesGrid[t];(r>=0&&r<T.size||n>0&&n<=T.size||r<=0&&n>=T.size)&&T.slides.eq(t).addClass(T.params.slideVisibleClass)}s.progress=T.rtl?-i:i}}},T.updateProgress=function(e){void 0===e&&(e=T.translate||0);var a=T.maxTranslate()-T.minTranslate(),t=T.isBeginning,s=T.isEnd;0===a?(T.progress=0,T.isBeginning=T.isEnd=!0):(T.progress=(e-T.minTranslate())/a,T.isBeginning=T.progress<=0,T.isEnd=T.progress>=1),T.isBeginning&&!t&&T.emit("onReachBeginning",T),T.isEnd&&!s&&T.emit("onReachEnd",T),T.params.watchSlidesProgress&&T.updateSlidesProgress(e),T.emit("onProgress",T,T.progress)},T.updateActiveIndex=function(){var e,a,t,s=T.rtl?T.translate:-T.translate;for(a=0;a<T.slidesGrid.length;a++)void 0!==T.slidesGrid[a+1]?s>=T.slidesGrid[a]&&s<T.slidesGrid[a+1]-(T.slidesGrid[a+1]-T.slidesGrid[a])/2?e=a:s>=T.slidesGrid[a]&&s<T.slidesGrid[a+1]&&(e=a+1):s>=T.slidesGrid[a]&&(e=a);T.params.normalizeSlideIndex&&(e<0||void 0===e)&&(e=0),t=Math.floor(e/T.params.slidesPerGroup),t>=T.snapGrid.length&&(t=T.snapGrid.length-1),e!==T.activeIndex&&(T.snapIndex=t,T.previousIndex=T.activeIndex,T.activeIndex=e,T.updateClasses(),T.updateRealIndex())},T.updateRealIndex=function(){T.realIndex=parseInt(T.slides.eq(T.activeIndex).attr("data-swiper-slide-index")||T.activeIndex,10)},T.updateClasses=function(){T.slides.removeClass(T.params.slideActiveClass+" "+T.params.slideNextClass+" "+T.params.slidePrevClass+" "+T.params.slideDuplicateActiveClass+" "+T.params.slideDuplicateNextClass+" "+T.params.slideDuplicatePrevClass);var a=T.slides.eq(T.activeIndex);a.addClass(T.params.slideActiveClass),i.loop&&(a.hasClass(T.params.slideDuplicateClass)?T.wrapper.children("."+T.params.slideClass+":not(."+T.params.slideDuplicateClass+')[data-swiper-slide-index="'+T.realIndex+'"]').addClass(T.params.slideDuplicateActiveClass):T.wrapper.children("."+T.params.slideClass+"."+T.params.slideDuplicateClass+'[data-swiper-slide-index="'+T.realIndex+'"]').addClass(T.params.slideDuplicateActiveClass));var t=a.next("."+T.params.slideClass).addClass(T.params.slideNextClass);T.params.loop&&0===t.length&&(t=T.slides.eq(0),t.addClass(T.params.slideNextClass));var s=a.prev("."+T.params.slideClass).addClass(T.params.slidePrevClass);if(T.params.loop&&0===s.length&&(s=T.slides.eq(-1),s.addClass(T.params.slidePrevClass)),i.loop&&(t.hasClass(T.params.slideDuplicateClass)?T.wrapper.children("."+T.params.slideClass+":not(."+T.params.slideDuplicateClass+')[data-swiper-slide-index="'+t.attr("data-swiper-slide-index")+'"]').addClass(T.params.slideDuplicateNextClass):T.wrapper.children("."+T.params.slideClass+"."+T.params.slideDuplicateClass+'[data-swiper-slide-index="'+t.attr("data-swiper-slide-index")+'"]').addClass(T.params.slideDuplicateNextClass),s.hasClass(T.params.slideDuplicateClass)?T.wrapper.children("."+T.params.slideClass+":not(."+T.params.slideDuplicateClass+')[data-swiper-slide-index="'+s.attr("data-swiper-slide-index")+'"]').addClass(T.params.slideDuplicatePrevClass):T.wrapper.children("."+T.params.slideClass+"."+T.params.slideDuplicateClass+'[data-swiper-slide-index="'+s.attr("data-swiper-slide-index")+'"]').addClass(T.params.slideDuplicatePrevClass)),T.paginationContainer&&T.paginationContainer.length>0){var r,n=T.params.loop?Math.ceil((T.slides.length-2*T.loopedSlides)/T.params.slidesPerGroup):T.snapGrid.length;if(T.params.loop?(r=Math.ceil((T.activeIndex-T.loopedSlides)/T.params.slidesPerGroup),r>T.slides.length-1-2*T.loopedSlides&&(r-=T.slides.length-2*T.loopedSlides),r>n-1&&(r-=n),r<0&&"bullets"!==T.params.paginationType&&(r=n+r)):r=void 0!==T.snapIndex?T.snapIndex:T.activeIndex||0,"bullets"===T.params.paginationType&&T.bullets&&T.bullets.length>0&&(T.bullets.removeClass(T.params.bulletActiveClass),T.paginationContainer.length>1?T.bullets.each(function(){e(this).index()===r&&e(this).addClass(T.params.bulletActiveClass)}):T.bullets.eq(r).addClass(T.params.bulletActiveClass)),"fraction"===T.params.paginationType&&(T.paginationContainer.find("."+T.params.paginationCurrentClass).text(r+1),T.paginationContainer.find("."+T.params.paginationTotalClass).text(n)),"progress"===T.params.paginationType){var o=(r+1)/n,l=o,p=1;T.isHorizontal()||(p=o,l=1),T.paginationContainer.find("."+T.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX("+l+") scaleY("+p+")").transition(T.params.speed)}"custom"===T.params.paginationType&&T.params.paginationCustomRender&&(T.paginationContainer.html(T.params.paginationCustomRender(T,r+1,n)),T.emit("onPaginationRendered",T,T.paginationContainer[0]))}T.params.loop||(T.params.prevButton&&T.prevButton&&T.prevButton.length>0&&(T.isBeginning?(T.prevButton.addClass(T.params.buttonDisabledClass),T.params.a11y&&T.a11y&&T.a11y.disable(T.prevButton)):(T.prevButton.removeClass(T.params.buttonDisabledClass),T.params.a11y&&T.a11y&&T.a11y.enable(T.prevButton))),T.params.nextButton&&T.nextButton&&T.nextButton.length>0&&(T.isEnd?(T.nextButton.addClass(T.params.buttonDisabledClass),T.params.a11y&&T.a11y&&T.a11y.disable(T.nextButton)):(T.nextButton.removeClass(T.params.buttonDisabledClass),T.params.a11y&&T.a11y&&T.a11y.enable(T.nextButton))))},T.updatePagination=function(){if(T.params.pagination&&T.paginationContainer&&T.paginationContainer.length>0){var e="";if("bullets"===T.params.paginationType){for(var a=T.params.loop?Math.ceil((T.slides.length-2*T.loopedSlides)/T.params.slidesPerGroup):T.snapGrid.length,t=0;t<a;t++)e+=T.params.paginationBulletRender?T.params.paginationBulletRender(T,t,T.params.bulletClass):"<"+T.params.paginationElement+' class="'+T.params.bulletClass+'"></'+T.params.paginationElement+">";T.paginationContainer.html(e),T.bullets=T.paginationContainer.find("."+T.params.bulletClass),T.params.paginationClickable&&T.params.a11y&&T.a11y&&T.a11y.initPagination()}"fraction"===T.params.paginationType&&(e=T.params.paginationFractionRender?T.params.paginationFractionRender(T,T.params.paginationCurrentClass,T.params.paginationTotalClass):'<span class="'+T.params.paginationCurrentClass+'"></span> / <span class="'+T.params.paginationTotalClass+'"></span>',T.paginationContainer.html(e)),"progress"===T.params.paginationType&&(e=T.params.paginationProgressRender?T.params.paginationProgressRender(T,T.params.paginationProgressbarClass):'<span class="'+T.params.paginationProgressbarClass+'"></span>',T.paginationContainer.html(e)),"custom"!==T.params.paginationType&&T.emit("onPaginationRendered",T,T.paginationContainer[0])}},T.update=function(e){function a(){T.rtl,T.translate;t=Math.min(Math.max(T.translate,T.maxTranslate()),T.minTranslate()),T.setWrapperTranslate(t),T.updateActiveIndex(),T.updateClasses()}if(T){T.updateContainerSize(),T.updateSlidesSize(),T.updateProgress(),T.updatePagination(),T.updateClasses(),T.params.scrollbar&&T.scrollbar&&T.scrollbar.set();var t;if(e){T.controller&&T.controller.spline&&(T.controller.spline=void 0),T.params.freeMode?(a(),T.params.autoHeight&&T.updateAutoHeight()):(("auto"===T.params.slidesPerView||T.params.slidesPerView>1)&&T.isEnd&&!T.params.centeredSlides?T.slideTo(T.slides.length-1,0,!1,!0):T.slideTo(T.activeIndex,0,!1,!0))||a()}else T.params.autoHeight&&T.updateAutoHeight()}},T.onResize=function(e){T.params.onBeforeResize&&T.params.onBeforeResize(T),T.params.breakpoints&&T.setBreakpoint();var a=T.params.allowSwipeToPrev,t=T.params.allowSwipeToNext;T.params.allowSwipeToPrev=T.params.allowSwipeToNext=!0,T.updateContainerSize(),T.updateSlidesSize(),("auto"===T.params.slidesPerView||T.params.freeMode||e)&&T.updatePagination(),T.params.scrollbar&&T.scrollbar&&T.scrollbar.set(),T.controller&&T.controller.spline&&(T.controller.spline=void 0);var s=!1;if(T.params.freeMode){var i=Math.min(Math.max(T.translate,T.maxTranslate()),T.minTranslate());T.setWrapperTranslate(i),T.updateActiveIndex(),T.updateClasses(),T.params.autoHeight&&T.updateAutoHeight()}else T.updateClasses(),s=("auto"===T.params.slidesPerView||T.params.slidesPerView>1)&&T.isEnd&&!T.params.centeredSlides?T.slideTo(T.slides.length-1,0,!1,!0):T.slideTo(T.activeIndex,0,!1,!0);T.params.lazyLoading&&!s&&T.lazy&&T.lazy.load(),T.params.allowSwipeToPrev=a,T.params.allowSwipeToNext=t,T.params.onAfterResize&&T.params.onAfterResize(T)},T.touchEventsDesktop={start:"mousedown",move:"mousemove",end:"mouseup"},window.navigator.pointerEnabled?T.touchEventsDesktop={start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled&&(T.touchEventsDesktop={start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}),T.touchEvents={start:T.support.touch||!T.params.simulateTouch?"touchstart":T.touchEventsDesktop.start,move:T.support.touch||!T.params.simulateTouch?"touchmove":T.touchEventsDesktop.move,end:T.support.touch||!T.params.simulateTouch?"touchend":T.touchEventsDesktop.end},(window.navigator.pointerEnabled||window.navigator.msPointerEnabled)&&("container"===T.params.touchEventsTarget?T.container:T.wrapper).addClass("swiper-wp8-"+T.params.direction),T.initEvents=function(e){var a=e?"off":"on",t=e?"removeEventListener":"addEventListener",s="container"===T.params.touchEventsTarget?T.container[0]:T.wrapper[0],r=T.support.touch?s:document,n=!!T.params.nested;if(T.browser.ie)s[t](T.touchEvents.start,T.onTouchStart,!1),r[t](T.touchEvents.move,T.onTouchMove,n),r[t](T.touchEvents.end,T.onTouchEnd,!1);else{if(T.support.touch){var o=!("touchstart"!==T.touchEvents.start||!T.support.passiveListener||!T.params.passiveListeners)&&{passive:!0,capture:!1};s[t](T.touchEvents.start,T.onTouchStart,o),s[t](T.touchEvents.move,T.onTouchMove,n),s[t](T.touchEvents.end,T.onTouchEnd,o)}(i.simulateTouch&&!T.device.ios&&!T.device.android||i.simulateTouch&&!T.support.touch&&T.device.ios)&&(s[t]("mousedown",T.onTouchStart,!1),document[t]("mousemove",T.onTouchMove,n),document[t]("mouseup",T.onTouchEnd,!1))}window[t]("resize",T.onResize),T.params.nextButton&&T.nextButton&&T.nextButton.length>0&&(T.nextButton[a]("click",T.onClickNext),T.params.a11y&&T.a11y&&T.nextButton[a]("keydown",T.a11y.onEnterKey)),T.params.prevButton&&T.prevButton&&T.prevButton.length>0&&(T.prevButton[a]("click",T.onClickPrev),T.params.a11y&&T.a11y&&T.prevButton[a]("keydown",T.a11y.onEnterKey)),T.params.pagination&&T.params.paginationClickable&&(T.paginationContainer[a]("click","."+T.params.bulletClass,T.onClickIndex),T.params.a11y&&T.a11y&&T.paginationContainer[a]("keydown","."+T.params.bulletClass,T.a11y.onEnterKey)),(T.params.preventClicks||T.params.preventClicksPropagation)&&s[t]("click",T.preventClicks,!0)},T.attachEvents=function(){T.initEvents()},T.detachEvents=function(){T.initEvents(!0)},T.allowClick=!0,T.preventClicks=function(e){T.allowClick||(T.params.preventClicks&&e.preventDefault(),T.params.preventClicksPropagation&&T.animating&&(e.stopPropagation(),e.stopImmediatePropagation()))},T.onClickNext=function(e){e.preventDefault(),T.isEnd&&!T.params.loop||T.slideNext()},T.onClickPrev=function(e){e.preventDefault(),T.isBeginning&&!T.params.loop||T.slidePrev()},T.onClickIndex=function(a){a.preventDefault();var t=e(this).index()*T.params.slidesPerGroup;T.params.loop&&(t+=T.loopedSlides),T.slideTo(t)},
	T.updateClickedSlide=function(a){var t=o(a,"."+T.params.slideClass),s=!1;if(t)for(var i=0;i<T.slides.length;i++)T.slides[i]===t&&(s=!0);if(!t||!s)return T.clickedSlide=void 0,void(T.clickedIndex=void 0);if(T.clickedSlide=t,T.clickedIndex=e(t).index(),T.params.slideToClickedSlide&&void 0!==T.clickedIndex&&T.clickedIndex!==T.activeIndex){var r,n=T.clickedIndex,l="auto"===T.params.slidesPerView?T.currentSlidesPerView():T.params.slidesPerView;if(T.params.loop){if(T.animating)return;r=parseInt(e(T.clickedSlide).attr("data-swiper-slide-index"),10),T.params.centeredSlides?n<T.loopedSlides-l/2||n>T.slides.length-T.loopedSlides+l/2?(T.fixLoop(),n=T.wrapper.children("."+T.params.slideClass+'[data-swiper-slide-index="'+r+'"]:not(.'+T.params.slideDuplicateClass+")").eq(0).index(),setTimeout(function(){T.slideTo(n)},0)):T.slideTo(n):n>T.slides.length-l?(T.fixLoop(),n=T.wrapper.children("."+T.params.slideClass+'[data-swiper-slide-index="'+r+'"]:not(.'+T.params.slideDuplicateClass+")").eq(0).index(),setTimeout(function(){T.slideTo(n)},0)):T.slideTo(n)}else T.slideTo(n)}};var S,C,z,M,E,P,I,k,L,D,B="input, select, textarea, button, video",H=Date.now(),G=[];T.animating=!1,T.touches={startX:0,startY:0,currentX:0,currentY:0,diff:0};var X,A;T.onTouchStart=function(a){if(a.originalEvent&&(a=a.originalEvent),(X="touchstart"===a.type)||!("which"in a)||3!==a.which){if(T.params.noSwiping&&o(a,"."+T.params.noSwipingClass))return void(T.allowClick=!0);if(!T.params.swipeHandler||o(a,T.params.swipeHandler)){var t=T.touches.currentX="touchstart"===a.type?a.targetTouches[0].pageX:a.pageX,s=T.touches.currentY="touchstart"===a.type?a.targetTouches[0].pageY:a.pageY;if(!(T.device.ios&&T.params.iOSEdgeSwipeDetection&&t<=T.params.iOSEdgeSwipeThreshold)){if(S=!0,C=!1,z=!0,E=void 0,A=void 0,T.touches.startX=t,T.touches.startY=s,M=Date.now(),T.allowClick=!0,T.updateContainerSize(),T.swipeDirection=void 0,T.params.threshold>0&&(k=!1),"touchstart"!==a.type){var i=!0;e(a.target).is(B)&&(i=!1),document.activeElement&&e(document.activeElement).is(B)&&document.activeElement.blur(),i&&a.preventDefault()}T.emit("onTouchStart",T,a)}}}},T.onTouchMove=function(a){if(a.originalEvent&&(a=a.originalEvent),!X||"mousemove"!==a.type){if(a.preventedByNestedSwiper)return T.touches.startX="touchmove"===a.type?a.targetTouches[0].pageX:a.pageX,void(T.touches.startY="touchmove"===a.type?a.targetTouches[0].pageY:a.pageY);if(T.params.onlyExternal)return T.allowClick=!1,void(S&&(T.touches.startX=T.touches.currentX="touchmove"===a.type?a.targetTouches[0].pageX:a.pageX,T.touches.startY=T.touches.currentY="touchmove"===a.type?a.targetTouches[0].pageY:a.pageY,M=Date.now()));if(X&&T.params.touchReleaseOnEdges&&!T.params.loop)if(T.isHorizontal()){if(T.touches.currentX<T.touches.startX&&T.translate<=T.maxTranslate()||T.touches.currentX>T.touches.startX&&T.translate>=T.minTranslate())return}else if(T.touches.currentY<T.touches.startY&&T.translate<=T.maxTranslate()||T.touches.currentY>T.touches.startY&&T.translate>=T.minTranslate())return;if(X&&document.activeElement&&a.target===document.activeElement&&e(a.target).is(B))return C=!0,void(T.allowClick=!1);if(z&&T.emit("onTouchMove",T,a),!(a.targetTouches&&a.targetTouches.length>1)){if(T.touches.currentX="touchmove"===a.type?a.targetTouches[0].pageX:a.pageX,T.touches.currentY="touchmove"===a.type?a.targetTouches[0].pageY:a.pageY,void 0===E){var t;T.isHorizontal()&&T.touches.currentY===T.touches.startY||!T.isHorizontal()&&T.touches.currentX===T.touches.startX?E=!1:(t=180*Math.atan2(Math.abs(T.touches.currentY-T.touches.startY),Math.abs(T.touches.currentX-T.touches.startX))/Math.PI,E=T.isHorizontal()?t>T.params.touchAngle:90-t>T.params.touchAngle)}if(E&&T.emit("onTouchMoveOpposite",T,a),void 0===A&&(T.touches.currentX===T.touches.startX&&T.touches.currentY===T.touches.startY||(A=!0)),S){if(E)return void(S=!1);if(A){T.allowClick=!1,T.emit("onSliderMove",T,a),a.preventDefault(),T.params.touchMoveStopPropagation&&!T.params.nested&&a.stopPropagation(),C||(i.loop&&T.fixLoop(),I=T.getWrapperTranslate(),T.setWrapperTransition(0),T.animating&&T.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"),T.params.autoplay&&T.autoplaying&&(T.params.autoplayDisableOnInteraction?T.stopAutoplay():T.pauseAutoplay()),D=!1,!T.params.grabCursor||T.params.allowSwipeToNext!==!0&&T.params.allowSwipeToPrev!==!0||T.setGrabCursor(!0)),C=!0;var s=T.touches.diff=T.isHorizontal()?T.touches.currentX-T.touches.startX:T.touches.currentY-T.touches.startY;s*=T.params.touchRatio,T.rtl&&(s=-s),T.swipeDirection=s>0?"prev":"next",P=s+I;var r=!0;if(s>0&&P>T.minTranslate()?(r=!1,T.params.resistance&&(P=T.minTranslate()-1+Math.pow(-T.minTranslate()+I+s,T.params.resistanceRatio))):s<0&&P<T.maxTranslate()&&(r=!1,T.params.resistance&&(P=T.maxTranslate()+1-Math.pow(T.maxTranslate()-I-s,T.params.resistanceRatio))),r&&(a.preventedByNestedSwiper=!0),!T.params.allowSwipeToNext&&"next"===T.swipeDirection&&P<I&&(P=I),!T.params.allowSwipeToPrev&&"prev"===T.swipeDirection&&P>I&&(P=I),T.params.threshold>0){if(!(Math.abs(s)>T.params.threshold||k))return void(P=I);if(!k)return k=!0,T.touches.startX=T.touches.currentX,T.touches.startY=T.touches.currentY,P=I,void(T.touches.diff=T.isHorizontal()?T.touches.currentX-T.touches.startX:T.touches.currentY-T.touches.startY)}T.params.followFinger&&((T.params.freeMode||T.params.watchSlidesProgress)&&T.updateActiveIndex(),T.params.freeMode&&(0===G.length&&G.push({position:T.touches[T.isHorizontal()?"startX":"startY"],time:M}),G.push({position:T.touches[T.isHorizontal()?"currentX":"currentY"],time:(new window.Date).getTime()})),T.updateProgress(P),T.setWrapperTranslate(P))}}}}},T.onTouchEnd=function(a){if(a.originalEvent&&(a=a.originalEvent),z&&T.emit("onTouchEnd",T,a),z=!1,S){T.params.grabCursor&&C&&S&&(T.params.allowSwipeToNext===!0||T.params.allowSwipeToPrev===!0)&&T.setGrabCursor(!1);var t=Date.now(),s=t-M;if(T.allowClick&&(T.updateClickedSlide(a),T.emit("onTap",T,a),s<300&&t-H>300&&(L&&clearTimeout(L),L=setTimeout(function(){T&&(T.params.paginationHide&&T.paginationContainer.length>0&&!e(a.target).hasClass(T.params.bulletClass)&&T.paginationContainer.toggleClass(T.params.paginationHiddenClass),T.emit("onClick",T,a))},300)),s<300&&t-H<300&&(L&&clearTimeout(L),T.emit("onDoubleTap",T,a))),H=Date.now(),setTimeout(function(){T&&(T.allowClick=!0)},0),!S||!C||!T.swipeDirection||0===T.touches.diff||P===I)return void(S=C=!1);S=C=!1;var i;if(i=T.params.followFinger?T.rtl?T.translate:-T.translate:-P,T.params.freeMode){if(i<-T.minTranslate())return void T.slideTo(T.activeIndex);if(i>-T.maxTranslate())return void(T.slides.length<T.snapGrid.length?T.slideTo(T.snapGrid.length-1):T.slideTo(T.slides.length-1));if(T.params.freeModeMomentum){if(G.length>1){var r=G.pop(),n=G.pop(),o=r.position-n.position,l=r.time-n.time;T.velocity=o/l,T.velocity=T.velocity/2,Math.abs(T.velocity)<T.params.freeModeMinimumVelocity&&(T.velocity=0),(l>150||(new window.Date).getTime()-r.time>300)&&(T.velocity=0)}else T.velocity=0;T.velocity=T.velocity*T.params.freeModeMomentumVelocityRatio,G.length=0;var p=1e3*T.params.freeModeMomentumRatio,d=T.velocity*p,u=T.translate+d;T.rtl&&(u=-u);var c,m=!1,h=20*Math.abs(T.velocity)*T.params.freeModeMomentumBounceRatio;if(u<T.maxTranslate())T.params.freeModeMomentumBounce?(u+T.maxTranslate()<-h&&(u=T.maxTranslate()-h),c=T.maxTranslate(),m=!0,D=!0):u=T.maxTranslate();else if(u>T.minTranslate())T.params.freeModeMomentumBounce?(u-T.minTranslate()>h&&(u=T.minTranslate()+h),c=T.minTranslate(),m=!0,D=!0):u=T.minTranslate();else if(T.params.freeModeSticky){var g,f=0;for(f=0;f<T.snapGrid.length;f+=1)if(T.snapGrid[f]>-u){g=f;break}u=Math.abs(T.snapGrid[g]-u)<Math.abs(T.snapGrid[g-1]-u)||"next"===T.swipeDirection?T.snapGrid[g]:T.snapGrid[g-1],T.rtl||(u=-u)}if(0!==T.velocity)p=T.rtl?Math.abs((-u-T.translate)/T.velocity):Math.abs((u-T.translate)/T.velocity);else if(T.params.freeModeSticky)return void T.slideReset();T.params.freeModeMomentumBounce&&m?(T.updateProgress(c),T.setWrapperTransition(p),T.setWrapperTranslate(u),T.onTransitionStart(),T.animating=!0,T.wrapper.transitionEnd(function(){T&&D&&(T.emit("onMomentumBounce",T),T.setWrapperTransition(T.params.speed),T.setWrapperTranslate(c),T.wrapper.transitionEnd(function(){T&&T.onTransitionEnd()}))})):T.velocity?(T.updateProgress(u),T.setWrapperTransition(p),T.setWrapperTranslate(u),T.onTransitionStart(),T.animating||(T.animating=!0,T.wrapper.transitionEnd(function(){T&&T.onTransitionEnd()}))):T.updateProgress(u),T.updateActiveIndex()}return void((!T.params.freeModeMomentum||s>=T.params.longSwipesMs)&&(T.updateProgress(),T.updateActiveIndex()))}var v,w=0,y=T.slidesSizesGrid[0];for(v=0;v<T.slidesGrid.length;v+=T.params.slidesPerGroup)void 0!==T.slidesGrid[v+T.params.slidesPerGroup]?i>=T.slidesGrid[v]&&i<T.slidesGrid[v+T.params.slidesPerGroup]&&(w=v,y=T.slidesGrid[v+T.params.slidesPerGroup]-T.slidesGrid[v]):i>=T.slidesGrid[v]&&(w=v,y=T.slidesGrid[T.slidesGrid.length-1]-T.slidesGrid[T.slidesGrid.length-2]);var x=(i-T.slidesGrid[w])/y;if(s>T.params.longSwipesMs){if(!T.params.longSwipes)return void T.slideTo(T.activeIndex);"next"===T.swipeDirection&&(x>=T.params.longSwipesRatio?T.slideTo(w+T.params.slidesPerGroup):T.slideTo(w)),"prev"===T.swipeDirection&&(x>1-T.params.longSwipesRatio?T.slideTo(w+T.params.slidesPerGroup):T.slideTo(w))}else{if(!T.params.shortSwipes)return void T.slideTo(T.activeIndex);"next"===T.swipeDirection&&T.slideTo(w+T.params.slidesPerGroup),"prev"===T.swipeDirection&&T.slideTo(w)}}},T._slideTo=function(e,a){return T.slideTo(e,a,!0,!0)},T.slideTo=function(e,a,t,s){void 0===t&&(t=!0),void 0===e&&(e=0),e<0&&(e=0),T.snapIndex=Math.floor(e/T.params.slidesPerGroup),T.snapIndex>=T.snapGrid.length&&(T.snapIndex=T.snapGrid.length-1);var i=-T.snapGrid[T.snapIndex];if(T.params.autoplay&&T.autoplaying&&(s||!T.params.autoplayDisableOnInteraction?T.pauseAutoplay(a):T.stopAutoplay()),T.updateProgress(i),T.params.normalizeSlideIndex)for(var r=0;r<T.slidesGrid.length;r++)-Math.floor(100*i)>=Math.floor(100*T.slidesGrid[r])&&(e=r);return!(!T.params.allowSwipeToNext&&i<T.translate&&i<T.minTranslate())&&(!(!T.params.allowSwipeToPrev&&i>T.translate&&i>T.maxTranslate()&&(T.activeIndex||0)!==e)&&(void 0===a&&(a=T.params.speed),T.previousIndex=T.activeIndex||0,T.activeIndex=e,T.updateRealIndex(),T.rtl&&-i===T.translate||!T.rtl&&i===T.translate?(T.params.autoHeight&&T.updateAutoHeight(),T.updateClasses(),"slide"!==T.params.effect&&T.setWrapperTranslate(i),!1):(T.updateClasses(),T.onTransitionStart(t),0===a||T.browser.lteIE9?(T.setWrapperTranslate(i),T.setWrapperTransition(0),T.onTransitionEnd(t)):(T.setWrapperTranslate(i),T.setWrapperTransition(a),T.animating||(T.animating=!0,T.wrapper.transitionEnd(function(){T&&T.onTransitionEnd(t)}))),!0)))},T.onTransitionStart=function(e){void 0===e&&(e=!0),T.params.autoHeight&&T.updateAutoHeight(),T.lazy&&T.lazy.onTransitionStart(),e&&(T.emit("onTransitionStart",T),T.activeIndex!==T.previousIndex&&(T.emit("onSlideChangeStart",T),T.activeIndex>T.previousIndex?T.emit("onSlideNextStart",T):T.emit("onSlidePrevStart",T)))},T.onTransitionEnd=function(e){T.animating=!1,T.setWrapperTransition(0),void 0===e&&(e=!0),T.lazy&&T.lazy.onTransitionEnd(),e&&(T.emit("onTransitionEnd",T),T.activeIndex!==T.previousIndex&&(T.emit("onSlideChangeEnd",T),T.activeIndex>T.previousIndex?T.emit("onSlideNextEnd",T):T.emit("onSlidePrevEnd",T))),T.params.history&&T.history&&T.history.setHistory(T.params.history,T.activeIndex),T.params.hashnav&&T.hashnav&&T.hashnav.setHash()},T.slideNext=function(e,a,t){if(T.params.loop){if(T.animating)return!1;T.fixLoop();T.container[0].clientLeft;return T.slideTo(T.activeIndex+T.params.slidesPerGroup,a,e,t)}return T.slideTo(T.activeIndex+T.params.slidesPerGroup,a,e,t)},T._slideNext=function(e){return T.slideNext(!0,e,!0)},T.slidePrev=function(e,a,t){if(T.params.loop){if(T.animating)return!1;T.fixLoop();T.container[0].clientLeft;return T.slideTo(T.activeIndex-1,a,e,t)}return T.slideTo(T.activeIndex-1,a,e,t)},T._slidePrev=function(e){return T.slidePrev(!0,e,!0)},T.slideReset=function(e,a,t){return T.slideTo(T.activeIndex,a,e)},T.disableTouchControl=function(){return T.params.onlyExternal=!0,!0},T.enableTouchControl=function(){return T.params.onlyExternal=!1,!0},T.setWrapperTransition=function(e,a){T.wrapper.transition(e),"slide"!==T.params.effect&&T.effects[T.params.effect]&&T.effects[T.params.effect].setTransition(e),T.params.parallax&&T.parallax&&T.parallax.setTransition(e),T.params.scrollbar&&T.scrollbar&&T.scrollbar.setTransition(e),T.params.control&&T.controller&&T.controller.setTransition(e,a),T.emit("onSetTransition",T,e)},T.setWrapperTranslate=function(e,a,t){var s=0,i=0;T.isHorizontal()?s=T.rtl?-e:e:i=e,T.params.roundLengths&&(s=r(s),i=r(i)),T.params.virtualTranslate||(T.support.transforms3d?T.wrapper.transform("translate3d("+s+"px, "+i+"px, 0px)"):T.wrapper.transform("translate("+s+"px, "+i+"px)")),T.translate=T.isHorizontal()?s:i;var n,o=T.maxTranslate()-T.minTranslate();n=0===o?0:(e-T.minTranslate())/o,n!==T.progress&&T.updateProgress(e),a&&T.updateActiveIndex(),"slide"!==T.params.effect&&T.effects[T.params.effect]&&T.effects[T.params.effect].setTranslate(T.translate),T.params.parallax&&T.parallax&&T.parallax.setTranslate(T.translate),T.params.scrollbar&&T.scrollbar&&T.scrollbar.setTranslate(T.translate),T.params.control&&T.controller&&T.controller.setTranslate(T.translate,t),T.emit("onSetTranslate",T,T.translate)},T.getTranslate=function(e,a){var t,s,i,r;return void 0===a&&(a="x"),T.params.virtualTranslate?T.rtl?-T.translate:T.translate:(i=window.getComputedStyle(e,null),window.WebKitCSSMatrix?(s=i.transform||i.webkitTransform,s.split(",").length>6&&(s=s.split(", ").map(function(e){return e.replace(",",".")}).join(", ")),r=new window.WebKitCSSMatrix("none"===s?"":s)):(r=i.MozTransform||i.OTransform||i.MsTransform||i.msTransform||i.transform||i.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),t=r.toString().split(",")),"x"===a&&(s=window.WebKitCSSMatrix?r.m41:16===t.length?parseFloat(t[12]):parseFloat(t[4])),"y"===a&&(s=window.WebKitCSSMatrix?r.m42:16===t.length?parseFloat(t[13]):parseFloat(t[5])),T.rtl&&s&&(s=-s),s||0)},T.getWrapperTranslate=function(e){return void 0===e&&(e=T.isHorizontal()?"x":"y"),T.getTranslate(T.wrapper[0],e)},T.observers=[],T.initObservers=function(){if(T.params.observeParents)for(var e=T.container.parents(),a=0;a<e.length;a++)l(e[a]);l(T.container[0],{childList:!1}),l(T.wrapper[0],{attributes:!1})},T.disconnectObservers=function(){for(var e=0;e<T.observers.length;e++)T.observers[e].disconnect();T.observers=[]},T.createLoop=function(){T.wrapper.children("."+T.params.slideClass+"."+T.params.slideDuplicateClass).remove();var a=T.wrapper.children("."+T.params.slideClass);"auto"!==T.params.slidesPerView||T.params.loopedSlides||(T.params.loopedSlides=a.length),T.loopedSlides=parseInt(T.params.loopedSlides||T.params.slidesPerView,10),T.loopedSlides=T.loopedSlides+T.params.loopAdditionalSlides,T.loopedSlides>a.length&&(T.loopedSlides=a.length);var t,s=[],i=[];for(a.each(function(t,r){var n=e(this);t<T.loopedSlides&&i.push(r),t<a.length&&t>=a.length-T.loopedSlides&&s.push(r),n.attr("data-swiper-slide-index",t)}),t=0;t<i.length;t++)T.wrapper.append(e(i[t].cloneNode(!0)).addClass(T.params.slideDuplicateClass));for(t=s.length-1;t>=0;t--)T.wrapper.prepend(e(s[t].cloneNode(!0)).addClass(T.params.slideDuplicateClass))},T.destroyLoop=function(){T.wrapper.children("."+T.params.slideClass+"."+T.params.slideDuplicateClass).remove(),T.slides.removeAttr("data-swiper-slide-index")},T.reLoop=function(e){var a=T.activeIndex-T.loopedSlides;T.destroyLoop(),T.createLoop(),T.updateSlidesSize(),e&&T.slideTo(a+T.loopedSlides,0,!1)},T.fixLoop=function(){var e;T.activeIndex<T.loopedSlides?(e=T.slides.length-3*T.loopedSlides+T.activeIndex,e+=T.loopedSlides,T.slideTo(e,0,!1,!0)):("auto"===T.params.slidesPerView&&T.activeIndex>=2*T.loopedSlides||T.activeIndex>T.slides.length-2*T.params.slidesPerView)&&(e=-T.slides.length+T.activeIndex+T.loopedSlides,e+=T.loopedSlides,T.slideTo(e,0,!1,!0))},T.appendSlide=function(e){if(T.params.loop&&T.destroyLoop(),"object"==typeof e&&e.length)for(var a=0;a<e.length;a++)e[a]&&T.wrapper.append(e[a]);else T.wrapper.append(e);T.params.loop&&T.createLoop(),T.params.observer&&T.support.observer||T.update(!0)},T.prependSlide=function(e){T.params.loop&&T.destroyLoop();var a=T.activeIndex+1;if("object"==typeof e&&e.length){for(var t=0;t<e.length;t++)e[t]&&T.wrapper.prepend(e[t]);a=T.activeIndex+e.length}else T.wrapper.prepend(e);T.params.loop&&T.createLoop(),T.params.observer&&T.support.observer||T.update(!0),T.slideTo(a,0,!1)},T.removeSlide=function(e){T.params.loop&&(T.destroyLoop(),T.slides=T.wrapper.children("."+T.params.slideClass));var a,t=T.activeIndex;if("object"==typeof e&&e.length){for(var s=0;s<e.length;s++)a=e[s],T.slides[a]&&T.slides.eq(a).remove(),a<t&&t--;t=Math.max(t,0)}else a=e,T.slides[a]&&T.slides.eq(a).remove(),a<t&&t--,t=Math.max(t,0);T.params.loop&&T.createLoop(),T.params.observer&&T.support.observer||T.update(!0),T.params.loop?T.slideTo(t+T.loopedSlides,0,!1):T.slideTo(t,0,!1)},T.removeAllSlides=function(){for(var e=[],a=0;a<T.slides.length;a++)e.push(a);T.removeSlide(e)},T.effects={fade:{setTranslate:function(){for(var e=0;e<T.slides.length;e++){var a=T.slides.eq(e),t=a[0].swiperSlideOffset,s=-t;T.params.virtualTranslate||(s-=T.translate);var i=0;T.isHorizontal()||(i=s,s=0);var r=T.params.fade.crossFade?Math.max(1-Math.abs(a[0].progress),0):1+Math.min(Math.max(a[0].progress,-1),0);a.css({opacity:r}).transform("translate3d("+s+"px, "+i+"px, 0px)")}},setTransition:function(e){if(T.slides.transition(e),T.params.virtualTranslate&&0!==e){var a=!1;T.slides.transitionEnd(function(){if(!a&&T){a=!0,T.animating=!1;for(var e=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],t=0;t<e.length;t++)T.wrapper.trigger(e[t])}})}}},flip:{setTranslate:function(){for(var a=0;a<T.slides.length;a++){var t=T.slides.eq(a),s=t[0].progress;T.params.flip.limitRotation&&(s=Math.max(Math.min(t[0].progress,1),-1));var i=t[0].swiperSlideOffset,r=-180*s,n=r,o=0,l=-i,p=0;if(T.isHorizontal()?T.rtl&&(n=-n):(p=l,l=0,o=-n,n=0),t[0].style.zIndex=-Math.abs(Math.round(s))+T.slides.length,T.params.flip.slideShadows){var d=T.isHorizontal()?t.find(".swiper-slide-shadow-left"):t.find(".swiper-slide-shadow-top"),u=T.isHorizontal()?t.find(".swiper-slide-shadow-right"):t.find(".swiper-slide-shadow-bottom");0===d.length&&(d=e('<div class="swiper-slide-shadow-'+(T.isHorizontal()?"left":"top")+'"></div>'),t.append(d)),0===u.length&&(u=e('<div class="swiper-slide-shadow-'+(T.isHorizontal()?"right":"bottom")+'"></div>'),t.append(u)),d.length&&(d[0].style.opacity=Math.max(-s,0)),u.length&&(u[0].style.opacity=Math.max(s,0))}t.transform("translate3d("+l+"px, "+p+"px, 0px) rotateX("+o+"deg) rotateY("+n+"deg)")}},setTransition:function(a){if(T.slides.transition(a).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(a),T.params.virtualTranslate&&0!==a){var t=!1;T.slides.eq(T.activeIndex).transitionEnd(function(){if(!t&&T&&e(this).hasClass(T.params.slideActiveClass)){t=!0,T.animating=!1;for(var a=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],s=0;s<a.length;s++)T.wrapper.trigger(a[s])}})}}},cube:{setTranslate:function(){var a,t=0;T.params.cube.shadow&&(T.isHorizontal()?(a=T.wrapper.find(".swiper-cube-shadow"),0===a.length&&(a=e('<div class="swiper-cube-shadow"></div>'),T.wrapper.append(a)),a.css({height:T.width+"px"})):(a=T.container.find(".swiper-cube-shadow"),0===a.length&&(a=e('<div class="swiper-cube-shadow"></div>'),T.container.append(a))));for(var s=0;s<T.slides.length;s++){var i=T.slides.eq(s),r=90*s,n=Math.floor(r/360);T.rtl&&(r=-r,n=Math.floor(-r/360));var o=Math.max(Math.min(i[0].progress,1),-1),l=0,p=0,d=0;s%4==0?(l=4*-n*T.size,d=0):(s-1)%4==0?(l=0,d=4*-n*T.size):(s-2)%4==0?(l=T.size+4*n*T.size,d=T.size):(s-3)%4==0&&(l=-T.size,d=3*T.size+4*T.size*n),T.rtl&&(l=-l),T.isHorizontal()||(p=l,l=0);var u="rotateX("+(T.isHorizontal()?0:-r)+"deg) rotateY("+(T.isHorizontal()?r:0)+"deg) translate3d("+l+"px, "+p+"px, "+d+"px)";if(o<=1&&o>-1&&(t=90*s+90*o,T.rtl&&(t=90*-s-90*o)),i.transform(u),T.params.cube.slideShadows){var c=T.isHorizontal()?i.find(".swiper-slide-shadow-left"):i.find(".swiper-slide-shadow-top"),m=T.isHorizontal()?i.find(".swiper-slide-shadow-right"):i.find(".swiper-slide-shadow-bottom");0===c.length&&(c=e('<div class="swiper-slide-shadow-'+(T.isHorizontal()?"left":"top")+'"></div>'),i.append(c)),0===m.length&&(m=e('<div class="swiper-slide-shadow-'+(T.isHorizontal()?"right":"bottom")+'"></div>'),i.append(m)),c.length&&(c[0].style.opacity=Math.max(-o,0)),m.length&&(m[0].style.opacity=Math.max(o,0))}}if(T.wrapper.css({"-webkit-transform-origin":"50% 50% -"+T.size/2+"px","-moz-transform-origin":"50% 50% -"+T.size/2+"px","-ms-transform-origin":"50% 50% -"+T.size/2+"px","transform-origin":"50% 50% -"+T.size/2+"px"}),T.params.cube.shadow)if(T.isHorizontal())a.transform("translate3d(0px, "+(T.width/2+T.params.cube.shadowOffset)+"px, "+-T.width/2+"px) rotateX(90deg) rotateZ(0deg) scale("+T.params.cube.shadowScale+")");else{var h=Math.abs(t)-90*Math.floor(Math.abs(t)/90),g=1.5-(Math.sin(2*h*Math.PI/360)/2+Math.cos(2*h*Math.PI/360)/2),f=T.params.cube.shadowScale,v=T.params.cube.shadowScale/g,w=T.params.cube.shadowOffset;a.transform("scale3d("+f+", 1, "+v+") translate3d(0px, "+(T.height/2+w)+"px, "+-T.height/2/v+"px) rotateX(-90deg)")}var y=T.isSafari||T.isUiWebView?-T.size/2:0;T.wrapper.transform("translate3d(0px,0,"+y+"px) rotateX("+(T.isHorizontal()?0:t)+"deg) rotateY("+(T.isHorizontal()?-t:0)+"deg)")},setTransition:function(e){T.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),T.params.cube.shadow&&!T.isHorizontal()&&T.container.find(".swiper-cube-shadow").transition(e)}},coverflow:{setTranslate:function(){for(var a=T.translate,t=T.isHorizontal()?-a+T.width/2:-a+T.height/2,s=T.isHorizontal()?T.params.coverflow.rotate:-T.params.coverflow.rotate,i=T.params.coverflow.depth,r=0,n=T.slides.length;r<n;r++){var o=T.slides.eq(r),l=T.slidesSizesGrid[r],p=o[0].swiperSlideOffset,d=(t-p-l/2)/l*T.params.coverflow.modifier,u=T.isHorizontal()?s*d:0,c=T.isHorizontal()?0:s*d,m=-i*Math.abs(d),h=T.isHorizontal()?0:T.params.coverflow.stretch*d,g=T.isHorizontal()?T.params.coverflow.stretch*d:0;Math.abs(g)<.001&&(g=0),Math.abs(h)<.001&&(h=0),Math.abs(m)<.001&&(m=0),Math.abs(u)<.001&&(u=0),Math.abs(c)<.001&&(c=0);var f="translate3d("+g+"px,"+h+"px,"+m+"px)  rotateX("+c+"deg) rotateY("+u+"deg)";if(o.transform(f),o[0].style.zIndex=1-Math.abs(Math.round(d)),T.params.coverflow.slideShadows){var v=T.isHorizontal()?o.find(".swiper-slide-shadow-left"):o.find(".swiper-slide-shadow-top"),w=T.isHorizontal()?o.find(".swiper-slide-shadow-right"):o.find(".swiper-slide-shadow-bottom");0===v.length&&(v=e('<div class="swiper-slide-shadow-'+(T.isHorizontal()?"left":"top")+'"></div>'),o.append(v)),0===w.length&&(w=e('<div class="swiper-slide-shadow-'+(T.isHorizontal()?"right":"bottom")+'"></div>'),o.append(w)),v.length&&(v[0].style.opacity=d>0?d:0),w.length&&(w[0].style.opacity=-d>0?-d:0)}}if(T.browser.ie){T.wrapper[0].style.perspectiveOrigin=t+"px 50%"}},setTransition:function(e){T.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)}}},T.lazy={initialImageLoaded:!1,loadImageInSlide:function(a,t){if(void 0!==a&&(void 0===t&&(t=!0),0!==T.slides.length)){var s=T.slides.eq(a),i=s.find("."+T.params.lazyLoadingClass+":not(."+T.params.lazyStatusLoadedClass+"):not(."+T.params.lazyStatusLoadingClass+")");!s.hasClass(T.params.lazyLoadingClass)||s.hasClass(T.params.lazyStatusLoadedClass)||s.hasClass(T.params.lazyStatusLoadingClass)||(i=i.add(s[0])),0!==i.length&&i.each(function(){var a=e(this);a.addClass(T.params.lazyStatusLoadingClass);var i=a.attr("data-background"),r=a.attr("data-src"),n=a.attr("data-srcset"),o=a.attr("data-sizes");T.loadImage(a[0],r||i,n,o,!1,function(){if(void 0!==T&&null!==T&&T){if(i?(a.css("background-image",'url("'+i+'")'),a.removeAttr("data-background")):(n&&(a.attr("srcset",n),a.removeAttr("data-srcset")),o&&(a.attr("sizes",o),a.removeAttr("data-sizes")),r&&(a.attr("src",r),a.removeAttr("data-src"))),a.addClass(T.params.lazyStatusLoadedClass).removeClass(T.params.lazyStatusLoadingClass),s.find("."+T.params.lazyPreloaderClass+", ."+T.params.preloaderClass).remove(),T.params.loop&&t){var e=s.attr("data-swiper-slide-index");if(s.hasClass(T.params.slideDuplicateClass)){var l=T.wrapper.children('[data-swiper-slide-index="'+e+'"]:not(.'+T.params.slideDuplicateClass+")");T.lazy.loadImageInSlide(l.index(),!1)}else{var p=T.wrapper.children("."+T.params.slideDuplicateClass+'[data-swiper-slide-index="'+e+'"]');T.lazy.loadImageInSlide(p.index(),!1)}}T.emit("onLazyImageReady",T,s[0],a[0])}}),T.emit("onLazyImageLoad",T,s[0],a[0])})}},load:function(){var a,t=T.params.slidesPerView;if("auto"===t&&(t=0),T.lazy.initialImageLoaded||(T.lazy.initialImageLoaded=!0),T.params.watchSlidesVisibility)T.wrapper.children("."+T.params.slideVisibleClass).each(function(){T.lazy.loadImageInSlide(e(this).index())});else if(t>1)for(a=T.activeIndex;a<T.activeIndex+t;a++)T.slides[a]&&T.lazy.loadImageInSlide(a);else T.lazy.loadImageInSlide(T.activeIndex);if(T.params.lazyLoadingInPrevNext)if(t>1||T.params.lazyLoadingInPrevNextAmount&&T.params.lazyLoadingInPrevNextAmount>1){var s=T.params.lazyLoadingInPrevNextAmount,i=t,r=Math.min(T.activeIndex+i+Math.max(s,i),T.slides.length),n=Math.max(T.activeIndex-Math.max(i,s),0);for(a=T.activeIndex+t;a<r;a++)T.slides[a]&&T.lazy.loadImageInSlide(a);for(a=n;a<T.activeIndex;a++)T.slides[a]&&T.lazy.loadImageInSlide(a)}else{var o=T.wrapper.children("."+T.params.slideNextClass);o.length>0&&T.lazy.loadImageInSlide(o.index());var l=T.wrapper.children("."+T.params.slidePrevClass);l.length>0&&T.lazy.loadImageInSlide(l.index())}},onTransitionStart:function(){T.params.lazyLoading&&(T.params.lazyLoadingOnTransitionStart||!T.params.lazyLoadingOnTransitionStart&&!T.lazy.initialImageLoaded)&&T.lazy.load()},onTransitionEnd:function(){T.params.lazyLoading&&!T.params.lazyLoadingOnTransitionStart&&T.lazy.load()}},T.scrollbar={isTouched:!1,setDragPosition:function(e){var a=T.scrollbar,t=T.isHorizontal()?"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].pageX:e.pageX||e.clientX:"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].pageY:e.pageY||e.clientY,s=t-a.track.offset()[T.isHorizontal()?"left":"top"]-a.dragSize/2,i=-T.minTranslate()*a.moveDivider,r=-T.maxTranslate()*a.moveDivider;s<i?s=i:s>r&&(s=r),s=-s/a.moveDivider,T.updateProgress(s),T.setWrapperTranslate(s,!0)},dragStart:function(e){var a=T.scrollbar;a.isTouched=!0,e.preventDefault(),e.stopPropagation(),a.setDragPosition(e),clearTimeout(a.dragTimeout),a.track.transition(0),T.params.scrollbarHide&&a.track.css("opacity",1),T.wrapper.transition(100),a.drag.transition(100),T.emit("onScrollbarDragStart",T)},dragMove:function(e){var a=T.scrollbar;a.isTouched&&(e.preventDefault?e.preventDefault():e.returnValue=!1,a.setDragPosition(e),T.wrapper.transition(0),a.track.transition(0),a.drag.transition(0),T.emit("onScrollbarDragMove",T))},dragEnd:function(e){var a=T.scrollbar;a.isTouched&&(a.isTouched=!1,T.params.scrollbarHide&&(clearTimeout(a.dragTimeout),a.dragTimeout=setTimeout(function(){a.track.css("opacity",0),a.track.transition(400)},1e3)),T.emit("onScrollbarDragEnd",T),T.params.scrollbarSnapOnRelease&&T.slideReset())},draggableEvents:function(){return T.params.simulateTouch!==!1||T.support.touch?T.touchEvents:T.touchEventsDesktop}(),enableDraggable:function(){var a=T.scrollbar,t=T.support.touch?a.track:document;e(a.track).on(a.draggableEvents.start,a.dragStart),e(t).on(a.draggableEvents.move,a.dragMove),e(t).on(a.draggableEvents.end,a.dragEnd)},disableDraggable:function(){var a=T.scrollbar,t=T.support.touch?a.track:document;e(a.track).off(a.draggableEvents.start,a.dragStart),e(t).off(a.draggableEvents.move,a.dragMove),e(t).off(a.draggableEvents.end,a.dragEnd)},set:function(){if(T.params.scrollbar){var a=T.scrollbar;a.track=e(T.params.scrollbar),T.params.uniqueNavElements&&"string"==typeof T.params.scrollbar&&a.track.length>1&&1===T.container.find(T.params.scrollbar).length&&(a.track=T.container.find(T.params.scrollbar)),a.drag=a.track.find(".swiper-scrollbar-drag"),0===a.drag.length&&(a.drag=e('<div class="swiper-scrollbar-drag"></div>'),a.track.append(a.drag)),a.drag[0].style.width="",a.drag[0].style.height="",a.trackSize=T.isHorizontal()?a.track[0].offsetWidth:a.track[0].offsetHeight,a.divider=T.size/T.virtualSize,a.moveDivider=a.divider*(a.trackSize/T.size),a.dragSize=a.trackSize*a.divider,T.isHorizontal()?a.drag[0].style.width=a.dragSize+"px":a.drag[0].style.height=a.dragSize+"px",a.divider>=1?a.track[0].style.display="none":a.track[0].style.display="",T.params.scrollbarHide&&(a.track[0].style.opacity=0)}},setTranslate:function(){if(T.params.scrollbar){var e,a=T.scrollbar,t=(T.translate,a.dragSize);e=(a.trackSize-a.dragSize)*T.progress,T.rtl&&T.isHorizontal()?(e=-e,e>0?(t=a.dragSize-e,e=0):-e+a.dragSize>a.trackSize&&(t=a.trackSize+e)):e<0?(t=a.dragSize+e,e=0):e+a.dragSize>a.trackSize&&(t=a.trackSize-e),T.isHorizontal()?(T.support.transforms3d?a.drag.transform("translate3d("+e+"px, 0, 0)"):a.drag.transform("translateX("+e+"px)"),a.drag[0].style.width=t+"px"):(T.support.transforms3d?a.drag.transform("translate3d(0px, "+e+"px, 0)"):a.drag.transform("translateY("+e+"px)"),a.drag[0].style.height=t+"px"),T.params.scrollbarHide&&(clearTimeout(a.timeout),a.track[0].style.opacity=1,a.timeout=setTimeout(function(){a.track[0].style.opacity=0,a.track.transition(400)},1e3))}},setTransition:function(e){T.params.scrollbar&&T.scrollbar.drag.transition(e)}},T.controller={LinearSpline:function(e,a){var t=function(){var e,a,t;return function(s,i){for(a=-1,e=s.length;e-a>1;)s[t=e+a>>1]<=i?a=t:e=t;return e}}();this.x=e,this.y=a,this.lastIndex=e.length-1;var s,i;this.x.length;this.interpolate=function(e){return e?(i=t(this.x,e),s=i-1,(e-this.x[s])*(this.y[i]-this.y[s])/(this.x[i]-this.x[s])+this.y[s]):0}},getInterpolateFunction:function(e){T.controller.spline||(T.controller.spline=T.params.loop?new T.controller.LinearSpline(T.slidesGrid,e.slidesGrid):new T.controller.LinearSpline(T.snapGrid,e.snapGrid))},setTranslate:function(e,t){function s(a){e=a.rtl&&"horizontal"===a.params.direction?-T.translate:T.translate,"slide"===T.params.controlBy&&(T.controller.getInterpolateFunction(a),r=-T.controller.spline.interpolate(-e)),r&&"container"!==T.params.controlBy||(i=(a.maxTranslate()-a.minTranslate())/(T.maxTranslate()-T.minTranslate()),r=(e-T.minTranslate())*i+a.minTranslate()),T.params.controlInverse&&(r=a.maxTranslate()-r),a.updateProgress(r),a.setWrapperTranslate(r,!1,T),a.updateActiveIndex()}var i,r,n=T.params.control;if(Array.isArray(n))for(var o=0;o<n.length;o++)n[o]!==t&&n[o]instanceof a&&s(n[o]);else n instanceof a&&t!==n&&s(n)},setTransition:function(e,t){function s(a){a.setWrapperTransition(e,T),0!==e&&(a.onTransitionStart(),a.wrapper.transitionEnd(function(){r&&(a.params.loop&&"slide"===T.params.controlBy&&a.fixLoop(),a.onTransitionEnd())}))}var i,r=T.params.control;if(Array.isArray(r))for(i=0;i<r.length;i++)r[i]!==t&&r[i]instanceof a&&s(r[i]);else r instanceof a&&t!==r&&s(r)}},T.hashnav={onHashCange:function(e,a){var t=document.location.hash.replace("#","");t!==T.slides.eq(T.activeIndex).attr("data-hash")&&T.slideTo(T.wrapper.children("."+T.params.slideClass+'[data-hash="'+t+'"]').index())},attachEvents:function(a){var t=a?"off":"on";e(window)[t]("hashchange",T.hashnav.onHashCange)},setHash:function(){
	if(T.hashnav.initialized&&T.params.hashnav)if(T.params.replaceState&&window.history&&window.history.replaceState)window.history.replaceState(null,null,"#"+T.slides.eq(T.activeIndex).attr("data-hash")||"");else{var e=T.slides.eq(T.activeIndex),a=e.attr("data-hash")||e.attr("data-history");document.location.hash=a||""}},init:function(){if(T.params.hashnav&&!T.params.history){T.hashnav.initialized=!0;var e=document.location.hash.replace("#","");if(e)for(var a=0,t=T.slides.length;a<t;a++){var s=T.slides.eq(a),i=s.attr("data-hash")||s.attr("data-history");if(i===e&&!s.hasClass(T.params.slideDuplicateClass)){var r=s.index();T.slideTo(r,0,T.params.runCallbacksOnInit,!0)}}T.params.hashnavWatchState&&T.hashnav.attachEvents()}},destroy:function(){T.params.hashnavWatchState&&T.hashnav.attachEvents(!0)}},T.history={init:function(){if(T.params.history){if(!window.history||!window.history.pushState)return T.params.history=!1,void(T.params.hashnav=!0);T.history.initialized=!0,this.paths=this.getPathValues(),(this.paths.key||this.paths.value)&&(this.scrollToSlide(0,this.paths.value,T.params.runCallbacksOnInit),T.params.replaceState||window.addEventListener("popstate",this.setHistoryPopState))}},setHistoryPopState:function(){T.history.paths=T.history.getPathValues(),T.history.scrollToSlide(T.params.speed,T.history.paths.value,!1)},getPathValues:function(){var e=window.location.pathname.slice(1).split("/"),a=e.length;return{key:e[a-2],value:e[a-1]}},setHistory:function(e,a){if(T.history.initialized&&T.params.history){var t=T.slides.eq(a),s=this.slugify(t.attr("data-history"));window.location.pathname.includes(e)||(s=e+"/"+s),T.params.replaceState?window.history.replaceState(null,null,s):window.history.pushState(null,null,s)}},slugify:function(e){return e.toString().toLowerCase().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").replace(/^-+/,"").replace(/-+$/,"")},scrollToSlide:function(e,a,t){if(a)for(var s=0,i=T.slides.length;s<i;s++){var r=T.slides.eq(s),n=this.slugify(r.attr("data-history"));if(n===a&&!r.hasClass(T.params.slideDuplicateClass)){var o=r.index();T.slideTo(o,e,t)}}else T.slideTo(0,e,t)}},T.disableKeyboardControl=function(){T.params.keyboardControl=!1,e(document).off("keydown",p)},T.enableKeyboardControl=function(){T.params.keyboardControl=!0,e(document).on("keydown",p)},T.mousewheel={event:!1,lastScrollTime:(new window.Date).getTime()},T.params.mousewheelControl&&(T.mousewheel.event=navigator.userAgent.indexOf("firefox")>-1?"DOMMouseScroll":function(){var e="onwheel"in document;if(!e){var a=document.createElement("div");a.setAttribute("onwheel","return;"),e="function"==typeof a.onwheel}return!e&&document.implementation&&document.implementation.hasFeature&&document.implementation.hasFeature("","")!==!0&&(e=document.implementation.hasFeature("Events.wheel","3.0")),e}()?"wheel":"mousewheel"),T.disableMousewheelControl=function(){if(!T.mousewheel.event)return!1;var a=T.container;return"container"!==T.params.mousewheelEventsTarged&&(a=e(T.params.mousewheelEventsTarged)),a.off(T.mousewheel.event,u),T.params.mousewheelControl=!1,!0},T.enableMousewheelControl=function(){if(!T.mousewheel.event)return!1;var a=T.container;return"container"!==T.params.mousewheelEventsTarged&&(a=e(T.params.mousewheelEventsTarged)),a.on(T.mousewheel.event,u),T.params.mousewheelControl=!0,!0},T.parallax={setTranslate:function(){T.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){c(this,T.progress)}),T.slides.each(function(){var a=e(this);a.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){c(this,Math.min(Math.max(a[0].progress,-1),1))})})},setTransition:function(a){void 0===a&&(a=T.params.speed),T.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var t=e(this),s=parseInt(t.attr("data-swiper-parallax-duration"),10)||a;0===a&&(s=0),t.transition(s)})}},T.zoom={scale:1,currentScale:1,isScaling:!1,gesture:{slide:void 0,slideWidth:void 0,slideHeight:void 0,image:void 0,imageWrap:void 0,zoomMax:T.params.zoomMax},image:{isTouched:void 0,isMoved:void 0,currentX:void 0,currentY:void 0,minX:void 0,minY:void 0,maxX:void 0,maxY:void 0,width:void 0,height:void 0,startX:void 0,startY:void 0,touchesStart:{},touchesCurrent:{}},velocity:{x:void 0,y:void 0,prevPositionX:void 0,prevPositionY:void 0,prevTime:void 0},getDistanceBetweenTouches:function(e){if(e.targetTouches.length<2)return 1;var a=e.targetTouches[0].pageX,t=e.targetTouches[0].pageY,s=e.targetTouches[1].pageX,i=e.targetTouches[1].pageY;return Math.sqrt(Math.pow(s-a,2)+Math.pow(i-t,2))},onGestureStart:function(a){var t=T.zoom;if(!T.support.gestures){if("touchstart"!==a.type||"touchstart"===a.type&&a.targetTouches.length<2)return;t.gesture.scaleStart=t.getDistanceBetweenTouches(a)}if(!(t.gesture.slide&&t.gesture.slide.length||(t.gesture.slide=e(this),0===t.gesture.slide.length&&(t.gesture.slide=T.slides.eq(T.activeIndex)),t.gesture.image=t.gesture.slide.find("img, svg, canvas"),t.gesture.imageWrap=t.gesture.image.parent("."+T.params.zoomContainerClass),t.gesture.zoomMax=t.gesture.imageWrap.attr("data-swiper-zoom")||T.params.zoomMax,0!==t.gesture.imageWrap.length)))return void(t.gesture.image=void 0);t.gesture.image.transition(0),t.isScaling=!0},onGestureChange:function(e){var a=T.zoom;if(!T.support.gestures){if("touchmove"!==e.type||"touchmove"===e.type&&e.targetTouches.length<2)return;a.gesture.scaleMove=a.getDistanceBetweenTouches(e)}a.gesture.image&&0!==a.gesture.image.length&&(T.support.gestures?a.scale=e.scale*a.currentScale:a.scale=a.gesture.scaleMove/a.gesture.scaleStart*a.currentScale,a.scale>a.gesture.zoomMax&&(a.scale=a.gesture.zoomMax-1+Math.pow(a.scale-a.gesture.zoomMax+1,.5)),a.scale<T.params.zoomMin&&(a.scale=T.params.zoomMin+1-Math.pow(T.params.zoomMin-a.scale+1,.5)),a.gesture.image.transform("translate3d(0,0,0) scale("+a.scale+")"))},onGestureEnd:function(e){var a=T.zoom;!T.support.gestures&&("touchend"!==e.type||"touchend"===e.type&&e.changedTouches.length<2)||a.gesture.image&&0!==a.gesture.image.length&&(a.scale=Math.max(Math.min(a.scale,a.gesture.zoomMax),T.params.zoomMin),a.gesture.image.transition(T.params.speed).transform("translate3d(0,0,0) scale("+a.scale+")"),a.currentScale=a.scale,a.isScaling=!1,1===a.scale&&(a.gesture.slide=void 0))},onTouchStart:function(e,a){var t=e.zoom;t.gesture.image&&0!==t.gesture.image.length&&(t.image.isTouched||("android"===e.device.os&&a.preventDefault(),t.image.isTouched=!0,t.image.touchesStart.x="touchstart"===a.type?a.targetTouches[0].pageX:a.pageX,t.image.touchesStart.y="touchstart"===a.type?a.targetTouches[0].pageY:a.pageY))},onTouchMove:function(e){var a=T.zoom;if(a.gesture.image&&0!==a.gesture.image.length&&(T.allowClick=!1,a.image.isTouched&&a.gesture.slide)){a.image.isMoved||(a.image.width=a.gesture.image[0].offsetWidth,a.image.height=a.gesture.image[0].offsetHeight,a.image.startX=T.getTranslate(a.gesture.imageWrap[0],"x")||0,a.image.startY=T.getTranslate(a.gesture.imageWrap[0],"y")||0,a.gesture.slideWidth=a.gesture.slide[0].offsetWidth,a.gesture.slideHeight=a.gesture.slide[0].offsetHeight,a.gesture.imageWrap.transition(0),T.rtl&&(a.image.startX=-a.image.startX),T.rtl&&(a.image.startY=-a.image.startY));var t=a.image.width*a.scale,s=a.image.height*a.scale;if(!(t<a.gesture.slideWidth&&s<a.gesture.slideHeight)){if(a.image.minX=Math.min(a.gesture.slideWidth/2-t/2,0),a.image.maxX=-a.image.minX,a.image.minY=Math.min(a.gesture.slideHeight/2-s/2,0),a.image.maxY=-a.image.minY,a.image.touchesCurrent.x="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,a.image.touchesCurrent.y="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,!a.image.isMoved&&!a.isScaling){if(T.isHorizontal()&&Math.floor(a.image.minX)===Math.floor(a.image.startX)&&a.image.touchesCurrent.x<a.image.touchesStart.x||Math.floor(a.image.maxX)===Math.floor(a.image.startX)&&a.image.touchesCurrent.x>a.image.touchesStart.x)return void(a.image.isTouched=!1);if(!T.isHorizontal()&&Math.floor(a.image.minY)===Math.floor(a.image.startY)&&a.image.touchesCurrent.y<a.image.touchesStart.y||Math.floor(a.image.maxY)===Math.floor(a.image.startY)&&a.image.touchesCurrent.y>a.image.touchesStart.y)return void(a.image.isTouched=!1)}e.preventDefault(),e.stopPropagation(),a.image.isMoved=!0,a.image.currentX=a.image.touchesCurrent.x-a.image.touchesStart.x+a.image.startX,a.image.currentY=a.image.touchesCurrent.y-a.image.touchesStart.y+a.image.startY,a.image.currentX<a.image.minX&&(a.image.currentX=a.image.minX+1-Math.pow(a.image.minX-a.image.currentX+1,.8)),a.image.currentX>a.image.maxX&&(a.image.currentX=a.image.maxX-1+Math.pow(a.image.currentX-a.image.maxX+1,.8)),a.image.currentY<a.image.minY&&(a.image.currentY=a.image.minY+1-Math.pow(a.image.minY-a.image.currentY+1,.8)),a.image.currentY>a.image.maxY&&(a.image.currentY=a.image.maxY-1+Math.pow(a.image.currentY-a.image.maxY+1,.8)),a.velocity.prevPositionX||(a.velocity.prevPositionX=a.image.touchesCurrent.x),a.velocity.prevPositionY||(a.velocity.prevPositionY=a.image.touchesCurrent.y),a.velocity.prevTime||(a.velocity.prevTime=Date.now()),a.velocity.x=(a.image.touchesCurrent.x-a.velocity.prevPositionX)/(Date.now()-a.velocity.prevTime)/2,a.velocity.y=(a.image.touchesCurrent.y-a.velocity.prevPositionY)/(Date.now()-a.velocity.prevTime)/2,Math.abs(a.image.touchesCurrent.x-a.velocity.prevPositionX)<2&&(a.velocity.x=0),Math.abs(a.image.touchesCurrent.y-a.velocity.prevPositionY)<2&&(a.velocity.y=0),a.velocity.prevPositionX=a.image.touchesCurrent.x,a.velocity.prevPositionY=a.image.touchesCurrent.y,a.velocity.prevTime=Date.now(),a.gesture.imageWrap.transform("translate3d("+a.image.currentX+"px, "+a.image.currentY+"px,0)")}}},onTouchEnd:function(e,a){var t=e.zoom;if(t.gesture.image&&0!==t.gesture.image.length){if(!t.image.isTouched||!t.image.isMoved)return t.image.isTouched=!1,void(t.image.isMoved=!1);t.image.isTouched=!1,t.image.isMoved=!1;var s=300,i=300,r=t.velocity.x*s,n=t.image.currentX+r,o=t.velocity.y*i,l=t.image.currentY+o;0!==t.velocity.x&&(s=Math.abs((n-t.image.currentX)/t.velocity.x)),0!==t.velocity.y&&(i=Math.abs((l-t.image.currentY)/t.velocity.y));var p=Math.max(s,i);t.image.currentX=n,t.image.currentY=l;var d=t.image.width*t.scale,u=t.image.height*t.scale;t.image.minX=Math.min(t.gesture.slideWidth/2-d/2,0),t.image.maxX=-t.image.minX,t.image.minY=Math.min(t.gesture.slideHeight/2-u/2,0),t.image.maxY=-t.image.minY,t.image.currentX=Math.max(Math.min(t.image.currentX,t.image.maxX),t.image.minX),t.image.currentY=Math.max(Math.min(t.image.currentY,t.image.maxY),t.image.minY),t.gesture.imageWrap.transition(p).transform("translate3d("+t.image.currentX+"px, "+t.image.currentY+"px,0)")}},onTransitionEnd:function(e){var a=e.zoom;a.gesture.slide&&e.previousIndex!==e.activeIndex&&(a.gesture.image.transform("translate3d(0,0,0) scale(1)"),a.gesture.imageWrap.transform("translate3d(0,0,0)"),a.gesture.slide=a.gesture.image=a.gesture.imageWrap=void 0,a.scale=a.currentScale=1)},toggleZoom:function(a,t){var s=a.zoom;if(s.gesture.slide||(s.gesture.slide=a.clickedSlide?e(a.clickedSlide):a.slides.eq(a.activeIndex),s.gesture.image=s.gesture.slide.find("img, svg, canvas"),s.gesture.imageWrap=s.gesture.image.parent("."+a.params.zoomContainerClass)),s.gesture.image&&0!==s.gesture.image.length){var i,r,n,o,l,p,d,u,c,m,h,g,f,v,w,y,x,T;void 0===s.image.touchesStart.x&&t?(i="touchend"===t.type?t.changedTouches[0].pageX:t.pageX,r="touchend"===t.type?t.changedTouches[0].pageY:t.pageY):(i=s.image.touchesStart.x,r=s.image.touchesStart.y),s.scale&&1!==s.scale?(s.scale=s.currentScale=1,s.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)"),s.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)"),s.gesture.slide=void 0):(s.scale=s.currentScale=s.gesture.imageWrap.attr("data-swiper-zoom")||a.params.zoomMax,t?(x=s.gesture.slide[0].offsetWidth,T=s.gesture.slide[0].offsetHeight,n=s.gesture.slide.offset().left,o=s.gesture.slide.offset().top,l=n+x/2-i,p=o+T/2-r,c=s.gesture.image[0].offsetWidth,m=s.gesture.image[0].offsetHeight,h=c*s.scale,g=m*s.scale,f=Math.min(x/2-h/2,0),v=Math.min(T/2-g/2,0),w=-f,y=-v,d=l*s.scale,u=p*s.scale,d<f&&(d=f),d>w&&(d=w),u<v&&(u=v),u>y&&(u=y)):(d=0,u=0),s.gesture.imageWrap.transition(300).transform("translate3d("+d+"px, "+u+"px,0)"),s.gesture.image.transition(300).transform("translate3d(0,0,0) scale("+s.scale+")"))}},attachEvents:function(a){var t=a?"off":"on";if(T.params.zoom){var s=(T.slides,!("touchstart"!==T.touchEvents.start||!T.support.passiveListener||!T.params.passiveListeners)&&{passive:!0,capture:!1});T.support.gestures?(T.slides[t]("gesturestart",T.zoom.onGestureStart,s),T.slides[t]("gesturechange",T.zoom.onGestureChange,s),T.slides[t]("gestureend",T.zoom.onGestureEnd,s)):"touchstart"===T.touchEvents.start&&(T.slides[t](T.touchEvents.start,T.zoom.onGestureStart,s),T.slides[t](T.touchEvents.move,T.zoom.onGestureChange,s),T.slides[t](T.touchEvents.end,T.zoom.onGestureEnd,s)),T[t]("touchStart",T.zoom.onTouchStart),T.slides.each(function(a,s){e(s).find("."+T.params.zoomContainerClass).length>0&&e(s)[t](T.touchEvents.move,T.zoom.onTouchMove)}),T[t]("touchEnd",T.zoom.onTouchEnd),T[t]("transitionEnd",T.zoom.onTransitionEnd),T.params.zoomToggle&&T.on("doubleTap",T.zoom.toggleZoom)}},init:function(){T.zoom.attachEvents()},destroy:function(){T.zoom.attachEvents(!0)}},T._plugins=[];for(var Y in T.plugins){var O=T.plugins[Y](T,T.params[Y]);O&&T._plugins.push(O)}return T.callPlugins=function(e){for(var a=0;a<T._plugins.length;a++)e in T._plugins[a]&&T._plugins[a][e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},T.emitterEventListeners={},T.emit=function(e){T.params[e]&&T.params[e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);var a;if(T.emitterEventListeners[e])for(a=0;a<T.emitterEventListeners[e].length;a++)T.emitterEventListeners[e][a](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);T.callPlugins&&T.callPlugins(e,arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},T.on=function(e,a){return e=m(e),T.emitterEventListeners[e]||(T.emitterEventListeners[e]=[]),T.emitterEventListeners[e].push(a),T},T.off=function(e,a){var t;if(e=m(e),void 0===a)return T.emitterEventListeners[e]=[],T;if(T.emitterEventListeners[e]&&0!==T.emitterEventListeners[e].length){for(t=0;t<T.emitterEventListeners[e].length;t++)T.emitterEventListeners[e][t]===a&&T.emitterEventListeners[e].splice(t,1);return T}},T.once=function(e,a){e=m(e);var t=function(){a(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]),T.off(e,t)};return T.on(e,t),T},T.a11y={makeFocusable:function(e){return e.attr("tabIndex","0"),e},addRole:function(e,a){return e.attr("role",a),e},addLabel:function(e,a){return e.attr("aria-label",a),e},disable:function(e){return e.attr("aria-disabled",!0),e},enable:function(e){return e.attr("aria-disabled",!1),e},onEnterKey:function(a){13===a.keyCode&&(e(a.target).is(T.params.nextButton)?(T.onClickNext(a),T.isEnd?T.a11y.notify(T.params.lastSlideMessage):T.a11y.notify(T.params.nextSlideMessage)):e(a.target).is(T.params.prevButton)&&(T.onClickPrev(a),T.isBeginning?T.a11y.notify(T.params.firstSlideMessage):T.a11y.notify(T.params.prevSlideMessage)),e(a.target).is("."+T.params.bulletClass)&&e(a.target)[0].click())},liveRegion:e('<span class="'+T.params.notificationClass+'" aria-live="assertive" aria-atomic="true"></span>'),notify:function(e){var a=T.a11y.liveRegion;0!==a.length&&(a.html(""),a.html(e))},init:function(){T.params.nextButton&&T.nextButton&&T.nextButton.length>0&&(T.a11y.makeFocusable(T.nextButton),T.a11y.addRole(T.nextButton,"button"),T.a11y.addLabel(T.nextButton,T.params.nextSlideMessage)),T.params.prevButton&&T.prevButton&&T.prevButton.length>0&&(T.a11y.makeFocusable(T.prevButton),T.a11y.addRole(T.prevButton,"button"),T.a11y.addLabel(T.prevButton,T.params.prevSlideMessage)),e(T.container).append(T.a11y.liveRegion)},initPagination:function(){T.params.pagination&&T.params.paginationClickable&&T.bullets&&T.bullets.length&&T.bullets.each(function(){var a=e(this);T.a11y.makeFocusable(a),T.a11y.addRole(a,"button"),T.a11y.addLabel(a,T.params.paginationBulletMessage.replace(/{{index}}/,a.index()+1))})},destroy:function(){T.a11y.liveRegion&&T.a11y.liveRegion.length>0&&T.a11y.liveRegion.remove()}},T.init=function(){T.params.loop&&T.createLoop(),T.updateContainerSize(),T.updateSlidesSize(),T.updatePagination(),T.params.scrollbar&&T.scrollbar&&(T.scrollbar.set(),T.params.scrollbarDraggable&&T.scrollbar.enableDraggable()),"slide"!==T.params.effect&&T.effects[T.params.effect]&&(T.params.loop||T.updateProgress(),T.effects[T.params.effect].setTranslate()),T.params.loop?T.slideTo(T.params.initialSlide+T.loopedSlides,0,T.params.runCallbacksOnInit):(T.slideTo(T.params.initialSlide,0,T.params.runCallbacksOnInit),0===T.params.initialSlide&&(T.parallax&&T.params.parallax&&T.parallax.setTranslate(),T.lazy&&T.params.lazyLoading&&(T.lazy.load(),T.lazy.initialImageLoaded=!0))),T.attachEvents(),T.params.observer&&T.support.observer&&T.initObservers(),T.params.preloadImages&&!T.params.lazyLoading&&T.preloadImages(),T.params.zoom&&T.zoom&&T.zoom.init(),T.params.autoplay&&T.startAutoplay(),T.params.keyboardControl&&T.enableKeyboardControl&&T.enableKeyboardControl(),T.params.mousewheelControl&&T.enableMousewheelControl&&T.enableMousewheelControl(),T.params.hashnavReplaceState&&(T.params.replaceState=T.params.hashnavReplaceState),T.params.history&&T.history&&T.history.init(),T.params.hashnav&&T.hashnav&&T.hashnav.init(),T.params.a11y&&T.a11y&&T.a11y.init(),T.emit("onInit",T)},T.cleanupStyles=function(){T.container.removeClass(T.classNames.join(" ")).removeAttr("style"),T.wrapper.removeAttr("style"),T.slides&&T.slides.length&&T.slides.removeClass([T.params.slideVisibleClass,T.params.slideActiveClass,T.params.slideNextClass,T.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"),T.paginationContainer&&T.paginationContainer.length&&T.paginationContainer.removeClass(T.params.paginationHiddenClass),T.bullets&&T.bullets.length&&T.bullets.removeClass(T.params.bulletActiveClass),T.params.prevButton&&e(T.params.prevButton).removeClass(T.params.buttonDisabledClass),T.params.nextButton&&e(T.params.nextButton).removeClass(T.params.buttonDisabledClass),T.params.scrollbar&&T.scrollbar&&(T.scrollbar.track&&T.scrollbar.track.length&&T.scrollbar.track.removeAttr("style"),T.scrollbar.drag&&T.scrollbar.drag.length&&T.scrollbar.drag.removeAttr("style"))},T.destroy=function(e,a){T.detachEvents(),T.stopAutoplay(),T.params.scrollbar&&T.scrollbar&&T.params.scrollbarDraggable&&T.scrollbar.disableDraggable(),T.params.loop&&T.destroyLoop(),a&&T.cleanupStyles(),T.disconnectObservers(),T.params.zoom&&T.zoom&&T.zoom.destroy(),T.params.keyboardControl&&T.disableKeyboardControl&&T.disableKeyboardControl(),T.params.mousewheelControl&&T.disableMousewheelControl&&T.disableMousewheelControl(),T.params.a11y&&T.a11y&&T.a11y.destroy(),T.params.history&&!T.params.replaceState&&window.removeEventListener("popstate",T.history.setHistoryPopState),T.params.hashnav&&T.hashnav&&T.hashnav.destroy(),T.emit("onDestroy"),e!==!1&&(T=null)},T.init(),T}};a.prototype={isSafari:function(){var e=window.navigator.userAgent.toLowerCase();return e.indexOf("safari")>=0&&e.indexOf("chrome")<0&&e.indexOf("android")<0}(),isUiWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),isArray:function(e){return"[object Array]"===Object.prototype.toString.apply(e)},browser:{ie:window.navigator.pointerEnabled||window.navigator.msPointerEnabled,ieTouch:window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>1||window.navigator.pointerEnabled&&window.navigator.maxTouchPoints>1,lteIE9:function(){var e=document.createElement("div");return e.innerHTML="<!--[if lte IE 9]><i></i><![endif]-->",1===e.getElementsByTagName("i").length}()},device:function(){var e=window.navigator.userAgent,a=e.match(/(Android);?[\s\/]+([\d.]+)?/),t=e.match(/(iPad).*OS\s([\d_]+)/),s=e.match(/(iPod)(.*OS\s([\d_]+))?/),i=!t&&e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);return{ios:t||i||s,android:a}}(),support:{touch:window.Modernizr&&Modernizr.touch===!0||function(){return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)}(),transforms3d:window.Modernizr&&Modernizr.csstransforms3d===!0||function(){var e=document.createElement("div").style;return"webkitPerspective"in e||"MozPerspective"in e||"OPerspective"in e||"MsPerspective"in e||"perspective"in e}(),flexbox:function(){for(var e=document.createElement("div").style,a="alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "),t=0;t<a.length;t++)if(a[t]in e)return!0}(),observer:function(){return"MutationObserver"in window||"WebkitMutationObserver"in window}(),passiveListener:function(){var e=!1;try{var a=Object.defineProperty({},"passive",{get:function(){e=!0}});window.addEventListener("testPassiveListener",null,a)}catch(e){}return e}(),gestures:function(){return"ongesturestart"in window}()},plugins:{}};for(var t=(function(){var e=function(e){var a=this,t=0;for(t=0;t<e.length;t++)a[t]=e[t];return a.length=e.length,this},a=function(a,t){var s=[],i=0;if(a&&!t&&a instanceof e)return a;if(a)if("string"==typeof a){var r,n,o=a.trim();if(o.indexOf("<")>=0&&o.indexOf(">")>=0){var l="div";for(0===o.indexOf("<li")&&(l="ul"),0===o.indexOf("<tr")&&(l="tbody"),0!==o.indexOf("<td")&&0!==o.indexOf("<th")||(l="tr"),0===o.indexOf("<tbody")&&(l="table"),0===o.indexOf("<option")&&(l="select"),n=document.createElement(l),n.innerHTML=a,i=0;i<n.childNodes.length;i++)s.push(n.childNodes[i])}else for(r=t||"#"!==a[0]||a.match(/[ .<>:~]/)?(t||document).querySelectorAll(a):[document.getElementById(a.split("#")[1])],i=0;i<r.length;i++)r[i]&&s.push(r[i])}else if(a.nodeType||a===window||a===document)s.push(a);else if(a.length>0&&a[0].nodeType)for(i=0;i<a.length;i++)s.push(a[i]);return new e(s)};return e.prototype={addClass:function(e){if(void 0===e)return this;for(var a=e.split(" "),t=0;t<a.length;t++)for(var s=0;s<this.length;s++)this[s].classList.add(a[t]);return this},removeClass:function(e){for(var a=e.split(" "),t=0;t<a.length;t++)for(var s=0;s<this.length;s++)this[s].classList.remove(a[t]);return this},hasClass:function(e){return!!this[0]&&this[0].classList.contains(e)},toggleClass:function(e){for(var a=e.split(" "),t=0;t<a.length;t++)for(var s=0;s<this.length;s++)this[s].classList.toggle(a[t]);return this},attr:function(e,a){if(1===arguments.length&&"string"==typeof e)return this[0]?this[0].getAttribute(e):void 0;for(var t=0;t<this.length;t++)if(2===arguments.length)this[t].setAttribute(e,a);else for(var s in e)this[t][s]=e[s],this[t].setAttribute(s,e[s]);return this},removeAttr:function(e){for(var a=0;a<this.length;a++)this[a].removeAttribute(e);return this},data:function(e,a){if(void 0!==a){for(var t=0;t<this.length;t++){var s=this[t];s.dom7ElementDataStorage||(s.dom7ElementDataStorage={}),s.dom7ElementDataStorage[e]=a}return this}if(this[0]){var i=this[0].getAttribute("data-"+e);return i?i:this[0].dom7ElementDataStorage&&e in this[0].dom7ElementDataStorage?this[0].dom7ElementDataStorage[e]:void 0}},transform:function(e){for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransform=t.MsTransform=t.msTransform=t.MozTransform=t.OTransform=t.transform=e}return this},transition:function(e){"string"!=typeof e&&(e+="ms");for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransitionDuration=t.MsTransitionDuration=t.msTransitionDuration=t.MozTransitionDuration=t.OTransitionDuration=t.transitionDuration=e}return this},on:function(e,t,s,i){function r(e){var i=e.target;if(a(i).is(t))s.call(i,e);else for(var r=a(i).parents(),n=0;n<r.length;n++)a(r[n]).is(t)&&s.call(r[n],e)}var n,o,l=e.split(" ");for(n=0;n<this.length;n++)if("function"==typeof t||t===!1)for("function"==typeof t&&(s=arguments[1],i=arguments[2]||!1),o=0;o<l.length;o++)this[n].addEventListener(l[o],s,i);else for(o=0;o<l.length;o++)this[n].dom7LiveListeners||(this[n].dom7LiveListeners=[]),this[n].dom7LiveListeners.push({listener:s,liveListener:r}),this[n].addEventListener(l[o],r,i);return this},off:function(e,a,t,s){for(var i=e.split(" "),r=0;r<i.length;r++)for(var n=0;n<this.length;n++)if("function"==typeof a||a===!1)"function"==typeof a&&(t=arguments[1],s=arguments[2]||!1),this[n].removeEventListener(i[r],t,s);else if(this[n].dom7LiveListeners)for(var o=0;o<this[n].dom7LiveListeners.length;o++)this[n].dom7LiveListeners[o].listener===t&&this[n].removeEventListener(i[r],this[n].dom7LiveListeners[o].liveListener,s);return this},once:function(e,a,t,s){function i(n){t(n),r.off(e,a,i,s)}var r=this;"function"==typeof a&&(a=!1,t=arguments[1],s=arguments[2]),r.on(e,a,i,s)},trigger:function(e,a){for(var t=0;t<this.length;t++){var s;try{s=new window.CustomEvent(e,{detail:a,bubbles:!0,cancelable:!0})}catch(t){s=document.createEvent("Event"),s.initEvent(e,!0,!0),s.detail=a}this[t].dispatchEvent(s)}return this},transitionEnd:function(e){function a(r){if(r.target===this)for(e.call(this,r),t=0;t<s.length;t++)i.off(s[t],a)}var t,s=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],i=this;if(e)for(t=0;t<s.length;t++)i.on(s[t],a);return this},width:function(){return this[0]===window?window.innerWidth:this.length>0?parseFloat(this.css("width")):null},outerWidth:function(e){return this.length>0?e?this[0].offsetWidth+parseFloat(this.css("margin-right"))+parseFloat(this.css("margin-left")):this[0].offsetWidth:null},height:function(){return this[0]===window?window.innerHeight:this.length>0?parseFloat(this.css("height")):null},outerHeight:function(e){return this.length>0?e?this[0].offsetHeight+parseFloat(this.css("margin-top"))+parseFloat(this.css("margin-bottom")):this[0].offsetHeight:null},offset:function(){if(this.length>0){var e=this[0],a=e.getBoundingClientRect(),t=document.body,s=e.clientTop||t.clientTop||0,i=e.clientLeft||t.clientLeft||0,r=window.pageYOffset||e.scrollTop,n=window.pageXOffset||e.scrollLeft;return{top:a.top+r-s,left:a.left+n-i}}return null},css:function(e,a){var t;if(1===arguments.length){if("string"!=typeof e){for(t=0;t<this.length;t++)for(var s in e)this[t].style[s]=e[s];return this}if(this[0])return window.getComputedStyle(this[0],null).getPropertyValue(e)}if(2===arguments.length&&"string"==typeof e){for(t=0;t<this.length;t++)this[t].style[e]=a;return this}return this},each:function(e){for(var a=0;a<this.length;a++)e.call(this[a],a,this[a]);return this},html:function(e){if(void 0===e)return this[0]?this[0].innerHTML:void 0;for(var a=0;a<this.length;a++)this[a].innerHTML=e;return this},text:function(e){if(void 0===e)return this[0]?this[0].textContent.trim():null;for(var a=0;a<this.length;a++)this[a].textContent=e;return this},is:function(t){if(!this[0])return!1;var s,i;if("string"==typeof t){var r=this[0];if(r===document)return t===document;if(r===window)return t===window;if(r.matches)return r.matches(t);if(r.webkitMatchesSelector)return r.webkitMatchesSelector(t);if(r.mozMatchesSelector)return r.mozMatchesSelector(t);if(r.msMatchesSelector)return r.msMatchesSelector(t);for(s=a(t),i=0;i<s.length;i++)if(s[i]===this[0])return!0;return!1}if(t===document)return this[0]===document;if(t===window)return this[0]===window;if(t.nodeType||t instanceof e){for(s=t.nodeType?[t]:t,i=0;i<s.length;i++)if(s[i]===this[0])return!0;return!1}return!1},index:function(){if(this[0]){for(var e=this[0],a=0;null!==(e=e.previousSibling);)1===e.nodeType&&a++;return a}},eq:function(a){if(void 0===a)return this;var t,s=this.length;return a>s-1?new e([]):a<0?(t=s+a,new e(t<0?[]:[this[t]])):new e([this[a]])},append:function(a){var t,s;for(t=0;t<this.length;t++)if("string"==typeof a){var i=document.createElement("div");for(i.innerHTML=a;i.firstChild;)this[t].appendChild(i.firstChild)}else if(a instanceof e)for(s=0;s<a.length;s++)this[t].appendChild(a[s]);else this[t].appendChild(a);return this},prepend:function(a){var t,s;for(t=0;t<this.length;t++)if("string"==typeof a){var i=document.createElement("div");for(i.innerHTML=a,s=i.childNodes.length-1;s>=0;s--)this[t].insertBefore(i.childNodes[s],this[t].childNodes[0])}else if(a instanceof e)for(s=0;s<a.length;s++)this[t].insertBefore(a[s],this[t].childNodes[0]);else this[t].insertBefore(a,this[t].childNodes[0]);return this},insertBefore:function(e){for(var t=a(e),s=0;s<this.length;s++)if(1===t.length)t[0].parentNode.insertBefore(this[s],t[0]);else if(t.length>1)for(var i=0;i<t.length;i++)t[i].parentNode.insertBefore(this[s].cloneNode(!0),t[i])},insertAfter:function(e){for(var t=a(e),s=0;s<this.length;s++)if(1===t.length)t[0].parentNode.insertBefore(this[s],t[0].nextSibling);else if(t.length>1)for(var i=0;i<t.length;i++)t[i].parentNode.insertBefore(this[s].cloneNode(!0),t[i].nextSibling)},next:function(t){return new e(this.length>0?t?this[0].nextElementSibling&&a(this[0].nextElementSibling).is(t)?[this[0].nextElementSibling]:[]:this[0].nextElementSibling?[this[0].nextElementSibling]:[]:[])},nextAll:function(t){var s=[],i=this[0];if(!i)return new e([]);for(;i.nextElementSibling;){var r=i.nextElementSibling;t?a(r).is(t)&&s.push(r):s.push(r),i=r}return new e(s)},prev:function(t){return new e(this.length>0?t?this[0].previousElementSibling&&a(this[0].previousElementSibling).is(t)?[this[0].previousElementSibling]:[]:this[0].previousElementSibling?[this[0].previousElementSibling]:[]:[])},prevAll:function(t){var s=[],i=this[0];if(!i)return new e([]);for(;i.previousElementSibling;){var r=i.previousElementSibling;t?a(r).is(t)&&s.push(r):s.push(r),i=r}return new e(s)},parent:function(e){for(var t=[],s=0;s<this.length;s++)e?a(this[s].parentNode).is(e)&&t.push(this[s].parentNode):t.push(this[s].parentNode);return a(a.unique(t))},parents:function(e){for(var t=[],s=0;s<this.length;s++)for(var i=this[s].parentNode;i;)e?a(i).is(e)&&t.push(i):t.push(i),i=i.parentNode;return a(a.unique(t))},find:function(a){for(var t=[],s=0;s<this.length;s++)for(var i=this[s].querySelectorAll(a),r=0;r<i.length;r++)t.push(i[r]);return new e(t)},children:function(t){for(var s=[],i=0;i<this.length;i++)for(var r=this[i].childNodes,n=0;n<r.length;n++)t?1===r[n].nodeType&&a(r[n]).is(t)&&s.push(r[n]):1===r[n].nodeType&&s.push(r[n]);return new e(a.unique(s))},remove:function(){for(var e=0;e<this.length;e++)this[e].parentNode&&this[e].parentNode.removeChild(this[e]);return this},add:function(){var e,t,s=this;for(e=0;e<arguments.length;e++){var i=a(arguments[e]);for(t=0;t<i.length;t++)s[s.length]=i[t],s.length++}return s}},a.fn=e.prototype,a.unique=function(e){for(var a=[],t=0;t<e.length;t++)a.indexOf(e[t])===-1&&a.push(e[t]);return a},a}()),s=["jQuery","Zepto","Dom7"],i=0;i<s.length;i++)window[s[i]]&&function(e){e.fn.swiper=function(t){var s;return e(this).each(function(){var e=new a(this,t);s||(s=e)}),s}}(window[s[i]]);var r;r=void 0===t?window.Dom7||window.Zepto||window.jQuery:t,r&&("transitionEnd"in r.fn||(r.fn.transitionEnd=function(e){function a(r){if(r.target===this)for(e.call(this,r),t=0;t<s.length;t++)i.off(s[t],a)}var t,s=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],i=this;if(e)for(t=0;t<s.length;t++)i.on(s[t],a);return this}),"transform"in r.fn||(r.fn.transform=function(e){for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransform=t.MsTransform=t.msTransform=t.MozTransform=t.OTransform=t.transform=e}return this}),"transition"in r.fn||(r.fn.transition=function(e){"string"!=typeof e&&(e+="ms");for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransitionDuration=t.MsTransitionDuration=t.msTransitionDuration=t.MozTransitionDuration=t.OTransitionDuration=t.transitionDuration=e}return this}),"outerWidth"in r.fn||(r.fn.outerWidth=function(e){
	return this.length>0?e?this[0].offsetWidth+parseFloat(this.css("margin-right"))+parseFloat(this.css("margin-left")):this[0].offsetWidth:null})),window.Swiper=a}(), true?module.exports=window.Swiper:"function"==typeof define&&define.amd&&define([],function(){"use strict";return window.Swiper});
	//# sourceMappingURL=maps/swiper.min.js.map


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(7);
	var Ajax = __webpack_require__(8);

	var showBox = module.exports = function(urls) {
		// this.imgurl = window.location.host == "wx.cheertea.com" ? "http://images.cheertea.com/" : "../images/";

	    if(window.location.host == "wx.cheertea.com") {
	        this.imgurl = "http://images.cheertea.com/";
	    } else if(window.location.host == "test.cheertea.com") {
	        this.imgurl = "http://images.cheertea.com/";
	    } else {
	        this.imgurl = "../images/";
	    }

		$(".sisDelete").css({
			position: "fixed",
		    top: 0,
		    width: "100%",
		    height: "100%",
		    zIndex: 1002,
		    background: "rgba(0, 0, 0, 0.6)"
		});

		$(".goupbox").css({
			position: "fixed",
		    top: 0,
		    left: 0,
		    right: 0,
		    bottom: 0,
		    margin: "auto",
		    width: "7.13rem",
		    height: "9.53rem"
		});

		$(".goupbox .goupimg").css({
			width: "100%",
		    height: "7.66rem",
		    marginTop: "1.87rem",
		});

		$(".goupbox .chacha").css({
			position: "absolute",
		    top: 0,
		    right: 0,
		    width: "1.64rem",
		    height: "1.86rem",
		    background: "url(" + this.imgurl + "chachas.png) 0 0 no-repeat",
		    backgroundSize: "contain",
		});

		//实现弹窗功能
		function Goup() {
			this.timer = 0;
			this.timer = setTimeout(function() {
				$(".sisDelete").remove();
			}, 5000);

			$(".chacha").on("touchstart", function(event) {
				event.preventDefault();
				$(".sisDelete").hide();
				$(".goupbox").hide();
			});

			$(".sisDelete").on("touchstart", function(event) {
				event.preventDefault();
			});
		}
		Goup();

		/*实现路径功能*/
		function GetAjax() {
			Ajax({
				urls: urls,
				types: "get",
				dataTypes: "json",
				datas: {
					goodsid: this.idVal
				},
				successes: function(data) {
					var datas = JSON.parse(data);

					if(datas.isShow) {
						$('body').append(
							"<div class='sisDelete'>" +
							"<div class='goupbox'>" +
							"<a href='' class='imghref'>" +
							"<img src='' alt='' class='goupimg'>" +
							"<div class='chacha'></div>" +
							"</a>" +
							"</div>" +
							"</div>"
						);
						$(".imghref").prop("href", datas.url);
						$(".goupimg").prop("src", datas.img);
					} else {

					}
				}
			});
		}
		GetAjax();
	}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	/* Zepto v1.1.6 - zepto event ajax form ie - zeptojs.com/license */

	var Zepto = module.exports = (function() {
	  var undefined, key, $, classList, emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter,
	    document = window.document,
	    elementDisplay = {}, classCache = {},
	    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
	    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
	    singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
	    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	    rootNodeRE = /^(?:body|html)$/i,
	    capitalRE = /([A-Z])/g,

	    // special attributes that should be get/set via method calls
	    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

	    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],
	    table = document.createElement('table'),
	    tableRow = document.createElement('tr'),
	    containers = {
	      'tr': document.createElement('tbody'),
	      'tbody': table, 'thead': table, 'tfoot': table,
	      'td': tableRow, 'th': tableRow,
	      '*': document.createElement('div')
	    },
	    readyRE = /complete|loaded|interactive/,
	    simpleSelectorRE = /^[\w-]*$/,
	    class2type = {},
	    toString = class2type.toString,
	    zepto = {},
	    camelize, uniq,
	    tempParent = document.createElement('div'),
	    propMap = {
	      'tabindex': 'tabIndex',
	      'readonly': 'readOnly',
	      'for': 'htmlFor',
	      'class': 'className',
	      'maxlength': 'maxLength',
	      'cellspacing': 'cellSpacing',
	      'cellpadding': 'cellPadding',
	      'rowspan': 'rowSpan',
	      'colspan': 'colSpan',
	      'usemap': 'useMap',
	      'frameborder': 'frameBorder',
	      'contenteditable': 'contentEditable'
	    },
	    isArray = Array.isArray ||
	      function(object){ return object instanceof Array }

	  zepto.matches = function(element, selector) {
	    if (!selector || !element || element.nodeType !== 1) return false
	    var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
	                          element.oMatchesSelector || element.matchesSelector
	    if (matchesSelector) return matchesSelector.call(element, selector)
	    // fall back to performing a selector:
	    var match, parent = element.parentNode, temp = !parent
	    if (temp) (parent = tempParent).appendChild(element)
	    match = ~zepto.qsa(parent, selector).indexOf(element)
	    temp && tempParent.removeChild(element)
	    return match
	  }

	  function type(obj) {
	    return obj == null ? String(obj) :
	      class2type[toString.call(obj)] || "object"
	  }

	  function isFunction(value) { return type(value) == "function" }
	  function isWindow(obj)     { return obj != null && obj == obj.window }
	  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
	  function isObject(obj)     { return type(obj) == "object" }
	  function isPlainObject(obj) {
	    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
	  }
	  function likeArray(obj) { return typeof obj.length == 'number' }

	  function compact(array) { return filter.call(array, function(item){ return item != null }) }
	  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
	  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }
	  function dasherize(str) {
	    return str.replace(/::/g, '/')
	           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
	           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
	           .replace(/_/g, '-')
	           .toLowerCase()
	  }
	  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

	  function classRE(name) {
	    return name in classCache ?
	      classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
	  }

	  function maybeAddPx(name, value) {
	    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
	  }

	  function defaultDisplay(nodeName) {
	    var element, display
	    if (!elementDisplay[nodeName]) {
	      element = document.createElement(nodeName)
	      document.body.appendChild(element)
	      display = getComputedStyle(element, '').getPropertyValue("display")
	      element.parentNode.removeChild(element)
	      display == "none" && (display = "block")
	      elementDisplay[nodeName] = display
	    }
	    return elementDisplay[nodeName]
	  }

	  function children(element) {
	    return 'children' in element ?
	      slice.call(element.children) :
	      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })
	  }

	  // `$.zepto.fragment` takes a html string and an optional tag name
	  // to generate DOM nodes nodes from the given html string.
	  // The generated DOM nodes are returned as an array.
	  // This function can be overriden in plugins for example to make
	  // it compatible with browsers that don't support the DOM fully.
	  zepto.fragment = function(html, name, properties) {
	    var dom, nodes, container

	    // A special case optimization for a single tag
	    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

	    if (!dom) {
	      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
	      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
	      if (!(name in containers)) name = '*'

	      container = containers[name]
	      container.innerHTML = '' + html
	      dom = $.each(slice.call(container.childNodes), function(){
	        container.removeChild(this)
	      })
	    }

	    if (isPlainObject(properties)) {
	      nodes = $(dom)
	      $.each(properties, function(key, value) {
	        if (methodAttributes.indexOf(key) > -1) nodes[key](value)
	        else nodes.attr(key, value)
	      })
	    }

	    return dom
	  }

	  // `$.zepto.Z` swaps out the prototype of the given `dom` array
	  // of nodes with `$.fn` and thus supplying all the Zepto functions
	  // to the array. Note that `__proto__` is not supported on Internet
	  // Explorer. This method can be overriden in plugins.
	  zepto.Z = function(dom, selector) {
	    dom = dom || []
	    dom.__proto__ = $.fn
	    dom.selector = selector || ''
	    return dom
	  }

	  // `$.zepto.isZ` should return `true` if the given object is a Zepto
	  // collection. This method can be overriden in plugins.
	  zepto.isZ = function(object) {
	    return object instanceof zepto.Z
	  }

	  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
	  // takes a CSS selector and an optional context (and handles various
	  // special cases).
	  // This method can be overriden in plugins.
	  zepto.init = function(selector, context) {
	    var dom
	    // If nothing given, return an empty Zepto collection
	    if (!selector) return zepto.Z()
	    // Optimize for string selectors
	    else if (typeof selector == 'string') {
	      selector = selector.trim()
	      // If it's a html fragment, create nodes from it
	      // Note: In both Chrome 21 and Firefox 15, DOM error 12
	      // is thrown if the fragment doesn't begin with <
	      if (selector[0] == '<' && fragmentRE.test(selector))
	        dom = zepto.fragment(selector, RegExp.$1, context), selector = null
	      // If there's a context, create a collection on that context first, and select
	      // nodes from there
	      else if (context !== undefined) return $(context).find(selector)
	      // If it's a CSS selector, use it to select nodes.
	      else dom = zepto.qsa(document, selector)
	    }
	    // If a function is given, call it when the DOM is ready
	    else if (isFunction(selector)) return $(document).ready(selector)
	    // If a Zepto collection is given, just return it
	    else if (zepto.isZ(selector)) return selector
	    else {
	      // normalize array if an array of nodes is given
	      if (isArray(selector)) dom = compact(selector)
	      // Wrap DOM nodes.
	      else if (isObject(selector))
	        dom = [selector], selector = null
	      // If it's a html fragment, create nodes from it
	      else if (fragmentRE.test(selector))
	        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
	      // If there's a context, create a collection on that context first, and select
	      // nodes from there
	      else if (context !== undefined) return $(context).find(selector)
	      // And last but no least, if it's a CSS selector, use it to select nodes.
	      else dom = zepto.qsa(document, selector)
	    }
	    // create a new Zepto collection from the nodes found
	    return zepto.Z(dom, selector)
	  }

	  // `$` will be the base `Zepto` object. When calling this
	  // function just call `$.zepto.init, which makes the implementation
	  // details of selecting nodes and creating Zepto collections
	  // patchable in plugins.
	  $ = function(selector, context){
	    return zepto.init(selector, context)
	  }

	  function extend(target, source, deep) {
	    for (key in source)
	      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
	          target[key] = {}
	        if (isArray(source[key]) && !isArray(target[key]))
	          target[key] = []
	        extend(target[key], source[key], deep)
	      }
	      else if (source[key] !== undefined) target[key] = source[key]
	  }

	  // Copy all but undefined properties from one or more
	  // objects to the `target` object.
	  $.extend = function(target){
	    var deep, args = slice.call(arguments, 1)
	    if (typeof target == 'boolean') {
	      deep = target
	      target = args.shift()
	    }
	    args.forEach(function(arg){ extend(target, arg, deep) })
	    return target
	  }

	  // `$.zepto.qsa` is Zepto's CSS selector implementation which
	  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
	  // This method can be overriden in plugins.
	  zepto.qsa = function(element, selector){
	    var found,
	        maybeID = selector[0] == '#',
	        maybeClass = !maybeID && selector[0] == '.',
	        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
	        isSimple = simpleSelectorRE.test(nameOnly)
	    return (isDocument(element) && isSimple && maybeID) ?
	      ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :
	      (element.nodeType !== 1 && element.nodeType !== 9) ? [] :
	      slice.call(
	        isSimple && !maybeID ?
	          maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
	          element.getElementsByTagName(selector) : // Or a tag
	          element.querySelectorAll(selector) // Or it's not simple, and we need to query all
	      )
	  }

	  function filtered(nodes, selector) {
	    return selector == null ? $(nodes) : $(nodes).filter(selector)
	  }

	  $.contains = document.documentElement.contains ?
	    function(parent, node) {
	      return parent !== node && parent.contains(node)
	    } :
	    function(parent, node) {
	      while (node && (node = node.parentNode))
	        if (node === parent) return true
	      return false
	    }

	  function funcArg(context, arg, idx, payload) {
	    return isFunction(arg) ? arg.call(context, idx, payload) : arg
	  }

	  function setAttribute(node, name, value) {
	    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
	  }

	  // access className property while respecting SVGAnimatedString
	  function className(node, value){
	    var klass = node.className || '',
	        svg   = klass && klass.baseVal !== undefined

	    if (value === undefined) return svg ? klass.baseVal : klass
	    svg ? (klass.baseVal = value) : (node.className = value)
	  }

	  // "true"  => true
	  // "false" => false
	  // "null"  => null
	  // "42"    => 42
	  // "42.5"  => 42.5
	  // "08"    => "08"
	  // JSON    => parse if valid
	  // String  => self
	  function deserializeValue(value) {
	    try {
	      return value ?
	        value == "true" ||
	        ( value == "false" ? false :
	          value == "null" ? null :
	          +value + "" == value ? +value :
	          /^[\[\{]/.test(value) ? $.parseJSON(value) :
	          value )
	        : value
	    } catch(e) {
	      return value
	    }
	  }

	  $.type = type
	  $.isFunction = isFunction
	  $.isWindow = isWindow
	  $.isArray = isArray
	  $.isPlainObject = isPlainObject

	  $.isEmptyObject = function(obj) {
	    var name
	    for (name in obj) return false
	    return true
	  }

	  $.inArray = function(elem, array, i){
	    return emptyArray.indexOf.call(array, elem, i)
	  }

	  $.camelCase = camelize
	  $.trim = function(str) {
	    return str == null ? "" : String.prototype.trim.call(str)
	  }

	  // plugin compatibility
	  $.uuid = 0
	  $.support = { }
	  $.expr = { }

	  $.map = function(elements, callback){
	    var value, values = [], i, key
	    if (likeArray(elements))
	      for (i = 0; i < elements.length; i++) {
	        value = callback(elements[i], i)
	        if (value != null) values.push(value)
	      }
	    else
	      for (key in elements) {
	        value = callback(elements[key], key)
	        if (value != null) values.push(value)
	      }
	    return flatten(values)
	  }

	  $.each = function(elements, callback){
	    var i, key
	    if (likeArray(elements)) {
	      for (i = 0; i < elements.length; i++)
	        if (callback.call(elements[i], i, elements[i]) === false) return elements
	    } else {
	      for (key in elements)
	        if (callback.call(elements[key], key, elements[key]) === false) return elements
	    }

	    return elements
	  }

	  $.grep = function(elements, callback){
	    return filter.call(elements, callback)
	  }

	  if (window.JSON) $.parseJSON = JSON.parse

	  // Populate the class2type map
	  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	    class2type[ "[object " + name + "]" ] = name.toLowerCase()
	  })

	  // Define methods that will be available on all
	  // Zepto collections
	  $.fn = {
	    // Because a collection acts like an array
	    // copy over these useful array functions.
	    forEach: emptyArray.forEach,
	    reduce: emptyArray.reduce,
	    push: emptyArray.push,
	    sort: emptyArray.sort,
	    indexOf: emptyArray.indexOf,
	    concat: emptyArray.concat,

	    // `map` and `slice` in the jQuery API work differently
	    // from their array counterparts
	    map: function(fn){
	      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
	    },
	    slice: function(){
	      return $(slice.apply(this, arguments))
	    },

	    ready: function(callback){
	      // need to check if document.body exists for IE as that browser reports
	      // document ready when it hasn't yet created the body element
	      if (readyRE.test(document.readyState) && document.body) callback($)
	      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)
	      return this
	    },
	    get: function(idx){
	      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
	    },
	    toArray: function(){ return this.get() },
	    size: function(){
	      return this.length
	    },
	    remove: function(){
	      return this.each(function(){
	        if (this.parentNode != null)
	          this.parentNode.removeChild(this)
	      })
	    },
	    each: function(callback){
	      emptyArray.every.call(this, function(el, idx){
	        return callback.call(el, idx, el) !== false
	      })
	      return this
	    },
	    filter: function(selector){
	      if (isFunction(selector)) return this.not(this.not(selector))
	      return $(filter.call(this, function(element){
	        return zepto.matches(element, selector)
	      }))
	    },
	    add: function(selector,context){
	      return $(uniq(this.concat($(selector,context))))
	    },
	    is: function(selector){
	      return this.length > 0 && zepto.matches(this[0], selector)
	    },
	    not: function(selector){
	      var nodes=[]
	      if (isFunction(selector) && selector.call !== undefined)
	        this.each(function(idx){
	          if (!selector.call(this,idx)) nodes.push(this)
	        })
	      else {
	        var excludes = typeof selector == 'string' ? this.filter(selector) :
	          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
	        this.forEach(function(el){
	          if (excludes.indexOf(el) < 0) nodes.push(el)
	        })
	      }
	      return $(nodes)
	    },
	    has: function(selector){
	      return this.filter(function(){
	        return isObject(selector) ?
	          $.contains(this, selector) :
	          $(this).find(selector).size()
	      })
	    },
	    eq: function(idx){
	      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
	    },
	    first: function(){
	      var el = this[0]
	      return el && !isObject(el) ? el : $(el)
	    },
	    last: function(){
	      var el = this[this.length - 1]
	      return el && !isObject(el) ? el : $(el)
	    },
	    find: function(selector){
	      var result, $this = this
	      if (!selector) result = $()
	      else if (typeof selector == 'object')
	        result = $(selector).filter(function(){
	          var node = this
	          return emptyArray.some.call($this, function(parent){
	            return $.contains(parent, node)
	          })
	        })
	      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
	      else result = this.map(function(){ return zepto.qsa(this, selector) })
	      return result
	    },
	    closest: function(selector, context){
	      var node = this[0], collection = false
	      if (typeof selector == 'object') collection = $(selector)
	      while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
	        node = node !== context && !isDocument(node) && node.parentNode
	      return $(node)
	    },
	    parents: function(selector){
	      var ancestors = [], nodes = this
	      while (nodes.length > 0)
	        nodes = $.map(nodes, function(node){
	          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
	            ancestors.push(node)
	            return node
	          }
	        })
	      return filtered(ancestors, selector)
	    },
	    parent: function(selector){
	      return filtered(uniq(this.pluck('parentNode')), selector)
	    },
	    children: function(selector){
	      return filtered(this.map(function(){ return children(this) }), selector)
	    },
	    contents: function() {
	      return this.map(function() { return slice.call(this.childNodes) })
	    },
	    siblings: function(selector){
	      return filtered(this.map(function(i, el){
	        return filter.call(children(el.parentNode), function(child){ return child!==el })
	      }), selector)
	    },
	    empty: function(){
	      return this.each(function(){ this.innerHTML = '' })
	    },
	    // `pluck` is borrowed from Prototype.js
	    pluck: function(property){
	      return $.map(this, function(el){ return el[property] })
	    },
	    show: function(){
	      return this.each(function(){
	        this.style.display == "none" && (this.style.display = '')
	        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
	          this.style.display = defaultDisplay(this.nodeName)
	      })
	    },
	    replaceWith: function(newContent){
	      return this.before(newContent).remove()
	    },
	    wrap: function(structure){
	      var func = isFunction(structure)
	      if (this[0] && !func)
	        var dom   = $(structure).get(0),
	            clone = dom.parentNode || this.length > 1

	      return this.each(function(index){
	        $(this).wrapAll(
	          func ? structure.call(this, index) :
	            clone ? dom.cloneNode(true) : dom
	        )
	      })
	    },
	    wrapAll: function(structure){
	      if (this[0]) {
	        $(this[0]).before(structure = $(structure))
	        var children
	        // drill down to the inmost element
	        while ((children = structure.children()).length) structure = children.first()
	        $(structure).append(this)
	      }
	      return this
	    },
	    wrapInner: function(structure){
	      var func = isFunction(structure)
	      return this.each(function(index){
	        var self = $(this), contents = self.contents(),
	            dom  = func ? structure.call(this, index) : structure
	        contents.length ? contents.wrapAll(dom) : self.append(dom)
	      })
	    },
	    unwrap: function(){
	      this.parent().each(function(){
	        $(this).replaceWith($(this).children())
	      })
	      return this
	    },
	    clone: function(){
	      return this.map(function(){ return this.cloneNode(true) })
	    },
	    hide: function(){
	      return this.css("display", "none")
	    },
	    toggle: function(setting){
	      return this.each(function(){
	        var el = $(this)
	        ;(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
	      })
	    },
	    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },
	    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },
	    html: function(html){
	      return 0 in arguments ?
	        this.each(function(idx){
	          var originHtml = this.innerHTML
	          $(this).empty().append( funcArg(this, html, idx, originHtml) )
	        }) :
	        (0 in this ? this[0].innerHTML : null)
	    },
	    text: function(text){
	      return 0 in arguments ?
	        this.each(function(idx){
	          var newText = funcArg(this, text, idx, this.textContent)
	          this.textContent = newText == null ? '' : ''+newText
	        }) :
	        (0 in this ? this[0].textContent : null)
	    },
	    attr: function(name, value){
	      var result
	      return (typeof name == 'string' && !(1 in arguments)) ?
	        (!this.length || this[0].nodeType !== 1 ? undefined :
	          (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
	        ) :
	        this.each(function(idx){
	          if (this.nodeType !== 1) return
	          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])
	          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
	        })
	    },
	    removeAttr: function(name){
	      return this.each(function(){ this.nodeType === 1 && name.split(' ').forEach(function(attribute){
	        setAttribute(this, attribute)
	      }, this)})
	    },
	    prop: function(name, value){
	      name = propMap[name] || name
	      return (1 in arguments) ?
	        this.each(function(idx){
	          this[name] = funcArg(this, value, idx, this[name])
	        }) :
	        (this[0] && this[0][name])
	    },
	    data: function(name, value){
	      var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()

	      var data = (1 in arguments) ?
	        this.attr(attrName, value) :
	        this.attr(attrName)

	      return data !== null ? deserializeValue(data) : undefined
	    },
	    val: function(value){
	      return 0 in arguments ?
	        this.each(function(idx){
	          this.value = funcArg(this, value, idx, this.value)
	        }) :
	        (this[0] && (this[0].multiple ?
	           $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
	           this[0].value)
	        )
	    },
	    offset: function(coordinates){
	      if (coordinates) return this.each(function(index){
	        var $this = $(this),
	            coords = funcArg(this, coordinates, index, $this.offset()),
	            parentOffset = $this.offsetParent().offset(),
	            props = {
	              top:  coords.top  - parentOffset.top,
	              left: coords.left - parentOffset.left
	            }

	        if ($this.css('position') == 'static') props['position'] = 'relative'
	        $this.css(props)
	      })
	      if (!this.length) return null
	      var obj = this[0].getBoundingClientRect()
	      return {
	        left: obj.left + window.pageXOffset,
	        top: obj.top + window.pageYOffset,
	        width: Math.round(obj.width),
	        height: Math.round(obj.height)
	      }
	    },
	    css: function(property, value){
	      if (arguments.length < 2) {
	        var computedStyle, element = this[0]
	        if(!element) return
	        computedStyle = getComputedStyle(element, '')
	        if (typeof property == 'string')
	          return element.style[camelize(property)] || computedStyle.getPropertyValue(property)
	        else if (isArray(property)) {
	          var props = {}
	          $.each(property, function(_, prop){
	            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
	          })
	          return props
	        }
	      }

	      var css = ''
	      if (type(property) == 'string') {
	        if (!value && value !== 0)
	          this.each(function(){ this.style.removeProperty(dasherize(property)) })
	        else
	          css = dasherize(property) + ":" + maybeAddPx(property, value)
	      } else {
	        for (key in property)
	          if (!property[key] && property[key] !== 0)
	            this.each(function(){ this.style.removeProperty(dasherize(key)) })
	          else
	            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
	      }

	      return this.each(function(){ this.style.cssText += ';' + css })
	    },
	    index: function(element){
	      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
	    },
	    hasClass: function(name){
	      if (!name) return false
	      return emptyArray.some.call(this, function(el){
	        return this.test(className(el))
	      }, classRE(name))
	    },
	    addClass: function(name){
	      if (!name) return this
	      return this.each(function(idx){
	        if (!('className' in this)) return
	        classList = []
	        var cls = className(this), newName = funcArg(this, name, idx, cls)
	        newName.split(/\s+/g).forEach(function(klass){
	          if (!$(this).hasClass(klass)) classList.push(klass)
	        }, this)
	        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
	      })
	    },
	    removeClass: function(name){
	      return this.each(function(idx){
	        if (!('className' in this)) return
	        if (name === undefined) return className(this, '')
	        classList = className(this)
	        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass){
	          classList = classList.replace(classRE(klass), " ")
	        })
	        className(this, classList.trim())
	      })
	    },
	    toggleClass: function(name, when){
	      if (!name) return this
	      return this.each(function(idx){
	        var $this = $(this), names = funcArg(this, name, idx, className(this))
	        names.split(/\s+/g).forEach(function(klass){
	          (when === undefined ? !$this.hasClass(klass) : when) ?
	            $this.addClass(klass) : $this.removeClass(klass)
	        })
	      })
	    },
	    scrollTop: function(value){
	      if (!this.length) return
	      var hasScrollTop = 'scrollTop' in this[0]
	      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
	      return this.each(hasScrollTop ?
	        function(){ this.scrollTop = value } :
	        function(){ this.scrollTo(this.scrollX, value) })
	    },
	    scrollLeft: function(value){
	      if (!this.length) return
	      var hasScrollLeft = 'scrollLeft' in this[0]
	      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
	      return this.each(hasScrollLeft ?
	        function(){ this.scrollLeft = value } :
	        function(){ this.scrollTo(value, this.scrollY) })
	    },
	    position: function() {
	      if (!this.length) return

	      var elem = this[0],
	        // Get *real* offsetParent
	        offsetParent = this.offsetParent(),
	        // Get correct offsets
	        offset       = this.offset(),
	        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

	      // Subtract element margins
	      // note: when an element has margin: auto the offsetLeft and marginLeft
	      // are the same in Safari causing offset.left to incorrectly be 0
	      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0
	      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0

	      // Add offsetParent borders
	      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0
	      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0

	      // Subtract the two offsets
	      return {
	        top:  offset.top  - parentOffset.top,
	        left: offset.left - parentOffset.left
	      }
	    },
	    offsetParent: function() {
	      return this.map(function(){
	        var parent = this.offsetParent || document.body
	        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
	          parent = parent.offsetParent
	        return parent
	      })
	    }
	  }

	  // for now
	  $.fn.detach = $.fn.remove

	  // Generate the `width` and `height` functions
	  ;['width', 'height'].forEach(function(dimension){
	    var dimensionProperty =
	      dimension.replace(/./, function(m){ return m[0].toUpperCase() })

	    $.fn[dimension] = function(value){
	      var offset, el = this[0]
	      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
	        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
	        (offset = this.offset()) && offset[dimension]
	      else return this.each(function(idx){
	        el = $(this)
	        el.css(dimension, funcArg(this, value, idx, el[dimension]()))
	      })
	    }
	  })

	  function traverseNode(node, fun) {
	    fun(node)
	    for (var i = 0, len = node.childNodes.length; i < len; i++)
	      traverseNode(node.childNodes[i], fun)
	  }

	  // Generate the `after`, `prepend`, `before`, `append`,
	  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
	  adjacencyOperators.forEach(function(operator, operatorIndex) {
	    var inside = operatorIndex % 2 //=> prepend, append

	    $.fn[operator] = function(){
	      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
	      var argType, nodes = $.map(arguments, function(arg) {
	            argType = type(arg)
	            return argType == "object" || argType == "array" || arg == null ?
	              arg : zepto.fragment(arg)
	          }),
	          parent, copyByClone = this.length > 1
	      if (nodes.length < 1) return this

	      return this.each(function(_, target){
	        parent = inside ? target : target.parentNode

	        // convert all methods to a "before" operation
	        target = operatorIndex == 0 ? target.nextSibling :
	                 operatorIndex == 1 ? target.firstChild :
	                 operatorIndex == 2 ? target :
	                 null

	        var parentInDocument = $.contains(document.documentElement, parent)

	        nodes.forEach(function(node){
	          if (copyByClone) node = node.cloneNode(true)
	          else if (!parent) return $(node).remove()

	          parent.insertBefore(node, target)
	          if (parentInDocument) traverseNode(node, function(el){
	            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
	               (!el.type || el.type === 'text/javascript') && !el.src)
	              window['eval'].call(window, el.innerHTML)
	          })
	        })
	      })
	    }

	    // after    => insertAfter
	    // prepend  => prependTo
	    // before   => insertBefore
	    // append   => appendTo
	    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
	      $(html)[operator](this)
	      return this
	    }
	  })

	  zepto.Z.prototype = $.fn

	  // Export internal API functions in the `$.zepto` namespace
	  zepto.uniq = uniq
	  zepto.deserializeValue = deserializeValue
	  $.zepto = zepto

	  return $
	})()

	;(function($){
	  var _zid = 1, undefined,
	      slice = Array.prototype.slice,
	      isFunction = $.isFunction,
	      isString = function(obj){ return typeof obj == 'string' },
	      handlers = {},
	      specialEvents={},
	      focusinSupported = 'onfocusin' in window,
	      focus = { focus: 'focusin', blur: 'focusout' },
	      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

	  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

	  function zid(element) {
	    return element._zid || (element._zid = _zid++)
	  }
	  function findHandlers(element, event, fn, selector) {
	    event = parse(event)
	    if (event.ns) var matcher = matcherFor(event.ns)
	    return (handlers[zid(element)] || []).filter(function(handler) {
	      return handler
	        && (!event.e  || handler.e == event.e)
	        && (!event.ns || matcher.test(handler.ns))
	        && (!fn       || zid(handler.fn) === zid(fn))
	        && (!selector || handler.sel == selector)
	    })
	  }
	  function parse(event) {
	    var parts = ('' + event).split('.')
	    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}
	  }
	  function matcherFor(ns) {
	    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
	  }

	  function eventCapture(handler, captureSetting) {
	    return handler.del &&
	      (!focusinSupported && (handler.e in focus)) ||
	      !!captureSetting
	  }

	  function realEvent(type) {
	    return hover[type] || (focusinSupported && focus[type]) || type
	  }

	  function add(element, events, fn, data, selector, delegator, capture){
	    var id = zid(element), set = (handlers[id] || (handlers[id] = []))
	    events.split(/\s/).forEach(function(event){
	      if (event == 'ready') return $(document).ready(fn)
	      var handler   = parse(event)
	      handler.fn    = fn
	      handler.sel   = selector
	      // emulate mouseenter, mouseleave
	      if (handler.e in hover) fn = function(e){
	        var related = e.relatedTarget
	        if (!related || (related !== this && !$.contains(this, related)))
	          return handler.fn.apply(this, arguments)
	      }
	      handler.del   = delegator
	      var callback  = delegator || fn
	      handler.proxy = function(e){
	        e = compatible(e)
	        if (e.isImmediatePropagationStopped()) return
	        e.data = data
	        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
	        if (result === false) e.preventDefault(), e.stopPropagation()
	        return result
	      }
	      handler.i = set.length
	      set.push(handler)
	      if ('addEventListener' in element)
	        element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
	    })
	  }
	  function remove(element, events, fn, selector, capture){
	    var id = zid(element)
	    ;(events || '').split(/\s/).forEach(function(event){
	      findHandlers(element, event, fn, selector).forEach(function(handler){
	        delete handlers[id][handler.i]
	      if ('removeEventListener' in element)
	        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
	      })
	    })
	  }

	  $.event = { add: add, remove: remove }

	  $.proxy = function(fn, context) {
	    var args = (2 in arguments) && slice.call(arguments, 2)
	    if (isFunction(fn)) {
	      var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }
	      proxyFn._zid = zid(fn)
	      return proxyFn
	    } else if (isString(context)) {
	      if (args) {
	        args.unshift(fn[context], fn)
	        return $.proxy.apply(null, args)
	      } else {
	        return $.proxy(fn[context], fn)
	      }
	    } else {
	      throw new TypeError("expected function")
	    }
	  }

	  $.fn.bind = function(event, data, callback){
	    return this.on(event, data, callback)
	  }
	  $.fn.unbind = function(event, callback){
	    return this.off(event, callback)
	  }
	  $.fn.one = function(event, selector, data, callback){
	    return this.on(event, selector, data, callback, 1)
	  }

	  var returnTrue = function(){return true},
	      returnFalse = function(){return false},
	      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
	      eventMethods = {
	        preventDefault: 'isDefaultPrevented',
	        stopImmediatePropagation: 'isImmediatePropagationStopped',
	        stopPropagation: 'isPropagationStopped'
	      }

	  function compatible(event, source) {
	    if (source || !event.isDefaultPrevented) {
	      source || (source = event)

	      $.each(eventMethods, function(name, predicate) {
	        var sourceMethod = source[name]
	        event[name] = function(){
	          this[predicate] = returnTrue
	          return sourceMethod && sourceMethod.apply(source, arguments)
	        }
	        event[predicate] = returnFalse
	      })

	      if (source.defaultPrevented !== undefined ? source.defaultPrevented :
	          'returnValue' in source ? source.returnValue === false :
	          source.getPreventDefault && source.getPreventDefault())
	        event.isDefaultPrevented = returnTrue
	    }
	    return event
	  }

	  function createProxy(event) {
	    var key, proxy = { originalEvent: event }
	    for (key in event)
	      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

	    return compatible(proxy, event)
	  }

	  $.fn.delegate = function(selector, event, callback){
	    return this.on(event, selector, callback)
	  }
	  $.fn.undelegate = function(selector, event, callback){
	    return this.off(event, selector, callback)
	  }

	  $.fn.live = function(event, callback){
	    $(document.body).delegate(this.selector, event, callback)
	    return this
	  }
	  $.fn.die = function(event, callback){
	    $(document.body).undelegate(this.selector, event, callback)
	    return this
	  }

	  $.fn.on = function(event, selector, data, callback, one){
	    var autoRemove, delegator, $this = this
	    if (event && !isString(event)) {
	      $.each(event, function(type, fn){
	        $this.on(type, selector, data, fn, one)
	      })
	      return $this
	    }

	    if (!isString(selector) && !isFunction(callback) && callback !== false)
	      callback = data, data = selector, selector = undefined
	    if (isFunction(data) || data === false)
	      callback = data, data = undefined

	    if (callback === false) callback = returnFalse

	    return $this.each(function(_, element){
	      if (one) autoRemove = function(e){
	        remove(element, e.type, callback)
	        return callback.apply(this, arguments)
	      }

	      if (selector) delegator = function(e){
	        var evt, match = $(e.target).closest(selector, element).get(0)
	        if (match && match !== element) {
	          evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})
	          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
	        }
	      }

	      add(element, event, callback, data, selector, delegator || autoRemove)
	    })
	  }
	  $.fn.off = function(event, selector, callback){
	    var $this = this
	    if (event && !isString(event)) {
	      $.each(event, function(type, fn){
	        $this.off(type, selector, fn)
	      })
	      return $this
	    }

	    if (!isString(selector) && !isFunction(callback) && callback !== false)
	      callback = selector, selector = undefined

	    if (callback === false) callback = returnFalse

	    return $this.each(function(){
	      remove(this, event, callback, selector)
	    })
	  }

	  $.fn.trigger = function(event, args){
	    event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
	    event._args = args
	    return this.each(function(){
	      // handle focus(), blur() by calling them directly
	      if (event.type in focus && typeof this[event.type] == "function") this[event.type]()
	      // items in the collection might not be DOM elements
	      else if ('dispatchEvent' in this) this.dispatchEvent(event)
	      else $(this).triggerHandler(event, args)
	    })
	  }

	  // triggers event handlers on current element just as if an event occurred,
	  // doesn't trigger an actual event, doesn't bubble
	  $.fn.triggerHandler = function(event, args){
	    var e, result
	    this.each(function(i, element){
	      e = createProxy(isString(event) ? $.Event(event) : event)
	      e._args = args
	      e.target = element
	      $.each(findHandlers(element, event.type || event), function(i, handler){
	        result = handler.proxy(e)
	        if (e.isImmediatePropagationStopped()) return false
	      })
	    })
	    return result
	  }

	  // shortcut methods for `.bind(event, fn)` for each event type
	  ;('focusin focusout focus blur load resize scroll unload click dblclick '+
	  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
	  'change select keydown keypress keyup error').split(' ').forEach(function(event) {
	    $.fn[event] = function(callback) {
	      return (0 in arguments) ?
	        this.bind(event, callback) :
	        this.trigger(event)
	    }
	  })

	  $.Event = function(type, props) {
	    if (!isString(type)) props = type, type = props.type
	    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true
	    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
	    event.initEvent(type, bubbles, true)
	    return compatible(event)
	  }

	})(Zepto)

	;(function($){
	  var jsonpID = 0,
	      document = window.document,
	      key,
	      name,
	      rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	      scriptTypeRE = /^(?:text|application)\/javascript/i,
	      xmlTypeRE = /^(?:text|application)\/xml/i,
	      jsonType = 'application/json',
	      htmlType = 'text/html',
	      blankRE = /^\s*$/,
	      originAnchor = document.createElement('a')

	  originAnchor.href = window.location.href

	  // trigger a custom event and return false if it was cancelled
	  function triggerAndReturn(context, eventName, data) {
	    var event = $.Event(eventName)
	    $(context).trigger(event, data)
	    return !event.isDefaultPrevented()
	  }

	  // trigger an Ajax "global" event
	  function triggerGlobal(settings, context, eventName, data) {
	    if (settings.global) return triggerAndReturn(context || document, eventName, data)
	  }

	  // Number of active Ajax requests
	  $.active = 0

	  function ajaxStart(settings) {
	    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
	  }
	  function ajaxStop(settings) {
	    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
	  }

	  // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
	  function ajaxBeforeSend(xhr, settings) {
	    var context = settings.context
	    if (settings.beforeSend.call(context, xhr, settings) === false ||
	        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
	      return false

	    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
	  }
	  function ajaxSuccess(data, xhr, settings, deferred) {
	    var context = settings.context, status = 'success'
	    settings.success.call(context, data, status, xhr)
	    if (deferred) deferred.resolveWith(context, [data, status, xhr])
	    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
	    ajaxComplete(status, xhr, settings)
	  }
	  // type: "timeout", "error", "abort", "parsererror"
	  function ajaxError(error, type, xhr, settings, deferred) {
	    var context = settings.context
	    settings.error.call(context, xhr, type, error)
	    if (deferred) deferred.rejectWith(context, [xhr, type, error])
	    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])
	    ajaxComplete(type, xhr, settings)
	  }
	  // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
	  function ajaxComplete(status, xhr, settings) {
	    var context = settings.context
	    settings.complete.call(context, xhr, status)
	    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
	    ajaxStop(settings)
	  }

	  // Empty function, used as default callback
	  function empty() {}

	  $.ajaxJSONP = function(options, deferred){
	    if (!('type' in options)) return $.ajax(options)

	    var _callbackName = options.jsonpCallback,
	      callbackName = ($.isFunction(_callbackName) ?
	        _callbackName() : _callbackName) || ('jsonp' + (++jsonpID)),
	      script = document.createElement('script'),
	      originalCallback = window[callbackName],
	      responseData,
	      abort = function(errorType) {
	        $(script).triggerHandler('error', errorType || 'abort')
	      },
	      xhr = { abort: abort }, abortTimeout

	    if (deferred) deferred.promise(xhr)

	    $(script).on('load error', function(e, errorType){
	      clearTimeout(abortTimeout)
	      $(script).off().remove()

	      if (e.type == 'error' || !responseData) {
	        ajaxError(null, errorType || 'error', xhr, options, deferred)
	      } else {
	        ajaxSuccess(responseData[0], xhr, options, deferred)
	      }

	      window[callbackName] = originalCallback
	      if (responseData && $.isFunction(originalCallback))
	        originalCallback(responseData[0])

	      originalCallback = responseData = undefined
	    })

	    if (ajaxBeforeSend(xhr, options) === false) {
	      abort('abort')
	      return xhr
	    }

	    window[callbackName] = function(){
	      responseData = arguments
	    }

	    script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
	    document.head.appendChild(script)

	    if (options.timeout > 0) abortTimeout = setTimeout(function(){
	      abort('timeout')
	    }, options.timeout)

	    return xhr
	  }

	  $.ajaxSettings = {
	    // Default type of request
	    type: 'GET',
	    // Callback that is executed before request
	    beforeSend: empty,
	    // Callback that is executed if the request succeeds
	    success: empty,
	    // Callback that is executed the the server drops error
	    error: empty,
	    // Callback that is executed on request complete (both: error and success)
	    complete: empty,
	    // The context for the callbacks
	    context: null,
	    // Whether to trigger "global" Ajax events
	    global: true,
	    // Transport
	    xhr: function () {
	      return new window.XMLHttpRequest()
	    },
	    // MIME types mapping
	    // IIS returns Javascript as "application/x-javascript"
	    accepts: {
	      script: 'text/javascript, application/javascript, application/x-javascript',
	      json:   jsonType,
	      xml:    'application/xml, text/xml',
	      html:   htmlType,
	      text:   'text/plain'
	    },
	    // Whether the request is to another domain
	    crossDomain: false,
	    // Default timeout
	    timeout: 0,
	    // Whether data should be serialized to string
	    processData: true,
	    // Whether the browser should be allowed to cache GET responses
	    cache: true
	  }

	  function mimeToDataType(mime) {
	    if (mime) mime = mime.split(';', 2)[0]
	    return mime && ( mime == htmlType ? 'html' :
	      mime == jsonType ? 'json' :
	      scriptTypeRE.test(mime) ? 'script' :
	      xmlTypeRE.test(mime) && 'xml' ) || 'text'
	  }

	  function appendQuery(url, query) {
	    if (query == '') return url
	    return (url + '&' + query).replace(/[&?]{1,2}/, '?')
	  }

	  // serialize payload and append it to the URL for GET requests
	  function serializeData(options) {
	    if (options.processData && options.data && $.type(options.data) != "string")
	      options.data = $.param(options.data, options.traditional)
	    if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
	      options.url = appendQuery(options.url, options.data), options.data = undefined
	  }

	  $.ajax = function(options){
	    var settings = $.extend({}, options || {}),
	        deferred = $.Deferred && $.Deferred(),
	        urlAnchor
	    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

	    ajaxStart(settings)

	    if (!settings.crossDomain) {
	      urlAnchor = document.createElement('a')
	      urlAnchor.href = settings.url
	      urlAnchor.href = urlAnchor.href
	      settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host)
	    }

	    if (!settings.url) settings.url = window.location.toString()
	    serializeData(settings)

	    var dataType = settings.dataType, hasPlaceholder = /\?.+=\?/.test(settings.url)
	    if (hasPlaceholder) dataType = 'jsonp'

	    if (settings.cache === false || (
	         (!options || options.cache !== true) &&
	         ('script' == dataType || 'jsonp' == dataType)
	        ))
	      settings.url = appendQuery(settings.url, '_=' + Date.now())

	    if ('jsonp' == dataType) {
	      if (!hasPlaceholder)
	        settings.url = appendQuery(settings.url,
	          settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
	      return $.ajaxJSONP(settings, deferred)
	    }

	    var mime = settings.accepts[dataType],
	        headers = { },
	        setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },
	        protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
	        xhr = settings.xhr(),
	        nativeSetHeader = xhr.setRequestHeader,
	        abortTimeout

	    if (deferred) deferred.promise(xhr)

	    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
	    setHeader('Accept', mime || '*/*')
	    if (mime = settings.mimeType || mime) {
	      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
	      xhr.overrideMimeType && xhr.overrideMimeType(mime)
	    }
	    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
	      setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')

	    if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name])
	    xhr.setRequestHeader = setHeader

	    xhr.onreadystatechange = function(){
	      if (xhr.readyState == 4) {
	        xhr.onreadystatechange = empty
	        clearTimeout(abortTimeout)
	        var result, error = false
	        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
	          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))
	          result = xhr.responseText

	          try {
	            // http://perfectionkills.com/global-eval-what-are-the-options/
	            if (dataType == 'script')    (1,eval)(result)
	            else if (dataType == 'xml')  result = xhr.responseXML
	            else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
	          } catch (e) { error = e }

	          if (error) ajaxError(error, 'parsererror', xhr, settings, deferred)
	          else ajaxSuccess(result, xhr, settings, deferred)
	        } else {
	          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)
	        }
	      }
	    }

	    if (ajaxBeforeSend(xhr, settings) === false) {
	      xhr.abort()
	      ajaxError(null, 'abort', xhr, settings, deferred)
	      return xhr
	    }

	    if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]

	    var async = 'async' in settings ? settings.async : true
	    xhr.open(settings.type, settings.url, async, settings.username, settings.password)

	    for (name in headers) nativeSetHeader.apply(xhr, headers[name])

	    if (settings.timeout > 0) abortTimeout = setTimeout(function(){
	        xhr.onreadystatechange = empty
	        xhr.abort()
	        ajaxError(null, 'timeout', xhr, settings, deferred)
	      }, settings.timeout)

	    // avoid sending empty string (#319)
	    xhr.send(settings.data ? settings.data : null)
	    return xhr
	  }

	  // handle optional data/success arguments
	  function parseArguments(url, data, success, dataType) {
	    if ($.isFunction(data)) dataType = success, success = data, data = undefined
	    if (!$.isFunction(success)) dataType = success, success = undefined
	    return {
	      url: url
	    , data: data
	    , success: success
	    , dataType: dataType
	    }
	  }

	  $.get = function(/* url, data, success, dataType */){
	    return $.ajax(parseArguments.apply(null, arguments))
	  }

	  $.post = function(/* url, data, success, dataType */){
	    var options = parseArguments.apply(null, arguments)
	    options.type = 'POST'
	    return $.ajax(options)
	  }

	  $.getJSON = function(/* url, data, success */){
	    var options = parseArguments.apply(null, arguments)
	    options.dataType = 'json'
	    return $.ajax(options)
	  }

	  $.fn.load = function(url, data, success){
	    if (!this.length) return this
	    var self = this, parts = url.split(/\s/), selector,
	        options = parseArguments(url, data, success),
	        callback = options.success
	    if (parts.length > 1) options.url = parts[0], selector = parts[1]
	    options.success = function(response){
	      self.html(selector ?
	        $('<div>').html(response.replace(rscript, "")).find(selector)
	        : response)
	      callback && callback.apply(self, arguments)
	    }
	    $.ajax(options)
	    return this
	  }

	  var escape = encodeURIComponent

	  function serialize(params, obj, traditional, scope){
	    var type, array = $.isArray(obj), hash = $.isPlainObject(obj)
	    $.each(obj, function(key, value) {
	      type = $.type(value)
	      if (scope) key = traditional ? scope :
	        scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
	      // handle data in serializeArray() format
	      if (!scope && array) params.add(value.name, value.value)
	      // recurse into nested objects
	      else if (type == "array" || (!traditional && type == "object"))
	        serialize(params, value, traditional, key)
	      else params.add(key, value)
	    })
	  }

	  $.param = function(obj, traditional){
	    var params = []
	    params.add = function(key, value) {
	      if ($.isFunction(value)) value = value()
	      if (value == null) value = ""
	      this.push(escape(key) + '=' + escape(value))
	    }
	    serialize(params, obj, traditional)
	    return params.join('&').replace(/%20/g, '+')
	  }
	})(Zepto)

	;(function($){
	  $.fn.serializeArray = function() {
	    var name, type, result = [],
	      add = function(value) {
	        if (value.forEach) return value.forEach(add)
	        result.push({ name: name, value: value })
	      }
	    if (this[0]) $.each(this[0].elements, function(_, field){
	      type = field.type, name = field.name
	      if (name && field.nodeName.toLowerCase() != 'fieldset' &&
	        !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' &&
	        ((type != 'radio' && type != 'checkbox') || field.checked))
	          add($(field).val())
	    })
	    return result
	  }

	  $.fn.serialize = function(){
	    var result = []
	    this.serializeArray().forEach(function(elm){
	      result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))
	    })
	    return result.join('&')
	  }

	  $.fn.submit = function(callback) {
	    if (0 in arguments) this.bind('submit', callback)
	    else if (this.length) {
	      var event = $.Event('submit')
	      this.eq(0).trigger(event)
	      if (!event.isDefaultPrevented()) this.get(0).submit()
	    }
	    return this
	  }

	})(Zepto)

	;(function($){
	  // __proto__ doesn't exist on IE<11, so redefine
	  // the Z function to use object extension instead
	  if (!('__proto__' in {})) {
	    $.extend($.zepto, {
	      Z: function(dom, selector){
	        dom = dom || []
	        $.extend(dom, $.fn)
	        dom.selector = selector || ''
	        dom.__Z = true
	        return dom
	      },
	      // this is a kludge but works
	      isZ: function(object){
	        return $.type(object) === 'array' && '__Z' in object
	      }
	    })
	  }

	  // getComputedStyle shouldn't freak out when called
	  // without a valid element as argument
	  try {
	    getComputedStyle(undefined)
	  } catch(e) {
	    var nativeGetComputedStyle = getComputedStyle;
	    window.getComputedStyle = function(element){
	      try {
	        return nativeGetComputedStyle(element)
	      } catch(e) {
	        return null
	      }
	    }
	  }
	})(Zepto)

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(7);

	//共用头部
	var publics = "http://wx.cheertea.com/";
	if(window.location.host == "wx.cheertea.com") {
	    publics = "http://wx.cheertea.com/";
	} else if(window.location.host == "test.cheertea.com") {
	    publics = "http://test.cheertea.com/";
	} else {
	    publics = "http://192.168.2.21:8080/zxxt_qyy/";
	}

	console.log(publics);
	//var publics = "http://192.168.2.24:8080/zxxt_qyy/widget?";

	 // var publics = "http://wx.cheertea.com/widget?";

	var Ajax = module.exports = function(object) {
		$.ajax({
			url: publics + object.urls,
			xhrFields: {
	            withCredentials: true
	        },
	        crossDomain: true,
	        timeout: object.timeouts,
			type: object.types,
			async: object.asyncs,
			dataType: object.datatypes,
			jsonp: object.jsonps,
			data: object.datas,
			beforeSend: object.beforeSends,
	        success: object.successes,
	        error: function(data) {
	        	console.log(object.urls, object.datas);
	        	// alert("服务器错误！")
	        },
			complete: object.completes
		});
	}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(7);
	var imgChange = __webpack_require__(10);
	var imgchange = new imgChange();

	var imgurl = "http://images.cheertea.com/";

	if(window.location.host == "wx.cheertea.com") {
	    imgurl = "http://images.cheertea.com/";
	} else if(window.location.host == "test.cheertea.com") {
	    imgurl = "http://images.cheertea.com/";
	} else {
	    imgurl = "../images/";
	}
	console.log(imgurl)

	var swiperFun = module.exports = function() {
		if(this instanceof swiperFun) {

		} else {
			return new swiperFun();
		}
	}
	swiperFun.prototype = {
		showBanner: function(names, datas) {
			$(names).append(
				"<div class='swiper-container' id='newimgchange'>" +
					"<div class='swiper-wrapper'>" +
					"</div>" +
					"<div class='swiper-pagination'></div>" +
				"</div>"
			);
			$.each(datas, function(i) {
				$(names).find(".swiper-wrapper").append(
					"<div class='swiper-slide'>" +
						"<a href=" + datas[i].url + ">" +
							"<img src=" + imgchange.show(datas[i].atturl) + " alt=''>" +
						"</a>" +
					"</div>"
				);
			});
	        Echo.init({
	            offset: 200,
	            throttle: 0
	        });
		},
	    showBanner1: function(names, datas) {
	        $(names).append(
	            "<div class='swiper-container' id='newimgchange'>" +
	                "<div class='swiper-wrapper'>" +
	                "</div>" +
	                "<div class='swiper-pagination'></div>" +
	            "</div>"
	        );
	        $.each(datas, function(i) {
	            $(names).find(".swiper-wrapper").append(
	                "<div class='swiper-slide'>" +
	                    "<img src=" + imgchange.show(datas[i].big) + " alt=''>" +
	                "</div>"
	            );
	        });
	        Echo.init({
	            offset: 200,
	            throttle: 0
	        });
	    },
		showTwopath: function(names, datas) {
			$(names).append(
				"<div class='swiper-container twopaths'>" +
					"<div class='swiper-wrapper'>" +
					"</div>" +
				"</div>"
			);
			$.each(datas, function(i) {
				$(names).find(".swiper-wrapper").append(
					"<div class='swiper-slide'>" +
						"<div class='two-pathcon' ids=" + datas[i].goods_id + ">" +
							"<a href='/cn/product_info.html?goods_id=" + datas[i].goods_id + "'>" +
								"<img src='" + imgurl + "/logobgs.png' data-src=" + imgchange.show(datas[i].image) + " alt=''>" +
								"<span class='contents'>" +
									"<p class='two-title'>" + datas[i].name + "</p>" +
									"<div class='two-price clearfix'>" +
										"<span class='newprice'>￥<strong>" + datas[i].price + "</strong>.00</span>" +
									"</div>" +
								"</span>" +
							"</a>" +
						"</div>" +
					"</div>"
				);
			});
	        Echo.init({
	            offset: 200,
	            throttle: 0
	        });
		},
	    showTwopathLimit: function(names, datas) {
		    var index=0;
	        $(names).append(
	            "<div class='swiper-container twopaths'>" +
	            "<div class='swiper-wrapper'>" +
	            "</div>" +
	            "</div>"
	        );
	        $.each(datas, function(i) {
	            if(index<6){
	                $(names).find(".swiper-wrapper").append(
	                    "<div class='swiper-slide'>" +
	                    "<div class='two-pathcon' ids=" + datas[i].goods_id + ">" +
	                    "<a href='/cn/product_info.html?goods_id=" + datas[i].goods_id + "'>" +
	                    "<img src='" + imgurl + "/logobgs.png' data-src=" + imgchange.show(datas[i].image) + " alt=''>" +
	                    "<span class='contents'>" +
	                    "<p class='two-title'>" + datas[i].name + "</p>" +
	                    "<div class='two-price clearfix'>" +
	                    "<span class='newprice'>￥<strong>" + datas[i].price + "</strong>.00</span>" +
	                    "</div>" +
	                    "</span>" +
	                    "</a>" +
	                    "</div>" +
	                    "</div>"
	                );
	                index++;
	            }

	        });
	        $(names).find(".swiper-wrapper").append(
	            "<div class='swiper-slide'>" +
	            "<div class='two-pathcon'>" +
	            "<a href='/cn/cosmetics-goodlist.html'>" +
	            "<img src='" + imgurl + "/cosmetics-more.png' alt=''>" +
	            "</a>" +
	            "</div>" +
	            "</div>"
	        );
	        Echo.init({
	            offset: 200,
	            throttle: 0
	        });
	    },
		showGoodbox: function(names, datas) {
			$(names).append(
				"<div class='recommendgoods clearfix'></div>"
			);
			$.each(datas, function(i) {
				var imgs = datas[i].image || datas[i].original;
				$(names).find(".recommendgoods").append(
					"<div class='recommendgoodscon' ids=" + datas[i].goods_id + ">" +
	                	"<a href='/cn/product_info.html?goods_id=" + datas[i].goods_id + "'>" +
							"<img src='" + imgurl + "logobgs.png' data-src='" + imgchange.show(imgs) + "' alt=''>" +
						"</a>" +
						"<div class='goodsmessage'>" +
							"<div class='messages'>" +
								"<p>" + datas[i].name + "</p>" +
								"<span>￥<em>" + datas[i].price + "</em>.00</span>" +
							"</div>" +
							/*"<div class='goodscar'></div>" +*/
						"</div>" +
					"</div>"
				);
			});
	        Echo.init({
	            offset: 200,
	            throttle: 0
	        });
		},
	    showPrizebox: function(names, datas) {
	        $(names).append(
	            "<div class='recommendgoods clearfix'></div>"
	        );
	        $.each(datas, function(i) {
	            var imgs = datas[i].image || datas[i].original;
	            $(names).find(".recommendgoods").append(
	                "<div class='recommendgoodscon' ids='" + datas[i].goods_id + "'>" +
	                "<a href='/cn/product_info.html?showprize=2&goods_id=" + datas[i].goods_id + "'>" +
	                "<img src='" + imgurl + "logobgs.png' data-src='" + imgchange.show(imgs) + "' alt=''>" +
	                "</a>" +
	                "<div class='goodsmessage'>" +
	                "<div class='messages'>" +
	                "<p>" + datas[i].name + "</p>" +
	                "<span>￥<em>" + datas[i].price + "</em>.00</span>" +
	                "</div>" +
	                /*"<div class='goodscar'></div>" +*/
	                "</div>" +
	                "</div>"
	            );
	        });
	        Echo.init({
	            offset: 200,
	            throttle: 0
	        });
	    },
		showSpecialBox: function(names, datas) {
	        $(names).append(
	            "<div class='recommendgoods clearfix'></div>"
	        );
	        $.each(datas, function(i) {
	            var imgs = datas[i].image || datas[i].original;
	            var prices = datas[i].activity_price || datas[i].price;
	            var links = "/cn/product_info.html?goods_id=" + datas[i].goods_id;
	            if(datas[i].activity_id) {
	                links = "/cn/product_info.html?goods_id=" + datas[i].goods_id + "&activity_id=" + datas[i].activity_id;
				}

	            $(names).find(".recommendgoods").append(
	                "<div class='recommendgoodscon' ids=" + datas[i].goods_id + " acid='" + datas[i].activity_id + "' acpr='" + datas[i].activity_price + "'>" +
	                "<a href='" + links + "'>" +
	                "<img src='" + imgurl + "logobgs.png' data-src='" + imgchange.show(imgs) + "' alt=''>" +
	                "</a>" +
	                "<div class='goodsmessage'>" +
	                "<div class='messages'>" +
	                "<p>" + datas[i].name + "</p>" +
	                "<span>￥<em>" + prices + "</em>.00</span>" +
	                "</div>" +
	                /*"<div class='goodscars'></div>" +*/
	                "</div>" +
	                "</div>"
	            );
	        });
	        Echo.init({
	            offset: 200,
	            throttle: 0
	        });
		},
	    showSpeshopbox: function(names, datas) {
	        $.each(datas, function(i) {
	            var imgs = datas[i].image || datas[i].original;
	            var links = "/cn/product_info.html?goods_id=" + datas[i].goods_id;
	            $(names).append(
	            	"<a href='" + links + "'>" +
						"<div class='speli clearfix'>" +
							"<img src='" + imgchange.show(imgs) + "' alt='' class='speimg'>" +
							"<div class='rightcon'>" +
								"<h3>" + datas[i].name + "</h3>" +
								"<p class='price'>市场价<span>" + datas[i].mktprice + "</span>元</p>" +
								"<p class='nowprice'>惊购价￥<span>" + datas[i].price + "</span></p>" +
							"</div>" +
						"</div>" +
	            	"</a>"
				);
	        });
		},
	    showLjfbox: function(names, datas) {
	        $(names).append(
	            "<div class='recommendgoods clearfix'></div>"
	        );
	        $.each(datas, function(i) {
	            var imgs = datas[i].image || datas[i].original;
	            $(names).find(".recommendgoods").append(
	                "<div class='recommendgoodscon' ids=" + datas[i].goods_id + ">" +
	                	"<a href='/cn/product_info.html?ljf=1&goods_id=" + datas[i].goods_id + "'>" +
	                		"<img src='" + imgurl + "logobgs.png' data-src='" + imgchange.show(imgs) + "' alt=''>" +
						"</a>" +
						"<div class='goodsmessage'>" +
							"<div class='messages'>" +
	                			"<p>" + datas[i].name + "</p>" +
	                			"<span>绿<em>" + datas[i].price + "</em>.00分</span>" +
	                		"</div>" +
	                		/*"<div class='goodscar'></div>" +*/
	                	"</div>" +
						"<div class='messagess'>" +
							"<span>￥<em>" + datas[i].price + "</em>.00</span>" +
						"</div>" +
	                "</div>"
	            );
	        });
	        Echo.init({
	            offset: 200,
	            throttle: 0
	        });
		},
	    // 养身馆
	    Yangsbox: function(names, datas) {
	        $.each(datas, function(i) {
	            if(i < 6) {
	                var imgs = datas[i].image || datas[i].original;
	                var prices = datas[i].activity_price || datas[i].price;
	                var links = "/cn/product_info.html?goods_id=" + datas[i].goods_id + ".html";
	                if(datas[i].activity_id) {
	                    links = "/cn/product_info.html?goods_id=" + datas[i].goods_id + "&activity_id=" + datas[i].activity_id;
	                }

	                $(names).append(
	                    "<div class='three-pathcon' ids='" + datas[i].goods_id + "'>" +
	                    "<a href='/cn/product_info.html?goods_id=" + datas[i].goods_id + "'>" +
	                    "<img src='" + imgurl + "/logobgs.png' data-src=" + imgchange.show(datas[i].image) + " alt=''>" +
	                    "<span class='contents'>" +
	                    "<p class='three-title'>" + datas[i].name + "</p>" +
	                    "<div class='three-price clearfix'>" +
	                    // "<span class='newprice'>绿<strong>" + prices + "</strong>.00分</span>" +
	                    "</div>" +
	                    "<div class='messages'>" +
	                    "<span>￥<em>" + prices + "</em>.00</span>" +
	                    "</div>" +
	                    "</span>" +
	                    "</a>" +
	                    "</div>"
	                );
	            }
	        });
	        Echo.init({
	            offset: 200,
	            throttle: 0
	        });
	    },
		showLjf: function(names, datas) {
	        $.each(datas, function(i) {
	        	if(i < 6) {
	                var imgs = datas[i].image || datas[i].original;
	                var prices = datas[i].activity_price || datas[i].price;
	                var links = "/cn/product_info.html?goods_id=" + datas[i].goods_id;
	                if(datas[i].activity_id) {
	                    links = "/cn/product_info.html?goods_id=" + datas[i].goods_id + "&activity_id=" + datas[i].activity_id;
	                }

	                $(names).append(
	                    "<div class='three-pathcon' ids=" + datas[i].goods_id + ">" +
	                    "<a href='/cn/product_info.html?ljf=1&goods_id=" + datas[i].goods_id + "'>" +
	                    "<img src='" + imgurl + "/logobgs.png' data-src=" + imgchange.show(datas[i].image) + " alt=''>" +
	                    "<span class='contents'>" +
	                    "<p class='three-title'>" + datas[i].name + "</p>" +
	                    "<div class='three-price clearfix'>" +
	                    "<span class='newprice'>绿<strong>" + prices + "</strong>.00分</span>" +
	                    "</div>" +
	                    "<div class='messages'>" +
	                    "<span>￥<em>" + prices + "</em>.00</span>" +
	                    "</div>" +
	                    "</span>" +
	                    "</a>" +
	                    "</div>"
	                );
				}
	        });
	        Echo.init({
	            offset: 200,
	            throttle: 0
	        });
		},
		showFourpath: function(names, datas) {
			$(names).append(
				"<div class='swiper-container swiper-container-horizontal' id='changegoods'>" +
					"<div class='swiper-wrapper'>" +
					"</div>" +
				"</div>"
			);
			$.each(datas, function(i) {
				$(names).find(".swiper-wrapper").append(
					"<div class='swiper-slide'>" +
	            "<div class='changgoodscontents'>" +
	            "<a href=http://wx.cheertea.com/search-cat-" + datas[i].catId + "-.html>" +
	            "<span>" + datas[i].catName + "</span>" +
	            "<em class='trodition'>" + datas[i].catDesc + "</em>" +
	            "<img src='" + imgurl + "logobgs.png' data-src=" + imgchange.show(datas[i].img) + " alt=''>" +
	            "</a>" +
	            "</div>" +
	            "</div>"
				);
			});
	        Echo.init({
	            offset: 200,
	            throttle: 0
	        });
		},
		sortTwo: function(names, datas){
			$.each(datas,function(i){
				$(names).append(
					"<dl>"+
						"<dt>"+
							"<a href=''>" +
								"<img src=" + imgurl + "'logobgs.png' data-src=" + imgchange.show(datas[i].image) + " alt=''>"+
							"</a>" +
						"</dt>" +
						"<dd class='t1'>" +
							"<a href=''>" + datas[i].name +"</a>"+
						"</dd>" +
						"<dd class='t2'>" +
							"<div class='fl'>" +
								"<em>已完成：</em>" + "<i>" + datas[i].goods_id + "</i>"+
							"</div>" +
							"<div class='fr'>"+
								"<a href=''>"+datas[i].goods_id+"</a>"+
							"</div>"+
						"</dd>" +
						"<dd class='t3'>"+
							"<span style='width:"+ datas[i].mktprice +"%" +"'></span>'"+
						"</dd>" +
					"</dl>"
				)
			});
	        Echo.init({
	            offset: 200,
	            throttle: 0
	        });
		},
		newsUp:function(names, datas){
			$(names).append(
				"<div class='swiper-container' id='i-news'>" +
	           	   "<div class='swiper-wrapper'>" +
	           	   "</div>" +
	            "</div>"
	            );
			$.each(datas,function(i){
				$(names).find(".swiper-wrapper").append(
					"<div class='swiper-slide'>" +  datas[i].name + "</div>"
				)
			});
	        Echo.init({
	            offset: 200,
	            throttle: 0
	        });
		},
		showArea: function(names, datas) {

		},
	 	showShop: function(names, datas, small) {
			$.each(datas, function(i) {
	            var imgs = datas[i].com_image ? imgchange.show(datas[i].com_image) : "http://files.cheertea.com/statics/attachment/cheertea_logo.jpg";
	            $(".shopcontentbox").append(
					"<div class='shopcontent'>" +
						"<a href='http://wx.cheertea.com/wxshop-" + datas[i].com_id + ".html'>" +
							"<div class='shop-con'>" +
								"<div class='shoptitle clearfix'>" +
									"<img src='" + imgs + "' alt=''>" +
									"<div class='names'>" +
										"<span class='shopname'>" + datas[i].com_name +"</span>" +
									"</div>" +
									"<span class='entershop'>进入店铺</span>" +
								"</div>" +
							"</div>" +
						"</a>" +
						"<div class='logobanner'>" +
							"<a href=''>" +
								"<img data-src='" + imgchange.show(datas[i].com_banner) + "' src='../logobanner1.png' alt=''>" +
							"</a>" +
						"</div>" +
						"<div class='twopathcontent'>" +
							"<div class='swiper-container' id='shoptwopaths'>" +
								"<div class='swiper-wrapper'>" +

	                			"</div>" +
	                		"</div>" +
	               		 "</div>" +
	                "</div>"
				);

				$.each(datas[i][small], function(j) {
	                $(".shopcontent").eq(i).find(".twopathcontent .swiper-wrapper").append(
						"<div class='swiper-slide'>" +
							"<div class='two-pathcon'>" +
								"<a href=''>" +
									"<img data-src='" + imgchange.show(datas[i][small][j].small) + "' src='../logobanner1.png' alt=''>" +
									"<span class='contents'>" +
										"<p class='two-title'>" + datas[i][small][j].name + "</p>" +
										"<div class='two-price clearfix'>" +
											"<span class='newprice'>￥<strong>" + datas[i][small][j].price + "</strong></span>" +
										"</div>" +
									"</span>" +
								"</a>" +
							"</div>" +
						"</div>"
					);
	            });
			});
		},

	 	appendGoods: function() {
			console.log($(".recommendgoods"));
		}
	}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	    var $ = __webpack_require__(7);

	    var imgChange = module.exports = function() {
	        //cdn
	        //this.imgurl = "http://files.cheertea.com/statics/";

	        // this.imgurl = "../images/";

	        if(window.location.host == "wx.cheertea.com") {
	            this.imgurl = "http://files.cheertea.com/statics/";
	        } else if(window.location.host == "test.cheertea.com") {
	            this.imgurl = "http://files.cheertea.com/statics/";
	        } else {
	            // this.imgurl = "../images/";
	            this.imgurl = "http://files.cheertea.com/statics/";
	        }

	       if(this instanceof imgChange) {

	       } else {
	           return new imgChange();
	       }
	    }
	    imgChange.prototype = {
	        show: function(imgurls) {
	            var _this = this;

	            if(imgurls) {
	                imgurls = imgurls.replace("fs:/", _this.imgurl);
	            }
	            return imgurls;
	        }
	    }


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(7);
	var Ajax = __webpack_require__(8);

	var isLogin = module.exports = {
	    showFocus: function() {
	        var _this = this;
	        var datas = 0;
	        //判断用户是否登录
	        Ajax({
	            urls: "member/login!isLogin.do",
	            types: "get",
	            asyncs: false,
	            timeouts: 1000 * 10,
	            dataTypes: "json",
	            successes: function(data) {
	                datas = JSON.parse(data);
	                console.log(datas);
	                if(datas.res_code == 0) {
	                    //$("body").append(
	                    //    "<div class='focusbox'>" +
	                    //    "<div class='innerboxbg'></div>" +
	                    //    "<div class='innerbox clearfix'>" +
	                    //    "<p class='focustit'>" +
	                    //    "您尚未登录，请<a href='../cn/login.html'>登录</a>" +
	                    //    "</p>" +
	                    //    "<span class='focubtn'>关注我们</span>" +
	                    //    "</div>" +
	                    //    "</div>"
	                    //);
	                    //if(datas.message == "会员未登录") {
	                    //    window.location.href = "../cn/login.html";
	                    //}
	                } else if(datas.res_code == 1) {
	                    //if(datas.member.subscribe == 0) {
	                    //    $("body").append(
	                    //        "<div class='focusbox'>" +
	                    //        "<div class='innerboxbg'></div>" +
	                    //        "<div class='innerbox clearfix'>" +
	                    //        "<div class='innerlogbox'>" +
	                    //        "<img src=" + imgchange.show(datas.member.weixin_face) + " alt='' class='roleimg'>" +
	                    //        "<p class='newtext'><span calss='rolename'>" + datas.member.uname + "</span>,欢迎回来！</p>" +
	                    //        "</div>" +
	                    //        "<span class='focubtn'>关注我们</span>" +
	                    //        "</div>" +
	                    //        "</div>"
	                    //    );
	                    //
	                }

	                //点击关注
	                $("body").on("touchstart", ".focubtn", function(event) {
	                    event.preventDefault();
	                    $("body").append(
	                        "<div class='isDelete'>" +
	                        "<img src='../qyy.png' alt='' class='qrimg'>" +
	                        "</div>"
	                    );

	                    //修改img路径
	                    $("body").find(".qrimg").attr("src", ($("body").find(".qrimg").attr("src")).replace("../", _this.imgurl));
	                });
	            },
	            errors: function(data) {
	                console.log(data);
	            }
	        });
	        return datas.res_code;
	    },
	    showData: function() {
	        Ajax({
	            urls: "member/login!isLogin.do",
	            types: "get",
	            asyncs: false,
	            timeouts: 1000 * 10,
	            dataTypes: "json",
	            successes: function(data) {
	                datas = JSON.parse(data);
	                console.log(datas);
	            }
	        });
	        return datas;
	    }
	}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	/*!
	 *  Echo v1.4.0
	 *  Lazy-loading with data-* attributes, offsets and throttle options
	 *  Project: https://github.com/toddmotto/echo
	 *  by Todd Motto: http://toddmotto.com
	 *  Copyright. MIT licensed.
	 */
	window.Echo = (function(window, document, undefined) {

		'use strict';

		var store = [],
		offset,
		throttle,
		poll;

		var _inView = function(el) {
			var coords = el.getBoundingClientRect();
			return ((coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight) + parseInt(offset));
		};

		var _pollImages = function() {
			for (var i = store.length; i--;) {
				var self = store[i];
				if (_inView(self)) {
					self.src = self.getAttribute('data-src');
					store.splice(i, 1);
				}
			}
		};

		var _throttle = function() {
			clearTimeout(poll);
			poll = setTimeout(_pollImages, throttle);
		};

		var init = function(obj) {
			var nodes = document.querySelectorAll('[data-src]');
			var opts = obj || {};
			offset = opts.offset || 0;
			throttle = opts.throttle || 250;

			for (var i = 0; i < nodes.length; i++) {
				store.push(nodes[i]);
			}

			_throttle();

			if (document.addEventListener) {
				window.addEventListener('scroll', _throttle, false);
			} else {
				window.attachEvent('onscroll', _throttle);
			}
		};

		return {
			init: init,
			render: _throttle
		};

	})(window, document);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	var Zepto = __webpack_require__(7);

	;(function($){
	  var touch = {},
	    touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,
	    longTapDelay = 750,
	    gesture

	  function swipeDirection(x1, x2, y1, y2) {
	    return Math.abs(x1 - x2) >=
	      Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
	  }

	  function longTap() {
	    longTapTimeout = null
	    if (touch.last) {
	      touch.el.trigger('longTap')
	      touch = {}
	    }
	  }

	  function cancelLongTap() {
	    if (longTapTimeout) clearTimeout(longTapTimeout)
	    longTapTimeout = null
	  }

	  function cancelAll() {
	    if (touchTimeout) clearTimeout(touchTimeout)
	    if (tapTimeout) clearTimeout(tapTimeout)
	    if (swipeTimeout) clearTimeout(swipeTimeout)
	    if (longTapTimeout) clearTimeout(longTapTimeout)
	    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
	    touch = {}
	  }

	  function isPrimaryTouch(event){
	    return (event.pointerType == 'touch' ||
	      event.pointerType == event.MSPOINTER_TYPE_TOUCH)
	      && event.isPrimary
	  }

	  function isPointerEventType(e, type){
	    return (e.type == 'pointer'+type ||
	      e.type.toLowerCase() == 'mspointer'+type)
	  }

	  $(document).ready(function(){
	    var now, delta, deltaX = 0, deltaY = 0, firstTouch, _isPointerType

	    if ('MSGesture' in window) {
	      gesture = new MSGesture()
	      gesture.target = document.body
	    }

	    $(document)
	      .bind('MSGestureEnd', function(e){
	        var swipeDirectionFromVelocity =
	          e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null;
	        if (swipeDirectionFromVelocity) {
	          touch.el.trigger('swipe')
	          touch.el.trigger('swipe'+ swipeDirectionFromVelocity)
	        }
	      })
	      .on('touchstart MSPointerDown pointerdown', function(e){
	        if((_isPointerType = isPointerEventType(e, 'down')) &&
	          !isPrimaryTouch(e)) return
	        firstTouch = _isPointerType ? e : e.touches[0]
	        if (e.touches && e.touches.length === 1 && touch.x2) {
	          // Clear out touch movement data if we have it sticking around
	          // This can occur if touchcancel doesn't fire due to preventDefault, etc.
	          touch.x2 = undefined
	          touch.y2 = undefined
	        }
	        now = Date.now()
	        delta = now - (touch.last || now)
	        touch.el = $('tagName' in firstTouch.target ?
	          firstTouch.target : firstTouch.target.parentNode)
	        touchTimeout && clearTimeout(touchTimeout)
	        touch.x1 = firstTouch.pageX
	        touch.y1 = firstTouch.pageY
	        if (delta > 0 && delta <= 250) touch.isDoubleTap = true
	        touch.last = now
	        longTapTimeout = setTimeout(longTap, longTapDelay)
	        // adds the current touch contact for IE gesture recognition
	        if (gesture && _isPointerType) gesture.addPointer(e.pointerId);
	      })
	      .on('touchmove MSPointerMove pointermove', function(e){
	        if((_isPointerType = isPointerEventType(e, 'move')) &&
	          !isPrimaryTouch(e)) return
	        firstTouch = _isPointerType ? e : e.touches[0]
	        cancelLongTap()
	        touch.x2 = firstTouch.pageX
	        touch.y2 = firstTouch.pageY

	        deltaX += Math.abs(touch.x1 - touch.x2)
	        deltaY += Math.abs(touch.y1 - touch.y2)
	      })
	      .on('touchend MSPointerUp pointerup', function(e){
	        if((_isPointerType = isPointerEventType(e, 'up')) &&
	          !isPrimaryTouch(e)) return
	        cancelLongTap()

	        // swipe
	        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
	            (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30))

	          swipeTimeout = setTimeout(function() {
	            touch.el.trigger('swipe')
	            touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
	            touch = {}
	          }, 0)

	        // normal tap
	        else if ('last' in touch)
	          // don't fire tap when delta position changed by more than 30 pixels,
	          // for instance when moving to a point and back to origin
	          if (deltaX < 30 && deltaY < 30) {
	            // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
	            // ('tap' fires before 'scroll')
	            tapTimeout = setTimeout(function() {

	              // trigger universal 'tap' with the option to cancelTouch()
	              // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
	              var event = $.Event('tap')
	              event.cancelTouch = cancelAll
	              touch.el.trigger(event)

	              // trigger double tap immediately
	              if (touch.isDoubleTap) {
	                if (touch.el) touch.el.trigger('doubleTap')
	                touch = {}
	              }

	              // trigger single tap after 250ms of inactivity
	              else {
	                touchTimeout = setTimeout(function(){
	                  touchTimeout = null
	                  if (touch.el) touch.el.trigger('singleTap')
	                  touch = {}
	                }, 250)
	              }
	            }, 0)
	          } else {
	            touch = {}
	          }
	          deltaX = deltaY = 0

	      })
	      // when the browser window loses focus,
	      // for example when a modal dialog is shown,
	      // cancel all ongoing events
	      .on('touchcancel MSPointerCancel pointercancel', cancelAll)

	    // scrolling the window indicates intention of the user
	    // to scroll, not tap or swipe, so cancel all ongoing events
	    $(window).on('scroll', cancelAll)
	  })

	  ;['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown',
	    'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(eventName){
	    $.fn[eventName] = function(callback){ return this.on(eventName, callback) }
	  })
	})(Zepto)


/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(20);
	__webpack_require__(21);

	var datetime = module.exports = function() {
	    if(this instanceof datetime) {

	    } else {
	        return new datetime();
	    }
	}
	datetime.prototype = {
	    constructor: datetime,
	    date_time: function() {
	        //订餐日期选择
	        var currYear = (new Date()).getFullYear();  
	        var opt={};
	        opt.date = {preset : 'date'};
	        opt.datetime = {preset : 'datetime'};
	        opt.time = {preset : 'time'};
	        opt.default = {
	            theme: 'android-ics light', //皮肤样式
	            display: 'modal', //显示方式 
	            mode: 'scroller', //日期选择模式
	            dateFormat: 'yyyy-mm-dd',
	            lang: 'zh',
	            showNow: true,
	            nowText: "今天",
	            startYear: currYear-10, //开始年份
	            endYear: currYear + 20 //结束年份
	        };
	        // $(".book_time").mobiscroll($.extend(opt['date'], opt['default'])).time($.extend(opt['time'], opt['default']));       //只显示时间
	        $(".book_time").mobiscroll($.extend(opt['date'], opt['default']));//只显示日期
	        return this;
	    }
	}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! jQuery v1.8.2 jquery.com | jquery.org/license */
	(function(a,b){function G(a){var b=F[a]={};return p.each(a.split(s),function(a,c){b[c]=!0}),b}function J(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(I,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:+d+""===d?+d:H.test(d)?p.parseJSON(d):d}catch(f){}p.data(a,c,d)}else d=b}return d}function K(a){var b;for(b in a){if(b==="data"&&p.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function ba(){return!1}function bb(){return!0}function bh(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function bi(a,b){do a=a[b];while(a&&a.nodeType!==1);return a}function bj(a,b,c){b=b||0;if(p.isFunction(b))return p.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return p.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=p.grep(a,function(a){return a.nodeType===1});if(be.test(b))return p.filter(b,d,!c);b=p.filter(b,d)}return p.grep(a,function(a,d){return p.inArray(a,b)>=0===c})}function bk(a){var b=bl.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function bC(a,b){return a.getElementsByTagName(b)[0]||a.appendChild(a.ownerDocument.createElement(b))}function bD(a,b){if(b.nodeType!==1||!p.hasData(a))return;var c,d,e,f=p._data(a),g=p._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;d<e;d++)p.event.add(b,c,h[c][d])}g.data&&(g.data=p.extend({},g.data))}function bE(a,b){var c;if(b.nodeType!==1)return;b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?(b.parentNode&&(b.outerHTML=a.outerHTML),p.support.html5Clone&&a.innerHTML&&!p.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):c==="input"&&bv.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text),b.removeAttribute(p.expando)}function bF(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bG(a){bv.test(a.type)&&(a.defaultChecked=a.checked)}function bY(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=bW.length;while(e--){b=bW[e]+c;if(b in a)return b}return d}function bZ(a,b){return a=b||a,p.css(a,"display")==="none"||!p.contains(a.ownerDocument,a)}function b$(a,b){var c,d,e=[],f=0,g=a.length;for(;f<g;f++){c=a[f];if(!c.style)continue;e[f]=p._data(c,"olddisplay"),b?(!e[f]&&c.style.display==="none"&&(c.style.display=""),c.style.display===""&&bZ(c)&&(e[f]=p._data(c,"olddisplay",cc(c.nodeName)))):(d=bH(c,"display"),!e[f]&&d!=="none"&&p._data(c,"olddisplay",d))}for(f=0;f<g;f++){c=a[f];if(!c.style)continue;if(!b||c.style.display==="none"||c.style.display==="")c.style.display=b?e[f]||"":"none"}return a}function b_(a,b,c){var d=bP.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function ca(a,b,c,d){var e=c===(d?"border":"content")?4:b==="width"?1:0,f=0;for(;e<4;e+=2)c==="margin"&&(f+=p.css(a,c+bV[e],!0)),d?(c==="content"&&(f-=parseFloat(bH(a,"padding"+bV[e]))||0),c!=="margin"&&(f-=parseFloat(bH(a,"border"+bV[e]+"Width"))||0)):(f+=parseFloat(bH(a,"padding"+bV[e]))||0,c!=="padding"&&(f+=parseFloat(bH(a,"border"+bV[e]+"Width"))||0));return f}function cb(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=!0,f=p.support.boxSizing&&p.css(a,"boxSizing")==="border-box";if(d<=0||d==null){d=bH(a,b);if(d<0||d==null)d=a.style[b];if(bQ.test(d))return d;e=f&&(p.support.boxSizingReliable||d===a.style[b]),d=parseFloat(d)||0}return d+ca(a,b,c||(f?"border":"content"),e)+"px"}function cc(a){if(bS[a])return bS[a];var b=p("<"+a+">").appendTo(e.body),c=b.css("display");b.remove();if(c==="none"||c===""){bI=e.body.appendChild(bI||p.extend(e.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!bJ||!bI.createElement)bJ=(bI.contentWindow||bI.contentDocument).document,bJ.write("<!doctype html><html><body>"),bJ.close();b=bJ.body.appendChild(bJ.createElement(a)),c=bH(b,"display"),e.body.removeChild(bI)}return bS[a]=c,c}function ci(a,b,c,d){var e;if(p.isArray(b))p.each(b,function(b,e){c||ce.test(a)?d(a,e):ci(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&p.type(b)==="object")for(e in b)ci(a+"["+e+"]",b[e],c,d);else d(a,b)}function cz(a){return function(b,c){typeof b!="string"&&(c=b,b="*");var d,e,f,g=b.toLowerCase().split(s),h=0,i=g.length;if(p.isFunction(c))for(;h<i;h++)d=g[h],f=/^\+/.test(d),f&&(d=d.substr(1)||"*"),e=a[d]=a[d]||[],e[f?"unshift":"push"](c)}}function cA(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h,i=a[f],j=0,k=i?i.length:0,l=a===cv;for(;j<k&&(l||!h);j++)h=i[j](c,d,e),typeof h=="string"&&(!l||g[h]?h=b:(c.dataTypes.unshift(h),h=cA(a,c,d,e,h,g)));return(l||!h)&&!g["*"]&&(h=cA(a,c,d,e,"*",g)),h}function cB(a,c){var d,e,f=p.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((f[d]?a:e||(e={}))[d]=c[d]);e&&p.extend(!0,a,e)}function cC(a,c,d){var e,f,g,h,i=a.contents,j=a.dataTypes,k=a.responseFields;for(f in k)f in d&&(c[k[f]]=d[f]);while(j[0]==="*")j.shift(),e===b&&(e=a.mimeType||c.getResponseHeader("content-type"));if(e)for(f in i)if(i[f]&&i[f].test(e)){j.unshift(f);break}if(j[0]in d)g=j[0];else{for(f in d){if(!j[0]||a.converters[f+" "+j[0]]){g=f;break}h||(h=f)}g=g||h}if(g)return g!==j[0]&&j.unshift(g),d[g]}function cD(a,b){var c,d,e,f,g=a.dataTypes.slice(),h=g[0],i={},j=0;a.dataFilter&&(b=a.dataFilter(b,a.dataType));if(g[1])for(c in a.converters)i[c.toLowerCase()]=a.converters[c];for(;e=g[++j];)if(e!=="*"){if(h!=="*"&&h!==e){c=i[h+" "+e]||i["* "+e];if(!c)for(d in i){f=d.split(" ");if(f[1]===e){c=i[h+" "+f[0]]||i["* "+f[0]];if(c){c===!0?c=i[d]:i[d]!==!0&&(e=f[0],g.splice(j--,0,e));break}}}if(c!==!0)if(c&&a["throws"])b=c(b);else try{b=c(b)}catch(k){return{state:"parsererror",error:c?k:"No conversion from "+h+" to "+e}}}h=e}return{state:"success",data:b}}function cL(){try{return new a.XMLHttpRequest}catch(b){}}function cM(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function cU(){return setTimeout(function(){cN=b},0),cN=p.now()}function cV(a,b){p.each(b,function(b,c){var d=(cT[b]||[]).concat(cT["*"]),e=0,f=d.length;for(;e<f;e++)if(d[e].call(a,b,c))return})}function cW(a,b,c){var d,e=0,f=0,g=cS.length,h=p.Deferred().always(function(){delete i.elem}),i=function(){var b=cN||cU(),c=Math.max(0,j.startTime+j.duration-b),d=1-(c/j.duration||0),e=0,f=j.tweens.length;for(;e<f;e++)j.tweens[e].run(d);return h.notifyWith(a,[j,d,c]),d<1&&f?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:p.extend({},b),opts:p.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:cN||cU(),duration:c.duration,tweens:[],createTween:function(b,c,d){var e=p.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(e),e},stop:function(b){var c=0,d=b?j.tweens.length:0;for(;c<d;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;cX(k,j.opts.specialEasing);for(;e<g;e++){d=cS[e].call(j,a,k,j.opts);if(d)return d}return cV(j,k),p.isFunction(j.opts.start)&&j.opts.start.call(a,j),p.fx.timer(p.extend(i,{anim:j,queue:j.opts.queue,elem:a})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}function cX(a,b){var c,d,e,f,g;for(c in a){d=p.camelCase(c),e=b[d],f=a[c],p.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=p.cssHooks[d];if(g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}}function cY(a,b,c){var d,e,f,g,h,i,j,k,l=this,m=a.style,n={},o=[],q=a.nodeType&&bZ(a);c.queue||(j=p._queueHooks(a,"fx"),j.unqueued==null&&(j.unqueued=0,k=j.empty.fire,j.empty.fire=function(){j.unqueued||k()}),j.unqueued++,l.always(function(){l.always(function(){j.unqueued--,p.queue(a,"fx").length||j.empty.fire()})})),a.nodeType===1&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],p.css(a,"display")==="inline"&&p.css(a,"float")==="none"&&(!p.support.inlineBlockNeedsLayout||cc(a.nodeName)==="inline"?m.display="inline-block":m.zoom=1)),c.overflow&&(m.overflow="hidden",p.support.shrinkWrapBlocks||l.done(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b){f=b[d];if(cP.exec(f)){delete b[d];if(f===(q?"hide":"show"))continue;o.push(d)}}g=o.length;if(g){h=p._data(a,"fxshow")||p._data(a,"fxshow",{}),q?p(a).show():l.done(function(){p(a).hide()}),l.done(function(){var b;p.removeData(a,"fxshow",!0);for(b in n)p.style(a,b,n[b])});for(d=0;d<g;d++)e=o[d],i=l.createTween(e,q?h[e]:0),n[e]=h[e]||p.style(a,e),e in h||(h[e]=i.start,q&&(i.end=i.start,i.start=e==="width"||e==="height"?1:0))}}function cZ(a,b,c,d,e){return new cZ.prototype.init(a,b,c,d,e)}function c$(a,b){var c,d={height:a},e=0;b=b?1:0;for(;e<4;e+=2-b)c=bV[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function da(a){return p.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}var c,d,e=a.document,f=a.location,g=a.navigator,h=a.jQuery,i=a.$,j=Array.prototype.push,k=Array.prototype.slice,l=Array.prototype.indexOf,m=Object.prototype.toString,n=Object.prototype.hasOwnProperty,o=String.prototype.trim,p=function(a,b){return new p.fn.init(a,b,c)},q=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,r=/\S/,s=/\s+/,t=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,u=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,y=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,z=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,A=/^-ms-/,B=/-([\da-z])/gi,C=function(a,b){return(b+"").toUpperCase()},D=function(){e.addEventListener?(e.removeEventListener("DOMContentLoaded",D,!1),p.ready()):e.readyState==="complete"&&(e.detachEvent("onreadystatechange",D),p.ready())},E={};p.fn=p.prototype={constructor:p,init:function(a,c,d){var f,g,h,i;if(!a)return this;if(a.nodeType)return this.context=this[0]=a,this.length=1,this;if(typeof a=="string"){a.charAt(0)==="<"&&a.charAt(a.length-1)===">"&&a.length>=3?f=[null,a,null]:f=u.exec(a);if(f&&(f[1]||!c)){if(f[1])return c=c instanceof p?c[0]:c,i=c&&c.nodeType?c.ownerDocument||c:e,a=p.parseHTML(f[1],i,!0),v.test(f[1])&&p.isPlainObject(c)&&this.attr.call(a,c,!0),p.merge(this,a);g=e.getElementById(f[2]);if(g&&g.parentNode){if(g.id!==f[2])return d.find(a);this.length=1,this[0]=g}return this.context=e,this.selector=a,this}return!c||c.jquery?(c||d).find(a):this.constructor(c).find(a)}return p.isFunction(a)?d.ready(a):(a.selector!==b&&(this.selector=a.selector,this.context=a.context),p.makeArray(a,this))},selector:"",jquery:"1.8.2",length:0,size:function(){return this.length},toArray:function(){return k.call(this)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=p.merge(this.constructor(),a);return d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")"),d},each:function(a,b){return p.each(this,a,b)},ready:function(a){return p.ready.promise().done(a),this},eq:function(a){return a=+a,a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(k.apply(this,arguments),"slice",k.call(arguments).join(","))},map:function(a){return this.pushStack(p.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:j,sort:[].sort,splice:[].splice},p.fn.init.prototype=p.fn,p.extend=p.fn.extend=function(){var a,c,d,e,f,g,h=arguments[0]||{},i=1,j=arguments.length,k=!1;typeof h=="boolean"&&(k=h,h=arguments[1]||{},i=2),typeof h!="object"&&!p.isFunction(h)&&(h={}),j===i&&(h=this,--i);for(;i<j;i++)if((a=arguments[i])!=null)for(c in a){d=h[c],e=a[c];if(h===e)continue;k&&e&&(p.isPlainObject(e)||(f=p.isArray(e)))?(f?(f=!1,g=d&&p.isArray(d)?d:[]):g=d&&p.isPlainObject(d)?d:{},h[c]=p.extend(k,g,e)):e!==b&&(h[c]=e)}return h},p.extend({noConflict:function(b){return a.$===p&&(a.$=i),b&&a.jQuery===p&&(a.jQuery=h),p},isReady:!1,readyWait:1,holdReady:function(a){a?p.readyWait++:p.ready(!0)},ready:function(a){if(a===!0?--p.readyWait:p.isReady)return;if(!e.body)return setTimeout(p.ready,1);p.isReady=!0;if(a!==!0&&--p.readyWait>0)return;d.resolveWith(e,[p]),p.fn.trigger&&p(e).trigger("ready").off("ready")},isFunction:function(a){return p.type(a)==="function"},isArray:Array.isArray||function(a){return p.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):E[m.call(a)]||"object"},isPlainObject:function(a){if(!a||p.type(a)!=="object"||a.nodeType||p.isWindow(a))return!1;try{if(a.constructor&&!n.call(a,"constructor")&&!n.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||n.call(a,d)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},error:function(a){throw new Error(a)},parseHTML:function(a,b,c){var d;return!a||typeof a!="string"?null:(typeof b=="boolean"&&(c=b,b=0),b=b||e,(d=v.exec(a))?[b.createElement(d[1])]:(d=p.buildFragment([a],b,c?null:[]),p.merge([],(d.cacheable?p.clone(d.fragment):d.fragment).childNodes)))},parseJSON:function(b){if(!b||typeof b!="string")return null;b=p.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(w.test(b.replace(y,"@").replace(z,"]").replace(x,"")))return(new Function("return "+b))();p.error("Invalid JSON: "+b)},parseXML:function(c){var d,e;if(!c||typeof c!="string")return null;try{a.DOMParser?(e=new DOMParser,d=e.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(f){d=b}return(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&p.error("Invalid XML: "+c),d},noop:function(){},globalEval:function(b){b&&r.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(A,"ms-").replace(B,C)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,c,d){var e,f=0,g=a.length,h=g===b||p.isFunction(a);if(d){if(h){for(e in a)if(c.apply(a[e],d)===!1)break}else for(;f<g;)if(c.apply(a[f++],d)===!1)break}else if(h){for(e in a)if(c.call(a[e],e,a[e])===!1)break}else for(;f<g;)if(c.call(a[f],f,a[f++])===!1)break;return a},trim:o&&!o.call("﻿ ")?function(a){return a==null?"":o.call(a)}:function(a){return a==null?"":(a+"").replace(t,"")},makeArray:function(a,b){var c,d=b||[];return a!=null&&(c=p.type(a),a.length==null||c==="string"||c==="function"||c==="regexp"||p.isWindow(a)?j.call(d,a):p.merge(d,a)),d},inArray:function(a,b,c){var d;if(b){if(l)return l.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=c.length,e=a.length,f=0;if(typeof d=="number")for(;f<d;f++)a[e++]=c[f];else while(c[f]!==b)a[e++]=c[f++];return a.length=e,a},grep:function(a,b,c){var d,e=[],f=0,g=a.length;c=!!c;for(;f<g;f++)d=!!b(a[f],f),c!==d&&e.push(a[f]);return e},map:function(a,c,d){var e,f,g=[],h=0,i=a.length,j=a instanceof p||i!==b&&typeof i=="number"&&(i>0&&a[0]&&a[i-1]||i===0||p.isArray(a));if(j)for(;h<i;h++)e=c(a[h],h,d),e!=null&&(g[g.length]=e);else for(f in a)e=c(a[f],f,d),e!=null&&(g[g.length]=e);return g.concat.apply([],g)},guid:1,proxy:function(a,c){var d,e,f;return typeof c=="string"&&(d=a[c],c=a,a=d),p.isFunction(a)?(e=k.call(arguments,2),f=function(){return a.apply(c,e.concat(k.call(arguments)))},f.guid=a.guid=a.guid||p.guid++,f):b},access:function(a,c,d,e,f,g,h){var i,j=d==null,k=0,l=a.length;if(d&&typeof d=="object"){for(k in d)p.access(a,c,k,d[k],1,g,e);f=1}else if(e!==b){i=h===b&&p.isFunction(e),j&&(i?(i=c,c=function(a,b,c){return i.call(p(a),c)}):(c.call(a,e),c=null));if(c)for(;k<l;k++)c(a[k],d,i?e.call(a[k],k,c(a[k],d)):e,h);f=1}return f?a:j?c.call(a):l?c(a[0],d):g},now:function(){return(new Date).getTime()}}),p.ready.promise=function(b){if(!d){d=p.Deferred();if(e.readyState==="complete")setTimeout(p.ready,1);else if(e.addEventListener)e.addEventListener("DOMContentLoaded",D,!1),a.addEventListener("load",p.ready,!1);else{e.attachEvent("onreadystatechange",D),a.attachEvent("onload",p.ready);var c=!1;try{c=a.frameElement==null&&e.documentElement}catch(f){}c&&c.doScroll&&function g(){if(!p.isReady){try{c.doScroll("left")}catch(a){return setTimeout(g,50)}p.ready()}}()}}return d.promise(b)},p.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){E["[object "+b+"]"]=b.toLowerCase()}),c=p(e);var F={};p.Callbacks=function(a){a=typeof a=="string"?F[a]||G(a):p.extend({},a);var c,d,e,f,g,h,i=[],j=!a.once&&[],k=function(b){c=a.memory&&b,d=!0,h=f||0,f=0,g=i.length,e=!0;for(;i&&h<g;h++)if(i[h].apply(b[0],b[1])===!1&&a.stopOnFalse){c=!1;break}e=!1,i&&(j?j.length&&k(j.shift()):c?i=[]:l.disable())},l={add:function(){if(i){var b=i.length;(function d(b){p.each(b,function(b,c){var e=p.type(c);e==="function"&&(!a.unique||!l.has(c))?i.push(c):c&&c.length&&e!=="string"&&d(c)})})(arguments),e?g=i.length:c&&(f=b,k(c))}return this},remove:function(){return i&&p.each(arguments,function(a,b){var c;while((c=p.inArray(b,i,c))>-1)i.splice(c,1),e&&(c<=g&&g--,c<=h&&h--)}),this},has:function(a){return p.inArray(a,i)>-1},empty:function(){return i=[],this},disable:function(){return i=j=c=b,this},disabled:function(){return!i},lock:function(){return j=b,c||l.disable(),this},locked:function(){return!j},fireWith:function(a,b){return b=b||[],b=[a,b.slice?b.slice():b],i&&(!d||j)&&(e?j.push(b):k(b)),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!d}};return l},p.extend({Deferred:function(a){var b=[["resolve","done",p.Callbacks("once memory"),"resolved"],["reject","fail",p.Callbacks("once memory"),"rejected"],["notify","progress",p.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return p.Deferred(function(c){p.each(b,function(b,d){var f=d[0],g=a[b];e[d[1]](p.isFunction(g)?function(){var a=g.apply(this,arguments);a&&p.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f+"With"](this===e?c:this,[a])}:c[f])}),a=null}).promise()},promise:function(a){return a!=null?p.extend(a,d):d}},e={};return d.pipe=d.then,p.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[a^1][2].disable,b[2][2].lock),e[f[0]]=g.fire,e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=k.call(arguments),d=c.length,e=d!==1||a&&p.isFunction(a.promise)?d:0,f=e===1?a:p.Deferred(),g=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?k.call(arguments):d,c===h?f.notifyWith(b,c):--e||f.resolveWith(b,c)}},h,i,j;if(d>1){h=new Array(d),i=new Array(d),j=new Array(d);for(;b<d;b++)c[b]&&p.isFunction(c[b].promise)?c[b].promise().done(g(b,j,c)).fail(f.reject).progress(g(b,i,h)):--e}return e||f.resolveWith(j,c),f.promise()}}),p.support=function(){var b,c,d,f,g,h,i,j,k,l,m,n=e.createElement("div");n.setAttribute("className","t"),n.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",c=n.getElementsByTagName("*"),d=n.getElementsByTagName("a")[0],d.style.cssText="top:1px;float:left;opacity:.5";if(!c||!c.length)return{};f=e.createElement("select"),g=f.appendChild(e.createElement("option")),h=n.getElementsByTagName("input")[0],b={leadingWhitespace:n.firstChild.nodeType===3,tbody:!n.getElementsByTagName("tbody").length,htmlSerialize:!!n.getElementsByTagName("link").length,style:/top/.test(d.getAttribute("style")),hrefNormalized:d.getAttribute("href")==="/a",opacity:/^0.5/.test(d.style.opacity),cssFloat:!!d.style.cssFloat,checkOn:h.value==="on",optSelected:g.selected,getSetAttribute:n.className!=="t",enctype:!!e.createElement("form").enctype,html5Clone:e.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:e.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},h.checked=!0,b.noCloneChecked=h.cloneNode(!0).checked,f.disabled=!0,b.optDisabled=!g.disabled;try{delete n.test}catch(o){b.deleteExpando=!1}!n.addEventListener&&n.attachEvent&&n.fireEvent&&(n.attachEvent("onclick",m=function(){b.noCloneEvent=!1}),n.cloneNode(!0).fireEvent("onclick"),n.detachEvent("onclick",m)),h=e.createElement("input"),h.value="t",h.setAttribute("type","radio"),b.radioValue=h.value==="t",h.setAttribute("checked","checked"),h.setAttribute("name","t"),n.appendChild(h),i=e.createDocumentFragment(),i.appendChild(n.lastChild),b.checkClone=i.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=h.checked,i.removeChild(h),i.appendChild(n);if(n.attachEvent)for(k in{submit:!0,change:!0,focusin:!0})j="on"+k,l=j in n,l||(n.setAttribute(j,"return;"),l=typeof n[j]=="function"),b[k+"Bubbles"]=l;return p(function(){var c,d,f,g,h="padding:0;margin:0;border:0;display:block;overflow:hidden;",i=e.getElementsByTagName("body")[0];if(!i)return;c=e.createElement("div"),c.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",i.insertBefore(c,i.firstChild),d=e.createElement("div"),c.appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",f=d.getElementsByTagName("td"),f[0].style.cssText="padding:0;margin:0;border:0;display:none",l=f[0].offsetHeight===0,f[0].style.display="",f[1].style.display="none",b.reliableHiddenOffsets=l&&f[0].offsetHeight===0,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",b.boxSizing=d.offsetWidth===4,b.doesNotIncludeMarginInBodyOffset=i.offsetTop!==1,a.getComputedStyle&&(b.pixelPosition=(a.getComputedStyle(d,null)||{}).top!=="1%",b.boxSizingReliable=(a.getComputedStyle(d,null)||{width:"4px"}).width==="4px",g=e.createElement("div"),g.style.cssText=d.style.cssText=h,g.style.marginRight=g.style.width="0",d.style.width="1px",d.appendChild(g),b.reliableMarginRight=!parseFloat((a.getComputedStyle(g,null)||{}).marginRight)),typeof d.style.zoom!="undefined"&&(d.innerHTML="",d.style.cssText=h+"width:1px;padding:1px;display:inline;zoom:1",b.inlineBlockNeedsLayout=d.offsetWidth===3,d.style.display="block",d.style.overflow="visible",d.innerHTML="<div></div>",d.firstChild.style.width="5px",b.shrinkWrapBlocks=d.offsetWidth!==3,c.style.zoom=1),i.removeChild(c),c=d=f=g=null}),i.removeChild(n),c=d=f=g=h=i=n=null,b}();var H=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,I=/([A-Z])/g;p.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(p.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){return a=a.nodeType?p.cache[a[p.expando]]:a[p.expando],!!a&&!K(a)},data:function(a,c,d,e){if(!p.acceptData(a))return;var f,g,h=p.expando,i=typeof c=="string",j=a.nodeType,k=j?p.cache:a,l=j?a[h]:a[h]&&h;if((!l||!k[l]||!e&&!k[l].data)&&i&&d===b)return;l||(j?a[h]=l=p.deletedIds.pop()||p.guid++:l=h),k[l]||(k[l]={},j||(k[l].toJSON=p.noop));if(typeof c=="object"||typeof c=="function")e?k[l]=p.extend(k[l],c):k[l].data=p.extend(k[l].data,c);return f=k[l],e||(f.data||(f.data={}),f=f.data),d!==b&&(f[p.camelCase(c)]=d),i?(g=f[c],g==null&&(g=f[p.camelCase(c)])):g=f,g},removeData:function(a,b,c){if(!p.acceptData(a))return;var d,e,f,g=a.nodeType,h=g?p.cache:a,i=g?a[p.expando]:p.expando;if(!h[i])return;if(b){d=c?h[i]:h[i].data;if(d){p.isArray(b)||(b in d?b=[b]:(b=p.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,f=b.length;e<f;e++)delete d[b[e]];if(!(c?K:p.isEmptyObject)(d))return}}if(!c){delete h[i].data;if(!K(h[i]))return}g?p.cleanData([a],!0):p.support.deleteExpando||h!=h.window?delete h[i]:h[i]=null},_data:function(a,b,c){return p.data(a,b,c,!0)},acceptData:function(a){var b=a.nodeName&&p.noData[a.nodeName.toLowerCase()];return!b||b!==!0&&a.getAttribute("classid")===b}}),p.fn.extend({data:function(a,c){var d,e,f,g,h,i=this[0],j=0,k=null;if(a===b){if(this.length){k=p.data(i);if(i.nodeType===1&&!p._data(i,"parsedAttrs")){f=i.attributes;for(h=f.length;j<h;j++)g=f[j].name,g.indexOf("data-")||(g=p.camelCase(g.substring(5)),J(i,g,k[g]));p._data(i,"parsedAttrs",!0)}}return k}return typeof a=="object"?this.each(function(){p.data(this,a)}):(d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!",p.access(this,function(c){if(c===b)return k=this.triggerHandler("getData"+e,[d[0]]),k===b&&i&&(k=p.data(i,a),k=J(i,a,k)),k===b&&d[1]?this.data(d[0]):k;d[1]=c,this.each(function(){var b=p(this);b.triggerHandler("setData"+e,d),p.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1))},removeData:function(a){return this.each(function(){p.removeData(this,a)})}}),p.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=p._data(a,b),c&&(!d||p.isArray(c)?d=p._data(a,b,p.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=p.queue(a,b),d=c.length,e=c.shift(),f=p._queueHooks(a,b),g=function(){p.dequeue(a,b)};e==="inprogress"&&(e=c.shift(),d--),e&&(b==="fx"&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return p._data(a,c)||p._data(a,c,{empty:p.Callbacks("once memory").add(function(){p.removeData(a,b+"queue",!0),p.removeData(a,c,!0)})})}}),p.fn.extend({queue:function(a,c){var d=2;return typeof a!="string"&&(c=a,a="fx",d--),arguments.length<d?p.queue(this[0],a):c===b?this:this.each(function(){var b=p.queue(this,a,c);p._queueHooks(this,a),a==="fx"&&b[0]!=="inprogress"&&p.dequeue(this,a)})},dequeue:function(a){return this.each(function(){p.dequeue(this,a)})},delay:function(a,b){return a=p.fx?p.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){var d,e=1,f=p.Deferred(),g=this,h=this.length,i=function(){--e||f.resolveWith(g,[g])};typeof a!="string"&&(c=a,a=b),a=a||"fx";while(h--)d=p._data(g[h],a+"queueHooks"),d&&d.empty&&(e++,d.empty.add(i));return i(),f.promise(c)}});var L,M,N,O=/[\t\r\n]/g,P=/\r/g,Q=/^(?:button|input)$/i,R=/^(?:button|input|object|select|textarea)$/i,S=/^a(?:rea|)$/i,T=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,U=p.support.getSetAttribute;p.fn.extend({attr:function(a,b){return p.access(this,p.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){p.removeAttr(this,a)})},prop:function(a,b){return p.access(this,p.prop,a,b,arguments.length>1)},removeProp:function(a){return a=p.propFix[a]||a,this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,f,g,h;if(p.isFunction(a))return this.each(function(b){p(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(s);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{f=" "+e.className+" ";for(g=0,h=b.length;g<h;g++)f.indexOf(" "+b[g]+" ")<0&&(f+=b[g]+" ");e.className=p.trim(f)}}}return this},removeClass:function(a){var c,d,e,f,g,h,i;if(p.isFunction(a))return this.each(function(b){p(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(s);for(h=0,i=this.length;h<i;h++){e=this[h];if(e.nodeType===1&&e.className){d=(" "+e.className+" ").replace(O," ");for(f=0,g=c.length;f<g;f++)while(d.indexOf(" "+c[f]+" ")>=0)d=d.replace(" "+c[f]+" "," ");e.className=a?p.trim(d):""}}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";return p.isFunction(a)?this.each(function(c){p(this).toggleClass(a.call(this,c,this.className,b),b)}):this.each(function(){if(c==="string"){var e,f=0,g=p(this),h=b,i=a.split(s);while(e=i[f++])h=d?h:!g.hasClass(e),g[h?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&p._data(this,"__className__",this.className),this.className=this.className||a===!1?"":p._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(O," ").indexOf(b)>=0)return!0;return!1},val:function(a){var c,d,e,f=this[0];if(!arguments.length){if(f)return c=p.valHooks[f.type]||p.valHooks[f.nodeName.toLowerCase()],c&&"get"in c&&(d=c.get(f,"value"))!==b?d:(d=f.value,typeof d=="string"?d.replace(P,""):d==null?"":d);return}return e=p.isFunction(a),this.each(function(d){var f,g=p(this);if(this.nodeType!==1)return;e?f=a.call(this,d,g.val()):f=a,f==null?f="":typeof f=="number"?f+="":p.isArray(f)&&(f=p.map(f,function(a){return a==null?"":a+""})),c=p.valHooks[this.type]||p.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,f,"value")===b)this.value=f})}}),p.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,f=a.selectedIndex,g=[],h=a.options,i=a.type==="select-one";if(f<0)return null;c=i?f:0,d=i?f+1:h.length;for(;c<d;c++){e=h[c];if(e.selected&&(p.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!p.nodeName(e.parentNode,"optgroup"))){b=p(e).val();if(i)return b;g.push(b)}}return i&&!g.length&&h.length?p(h[f]).val():g},set:function(a,b){var c=p.makeArray(b);return p(a).find("option").each(function(){this.selected=p.inArray(p(this).val(),c)>=0}),c.length||(a.selectedIndex=-1),c}}},attrFn:{},attr:function(a,c,d,e){var f,g,h,i=a.nodeType;if(!a||i===3||i===8||i===2)return;if(e&&p.isFunction(p.fn[c]))return p(a)[c](d);if(typeof a.getAttribute=="undefined")return p.prop(a,c,d);h=i!==1||!p.isXMLDoc(a),h&&(c=c.toLowerCase(),g=p.attrHooks[c]||(T.test(c)?M:L));if(d!==b){if(d===null){p.removeAttr(a,c);return}return g&&"set"in g&&h&&(f=g.set(a,d,c))!==b?f:(a.setAttribute(c,d+""),d)}return g&&"get"in g&&h&&(f=g.get(a,c))!==null?f:(f=a.getAttribute(c),f===null?b:f)},removeAttr:function(a,b){var c,d,e,f,g=0;if(b&&a.nodeType===1){d=b.split(s);for(;g<d.length;g++)e=d[g],e&&(c=p.propFix[e]||e,f=T.test(e),f||p.attr(a,e,""),a.removeAttribute(U?e:c),f&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(Q.test(a.nodeName)&&a.parentNode)p.error("type property can't be changed");else if(!p.support.radioValue&&b==="radio"&&p.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}},value:{get:function(a,b){return L&&p.nodeName(a,"button")?L.get(a,b):b in a?a.value:null},set:function(a,b,c){if(L&&p.nodeName(a,"button"))return L.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,f,g,h=a.nodeType;if(!a||h===3||h===8||h===2)return;return g=h!==1||!p.isXMLDoc(a),g&&(c=p.propFix[c]||c,f=p.propHooks[c]),d!==b?f&&"set"in f&&(e=f.set(a,d,c))!==b?e:a[c]=d:f&&"get"in f&&(e=f.get(a,c))!==null?e:a[c]},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):R.test(a.nodeName)||S.test(a.nodeName)&&a.href?0:b}}}}),M={get:function(a,c){var d,e=p.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;return b===!1?p.removeAttr(a,c):(d=p.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase())),c}},U||(N={name:!0,id:!0,coords:!0},L=p.valHooks.button={get:function(a,c){var d;return d=a.getAttributeNode(c),d&&(N[c]?d.value!=="":d.specified)?d.value:b},set:function(a,b,c){var d=a.getAttributeNode(c);return d||(d=e.createAttribute(c),a.setAttributeNode(d)),d.value=b+""}},p.each(["width","height"],function(a,b){p.attrHooks[b]=p.extend(p.attrHooks[b],{set:function(a,c){if(c==="")return a.setAttribute(b,"auto"),c}})}),p.attrHooks.contenteditable={get:L.get,set:function(a,b,c){b===""&&(b="false"),L.set(a,b,c)}}),p.support.hrefNormalized||p.each(["href","src","width","height"],function(a,c){p.attrHooks[c]=p.extend(p.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),p.support.style||(p.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=b+""}}),p.support.optSelected||(p.propHooks.selected=p.extend(p.propHooks.selected,{get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}})),p.support.enctype||(p.propFix.enctype="encoding"),p.support.checkOn||p.each(["radio","checkbox"],function(){p.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),p.each(["radio","checkbox"],function(){p.valHooks[this]=p.extend(p.valHooks[this],{set:function(a,b){if(p.isArray(b))return a.checked=p.inArray(p(a).val(),b)>=0}})});var V=/^(?:textarea|input|select)$/i,W=/^([^\.]*|)(?:\.(.+)|)$/,X=/(?:^|\s)hover(\.\S+|)\b/,Y=/^key/,Z=/^(?:mouse|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=function(a){return p.event.special.hover?a:a.replace(X,"mouseenter$1 mouseleave$1")};p.event={add:function(a,c,d,e,f){var g,h,i,j,k,l,m,n,o,q,r;if(a.nodeType===3||a.nodeType===8||!c||!d||!(g=p._data(a)))return;d.handler&&(o=d,d=o.handler,f=o.selector),d.guid||(d.guid=p.guid++),i=g.events,i||(g.events=i={}),h=g.handle,h||(g.handle=h=function(a){return typeof p!="undefined"&&(!a||p.event.triggered!==a.type)?p.event.dispatch.apply(h.elem,arguments):b},h.elem=a),c=p.trim(_(c)).split(" ");for(j=0;j<c.length;j++){k=W.exec(c[j])||[],l=k[1],m=(k[2]||"").split(".").sort(),r=p.event.special[l]||{},l=(f?r.delegateType:r.bindType)||l,r=p.event.special[l]||{},n=p.extend({type:l,origType:k[1],data:e,handler:d,guid:d.guid,selector:f,needsContext:f&&p.expr.match.needsContext.test(f),namespace:m.join(".")},o),q=i[l];if(!q){q=i[l]=[],q.delegateCount=0;if(!r.setup||r.setup.call(a,e,m,h)===!1)a.addEventListener?a.addEventListener(l,h,!1):a.attachEvent&&a.attachEvent("on"+l,h)}r.add&&(r.add.call(a,n),n.handler.guid||(n.handler.guid=d.guid)),f?q.splice(q.delegateCount++,0,n):q.push(n),p.event.global[l]=!0}a=null},global:{},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,q,r=p.hasData(a)&&p._data(a);if(!r||!(m=r.events))return;b=p.trim(_(b||"")).split(" ");for(f=0;f<b.length;f++){g=W.exec(b[f])||[],h=i=g[1],j=g[2];if(!h){for(h in m)p.event.remove(a,h+b[f],c,d,!0);continue}n=p.event.special[h]||{},h=(d?n.delegateType:n.bindType)||h,o=m[h]||[],k=o.length,j=j?new RegExp("(^|\\.)"+j.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(l=0;l<o.length;l++)q=o[l],(e||i===q.origType)&&(!c||c.guid===q.guid)&&(!j||j.test(q.namespace))&&(!d||d===q.selector||d==="**"&&q.selector)&&(o.splice(l--,1),q.selector&&o.delegateCount--,n.remove&&n.remove.call(a,q));o.length===0&&k!==o.length&&((!n.teardown||n.teardown.call(a,j,r.handle)===!1)&&p.removeEvent(a,h,r.handle),delete m[h])}p.isEmptyObject(m)&&(delete r.handle,p.removeData(a,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,f,g){if(!f||f.nodeType!==3&&f.nodeType!==8){var h,i,j,k,l,m,n,o,q,r,s=c.type||c,t=[];if($.test(s+p.event.triggered))return;s.indexOf("!")>=0&&(s=s.slice(0,-1),i=!0),s.indexOf(".")>=0&&(t=s.split("."),s=t.shift(),t.sort());if((!f||p.event.customEvent[s])&&!p.event.global[s])return;c=typeof c=="object"?c[p.expando]?c:new p.Event(s,c):new p.Event(s),c.type=s,c.isTrigger=!0,c.exclusive=i,c.namespace=t.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+t.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,m=s.indexOf(":")<0?"on"+s:"";if(!f){h=p.cache;for(j in h)h[j].events&&h[j].events[s]&&p.event.trigger(c,d,h[j].handle.elem,!0);return}c.result=b,c.target||(c.target=f),d=d!=null?p.makeArray(d):[],d.unshift(c),n=p.event.special[s]||{};if(n.trigger&&n.trigger.apply(f,d)===!1)return;q=[[f,n.bindType||s]];if(!g&&!n.noBubble&&!p.isWindow(f)){r=n.delegateType||s,k=$.test(r+s)?f:f.parentNode;for(l=f;k;k=k.parentNode)q.push([k,r]),l=k;l===(f.ownerDocument||e)&&q.push([l.defaultView||l.parentWindow||a,r])}for(j=0;j<q.length&&!c.isPropagationStopped();j++)k=q[j][0],c.type=q[j][1],o=(p._data(k,"events")||{})[c.type]&&p._data(k,"handle"),o&&o.apply(k,d),o=m&&k[m],o&&p.acceptData(k)&&o.apply&&o.apply(k,d)===!1&&c.preventDefault();return c.type=s,!g&&!c.isDefaultPrevented()&&(!n._default||n._default.apply(f.ownerDocument,d)===!1)&&(s!=="click"||!p.nodeName(f,"a"))&&p.acceptData(f)&&m&&f[s]&&(s!=="focus"&&s!=="blur"||c.target.offsetWidth!==0)&&!p.isWindow(f)&&(l=f[m],l&&(f[m]=null),p.event.triggered=s,f[s](),p.event.triggered=b,l&&(f[m]=l)),c.result}return},dispatch:function(c){c=p.event.fix(c||a.event);var d,e,f,g,h,i,j,l,m,n,o=(p._data(this,"events")||{})[c.type]||[],q=o.delegateCount,r=k.call(arguments),s=!c.exclusive&&!c.namespace,t=p.event.special[c.type]||{},u=[];r[0]=c,c.delegateTarget=this;if(t.preDispatch&&t.preDispatch.call(this,c)===!1)return;if(q&&(!c.button||c.type!=="click"))for(f=c.target;f!=this;f=f.parentNode||this)if(f.disabled!==!0||c.type!=="click"){h={},j=[];for(d=0;d<q;d++)l=o[d],m=l.selector,h[m]===b&&(h[m]=l.needsContext?p(m,this).index(f)>=0:p.find(m,this,null,[f]).length),h[m]&&j.push(l);j.length&&u.push({elem:f,matches:j})}o.length>q&&u.push({elem:this,matches:o.slice(q)});for(d=0;d<u.length&&!c.isPropagationStopped();d++){i=u[d],c.currentTarget=i.elem;for(e=0;e<i.matches.length&&!c.isImmediatePropagationStopped();e++){l=i.matches[e];if(s||!c.namespace&&!l.namespace||c.namespace_re&&c.namespace_re.test(l.namespace))c.data=l.data,c.handleObj=l,g=((p.event.special[l.origType]||{}).handle||l.handler).apply(i.elem,r),g!==b&&(c.result=g,g===!1&&(c.preventDefault(),c.stopPropagation()))}}return t.postDispatch&&t.postDispatch.call(this,c),c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,c){var d,f,g,h=c.button,i=c.fromElement;return a.pageX==null&&c.clientX!=null&&(d=a.target.ownerDocument||e,f=d.documentElement,g=d.body,a.pageX=c.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=c.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?c.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0),a}},fix:function(a){if(a[p.expando])return a;var b,c,d=a,f=p.event.fixHooks[a.type]||{},g=f.props?this.props.concat(f.props):this.props;a=p.Event(d);for(b=g.length;b;)c=g[--b],a[c]=d[c];return a.target||(a.target=d.srcElement||e),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,f.filter?f.filter(a,d):a},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){p.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=p.extend(new p.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?p.event.trigger(e,null,b):p.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},p.event.handle=p.event.dispatch,p.removeEvent=e.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]=="undefined"&&(a[d]=null),a.detachEvent(d,c))},p.Event=function(a,b){if(this instanceof p.Event)a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?bb:ba):this.type=a,b&&p.extend(this,b),this.timeStamp=a&&a.timeStamp||p.now(),this[p.expando]=!0;else return new p.Event(a,b)},p.Event.prototype={preventDefault:function(){this.isDefaultPrevented=bb;var a=this.originalEvent;if(!a)return;a.preventDefault?a.preventDefault():a.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=bb;var a=this.originalEvent;if(!a)return;a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=bb,this.stopPropagation()},isDefaultPrevented:ba,isPropagationStopped:ba,isImmediatePropagationStopped:ba},p.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){p.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj,g=f.selector;if(!e||e!==d&&!p.contains(d,e))a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b;return c}}}),p.support.submitBubbles||(p.event.special.submit={setup:function(){if(p.nodeName(this,"form"))return!1;p.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=p.nodeName(c,"input")||p.nodeName(c,"button")?c.form:b;d&&!p._data(d,"_submit_attached")&&(p.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),p._data(d,"_submit_attached",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&p.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(p.nodeName(this,"form"))return!1;p.event.remove(this,"._submit")}}),p.support.changeBubbles||(p.event.special.change={setup:function(){if(V.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")p.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),p.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),p.event.simulate("change",this,a,!0)});return!1}p.event.add(this,"beforeactivate._change",function(a){var b=a.target;V.test(b.nodeName)&&!p._data(b,"_change_attached")&&(p.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&p.event.simulate("change",this.parentNode,a,!0)}),p._data(b,"_change_attached",!0))})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){return p.event.remove(this,"._change"),!V.test(this.nodeName)}}),p.support.focusinBubbles||p.each({focus:"focusin",blur:"focusout"},function(a,b){var c=0,d=function(a){p.event.simulate(b,a.target,p.event.fix(a),!0)};p.event.special[b]={setup:function(){c++===0&&e.addEventListener(a,d,!0)},teardown:function(){--c===0&&e.removeEventListener(a,d,!0)}}}),p.fn.extend({on:function(a,c,d,e,f){var g,h;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(h in a)this.on(h,c,d,a[h],f);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=ba;else if(!e)return this;return f===1&&(g=e,e=function(a){return p().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=p.guid++)),this.each(function(){p.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){var e,f;if(a&&a.preventDefault&&a.handleObj)return e=a.handleObj,p(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler),this;if(typeof a=="object"){for(f in a)this.off(f,c,a[f]);return this}if(c===!1||typeof c=="function")d=c,c=b;return d===!1&&(d=ba),this.each(function(){p.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){return p(this.context).on(a,this.selector,b,c),this},die:function(a,b){return p(this.context).off(a,this.selector||"**",b),this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length===1?this.off(a,"**"):this.off(b,a||"**",c)},trigger:function(a,b){return this.each(function(){p.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return p.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||p.guid++,d=0,e=function(c){var e=(p._data(this,"lastToggle"+a.guid)||0)%d;return p._data(this,"lastToggle"+a.guid,e+1),c.preventDefault(),b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),p.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){p.fn[b]=function(a,c){return c==null&&(c=a,a=null),arguments.length>0?this.on(b,null,a,c):this.trigger(b)},Y.test(b)&&(p.event.fixHooks[b]=p.event.keyHooks),Z.test(b)&&(p.event.fixHooks[b]=p.event.mouseHooks)}),function(a,b){function bc(a,b,c,d){c=c||[],b=b||r;var e,f,i,j,k=b.nodeType;if(!a||typeof a!="string")return c;if(k!==1&&k!==9)return[];i=g(b);if(!i&&!d)if(e=P.exec(a))if(j=e[1]){if(k===9){f=b.getElementById(j);if(!f||!f.parentNode)return c;if(f.id===j)return c.push(f),c}else if(b.ownerDocument&&(f=b.ownerDocument.getElementById(j))&&h(b,f)&&f.id===j)return c.push(f),c}else{if(e[2])return w.apply(c,x.call(b.getElementsByTagName(a),0)),c;if((j=e[3])&&_&&b.getElementsByClassName)return w.apply(c,x.call(b.getElementsByClassName(j),0)),c}return bp(a.replace(L,"$1"),b,c,d,i)}function bd(a){return function(b){var c=b.nodeName.toLowerCase();return c==="input"&&b.type===a}}function be(a){return function(b){var c=b.nodeName.toLowerCase();return(c==="input"||c==="button")&&b.type===a}}function bf(a){return z(function(b){return b=+b,z(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function bg(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}function bh(a,b){var c,d,f,g,h,i,j,k=C[o][a];if(k)return b?0:k.slice(0);h=a,i=[],j=e.preFilter;while(h){if(!c||(d=M.exec(h)))d&&(h=h.slice(d[0].length)),i.push(f=[]);c=!1;if(d=N.exec(h))f.push(c=new q(d.shift())),h=h.slice(c.length),c.type=d[0].replace(L," ");for(g in e.filter)(d=W[g].exec(h))&&(!j[g]||(d=j[g](d,r,!0)))&&(f.push(c=new q(d.shift())),h=h.slice(c.length),c.type=g,c.matches=d);if(!c)break}return b?h.length:h?bc.error(a):C(a,i).slice(0)}function bi(a,b,d){var e=b.dir,f=d&&b.dir==="parentNode",g=u++;return b.first?function(b,c,d){while(b=b[e])if(f||b.nodeType===1)return a(b,c,d)}:function(b,d,h){if(!h){var i,j=t+" "+g+" ",k=j+c;while(b=b[e])if(f||b.nodeType===1){if((i=b[o])===k)return b.sizset;if(typeof i=="string"&&i.indexOf(j)===0){if(b.sizset)return b}else{b[o]=k;if(a(b,d,h))return b.sizset=!0,b;b.sizset=!1}}}else while(b=b[e])if(f||b.nodeType===1)if(a(b,d,h))return b}}function bj(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function bk(a,b,c,d,e){var f,g=[],h=0,i=a.length,j=b!=null;for(;h<i;h++)if(f=a[h])if(!c||c(f,d,e))g.push(f),j&&b.push(h);return g}function bl(a,b,c,d,e,f){return d&&!d[o]&&(d=bl(d)),e&&!e[o]&&(e=bl(e,f)),z(function(f,g,h,i){if(f&&e)return;var j,k,l,m=[],n=[],o=g.length,p=f||bo(b||"*",h.nodeType?[h]:h,[],f),q=a&&(f||!b)?bk(p,m,a,h,i):p,r=c?e||(f?a:o||d)?[]:g:q;c&&c(q,r,h,i);if(d){l=bk(r,n),d(l,[],h,i),j=l.length;while(j--)if(k=l[j])r[n[j]]=!(q[n[j]]=k)}if(f){j=a&&r.length;while(j--)if(k=r[j])f[m[j]]=!(g[m[j]]=k)}else r=bk(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):w.apply(g,r)})}function bm(a){var b,c,d,f=a.length,g=e.relative[a[0].type],h=g||e.relative[" "],i=g?1:0,j=bi(function(a){return a===b},h,!0),k=bi(function(a){return y.call(b,a)>-1},h,!0),m=[function(a,c,d){return!g&&(d||c!==l)||((b=c).nodeType?j(a,c,d):k(a,c,d))}];for(;i<f;i++)if(c=e.relative[a[i].type])m=[bi(bj(m),c)];else{c=e.filter[a[i].type].apply(null,a[i].matches);if(c[o]){d=++i;for(;d<f;d++)if(e.relative[a[d].type])break;return bl(i>1&&bj(m),i>1&&a.slice(0,i-1).join("").replace(L,"$1"),c,i<d&&bm(a.slice(i,d)),d<f&&bm(a=a.slice(d)),d<f&&a.join(""))}m.push(c)}return bj(m)}function bn(a,b){var d=b.length>0,f=a.length>0,g=function(h,i,j,k,m){var n,o,p,q=[],s=0,u="0",x=h&&[],y=m!=null,z=l,A=h||f&&e.find.TAG("*",m&&i.parentNode||i),B=t+=z==null?1:Math.E;y&&(l=i!==r&&i,c=g.el);for(;(n=A[u])!=null;u++){if(f&&n){for(o=0;p=a[o];o++)if(p(n,i,j)){k.push(n);break}y&&(t=B,c=++g.el)}d&&((n=!p&&n)&&s--,h&&x.push(n))}s+=u;if(d&&u!==s){for(o=0;p=b[o];o++)p(x,q,i,j);if(h){if(s>0)while(u--)!x[u]&&!q[u]&&(q[u]=v.call(k));q=bk(q)}w.apply(k,q),y&&!h&&q.length>0&&s+b.length>1&&bc.uniqueSort(k)}return y&&(t=B,l=z),x};return g.el=0,d?z(g):g}function bo(a,b,c,d){var e=0,f=b.length;for(;e<f;e++)bc(a,b[e],c,d);return c}function bp(a,b,c,d,f){var g,h,j,k,l,m=bh(a),n=m.length;if(!d&&m.length===1){h=m[0]=m[0].slice(0);if(h.length>2&&(j=h[0]).type==="ID"&&b.nodeType===9&&!f&&e.relative[h[1].type]){b=e.find.ID(j.matches[0].replace(V,""),b,f)[0];if(!b)return c;a=a.slice(h.shift().length)}for(g=W.POS.test(a)?-1:h.length-1;g>=0;g--){j=h[g];if(e.relative[k=j.type])break;if(l=e.find[k])if(d=l(j.matches[0].replace(V,""),R.test(h[0].type)&&b.parentNode||b,f)){h.splice(g,1),a=d.length&&h.join("");if(!a)return w.apply(c,x.call(d,0)),c;break}}}return i(a,m)(d,b,f,c,R.test(a)),c}function bq(){}var c,d,e,f,g,h,i,j,k,l,m=!0,n="undefined",o=("sizcache"+Math.random()).replace(".",""),q=String,r=a.document,s=r.documentElement,t=0,u=0,v=[].pop,w=[].push,x=[].slice,y=[].indexOf||function(a){var b=0,c=this.length;for(;b<c;b++)if(this[b]===a)return b;return-1},z=function(a,b){return a[o]=b==null||b,a},A=function(){var a={},b=[];return z(function(c,d){return b.push(c)>e.cacheLength&&delete a[b.shift()],a[c]=d},a)},B=A(),C=A(),D=A(),E="[\\x20\\t\\r\\n\\f]",F="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",G=F.replace("w","w#"),H="([*^$|!~]?=)",I="\\["+E+"*("+F+")"+E+"*(?:"+H+E+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+G+")|)|)"+E+"*\\]",J=":("+F+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+I+")|[^:]|\\\\.)*|.*))\\)|)",K=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+E+"*((?:-\\d)?\\d*)"+E+"*\\)|)(?=[^-]|$)",L=new RegExp("^"+E+"+|((?:^|[^\\\\])(?:\\\\.)*)"+E+"+$","g"),M=new RegExp("^"+E+"*,"+E+"*"),N=new RegExp("^"+E+"*([\\x20\\t\\r\\n\\f>+~])"+E+"*"),O=new RegExp(J),P=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,Q=/^:not/,R=/[\x20\t\r\n\f]*[+~]/,S=/:not\($/,T=/h\d/i,U=/input|select|textarea|button/i,V=/\\(?!\\)/g,W={ID:new RegExp("^#("+F+")"),CLASS:new RegExp("^\\.("+F+")"),NAME:new RegExp("^\\[name=['\"]?("+F+")['\"]?\\]"),TAG:new RegExp("^("+F.replace("w","w*")+")"),ATTR:new RegExp("^"+I),PSEUDO:new RegExp("^"+J),POS:new RegExp(K,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+E+"*(even|odd|(([+-]|)(\\d*)n|)"+E+"*(?:([+-]|)"+E+"*(\\d+)|))"+E+"*\\)|)","i"),needsContext:new RegExp("^"+E+"*[>+~]|"+K,"i")},X=function(a){var b=r.createElement("div");try{return a(b)}catch(c){return!1}finally{b=null}},Y=X(function(a){return a.appendChild(r.createComment("")),!a.getElementsByTagName("*").length}),Z=X(function(a){return a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!==n&&a.firstChild.getAttribute("href")==="#"}),$=X(function(a){a.innerHTML="<select></select>";var b=typeof a.lastChild.getAttribute("multiple");return b!=="boolean"&&b!=="string"}),_=X(function(a){return a.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!a.getElementsByClassName||!a.getElementsByClassName("e").length?!1:(a.lastChild.className="e",a.getElementsByClassName("e").length===2)}),ba=X(function(a){a.id=o+0,a.innerHTML="<a name='"+o+"'></a><div name='"+o+"'></div>",s.insertBefore(a,s.firstChild);var b=r.getElementsByName&&r.getElementsByName(o).length===2+r.getElementsByName(o+0).length;return d=!r.getElementById(o),s.removeChild(a),b});try{x.call(s.childNodes,0)[0].nodeType}catch(bb){x=function(a){var b,c=[];for(;b=this[a];a++)c.push(b);return c}}bc.matches=function(a,b){return bc(a,null,null,b)},bc.matchesSelector=function(a,b){return bc(b,null,null,[a]).length>0},f=bc.getText=function(a){var b,c="",d=0,e=a.nodeType;if(e){if(e===1||e===9||e===11){if(typeof a.textContent=="string")return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=f(a)}else if(e===3||e===4)return a.nodeValue}else for(;b=a[d];d++)c+=f(b);return c},g=bc.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?b.nodeName!=="HTML":!1},h=bc.contains=s.contains?function(a,b){var c=a.nodeType===9?a.documentElement:a,d=b&&b.parentNode;return a===d||!!(d&&d.nodeType===1&&c.contains&&c.contains(d))}:s.compareDocumentPosition?function(a,b){return b&&!!(a.compareDocumentPosition(b)&16)}:function(a,b){while(b=b.parentNode)if(b===a)return!0;return!1},bc.attr=function(a,b){var c,d=g(a);return d||(b=b.toLowerCase()),(c=e.attrHandle[b])?c(a):d||$?a.getAttribute(b):(c=a.getAttributeNode(b),c?typeof a[b]=="boolean"?a[b]?b:null:c.specified?c.value:null:null)},e=bc.selectors={cacheLength:50,createPseudo:z,match:W,attrHandle:Z?{}:{href:function(a){return a.getAttribute("href",2)},type:function(a){return a.getAttribute("type")}},find:{ID:d?function(a,b,c){if(typeof b.getElementById!==n&&!c){var d=b.getElementById(a);return d&&d.parentNode?[d]:[]}}:function(a,c,d){if(typeof c.getElementById!==n&&!d){var e=c.getElementById(a);return e?e.id===a||typeof e.getAttributeNode!==n&&e.getAttributeNode("id").value===a?[e]:b:[]}},TAG:Y?function(a,b){if(typeof b.getElementsByTagName!==n)return b.getElementsByTagName(a)}:function(a,b){var c=b.getElementsByTagName(a);if(a==="*"){var d,e=[],f=0;for(;d=c[f];f++)d.nodeType===1&&e.push(d);return e}return c},NAME:ba&&function(a,b){if(typeof b.getElementsByName!==n)return b.getElementsByName(name)},CLASS:_&&function(a,b,c){if(typeof b.getElementsByClassName!==n&&!c)return b.getElementsByClassName(a)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(V,""),a[3]=(a[4]||a[5]||"").replace(V,""),a[2]==="~="&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),a[1]==="nth"?(a[2]||bc.error(a[0]),a[3]=+(a[3]?a[4]+(a[5]||1):2*(a[2]==="even"||a[2]==="odd")),a[4]=+(a[6]+a[7]||a[2]==="odd")):a[2]&&bc.error(a[0]),a},PSEUDO:function(a){var b,c;if(W.CHILD.test(a[0]))return null;if(a[3])a[2]=a[3];else if(b=a[4])O.test(b)&&(c=bh(b,!0))&&(c=b.indexOf(")",b.length-c)-b.length)&&(b=b.slice(0,c),a[0]=a[0].slice(0,c)),a[2]=b;return a.slice(0,3)}},filter:{ID:d?function(a){return a=a.replace(V,""),function(b){return b.getAttribute("id")===a}}:function(a){return a=a.replace(V,""),function(b){var c=typeof b.getAttributeNode!==n&&b.getAttributeNode("id");return c&&c.value===a}},TAG:function(a){return a==="*"?function(){return!0}:(a=a.replace(V,"").toLowerCase(),function(b){return b.nodeName&&b.nodeName.toLowerCase()===a})},CLASS:function(a){var b=B[o][a];return b||(b=B(a,new RegExp("(^|"+E+")"+a+"("+E+"|$)"))),function(a){return b.test(a.className||typeof a.getAttribute!==n&&a.getAttribute("class")||"")}},ATTR:function(a,b,c){return function(d,e){var f=bc.attr(d,a);return f==null?b==="!=":b?(f+="",b==="="?f===c:b==="!="?f!==c:b==="^="?c&&f.indexOf(c)===0:b==="*="?c&&f.indexOf(c)>-1:b==="$="?c&&f.substr(f.length-c.length)===c:b==="~="?(" "+f+" ").indexOf(c)>-1:b==="|="?f===c||f.substr(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d){return a==="nth"?function(a){var b,e,f=a.parentNode;if(c===1&&d===0)return!0;if(f){e=0;for(b=f.firstChild;b;b=b.nextSibling)if(b.nodeType===1){e++;if(a===b)break}}return e-=d,e===c||e%c===0&&e/c>=0}:function(b){var c=b;switch(a){case"only":case"first":while(c=c.previousSibling)if(c.nodeType===1)return!1;if(a==="first")return!0;c=b;case"last":while(c=c.nextSibling)if(c.nodeType===1)return!1;return!0}}},PSEUDO:function(a,b){var c,d=e.pseudos[a]||e.setFilters[a.toLowerCase()]||bc.error("unsupported pseudo: "+a);return d[o]?d(b):d.length>1?(c=[a,a,"",b],e.setFilters.hasOwnProperty(a.toLowerCase())?z(function(a,c){var e,f=d(a,b),g=f.length;while(g--)e=y.call(a,f[g]),a[e]=!(c[e]=f[g])}):function(a){return d(a,0,c)}):d}},pseudos:{not:z(function(a){var b=[],c=[],d=i(a.replace(L,"$1"));return d[o]?z(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)if(f=g[h])a[h]=!(b[h]=f)}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:z(function(a){return function(b){return bc(a,b).length>0}}),contains:z(function(a){return function(b){return(b.textContent||b.innerText||f(b)).indexOf(a)>-1}}),enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&!!a.checked||b==="option"&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},parent:function(a){return!e.pseudos.empty(a)},empty:function(a){var b;a=a.firstChild;while(a){if(a.nodeName>"@"||(b=a.nodeType)===3||b===4)return!1;a=a.nextSibling}return!0},header:function(a){return T.test(a.nodeName)},text:function(a){var b,c;return a.nodeName.toLowerCase()==="input"&&(b=a.type)==="text"&&((c=a.getAttribute("type"))==null||c.toLowerCase()===b)},radio:bd("radio"),checkbox:bd("checkbox"),file:bd("file"),password:bd("password"),image:bd("image"),submit:be("submit"),reset:be("reset"),button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&a.type==="button"||b==="button"},input:function(a){return U.test(a.nodeName)},focus:function(a){var b=a.ownerDocument;return a===b.activeElement&&(!b.hasFocus||b.hasFocus())&&(!!a.type||!!a.href)},active:function(a){return a===a.ownerDocument.activeElement},first:bf(function(a,b,c){return[0]}),last:bf(function(a,b,c){return[b-1]}),eq:bf(function(a,b,c){return[c<0?c+b:c]}),even:bf(function(a,b,c){for(var d=0;d<b;d+=2)a.push(d);return a}),odd:bf(function(a,b,c){for(var d=1;d<b;d+=2)a.push(d);return a}),lt:bf(function(a,b,c){for(var d=c<0?c+b:c;--d>=0;)a.push(d);return a}),gt:bf(function(a,b,c){for(var d=c<0?c+b:c;++d<b;)a.push(d);return a})}},j=s.compareDocumentPosition?function(a,b){return a===b?(k=!0,0):(!a.compareDocumentPosition||!b.compareDocumentPosition?a.compareDocumentPosition:a.compareDocumentPosition(b)&4)?-1:1}:function(a,b){if(a===b)return k=!0,0;if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,h=b.parentNode,i=g;if(g===h)return bg(a,b);if(!g)return-1;if(!h)return 1;while(i)e.unshift(i),i=i.parentNode;i=h;while(i)f.unshift(i),i=i.parentNode;c=e.length,d=f.length;for(var j=0;j<c&&j<d;j++)if(e[j]!==f[j])return bg(e[j],f[j]);return j===c?bg(a,f[j],-1):bg(e[j],b,1)},[0,0].sort(j),m=!k,bc.uniqueSort=function(a){var b,c=1;k=m,a.sort(j);if(k)for(;b=a[c];c++)b===a[c-1]&&a.splice(c--,1);return a},bc.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},i=bc.compile=function(a,b){var c,d=[],e=[],f=D[o][a];if(!f){b||(b=bh(a)),c=b.length;while(c--)f=bm(b[c]),f[o]?d.push(f):e.push(f);f=D(a,bn(e,d))}return f},r.querySelectorAll&&function(){var a,b=bp,c=/'|\\/g,d=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,e=[":focus"],f=[":active",":focus"],h=s.matchesSelector||s.mozMatchesSelector||s.webkitMatchesSelector||s.oMatchesSelector||s.msMatchesSelector;X(function(a){a.innerHTML="<select><option selected=''></option></select>",a.querySelectorAll("[selected]").length||e.push("\\["+E+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),a.querySelectorAll(":checked").length||e.push(":checked")}),X(function(a){a.innerHTML="<p test=''></p>",a.querySelectorAll("[test^='']").length&&e.push("[*^$]="+E+"*(?:\"\"|'')"),a.innerHTML="<input type='hidden'/>",a.querySelectorAll(":enabled").length||e.push(":enabled",":disabled")}),e=new RegExp(e.join("|")),bp=function(a,d,f,g,h){if(!g&&!h&&(!e||!e.test(a))){var i,j,k=!0,l=o,m=d,n=d.nodeType===9&&a;if(d.nodeType===1&&d.nodeName.toLowerCase()!=="object"){i=bh(a),(k=d.getAttribute("id"))?l=k.replace(c,"\\$&"):d.setAttribute("id",l),l="[id='"+l+"'] ",j=i.length;while(j--)i[j]=l+i[j].join("");m=R.test(a)&&d.parentNode||d,n=i.join(",")}if(n)try{return w.apply(f,x.call(m.querySelectorAll(n),0)),f}catch(p){}finally{k||d.removeAttribute("id")}}return b(a,d,f,g,h)},h&&(X(function(b){a=h.call(b,"div");try{h.call(b,"[test!='']:sizzle"),f.push("!=",J)}catch(c){}}),f=new RegExp(f.join("|")),bc.matchesSelector=function(b,c){c=c.replace(d,"='$1']");if(!g(b)&&!f.test(c)&&(!e||!e.test(c)))try{var i=h.call(b,c);if(i||a||b.document&&b.document.nodeType!==11)return i}catch(j){}return bc(c,null,null,[b]).length>0})}(),e.pseudos.nth=e.pseudos.eq,e.filters=bq.prototype=e.pseudos,e.setFilters=new bq,bc.attr=p.attr,p.find=bc,p.expr=bc.selectors,p.expr[":"]=p.expr.pseudos,p.unique=bc.uniqueSort,p.text=bc.getText,p.isXMLDoc=bc.isXML,p.contains=bc.contains}(a);var bc=/Until$/,bd=/^(?:parents|prev(?:Until|All))/,be=/^.[^:#\[\.,]*$/,bf=p.expr.match.needsContext,bg={children:!0,contents:!0,next:!0,prev:!0};p.fn.extend({find:function(a){var b,c,d,e,f,g,h=this;if(typeof a!="string")return p(a).filter(function(){for(b=0,c=h.length;b<c;b++)if(p.contains(h[b],this))return!0});g=this.pushStack("","find",a);for(b=0,c=this.length;b<c;b++){d=g.length,p.find(a,this[b],g);if(b>0)for(e=d;e<g.length;e++)for(f=0;f<d;f++)if(g[f]===g[e]){g.splice(e--,1);break}}return g},has:function(a){var b,c=p(a,this),d=c.length;return this.filter(function(){for(b=0;b<d;b++)if(p.contains(this,c[b]))return!0})},not:function(a){return this.pushStack(bj(this,a,!1),"not",a)},filter:function(a){return this.pushStack(bj(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?bf.test(a)?p(a,this.context).index(this[0])>=0:p.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c,d=0,e=this.length,f=[],g=bf.test(a)||typeof a!="string"?p(a,b||this.context):0;for(;d<e;d++){c=this[d];while(c&&c.ownerDocument&&c!==b&&c.nodeType!==11){if(g?g.index(c)>-1:p.find.matchesSelector(c,a)){f.push(c);break}c=c.parentNode}}return f=f.length>1?p.unique(f):f,this.pushStack(f,"closest",a)},index:function(a){return a?typeof a=="string"?p.inArray(this[0],p(a)):p.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(a,b){var c=typeof a=="string"?p(a,b):p.makeArray(a&&a.nodeType?[a]:a),d=p.merge(this.get(),c);return this.pushStack(bh(c[0])||bh(d[0])?d:p.unique(d))},addBack:function(a){return this.add(a==null?this.prevObject:this.prevObject.filter(a))}}),p.fn.andSelf=p.fn.addBack,p.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return p.dir(a,"parentNode")},parentsUntil:function(a,b,c){return p.dir(a,"parentNode",c)},next:function(a){return bi(a,"nextSibling")},prev:function(a){return bi(a,"previousSibling")},nextAll:function(a){return p.dir(a,"nextSibling")},prevAll:function(a){return p.dir(a,"previousSibling")},nextUntil:function(a,b,c){return p.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return p.dir(a,"previousSibling",c)},siblings:function(a){return p.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return p.sibling(a.firstChild)},contents:function(a){return p.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:p.merge([],a.childNodes)}},function(a,b){p.fn[a]=function(c,d){var e=p.map(this,b,c);return bc.test(a)||(d=c),d&&typeof d=="string"&&(e=p.filter(d,e)),e=this.length>1&&!bg[a]?p.unique(e):e,this.length>1&&bd.test(a)&&(e=e.reverse()),this.pushStack(e,a,k.call(arguments).join(","))}}),p.extend({filter:function(a,b,c){return c&&(a=":not("+a+")"),b.length===1?p.find.matchesSelector(b[0],a)?[b[0]]:[]:p.find.matches(a,b)},dir:function(a,c,d){var e=[],f=a[c];while(f&&f.nodeType!==9&&(d===b||f.nodeType!==1||!p(f).is(d)))f.nodeType===1&&e.push(f),f=f[c];return e},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var bl="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",bm=/ jQuery\d+="(?:null|\d+)"/g,bn=/^\s+/,bo=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bp=/<([\w:]+)/,bq=/<tbody/i,br=/<|&#?\w+;/,bs=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,bu=new RegExp("<(?:"+bl+")[\\s/>]","i"),bv=/^(?:checkbox|radio)$/,bw=/checked\s*(?:[^=]|=\s*.checked.)/i,bx=/\/(java|ecma)script/i,by=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,bz={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bA=bk(e),bB=bA.appendChild(e.createElement("div"));bz.optgroup=bz.option,bz.tbody=bz.tfoot=bz.colgroup=bz.caption=bz.thead,bz.th=bz.td,p.support.htmlSerialize||(bz._default=[1,"X<div>","</div>"]),p.fn.extend({text:function(a){return p.access(this,function(a){return a===b?p.text(this):this.empty().append((this[0]&&this[0].ownerDocument||e).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(p.isFunction(a))return this.each(function(b){p(this).wrapAll(a.call(this,b))});if(this[0]){var b=p(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return p.isFunction(a)?this.each(function(b){p(this).wrapInner(a.call(this,b))}):this.each(function(){var b=p(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=p.isFunction(a);return this.each(function(c){p(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){p.nodeName(this,"body")||p(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(a,this.firstChild)})},before:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(a,this),"before",this.selector)}},after:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(this,a),"after",this.selector)}},remove:function(a,b){var c,d=0;for(;(c=this[d])!=null;d++)if(!a||p.filter(a,[c]).length)!b&&c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),p.cleanData([c])),c.parentNode&&c.parentNode.removeChild(c);return this},empty:function(){var a,b=0;for(;(a=this[b])!=null;b++){a.nodeType===1&&p.cleanData(a.getElementsByTagName("*"));while(a.firstChild)a.removeChild(a.firstChild)}return this},clone:function(a,b){return a=a==null?!1:a,b=b==null?a:b,this.map(function(){return p.clone(this,a,b)})},html:function(a){return p.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(bm,""):b;if(typeof a=="string"&&!bs.test(a)&&(p.support.htmlSerialize||!bu.test(a))&&(p.support.leadingWhitespace||!bn.test(a))&&!bz[(bp.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(bo,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(f){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){return bh(this[0])?this.length?this.pushStack(p(p.isFunction(a)?a():a),"replaceWith",a):this:p.isFunction(a)?this.each(function(b){var c=p(this),d=c.html();c.replaceWith(a.call(this,b,d))}):(typeof a!="string"&&(a=p(a).detach()),this.each(function(){var b=this.nextSibling,c=this.parentNode;p(this).remove(),b?p(b).before(a):p(c).append(a)}))},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){a=[].concat.apply([],a);var e,f,g,h,i=0,j=a[0],k=[],l=this.length;if(!p.support.checkClone&&l>1&&typeof j=="string"&&bw.test(j))return this.each(function(){p(this).domManip(a,c,d)});if(p.isFunction(j))return this.each(function(e){var f=p(this);a[0]=j.call(this,e,c?f.html():b),f.domManip(a,c,d)});if(this[0]){e=p.buildFragment(a,this,k),g=e.fragment,f=g.firstChild,g.childNodes.length===1&&(g=f);if(f){c=c&&p.nodeName(f,"tr");for(h=e.cacheable||l-1;i<l;i++)d.call(c&&p.nodeName(this[i],"table")?bC(this[i],"tbody"):this[i],i===h?g:p.clone(g,!0,!0))}g=f=null,k.length&&p.each(k,function(a,b){b.src?p.ajax?p.ajax({url:b.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):p.error("no ajax"):p.globalEval((b.text||b.textContent||b.innerHTML||"").replace(by,"")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),p.buildFragment=function(a,c,d){var f,g,h,i=a[0];return c=c||e,c=!c.nodeType&&c[0]||c,c=c.ownerDocument||c,a.length===1&&typeof i=="string"&&i.length<512&&c===e&&i.charAt(0)==="<"&&!bt.test(i)&&(p.support.checkClone||!bw.test(i))&&(p.support.html5Clone||!bu.test(i))&&(g=!0,f=p.fragments[i],h=f!==b),f||(f=c.createDocumentFragment(),p.clean(a,c,f,d),g&&(p.fragments[i]=h&&f)),{fragment:f,cacheable:g}},p.fragments={},p.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){p.fn[a]=function(c){var d,e=0,f=[],g=p(c),h=g.length,i=this.length===1&&this[0].parentNode;if((i==null||i&&i.nodeType===11&&i.childNodes.length===1)&&h===1)return g[b](this[0]),this;for(;e<h;e++)d=(e>0?this.clone(!0):this).get(),p(g[e])[b](d),f=f.concat(d);return this.pushStack(f,a,g.selector)}}),p.extend({clone:function(a,b,c){var d,e,f,g;p.support.html5Clone||p.isXMLDoc(a)||!bu.test("<"+a.nodeName+">")?g=a.cloneNode(!0):(bB.innerHTML=a.outerHTML,bB.removeChild(g=bB.firstChild));if((!p.support.noCloneEvent||!p.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!p.isXMLDoc(a)){bE(a,g),d=bF(a),e=bF(g);for(f=0;d[f];++f)e[f]&&bE(d[f],e[f])}if(b){bD(a,g);if(c){d=bF(a),e=bF(g);for(f=0;d[f];++f)bD(d[f],e[f])}}return d=e=null,g},clean:function(a,b,c,d){var f,g,h,i,j,k,l,m,n,o,q,r,s=b===e&&bA,t=[];if(!b||typeof b.createDocumentFragment=="undefined")b=e;for(f=0;(h=a[f])!=null;f++){typeof h=="number"&&(h+="");if(!h)continue;if(typeof h=="string")if(!br.test(h))h=b.createTextNode(h);else{s=s||bk(b),l=b.createElement("div"),s.appendChild(l),h=h.replace(bo,"<$1></$2>"),i=(bp.exec(h)||["",""])[1].toLowerCase(),j=bz[i]||bz._default,k=j[0],l.innerHTML=j[1]+h+j[2];while(k--)l=l.lastChild;if(!p.support.tbody){m=bq.test(h),n=i==="table"&&!m?l.firstChild&&l.firstChild.childNodes:j[1]==="<table>"&&!m?l.childNodes:[];for(g=n.length-1;g>=0;--g)p.nodeName(n[g],"tbody")&&!n[g].childNodes.length&&n[g].parentNode.removeChild(n[g])}!p.support.leadingWhitespace&&bn.test(h)&&l.insertBefore(b.createTextNode(bn.exec(h)[0]),l.firstChild),h=l.childNodes,l.parentNode.removeChild(l)}h.nodeType?t.push(h):p.merge(t,h)}l&&(h=l=s=null);if(!p.support.appendChecked)for(f=0;(h=t[f])!=null;f++)p.nodeName(h,"input")?bG(h):typeof h.getElementsByTagName!="undefined"&&p.grep(h.getElementsByTagName("input"),bG);if(c){q=function(a){if(!a.type||bx.test(a.type))return d?d.push(a.parentNode?a.parentNode.removeChild(a):a):c.appendChild(a)};for(f=0;(h=t[f])!=null;f++)if(!p.nodeName(h,"script")||!q(h))c.appendChild(h),typeof h.getElementsByTagName!="undefined"&&(r=p.grep(p.merge([],h.getElementsByTagName("script")),q),t.splice.apply(t,[f+1,0].concat(r)),f+=r.length)}return t},cleanData:function(a,b){var c,d,e,f,g=0,h=p.expando,i=p.cache,j=p.support.deleteExpando,k=p.event.special;for(;(e=a[g])!=null;g++)if(b||p.acceptData(e)){d=e[h],c=d&&i[d];if(c){if(c.events)for(f in c.events)k[f]?p.event.remove(e,f):p.removeEvent(e,f,c.handle);i[d]&&(delete i[d],j?delete e[h]:e.removeAttribute?e.removeAttribute(h):e[h]=null,p.deletedIds.push(d))}}}}),function(){var a,b;p.uaMatch=function(a){a=a.toLowerCase();var b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},a=p.uaMatch(g.userAgent),b={},a.browser&&(b[a.browser]=!0,b.version=a.version),b.chrome?b.webkit=!0:b.webkit&&(b.safari=!0),p.browser=b,p.sub=function(){function a(b,c){return new a.fn.init(b,c)}p.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function c(c,d){return d&&d instanceof p&&!(d instanceof a)&&(d=a(d)),p.fn.init.call(this,c,d,b)},a.fn.init.prototype=a.fn;var b=a(e);return a}}();var bH,bI,bJ,bK=/alpha\([^)]*\)/i,bL=/opacity=([^)]*)/,bM=/^(top|right|bottom|left)$/,bN=/^(none|table(?!-c[ea]).+)/,bO=/^margin/,bP=new RegExp("^("+q+")(.*)$","i"),bQ=new RegExp("^("+q+")(?!px)[a-z%]+$","i"),bR=new RegExp("^([-+])=("+q+")","i"),bS={},bT={position:"absolute",visibility:"hidden",display:"block"},bU={letterSpacing:0,fontWeight:400},bV=["Top","Right","Bottom","Left"],bW=["Webkit","O","Moz","ms"],bX=p.fn.toggle;p.fn.extend({css:function(a,c){return p.access(this,function(a,c,d){return d!==b?p.style(a,c,d):p.css(a,c)},a,c,arguments.length>1)},show:function(){return b$(this,!0)},hide:function(){return b$(this)},toggle:function(a,b){var c=typeof a=="boolean";return p.isFunction(a)&&p.isFunction(b)?bX.apply(this,arguments):this.each(function(){(c?a:bZ(this))?p(this).show():p(this).hide()})}}),p.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bH(a,"opacity");return c===""?"1":c}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":p.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!a||a.nodeType===3||a.nodeType===8||!a.style)return;var f,g,h,i=p.camelCase(c),j=a.style;c=p.cssProps[i]||(p.cssProps[i]=bY(j,i)),h=p.cssHooks[c]||p.cssHooks[i];if(d===b)return h&&"get"in h&&(f=h.get(a,!1,e))!==b?f:j[c];g=typeof d,g==="string"&&(f=bR.exec(d))&&(d=(f[1]+1)*f[2]+parseFloat(p.css(a,c)),g="number");if(d==null||g==="number"&&isNaN(d))return;g==="number"&&!p.cssNumber[i]&&(d+="px");if(!h||!("set"in h)||(d=h.set(a,d,e))!==b)try{j[c]=d}catch(k){}},css:function(a,c,d,e){var f,g,h,i=p.camelCase(c);return c=p.cssProps[i]||(p.cssProps[i]=bY(a.style,i)),h=p.cssHooks[c]||p.cssHooks[i],h&&"get"in h&&(f=h.get(a,!0,e)),f===b&&(f=bH(a,c)),f==="normal"&&c in bU&&(f=bU[c]),d||e!==b?(g=parseFloat(f),d||p.isNumeric(g)?g||0:f):f},swap:function(a,b,c){var d,e,f={};for(e in b)f[e]=a.style[e],a.style[e]=b[e];d=c.call(a);for(e in b)a.style[e]=f[e];return d}}),a.getComputedStyle?bH=function(b,c){var d,e,f,g,h=a.getComputedStyle(b,null),i=b.style;return h&&(d=h[c],d===""&&!p.contains(b.ownerDocument,b)&&(d=p.style(b,c)),bQ.test(d)&&bO.test(c)&&(e=i.width,f=i.minWidth,g=i.maxWidth,i.minWidth=i.maxWidth=i.width=d,d=h.width,i.width=e,i.minWidth=f,i.maxWidth=g)),d}:e.documentElement.currentStyle&&(bH=function(a,b){var c,d,e=a.currentStyle&&a.currentStyle[b],f=a.style;return e==null&&f&&f[b]&&(e=f[b]),bQ.test(e)&&!bM.test(b)&&(c=f.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":e,e=f.pixelLeft+"px",f.left=c,d&&(a.runtimeStyle.left=d)),e===""?"auto":e}),p.each(["height","width"],function(a,b){p.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth===0&&bN.test(bH(a,"display"))?p.swap(a,bT,function(){return cb(a,b,d)}):cb(a,b,d)},set:function(a,c,d){return b_(a,c,d?ca(a,b,d,p.support.boxSizing&&p.css(a,"boxSizing")==="border-box"):0)}}}),p.support.opacity||(p.cssHooks.opacity={get:function(a,b){return bL.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=p.isNumeric(b)?"alpha(opacity="+b*100+")":"",f=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&p.trim(f.replace(bK,""))===""&&c.removeAttribute){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bK.test(f)?f.replace(bK,e):f+" "+e}}),p(function(){p.support.reliableMarginRight||(p.cssHooks.marginRight={get:function(a,b){return p.swap(a,{display:"inline-block"},function(){if(b)return bH(a,"marginRight")})}}),!p.support.pixelPosition&&p.fn.position&&p.each(["top","left"],function(a,b){p.cssHooks[b]={get:function(a,c){if(c){var d=bH(a,b);return bQ.test(d)?p(a).position()[b]+"px":d}}}})}),p.expr&&p.expr.filters&&(p.expr.filters.hidden=function(a){return a.offsetWidth===0&&a.offsetHeight===0||!p.support.reliableHiddenOffsets&&(a.style&&a.style.display||bH(a,"display"))==="none"},p.expr.filters.visible=function(a){return!p.expr.filters.hidden(a)}),p.each({margin:"",padding:"",border:"Width"},function(a,b){p.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bV[d]+b]=e[d]||e[d-2]||e[0];return f}},bO.test(a)||(p.cssHooks[a+b].set=b_)});var cd=/%20/g,ce=/\[\]$/,cf=/\r?\n/g,cg=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,ch=/^(?:select|textarea)/i;p.fn.extend({serialize:function(){return p.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?p.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||ch.test(this.nodeName)||cg.test(this.type))}).map(function(a,b){var c=p(this).val();return c==null?null:p.isArray(c)?p.map(c,function(a,c){return{name:b.name,value:a.replace(cf,"\r\n")}}):{name:b.name,value:c.replace(cf,"\r\n")}}).get()}}),p.param=function(a,c){var d,e=[],f=function(a,b){b=p.isFunction(b)?b():b==null?"":b,e[e.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=p.ajaxSettings&&p.ajaxSettings.traditional);if(p.isArray(a)||a.jquery&&!p.isPlainObject(a))p.each(a,function(){f(this.name,this.value)});else for(d in a)ci(d,a[d],c,f);return e.join("&").replace(cd,"+")};var cj,ck,cl=/#.*$/,cm=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,cn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,co=/^(?:GET|HEAD)$/,cp=/^\/\//,cq=/\?/,cr=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,cs=/([?&])_=[^&]*/,ct=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,cu=p.fn.load,cv={},cw={},cx=["*/"]+["*"];try{ck=f.href}catch(cy){ck=e.createElement("a"),ck.href="",ck=ck.href}cj=ct.exec(ck.toLowerCase())||[],p.fn.load=function(a,c,d){if(typeof a!="string"&&cu)return cu.apply(this,arguments);if(!this.length)return this;var e,f,g,h=this,i=a.indexOf(" ");return i>=0&&(e=a.slice(i,a.length),a=a.slice(0,i)),p.isFunction(c)?(d=c,c=b):c&&typeof c=="object"&&(f="POST"),p.ajax({url:a,type:f,dataType:"html",data:c,complete:function(a,b){d&&h.each(d,g||[a.responseText,b,a])}}).done(function(a){g=arguments,h.html(e?p("<div>").append(a.replace(cr,"")).find(e):a)}),this},p.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){p.fn[b]=function(a){return this.on(b,a)}}),p.each(["get","post"],function(a,c){p[c]=function(a,d,e,f){return p.isFunction(d)&&(f=f||e,e=d,d=b),p.ajax({type:c,url:a,data:d,success:e,dataType:f})}}),p.extend({getScript:function(a,c){return p.get(a,b,c,"script")},getJSON:function(a,b,c){return p.get(a,b,c,"json")},ajaxSetup:function(a,b){return b?cB(a,p.ajaxSettings):(b=a,a=p.ajaxSettings),cB(a,b),a},ajaxSettings:{url:ck,isLocal:cn.test(cj[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":cx},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":p.parseJSON,"text xml":p.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:cz(cv),ajaxTransport:cz(cw),ajax:function(a,c){function y(a,c,f,i){var k,s,t,u,w,y=c;if(v===2)return;v=2,h&&clearTimeout(h),g=b,e=i||"",x.readyState=a>0?4:0,f&&(u=cC(l,x,f));if(a>=200&&a<300||a===304)l.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(p.lastModified[d]=w),w=x.getResponseHeader("Etag"),w&&(p.etag[d]=w)),a===304?(y="notmodified",k=!0):(k=cD(l,u),y=k.state,s=k.data,t=k.error,k=!t);else{t=y;if(!y||a)y="error",a<0&&(a=0)}x.status=a,x.statusText=(c||y)+"",k?o.resolveWith(m,[s,y,x]):o.rejectWith(m,[x,y,t]),x.statusCode(r),r=b,j&&n.trigger("ajax"+(k?"Success":"Error"),[x,l,k?s:t]),q.fireWith(m,[x,y]),j&&(n.trigger("ajaxComplete",[x,l]),--p.active||p.event.trigger("ajaxStop"))}typeof a=="object"&&(c=a,a=b),c=c||{};var d,e,f,g,h,i,j,k,l=p.ajaxSetup({},c),m=l.context||l,n=m!==l&&(m.nodeType||m instanceof p)?p(m):p.event,o=p.Deferred(),q=p.Callbacks("once memory"),r=l.statusCode||{},t={},u={},v=0,w="canceled",x={readyState:0,setRequestHeader:function(a,b){if(!v){var c=a.toLowerCase();a=u[c]=u[c]||a,t[a]=b}return this},getAllResponseHeaders:function(){return v===2?e:null},getResponseHeader:function(a){var c;if(v===2){if(!f){f={};while(c=cm.exec(e))f[c[1].toLowerCase()]=c[2]}c=f[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){return v||(l.mimeType=a),this},abort:function(a){return a=a||w,g&&g.abort(a),y(0,a),this}};o.promise(x),x.success=x.done,x.error=x.fail,x.complete=q.add,x.statusCode=function(a){if(a){var b;if(v<2)for(b in a)r[b]=[r[b],a[b]];else b=a[x.status],x.always(b)}return this},l.url=((a||l.url)+"").replace(cl,"").replace(cp,cj[1]+"//"),l.dataTypes=p.trim(l.dataType||"*").toLowerCase().split(s),l.crossDomain==null&&(i=ct.exec(l.url.toLowerCase())||!1,l.crossDomain=i&&i.join(":")+(i[3]?"":i[1]==="http:"?80:443)!==cj.join(":")+(cj[3]?"":cj[1]==="http:"?80:443)),l.data&&l.processData&&typeof l.data!="string"&&(l.data=p.param(l.data,l.traditional)),cA(cv,l,c,x);if(v===2)return x;j=l.global,l.type=l.type.toUpperCase(),l.hasContent=!co.test(l.type),j&&p.active++===0&&p.event.trigger("ajaxStart");if(!l.hasContent){l.data&&(l.url+=(cq.test(l.url)?"&":"?")+l.data,delete l.data),d=l.url;if(l.cache===!1){var z=p.now(),A=l.url.replace(cs,"$1_="+z);l.url=A+(A===l.url?(cq.test(l.url)?"&":"?")+"_="+z:"")}}(l.data&&l.hasContent&&l.contentType!==!1||c.contentType)&&x.setRequestHeader("Content-Type",l.contentType),l.ifModified&&(d=d||l.url,p.lastModified[d]&&x.setRequestHeader("If-Modified-Since",p.lastModified[d]),p.etag[d]&&x.setRequestHeader("If-None-Match",p.etag[d])),x.setRequestHeader("Accept",l.dataTypes[0]&&l.accepts[l.dataTypes[0]]?l.accepts[l.dataTypes[0]]+(l.dataTypes[0]!=="*"?", "+cx+"; q=0.01":""):l.accepts["*"]);for(k in l.headers)x.setRequestHeader(k,l.headers[k]);if(!l.beforeSend||l.beforeSend.call(m,x,l)!==!1&&v!==2){w="abort";for(k in{success:1,error:1,complete:1})x[k](l[k]);g=cA(cw,l,c,x);if(!g)y(-1,"No Transport");else{x.readyState=1,j&&n.trigger("ajaxSend",[x,l]),l.async&&l.timeout>0&&(h=setTimeout(function(){x.abort("timeout")},l.timeout));try{v=1,g.send(t,y)}catch(B){if(v<2)y(-1,B);else throw B}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var cE=[],cF=/\?/,cG=/(=)\?(?=&|$)|\?\?/,cH=p.now();p.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=cE.pop()||p.expando+"_"+cH++;return this[a]=!0,a}}),p.ajaxPrefilter("json jsonp",function(c,d,e){var f,g,h,i=c.data,j=c.url,k=c.jsonp!==!1,l=k&&cG.test(j),m=k&&!l&&typeof i=="string"&&!(c.contentType||"").indexOf("application/x-www-form-urlencoded")&&cG.test(i);if(c.dataTypes[0]==="jsonp"||l||m)return f=c.jsonpCallback=p.isFunction(c.jsonpCallback)?c.jsonpCallback():c.jsonpCallback,g=a[f],l?c.url=j.replace(cG,"$1"+f):m?c.data=i.replace(cG,"$1"+f):k&&(c.url+=(cF.test(j)?"&":"?")+c.jsonp+"="+f),c.converters["script json"]=function(){return h||p.error(f+" was not called"),h[0]},c.dataTypes[0]="json",a[f]=function(){h=arguments},e.always(function(){a[f]=g,c[f]&&(c.jsonpCallback=d.jsonpCallback,cE.push(f)),h&&p.isFunction(g)&&g(h[0]),h=g=b}),"script"}),p.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){return p.globalEval(a),a}}}),p.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),p.ajaxTransport("script",function(a){if(a.crossDomain){var c,d=e.head||e.getElementsByTagName("head")[0]||e.documentElement;return{send:function(f,g){c=e.createElement("script"),c.async="async",a.scriptCharset&&(c.charset=a.scriptCharset),c.src=a.url,c.onload=c.onreadystatechange=function(a,e){if(e||!c.readyState||/loaded|complete/.test(c.readyState))c.onload=c.onreadystatechange=null,d&&c.parentNode&&d.removeChild(c),c=b,e||g(200,"success")},d.insertBefore(c,d.firstChild)},abort:function(){c&&c.onload(0,1)}}}});var cI,cJ=a.ActiveXObject?function(){for(var a in cI)cI[a](0,1)}:!1,cK=0;p.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&cL()||cM()}:cL,function(a){p.extend(p.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(p.ajaxSettings.xhr()),p.support.ajax&&p.ajaxTransport(function(c){if(!c.crossDomain||p.support.cors){var d;return{send:function(e,f){var g,h,i=c.xhr();c.username?i.open(c.type,c.url,c.async,c.username,c.password):i.open(c.type,c.url,c.async);if(c.xhrFields)for(h in c.xhrFields)i[h]=c.xhrFields[h];c.mimeType&&i.overrideMimeType&&i.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(h in e)i.setRequestHeader(h,e[h])}catch(j){}i.send(c.hasContent&&c.data||null),d=function(a,e){var h,j,k,l,m;try{if(d&&(e||i.readyState===4)){d=b,g&&(i.onreadystatechange=p.noop,cJ&&delete cI[g]);if(e)i.readyState!==4&&i.abort();else{h=i.status,k=i.getAllResponseHeaders(),l={},m=i.responseXML,m&&m.documentElement&&(l.xml=m);try{l.text=i.responseText}catch(a){}try{j=i.statusText}catch(n){j=""}!h&&c.isLocal&&!c.crossDomain?h=l.text?200:404:h===1223&&(h=204)}}}catch(o){e||f(-1,o)}l&&f(h,j,l,k)},c.async?i.readyState===4?setTimeout(d,0):(g=++cK,cJ&&(cI||(cI={},p(a).unload(cJ)),cI[g]=d),i.onreadystatechange=d):d()},abort:function(){d&&d(0,1)}}}});var cN,cO,cP=/^(?:toggle|show|hide)$/,cQ=new RegExp("^(?:([-+])=|)("+q+")([a-z%]*)$","i"),cR=/queueHooks$/,cS=[cY],cT={"*":[function(a,b){var c,d,e=this.createTween(a,b),f=cQ.exec(b),g=e.cur(),h=+g||0,i=1,j=20;if(f){c=+f[2],d=f[3]||(p.cssNumber[a]?"":"px");if(d!=="px"&&h){h=p.css(e.elem,a,!0)||c||1;do i=i||".5",h=h/i,p.style(e.elem,a,h+d);while(i!==(i=e.cur()/g)&&i!==1&&--j)}e.unit=d,e.start=h,e.end=f[1]?h+(f[1]+1)*c:c}return e}]};p.Animation=p.extend(cW,{tweener:function(a,b){p.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");var c,d=0,e=a.length;for(;d<e;d++)c=a[d],cT[c]=cT[c]||[],cT[c].unshift(b)},prefilter:function(a,b){b?cS.unshift(a):cS.push(a)}}),p.Tween=cZ,cZ.prototype={constructor:cZ,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(p.cssNumber[c]?"":"px")},cur:function(){var a=cZ.propHooks[this.prop];return a&&a.get?a.get(this):cZ.propHooks._default.get(this)},run:function(a){var b,c=cZ.propHooks[this.prop];return this.options.duration?this.pos=b=p.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):cZ.propHooks._default.set(this),this}},cZ.prototype.init.prototype=cZ.prototype,cZ.propHooks={_default:{get:function(a){var b;return a.elem[a.prop]==null||!!a.elem.style&&a.elem.style[a.prop]!=null?(b=p.css(a.elem,a.prop,!1,""),!b||b==="auto"?0:b):a.elem[a.prop]},set:function(a){p.fx.step[a.prop]?p.fx.step[a.prop](a):a.elem.style&&(a.elem.style[p.cssProps[a.prop]]!=null||p.cssHooks[a.prop])?p.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},cZ.propHooks.scrollTop=cZ.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},p.each(["toggle","show","hide"],function(a,b){var c=p.fn[b];p.fn[b]=function(d,e,f){return d==null||typeof d=="boolean"||!a&&p.isFunction(d)&&p.isFunction(e)?c.apply(this,arguments):this.animate(c$(b,!0),d,e,f)}}),p.fn.extend({fadeTo:function(a,b,c,d){return this.filter(bZ).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=p.isEmptyObject(a),f=p.speed(b,c,d),g=function(){var b=cW(this,p.extend({},a),f);e&&b.stop(!0)};return e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,c,d){var e=function(a){var b=a.stop;delete a.stop,b(d)};return typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,c=a!=null&&a+"queueHooks",f=p.timers,g=p._data(this);if(c)g[c]&&g[c].stop&&e(g[c]);else for(c in g)g[c]&&g[c].stop&&cR.test(c)&&e(g[c]);for(c=f.length;c--;)f[c].elem===this&&(a==null||f[c].queue===a)&&(f[c].anim.stop(d),b=!1,f.splice(c,1));(b||!d)&&p.dequeue(this,a)})}}),p.each({slideDown:c$("show"),slideUp:c$("hide"),slideToggle:c$("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){p.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),p.speed=function(a,b,c){var d=a&&typeof a=="object"?p.extend({},a):{complete:c||!c&&b||p.isFunction(a)&&a,duration:a,easing:c&&b||b&&!p.isFunction(b)&&b};d.duration=p.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in p.fx.speeds?p.fx.speeds[d.duration]:p.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";return d.old=d.complete,d.complete=function(){p.isFunction(d.old)&&d.old.call(this),d.queue&&p.dequeue(this,d.queue)},d},p.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},p.timers=[],p.fx=cZ.prototype.init,p.fx.tick=function(){var a,b=p.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||p.fx.stop()},p.fx.timer=function(a){a()&&p.timers.push(a)&&!cO&&(cO=setInterval(p.fx.tick,p.fx.interval))},p.fx.interval=13,p.fx.stop=function(){clearInterval(cO),cO=null},p.fx.speeds={slow:600,fast:200,_default:400},p.fx.step={},p.expr&&p.expr.filters&&(p.expr.filters.animated=function(a){return p.grep(p.timers,function(b){return a===b.elem}).length});var c_=/^(?:body|html)$/i;p.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){p.offset.setOffset(this,a,b)});var c,d,e,f,g,h,i,j={top:0,left:0},k=this[0],l=k&&k.ownerDocument;if(!l)return;return(d=l.body)===k?p.offset.bodyOffset(k):(c=l.documentElement,p.contains(c,k)?(typeof k.getBoundingClientRect!="undefined"&&(j=k.getBoundingClientRect()),e=da(l),f=c.clientTop||d.clientTop||0,g=c.clientLeft||d.clientLeft||0,h=e.pageYOffset||c.scrollTop,i=e.pageXOffset||c.scrollLeft,{top:j.top+h-f,left:j.left+i-g}):j)},p.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;return p.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(p.css(a,"marginTop"))||0,c+=parseFloat(p.css(a,"marginLeft"))||0),{top:b,left:c}},setOffset:function(a,b,c){var d=p.css(a,"position");d==="static"&&(a.style.position="relative");var e=p(a),f=e.offset(),g=p.css(a,"top"),h=p.css(a,"left"),i=(d==="absolute"||d==="fixed")&&p.inArray("auto",[g,h])>-1,j={},k={},l,m;i?(k=e.position(),l=k.top,m=k.left):(l=parseFloat(g)||0,m=parseFloat(h)||0),p.isFunction(b)&&(b=b.call(a,c,f)),b.top!=null&&(j.top=b.top-f.top+l),b.left!=null&&(j.left=b.left-f.left+m),"using"in b?b.using.call(a,j):e.css(j)}},p.fn.extend({position:function(){if(!this[0])return;var a=this[0],b=this.offsetParent(),c=this.offset(),d=c_.test(b[0].nodeName)?{top:0,left:0}:b.offset();return c.top-=parseFloat(p.css(a,"marginTop"))||0,c.left-=parseFloat(p.css(a,"marginLeft"))||0,d.top+=parseFloat(p.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(p.css(b[0],"borderLeftWidth"))||0,{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||e.body;while(a&&!c_.test(a.nodeName)&&p.css(a,"position")==="static")a=a.offsetParent;return a||e.body})}}),p.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);p.fn[a]=function(e){return p.access(this,function(a,e,f){var g=da(a);if(f===b)return g?c in g?g[c]:g.document.documentElement[e]:a[e];g?g.scrollTo(d?p(g).scrollLeft():f,d?f:p(g).scrollTop()):a[e]=f},a,e,arguments.length,null)}}),p.each({Height:"height",Width:"width"},function(a,c){p.each({padding:"inner"+a,content:c,"":"outer"+a},function(d,e){p.fn[e]=function(e,f){var g=arguments.length&&(d||typeof e!="boolean"),h=d||(e===!0||f===!0?"margin":"border");return p.access(this,function(c,d,e){var f;return p.isWindow(c)?c.document.documentElement["client"+a]:c.nodeType===9?(f=c.documentElement,Math.max(c.body["scroll"+a],f["scroll"+a],c.body["offset"+a],f["offset"+a],f["client"+a])):e===b?p.css(c,d,e,h):p.style(c,d,e,h)},c,g?e:b,g,null)}})}),a.jQuery=a.$=p,"function"=="function"&&__webpack_require__(3)&&__webpack_require__(3).jQuery&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return p}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))})(window);

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
	/*!
	 * jQuery MobiScroll v2.5.1
	 * http://mobiscroll.com
	 *
	 * Copyright 2010-2013, Acid Media
	 * Licensed under the MIT license.
	 *
	 */
	(function ($) {

	    function Scroller(elem, settings) {
	        var m,
	            hi,
	            v,
	            dw,
	            ww, // Window width
	            wh, // Window height
	            rwh,
	            mw, // Modal width
	            mh, // Modal height
	            anim,
	            debounce,
	            that = this,
	            ms = $.mobiscroll,
	            e = elem,
	            elm = $(e),
	            theme,
	            lang,
	            s = extend({}, defaults),
	            pres = {},
	            warr = [],
	            iv = {},
	            pixels = {},
	            input = elm.is('input'),
	            visible = false;

	        // Private functions

	        function isReadOnly(wh) {
	            if ($.isArray(s.readonly)) {
	                var i = $('.dwwl', dw).index(wh);
	                return s.readonly[i];
	            }
	            return s.readonly;
	        }

	        function generateWheelItems(i) {
	            var html = '<div class="dw-bf">',
	                l = 1,
	                j;

	            for (j in warr[i]) {
	                if (l % 20 == 0) {
	                    html += '</div><div class="dw-bf">';
	                }
	                html += '<div class="dw-li dw-v" data-val="' + j + '" style="height:' + hi + 'px;line-height:' + hi + 'px;"><div class="dw-i">' + warr[i][j] + '</div></div>';
	                l++;
	            }
	            html += '</div>';
	            return html;
	        }

	        function setGlobals(t) {
	            min = $('.dw-li', t).index($('.dw-v', t).eq(0));
	            max = $('.dw-li', t).index($('.dw-v', t).eq(-1));
	            index = $('.dw-ul', dw).index(t);
	            h = hi;
	            inst = that;
	        }

	        function formatHeader(v) {
	            var t = s.headerText;
	            return t ? (typeof t === 'function' ? t.call(e, v) : t.replace(/\{value\}/i, v)) : '';
	        }

	        function read() {
	            that.temp = ((input && that.val !== null && that.val != elm.val()) || that.values === null) ? s.parseValue(elm.val() || '', that) : that.values.slice(0);
	            that.setValue(true);
	        }

	        function scrollToPos(time, index, manual, dir, orig) {
	            
	            // Call validation event
	            if (event('validate', [dw, index, time]) !== false) {

	                // Set scrollers to position
	                $('.dw-ul', dw).each(function (i) {
	                    var t = $(this),
	                        cell = $('.dw-li[data-val="' + that.temp[i] + '"]', t),
	                        cells = $('.dw-li', t),
	                        v = cells.index(cell),
	                        l = cells.length,
	                        sc = i == index || index === undefined;
	                    
	                    // Scroll to a valid cell
	                    if (!cell.hasClass('dw-v')) {
	                        var cell1 = cell,
	                            cell2 = cell,
	                            dist1 = 0,
	                            dist2 = 0;
	                        
	                        while (v - dist1 >= 0 && !cell1.hasClass('dw-v')) {
	                            dist1++;
	                            cell1 = cells.eq(v - dist1);
	                        }

	                        while (v + dist2 < l && !cell2.hasClass('dw-v')) {
	                            dist2++;
	                            cell2 = cells.eq(v + dist2);
	                        }
	                        
	                        // If we have direction (+/- or mouse wheel), the distance does not count
	                        if (((dist2 < dist1 && dist2 && dir !== 2) || !dist1 || (v - dist1 < 0) || dir == 1) && cell2.hasClass('dw-v')) {
	                            cell = cell2;
	                            v = v + dist2;
	                        } else {
	                            cell = cell1;
	                            v = v - dist1;
	                        }
	                    }
	                    
	                    if (!(cell.hasClass('dw-sel')) || sc) {
	                        // Set valid value
	                        that.temp[i] = cell.attr('data-val');

	                        // Add selected class to cell
	                        $('.dw-sel', t).removeClass('dw-sel');
	                        cell.addClass('dw-sel');

	                        // Scroll to position
	                        //that.scroll(t, i, v, time);
	                        that.scroll(t, i, v, sc ? time : 0.1, sc ? orig : undefined);
	                    }
	                });
	                
	                // Reformat value if validation changed something
	                that.change(manual);
	            }
	        
	        }

	        function position(check) {

	            if (s.display == 'inline' || (ww === $(window).width() && rwh === $(window).height() && check)) {
	                return;
	            }
	            
	            var w,
	                l,
	                t,
	                aw, // anchor width
	                ah, // anchor height
	                ap, // anchor position
	                at, // anchor top
	                al, // anchor left
	                arr, // arrow
	                arrw, // arrow width
	                arrl, // arrow left
	                scroll,
	                totalw = 0,
	                minw = 0,
	                st = $(window).scrollTop(),
	                wr = $('.dwwr', dw),
	                d = $('.dw', dw),
	                css = {},
	                anchor = s.anchor === undefined ? elm : s.anchor;
	            
	            ww = $(window).width();
	            rwh = $(window).height();
	            wh = window.innerHeight; // on iOS we need innerHeight
	            wh = wh || rwh;
	            
	            if (/modal|bubble/.test(s.display)) {
	                $('.dwc', dw).each(function () {
	                    w = $(this).outerWidth(true);
	                    totalw += w;
	                    minw = (w > minw) ? w : minw;
	                });
	                w = totalw > ww ? minw : totalw;
	                wr.width(w);
	            }
	            
	            mw = d.outerWidth();
	            mh = d.outerHeight(true);
	            
	            if (s.display == 'modal') {
	                l = (ww - mw) / 2;
	                t = st + (wh - mh) / 2;
	            } else if (s.display == 'bubble') {
	                scroll = true;
	                arr = $('.dw-arrw-i', dw);
	                ap = anchor.offset();
	                at = ap.top;
	                al = ap.left;

	                // horizontal positioning
	                aw = anchor.outerWidth();
	                ah = anchor.outerHeight();
	                l = al - (d.outerWidth(true) - aw) / 2;
	                l = l > (ww - mw) ? (ww - (mw + 20)) : l;
	                l = l >= 0 ? l : 20;
	                
	                // vertical positioning
	                t = at - mh; //(mh + 3); // above the input
	                if ((t < st) || (at > st + wh)) { // if doesn't fit above or the input is out of the screen
	                    d.removeClass('dw-bubble-top').addClass('dw-bubble-bottom');
	                    t = at + ah;// + 3; // below the input
	                } else {
	                    d.removeClass('dw-bubble-bottom').addClass('dw-bubble-top');
	                }

	                //t = t >= st ? t : st;
	                
	                // Calculate Arrow position
	                arrw = arr.outerWidth();
	                arrl = al + aw / 2 - (l + (mw - arrw) / 2);

	                // Limit Arrow position to [0, pocw.width] intervall
	                $('.dw-arr', dw).css({ left: arrl > arrw ? arrw : arrl });
	            } else {
	                css.width = '100%';
	                if (s.display == 'top') {
	                    t = st;
	                } else if (s.display == 'bottom') {
	                    t = st + wh - mh;
	                }
	            }
	            
	            css.top = t < 0 ? 0 : t;
	            css.left = l;
	            d.css(css);
	            
	            // If top + modal height > doc height, increase doc height
	            $('.dw-persp', dw).height(0).height(t + mh > $(document).height() ? t + mh : $(document).height());
	            
	            // Scroll needed
	            if (scroll && ((t + mh > st + wh) || (at > st + wh))) {
	                $(window).scrollTop(t + mh - wh);
	            }
	        }
	        
	        function testTouch(e) {
	            if (e.type === 'touchstart') {
	                touch = true;
	                setTimeout(function () {
	                    touch = false; // Reset if mouse event was not fired
	                }, 500);
	            } else if (touch) {
	                touch = false;
	                return false;
	            }
	            return true;
	        }

	        function event(name, args) {
	            var ret;
	            args.push(that);
	            $.each([theme.defaults, pres, settings], function (i, v) {
	                if (v[name]) { // Call preset event
	                    ret = v[name].apply(e, args);
	                }
	            });
	            return ret;
	        }

	        function plus(t) {
	            var p = +t.data('pos'),
	                val = p + 1;
	            calc(t, val > max ? min : val, 1, true);
	        }

	        function minus(t) {
	            var p = +t.data('pos'),
	                val = p - 1;
	            calc(t, val < min ? max : val, 2, true);
	        }

	        // Public functions

	        /**
	        * Enables the scroller and the associated input.
	        */
	        that.enable = function () {
	            s.disabled = false;
	            if (input) {
	                elm.prop('disabled', false);
	            }
	        };

	        /**
	        * Disables the scroller and the associated input.
	        */
	        that.disable = function () {
	            s.disabled = true;
	            if (input) {
	                elm.prop('disabled', true);
	            }
	        };

	        /**
	        * Scrolls target to the specified position
	        * @param {Object} t - Target wheel jQuery object.
	        * @param {Number} index - Index of the changed wheel.
	        * @param {Number} val - Value.
	        * @param {Number} time - Duration of the animation, optional.
	        * @param {Number} orig - Original value.
	        */
	        that.scroll = function (t, index, val, time, orig) {
	            
	            function getVal(t, b, c, d) {
	                return c * Math.sin(t / d * (Math.PI / 2)) + b;
	            }

	            function ready() {
	                clearInterval(iv[index]);
	                delete iv[index];
	                t.data('pos', val).closest('.dwwl').removeClass('dwa');
	            }
	            
	            var px = (m - val) * hi,
	                i;
	            
	            if (px == pixels[index] && iv[index]) {
	                return;
	            }
	            
	            if (time && px != pixels[index]) {
	                // Trigger animation start event
	                event('onAnimStart', [dw, index, time]);
	            }
	            
	            pixels[index] = px;
	            
	            t.attr('style', (prefix + '-transition:all ' + (time ? time.toFixed(3) : 0) + 's ease-out;') + (has3d ? (prefix + '-transform:translate3d(0,' + px + 'px,0);') : ('top:' + px + 'px;')));
	            
	            if (iv[index]) {
	                ready();
	            }
	            
	            if (time && orig !== undefined) {
	                i = 0;
	                t.closest('.dwwl').addClass('dwa');
	                iv[index] = setInterval(function () {
	                    i += 0.1;
	                    t.data('pos', Math.round(getVal(i, orig, val - orig, time)));
	                    if (i >= time) {
	                        ready();
	                    }
	                }, 100);
	            } else {

	                t.data('pos', val);
	            }
	        };
	        
	        /**
	        * Gets the selected wheel values, formats it, and set the value of the scroller instance.
	        * If input parameter is true, populates the associated input element.
	        * @param {Boolean} sc - Scroll the wheel in position.
	        * @param {Boolean} fill - Also set the value of the associated input element. Default is true.
	        * @param {Number} time - Animation time
	        * @param {Boolean} temp - If true, then only set the temporary value.(only scroll there but not set the value)
	        */
	        that.setValue = function (sc, fill, time, temp) {
	            if (!$.isArray(that.temp)) {
	                that.temp = s.parseValue(that.temp + '', that);
	            }
	            
	            if (visible && sc) {
	                scrollToPos(time);
	            }
	            
	            v = s.formatResult(that.temp);
	            
	            if (!temp) {
	                that.values = that.temp.slice(0);
	                that.val = v;
	            }

	            if (fill) {
	                if (input) {
	                    elm.val(v).trigger('change');
	                }
	            }
	        };
	        
	        that.getValues = function () {
	            var ret = [],
	                i;
	            
	            for (i in that._selectedValues) {
	                ret.push(that._selectedValues[i]);
	            }
	            return ret;
	        };

	        /**
	        * Checks if the current selected values are valid together.
	        * In case of date presets it checks the number of days in a month.
	        * @param {Number} time - Animation time
	        * @param {Number} orig - Original value
	        * @param {Number} i - Currently changed wheel index, -1 if initial validation.
	        * @param {Number} dir - Scroll direction
	        */
	        that.validate = function (i, dir, time, orig) {
	            scrollToPos(time, i, true, dir, orig);
	        };

	        /**
	        *
	        */
	        that.change = function (manual) {
	            v = s.formatResult(that.temp);
	            if (s.display == 'inline') {
	                that.setValue(false, manual);
	            } else {
	                $('.dwv', dw).html(formatHeader(v));
	            }

	            if (manual) {
	                event('onChange', [v]);
	            }
	        };

	        /**
	        * Changes the values of a wheel, and scrolls to the correct position
	        */
	        that.changeWheel = function (idx, time) {
	            if (dw) {
	                var i = 0,
	                    j,
	                    k,
	                    nr = idx.length;

	                for (j in s.wheels) {
	                    for (k in s.wheels[j]) {
	                        if ($.inArray(i, idx) > -1) {
	                            warr[i] = s.wheels[j][k];
	                            $('.dw-ul', dw).eq(i).html(generateWheelItems(i));
	                            nr--;
	                            if (!nr) {
	                                position();
	                                scrollToPos(time, undefined, true);
	                                return;
	                            }
	                        }
	                        i++;
	                    }
	                }
	            }
	        };
	        
	        /**
	        * Return true if the scroller is currently visible.
	        */
	        that.isVisible = function () {
	            return visible;
	        };
	        
	        /**
	        *
	        */
	        that.tap = function (el, handler) {
	            var startX,
	                startY;
	            
	            if (s.tap) {
	                el.bind('touchstart', function (e) {
	                    e.preventDefault();
	                    startX = getCoord(e, 'X');
	                    startY = getCoord(e, 'Y');
	                }).bind('touchend', function (e) {
	                    // If movement is less than 20px, fire the click event handler
	                    if (Math.abs(getCoord(e, 'X') - startX) < 20 && Math.abs(getCoord(e, 'Y') - startY) < 20) {
	                        handler.call(this, e);
	                    }
	                    tap = true;
	                    setTimeout(function () {
	                        tap = false;
	                    }, 300);
	                });
	            }
	            
	            el.bind('click', function (e) {
	                if (!tap) {
	                    // If handler was not called on touchend, call it on click;
	                    handler.call(this, e);
	                }
	            });
	            
	        };
	        
	        /**
	        * Shows the scroller instance.
	        * @param {Boolean} prevAnim - Prevent animation if true
	        */
	        that.show = function (prevAnim) {
	            if (s.disabled || visible) {
	                return false;
	            }

	            if (s.display == 'top') {
	                anim = 'slidedown';
	            }

	            if (s.display == 'bottom') {
	                anim = 'slideup';
	            }

	            // Parse value from input
	            read();

	            event('onBeforeShow', [dw]);

	            // Create wheels
	            var l = 0,
	                i,
	                label,
	                mAnim = '';

	            if (anim && !prevAnim) {
	                mAnim = 'dw-' + anim + ' dw-in';
	            }
	            // Create wheels containers
	            var html = '<div class="dw-trans ' + s.theme + ' dw-' + s.display + '">' + (s.display == 'inline' ? '<div class="dw dwbg dwi"><div class="dwwr">' : '<div class="dw-persp">' + '<div class="dwo"></div><div class="dw dwbg ' + mAnim + '"><div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div><div class="dwwr">' + (s.headerText ? '<div class="dwv"></div>' : ''));
	            
	            for (i = 0; i < s.wheels.length; i++) {
	                html += '<div class="dwc' + (s.mode != 'scroller' ? ' dwpm' : ' dwsc') + (s.showLabel ? '' : ' dwhl') + '"><div class="dwwc dwrc"><table cellpadding="0" cellspacing="0"><tr>';
	                // Create wheels
	                for (label in s.wheels[i]) {
	                    warr[l] = s.wheels[i][label];
	                    html += '<td><div class="dwwl dwrc dwwl' + l + '">' + (s.mode != 'scroller' ? '<div class="dwwb dwwbp" style="height:' + hi + 'px;line-height:' + hi + 'px;"><span>+</span></div><div class="dwwb dwwbm" style="height:' + hi + 'px;line-height:' + hi + 'px;"><span>&ndash;</span></div>' : '') + '<div class="dwl">' + label + '</div><div class="dww" style="height:' + (s.rows * hi) + 'px;min-width:' + s.width + 'px;"><div class="dw-ul">';
	                    // Create wheel values
	                    html += generateWheelItems(l);
	                    html += '</div><div class="dwwo"></div></div><div class="dwwol"></div></div></td>';
	                    l++;
	                }
	                html += '</tr></table></div></div>';
	            }
	            html += (s.display != 'inline' ? '<div class="dwbc' + (s.button3 ? ' dwbc-p' : '') + '"><span class="dwbw dwb-s"><span class="dwb">' + s.setText + '</span></span>' + (s.button3 ? '<span class="dwbw dwb-n"><span class="dwb">' + s.button3Text + '</span></span>' : '') + '<span class="dwbw dwb-c"><span class="dwb">' + s.cancelText + '</span></span></div></div>' : '<div class="dwcc"></div>') + '</div></div></div>';
	            dw = $(html);

	            scrollToPos();
	            
	            event('onMarkupReady', [dw]);

	            // Show
	            if (s.display != 'inline') {
	                dw.appendTo('body');
	                // Remove animation class
	                setTimeout(function () {
	                    dw.removeClass('dw-trans').find('.dw').removeClass(mAnim);
	                }, 350);
	            } else if (elm.is('div')) {
	                elm.html(dw);
	            } else {
	                dw.insertAfter(elm);
	            }
	            
	            event('onMarkupInserted', [dw]);
	            
	            visible = true;
	            
	            // Theme init
	            theme.init(dw, that);
	            
	            if (s.display != 'inline') {
	                // Init buttons
	                that.tap($('.dwb-s span', dw), function () {
	                    if (that.hide(false, 'set') !== false) {
	                        that.setValue(false, true);
	                        event('onSelect', [that.val]);
	                    }
	                });

	                that.tap($('.dwb-c span', dw), function () {
	                    that.cancel();
	                });

	                if (s.button3) {
	                    that.tap($('.dwb-n span', dw), s.button3);
	                }

	                // prevent scrolling if not specified otherwise
	                if (s.scrollLock) {
	                    dw.bind('touchmove', function (e) {
	                        if (mh <= wh && mw <= ww) {
	                            e.preventDefault();
	                        }
	                    });
	                }

	                // Disable inputs to prevent bleed through (Android bug)
	                $('input,select,button').each(function () {
	                    if (!$(this).prop('disabled')) {
	                        $(this).addClass('dwtd').prop('disabled', true);
	                    }
	                });
	                
	                // Set position
	                position();
	                $(window).bind('resize.dw', function () {
	                    // Sometimes scrollTop is not correctly set, so we wait a little
	                    clearTimeout(debounce);
	                    debounce = setTimeout(function () {
	                        position(true);
	                    }, 100);
	                });
	            }

	            // Events
	            dw.delegate('.dwwl', 'DOMMouseScroll mousewheel', function (e) {
	                if (!isReadOnly(this)) {
	                    e.preventDefault();
	                    e = e.originalEvent;
	                    var delta = e.wheelDelta ? (e.wheelDelta / 120) : (e.detail ? (-e.detail / 3) : 0),
	                        t = $('.dw-ul', this),
	                        p = +t.data('pos'),
	                        val = Math.round(p - delta);
	                    setGlobals(t);
	                    calc(t, val, delta < 0 ? 1 : 2);
	                }
	            }).delegate('.dwb, .dwwb', START_EVENT, function (e) {
	                // Active button
	                $(this).addClass('dwb-a');
	            }).delegate('.dwwb', START_EVENT, function (e) {
	                e.stopPropagation();
	                e.preventDefault();
	                var w = $(this).closest('.dwwl');
	                if (testTouch(e) && !isReadOnly(w) && !w.hasClass('dwa')) {
	                    click = true;
	                    // + Button
	                    var t = w.find('.dw-ul'),
	                        func = $(this).hasClass('dwwbp') ? plus : minus;
	                    
	                    setGlobals(t);
	                    clearInterval(timer);
	                    timer = setInterval(function () { func(t); }, s.delay);
	                    func(t);
	                }
	            }).delegate('.dwwl', START_EVENT, function (e) {
	                // Prevent scroll
	                e.preventDefault();
	                // Scroll start
	                if (testTouch(e) && !move && !isReadOnly(this) && !click) {
	                    move = true;
	                    $(document).bind(MOVE_EVENT, onMove);
	                    target = $('.dw-ul', this);
	                    scrollable = s.mode != 'clickpick';
	                    pos = +target.data('pos');
	                    setGlobals(target);
	                    moved = iv[index] !== undefined; // Don't allow tap, if still moving
	                    start = getCoord(e, 'Y');
	                    startTime = new Date();
	                    stop = start;
	                    that.scroll(target, index, pos, 0.001);
	                    if (scrollable) {
	                        target.closest('.dwwl').addClass('dwa');
	                    }
	                }
	            });

	            event('onShow', [dw, v]);
	        };
	        
	        /**
	        * Hides the scroller instance.
	        */
	        that.hide = function (prevAnim, btn) {
	            // If onClose handler returns false, prevent hide
	            if (!visible || event('onClose', [v, btn]) === false) {
	                return false;
	            }

	            // Re-enable temporary disabled fields
	            $('.dwtd').prop('disabled', false).removeClass('dwtd');
	            elm.blur();

	            // Hide wheels and overlay
	            if (dw) {
	                if (s.display != 'inline' && anim && !prevAnim) {
	                    dw.addClass('dw-trans').find('.dw').addClass('dw-' + anim + ' dw-out');
	                    setTimeout(function () {
	                        dw.remove();
	                        dw = null;
	                    }, 350);
	                } else {
	                    dw.remove();
	                    dw = null;
	                }
	                visible = false;
	                pixels = {};
	                // Stop positioning on window resize
	                $(window).unbind('.dw');
	            }
	        };

	        /**
	        * Cancel and hide the scroller instance.
	        */
	        that.cancel = function () {
	            if (that.hide(false, 'cancel') !== false) {
	                event('onCancel', [that.val]);
	            }
	        };

	        /**
	        * Scroller initialization.
	        */
	        that.init = function (ss) {
	            // Get theme defaults
	            theme = extend({ defaults: {}, init: empty }, ms.themes[ss.theme || s.theme]);

	            // Get language defaults
	            lang = ms.i18n[ss.lang || s.lang];

	            extend(settings, ss); // Update original user settings
	            extend(s, theme.defaults, lang, settings);

	            that.settings = s;

	            // Unbind all events (if re-init)
	            elm.unbind('.dw');

	            var preset = ms.presets[s.preset];

	            if (preset) {
	                pres = preset.call(e, that);
	                extend(s, pres, settings); // Load preset settings
	                extend(methods, pres.methods); // Extend core methods
	            }

	            // Set private members
	            m = Math.floor(s.rows / 2);
	            hi = s.height;
	            anim = s.animate;

	            if (elm.data('dwro') !== undefined) {
	                e.readOnly = bool(elm.data('dwro'));
	            }

	            if (visible) {
	                that.hide();
	            }

	            if (s.display == 'inline') {
	                that.show();
	            } else {
	                read();
	                if (input && s.showOnFocus) {
	                    // Set element readonly, save original state
	                    elm.data('dwro', e.readOnly);
	                    e.readOnly = true;
	                    // Init show datewheel
	                    elm.bind('focus.dw', function () { that.show(); });
	                }
	            }
	        };
	        
	        that.trigger = function (name, params) {
	            return event(name, params);
	        };
	        
	        that.values = null;
	        that.val = null;
	        that.temp = null;
	        that._selectedValues = {}; // [];

	        that.init(settings);
	    }

	    function testProps(props) {
	        var i;
	        for (i in props) {
	            if (mod[props[i]] !== undefined) {
	                return true;
	            }
	        }
	        return false;
	    }

	    function testPrefix() {
	        var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
	            p;

	        for (p in prefixes) {
	            if (testProps([prefixes[p] + 'Transform'])) {
	                return '-' + prefixes[p].toLowerCase();
	            }
	        }
	        return '';
	    }

	    function getInst(e) {
	        return scrollers[e.id];
	    }
	    
	    function getCoord(e, c) {
	        var org = e.originalEvent,
	            ct = e.changedTouches;
	        return ct || (org && org.changedTouches) ? (org ? org.changedTouches[0]['page' + c] : ct[0]['page' + c]) : e['page' + c];

	    }

	    function bool(v) {
	        return (v === true || v == 'true');
	    }

	    function constrain(val, min, max) {
	        val = val > max ? max : val;
	        val = val < min ? min : val;
	        return val;
	    }
	    
	    function calc(t, val, dir, anim, orig) {
	        val = constrain(val, min, max);

	        var cell = $('.dw-li', t).eq(val),
	            o = orig === undefined ? val : orig,
	            idx = index,
	            time = anim ? (val == o ? 0.1 : Math.abs((val - o) * 0.1)) : 0;

	        // Set selected scroller value
	        inst.temp[idx] = cell.attr('data-val');
	        
	        inst.scroll(t, idx, val, time, orig);
	        
	        setTimeout(function () {
	            // Validate
	            inst.validate(idx, dir, time, orig);
	        }, 10);
	    }

	    function init(that, method, args) {
	        if (methods[method]) {
	            return methods[method].apply(that, Array.prototype.slice.call(args, 1));
	        }
	        if (typeof method === 'object') {
	            return methods.init.call(that, method);
	        }
	        return that;
	    }

	    var scrollers = {},
	        timer,
	        empty = function () { },
	        h,
	        min,
	        max,
	        inst, // Current instance
	        date = new Date(),
	        uuid = date.getTime(),
	        move,
	        click,
	        target,
	        index,
	        start,
	        stop,
	        startTime,
	        pos,
	        moved,
	        scrollable,
	        mod = document.createElement('modernizr').style,
	        has3d = testProps(['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective']),
	        prefix = testPrefix(),
	        extend = $.extend,
	        tap,
	        touch,
	        START_EVENT = 'touchstart mousedown',
	        MOVE_EVENT = 'touchmove mousemove',
	        END_EVENT = 'touchend mouseup',
	        onMove = function (e) {
	            if (scrollable) {
	                e.preventDefault();
	                stop = getCoord(e, 'Y');
	                inst.scroll(target, index, constrain(pos + (start - stop) / h, min - 1, max + 1));
	            }
	            moved = true;
	        },
	        defaults = {
	            // Options
	            width: 70,
	            height: 40,
	            rows: 3,
	            delay: 300,
	            disabled: false,
	            readonly: false,
	            showOnFocus: true,
	            showLabel: true,
	            wheels: [],
	            theme: '',
	            headerText: '{value}',
	            display: 'modal',
	            mode: 'scroller',
	            preset: '',
	            lang: 'en-US',
	            setText: 'Set',
	            cancelText: 'Cancel',
	            scrollLock: true,
	            tap: true,
	            formatResult: function (d) {
	                return d.join(' ');
	            },
	            parseValue: function (value, inst) {
	                var w = inst.settings.wheels,
	                    val = value.split(' '),
	                    ret = [],
	                    j = 0,
	                    i,
	                    l,
	                    v;

	                for (i = 0; i < w.length; i++) {
	                    for (l in w[i]) {
	                        if (w[i][l][val[j]] !== undefined) {
	                            ret.push(val[j]);
	                        } else {
	                            for (v in w[i][l]) { // Select first value from wheel
	                                ret.push(v);
	                                break;
	                            }
	                        }
	                        j++;
	                    }
	                }
	                return ret;
	            }
	        },

	        methods = {
	            init: function (options) {
	                if (options === undefined) {
	                    options = {};
	                }

	                return this.each(function () {
	                    if (!this.id) {
	                        uuid += 1;
	                        this.id = 'scoller' + uuid;
	                    }
	                    scrollers[this.id] = new Scroller(this, options);
	                });
	            },
	            enable: function () {
	                return this.each(function () {
	                    var inst = getInst(this);
	                    if (inst) {
	                        inst.enable();
	                    }
	                });
	            },
	            disable: function () {
	                return this.each(function () {
	                    var inst = getInst(this);
	                    if (inst) {
	                        inst.disable();
	                    }
	                });
	            },
	            isDisabled: function () {
	                var inst = getInst(this[0]);
	                if (inst) {
	                    return inst.settings.disabled;
	                }
	            },
	            isVisible: function () {
	                var inst = getInst(this[0]);
	                if (inst) {
	                    return inst.isVisible();
	                }
	            },
	            option: function (option, value) {
	                return this.each(function () {
	                    var inst = getInst(this);
	                    if (inst) {
	                        var obj = {};
	                        if (typeof option === 'object') {
	                            obj = option;
	                        } else {
	                            obj[option] = value;
	                        }
	                        inst.init(obj);
	                    }
	                });
	            },
	            setValue: function (d, fill, time, temp) {
	                return this.each(function () {
	                    var inst = getInst(this);
	                    if (inst) {
	                        inst.temp = d;
	                        inst.setValue(true, fill, time, temp);
	                    }
	                });
	            },
	            getInst: function () {
	                return getInst(this[0]);
	            },
	            getValue: function () {
	                var inst = getInst(this[0]);
	                if (inst) {
	                    return inst.values;
	                }
	            },
	            getValues: function () {
	                var inst = getInst(this[0]);
	                if (inst) {
	                    return inst.getValues();
	                }
	            },
	            show: function () {
	                var inst = getInst(this[0]);
	                if (inst) {
	                    return inst.show();
	                }
	            },
	            hide: function () {
	                return this.each(function () {
	                    var inst = getInst(this);
	                    if (inst) {
	                        inst.hide();
	                    }
	                });
	            },
	            destroy: function () {
	                return this.each(function () {
	                    var inst = getInst(this);
	                    if (inst) {
	                        inst.hide();
	                        $(this).unbind('.dw');
	                        delete scrollers[this.id];
	                        if ($(this).is('input')) {
	                            this.readOnly = bool($(this).data('dwro'));
	                        }
	                    }
	                });
	            }
	        };

	    $(document).bind(END_EVENT, function (e) {
	        if (move) {
	            var time = new Date() - startTime,
	                val = constrain(pos + (start - stop) / h, min - 1, max + 1),
	                speed,
	                dist,
	                tindex,
	                ttop = target.offset().top;
	        
	            if (time < 300) {
	                speed = (stop - start) / time;
	                dist = (speed * speed) / (2 * 0.0006);
	                if (stop - start < 0) {
	                    dist = -dist;
	                }
	            } else {
	                dist = stop - start;
	            }
	            
	            tindex = Math.round(pos - dist / h);
	            
	            if (!dist && !moved) { // this is a "tap"
	                var idx = Math.floor((stop - ttop) / h),
	                    li = $('.dw-li', target).eq(idx),
	                    hl = scrollable;
	                
	                if (inst.trigger('onValueTap', [li]) !== false) {
	                    tindex = idx;
	                } else {
	                    hl = true;
	                }
	                
	                if (hl) {
	                    li.addClass('dw-hl'); // Highlight
	                    setTimeout(function () {
	                        li.removeClass('dw-hl');
	                    }, 200);
	                }
	            }
	            
	            if (scrollable) {
	                calc(target, tindex, 0, true, Math.round(val));
	            }
	            
	            move = false;
	            target = null;
	        
	            $(document).unbind(MOVE_EVENT, onMove);
	        }

	        if (click) {
	            clearInterval(timer);
	            click = false;
	        }
	    
	        $('.dwb-a').removeClass('dwb-a');
	                
	    }).bind('mouseover mouseup mousedown click', function (e) { // Prevent standard behaviour on body click
	        if (tap) {
	            e.stopPropagation();
	            e.preventDefault();
	            return false;
	        }
	    });

	    $.fn.mobiscroll = function (method) {
	        extend(this, $.mobiscroll.shorts);
	        return init(this, method, arguments);
	    };

	    $.mobiscroll = $.mobiscroll || {
	        /**
	        * Set settings for all instances.
	        * @param {Object} o - New default settings.
	        */
	        setDefaults: function (o) {
	            extend(defaults, o);
	        },
	        presetShort: function (name) {
	            this.shorts[name] = function (method) {
	                return init(this, extend(method, { preset: name }), arguments);
	            };
	        },
	        shorts: {},
	        presets: {},
	        themes: {},
	        i18n: {}
	    };

	    $.scroller = $.scroller || $.mobiscroll;
	    $.fn.scroller = $.fn.scroller || $.fn.mobiscroll;
	    $.mobiscroll.i18n.zh = $.extend($.mobiscroll.i18n.zh, {
	            dateFormat: 'yyyy-mm-dd',
	            dateOrder: 'yymmdd',
	            dayNames: ['周日', '周一;', '周二;', '周三', '周四', '周五', '周六'],
	            dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
	            dayText: '日',
	            hourText: '时',
	            minuteText: '分',
	            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	            monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
	            monthText: '月',
	            secText: '秒',
	            timeFormat: 'HH:ii',
	            timeWheels: 'HHii',
	            yearText: '年'
	        });
	        $.mobiscroll.i18n.zh = $.extend($.mobiscroll.i18n.zh, {
	            setText: '确定',
	            cancelText: '取消'
	        });        
	        var theme = {
	            defaults: {
	                dateOrder: 'Mddyy',
	                mode: 'mixed',
	                rows: 5,
	                width: 70,
	                height: 36,
	                showLabel: true,
	                useShortLabels: true
	            }
	        }
	    
	        $.mobiscroll.themes['android-ics'] = theme;
	        $.mobiscroll.themes['android-ics light'] = theme;      

	})(jQuery);


	/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
	(function ($) {

	    var ms = $.mobiscroll,
	        date = new Date(),
	        defaults = {
	            dateFormat: 'mm/dd/yy',
	            dateOrder: 'mmddy',
	            timeWheels: 'hhiiA',
	            timeFormat: 'hh:ii A',
	            startYear: date.getFullYear() - 100,
	            endYear: date.getFullYear() + 1,
	            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	            shortYearCutoff: '+10',
	            monthText: 'Month',
	            dayText: 'Day',
	            yearText: 'Year',
	            hourText: 'Hours',
	            minuteText: 'Minutes',
	            secText: 'Seconds',
	            ampmText: '&nbsp;',
	            nowText: 'Now',
	            showNow: false,
	            stepHour: 1,
	            stepMinute: 1,
	            stepSecond: 1,
	            separator: ' '
	        },
	        preset = function (inst) {
	            var that = $(this),
	                html5def = {},
	                format;
	            // Force format for html5 date inputs (experimental)
	            if (that.is('input')) {
	                switch (that.attr('type')) {
	                case 'date':
	                    format = 'yy-mm-dd';
	                    break;
	                case 'datetime':
	                    format = 'yy-mm-ddTHH:ii:ssZ';
	                    break;
	                case 'datetime-local':
	                    format = 'yy-mm-ddTHH:ii:ss';
	                    break;
	                case 'month':
	                    format = 'yy-mm';
	                    html5def.dateOrder = 'mmyy';
	                    break;
	                case 'time':
	                    format = 'HH:ii:ss';
	                    break;
	                }
	                // Check for min/max attributes
	                var min = that.attr('min'),
	                    max = that.attr('max');
	                if (min) {
	                    html5def.minDate = ms.parseDate(format, min);
	                }
	                if (max) {
	                    html5def.maxDate = ms.parseDate(format, max);
	                }
	            }

	            // Set year-month-day order
	            var s = $.extend({}, defaults, html5def, inst.settings),
	                offset = 0,
	                wheels = [],
	                ord = [],
	                o = {},
	                i,
	                k,
	                f = { y: 'getFullYear', m: 'getMonth', d: 'getDate', h: getHour, i: getMinute, s: getSecond, a: getAmPm },
	                p = s.preset,
	                dord = s.dateOrder,
	                tord = s.timeWheels,
	                regen = dord.match(/D/),
	                ampm = tord.match(/a/i),
	                hampm = tord.match(/h/),
	                hformat = p == 'datetime' ? s.dateFormat + s.separator + s.timeFormat : p == 'time' ? s.timeFormat : s.dateFormat,
	                defd = new Date(),
	                stepH = s.stepHour,
	                stepM = s.stepMinute,
	                stepS = s.stepSecond,
	                mind = s.minDate || new Date(s.startYear, 0, 1),
	                maxd = s.maxDate || new Date(s.endYear, 11, 31, 23, 59, 59);
	                
	            inst.settings = s;

	            format = format || hformat;
	                
	            if (p.match(/date/i)) {

	                // Determine the order of year, month, day wheels
	                $.each(['y', 'm', 'd'], function (j, v) {
	                    i = dord.search(new RegExp(v, 'i'));
	                    if (i > -1) {
	                        ord.push({ o: i, v: v });
	                    }
	                });
	                ord.sort(function (a, b) { return a.o > b.o ? 1 : -1; });
	                $.each(ord, function (i, v) {
	                    o[v.v] = i;
	                });

	                var w = {};
	                for (k = 0; k < 3; k++) {
	                    if (k == o.y) {
	                        offset++;
	                        w[s.yearText] = {};
	                        var start = mind.getFullYear(),
	                            end = maxd.getFullYear();
	                        for (i = start; i <= end; i++) {
	                            w[s.yearText][i] = dord.match(/yy/i) ? i : (i + '').substr(2, 2);
	                        }
	                    } else if (k == o.m) {
	                        offset++;
	                        w[s.monthText] = {};
	                        for (i = 0; i < 12; i++) {
	                            var str = dord.replace(/[dy]/gi, '').replace(/mm/, i < 9 ? '0' + (i + 1) : i + 1).replace(/m/, (i + 1));
	                            w[s.monthText][i] = str.match(/MM/) ? str.replace(/MM/, '<span class="dw-mon">' + s.monthNames[i] + '</span>') : str.replace(/M/, '<span class="dw-mon">' + s.monthNamesShort[i] + '</span>');
	                        }
	                    } else if (k == o.d) {
	                        offset++;
	                        w[s.dayText] = {};
	                        for (i = 1; i < 32; i++) {
	                            w[s.dayText][i] = dord.match(/dd/i) && i < 10 ? '0' + i : i;
	                        }
	                    }
	                }
	                wheels.push(w);
	            }

	            if (p.match(/time/i)) {

	                // Determine the order of hours, minutes, seconds wheels
	                ord = [];
	                $.each(['h', 'i', 's', 'a'], function (i, v) {
	                    i = tord.search(new RegExp(v, 'i'));
	                    if (i > -1) {
	                        ord.push({ o: i, v: v });
	                    }
	                });
	                ord.sort(function (a, b) {
	                    return a.o > b.o ? 1 : -1;
	                });
	                $.each(ord, function (i, v) {
	                    o[v.v] = offset + i;
	                });

	                w = {};
	                for (k = offset; k < offset + 4; k++) {
	                    if (k == o.h) {
	                        offset++;
	                        w[s.hourText] = {};
	                        for (i = 0; i < (hampm ? 12 : 24); i += stepH) {
	                            w[s.hourText][i] = hampm && i == 0 ? 12 : tord.match(/hh/i) && i < 10 ? '0' + i : i;
	                        }
	                    } else if (k == o.i) {
	                        offset++;
	                        w[s.minuteText] = {};
	                        for (i = 0; i < 60; i += stepM) {
	                            w[s.minuteText][i] = tord.match(/ii/) && i < 10 ? '0' + i : i;
	                        }
	                    } else if (k == o.s) {
	                        offset++;
	                        w[s.secText] = {};
	                        for (i = 0; i < 60; i += stepS) {
	                            w[s.secText][i] = tord.match(/ss/) && i < 10 ? '0' + i : i;
	                        }
	                    } else if (k == o.a) {
	                        offset++;
	                        var upper = tord.match(/A/);
	                        w[s.ampmText] = { 0: upper ? 'AM' : 'am', 1: upper ? 'PM' : 'pm' };
	                    }
	                    
	                }

	                wheels.push(w);
	            }

	            function get(d, i, def) {
	                if (o[i] !== undefined) {
	                    return +d[o[i]];
	                }
	                if (def !== undefined) {
	                    return def;
	                }
	                return defd[f[i]] ? defd[f[i]]() : f[i](defd);
	            }

	            function step(v, st) {
	                return Math.floor(v / st) * st;
	            }

	            function getHour(d) {
	                var hour = d.getHours();
	                hour = hampm && hour >= 12 ? hour - 12 : hour;
	                return step(hour, stepH);
	            }

	            function getMinute(d) {
	                return step(d.getMinutes(), stepM);
	            }

	            function getSecond(d) {
	                return step(d.getSeconds(), stepS);
	            }

	            function getAmPm(d) {
	                return ampm && d.getHours() > 11 ? 1 : 0;
	            }

	            function getDate(d) {
	                var hour = get(d, 'h', 0);
	                return new Date(get(d, 'y'), get(d, 'm'), get(d, 'd', 1), get(d, 'a') ? hour + 12 : hour, get(d, 'i', 0), get(d, 's', 0));
	            }

	            inst.setDate = function (d, fill, time, temp) {
	                var i;
	                // Set wheels
	                for (i in o) {
	                    this.temp[o[i]] = d[f[i]] ? d[f[i]]() : f[i](d);
	                }
	                this.setValue(true, fill, time, temp);
	            };

	            inst.getDate = function (d) {
	                return getDate(d);
	            };

	            return {
	                button3Text: s.showNow ? s.nowText : undefined,
	                button3: s.showNow ? function () { inst.setDate(new Date(), false, 0.3, true); } : undefined,
	                wheels: wheels,
	                headerText: function (v) {
	                    return ms.formatDate(hformat, getDate(inst.temp), s);
	                },
	                /**
	                * Builds a date object from the wheel selections and formats it to the given date/time format
	                * @param {Array} d - An array containing the selected wheel values
	                * @return {String} - The formatted date string
	                */
	                formatResult: function (d) {
	                    return ms.formatDate(format, getDate(d), s);
	                },
	                /**
	                * Builds a date object from the input value and returns an array to set wheel values
	                * @return {Array} - An array containing the wheel values to set
	                */
	                parseValue: function (val) {
	                    var d = new Date(),
	                        i,
	                        result = [];
	                    try {
	                        d = ms.parseDate(format, val, s);
	                    } catch (e) {
	                    }
	                    // Set wheels
	                    for (i in o) {
	                        result[o[i]] = d[f[i]] ? d[f[i]]() : f[i](d);
	                    }
	                    return result;
	                },
	                /**
	                * Validates the selected date to be in the minDate / maxDate range and sets unselectable values to disabled
	                * @param {Object} dw - jQuery object containing the generated html
	                * @param {Integer} [i] - Index of the changed wheel, not set for initial validation
	                */
	                validate: function (dw, i) {
	                    var temp = inst.temp, //.slice(0),
	                        mins = { y: mind.getFullYear(), m: 0, d: 1, h: 0, i: 0, s: 0, a: 0 },
	                        maxs = { y: maxd.getFullYear(), m: 11, d: 31, h: step(hampm ? 11 : 23, stepH), i: step(59, stepM), s: step(59, stepS), a: 1 },
	                        minprop = true,
	                        maxprop = true;
	                    $.each(['y', 'm', 'd', 'a', 'h', 'i', 's'], function (x, i) {
	                        if (o[i] !== undefined) {
	                            var min = mins[i],
	                                max = maxs[i],
	                                maxdays = 31,
	                                val = get(temp, i),
	                                t = $('.dw-ul', dw).eq(o[i]),
	                                y,
	                                m;
	                            if (i == 'd') {
	                                y = get(temp, 'y');
	                                m = get(temp, 'm');
	                                maxdays = 32 - new Date(y, m, 32).getDate();
	                                max = maxdays;
	                                if (regen) {
	                                    $('.dw-li', t).each(function () {
	                                        var that = $(this),
	                                            d = that.data('val'),
	                                            w = new Date(y, m, d).getDay(),
	                                            str = dord.replace(/[my]/gi, '').replace(/dd/, d < 10 ? '0' + d : d).replace(/d/, d);
	                                        $('.dw-i', that).html(str.match(/DD/) ? str.replace(/DD/, '<span class="dw-day">' + s.dayNames[w] + '</span>') : str.replace(/D/, '<span class="dw-day">' + s.dayNamesShort[w] + '</span>'));
	                                    });
	                                }
	                            }
	                            if (minprop && mind) {
	                                min = mind[f[i]] ? mind[f[i]]() : f[i](mind);
	                            }
	                            if (maxprop && maxd) {
	                                max = maxd[f[i]] ? maxd[f[i]]() : f[i](maxd);
	                            }
	                            if (i != 'y') {
	                                var i1 = $('.dw-li', t).index($('.dw-li[data-val="' + min + '"]', t)),
	                                    i2 = $('.dw-li', t).index($('.dw-li[data-val="' + max + '"]', t));
	                                $('.dw-li', t).removeClass('dw-v').slice(i1, i2 + 1).addClass('dw-v');
	                                if (i == 'd') { // Hide days not in month
	                                    $('.dw-li', t).removeClass('dw-h').slice(maxdays).addClass('dw-h');
	                                }
	                            }
	                            if (val < min) {
	                                val = min;
	                            }
	                            if (val > max) {
	                                val = max;
	                            }
	                            if (minprop) {
	                                minprop = val == min;
	                            }
	                            if (maxprop) {
	                                maxprop = val == max;
	                            }
	                            // Disable some days
	                            if (s.invalid && i == 'd') {
	                                var idx = [];
	                                // Disable exact dates
	                                if (s.invalid.dates) {
	                                    $.each(s.invalid.dates, function (i, v) {
	                                        if (v.getFullYear() == y && v.getMonth() == m) {
	                                            idx.push(v.getDate() - 1);
	                                        }
	                                    });
	                                }
	                                // Disable days of week
	                                if (s.invalid.daysOfWeek) {
	                                    var first = new Date(y, m, 1).getDay(),
	                                        j;
	                                    $.each(s.invalid.daysOfWeek, function (i, v) {
	                                        for (j = v - first; j < maxdays; j += 7) {
	                                            if (j >= 0) {
	                                                idx.push(j);
	                                            }
	                                        }
	                                    });
	                                }
	                                // Disable days of month
	                                if (s.invalid.daysOfMonth) {
	                                    $.each(s.invalid.daysOfMonth, function (i, v) {
	                                        v = (v + '').split('/');
	                                        if (v[1]) {
	                                            if (v[0] - 1 == m) {
	                                                idx.push(v[1] - 1);
	                                            }
	                                        } else {
	                                            idx.push(v[0] - 1);
	                                        }
	                                    });
	                                }
	                                $.each(idx, function (i, v) {
	                                    $('.dw-li', t).eq(v).removeClass('dw-v');
	                                });
	                            }

	                            // Set modified value
	                            temp[o[i]] = val;
	                        }
	                    });
	                },
	                methods: {
	                    /**
	                    * Returns the currently selected date.
	                    * @param {Boolean} temp - If true, return the currently shown date on the picker, otherwise the last selected one
	                    * @return {Date}
	                    */
	                    getDate: function (temp) {
	                        var inst = $(this).mobiscroll('getInst');
	                        if (inst) {
	                            return inst.getDate(temp ? inst.temp : inst.values);
	                        }
	                    },
	                    /**
	                    * Sets the selected date
	                    * @param {Date} d - Date to select.
	                    * @param {Boolean} [fill] - Also set the value of the associated input element. Default is true.
	                    * @return {Object} - jQuery object to maintain chainability
	                    */
	                    setDate: function (d, fill, time, temp) {
	                        if (fill == undefined) {
	                            fill = false;
	                        }
	                        return this.each(function () {
	                            var inst = $(this).mobiscroll('getInst');
	                            if (inst) {
	                                inst.setDate(d, fill, time, temp);
	                            }
	                        });
	                    }
	                }
	            };
	        };

	    $.each(['date', 'time', 'datetime'], function (i, v) {
	        ms.presets[v] = preset;
	        ms.presetShort(v);
	    });

	    /**
	    * Format a date into a string value with a specified format.
	    * @param {String} format - Output format.
	    * @param {Date} date - Date to format.
	    * @param {Object} settings - Settings.
	    * @return {String} - Returns the formatted date string.
	    */
	    ms.formatDate = function (format, date, settings) {
	        if (!date) {
	            return null;
	        }
	        var s = $.extend({}, defaults, settings),
	            look = function (m) { // Check whether a format character is doubled
	                var n = 0;
	                while (i + 1 < format.length && format.charAt(i + 1) == m) {
	                    n++;
	                    i++;
	                }
	                return n;
	            },
	            f1 = function (m, val, len) { // Format a number, with leading zero if necessary
	                var n = '' + val;
	                if (look(m)) {
	                    while (n.length < len) {
	                        n = '0' + n;
	                    }
	                }
	                return n;
	            },
	            f2 = function (m, val, s, l) { // Format a name, short or long as requested
	                return (look(m) ? l[val] : s[val]);
	            },
	            i,
	            output = '',
	            literal = false;

	        for (i = 0; i < format.length; i++) {
	            if (literal) {
	                if (format.charAt(i) == "'" && !look("'")) {
	                    literal = false;
	                } else {
	                    output += format.charAt(i);
	                }
	            } else {
	                switch (format.charAt(i)) {
	                case 'd':
	                    output += f1('d', date.getDate(), 2);
	                    break;
	                case 'D':
	                    output += f2('D', date.getDay(), s.dayNamesShort, s.dayNames);
	                    break;
	                case 'o':
	                    output += f1('o', (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000, 3);
	                    break;
	                case 'm':
	                    output += f1('m', date.getMonth() + 1, 2);
	                    break;
	                case 'M':
	                    output += f2('M', date.getMonth(), s.monthNamesShort, s.monthNames);
	                    break;
	                case 'y':
	                    output += (look('y') ? date.getFullYear() : (date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
	                    break;
	                case 'h':
	                    var h = date.getHours();
	                    output += f1('h', (h > 12 ? (h - 12) : (h == 0 ? 12 : h)), 2);
	                    break;
	                case 'H':
	                    output += f1('H', date.getHours(), 2);
	                    break;
	                case 'i':
	                    output += f1('i', date.getMinutes(), 2);
	                    break;
	                case 's':
	                    output += f1('s', date.getSeconds(), 2);
	                    break;
	                case 'a':
	                    output += date.getHours() > 11 ? 'pm' : 'am';
	                    break;
	                case 'A':
	                    output += date.getHours() > 11 ? 'PM' : 'AM';
	                    break;
	                case "'":
	                    if (look("'")) {
	                        output += "'";
	                    } else {
	                        literal = true;
	                    }
	                    break;
	                default:
	                    output += format.charAt(i);
	                }
	            }
	        }
	        return output;
	    };

	    /**
	    * Extract a date from a string value with a specified format.
	    * @param {String} format - Input format.
	    * @param {String} value - String to parse.
	    * @param {Object} settings - Settings.
	    * @return {Date} - Returns the extracted date.
	    */
	    ms.parseDate = function (format, value, settings) {
	        var def = new Date();

	        if (!format || !value) {
	            return def;
	        }

	        value = (typeof value == 'object' ? value.toString() : value + '');

	        var s = $.extend({}, defaults, settings),
	            shortYearCutoff = s.shortYearCutoff,
	            year = def.getFullYear(),
	            month = def.getMonth() + 1,
	            day = def.getDate(),
	            doy = -1,
	            hours = def.getHours(),
	            minutes = def.getMinutes(),
	            seconds = 0, //def.getSeconds(),
	            ampm = -1,
	            literal = false, // Check whether a format character is doubled
	            lookAhead = function (match) {
	                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
	                if (matches) {
	                    iFormat++;
	                }
	                return matches;
	            },
	            getNumber = function (match) { // Extract a number from the string value
	                lookAhead(match);
	                var size = (match == '@' ? 14 : (match == '!' ? 20 : (match == 'y' ? 4 : (match == 'o' ? 3 : 2)))),
	                    digits = new RegExp('^\\d{1,' + size + '}'),
	                    num = value.substr(iValue).match(digits);

	                if (!num) {
	                    return 0;
	                }
	                //throw 'Missing number at position ' + iValue;
	                iValue += num[0].length;
	                return parseInt(num[0], 10);
	            },
	            getName = function (match, s, l) { // Extract a name from the string value and convert to an index
	                var names = (lookAhead(match) ? l : s),
	                    i;

	                for (i = 0; i < names.length; i++) {
	                    if (value.substr(iValue, names[i].length).toLowerCase() == names[i].toLowerCase()) {
	                        iValue += names[i].length;
	                        return i + 1;
	                    }
	                }
	                return 0;
	                //throw 'Unknown name at position ' + iValue;
	            },
	            checkLiteral = function () {
	                //if (value.charAt(iValue) != format.charAt(iFormat))
	                //throw 'Unexpected literal at position ' + iValue;
	                iValue++;
	            },
	            iValue = 0,
	            iFormat;

	        for (iFormat = 0; iFormat < format.length; iFormat++) {
	            if (literal) {
	                if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
	                    literal = false;
	                } else {
	                    checkLiteral();
	                }
	            } else {
	                switch (format.charAt(iFormat)) {
	                case 'd':
	                    day = getNumber('d');
	                    break;
	                case 'D':
	                    getName('D', s.dayNamesShort, s.dayNames);
	                    break;
	                case 'o':
	                    doy = getNumber('o');
	                    break;
	                case 'm':
	                    month = getNumber('m');
	                    break;
	                case 'M':
	                    month = getName('M', s.monthNamesShort, s.monthNames);
	                    break;
	                case 'y':
	                    year = getNumber('y');
	                    break;
	                case 'H':
	                    hours = getNumber('H');
	                    break;
	                case 'h':
	                    hours = getNumber('h');
	                    break;
	                case 'i':
	                    minutes = getNumber('i');
	                    break;
	                case 's':
	                    seconds = getNumber('s');
	                    break;
	                case 'a':
	                    ampm = getName('a', ['am', 'pm'], ['am', 'pm']) - 1;
	                    break;
	                case 'A':
	                    ampm = getName('A', ['am', 'pm'], ['am', 'pm']) - 1;
	                    break;
	                case "'":
	                    if (lookAhead("'")) {
	                        checkLiteral();
	                    } else {
	                        literal = true;
	                    }
	                    break;
	                default:
	                    checkLiteral();
	                }
	            }
	        }
	        if (year < 100) {
	            year += new Date().getFullYear() - new Date().getFullYear() % 100 +
	                (year <= (typeof shortYearCutoff != 'string' ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10)) ? 0 : -100);
	        }
	        if (doy > -1) {
	            month = 1;
	            day = doy;
	            do {
	                var dim = 32 - new Date(year, month - 1, 32).getDate();
	                if (day <= dim) {
	                    break;
	                }
	                month++;
	                day -= dim;
	            } while (true);
	        }
	        hours = (ampm == -1) ? hours : ((ampm && hours < 12) ? (hours + 12) : (!ampm && hours == 12 ? 0 : hours));
	        var date = new Date(year, month - 1, day, hours, minutes, seconds);
	        if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day) {
	            throw 'Invalid date';
	        }
	        return date;
	    };

	})(jQuery);


/***/ })
/******/ ]);