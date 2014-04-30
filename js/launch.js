$(document).ready(function(){
	wpheight = $windowpane.height();
	wpwidth = $windowpane.width();

	if (window.location.hash){
		hash = window.location.hash.split('#')[1];
		hashhistory.push(hash);
		console.log(hash);

		if (hash.indexOf('!me') === 0) $('#movement').removeClass().addClass('first');
		if (hash.indexOf('!cubic') === 0) $('#movement').removeClass().addClass('second');
		if (hash.indexOf('!project') === 0){
			var theProj = hash.split('_')[1];
			console.log(theProj)
			$('#movement').removeClass().addClass('third');

			var $cubeInQuestion = $cubic.find('div[data-callmemaybe="' + theProj + '"]');
			
			tcallme = $cubeInQuestion.data('callmemaybe');
			tref = $cubeInQuestion.nextAll('.name').first().find('p').text();
			trow = $cubeInQuestion.data('row');
			twhich = $cubeInQuestion.data('number');
			
			projLoader(theProj);

			$cubeInQuestion.click()
		}

	}else{
		$('#movement').removeClass().addClass('second');
		window.location.hash = '!cubic';
	}
});

$windowpane.load(function(){
	$('#master').addClass('ready');
});

$windowpane.resize(function(){
	wpheight = $windowpane.height();
	wpwidth = $windowpane.width();
});

$windowpane.bind('hashchange', function(){
	hash = window.location.hash.split('#')[1];

	if (hash.indexOf('!me') === 0) $('#movement').removeClass().addClass('first');
	if (hash.indexOf('!cubic') === 0) $('#movement').removeClass().addClass('second');
	if (hash.indexOf('!project') === 0) {
		$('#movement').removeClass().addClass('third');
		projLoader(hash.split('_')[1]);
		cleargrid();
	}

	hashhistory.push(hash);
	console.log(hash)
});

$('.title').on('click', function(){
	window.location.hash = '!cubic';
})