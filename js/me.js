$('.who').on(action, function(){
	window.location.hash = '!me';
	helloMike();
});

$('.me').on(action, '.me_bit', function(){
	var $that = $(this);
	if (!$that.hasClass('meme') && !$that.hasClass('meback') && !$that.is('#mebackwhite')){
		$that.toggleClass('up');
		goodbyeMike();
		if ($('#me_blur').hasClass('not')) $('#me_blur').removeClass('not')
	}
});

$('.meme').on(action, function(){
	$('#me_blur').toggleClass('not')
	if ( !$('#me_blur').hasClass('not') ) helloMike();
	else goodbyeMike();
	$('.me_bit').removeClass('up')
});

$('.meback').on(action, function(){
	if (hashhistory.length > 1) {
		window.location.hash = hashhistory[hashhistory.length-2];
	}else{
		window.location.hash = '!cubic';
	}

	goodbyeMike();
});

function shimmer(){
	setTimeout(function(){
		$x2_y1.addClass('hello'); setTimeout(function(){ $x2_y1.removeClass('hello'); }, shimmer_el);
		$x1_y2.addClass('hello'); setTimeout(function(){ $x1_y2.removeClass('hello'); }, shimmer_el);
	}, shimmer_row * 1);

	setTimeout(function(){
		$x3_y1.addClass('hello'); setTimeout(function(){ $x3_y1.removeClass('hello'); }, shimmer_el);
		$x2_y2.addClass('hello'); setTimeout(function(){ $x2_y2.removeClass('hello'); }, shimmer_el);
		$x1_y3.addClass('hello'); setTimeout(function(){ $x1_y3.removeClass('hello'); }, shimmer_el);
	}, shimmer_row * 2);

	setTimeout(function(){
		$x4_y1.addClass('hello'); setTimeout(function(){ $x4_y1.removeClass('hello'); }, shimmer_el);
		$x3_y2.addClass('hello'); setTimeout(function(){ $x3_y2.removeClass('hello'); }, shimmer_el);
		$x2_y3.addClass('hello'); setTimeout(function(){ $x2_y3.removeClass('hello'); }, shimmer_el);
		$x1_y4.addClass('hello'); setTimeout(function(){ $x1_y4.removeClass('hello'); }, shimmer_el);
	}, shimmer_row * 3);

	setTimeout(function(){
		$x4_y2.addClass('hello'); setTimeout(function(){ $x4_y2.removeClass('hello'); }, shimmer_el);
		$x3_y3.addClass('hello'); setTimeout(function(){ $x3_y3.removeClass('hello'); }, shimmer_el);
		$x2_y4.addClass('hello'); setTimeout(function(){ $x2_y4.removeClass('hello'); }, shimmer_el);
	}, shimmer_row * 4);

	setTimeout(function(){
		$x4_y3.addClass('hello'); setTimeout(function(){ $x4_y3.removeClass('hello'); }, shimmer_el);
		$x3_y4.addClass('hello'); setTimeout(function(){ $x3_y4.removeClass('hello'); }, shimmer_el);
	}, shimmer_row * 5);
}

function helloMike(){
	helloHello = setInterval(shimmer, 5000);
}

function goodbyeMike(){
	clearInterval(helloHello);
}














