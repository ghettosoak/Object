function loadr(){
	var whichloader = Math.floor(Math.random() * (6 - 0 + 1)) + 0;
	console.log(whichloader)
	$('#loadr').removeClass().addClass('load_'+whichloader);
	presentlyloading = true;
}

function loadingplshold(){
	$l1.css('background-position-y', -count*173+'px')
	count++;
	if (count == 60) count = 0;
}

function okayitsloaded(){
	presentlyloading = false;
}
