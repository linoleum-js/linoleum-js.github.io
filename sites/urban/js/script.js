(function(){
	var selectedImage = 0;
	var delayValue = 5000;
	var n = $('.slider div.slider-item').length;

	function show(n) {
		$('.slider div.slider-item').fadeOut(500).removeClass('selected-img');
		$('.slider div.slider-item').eq(n).fadeIn(500).addClass('selected-img');
		$('.ctrl-bottom span').removeClass('selected-item');
		$('.ctrl-bottom span').eq(n).addClass('selected-item');
	}

	$('.ctrl-bottom span').live('click', function(){
		if($(this).hasClass('selected-item')) return;
		selectedImage = $(this).index();
		show(selectedImage);
	});

	var cycle = setInterval(nextImage, delayValue);

	function nextImage() {
		selectedImage = (selectedImage + 1)%n;
		show(selectedImage);
	}

	$('.slider').mouseover(function(){
		clearInterval(cycle);
	});

	$('.slider').mouseout(function(){
		cycle = setInterval(nextImage, delayValue);
	});
})();

(function(){
	var n = $('.slider div.slider-item').length;
	$('.ctrl-bottom').append($('<span/>').addClass('selected-item'));
	for(var i = 0; i < n - 1; i++) {
		$('.ctrl-bottom').append($('<span/>'));
	}
})();


$(document).ready(function() {
	var slideDrag,
	slideWidth = 700,
	slideSpeed = 100;

	$(".carousel-slider").slider({
		animate: slideSpeed,
		start: checkType,
		slide: doSlide,
		max: slideWidth
	});

	function checkType(e) {
		slideDrag = $(e.originalEvent.target).hasClass("ui-slider-handle");
	}

	function doSlide(e, ui) {
		var target = $(e.target).prev(".scroll-content"),
		maxScroll = target.attr("scrollWidth") - target.width();
		if (slideDrag == true) {
			target.attr({scrollLeft: ui.value * (maxScroll / slideWidth) });
			var w = $('.carousel ul').width();
			var pos = w*parseFloat($('.carousel-slider a').css('left'))/95;
			$('.carousel ul').css('left', -pos);
		}
		else{
			target.stop().animate({
				scrollLeft: ui.value * (maxScroll / slideWidth)
			}, slideSpeed);
			target.attr({scrollLeft: ui.value * (maxScroll / slideWidth) });
			var cycle = setInterval(step, 50);
			function step() {
				var w = $('.carousel ul').width();
				var pos = w*parseFloat($('.carousel-slider a').css('left'))/95;
				if(Math.abs(parseInt($('.carousel ul').css('left')) + pos) < 1) {
					clearInterval(cycle);
					return;
				}
				$('.carousel ul').css('left', -pos);
			}
		}
	}
});
