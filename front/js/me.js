var where;

$('.who').on('click', function(){
	$('.movement').transition({'x':'25%'}, 1000);
})

function iammike(){
	$('#me_clean').append('<img src="img/me/clean/'+bestside+'.jpg" />')
	$('#me_blur').append('<img src="img/me/blur/'+bestside+'.jpg" />')
}

$('.me').on('click', '.me_bit', function(){
	var $that = $(this);
	if (!$that.hasClass('meme') && !$that.hasClass('meback') && !$that.is('#mebackwhite')){
		$that.toggleClass('up')
		if ($('#me_blur').hasClass('not')) $('#me_blur').removeClass('not')
	}
});

$('.meme').on('click', function(){
	$('#me_blur').addClass('not')
	$('.me_bit').removeClass('up')
});

$('.meback').on('click', function(){
	if (where == 'project') $('.movement').transition({'x':'-50%'}, 1000);
	else if (where == 'front') $('.movement').transition({'x':'0%'}, 1000);
});