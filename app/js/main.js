(function() {
  "use strict";
  var app;

  app = (function() {
    var _backToTopPosition, _scrollToTop, _setUpListeners, init;
    init = function() {
      return _setUpListeners();
    };
    _setUpListeners = function() {
      $(window).on('load resize', function() {
        return _backToTopPosition();
      });
      return $('.to-top-btn').on('click', _scrollToTop);
    };
    _backToTopPosition = function() {
      var $toTop, divider, maxPos;
      $toTop = $('.to-top-btn');
      maxPos = $(document).height() - $('.footer').outerHeight();
      divider = 5;
      return $(window).scroll(function() {
        var curPos;
        curPos = $(window).scrollTop() + $(window).height();
        if (curPos > maxPos) {
          $toTop.css('bottom', curPos - maxPos + divider);
        } else {
          $toTop.css('bottom', divider);
        }
        if ($(this).scrollTop()) {
          return $toTop.fadeIn();
        } else {
          return $toTop.fadeOut();
        }
      });
    };
    _scrollToTop = function(e) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue;
      }
      return $('html, body').stop().animate({
        scrollTop: 0
      }, '500');
    };
    return {
      init: init
    };
  })();

  app.init();

}).call(this);
