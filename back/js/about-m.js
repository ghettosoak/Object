/*
 Color animation 20120928
 http://www.bitstorm.org/jquery/color-animation/
 Copyright 2011, 2012 Edwin Martin <edwin@bitstorm.org>
 Released under the MIT and GPL licenses.
*/
(function(d){function m(){var b=d("script:first"),a=b.css("color"),c=false;if(/^rgba/.test(a))c=true;else try{c=a!=b.css("color","rgba(0, 0, 0, 0.5)").css("color");b.css("color",a)}catch(e){}return c}function j(b,a,c){var e="rgb"+(d.support.rgba?"a":"")+"("+parseInt(b[0]+c*(a[0]-b[0]),10)+","+parseInt(b[1]+c*(a[1]-b[1]),10)+","+parseInt(b[2]+c*(a[2]-b[2]),10);if(d.support.rgba)e+=","+(b&&a?parseFloat(b[3]+c*(a[3]-b[3])):1);e+=")";return e}function g(b){var a,c;if(a=/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(b))c=
[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16),1];else if(a=/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(b))c=[parseInt(a[1],16)*17,parseInt(a[2],16)*17,parseInt(a[3],16)*17,1];else if(a=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b))c=[parseInt(a[1]),parseInt(a[2]),parseInt(a[3]),1];else if(a=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(b))c=[parseInt(a[1],10),parseInt(a[2],10),parseInt(a[3],10),parseFloat(a[4])];return c}
d.extend(true,d,{support:{rgba:m()}});var k=["color","backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","outlineColor"];d.each(k,function(b,a){d.Tween.propHooks[a]={get:function(c){return d(c.elem).css(a)},set:function(c){var e=c.elem.style,i=g(d(c.elem).css(a)),h=g(c.end);c.run=function(f){e[a]=j(i,h,f)}}}});d.Tween.propHooks.borderColor={set:function(b){var a=b.elem.style,c=[],e=k.slice(2,6);d.each(e,function(h,f){c[f]=g(d(b.elem).css(f))});var i=g(b.end);
b.run=function(h){d.each(e,function(f,l){a[l]=j(c[l],i,h)})}}}})(jQuery);


/* **********************************************
     Begin about.js
********************************************** */

var meimgswidth, meimgsession = [];

$(document).ready(function(){

	meimgswidth = Math.floor((((wpwidth*.85)*.3)/2)-15)

	$.ajax({
		type: "POST",
		dataType:'JSON',
		url: "php/getmine.php"
	}).done(function(my){
		$.each(my.imgs, function(m){
			var myimgs = '<div style="width:'+meimgswidth+'px; height:'+meimgswidth+'px;" data-img="'+my.imgs[m].id+'"><img src="img/kill.png" class="img_kill" /><img src="'+my.imgs[m].img+'"/></div>'
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
				url: "php/killmeimg.php"
			}).done(function(){
				$waitme.remove();
			})
		});
	});
});

$('#meimgs').filedrop({
	fallback_id: 'me',
	paramname:'me_image',
	
	url: 'php/me_img.php',
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
				url: "php/killmeimg.php"
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
		var preview = $('<div class="loading" style="width:'+meimgswidth+'px; height:'+meimgswidth+'px;"><img src="img/kill.png" class="img_kill" /><img /></div>'), 
		image = $('img', preview);
		var reader = new FileReader();
		
		image.width = meimgswidth;
		image.height = meimgswidth;
		
		reader.onload = function(e){ image.attr('src',e.target.result); };
		reader.readAsDataURL(file);
		preview.appendTo('#meimgs');
		preview.append('<img src="img/kill.png" class="img_kill" />')
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
		url: "php/setmine.php"
	})

}























