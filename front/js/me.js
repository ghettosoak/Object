var where;

$('.who').on('click', function(){
	$('#movement').removeClass().addClass('first')
})

$('.me').on('click', '.me_bit', function(){
	var $that = $(this);
	if (!$that.hasClass('meme') && !$that.hasClass('meback') && !$that.is('#mebackwhite')){
		$that.toggleClass('up')
		if ($('#me_blur').hasClass('not')) $('#me_blur').removeClass('not')
	}
});

$('.meme').on('click', function(){
	$('#me_blur').toggleClass('not')
	$('.me_bit').removeClass('up')
});

$('.meback').on('click', function(){
	if (where == 'project') $('#movement').removeClass().addClass('fourth')
	else if (where == 'front') $('#movement').removeClass().addClass('second')
});