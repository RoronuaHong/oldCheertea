require("../common/swiper-3.4.2.min");

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