(function() {
  'use strict';
  var slider;

  slider = (function() {
    var $sliderBtns, $sliderItems, $sliderList, animSpeed, init, leftValue, setUpListeners, sliderInit, sliderItemWidth, sliderItemsCount, sliderNextSlide, sliderPrevSlide, sliderRotate, sliderStart, sliderStop, speed;
    speed = 5000;
    animSpeed = 1000;
    $sliderList = $('.slider-list');
    $sliderBtns = $('.slider__btns');
    $sliderItems = $('.slider-list__item');
    sliderItemsCount = $sliderItems.length + 1;
    sliderItemWidth = 0;
    leftValue = 0;
    sliderStart = function() {};
    init = function() {
      sliderItemWidth = $sliderItems.outerWidth(true);
      leftValue = sliderItemWidth * (-1);
      return setUpListeners();
    };
    setUpListeners = function() {
      sliderInit();
      sliderStop();
      $('.slider__btn_prev').on('click touchstart', sliderPrevSlide);
      return $('.slider__btn_next').on('click touchstart', sliderNextSlide);
    };
    sliderInit = function() {
      $sliderBtns.fadeIn();
      $sliderList.css({
        'left': leftValue,
        'width': sliderItemWidth * sliderItemsCount
      });
      return sliderStart = setInterval(function() {
        return sliderRotate();
      }, speed);
    };
    sliderPrevSlide = function(e) {
      var $firstSlide, $lastSlide, leftIndent;
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue;
      }
      leftIndent = parseInt($sliderList.css('left')) + sliderItemWidth;
      $firstSlide = $('.slider-list__item:first');
      $lastSlide = $('.slider-list__item:last');
      return $sliderList.not(':animated').animate({
        'left': leftIndent
      }, animSpeed, function() {
        $firstSlide.before($lastSlide);
        return $sliderList.css({
          'left': leftValue
        });
      });
    };
    sliderNextSlide = function(e) {
      var $firstSlide, $lastSlide, leftIndent;
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue;
      }
      leftIndent = parseInt($sliderList.css('left')) - sliderItemWidth;
      $firstSlide = $('.slider-list__item:first');
      $lastSlide = $('.slider-list__item:last');
      return $sliderList.not(':animated').animate({
        'left': leftIndent
      }, animSpeed, function() {
        $lastSlide.after($firstSlide);
        return $sliderList.css({
          'left': leftValue
        });
      });
    };
    sliderStop = function() {
      return $sliderList.mouseenter(function() {
        return clearInterval(sliderStart);
      }).mouseleave(function() {
        return sliderStart = setInterval(function() {
          return sliderRotate();
        }, speed);
      });
    };
    sliderRotate = function() {
      return $('.slider__btn_next').click();
    };
    return {
      init: init
    };
  })();

  $(window).on('load', function() {
    return slider.init();
  });

}).call(this);
