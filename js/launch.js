$(document).ready(function(){
	wpheight = $windowpane.height();
	wpwidth = $windowpane.width();

	if (window.location.hash){
		hash = window.location.hash.split('#')[1];
		hashhistory.push(hash);
		console.log(hash);

		if (hash.indexOf('!me') === 0){
			$('#movement').removeClass().addClass('first');
			helloMike();
		}

		else if (hash.indexOf('!cubic') === 0) $('#movement').removeClass().addClass('second');
		
		else if (hash.indexOf('!project') === 0){
			var theProj = hash.split('_')[1];
			console.log(theProj)
			$('#movement').removeClass().addClass('third');

			var $cubeInQuestion = $cubic.find('div[data-callmemaybe="' + theProj + '"]');
			
			tcallme = $cubeInQuestion.data('callmemaybe');
			tref = $cubeInQuestion.nextAll('.name').first().find('p').text();
			trow = $cubeInQuestion.data('row');
			twhich = $cubeInQuestion.data('number');
			
			projLoader(theProj);
			loadr();

			$cubeInQuestion.click()
		}

	}else{
		$('#movement').removeClass().addClass('second');
		window.location.hash = '!cubic';
	}
});

function acceleration(){	

	$master.addClass('ready'); 

	setTimeout(function(){ $master.addClass('r1_active'); }, 100);
	setTimeout(function(){ $master.addClass('r2_active'); }, 200);
	setTimeout(function(){ $master.addClass('r3_active'); }, 300);
	setTimeout(function(){ $master.addClass('r4_active'); }, 400);
	setTimeout(function(){ $master.addClass('r5_active'); }, 500);
	setTimeout(function(){ $master.addClass('r6_active'); }, 600);

	setTimeout(function(){
		cubeIntro(1900);
	}, 600);

	setTimeout(function(){ $master.addClass('to_rock'); }, 2000);
}


$windowpane.resize(function(){
	wpheight = $windowpane.height();
	wpwidth = $windowpane.width();
});

$windowpane.bind('hashchange', function(){
	hash = window.location.hash.split('#')[1];

	if (hash.indexOf('!me') === 0){
		$('#movement').removeClass().addClass('first');
		helloMike();
	}
	else if (hash.indexOf('!cubic') === 0) $('#movement').removeClass().addClass('second');
	else if (hash.indexOf('!project') === 0) {
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