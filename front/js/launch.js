var getScript = jQuery.getScript;
jQuery.getScript = function( resources, callback ) {

    var // reference declaration &amp; localization
    length = resources.length,
    handler = function() { counter++; },
    deferreds = [],
    counter = 0,
    idx = 0;

    for ( ; idx < length; idx++ ) {
        deferreds.push(
            getScript( resources[ idx ], handler )
        );
    }

    jQuery.when.apply( null, deferreds ).then(function() {
        callback && callback();
    });
};

var $windowpane = $(window);
var wpheight, wpwidth, titlemargin, whomargin, mobileis = false, action = 'click';
// mobileis = false;

$(document).ready(function(){
	wpheight = $windowpane.height();
	wpwidth = $windowpane.width();

	// if (wpwidth <= 480){
		mobileis = true;
		action = 'touchend';
		window.scrollTo(0, 1);
		$('#master').addClass('mobile')
		// $('#cubic, #shapeshifter').addClass('firstiwaslike')


		// $.ajax({
		// 	dataType:'script',
		// 	url: 'js/mobile.js'
		// })
	// }

	$.ajax({
		type: "POST",
		dataType:'JSON',
		url: "php/front.php",
	}).done( function(cube){
		cubedescend = cube;

		if (!mobileis){
			cubeinit(cubedescend.nav.cubes);
			shapeshifterload(cubedescend.nav.shapeshifter);
			animate();
		}else{

		// if (mobileis){

			$.ajax({
				dataType:'script',
				url: 'js/mobile.js'
			}).done( function(){
				mobileinit() 
			})
						
		}

		// linkup();
		
		// $.ajax({
		// 	type: "POST",
		// 	dataType:'JSON',
		// 	data:{project:23},
		// 	url: "php/project.php",
		// }).done(function(cellular){
		// 	projectdeploy(cellular);
		// })
	})
});

$windowpane.load(function(){

});

$windowpane.resize(function(){
	wpheight = $windowpane.height();
	wpwidth = $windowpane.width();
});