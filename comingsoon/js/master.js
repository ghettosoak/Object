(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());

//jquery v1.8.0 is included in this mess. Copyright 2012 jQuery Foundation and other contributors.
//like something you see, but can't read this unholy mess? drop me a line at (mif)[at](awe)[minus](schaffhausen)[dot](com)

$(document).ready(function(){
	if ($.browser.msie && parseInt($.browser.version, 10) < 7) $('body').supersleight({shim: 'img/transparent.gif'});
})

var IMG_WIDTH = 500;
var currentImg=0;
var maxImages=3;
var speed=500;

var imgs;
	
var swipeOptions={
	triggerOnTouchEnd : true,	
	swipeStatus : swipeStatus,
	allowPageScroll:"vertical",
	threshold:75			
}

$(function(){				
	imgs = $("#imgs");
	imgs.swipe( swipeOptions );
});

	
/**
* Catch each phase of the swipe.
* move : we drag the div.
* cancel : we animate back to where we were
* end : we animate to the next image
*/			
function swipeStatus(event, phase, direction, distance)
{
	//If we are moving before swipe, and we are going Lor R in X mode, or U or D in Y mode then drag.
	if( phase=="move" && (direction=="left" || direction=="right") )
	{
		var duration=0;
		
		if (direction == "left")
			scrollImages((IMG_WIDTH * currentImg) + distance, duration);
		
		else if (direction == "right")
			scrollImages((IMG_WIDTH * currentImg) - distance, duration);
		
	}
	
	else if ( phase == "cancel")
	{
		scrollImages(IMG_WIDTH * currentImg, speed);
	}
	
	else if ( phase =="end" )
	{
		if (direction == "right")
			previousImage()
		else if (direction == "left")			
			nextImage()
	}
}
		


function previousImage()
{
	currentImg = Math.max(currentImg-1, 0);
	scrollImages( IMG_WIDTH * currentImg, speed);
}

function nextImage()
{
	currentImg = Math.min(currentImg+1, maxImages-1);
	scrollImages( IMG_WIDTH * currentImg, speed);
}
	
/**
* Manuallt update the position of the imgs on drag
*/
function scrollImages(distance, duration)
{
	imgs.css("-webkit-transition-duration", (duration/1000).toFixed(1) + "s");
	
	//inverse the number we set in the css
	var value = (distance<0 ? "" : "-") + Math.abs(distance).toString();
	
	imgs.css("-webkit-transform", "translate3d("+value +"px,0px,0px)");
}