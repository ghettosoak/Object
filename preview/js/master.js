(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());

//jquery v1.8.0 is included in this mess. Copyright 2012 jQuery Foundation and other contributors.
//like something you see, but can't read this unholy mess? drop me a line at (mif)[at](awe)[minus](schaffhausen)[dot](com)

$(document).ready(function(){
	if ($.browser.msie && parseInt($.browser.version, 10) < 7) $('body').supersleight({shim: 'img/transparent.gif'});
})

var pwidth = $(document).width();
var currentImg=0;
var maxImages=9;
var speed=500;
var isold = false;
var righton = true, lefton = false;
var ismobile = false, hasbeenswiped = false;
var language; 

var $imgs;

var b_prfx = '';
	
var swipeOptions={
	triggerOnTouchEnd : true,	
	swipeStatus : swipeStatus,
	allowPageScroll:"vertical",
	threshold:75
}

$(function(){
	if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)) ismobile = true;
	if ($.browser.msie) isold = true;

	$imgs = $("#frame");

	browser_perfect();

	if (ismobile){
		$imgs.swipe( swipeOptions );
		$('.txt').on('touchend', function(){
			$(this).toggleClass('tapt');
		})
		$('.img').find('img').on('touchstart', function(){
			$('.txt').removeClass('tapt');
		})
		$('html').addClass('ipad');
		$('#swipe').fadeIn();
	}else{
		$('#mouse_l, #mouse_r').fadeIn();
	}

	language = window.navigator.userLanguage || window.navigator.language;
	if (language.toLowerCase() == 'de-ch' || language.toLowerCase() == 'de'){
		$('.en').css('display','none');
		$('.de').css('display','table')
	}

});

$('#mouse_l').on('click', previousImage);

$('#mouse_r').on('click', nextImage);

$(window).keydown(function(e){
	if (e.keyCode == 37) previousImage();
	if (e.keyCode == 39) nextImage();
});

function browser_perfect(){
	if ($.browser.webkit) b_prfx = '-webkit-';
	if ($.browser.mozilla) b_prfx = '-moz-';
	if ($.browser.opera) b_prfx = '-o-';
	if ($.browser.msie) b_prfx = '-ms-';
}
		
function swipeStatus(event, phase, direction, distance){
	if( phase=="move" && (direction=="left" || direction=="right") ){
		var duration=0;
		if (direction == "left") scrollImages((pwidth * currentImg) + distance, duration);
		else if (direction == "right") scrollImages((pwidth * currentImg) - distance, duration);
	}
	
	else if ( phase == "cancel") scrollImages(pwidth * currentImg, speed);
	
	else if ( phase =="end" ){
		if (direction == "right")previousImage();
		else if (direction == "left")nextImage();
	}

	if (( phase =="end" ) || ( phase == "cancel" )){
		if (!hasbeenswiped){
			$('#swipe').removeClass('lit');
			hasbeenswiped = true;
		}
	}
}

function previousImage(){
	currentImg = Math.max(currentImg-1, 0);
	scrollImages( pwidth * currentImg, speed);
}

function nextImage(){
	currentImg = Math.min(currentImg+1, maxImages-1);
	scrollImages( pwidth * currentImg, speed);
}
	
function scrollImages(distance, duration){
	var value = (distance<0 ? "" : "-") + Math.abs(distance).toString();
	console.log(currentImg);
	if (!isold){
		$imgs.css(b_prfx+"transition-duration", (duration/1000).toFixed(1) + "s");		
		$imgs.css(b_prfx+"transform", "translate3d("+value +"px,0px,0px)");
	}else{
		$imgs.animate({'left':value});
	}
	if (currentImg <= 0){
		$('#mouse_l').removeClass('lit');
		lefton = false;
	}else if (currentImg == (maxImages-1)){
		$('#mouse_r').removeClass('lit');
		righton = false;
	}else{
		if (!righton){
			$('#mouse_r').addClass('lit');
			righton = true;
		}
		if (!lefton){
			$('#mouse_l').addClass('lit');
			lefton = true;
		}
	}
}













