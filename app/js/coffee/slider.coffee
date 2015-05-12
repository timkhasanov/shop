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
		setUpListeners()

	setUpListeners = ->
		sliderInit()
		sliderStop()
		$('.slider__btn_prev').on 'click touchstart', sliderPrevSlide
		$('.slider__btn_next').on 'click touchstart', sliderNextSlide

	sliderInit = ->
		$sliderBtns.fadeIn()
		$sliderList.css 'left':leftValue, 'width': sliderItemWidth * sliderItemsCount
		sliderStart = setInterval(->
			sliderRotate()
		, speed)

	sliderPrevSlide = (e) ->
		if e.preventDefault then e.preventDefault() else e.returnValue

		leftIndent = parseInt($sliderList.css 'left') + sliderItemWidth
		$firstSlide = $('.slider-list__item:first')
		$lastSlide = $('.slider-list__item:last')

		$sliderList.not(':animated').animate
			'left': leftIndent, animSpeed, ->
				$firstSlide.before($lastSlide)
				$sliderList.css 'left': leftValue

	sliderNextSlide  = (e) ->
		if e.preventDefault then e.preventDefault() else e.returnValue

		leftIndent = parseInt($sliderList.css 'left') - sliderItemWidth
		$firstSlide = $('.slider-list__item:first')
		$lastSlide = $('.slider-list__item:last')

		$sliderList.not(':animated').animate
			'left': leftIndent, animSpeed, ->
				$lastSlide.after($firstSlide)
				$sliderList.css 'left': leftValue

	sliderStop = ->
		$sliderList
			.mouseenter(->
				clearInterval sliderStart
			).mouseleave(->
				sliderStart = setInterval(->
					sliderRotate()
				, speed)
			)

	sliderRotate = ->
		$('.slider__btn_next').click()

	{init: init}

$(window).on 'load', ->
	slider.init()