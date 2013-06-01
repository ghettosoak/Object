var $windowpane = $(window);
var wpheight, wpwidth, titlemargin, whomargin;

$(document).ready(function(){
	wpheight = $windowpane.height();
	wpwidth = $windowpane.width();
	
	$.ajax({
		type: "POST",
		dataType:'JSON',
		url: "php/front.php",
	}).done( function(cube){
		cubedescend = cube;
		cubeinit(cubedescend.nav.cubes);
		shapeshifterload(cubedescend.nav.shapeshifter);
		animate();
		linkup();
	})

});

$windowpane.load(function(){

});

$windowpane.resize(function(){
	wpheight = $windowpane.height();
	wpwidth = $windowpane.width();
});