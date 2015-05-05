(function() {
  'use strict';
  var customSelect, forms;

  customSelect = (function() {
    var $itemHidden, $select, $selectControl, $selectList, _changeSelectOption, _setUpListeners, _showCustomSelect, cleanCustomSelect, hideCustomSelect, init, validateCustomSelect;
    $select = {};
    $selectList = {};
    $selectControl = {};
    $itemHidden = {};
    init = function() {
      $select = $('.custom-select');
      $selectList = $('.custom-select__list');
      $selectControl = $('.custom-select__control');
      $itemHidden = $('.custom-select__control-required');
      return _setUpListeners();
    };
    _setUpListeners = function() {
      $select.on('click touchstart', _showCustomSelect);
      $('.custom-select__list-item').on('click touchstart', _changeSelectOption);
      return $(document).on('click touchstart', hideCustomSelect);
    };
    _showCustomSelect = function() {
      $select = $(this);
      $selectList = $select.find('.custom-select__list');
      if ($select.hasClass('custom-select_active')) {
        $select.removeClass('custom-select_active');
        return $selectList.not(':animated').slideUp();
      } else {
        $select.addClass('custom-select_active');
        return $selectList.not(':animated').slideDown();
      }
    };
    _changeSelectOption = function() {
      var $item, $itemParent, itemVal;
      $item = $(this);
      itemVal = $item.attr('data-value');
      $itemHidden = $item.parents('.custom-select').find('.custom-select__control-required');
      $itemParent = $item.parents('.custom-select').find('.custom-select__control');
      $(".tooltip[data-name = \"" + $itemHidden.attr("name") + "\"]").remove();
      $itemParent.removeClass('error').addClass('custom-select__control_selected').text(itemVal);
      return $itemHidden.val(itemVal);
    };
    hideCustomSelect = function() {
      if ($select.hasClass('custom-select_active')) {
        $select.removeClass('custom-select_active');
        return $selectList.not(':animated').slideUp();
      }
    };
    validateCustomSelect = function() {
      var valid;
      valid = true;
      $.each($itemHidden, function() {
        var $control, $controlParent, controlVal;
        $control = $(this);
        $controlParent = $control.parents('.custom-select').find('.custom-select__control');
        controlVal = $control.val();
        if (controlVal.length === 0) {
          $controlParent.addClass('error');
          if ($control.attr('name') === 'day') {
            $controlParent.tooltip({
              content: 'Укажите день',
              position: 'left'
            });
          } else {
            $controlParent.tooltip({
              content: 'Укажите месяц'
            });
          }
          valid = false;
        }
      });
      return valid;
    };
    cleanCustomSelect = function() {
      $itemHidden = $('.custom-select__control-required');
      $select.removeClass('custom-select_active');
      $selectList.slideUp();
      $selectControl.removeClass('custom-select__control_selected error');
      $itemHidden.val('');
      return $.each($selectControl, function() {
        var selectDefault;
        selectDefault = $(this).attr('data-default');
        $(this).text(selectDefault);
      });
    };
    return {
      init: init,
      clean: cleanCustomSelect,
      hide: hideCustomSelect,
      validate: validateCustomSelect
    };
  })();

  customSelect.init();

  $(window).on('load', function() {
    return $('.custom-select__list').mCustomScrollbar({
      theme: 'my-theme'
    });
  });

  forms = (function() {
    var _formClear, _formHideError, _formSubmit, _formValidation, _iePlaceholder, _setUpListeners, init;
    init = function() {
      _setUpListeners();
      return _iePlaceholder();
    };
    _setUpListeners = function() {
      var $form;
      $form = $('form');
      $form.on('reset', _formClear);
      $form.on('submit', _formSubmit);
      return $form.on('keydown', '.required', _formHideError);
    };
    _iePlaceholder = function() {
      if (!('placeholder' in document.createElement('input'))) {
        $('[placeholder]').on('focus', function() {
          var $input;
          $input = $(this);
          if ($input.val() === $input.attr('placeholder')) {
            $input.val('');
          }
        }).on('blur', function() {
          var $input;
          $input = $(this);
          if ($input.val() === '' || $input.val() === $input.attr('placeholder')) {
            $input.val($input.attr('placeholder'));
          }
        }).blur().parents('form').submit(function() {
          $(this).find('[placeholder]').each(function() {
            var $input;
            $input = $(this);
            if ($input.val() === $input.attr('placeholder')) {
              $input.val('');
            }
          });
        });
      }
      return setTimeout((function() {
        return $('[placeholder]').trigger('blur');
      }), 100);
    };
    _formSubmit = function(e) {
      var $form, $formTitle, $rstBtn, $sbtBtn, customValidated, formAction, formValidated;
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue;
      }
      $form = $(this);
      $formTitle = $form.find('.form__title');
      formAction = $form.attr('action');
      $sbtBtn = $form.find('input[type="submit"]');
      $rstBtn = $form.find('input[type="reset"]');
      formValidated = _formValidation($form);
      customValidated = customSelect.validate();
      customSelect.hide();
      $form.find('.message').remove();
      if (formValidated === true && customValidated === true) {
        $sbtBtn.add($rstBtn).attr('disabled', 'disabled');
        return $.ajax({
          type: 'POST',
          url: formAction,
          data: $form.serialize()
        }).done(function(data) {
          data = JSON.parse(data);
          if (data.status === 'OK') {
            _formClear();
            return $formTitle.after('<div class="message message_success">' + data.msg + '</div>');
          } else {
            return $formTitle.after('<div class="message message_error">' + data.msg + '</div>');
          }
        }).always(function() {
          return $sbtBtn.add($rstBtn).removeAttr('disabled');
        });
      }
    };
    _formValidation = function($form) {
      var $controlList, valid;
      $controlList = $form.find('.required');
      valid = true;
      $.each($controlList, function() {
        var $control, controlVal, placeholder;
        $control = $(this);
        controlVal = $control.val();
        placeholder = $control.attr('placeholder');
        if (controlVal.length === 0 || controlVal === placeholder) {
          $control.addClass('error');
          if ($control.attr('name') === 'name') {
            $control.tooltip({
              content: 'Введите Имя'
            });
          } else if ($control.attr('name') === 'phone') {
            $control.tooltip({
              content: 'Введите телефон'
            });
          } else {
            $control.tooltip({
              content: 'Заполните Поле'
            });
          }
          valid = false;
        }
      });
      _iePlaceholder();
      return valid;
    };
    _formHideError = function() {
      $(this).removeClass('error');
      return $('.tooltip[data-name = "' + $(this).attr('name') + '"]').remove();
    };
    _formClear = function() {
      var $form;
      $form = $('form');
      $form.find('.message').remove();
      $form.find('.required').val('').removeClass('error');
      $form.find('.btn-container input').removeAttr('disabled');
      $('.tooltip').remove();
      customSelect.clean();
      return _iePlaceholder();
    };
    return {
      init: init
    };
  })();

  forms.init();

}).call(this);
