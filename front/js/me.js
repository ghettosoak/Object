var where;

$('.who').on('click', function(){
	$('.movement').transition({'x':'25%'}, 1000);
})

function iammike(){
	var bestside = Math.floor(Math.random() * (10 - 1) + 1)
	$('.me').css('background','url(img/me/'+bestside+'.jpg) no-repeat center center fixed');
	$('#megrey').css({
		'top': ($('.meme').outerHeight(true)-200)/2,
		'left': ($('.meme').outerWidth(true)-200)/2
	})
	$('.meback').find('img').css('margin-top', ($('.meback').outerHeight(true)-52)/2)
	$('#mebackwhite').css({
		'top': ($('.meback').outerHeight(true)-160)/2,
		'left': ($('.meback').outerWidth(true)-160)/2
	})
	$('.meblur').blurjs({
		source: '.me',
		radius: 7,
		cache: true,
		overlay: 'rgba(255,255,255,0.4)'
	});
}

$('.me').on('click', 'div', function(){
	var $that = $(this);
	if (!$that.hasClass('meme') && !$that.hasClass('meback') && !$that.is('#mebackwhite')){
		$that.animate({
			backgroundColor:'rgba(0,0,0,.5)',
			boxShadow: '10px 10px 15px', 
			top: -3
		}).find('p').animate({'opacity':1})
		if ($('.meblur').hasClass('faded')) $('.meblur').fadeIn();
	}
});

$('.meme').on('click', function(){
	$('.meblur').fadeOut().addClass('faded')
	$('.me_bit').animate({
		backgroundColor:'rgba(0,0,0,.0)',
		boxShadow: '0px', 
		top: 0
	}).find('p').animate({'opacity':0})
});

$('.meback').on('click', function(){
	if (where == 'project') $('.movement').transition({'x':'-50%'}, 1000);
	else if (where == 'front') $('.movement').transition({'x':'0%'}, 1000);
});