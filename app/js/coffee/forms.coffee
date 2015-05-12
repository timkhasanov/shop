'use strict'

# Custom select:
# show
# change option
# hide
# validate
# clean
customSelect = do ->

	init = ->
		setUpListeners()

	setUpListeners = ->
		$('.custom-select').on 'click touchstart', showCustomSelect
		$('.custom-select__list-item').on 'click touchstart', changeSelectOption
		$(document).on 'click touchstart', hideCustomSelect

	showCustomSelect = ->
		$select = $(this)
		$selectList = $select.find('.custom-select__list')

		if $select.hasClass('custom-select_active')
			$select.removeClass 'custom-select_active'
			$selectList.not(':animated').slideUp()
		else
			$select.addClass 'custom-select_active'
			$selectList.not(':animated').slideDown()
		return false

	changeSelectOption = ->
		$item = $(this)
		itemVal = $item.attr('data-value')
		$itemHidden = $item.parents('.custom-select').find('.custom-select__control-required')
		$itemParent = $item.parents('.custom-select').find('.custom-select__control')

		$(".tooltip[data-name = \"" + $itemHidden.attr("name") + "\"]").remove()

		$itemParent.removeClass('error').addClass('custom-select__control_selected').text(itemVal)
		$itemHidden.val(itemVal)

	hideCustomSelect = ->
		$('.custom-select').removeClass 'custom-select_active'
		$('.custom-select__list').not(':animated').slideUp()

	validateCustomSelect = ->
		$itemHidden = $('.custom-select__control-required')
		valid = true

		$.each $itemHidden, ->
			$control = $(this)
			$controlParent = $control.parents('.custom-select').find('.custom-select__control')
			controlVal = $control.val();

			if controlVal.length is 0
				$controlParent.addClass 'error'
				if $control.attr('name') is 'day'
					$controlParent.tooltip
						content: 'Укажите день'
						position: 'left'
				else
					$controlParent.tooltip
						content: 'Укажите месяц'
				valid = false
			return
		return valid

	cleanCustomSelect = ->
		$select = $('.custom-select')
		$selectList = $('.custom-select__list')
		$selectControl = $('.custom-select__control')
		$itemHidden = $('.custom-select__control-required')

		$select.removeClass 'custom-select_active'
		$selectList.slideUp()
		$selectControl.removeClass 'custom-select__control_selected error'
		$itemHidden.val('')

		$.each $selectControl, ->
			selectDefault = $(this).attr('data-default')
			$(this).text(selectDefault)
			return

	{
		init: init
		clean: cleanCustomSelect
		hide: hideCustomSelect
		validate: validateCustomSelect
	}

customSelect.init()

# Initialization scrollbar plugin
$(window).on 'load', ->
	$('.custom-select__list').mCustomScrollbar
		theme: 'my-theme'



# Forms:
# ie placeholder
# form submit
# form validation
# form hide error
# form clear
forms = do ->

	init = ->
		setUpListeners()
		iePlaceholder()

	setUpListeners = ->
		$form = $('form')

		$form.on 'reset', formClear
		$form.on 'submit', formSubmit
		$form.on 'keydown', '.required', formHideError

	iePlaceholder = ->
		unless 'placeholder' of document.createElement('input')
			$('[placeholder]')
			.on('focus', ->
				$input = $(this)
				if $input.val() is $input.attr('placeholder')
					$input.val('')
				return
			).on('blur', ->
				$input = $(this)
				if $input.val() is '' or $input.val() is $input.attr('placeholder')
					$input.val $input.attr('placeholder')
				return
			).blur().parents('form').submit ->
				$(this).find('[placeholder]').each ->
					$input = $(this)
					if $input.val() is $input.attr('placeholder')
						$input.val('')
					return
				return

		setTimeout (->
			$('[placeholder]').trigger 'blur'
		), 100

	formSubmit = (e) ->
		if e.preventDefault then e.preventDefault() else e.returnValue

		$form = $(this)
		$formTitle = $form.find('.form__title')
		formAction = $form.attr('action')
		$sbtBtn = $form.find('input[type="submit"]')
		$rstBtn = $form.find('input[type="reset"]')
		formValidated = formValidation($form)
		customValidated = customSelect.validate()

		customSelect.hide()
		$form.find('.message').remove()

		if formValidated is true and customValidated is true
			$sbtBtn.add($rstBtn).attr('disabled', 'disabled')

			$.ajax(
				type: 'POST'
				url: formAction
				data: $form.serialize()
			).done((data) ->
				data = JSON.parse(data)
				if data.status is 'OK'
					formClear()
					$formTitle.after '<div class="message message_success">' + data.msg + '</div>'
				else
					$formTitle.after '<div class="message message_error">' + data.msg + '</div>'
			).always ->
				$sbtBtn.add($rstBtn).removeAttr 'disabled'

	formValidation = ($form) ->
		$controlList = $form.find('.required')
		valid = true

		$.each $controlList, ->
			$control = $(this)
			controlVal = $control.val()
			placeholder = $control.attr('placeholder')

			if controlVal.length is 0 or controlVal is placeholder
				$control.addClass 'error'

				if $control.attr('name') is 'name'
					$control.tooltip
						content: 'Введите Имя'
				else if $control.attr('name') is 'phone'
					$control.tooltip
						content: 'Введите телефон'
				else
					$control.tooltip
						content: 'Заполните Поле'
				valid = false
			return

		iePlaceholder()

		return valid

	formHideError = ->
		$(this).removeClass 'error'
		$('.tooltip[data-name = "' + $(this).attr('name') + '"]').remove()

	formClear = ->
		$form = $('form')

		$form.find('.message').remove()
		$form.find('.required').val('').removeClass 'error'
		$form.find('.btn-container input').removeAttr 'disabled'

		$('.tooltip').remove()
		customSelect.clean()
		iePlaceholder()

	{init: init}

forms.init()