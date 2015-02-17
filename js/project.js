

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
	});
}

function projectdeploy(incoming){
	imagemarker.length = 0;
	mass = _.size(incoming.cells);
	console.log(incoming);

	$stats.append(
			'<div class="stat">'+
				'<span>Name</span>'+
				'<p>'+incoming.stat.name+'</p>'+
			'</div>'+
			'<div class="stat">'+
				'<span>Client</span>'+
				'<p>'+incoming.stat.client+'</p>'+
			'</div>'+
			'<div class="stat">'+
				'<span>Total Hours</span>'+
				'<p>'+incoming.stat.total_hours+'</p>'+
			'</div>'+
			'<div class="stat">'+
				'<span>Date Launched</span>'+
				'<p>'+incoming.stat.date_launched+'</p>'+
			'</div>'+
			'<div class="stat s_text">'+
				'<p>'+incoming.stat.project_text+'</p>'+
			'</div>'+
			'<div class="stat">'+
				'<a href="http://'+incoming.stat.link+'" target="_blank">Have a look</a>'+
			'</div>'
		);

	for (var i in incoming.cells) gridSet(i, incoming.cells[i]);

	function gridSet(numerate, thisone){
		var theImg = $("<img/>").load(function(){
			$.when( theImg ).done(function() {

				$floater.append(
					'<div class="cell">'+
						'<div class="cellImg" style="'+
							'background-image: url(' + thisone.img + ');' +
						'"></div>'+
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
			first = true;
			$('.floater').masonry({
				itemSelector: '.cell'
			});
			gotogrid();
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

var go_x, go_y, orig_y, orig_x;
var clicked = false, dragging = false;
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
	$(".floater").masonry('destroy')
	.children().detach();
	$stats.empty();
}








