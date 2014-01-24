$('.who').on(action, function(){
	window.location.hash = '!me';
})

$('.me').on(action, '.me_bit', function(){
	var $that = $(this);
	if (!$that.hasClass('meme') && !$that.hasClass('meback') && !$that.is('#mebackwhite')){
		$that.toggleClass('up')
		if ($('#me_blur').hasClass('not')) $('#me_blur').removeClass('not')
	}
});

$('.meme').on(action, function(){
	$('#me_blur').toggleClass('not')
	$('.me_bit').removeClass('up')
});

$('.meback').on(action, function(){
	if (hashhistory.length > 1) {
		window.location.hash = hashhistory[hashhistory.length-2];
	}else{
		window.location.hash = '!cubic';
	}
});