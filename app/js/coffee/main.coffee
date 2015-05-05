"use strict"

# Main:
# back to top btn
# scroll to top
app = do ->

	init = ->
		_setUpListeners()

	_setUpListeners = ->
		$(window).on 'load resize', ->
			_backToTopPosition()
		$('.to-top-btn').on 'click', _scrollToTop

	_backToTopPosition = ->
		$toTop = $('.to-top-btn')
		maxPos = $(document).height() - $('.footer').outerHeight()
		divider = 5

		$(window).scroll ->
			curPos = $(window).scrollTop() + $(window).height()
			if	curPos > maxPos
				$toTop.css 'bottom', curPos - maxPos + divider
			else
				$toTop.css 'bottom', divider

			if $(this).scrollTop()
				$toTop.fadeIn()
			else
				$toTop.fadeOut()

	_scrollToTop = (e) ->
		if e.preventDefault then e.preventDefault() else e.returnValue
		$('html, body').stop().animate
			scrollTop: 0, '500'

	{init:init}

app.init()