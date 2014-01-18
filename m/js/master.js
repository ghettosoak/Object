var $windowpane = $(window);
var wpheight, wpwidth;
var $work, $about;
var $category, $title;
var currentProj;

var catCount = [];
ing glisten!
$(document).ready(function(){
	wpheight = $windowpane.height();
	wpwidth = $windowpane.width();

	// $top = $('#top');
	$work = $('#work');
	$about = $('#about');

	$category = $work.find('.head');

	$title = $work.find('.title');

	$category.on('click', function(){
		var $that = $(this).parent();

		$that.toggleClass('open shut');

		if ($that.hasClass('open')){
			$that.css('height', $that.data('closed'));
		}

		$that.siblings().removeClass('open').addClass('shut')
		.children('.project').removeClass('viewing');

		$('html, body').animate({
		    scrollTop: $that.offset().top
		 }, 2000);

		console.log($that.offset().top)
	});

	$title.on('click', function(){
		var $that = $(this);

		var $catCont = $that.parents('.categoryContainer');
 
		$that.parent().toggleClass('viewing')
		.siblings().removeClass('viewing');

		if ($that.parent().hasClass('viewing')){			
			$catCont.css('height', $catCont.data('open'));
		}else{
			$catCont.css('height', $catCont.data('closed'));
		}

		if (!$that.parent().hasClass('contains')){
			projectLoad($that.data('pointer'), $that.siblings('.view').addClass('loading'));
			$that.parent().addClass('contains');
		}
	});

	$('#about').on('click', function(){
		$(this).toggleClass('hello');

	});
});

$windowpane.load(function(){
	window.scrollTo(0, 1);
	$('#top').addClass('ready');
});

function projectLoad(er, $ing){
	$.ajax({
		type: 'post',
		dataType:'json',
		data:{
			project:er
		},
		url: "php/project.php",
		success: function(e){

			currentProj = e;

			$ing.find('.long').css('width', ((e.cells.length)*250) + 250)
			.append(
				'<div class="stats">'+
					'<p class="stat">Made for: '+e.stat.client+'</p>'+
					'<p class="stat">Time required: '+e.stat.total_hours+'</p>'+
					'<p class="stat">Launched on: '+e.stat.date_launched+'</p>'+
					'<p class="text">'+e.stat.project_text+'</p>'+
					'<p class="link"><a href="'+e.stat.link+'" target="_blank">View</a></p>'+
				'</div>'
			);

			$.each(e.cells, function(i){
				$ing.find('.long').append(
					'<div class="img" style="background-image:url(' + e.cells[i].img + ')"><p>' + e.cells[i].txt + '</p></div>'
				);
			});

			$ing.removeClass('loading');
		}
	});
}












