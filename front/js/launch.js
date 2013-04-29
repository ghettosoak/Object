var $windowpane = $(window);
var wpheight, wpwidth, titlemargin, whomargin;

$(document).ready(function(){
	wpheight = $windowpane.height();
	wpwidth = $windowpane.width();
	
	shapeshifterload(shapeshifterdescend);
});

$windowpane.load(function(){
	// projectdeploy(projectdescend);
	// breadcrumb(cubedescend['are'], 'r2', 2)

	titlemargin = $('.title').css('margin');
	whomargin = $('.who').css('margin');
	$('.title').css('margin', titlemargin)
	$('.who').css('margin', whomargin)

	iammike();
});

$windowpane.resize(function(){
	wpheight = $windowpane.height();
	wpwidth = $windowpane.width();
});