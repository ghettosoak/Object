var mass, fertig, first = false;
var imagemarker = [];
var $floater = $('.floater')

var b_prfx = '';

function browser_perfect(){
	if ($.browser.webkit)b_prfx = '-webkit-';
	if ($.browser.mozilla)b_prfx = '-moz-';
	if ($.browser.opera)b_prfx = '-o-';
	if ($.browser.msie)b_prfx = '-ms-';
}

function projectdeploy(incoming){
	imagemarker.length = 0;
	mass = _.size(incoming)

	var squaresize = Math.floor(Math.sqrt(mass)) * 225;

	$floater.css('width', squaresize)

	for (var i in incoming){
		var decide = Math.random()
		var orient;
		if (decide > 0 && decide < .33333) orient = 'vertical'
		if (decide > .33333 && decide < .66666) orient = 'horzontal'
		if (decide > .66666 && decide < 1) orient = 'square'
		$floater.append('<div class="'+orient+'" id="pr_'+i+'"><p>'+incoming[i].text+'</p></div>')
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
		$('#instruct').css({'left': ((wpwidth*.2)-108)/2, 'top':((wpheight*.5)-108)/2})
		$('#point').css('left', ((wpwidth*.2)-100)/2)
		$('.title').transition({
			'left':(wpwidth*1.2)+(((wpwidth*.2)-72)/2), delay:50
		}, 1000, 'ease')
		$('.who').transition({
			'left':(wpwidth*1.2)+(((wpwidth*.2)-40)/2), delay:50
		}, 1000, 'ease');
		$('.movement').transition({'x':'-50%'}, 1000, function(){
			setTimeout(function(){
				$('#instruct').fadeOut();
			},5000)
		});
	}
}



function breadcrumb(shape, color, selected){
	var crumbpulse, crumbthrob = 1, crumbengorge = false;
	console.log(shape+' ++ '+color+' ++ '+selected)
	var $crumb = $('.crumbput');
	var crumbmass = 1;
	var proj = _.keys(shape);

	$crumb.parent().css('top', (wpheight-175)/2);

	for (var cr in shape){
		$('<div class="crumbcube '+color+'" data-project="'+proj[cr]+'" style="z-index:'+(crumbmass++)+'; bottom:'+((shape[cr].y*28)+(shape[cr].z*13))+'px; left:'+(shape[cr].z-1)*25+'px;"><div class="crumbface cr_top"></div><div class="crumbface cr_left"></div><div class="crumbface cr_right"></div></div>')
		.appendTo($crumb)
		.addClass(function(){if(cr == selected) return 'ccs';})
	}

	$crumb.parent().on({
		mouseenter:function(){
			crumbpulse = setInterval(function(){
				if (!crumbengorge){
					$('.ccs').children().css('border', --crumbthrob+'px white solid')
					if (crumbthrob <= 1) crumbengorge = !crumbengorge;	
				}else{
					$('.ccs').children().css('border', ++crumbthrob+'px white solid')
					if (crumbthrob >= 5) crumbengorge = !crumbengorge;
				}
			},100);
		},
		mouseleave:function(){clearTimeout(crumbpulse);}
	})
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

var drg_h, drg_w, pos_y, pos_x, dragtimer;
var dragging = false;

$floater.on({
	mousedown:function(e){
		dragtimer = setTimeout(function(){
			dragging = true;
		},120)
		var $that = $(this).parent()
		drg_h = $that.outerHeight(),
		drg_w = $that.outerWidth(),
		pos_y = $that.offset().top + drg_h - e.pageY,
		pos_x = $that.offset().left + drg_w - e.pageX;
	},
	mousemove:function(e){
		if (dragging){
			var $that = $(this).parent()
			$that.offset({
				top:e.pageY + pos_y - drg_h,
				left:e.pageX + pos_x - drg_w
			})
		}
	},
	mouseup:function(){
		if (!dragging){
			var $that = $(this);
			$that.toggleClass('open');
			$floater.isotope('reLayout');
		}
		dragging = false;
		clearTimeout(dragtimer)
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

$('.crumbput').on('click', 'crumbcube', function(){
	$('.title').transition({'left':((wpwidth-72)/2)+(wpwidth*.2), 'margin':'0px'}, 1000)
	$('.who').transition({'left':((wpwidth-40)/2)+(wpwidth*.2), 'margin':'0px'}, 1000)
	$('.movement').transition({'x':'-25%'}, 1000, function(){
		cleargrid();
		// $.getJSON('php/project.json', {$(this).data('project')}, function(q) {
		$.getJSON('php/project.json', function(q) {
			projectdeploy(q);
		})
		breadcrumb(cubedescend[layerrefere], 'r'+layernumber , layernumber)
	});
});

$('#point').on('click', function(){
	$('#cubic').click()
	$('.title').transition({'left':0, 'margin': titlemargin}, 1000)
	$('.who').transition({'left':0, 'margin': whomargin}, 1000)
	$('.movement').transition({'x':'0'}, 1000, function(){
		cleargrid()
	});
})

function cleargrid(){
	$(".crumbput, .floater").children().detach();
	$floater.isotope('destroy')
}








