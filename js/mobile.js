var $categ, $proje, $categ_carous, $proje_carous, stance = false;
var mi_x, mi_y, mi_z;
var mouseX = 0, mouseY = 0, movementfactor = 2;
var openis, b_prfx = '';
var counter = 1, cubecounter = 1;
var myScroll;

// document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

function getRandomDeg() {
	return Math.floor(Math.random() * (360 - 0 + 1)) + 0;
}

function browser_perfect(){
	if ($.browser.webkit)b_prfx = '-webkit-';
	if ($.browser.mozilla)b_prfx = '-moz-';
	if ($.browser.opera)b_prfx = '-o-';
	if ($.browser.msie)b_prfx = '-ms-';
}

function mobileinit(){
	
	browser_perfect();

	console.log(cubedescend)

	// browser_perfect();
	$cubic = $('#cubic');
	$cubic.append('<div id="categ"></div>')//.append('<div id="proje"><div id="proje_carous"></div></div>')

	$categ = $('#categ')
	$categ_carous = $('#categ_carous')

	// document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	// $proje = $('#proje')
	// $proje_carous = $('#proje_carous')

	glideheight = wpheight / movementfactor;
	glidewidth = wpwidth / movementfactor;

	
	mobilegenerator(cubedescend.nav)
}

function onDocumentMouseMove( event ) {
	mouseX = (event.clientX - glidewidth)/3;
	mouseY = (event.clientY - glideheight)/3;

	// console.log(mouseX+' /// '+mouseY)

	$(openis).find('.mobilerotate').css(b_prfx+'transform', 'rotateX('+mouseX+'deg) rotateY('+mouseY+'deg) rotateZ('+(mouseX-mouseY)+'deg)')
}

window.ondevicemotion = function(event){
	if (stance){
		mi_x = event.accelerationIncludingGravity.x;
		mi_y = event.accelerationIncludingGravity.y;
		mi_z = event.accelerationIncludingGravity.z;
		stance = false;
	}
	mouseY = (event.accelerationIncludingGravity.x /*- mi_x*/)/**30*/;
	mouseX = (event.accelerationIncludingGravity.y /*- mi_y*/)/**60*/;

	// console.log(event.accelerationIncludingGravity.x)

}

function mobile_render() {
  	$(openis).find('.mobilerotate').css(b_prfx+'transform', 'rotateX('+mouseX+'deg) rotateY('+mouseY+'deg) rotateZ('+(mouseX-mouseY)+'deg)')
  	requestAnimationFrame(mobile_render);
}
requestAnimationFrame(mobile_render);

// function floater(){
// 	camera.position.x += ( mouseX - camera.position.x ) * .05;
// 	camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
// }


function mobilegenerator(receive){
	var rowcount = 1, numberexact = 0;
	var large = Math.floor(_.size(receive))
	// $categ_carous.css('width', large*100+'%')
	for (var row in receive.cubes){
		var cube = receive.cubes[row];
		// console.log('ROW '+row+' CUBE '+cube)
		$categ.append(
			'<div class="acateg" data-catego="'+row+'">'+
				'<p>'+row+'</p>'+
				'<div id="mp_'+row+'" class="mobileproj"><div class="mobilerotate"></div></div>'+
			'</div>'+
			'<div class="abreak"></div>'
		);

		for (var i in cube){

			numberexact++;

			$('#mp_'+row).find('.mobilerotate').append(
				'<div class="cube r'+rowcount+'" id="p_'+i+'" data-callmemaybe="'+i+'" style="bottom:'+(cube[i].y*50)+'px; left:'+(cube[i].z*50)+'px">'+
					'<div class="cubefront"></div>'+
					'<div class="cubeback"></div>'+
					'<div class="cuberight"></div>'+
					'<div class="cubeleft"></div>'+
					'<div class="cubetop"></div>'+
					'<div class="cubebottom"></div>'+
				'</div>'
			)

			if ((rowcount >= _.size(receive.cubes)) && (numberexact >= _.size(cube))) setTimeout(mobile_ensure, 1000)
		}
		rowcount++;
		numberexact = 0;
	}
}

