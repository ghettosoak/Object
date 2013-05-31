var clicker, tracker = 1, prone, layerrefere, layernumber, individualnumber;

function shapeshifterload(block){
	for (var p in block){
		var img = document.createElementNS('http://www.w3.org/2000/svg','image');
		img.setAttributeNS(null,'height', (block[p].count-1)+'99%');
		img.setAttributeNS(null,'width','107%');
		img.setAttributeNS('http://www.w3.org/1999/xlink','href', block[p].img);
		img.setAttributeNS(null,'x','0');
		img.setAttributeNS(null,'y','0');
		img.setAttributeNS(null, 'clip-path', 'url(#hex-mask)');
		img.setAttributeNS(null, 'preserveAspectRatio', 'xMidYMin slice');
		img.setAttributeNS(null, 'id', 'ssi_'+p);
		img.setAttributeNS(null, 'class', 'ssi');
		img.setAttributeNS(null, 'data-count', block[p].count);
		$('#cubeshape').append(img);
	}
}

function shapeshift(ed, ing, er, ar){
	prone = ed;
	layerrefere = ing;
	layernumber = er;
	individualnumber = ar;

	console.log(ed+' >> '+ing+' >> '+er+' >> '+ar)
	var toomuch = $('#ssi_'+ed).css('display','block').data('count')-1
	console.log(toomuch)
	$('#shapeshifter').fadeIn(300)
	clicker = setInterval(function(){
		document.getElementById('ssi_'+prone).setAttributeNS(null, 'y', -149*tracker)
		tracker >= toomuch ? tracker = 0 : tracker++;
	}, 500);
}

$('#shapeshifter').on('click', function(){
	where = 'project';
	$('#movement').removeClass().addClass('third')
	clearInterval(clicker)
	$.ajax({
		type: "POST",
		dataType:'JSON',
		data:{project:tcallme},
		url: "php/project.php",
	}).done( function(cellular){
		projectdeploy(cellular);
	})
	breadcrumb(cubedescend.nav.cubes[layerrefere], layernumber, prone)
});