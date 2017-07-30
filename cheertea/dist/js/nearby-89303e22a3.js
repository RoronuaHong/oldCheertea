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

	;(function() {
	    var $ = __webpack_require__(7);
	    var baidumap = __webpack_require__(28);
	    var swiperfun = __webpack_require__(9);

	    __webpack_require__(5);
	    __webpack_require__(13);

	    var nearBy = function() {
	        if(this instanceof nearBy) {

	        } else {
	            return new nearBy();
	        }
	    }
	    nearBy.prototype = {
	        init: function() {
	            baidumap.init().nearbyOne().searchfun().changeAddress();

	            //防止微信黑色背景
	            //$("body").on("touchmove", function(event) {
	            //    if($(event.target).parents().hasClass("goodlistbox")) {
	            //        alert(1);
	            //    } else {
	            //        event.preventDefault();
	            //    }
	            //}, false);
	        }
	    }
	    var nearby = new nearBy();
	    nearby.init();
	})();

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
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
/* 6 */,
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
/* 11 */,
/* 12 */,
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(7);

	;(function() {
		var isRemind = module.exports = function() {
			if(this instanceof isRemind) {

			} else {
				return new isRemind();
			}
		}
		isRemind.prototype = {
			showIsmind: function(mainEle, text) {
				$(mainEle).css({
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					width: "70%",
					height: ".98rem",
					margin: "auto",
					lineHeight: ".98rem",
					background: "rgba(0,0,0,0.5)",
					fontSize: ".44rem",
					textAlign: "center",
					opacity: "0",
					color: "#fff",
					borderRadius: "2rem",
			        opacity: "1",
			        zIndex: 153,
			        transition: "background 3s linear"
			    });
				$(mainEle).html(text);
			    setTimeout(function() {
			        $(mainEle).css({
			            opacity: "0",
			            zIndex: -1,
			            transition: "all 1s linear"
			        })
			    }, 3000);
			}
		}
	})();

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	;(function() {
	    var $ = __webpack_require__(7);
	    var Ajax = __webpack_require__(8);
	    var imgChange = __webpack_require__(10);
	    var isRemind = __webpack_require__(17);

	    var isremind = new isRemind();
	    var imgchange = new imgChange();

	    //是否是第一次点击
	    var isFirst = true;

	    __webpack_require__(13);

	    var baiduMap = module.exports = {
	        init: function() {
	            var _this = this;
	            var newstance = [];
	            var markerArrs = [];
	            var pointArrs = [];
	            var iconArrs = [];

	            this.map = new BMap.Map("allmap");
	            this.map.addControl(new BMap.NavigationControl());
	            this.map.addControl(new BMap.OverviewMapControl());
	            this.map.addControl(new BMap.ScaleControl());

	            /*定位公司地址*/
	            function comPoistion() {

	                //公司覆盖物
	                var comIcon = new BMap.Icon(
	                    "http://images.cheertea.com/baidumap.png",
	                    new BMap.Size(22, 27),
	                    {
	                        offset: new BMap.Size(0, 0),
	                        imageSize: new BMap.Size(80, 480),
	                        imageOffset: new BMap.Size(0.1, -27.5 * 12)
	                    }
	                );

	                var comPoint = new BMap.Point(118.201271, 24.498624);
	                var comMarker = new BMap.Marker(comPoint, {icon: comIcon});
	                _this.map.addOverlay(comMarker);
	            }
	            comPoistion();

	            //点击实现小图
	            $(".downarrow").on("touchend", function(event) {
	                event.preventDefault();
	                $(".bigsearchbox").hide();
	                $(".chengaddressbox").hide();
	                $(".nearbytwo").hide();
	                $(".nearbyone").show();
	            });

	            this.mySwiper = new Swiper('#baiducon', {
	                autoplayDisableOnInteraction: false,
	                watchSlidesProgress: true,
	                watchSlidesVisibility: true,
	                slidesPerView: 1.1,
	                centeredSlides: true,
	                observer: true,
	                observeParents: true,
	                onSlideChangeStart: function () {
	                    getAjax(5, _this.map.getCenter().lat, _this.map.getCenter().lng, _this.mySwiper.activeIndex);
	                }
	            });

	            //添加点击事件
	            function addClickHandler(newdata, marker, indexs) {
	                marker.addEventListener("click", function(e) {
	                    addMarker(newdata, indexs);

	                    //实现滑动效果
	                    _this.mySwiper.slideTo(indexs);
	                });
	            }

	            //获取当前坐标周边的店铺并添加覆盖物函数
	            function addMarker(newdata, num) {
	                var markerArr = [];
	                var pointArr = [];
	                var iconArr = [];

	                //清除所有覆盖物
	                _this.map.clearOverlays();
	                comPoistion();

	                //绘制覆盖物
	                $.each(newdata, function(i) {
	                    if(i < 5) {

	                        //蓝色覆盖物基本绘制
	                        iconArr[i] = new BMap.Icon(
	                            "http://images.cheertea.com/baidumap.png",
	                            new BMap.Size(22, 27),
	                            {
	                                offset: new BMap.Size(0, 0),
	                                imageSize: new BMap.Size(80, 480),
	                                imageOffset: new BMap.Size(-27.5, -27.5 * 13)
	                            }
	                        );

	                        //红色覆盖物基本绘制
	                        iconArr[num] = new BMap.Icon(
	                            "http://images.cheertea.com/baidumap.png",
	                            new BMap.Size(25, 30),
	                            {
	                                offset: new BMap.Size(0, 0),
	                                imageSize: new BMap.Size(92, 515),
	                                imageOffset: new BMap.Size(0.1, -29.5 * 12)
	                            }
	                        );

	                        if (newdata[i].com_lng && newdata[i].com_lng) {
	                            pointArr[i] = new BMap.Point(newdata[i].com_lng, newdata[i].com_lat);
	                            markerArr[i] = new BMap.Marker(pointArr[i], {icon: iconArr[i]});
	                            _this.map.addOverlay(markerArr[i]);

	                            //点击事件
	                            addClickHandler(newdata, markerArr[i], i);
	                        }
	                    }
	                });
	            }

	            //ajax添加覆盖物
	            function getAjax(radiuss, lat, lng, number) {
	                Ajax({
	                    urls: "widget?type=baidumap&action=listNearby",
	                    types: "GET",
	                    dataTypes: "json",
	                    datas: {
	                        latitude: lat,
	                        longitude: lng,
	                        radius: radiuss
	                    },
	                    successes: function (data) {
	                        var datas = JSON.parse(data);

	                        if(datas.code == 1) {

	                            //获取当前坐标周边的店铺并添加覆盖物,默认第一个为红色指向
	                            addMarker(datas.data, number);
	                            //_this.mySwiper.slideTo(number);

	                            //插入数据
	                            $('.swiper-wrapper').children().remove();
	                            $.each(datas.data, function(i) {
	                                if(i < 5) {
	                                    newstance[i] = datas.data[i].distance > 1 ? (datas.data[i].distance).toFixed(1) + 'km' : (datas.data[i].distance * 1000).toFixed() + 'm';
	                                    var imgarr = [];

	                                    imgarr[i] = datas.data[i].com_image == "" ? "http://files.cheertea.com/statics/attachment/cheertea_logo.jpg" : datas.data[i].com_image;

	                                    $('.swiper-wrapper').append(
	                                        "<div class='swiper-slide' ids='" + datas.data[i].com_id + "' indexs='" + i + "'>" +
	                                        "<a href='" + datas.data[i].shopUrl + "'>" +
	                                        "<div class='conbox clearfix'>" +
	                                        "<img src='" + imgchange.show(imgarr[i]) + "' alt='' class='conimg'/>" +
	                                        "<div class='otherbox'>" +
	                                        "<p class='tit clearfix'>" +
	                                        "<span class='big'>" + datas.data[i].com_name + "</span>" +
	                                        "</p>" +
	                                        "<div class='address clearfix'>" +
	                                        "<span class='addre'>" + datas.data[i].com_address + "</span>" +
	                                        "<span class='distance'>距您" + newstance[i] + "</span>" +
	                                        "</div>" +
	                                        "</div>" +
	                                        "</div>" +
	                                        "</a>" +
	                                        "</div>"
	                                    );
	                                }
	                            });

	                            //插入显示更多
	                            $('.swiper-wrapper').append(
	                                "<div class='swiper-slide'>" +
	                                    "<div class='conbox clearfix newconbox'>" +
	                                        "<p class='texts'>点击查看更多店铺</p>" +
	                                        "<div class='chakanbtn'>点击查看</div>" +
	                                    "</div>" +
	                                "</div>"
	                            );

	                            //实现返回当前位置的功能
	                            $(".chakanbtn").on("touchend", function(event) {
	                                event.preventDefault();
	                                $(".nearbytwo").hide();
	                                $(".nearbyone").show();
	                                isFirst = false;
	                                _this.maps.clearOverlays();

	                                console.log(_this.map.getCenter().lng, _this.map.getCenter().lat)

	                                //重置地址
	                                var myicon = new BMap.Icon(
	                                    "http://images.cheertea.com/baidumap.png",
	                                    new BMap.Size(22, 27),
	                                    {
	                                        offset: new BMap.Size(0, 0),
	                                        imageSize: new BMap.Size(80, 480),
	                                        imageOffset: new BMap.Size(0.1, -29.8 * 12)
	                                    }
	                                );

	                                var aaapoint = new BMap.Point(_this.map.getCenter().lng, _this.map.getCenter().lat);
	                                var marker = new BMap.Marker(aaapoint, {icon: myicon});
	                                _this.maps.addOverlay(marker);

	                                //console.log(r.point.lng, r.point.lat)
	                                setTimeout(function() {
	                                    _this.maps.centerAndZoom(aaapoint, 100);
	                                }, 100);

	                                //重新设置店铺
	                                Ajax({
	                                    urls: "widget?type=baidumap&action=listNearbyDistance",
	                                    types: "GET",
	                                    dataTypes: "json",
	                                    datas: {
	                                        latitude: _this.map.getCenter().lat,
	                                        longitude: _this.map.getCenter().lng
	                                    },
	                                    successes: function (data) {
	                                        var datas = JSON.parse(data);
	                                        console.log(datas);
	                                        if(datas.code == 1) {

	                                            //获取当前坐标周边的店铺并添加覆盖物
	                                            addMarker(datas.data);

	                                            var newsdistances = [];
	                                            //解析地址
	                                            var geoc = new BMap.Geocoder();
	                                            geoc.getLocation(aaapoint, function(rs){
	                                                var addComp = rs.addressComponents;
	                                                $(".messagebox").html(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
	                                            });

	                                            //获取数据
	                                            $('.goodlistbox .innerbox').children().remove();
	                                            $.each(datas.data, function(i) {

	                                                //蓝色覆盖物基本绘制
	                                                iconArrs[i] = new BMap.Icon(
	                                                    "http://images.cheertea.com/baidumap.png",
	                                                    new BMap.Size(22, 27),
	                                                    {
	                                                        offset: new BMap.Size(0, 0),
	                                                        imageSize: new BMap.Size(80, 480),
	                                                        imageOffset: new BMap.Size(-27.5, -27.5 * 13)
	                                                    }
	                                                );

	                                                if(datas.data[i].com_lng && datas.data[i].com_lng) {
	                                                    pointArrs[i] = new BMap.Point(datas.data[i].com_lng, datas.data[i].com_lat);
	                                                    markerArrs[i] = new BMap.Marker(pointArrs[i], {icon: iconArrs[i]});
	                                                    _this.maps.addOverlay(markerArrs[i]);
	                                                }

	                                                newsdistances[i] = datas.data[i].distance > 1 ? (datas.data[i].distance).toFixed(1) + 'km' : (datas.data[i].distance * 1000).toFixed() + 'm';

	                                                var imgarr = [];
	                                                imgarr[i] = datas.data[i].com_image == "" ? "http://files.cheertea.com/statics/attachment/cheertea_logo.jpg" : datas.data[i].com_image;
	                                                $('.goodlistbox .innerbox').append(
	                                                    "<a href='" + datas.data[i].shopUrl + "'>" +
	                                                    "<div class='conbox clearfix'>" +
	                                                    "<img src='" + imgchange.show(imgarr[i]) + "' alt='' class='conimg'/>" +
	                                                    "<div class='otherbox'>" +
	                                                    "<p class='tit clearfix'>" +
	                                                    "<span class='big'>" + datas.data[i].com_name + "</span>" +
	                                                    "</p>" +
	                                                    "<div class='address clearfix'>" +
	                                                    "<span class='addre'>" + datas.data[i].com_address + "</span>" +
	                                                    "<span class='distance'>距您" + newsdistances[i] + "</span>" +
	                                                    "</div>" +
	                                                    "</div>" +
	                                                    "</div>" +
	                                                    "</a>"
	                                                );
	                                            });
	                                        }
	                                    }
	                                });
	                                _this.mySwiper.slideTo(0);
	                            });
	                        }
	                    }
	                });
	            }

	            //获取当前坐标位置
	            getAjax(5, this.map.getCenter().lat, this.map.getCenter().lng, 0);

	            //添加定位控件
	            var geolocationControl = new BMap.GeolocationControl();
	            geolocationControl.addEventListener("locationSuccess", function(e) {

	                //拖拽地图的时候获取中心点的坐标
	                //console.log(this.map.getCenter());
	            });
	            geolocationControl.addEventListener("locationError",function(e) {

	                // 定位失败事件
	                alert(e.message);
	            });

	            _this.map.addEventListener("zoomend", function() {

	                //拖拽地图的时候获取中心点的坐标
	                _this.map.clearOverlays();
	                comPoistion();
	                getAjax(5, _this.map.getCenter().lat, _this.map.getCenter().lng, 0);
	                console.log(_this.maps.getCenter().lng, _this.maps.getCenter().lat)
	                //console.log(map.getCenter());
	            }, false);

	            _this.map.addEventListener("moveend", function(event) {

	                //拖拽地图的时候获取中心点的坐标
	                _this.map.clearOverlays();
	                comPoistion();
	                getAjax(5, _this.map.getCenter().lat, _this.map.getCenter().lng, 0);
	                _this.map.panTo(this.getCenter().lat, this.getCenter().lng);
	                console.log(_this.maps.getCenter().lat, _this.maps.getCenter().lng)
	            }, false);

	            _this.map.addControl(geolocationControl);

	            var geolocation = new BMap.Geolocation();
	            geolocation.getCurrentPosition(function(r){
	                if(this.getStatus() == BMAP_STATUS_SUCCESS){
	                    this.point = new BMap.Point(r.point.lng, r.point.lat);
	                    _this.map.centerAndZoom(this.point, 100);
	                    _this.map.panTo(r.point.lng, r.point.lat);
	                }
	                else {
	                    alert('failed'+this.getStatus());
	                }
	            }, {enableHighAccuracy: true});

	            return this;
	        },
	        nearbyOne: function() {

	            var _this = this;
	            var newsdistance = [];
	            this.maps = new BMap.Map("nearbyslim");
	            this.maps.disableDragging();
	            this.maps.disableScrollWheelZoom();
	            //this.maps.addControl(new BMap.NavigationControl());
	            //this.maps.addControl(new BMap.OverviewMapControl());
	            //this.maps.addControl(new BMap.ScaleControl());

	            /*定位公司地址*/
	            function comPoistion() {

	                //公司覆盖物
	                var comIcon = new BMap.Icon(
	                    "http://images.cheertea.com/baidumap.png",
	                    new BMap.Size(22, 27),
	                    {
	                        offset: new BMap.Size(0, 0),
	                        imageSize: new BMap.Size(80, 480),
	                        imageOffset: new BMap.Size(0.1, -29.5 * 12)
	                    }
	                );

	                var comPoint = new BMap.Point(118.201271, 24.498624);
	                var comMarker = new BMap.Marker(comPoint, {icon: comIcon});
	                _this.maps.addOverlay(comMarker);
	            }
	            comPoistion();

	            //点击显示大地图
	            $(".uparrow").on("touchend", function(event) {
	                event.preventDefault();
	                $(".bigsearchbox").hide();
	                $(".chengaddressbox").hide();
	                $(".nearbytwo").show();
	                $(".nearbyone").hide();
	                setTimeout(function() {
	                    _this.map.centerAndZoom(_this.point, 100);
	                }, 100);
	            });

	            //获取当前坐标周边的店铺并添加覆盖物函数
	            function addMarker(newdata, num) {
	                var markerArr = [];
	                var pointArr = [];
	                var iconArr = [];

	                //清除所有覆盖物
	                _this.maps.clearOverlays();
	                comPoistion();

	                //绘制覆盖物
	                $.each(newdata, function(i) {

	                    //蓝色覆盖物基本绘制
	                    iconArr[i] = new BMap.Icon(
	                        "http://images.cheertea.com/baidumap.png",
	                        new BMap.Size(22, 27),
	                        {
	                            offset: new BMap.Size(0, 0),
	                            imageSize: new BMap.Size(80, 480),
	                            imageOffset: new BMap.Size(-27.5, -27.5 * 13)
	                        }
	                    );

	                    if(newdata[i].com_lng && newdata[i].com_lng) {
	                        pointArr[i] = new BMap.Point(newdata[i].com_lng, newdata[i].com_lat);
	                        markerArr[i] = new BMap.Marker(pointArr[i], {icon: iconArr[i]});
	                        _this.maps.addOverlay(markerArr[i]);
	                    }
	                });
	            }

	            var geolocation = new BMap.Geolocation();
	            geolocation.getCurrentPosition(function(r) {
	                if(this.getStatus() == BMAP_STATUS_SUCCESS) {

	                    Ajax({
	                        urls: "widget?type=baidumap&action=listNearbyDistance",
	                        types: "GET",
	                        dataTypes: "json",
	                        datas: {
	                            latitude: r.point.lat,
	                            longitude: r.point.lng
	                        },
	                        successes: function (data) {
	                            var datas = JSON.parse(data);

	                            if(datas.code == 1) {

	                                //获取当前坐标周边的店铺并添加覆盖物
	                                addMarker(datas.data);

	                                //获取起始点的坐标，并且添加覆盖物
	                                var mypoint = new BMap.Point(r.point.lng, r.point.lat);
	                                myicon = new BMap.Icon(
	                                    "http://images.cheertea.com/baidumap.png",
	                                    new BMap.Size(22, 27),
	                                    {
	                                        offset: new BMap.Size(0, 0),
	                                        imageSize: new BMap.Size(80, 480),
	                                        imageOffset: new BMap.Size(0.1, -29.8 * 12)
	                                    }
	                                );

	                                var marker = new BMap.Marker(mypoint, {icon: myicon});
	                                _this.maps.addOverlay(marker);
	                                var point = new BMap.Point(r.point.lng, r.point.lat);
	                                //console.log(r.point.lng, r.point.lat)
	                                _this.maps.centerAndZoom(point, 100);
	                                //map.panTo(r.point.lng, r.point.lat);

	                                //解析地址
	                                var geoc = new BMap.Geocoder();
	                                geoc.getLocation(r.point, function(rs){
	                                    var addComp = rs.addressComponents;
	                                    $(".messagebox").html(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
	                                });

	                                //获取数据
	                                $('.goodlistbox .innerbox').children().remove();
	                                $.each(datas.data, function(i) {
	                                    newsdistance[i] = datas.data[i].distance > 1 ? (datas.data[i].distance).toFixed(1) + 'km' : (datas.data[i].distance * 1000).toFixed() + 'm';
	                                    var imgarr = [];

	                                    imgarr[i] = datas.data[i].com_image == "" ? "http://files.cheertea.com/statics/attachment/cheertea_logo.jpg" : datas.data[i].com_image;

	                                    $('.goodlistbox .innerbox').append(
	                                        "<a href='" + datas.data[i].shopUrl + "'>" +
	                                            "<div class='conbox clearfix'>" +
	                                                "<img src='" + imgchange.show(imgarr[i]) + "' alt='' class='conimg'/>" +
	                                                "<div class='otherbox'>" +
	                                                    "<p class='tit clearfix'>" +
	                                                        "<span class='big'>" + datas.data[i].com_name + "</span>" +
	                                                    "</p>" +
	                                                    "<div class='address clearfix'>" +
	                                                        "<span class='addre'>" + datas.data[i].com_address + "</span>" +
	                                                        "<span class='distance'>距您" + newsdistance[i] + "</span>" +
	                                                    "</div>" +
	                                                "</div>" +
	                                            "</div>" +
	                                        "</a>"
	                                    );
	                                });
	                            }
	                        }
	                    });
	                }
	                else {
	                    alert('failed'+this.getStatus());
	                }
	            }, {enableHighAccuracy: true});

	            //添加点击事件
	            this.maps.addEventListener("click", function() {
	                istrue = true;
	                $(".nearbyone").hide();
	                $(".nearbytwo").show();

	                if(isFirst) {
	                    var geolocation = new BMap.Geolocation();
	                    geolocation.getCurrentPosition(function(r){
	                        if(this.getStatus() == BMAP_STATUS_SUCCESS){
	                            var point = new BMap.Point(r.point.lng, r.point.lat);
	                            _this.map.centerAndZoom(point, 100);
	                            _this.map.panTo(r.point.lng, r.point.lat);
	                        }
	                        else {
	                            alert('failed'+this.getStatus());
	                        }
	                    }, {enableHighAccuracy: true});
	                }
	            });

	            //判断后退按钮
	            $(".backs").on("touchend", function(event) {
	                event.preventDefault();
	                if($(".nearbytwo").css("display") == "block" || $(".chengaddressbox").css("display") == "block" || $(".bigsearchbox").css("display") == "block") {
	                    $(".bigsearchbox").hide();
	                    $(".chengaddressbox").hide();
	                    $(".nearbytwo").hide();
	                    $(".nearbyone").show();
	                } else {
	                    window.history.go(-1);
	                }
	            });

	            return this;
	        },
	        searchfun: function() {
	            var _this = this;

	            //设置数据
	            var ls = window.localStorage;
	            var arr = [];

	            function getLocalStorage() {

	                //获取历史记录
	                newarr = ls.getItem("arrs");
	                $(".historybox").children().remove();
	                if(newarr) {
	                    var newArrs = newarr.split(",");
	                    $(".bighisbox").show();

	                    $.each(newArrs, function(i) {
	                        $(".historybox").prepend(
	                            "<li>" + newArrs[i] + "</li>"
	                        );
	                    });
	                } else {
	                    $(".bighisbox").hide();
	                }

	                $(".historybox li").on("tap", function() {
	                    $(".inputs").val($(this).html());
	                });
	            }

	            $(".searchbox").on("touchend", function(event) {
	                $(".bigsearchbox").show();
	                $(".chengaddressbox").hide();
	                $(".nearbyone").hide();
	                $(".nearbytwo").hide();
	                _this.mySwiper.slideTo(0);
	                getLocalStorage();
	            });

	            //清空数据
	            $(".bighisbox .clearbtn").on("tap", function() {
	                $(".bighisbox").hide();
	                ls.clear();
	                arr.splice(0, arr.length);
	                $(".historybox").children().remove();
	            });

	            $(".cancelbtn").on("tap", function(event) {
	                $(".bighisbox").show();
	                $(".resultsul").hide();
	                $(".inputs").val("");
	            });

	            //点击搜索
	            $(".btnsear").on("touchend", function(event) {
	                if(ls.getItem("arrs")) {
	                    for(var i = 0; i < (ls.getItem("arrs").split(",")).length; i++) {
	                        arr[i] = (ls.getItem("arrs").split(","))[i];
	                    }
	                }

	                if($(".inputs").val()) {
	                    if(arr.length) {
	                        var boolean = false;
	                        for(var i = 0; i < arr.length; i++) {
	                            if(arr[i] == $(".inputs").val()) {
	                                boolean = true;
	                                arr.splice(i, 1);
	                                arr.push($(".inputs").val());
	                            }
	                        }
	                        if(!boolean) {
	                            arr.push($(".inputs").val());
	                        }
	                    } else {
	                        arr.push($(".inputs").val());
	                    }

	                    ls.setItem("arrs", arr);

	                    getLocalStorage();

	                    //ajax数据交互
	                    Ajax({
	                        urls: "widget?type=baidumap&action=searchShop",
	                        types: "POST",
	                        dataTypes: "json",
	                        datas: {
	                            shopName: $(".inputs").val()
	                        },
	                        successes: function(data) {
	                            var datas = JSON.parse(data);
	                            console.log(datas);
	                            $(".resultsul").children().remove();

	                            if(!!datas.data.length) {
	                                $(".bighisbox").hide();
	                                $.each(datas.data, function(i) {
	                                    if (datas.data[i].com_lng && datas.data[i].com_lat) {
	                                        $(".resultsul").append(
	                                            "<li>" + datas.data[i].com_name + "</li>"
	                                        );

	                                        $(".resultsul li").on("touchend", function (event) {
	                                            var indexs = $(this).index();
	                                            $(".bigsearchbox").hide();
	                                            $(".resultsul").hide();
	                                            $(".nearbytwo").show();
	                                            var indexs = $(this).index();

	                                            setTimeout(function () {

	                                                //将地址显示出来
	                                                var points = new BMap.Point(datas.data[indexs].com_lng, datas.data[indexs].com_lat);
	                                                _this.map.centerAndZoom(points, 100);
	                                                _this.map.panTo(datas.data[indexs].com_lng, datas.data[indexs].com_lat);
	                                                console.log(datas.data[indexs].com_lng, datas.data[indexs].com_lat);
	                                            }, 100);
	                                        });
	                                    }
	                                });
	                                $(".resultsul").show();
	                            } else {
	                                $(".resultsul").hide();
	                                $(".bighisbox").show();
	                                isremind.showIsmind(".isremindsbox", "店铺不存在，请重新输入");
	                            }
	                        },
	                    });
	                } else {
	                    isremind.showIsmind(".isremindsbox", "请输入店铺");
	                }
	            });

	            return this;
	        },
	        changeAddress: function() {
	            var _this = this;
	            var addArr = [];
	            var addnewArrs = [];
	            var addls = window.localStorage;

	            //获取定位的位置
	            function getPosition() {
	                var geolocation = new BMap.Geolocation();
	                geolocation.getCurrentPosition(function(r){
	                    if(this.getStatus() == BMAP_STATUS_SUCCESS) {

	                        //console.log(r.point);
	                        var geoc = new BMap.Geocoder();
	                        geoc.getLocation(r.point, function(rs) {
	                            var addComp = rs.addressComponents;
	                            $(".addretext").html(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
	                        });
	                    }
	                    else {
	                        alert('failed' + this.getStatus());
	                    }
	                }, {enableHighAccuracy: true});
	            }
	            getPosition();

	            //重新定位
	            $(".reposition").on("touchend", function(event) {
	                getPosition();
	            });

	            //是否切换
	            $(".messagebox").on("touchend", function() {
	                $(".chengaddressbox").show();
	                $(".nearbyone").hide();
	                $(".bigsearchbox").hide();
	                $(".nearbytwo").hide();

	                getLocalStorages();
	            });

	            function getLocalStorages() {
	                //获取历史记录
	                var addnewarr = addls.getItem("address");

	                if(addnewarr) {
	                    addnewArrs.splice(0, addnewArrs.length);

	                    for(var i = 0; i < (addnewarr.split(",")).length; i++) {
	                        addnewArrs[i] = (addnewarr.split(","))[i];
	                    }

	                    $(".addressul").children().remove();
	                    $.each(addnewArrs, function(i) {
	                        $(".addressul").prepend(
	                            "<li>" + addnewArrs[i] + "</li>"
	                        );
	                    });

	                    //点击实现显示在输入框的功能
	                    $(".addressul li").on("tap", function() {
	                        $(".addreinput").val($(this).html());
	                    });

	                    $(".addresshisbox").show();
	                } else {
	                    $(".addresshisbox").hide();
	                }
	            }

	            //清除缓存
	            $(".addresshisbox .clearbtn").on("tap", function() {
	                addls.clear();
	                $(".addressul").children().remove();
	                addArr.splice(0, addnewArrs.length);
	                $(".addresshisbox").hide();
	            });

	            //显示搜索地址
	            $(".changesearch").on("touchend", function() {

	                if(!!$(".addreinput").val()) {
	                    if(addArr.length) {
	                        var addBool = false;

	                        for(var i = 0; i < addArr.length; i++) {
	                            if(addArr[i] == $(".addreinput").val()) {
	                                addBool = true;
	                                addArr.splice(i, 1);
	                                addArr.push($(".addreinput").val());
	                            }
	                        }
	                        if(!addBool) {
	                            addArr.push($(".addreinput").val());
	                        }
	                    } else {
	                        addArr.push($(".addreinput").val());
	                    }

	                    addls.setItem("address", addArr);

	                    getLocalStorages();

	                    ////获取历史记录
	                    //var addnewarr = addls.getItem("address");
	                    //
	                    //if(addnewarr) {
	                    //    addnewArrs.splice(0, addnewArrs.length);
	                    //
	                    //    for(var i = 0; i < (addnewarr.split(",")).length; i++) {
	                    //        addnewArrs[i] = (addnewarr.split(","))[i];
	                    //    }
	                    //
	                    //    $(".addressul").children().remove();
	                    //    $.each(addnewArrs, function(i) {
	                    //        $(".addressul").prepend(
	                    //            "<li>" + addnewArrs[i] + "</li>"
	                    //        );
	                    //    });
	                    //
	                    //    //点击实现显示在输入框的功能
	                    //    $(".addressul li").on("tap", function() {
	                    //        $(".addreinput").val($(this).html());
	                    //    });
	                    //
	                    //    $(".addresshisbox").show();
	                    //} else {
	                    //    $(".addresshisbox").hide();
	                    //}

	                    $(".historybox li").on("tap", function() {
	                        $(".inputs").val($(this).html());
	                    });

	                    var searchaddress = $(".addreinput").val();

	                    var myGeo = new BMap.Geocoder();

	                    // 将地址解析结果显示在地图上,并调整地图视野
	                    myGeo.getPoint(searchaddress, function(point){
	                        if (point) {
	                            _this.map.centerAndZoom(point, 100);
	                            $(".chengaddressbox").hide();
	                            $(".nearbyone").hide();
	                            $(".bigsearchbox").hide();
	                            $(".nearbytwo").show();
	                            isremind.showIsmind(".isremindsbox", "重新定位成功！");
	                        } else {
	                            isremind.showIsmind(".isremindsbox", "地址不存在,请重新输入");
	                        }
	                    });
	                } else {
	                    isremind.showIsmind(".isremindsbox", "请输入地址");
	                }
	            });

	            return this;
	        }
	    }
	})();


/***/ })
/******/ ]);