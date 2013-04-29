var clicker, tracker = 1, prone, layerrefere, layernumber, individualnumber;

function shapeshifterload(block){
	for (var ssi in block){
		var path = block[ssi];
		for (var p in path){
			var img = document.createElementNS('http://www.w3.org/2000/svg','image');
			img.setAttributeNS(null,'height','499%');
			img.setAttributeNS(null,'width','107%');
			img.setAttributeNS('http://www.w3.org/1999/xlink','href', path[p]);
			img.setAttributeNS(null,'x','0');
			img.setAttributeNS(null,'y','0');
			img.setAttributeNS(null, 'clip-path', 'url(#hex-mask)');
			img.setAttributeNS(null, 'preserveAspectRatio', 'xMidYMin slice');
			img.setAttributeNS(null, 'id', 'ssi'+p);
			img.setAttributeNS(null, 'class', 'ssi');
			$('#cubeshape').append(img);
		}
	}
	$('#shapeshifter').css({'top':($windowpane.height()-147)/2, 'left':($windowpane.width()-342)/2})
}

function shapeshift(ed, ing, er, ar){
	prone = ed;
	layerrefere = ing;
	layernumber = er;
	individualnumber = ar;

	console.log(ed+' >> '+ing+' >> '+er+' >> '+ar)
	$('#ssi'+ed).css('display','block')
	$('#shapeshifter').fadeIn(300)
	clicker = setInterval(function(){
		document.getElementById('ssi'+ed).setAttributeNS(null, 'y', -149*tracker)
		tracker >= 4 ? tracker = 0 : tracker++;
	}, 500);
}

$('#shapeshifter').on('click', function(){
	where = 'project';
	$('.title').transition({'left':((wpwidth-72)/2)+(wpwidth*.2), 'margin':'0px'}, 1000)
	$('.who').transition({'left':((wpwidth-40)/2)+(wpwidth*.2), 'margin':'0px'}, 1000)
	$('.movement').transition({'x':'-25%'}, 1000, function(){
		// $.getJSON('php/project.json', {}, function(q) {
		$.getJSON('php/project.json', function(q) {
			projectdeploy(q);
		})
		breadcrumb(cubedescend[layerrefere], 'r'+layernumber , individualnumber)
	});
});