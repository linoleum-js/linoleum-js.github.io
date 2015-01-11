$('.header-menu li').hover(function () {
	var sub = $(this).children('ul');

	if (sub) {
		sub.css('display', 'block');
	}
}, function () {
	var sub = $(this).children('ul');

	if (sub) {
		sub.css('display', 'none');
	}
});

$('.submenu').hover(function () {
	var sub = $(this).children('ul');

	if (sub) {
		sub.css('display', 'block');
	}
});

jQuery(document).ready(function () {
	jQuery('.test-drive').jcarousel({
		wrap: 'circular',
		scroll: 2
	});
});

(function () {
	var currentSlide = 0,
		cycle = setInterval(nextSlide, 5000),
		previewItems = $('.slider-preview-item'),
		ctrlBottom = $('.ctrl-bottom li'),
		sliderItems = $('.slider-item'),
		slider = $('.slider');

	function changeSlide(t) {
		previewItems.removeClass('preview-selected');
		sliderItems.removeClass('slider-item-selected').fadeOut(500);
		ctrlBottom.removeClass('ctrl-selected');
		previewItems.eq(t).addClass('preview-selected');
		sliderItems.eq(t).addClass('slider-item-selected').fadeIn(500);
		ctrlBottom.eq(t).addClass('ctrl-selected');
	}

	function nextSlide() {
		currentSlide = (currentSlide + 1) % 4;
		changeSlide(currentSlide);
	}

	previewItems.click(function () {
		currentSlide = $(this).index();
		changeSlide(currentSlide);
	});

	ctrlBottom.click(function () {
		changeSlide($(this).index());
	});

	slider.mouseover(function () {
		clearInterval(cycle);
	});

	slider.mouseout(function () {
		cycle = setInterval(nextSlide, 5000);
	});

}());


(function () {
	var tabsSpan = $('.tabs span'),
		tabsDiv = $('.tabs div'),
		ctrlUp = $('.ctrl-up'),
		ctrlDown = $('.ctrl-down'),
		list = $('.footer-comments ul');

	tabsSpan.click(function () {
		var t = $(this).index() - 1;

		tabsDiv.removeClass('selected-tab-content');
		tabsSpan.removeClass('selected-tab');
		tabsDiv.eq(t).addClass('selected-tab-content');
		tabsSpan.eq(t).addClass('selected-tab');
	});

	ctrlUp.click(function () {
		var v = parseInt(list.height()),
			t = parseInt(list.css('top')),
			i = 0,
			cycle;

		function moveUp() {
			i++;
			if (i === 60) {
				clearInterval(cycle);
			}
			list.css('top', t - i);
		}
		
		if (t > -v + 59 * 2) {
			cycle = setInterval(moveUp, 5);
			ctrlUp.css('background-image', 'url(img/footer-slider-up.png)');
			ctrlDown.css('background-image', 'url(img/footer-slider-down.png)');
		} else {
			ctrlUp.css('background-image', 'url(img/footer-slider-up-dis.png)');
			ctrlDown.css('background-image', 'url(img/footer-slider-down.png)');
		}
	});

	ctrlDown.click(function () {
		var t = parseInt(list.css('top')),
			i = 0,
			cycle;

		function moveDown() {
			i++;
			if (i == 60) {
				clearInterval(cycle);
			}
			list.css('top', t + i);
		}

		if (t < 0) {
			cycle = setInterval(moveDown, 5);
			ctrlDown.css('background-image', 'url(img/footer-slider-down.png)');
			ctrlUp.css('background-image', 'url(img/footer-slider-up.png)');
		} else {
			ctrlDown.css('background-image', 'url(img/footer-slider-down-dis.png)');
			ctrlUp.css('background-image', 'url(img/footer-slider-up.png)');
		}
	});

}());