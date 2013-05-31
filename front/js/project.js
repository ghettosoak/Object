var mass, fertig, first = false;
var imagemarker = [];
var $floater = $('.floater')
var $floaterparent;
var drg_h, drg_w;

function projectdeploy(incoming){
	imagemarker.length = 0;
	mass = _.size(incoming)
	$floaterparent = $floater.parent()

	var squaresize = Math.floor(Math.sqrt(mass)) * 225;

	$floater.css('width', squaresize)

	drg_h = $floaterparent.outerHeight()
	drg_w = $floaterparent.outerWidth()

	for (var i in incoming){
		var decide = Math.random()
		var orient;
		if (decide > 0 && decide < .33333) orient = 'vertical'
		if (decide > .33333 && decide < .66666) orient = 'horzontal'
		if (decide > .66666 && decide < 1) orient = 'square'
		$floater.append('<div class="'+orient+'" id="pr_'+i+'"><p>'+incoming[i].txt+'</p></div>')
		imager(i, incoming[i].img)
	}

	function imager(selec, place){
		var img = $("<img id=i_"+selec+"/>").load(function(){
			$.when( img ).done(function() {
				$('#pr_'+selec).prepend(img);
				imagemarker.push(selec)
			})
		}).attr('src', place);
	}

	fertig = setInterval(function(){
		if (imagemarker.length == mass){
			clearInterval(fertig)
			isotopeengage();
			first = true;
			gotogrid();
		}
	},50)

	function gotogrid(){
		$('#movement').removeClass().addClass('fourth');
		setTimeout(function(){ $('#instruct').fadeOut(); },5000)
	}
}



function breadcrumb(shape, color, selected){
	var crumbpulse, crumbthrob = 1, crumbengorge = false;
	console.log(color+' ++ '+selected)
	console.log(shape);
	var $crumb = $('#crumbput');
	var crumbmass = 1;

	// $crumb.parent());

	for (var cr in shape){
		console.log(cr)
		$('<div class="crumbcube r'+color
			+'" data-row="'+color
			+'" data-callmemaybe="'+cr
			+'" style="z-index:'+(crumbmass++)
			+'; bottom:'+((shape[cr].y*28)+(shape[cr].z*13))
			+'px; left:'+(shape[cr].z-1)*25+'px;"><div class="crumbface cr_top"></div><div class="crumbface cr_left"></div><div class="crumbface cr_right"></div></div>')
		.appendTo($crumb)
		.addClass(function(){if(cr == selected) return 'ccs';})
	}
}

function isotopeengage(){
	$floater.isotope({
		itemSelector : 'div',
		masonry : {
			columnWidth : 150
		},
		masonryHorizontal : {
			rowHeight: 150
		},
		cellsByRow : {
			columnWidth : 300,
			rowHeight : 300
		},
		cellsByColumn : {
			columnWidth : 300,
			rowHeight : 300
		}
	});
}

var go_x, go_y, orig_y, orig_x;
var clicked = false, dragging = false;


$floater.on({
	mousedown:function(e){
		clicked = true;

		drg_h = $floaterparent.outerHeight()
		drg_w = $floaterparent.outerWidth()
		
		orig_y = $floaterparent.offset().top + drg_h - e.pageY,
		orig_x = $floaterparent.offset().left + drg_w - e.pageX;
	},
	mousemove:function(e){
		go_x = (e.pageY + orig_y) - drg_h;
		go_y = (e.pageX + orig_x) - drg_w;

		if (((Math.abs(go_x) > 10) || (Math.abs(go_y) > 10)) && clicked){
			dragging = true;
			$floaterparent.offset({
				top:go_x,
				left:go_y
			})
		}else dragging = false;
	},
	mouseup:function(){
		if (!dragging){
			$(this).toggleClass('open');
			$floater.isotope('reLayout');
		}
		clicked = false;
		dragging = false;
		go_x = 0;
		go_y = 0;
	}
},'div');

if (document.addEventListener) {
	document.addEventListener("mousewheel", MouseWheelHandler, false);
	document.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
}
else document.attachEvent("onmousewheel", MouseWheelHandler);
	
function MouseWheelHandler() {
	$('#instruct').addClass('reinstruct').css('display','block').delay(3000).fadeOut()
}

$('#crumbput').on('click', '.crumbcube', function(){
	$('#movement').removeClass().addClass('third')
	var $nextcrumb = $(this).data()
	setTimeout(function(){
		cleargrid();
		$.ajax({
			type: "POST",
			dataType:'JSON',
			data:{project:$nextcrumb.callmemaybe},
			url: "php/project.php",
		}).done( function(cellular){
			projectdeploy(cellular);
			breadcrumb(cubedescend.nav.cubes[layerrefere], $nextcrumb.row , $nextcrumb.callmemaybe)
		})		
	},1000)
});

$('#point').on('click', function(){
	$('#cubic').click()
	$('#movement').removeClass().addClass('second')
	setTimeout(cleargrid, 1000)
})

function cleargrid(){
	$("#crumbput, .floater").children().detach();
	$floater.isotope('destroy')
}








