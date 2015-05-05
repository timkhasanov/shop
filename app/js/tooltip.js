(function() {
  $.fn.tooltip = function(options) {
    var $body, $this, bottomEdge, createdTooltip, elemHeight, elemWidth, leftCentered, leftEdge, markup, positions, rightEdge, tooltipHeight, tooltipWidth, topCentered, topEdge;
    options = {
      position: options.position || 'right',
      content: options.content || 'I am tooltip'
    };
    $this = $(this);
    $body = $('body');
    elemWidth = $this.outerWidth(true);
    elemHeight = $this.outerHeight(true);
    topEdge = $this.offset().top;
    bottomEdge = topEdge + elemHeight;
    leftEdge = $this.offset().left;
    rightEdge = leftEdge + elemWidth;
    markup = "<div class='tooltip tooltip_" + options.position + "' data-name='" + ($this.attr("name") || $this.data("name") || "") + "'> <div class='tooltip__inner'>" + options.content + "</div> </div>";
    $body.append(markup);
    createdTooltip = $body.find('.tooltip').last();
    tooltipHeight = createdTooltip.outerHeight(true);
    tooltipWidth = createdTooltip.outerWidth(true);
    leftCentered = (elemWidth / 2) - (tooltipWidth / 2);
    topCentered = (elemHeight / 2) - (tooltipHeight / 2);
    positions = {};
    switch (options.position) {
      case 'right':
        positions = {
          left: rightEdge,
          top: topEdge + topCentered
        };
        break;
      case 'top':
        positions = {
          left: leftEdge + leftCentered,
          top: topEdge - tooltipHeight
        };
        break;
      case 'bottom':
        positions = {
          left: leftEdge + leftCentered,
          top: bottomEdge
        };
        break;
      case 'left':
        positions = {
          left: leftEdge - tooltipWidth,
          top: topEdge + topCentered
        };
    }
    createdTooltip.offset(positions).css('opacity', '1');
    return $(window).on('resize', function() {
      return $('.tooltip').remove();
    });
  };

}).call(this);
