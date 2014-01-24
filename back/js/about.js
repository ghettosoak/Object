var meimgswidth, meimgsession = [];

// $(document).ready(function(){
// (function($){

	meimgswidth = Math.floor((((wpwidth*.85)*.3)/2)-15)

	$.ajax({
		type: "POST",
		dataType:'JSON',
		url: "back/php/getmine.php"
	}).done(function(my){
		$.each(my.imgs, function(m){
			var myimgs = '<div style="width:'+meimgswidth+'px; height:'+meimgswidth+'px;" data-img="'+my.imgs[m].id+'"><img src="back/img/kill.png" class="img_kill" /><img src="'+my.imgs[m].img+'"/></div>'
			$.tmpl( myimgs , my.imgs[m]).appendTo( "#meimgs" );
		});

		$.each(my.txts, function(m){
			var mytxts = '<textarea id="mebit_'+my.txts[m].id+'">'+my.txts[m].txt+'</textarea>';
			$.tmpl( mytxts , my.txts[m]).appendTo( "#mebits" );
		});

		$('.img_kill').css('z-index','1000').on('click', function(){
			var $waitme = $(this).parent()
			var $thisone = $waitme.data('img');
			$.ajax({
				type: "POST",
				dataType:'JSON',
				data:{kill: $thisone},
				url: "back/php/killmeimg.php"
			}).done(function(){
				$waitme.remove();
			})
		});
	});
// });

$('#meimgs').filedrop({
	fallback_id: 'me',
	paramname:'me_image',
	
	url: 'back/php/me_img.php',
	maxfilesize: 20,
	// data:{ projectnumbershapeshift: currentlyediting },
	
	uploadFinished:function(i,file,response){

		// $.data(file).removeClass('loading')

		$('#meimgs').find('div').last().removeClass('loading')

		$('#meimgs').find('div').last().attr('data-img', response.img_id); 

		$('.img_kill').css('z-index','1000').on('click', function(){
			var $waitme = $(this).parent()
			var $thisone = $waitme.data('img');
			$.ajax({
				type: "POST",
				dataType:'JSON',
				data:{kill: $thisone},
				url: "back/php/killmeimg.php"
			}).done(function(){
				$waitme.remove();
			})
		});

		meimgsession.push(response.img_id);
	},
	
	error: function(err, file) { alert("it didn't work. here's why, maybe: "+err) },
	
	beforeEach: function(file){
		console.log(file.type)
		if(!file.type.match(/^image\/jpeg/)){
			alert('jpegs only kthx');
			return false;
		}
	},
	
	uploadStarted:function(i, file, len){
		var preview = $('<div class="loading" style="width:'+meimgswidth+'px; height:'+meimgswidth+'px;"><img src="back/img/kill.png" class="img_kill" /><img /></div>'), 
		image = $('img', preview);
		var reader = new FileReader();
		
		image.width = meimgswidth;
		image.height = meimgswidth;
		
		reader.onload = function(e){ image.attr('src',e.target.result); };
		reader.readAsDataURL(file);
		preview.appendTo('#meimgs');
		preview.append('<img src="back/img/kill.png" class="img_kill" />')
		$.data(file,preview);			
	},
		
	progressUpdated: function(i, file, progress) {
		$.data(file).find('img').css('opacity',progress/100);
	}	 
});

function meuploader(){
	var sometxt = [];

	$('#mebits').find('textarea').each(function(e){
		sometxt[e] = $(this).val()
	})

	$.ajax({
		type: "POST",
		dataType:'JSON',
		data:{
			newtxt:sometxt,
			imgsession:meimgsession
		},
		url: "back/php/setmine.php"
	})

}























