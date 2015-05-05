# Tooltip plugin:
$.fn.tooltip = (options) ->
	options =
		position: options.position || 'right'
		content : options.content || 'I am tooltip'

	$this = $(this)
	$body = $('body')
	elemWidth = $this.outerWidth(true)
	elemHeight = $this.outerHeight(true)
	topEdge = $this.offset().top
	bottomEdge = topEdge + elemHeight
	leftEdge = $this.offset().left
	rightEdge = leftEdge + elemWidth

	markup = "<div class='tooltip tooltip_#{options.position}' data-name='#{($this.attr("name") or $this.data("name") or "")}'>
				<div class='tooltip__inner'>#{options.content}</div>
			 </div>";

	$body.append markup

	createdTooltip = $body.find('.tooltip').last()
	tooltipHeight = createdTooltip.outerHeight(true)
	tooltipWidth = createdTooltip.outerWidth(true)
	leftCentered = (elemWidth / 2) - (tooltipWidth / 2)
	topCentered = (elemHeight / 2) - (tooltipHeight / 2)
	positions = {}

	switch options.position
		when 'right'
			positions =
				left : rightEdge
				top : topEdge + topCentered

		when 'top'
			positions =
				left: leftEdge + leftCentered
				top: topEdge - tooltipHeight

		when 'bottom'
			positions =
				left: leftEdge + leftCentered
				top: bottomEdge

		when 'left'
			positions =
				left: leftEdge - tooltipWidth
				top: topEdge + topCentered

	createdTooltip
	.offset positions
	.css 'opacity', '1'

	$(window).on 'resize', ->
		do $('.tooltip').remove