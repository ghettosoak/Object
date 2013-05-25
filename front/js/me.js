var where;

$('.who').on('click', function(){
	$('.movement').transition({'x':'25%'}, 1000);
})

function iammike(){
	var bestside = Math.floor(Math.random() * (10 - 1) + 1)
	// $('.me').css('background','url(img/me/'+bestside+'.jpg) no-repeat center center fixed');
	$('#me_clean').append('<img src="img/me/clean/'+bestside+'.jpg" />')
	$('#me_blur').append('<img src="img/me/blur/'+bestside+'.jpg" />')
	// $('#megrey').css({
	// 	'top': ($('.meme').outerHeight(true)-200)/2,
	// 	'left': ($('.meme').outerWidth(true)-200)/2
	// })
	// $('.meback').find('img').css('margin-top', ($('.meback').outerHeight(true)-52)/2)
	// $('#mebackwhite').css({
	// 	'top': ($('.meback').outerHeight(true)-160)/2,
	// 	'left': ($('.meback').outerWidth(true)-160)/2
	// })
	// $('.meblur').blurjs({
	// 	source: '.me',
	// 	radius: 7,
	// 	cache: true,
	// 	overlay: 'rgba(255,255,255,0.4)'
	// });
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