function mobile_ensure(){

	console.log('MOBILE ENSURE')

	// myScroll = new iScroll('categ', { checkDOMChanges: true });

	//um. brian gonzales, you are my hero. that is all.
	$('#categ').pep({
		axis: "y",
		easeDuration: 500,
		drag: handlePull,
		useCSSTranslation: false,
		shouldPreventDefault:   false,
		stop: function(ev, obj){ 
			hidePull(ev, obj); outOfBounds(ev, obj); handleLoader(ev, obj); 

			console.log(ev)
			if (ev.target.localName == 'div'){
				if (ev.target.className == ''){
					$(ev.target).addClass('mobile_open').siblings().removeClass('mobile_open')
					openis = '#mp_'+ $(ev.target).data('catego')
				}else if (ev.target.className.indexOf('cube') > -1 ){
					console.log('yeah!')
				}
			}else if (ev.target.localName == 'p'){
				$(ev.target).parent().addClass('mobile_open').siblings().removeClass('mobile_open')
				openis = '#mp_'+ $(ev.target).parent().data('catego')
			}
			
		},
		rest: function(ev, obj){ outOfBounds(ev, obj) }
	})


	function outOfBounds(ev,obj){       
	  
		if ( -obj.$el.position().top > (obj.$el.outerHeight() - obj.$el.parent().outerHeight()) ){
			obj.$el.css({ top: -obj.$el.outerHeight() + obj.$el.parent().outerHeight()  })
		}

		if ( obj.$el.position().top > 0 ){ 
			setTimeout(function(){ 
				obj.$el.css({ top: 0 });
			}, 500); 
		}
	}

	function handleLoader(ev,obj){       
		if ( obj.$el.position().top > 50 ) {
			var $loading = obj.$el.css({top: 50}).parent().find('.loading').addClass('shown');

			setTimeout(function(){  
				$loading.removeClass('shown');
			}, 500); 
		}
	}


	function handlePull(ev,obj){       
		if ( obj.$el.position().top > 0 ) {
			var $pull = obj.$el.parent().find('.pull').addClass('shown');
		}
	}

	function hidePull(ev, obj){
		obj.$el.parent().find('.pull').removeClass('shown');
	}


	$('.acateg').on(action, function(){
		$(this).addClass('mobile_open').siblings().removeClass('mobile_open').attr('')
		openis = '#mp_'+$(this).data('catego')
	})

	$('.cube').on('click', function(){
		$.ajax({
			type: "POST",
			dataType:'JSON',
			data:{project:$(this).data('callmemaybe')},
			url: "php/project.php",
		}).done(function(cellular){
			mobile_projectdeploy(cellular);
			loadr();
		})
	})

	// $$('#categ').swiping(function(e){
	// 	console.log(e)
	// })

	// window.addEventListener("touchstart", touchStart, false);
	// window.addEventListener("touchmove", touchMove, false);
	// window.addEventListener("touchend", touchEnd, false);

	// function touchStart (event){
	// 	event.preventDefault();
	// 	console.log('WHAT')
	// }

	// function touchMove (event){
	// 	event.preventDefault();
	// }

	// function touchEnd (event){
	// 	event.preventDefault();
	// 	console.log(event)
	// }

}

// $windowpane.on({
// 	touchstart:function ( event ) {
// 		event.preventDefault();
// 		console.log(event)
// 	},
// 	touchmove:function ( event ) {
// 		event.preventDefault();
// 		console.log(event)
// 	},
// 	touchend:function ( event ) {
// 		event.preventDefault();
// 		console.log(event)
// 	}
// });

var mass, fertig, first = false;
var imagemarker = [];
var $floater = $('.floater')

function mobile_projectdeploy(incoming){
	imagemarker.length = 0;
	mass = _.size(incoming.cells)
	console.log(incoming)

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
	'</div>')

	$('.stats').on('click', function(){
		$(this).toggleClass('s_close s_open')
	})

	for (var i in incoming.cells){

		$floater.append('<div class="cell" id="pr_'+i+'"><p>'+incoming.cells[i].txt+'</p></div>')
		imager(i, incoming.cells[i].img)
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
			first = true;
			gotogrid();
		}
	},50)

	function gotogrid(){
		$('#movement').removeClass().addClass('fourth');
		okayitsloaded();
	}

	$floater.off()

	$('#point').off().on('click', function(){
		where = 'front';
		$('#cubic').click()
		$('#movement').removeClass().addClass('second')
		setTimeout(cleargrid, 1000)
	})

	function cleargrid(){
		$("#crumbput, .floater").children().detach();
		$floater.isotope('destroy')
	}
}



























