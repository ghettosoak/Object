
var $l1 = $('#l1')

var count = 0;
var loaderinterval;

function loadr(){
	loaderinterval = setInterval(loadingplshold, 20)
}

function loadingplshold(){
	$l1.css('background-position-y', -count*173+'px')
	count++;
	if (count == 60) count = 0;
}

function okayitsloaded(){
	clearInterval(loaderinterval);
}
