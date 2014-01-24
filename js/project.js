

function projLoader(which){
	console.log('WHICH = '+which);
	$.ajax({
		type: "POST",
		dataType:'JSON',
		data:{project:which},
		url: "php/project.php"
	}).done(function(cellular){

		if(!sentFromClick){
			var $cubeInQuestion = $cubic.find('div[data-callmemaybe="' + which + '"]');
			
			tcallme = $cubeInQuestion.data('callmemaybe');
			tref = $cubeInQuestion.nextAll('.name').first().find('p').text();
			trow = $cubeInQuestion.data('row');
			twhich = $cubeInQuestion.data('number');
		}

		cleargrid();
		console.log('DEPLOY');
		projectdeploy(cellular);
		breadcrumb(cubedescend.nav.cubes[tref], trow, tcallme);
	});
}

function projectdeploy(incoming){
	imagemarker.length = 0;
	mass = _.size(incoming.cells);
	$floaterparent = $floater.parent();
	console.log(incoming);

	var squaresize = (Math.floor(Math.sqrt(mass))+1) * 229;

	$floater.css('width', squaresize);

	drg_h = $floaterparent.outerHeight();
	drg_w = $floaterparent.outerWidth();

	$floater.append('<div class="cell stats s_close">'+
		'<div id="stats_closed">'+
			'<span>i</span>'+
		'</div>'+
		'<div id="stats_open">'+
			'<div class="stat_full">'+
				'<p>name</p>'+
				'<p>'+incoming.stat.name+'</p>'+
			'</div>'+
			'<div class="stat_full">'+
				'<p>client</p>'+
				'<p>'+incoming.stat.client+'</p>'+
			'</div>'+
			'<div class="stat_small">'+
				'<p>total hours</p>'+
				'<p>'+incoming.stat.total_hours+'</p>'+
			'</div>'+
			'<div class="stat_small">'+
				'<p>date launched</p>'+
				'<p>'+incoming.stat.date_launched+'</p>'+
			'</div>'+
			'<div class="stat_text">'+
				'<p>'+incoming.stat.project_text+'</p>'+
			'</div>'+
			'<div class="stat_link">'+
				'<a href="'+incoming.stat.link+'" target="_blank"><p>View</p></a>'+
			'</div>'+
		'</div>'+
	'</div>');

	for (var i in incoming.cells) gridSet(i, incoming.cells[i]);

	function gridSet(numerate, thisone){

		var theImg = $("<img/>").load(function(){
			$.when( theImg ).done(function() {
				var decide = Math.random();
				var orient, direct, locale;

				if (decide < .25) orient = 'vertical';
				if (decide > .25 && decide < .5) orient = 'horzontal';
				if (decide > .5 && decide < .75) orient = 'square_small';
				if (decide > .75) orient = 'square_large';

				if (theImg[0].height < theImg[0].width){
					direct = 'auto 450px';
					if (decide < .25) locale = -( ( (theImg[0].width / theImg[0].height) * 450 ) * .25 ) + 'px center';
					if (decide > .25 && decide < .5) locale = 'center center';
					if (decide > .5 && decide < .75) locale = 'center center';
					if (decide > .75) locale = 'center center';

				}else if (theImg[0].height > theImg[0].width){
					direct = '450px auto';
					if (decide < .25) locale = 'center center';
					if (decide > .25 && decide < .5) locale = -( ( (theImg[0].width / theImg[0].height) * 450 ) * .25 ) + 'px center';
					if (decide > .5 && decide < .75) locale = 'center center';
					if (decide > .75) locale = 'center center';
				}else{
					direct = '450px auto';
					locale = 'center center';
				}

				$floater.append(
					'<div class="cell '+orient+'" style="'+
						'background-image: url(' + thisone.img + ');' +
						'background-position:' + locale + ';' + 
						'background-size:' + direct + ';' + 
					'">'+
						'<p>'+thisone.txt+'</p>'+
					'</div>'
				);

				imagemarker.push(numerate);
			});
		}).attr('src', thisone.img);
	}

	fertig = setInterval(function(){
		if (imagemarker.length == mass){
			clearInterval(fertig);
			isotopeengage();
			first = true;
			gotogrid();
			$cubic.mouseup();
		}
	},50);

	function gotogrid(){
		$('#movement').removeClass().addClass('fourth');
		okayitsloaded();
		setTimeout(function(){ $('#instruct').fadeOut(); },5000);
	}
}



function breadcrumb(shape, color, selected){
	var crumbpulse, crumbthrob = 1, crumbengorge = false;
	console.log(color+' ++ '+selected)
	console.log(shape);
	var $crumb = $('#crumbput');
	var crumbmass = 1;

	for (var cr in shape){
		console.log(cr)
		$('<div class="crumbcube r'+color
			+'" data-row="'+color
			+'" data-callmemaybe="'+cr
			+'" style="z-index:'+(crumbmass++)
			+'; bottom:'+((shape[cr].y*28)+(shape[cr].z*13))
			+'px; left:'+(shape[cr].z-1)*25+'px;"><div class="crumbface cr_top"></div><div class="crumbface cr_left"></div><div class="crumbface cr_right"></div></div>')
		.appendTo($crumb)
		.addClass(function(){if(cr == selected) return 'ccs';});
	}
}

function isotopeengage(){
	$floater.isotope({
		itemSelector : '.cell',
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

		e.preventDefault();
		if (!$(this).hasClass('stats')) clicked = true;

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
		e.preventDefault();
	},
	mouseup:function(){
		if (!dragging && (!$(this).hasClass('stats'))){
			$(this).toggleClass('open');
			$floater.isotope('reLayout');
		}else if ($(this).hasClass('stats')){
			$(this).toggleClass('s_close s_open')
			$floater.isotope('reLayout');
		}

		clicked = false;
		dragging = false;
		go_x = 0;
		go_y = 0;
	}
},'.cell');

if (document.addEventListener) {
	document.addEventListener("mousewheel", MouseWheelHandler, false);
	document.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
}
else document.attachEvent("onmousewheel", MouseWheelHandler);
	
function MouseWheelHandler() {
	if (!mobileis) $('#instruct').addClass('reinstruct').css('display','block').delay(3000).fadeOut();
}

$('#crumbput').on('click', '.crumbcube', function(){
	$('#movement').removeClass().addClass('third')
	var $nextcrumb = $(this).data()
	setTimeout(function(){
		tcallme = $nextcrumb.callmemaybe
		trow = $nextcrumb.row;
		window.location.hash = '!project_' + $nextcrumb.callmemaybe;
	},1000);
});

$('#point').on('click', function(){
	where = 'front';
	$('#cubic').click();
	window.location.hash = '!cubic';
	setTimeout(cleargrid, 1000);
})

function cleargrid(){
	$("#crumbput, .floater").children().detach();
	$floater.isotope('destroy');
}








