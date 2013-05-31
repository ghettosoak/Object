var $windowpane = $(window);
var wpheight, wpwidth, titlemargin, whomargin;

$(document).ready(function(){
	wpheight = $windowpane.height();
	wpwidth = $windowpane.width();
	
	// shapeshifterload(shapeshifterdescend);
	
	$.ajax({
		type: "POST",
		dataType:'JSON',
		url: "php/front.php",
	}).done( function(cube){
		init();
		animate();
		cubedescend = cube;
		shapeshifterload(cube.nav.shapeshifter);
		cubegenerator(cube.nav.cubes)
	})

});

$windowpane.load(function(){
	// projectdeploy(projectdescend);
	// breadcrumb(cubedescend['are'], 'r2', 2)

	titlemargin = $('.title').css('margin');
	whomargin = $('.who').css('margin');
	// $('.title').css('margin', titlemargin)
	// $('.who').css('margin', whomargin)
});

$windowpane.resize(function(){
	wpheight = $windowpane.height();
	wpwidth = $windowpane.width();
});