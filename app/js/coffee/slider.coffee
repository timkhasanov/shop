'use strict'

# Slider:
# initialization
# prev slide
# next slide
# slider stop on hover
# slider rotate
slider = do ->
	speed = 5000
	animSpeed = 1000
	$sliderList = $('.slider-list')
	$sliderBtns = $('.slider__btns')
	$sliderItems = $('.slider-list__item')
	sliderItemsCount = $sliderItems.length + 1
	sliderItemWidth = 0
	leftValue = 0
	sliderStart = ->

	init = ->
		sliderItemWidth = $sliderItems.outerWidth(true)
		leftValue = sliderItemWidth * (-1)
		_setUpListeners()

	_setUpListeners = ->
		_sliderInit()
		_sliderStop()
		$('.slider__btn_prev').on 'click touchstart', _sliderPrevSlide
		$('.slider__btn_next').on 'click touchstart', _sliderNextSlide

	_sliderInit = ->
		$sliderBtns.fadeIn()
		$sliderList.css 'left':leftValue, 'width': sliderItemWidth * sliderItemsCount
		sliderStart = setInterval(->
			_sliderRotate()
		, speed)

	_sliderPrevSlide = (e) ->
		if e.preventDefault then e.preventDefault() else e.returnValue

		leftIndent = parseInt($sliderList.css 'left') + sliderItemWidth
		$firstSlide = $('.slider-list__item:first')
		$lastSlide = $('.slider-list__item:last')

		$sliderList.not(':animated').animate
			'left': leftIndent, animSpeed, ->
				$firstSlide.before($lastSlide)
				$sliderList.css 'left': leftValue

	_sliderNextSlide  = (e) ->
		if e.preventDefault then e.preventDefault() else e.returnValue

		leftIndent = parseInt($sliderList.css 'left') - sliderItemWidth
		$firstSlide = $('.slider-list__item:first')
		$lastSlide = $('.slider-list__item:last')

		$sliderList.not(':animated').animate
			'left': leftIndent, animSpeed, ->
				$lastSlide.after($firstSlide)
				$sliderList.css 'left': leftValue

	_sliderStop = ->
		$sliderList
			.mouseenter(->
				clearInterval sliderStart
			).mouseleave(->
				sliderStart = setInterval(->
					_sliderRotate()
				, speed)
			)

	_sliderRotate = ->
		$('.slider__btn_next').click()

	{init: init}

$(window).on 'load', ->
	slider.init()