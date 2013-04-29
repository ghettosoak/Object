(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());

//jquery v1.8.0 is included in this mess. Copyright 2012 jQuery Foundation and other contributors.
//like something you see, but can't read this unholy mess? drop me a line at (mif)[at](awe)[minus](schaffhausen)[dot](com)

$(document).ready(function(){
	if ($.browser.msie && parseInt($.browser.version, 10) < 7) $('body').supersleight({shim: 'img/transparent.gif'});
})










//'##::::'##:'########::'##::::::::'#######:::::'###::::'########::'########:'########::
// ##:::: ##: ##.... ##: ##:::::::'##.... ##:::'## ##::: ##.... ##: ##.....:: ##.... ##:
// ##:::: ##: ##:::: ##: ##::::::: ##:::: ##::'##:. ##:: ##:::: ##: ##::::::: ##:::: ##:
// ##:::: ##: ########:: ##::::::: ##:::: ##:'##:::. ##: ##:::: ##: ######::: ########::
// ##:::: ##: ##.....::: ##::::::: ##:::: ##: #########: ##:::: ##: ##...:::: ##.. ##:::
// ##:::: ##: ##:::::::: ##::::::: ##:::: ##: ##.... ##: ##:::: ##: ##::::::: ##::. ##::
//. #######:: ##:::::::: ########:. #######:: ##:::: ##: ########:: ########: ##:::. ##:
//:.......:::..:::::::::........:::.......:::..:::::..::........:::........::..:::::..::

// var dropbox = $('#dropbox'),
// 	message = $('.message', dropbox);

// dropbox.filedrop({
// 	// The name of the $_FILES entry:
// 	paramname:'pic',
	
// 	maxfiles: 5,
// 	maxfilesize: 2,
// 	url: 'cell.php',

// 	data: {
// 		param1: 'value1'
// 	},
	
// 	beforeEach: function(file){
// 		if(!file.type.match(/^image\//)){
// 			alert('Only images are allowed!');
// 			return false;
// 		}
// 	},
	
// 	uploadStarted:function(i, file, len){
// 		createImage(file);
// 	},
	
// 	progressUpdated: function(i, file, progress) {
// 		$.data(file).find('.progress').width(progress);
// 	}, 

// 	uploadFinished:function(i,file,response){
// 		$.data(file).addClass('done');
// 	},

// 	error: function(err, file) {
// 		switch(err) {
// 			case 'BrowserNotSupported':
// 				showMessage('Your browser does not support HTML5 file uploads!');
// 				break;
// 			case 'TooManyFiles':
// 				alert('Too many files! Please select 5 at most! (configurable)');
// 				break;
// 			case 'FileTooLarge':
// 				alert(file.name+' is too large! Please upload files up to 2mb (configurable).');
// 				break;
// 			default:
// 				break;
// 		}
// 	}
// });

// var template = '<div class="preview">'+
// 					'<span class="imageHolder">'+
// 						'<img />'+
// 						'<span class="uploaded"></span>'+
// 					'</span>'+
// 					'<div class="progressHolder">'+
// 						'<div class="progress"></div>'+
// 					'</div>'+
// 				'</div>'; 


// function createImage(file){
// 	var preview = $(template), 
// 	image = $('img', preview);
// 	var reader = new FileReader();
	
// 	image.width = 100;
// 	image.height = 100;
	
// 	reader.onload = function(e){
// 		image.attr('src',e.target.result);
// 	};

// 	reader.readAsDataURL(file);
// 	message.hide();
// 	preview.appendTo(dropbox);
// 	$.data(file,preview);
// }

// function showMessage(msg){
// 	message.html(msg);
// }




