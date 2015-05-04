;(function($) {	'use strict';	var slider = (function() {		var speed = 5000,			animSpeed = 1000,			$sliderList = $('.slider-list'),			$sliderBtns = $('.slider__btns'),			$sliderItems = $('.slider-list__item'),			sliderItemsCount = $sliderItems.length + 1,			sliderItemWidth,			leftValue,			sliderStart;		var init = function() {			sliderItemWidth = $sliderItems.outerWidth(true);			leftValue = sliderItemWidth * (-1);			_setUpListeners();		};		var _setUpListeners = function() {			_sliderInit();			_sliderStop();			$('.slider__btn_prev').on('click touchstart', _sliderPrevSlide);			$('.slider__btn_next').on('click touchstart', _sliderNextSlide);		};		var _sliderInit = function() {			$sliderBtns.fadeIn();			$sliderList.css({'left':leftValue, 'width': sliderItemWidth * sliderItemsCount});			sliderStart = setInterval(function(){_sliderRotate()}, speed);		};		var _sliderPrevSlide = function(e) {			e.preventDefault ? e.preventDefault() : e.returnValue;			var leftIndent = parseInt($sliderList.css('left')) + sliderItemWidth,				$firstSlide = $('.slider-list__item:first'),				$lastSlide = $('.slider-list__item:last');			$sliderList.not(':animated').animate({'left': leftIndent}, animSpeed, function(){				$firstSlide.before($lastSlide);				$sliderList.css({'left': leftValue});			});		};		var _sliderNextSlide  = function(e) {			e.preventDefault ? e.preventDefault() : e.returnValue;			var leftIndent = parseInt($sliderList.css('left')) - sliderItemWidth,				$firstSlide = $('.slider-list__item:first'),				$lastSlide = $('.slider-list__item:last');			$sliderList.not(':animated').animate({"left": leftIndent}, animSpeed, function(){				$lastSlide.after($firstSlide);				$sliderList.css({'left': leftValue});			});		};		var _sliderStop = function() {			$sliderList				.mouseenter(function(){					clearInterval(sliderStart);				})				.mouseleave(function(){					sliderStart = setInterval(function(){_sliderRotate()}, speed);				});		};		var _sliderRotate = function() {			$('.slider__btn_next').click();		};		return {			init: init		};	})();	$(window).on('load', function(){		slider.init();	});})(jQuery);