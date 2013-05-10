(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());

//jquery v1.8.0 is included in this mess. Copyright 2012 jQuery Foundation and other contributors.
//like something you see, but can't read this unholy mess? drop me a line at (mif)[at](awe)[minus](schaffhausen)[dot](com)

var isMouseDown = false, radious = 1600, theta = -90, onMouseDownTheta = -90, phi = 60, onMouseDownPhi = 60, onMouseDownPosition,
onMouseDownPosition, previewed = false, separated = false, trow, tref, tnumber, tcube, tcallme, currentlyediting, cubearrayediting, newest = false,
catoffset, categoryheight = 0, catopen = false, firstly = true, editingcount = 0;
var counter = 1, cubecounter = 1;
var $ovr_sight;
var slide = new slider();
var categ = [];
var presence = {};
// var presenceorig = {};
// var presenceedit = {};
var changed = {};
var $windowpane = $(window);
var wpheight, wpwidth;


$(document).ready(function(){

	wpheight = $windowpane.height();
	wpwidth = $windowpane.width();
	
	$ovr_sight = $('#oversight_sight')

	init();
	animate();

	$('#cell_put').css('height',$windowpane.height()-60)
	$('#shapeshifterhopper').css('height', $windowpane.height()-$('.info').height()-$('.coords').height()-18)
	$('#info_category').css('left', function(){
		return $(this).parent().prev().find('input').position().left;
	})

	// b_workload(23)
	// b_workload(22)

	var timer = 1000

	setTimeout(function(){$('#c20').click()},timer*1)
	setTimeout(function(){$('#c20').click()},timer*2)
	// setTimeout(function(){$('#c19').click()},timer*3)


	// setTimeout(function(){
	// 	separated = true;
	// 	$('#cell_add').click()
	// },200)
	
})

function init() {
	// $('#oversight_sight').css({'top': ($windowpane.height()-672)/2, 'left':($windowpane.width()-1024)/2})
	
	scene = new THREE.Scene();

	// projector
	projector = new THREE.Projector();

	// grid
	plane = new THREE.Mesh( new THREE.PlaneGeometry( 1000, 1000, 20, 20 ), new THREE.MeshBasicMaterial( { transparent: true, wireframe:true, color:0x000000, opacity: .5} ) );
	plane.rotation.x = - Math.PI / 2;
	scene.add( plane );
	mouse2D = new THREE.Vector3( 0, 0, 0 );

	//renderer
	renderer = new THREE.CSS3DRenderer();
	renderer.setSize( $ovr_sight.width(), $ovr_sight.height() );
	renderer.domElement.style.position = 'absolute';
	renderer.domElement.style.top = 0;
	// renderer.domElement.style.overflow = 'inherit';
	$('#oversight_sight').append( renderer.domElement );

	//listeners
	$ovr_sight.mousemove(onDocumentMouseMove);
	$ovr_sight.mousedown(onDocumentMouseDown);
	$ovr_sight.mouseup(onDocumentMouseUp);
	// document.addEventListener( 'keydown', onDocumentKeyDown, false );
	// document.addEventListener( 'keyup', onDocumentKeyUp, false );
	// window.addEventListener( 'resize', onWindowResize, false );

	//init.init
	heylookatme = scene.position;
	// cubegenerator(cubedescend);

	camera = new THREE.PerspectiveCamera( 50, $ovr_sight.width() / $ovr_sight.height(), 1, 10000 ); 
	camera.position.x = radious * Math.sin( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
	camera.position.y = radious * Math.sin( phi * Math.PI / 360 );
	camera.position.z = radious * Math.cos( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
	camera.lookAt(heylookatme)

	onMouseDownPosition = new THREE.Vector2();

	cubedescender();
}

function onDocumentMouseDown( event ) {
	event.preventDefault();
	isMouseDown = true;
	onMouseDownTheta = theta;
	onMouseDownPhi = phi;
	onMouseDownPosition.x = event.clientX;
	onMouseDownPosition.y = event.clientY;
}

function onDocumentMouseMove( event ) {
	event.preventDefault();
	if ( isMouseDown) {
		theta = - ( ( event.clientX - onMouseDownPosition.x ) * 0.5 ) + onMouseDownTheta;
		phi = ( ( event.clientY - onMouseDownPosition.y ) * 0.5 ) + onMouseDownPhi;
		phi = Math.min( 180, Math.max( 0, phi ) );
		camera.position.x = radious * Math.sin( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
		camera.position.y = radious * Math.sin( phi * Math.PI / 360 );
		camera.position.z = radious * Math.cos( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
		camera.lookAt(heylookatme)
		camera.updateMatrix();
		// if (camera.position.x < heylookatme.x) for (var i in namelist) scene.children[namelist[i]].rotation.y = Math.PI*1.5;
		// else for (var i in namelist) scene.children[namelist[i]].rotation.y = Math.PI/2;
	}
}

function onDocumentMouseUp( event ) {
	event.preventDefault();
	isMouseDown = false;
	onMouseDownPosition.x = event.clientX - onMouseDownPosition.x;
	onMouseDownPosition.y = event.clientY - onMouseDownPosition.y;
}

function cube_ensure(){
	$('.cube').on('click', function(){
		// console.log('cube!')

		if (!previewed){
			tcallme = $(this).data('callmemaybe')
			trow = $(this).data('row');
			tref = $(this).nextAll('.name').first().find('p').text();
			tnumber = $(this).data('array');
			tcube = $(this).data('cube');
			twhich = $(this).data('number');
		}

		console.log(trow+' // '+tref+' // '+tnumber+' // '+tcube+' // '+twhich)

		if (!previewed && !separated){
			$(this).siblings().each(function(e){
				var $that = $(this)
				var $dcube = $that.data('array')
				var $drow = $that.data('row')
				if (!$that.hasClass('r'+trow)){
					if ($dcube < tnumber) slide.likethis($dcube, 'left', $drow)
					else slide.likethis($dcube, 'right', $drow)
				}else slide.likethis($dcube, 'center', $drow)
			});
			slide.likethis(tnumber, 'center', trow)

			var tween = new TWEEN.Tween({
				g: heylookatme.x
			})
			.to({ 
				g: scene.children[tnumber].position.x
			}, 500)
			.easing(TWEEN.Easing.Exponential.InOut)
			.onUpdate(function () {
				heylookatme.x = this.g
				camera.lookAt(heylookatme)
			})
			.start();

			setTimeout(function(){
				separated = true;
				camera.updateMatrix();
			},500);
		}

		if (!previewed && separated && (trow == strow)){
			$('#shapeshifterhopper, #cell_put').empty()

			$(this).addClass('targeted').siblings().removeClass('targeted')
			previewed = true;

			b_workload(tcallme)
			cubearrayediting = tnumber;

		}else if (!previewed && separated){
			var directionalcorrection;
			if (trow > strow) directionalcorrection = -50;
			else directionalcorrection = 50;

			$(this).siblings().each(function(e){
				var $that = $(this)
				var $dcube = $that.data('array')
				var $drow = $that.data('row')
				if (!$that.hasClass('r'+trow)){
					if ($dcube < tnumber) slide.likethis($dcube, 'left', $drow)
					else slide.likethis($dcube, 'right', $drow)
				}else slide.likethis($dcube, 'center', $drow)
			});
			slide.likethis(tnumber, 'center', trow)

			var tween = new TWEEN.Tween({
				g: heylookatme.x
			})
			.to({ g: scene.children[tnumber].position.x + directionalcorrection }, 500)
			.easing(TWEEN.Easing.Exponential.InOut)
			.onUpdate(function () {
				heylookatme.x = this.g
				camera.lookAt(heylookatme)
			})
			.start();
		}

		strow = trow;
		stnumber = tnumber;
	});

	$ovr_sight.on('click',function(){
		if (previewed) previewed = false;
	});
}

function cubedescender(){
	$.ajax({
		type: "POST",
		dataType:'JSON',
		url: "php/cubepull.php",
	}).done( function(cube){
		cubedescend = cube.cubes
		categ = cube.categories
		cubegenerator(cubedescend)
	})
}

function cubegenerator(receive){
	var centered = new THREE.Vector3((Math.floor(_.size(receive))/2)*50, 50, 100)
	heylookatme = centered;
	camera.lookAt(heylookatme)
	console.log(receive)

	var rowcount = 1, numberexact = 0;
	for (var row in receive){
		var cube = receive[row];
		for (var i in cube){
			// console.log(rowcount+' // '+_.size(receive)+' // '+i+' // '+_.size(cube))
			var element = document.createElement( 'div' );
			element.className = 'cube r'+rowcount.toString();
			element.id = 'c'+counter.toString();
			element.setAttribute('data-callmemaybe', i)
			element.setAttribute('data-number', numberexact.toString())
			element.setAttribute('data-array', counter.toString())
			element.setAttribute('data-cube', cubecounter.toString())
			element.setAttribute('data-row', rowcount.toString())
			counter++;	
			cubecounter++;
			numberexact++

			var front = document.createElement('div');
			front.className = 'front';
			element.appendChild(front);

			var back = document.createElement('div');
			back.className = 'back';
			element.appendChild(back);

			var right = document.createElement('div');
			right.className = 'right';
			element.appendChild(right);

			var left = document.createElement('div');
			left.className = 'left';
			element.appendChild(left);

			var top = document.createElement('div');
			top.className = 'top';
			element.appendChild(top);

			var bottom = document.createElement('div');
			bottom.className = 'bottom';
			element.appendChild(bottom);

			var object = new THREE.CSS3DObject( element );
			// object.position.x = (((rowcount)-(Math.floor(_.size(receive))/2))*50)-25;
			object.position.x = (rowcount-1)*50;
			object.position.y = cube[i].y*50;
			object.position.z = cube[i].z*50;
			scene.add( object );

			// origheight[counter-2] = cube[i].y*50;

			if ((rowcount >= _.size(receive)) && (numberexact >= _.size(cube))) setTimeout(cube_ensure, 100)
		}

		var name = document.createElement( 'div' );
		name.className = 'name r'+rowcount.toString();
		// name.innerHTML = row;

		var nametxt = document.createElement( 'p' );
		// name.className = 'name r'+rowcount.toString();
		nametxt.innerHTML = row;
		name.appendChild(nametxt)
		name.setAttribute('data-array',counter.toString())
		name.setAttribute('data-row', rowcount.toString())
		// namelist.push(counter.toString())

		// origheight[counter-1] = 0;

		counter++;
		numberexact = 0;

		var text = new THREE.CSS3DObject( name );
		text.position.x = (rowcount-1)*50;
		text.position.y = 0;
		text.position.z = 200;
		text.rotation.y = Math.PI*1.5;
		scene.add( text );

		rowcount++;
	}

	setTimeout(function(){
		$name = $('.name');
	},50)
}

function slider(){
	function likethis(number, direction, row){
		var jump = 500;
		var stay = scene.children[number].position.x;
		var going;
		if (direction == 'left') going = (row*50)-50;
		else if (direction == 'right') going = (row*50)+50;
		else if (direction == 'center') going = row*50;

		var tween = new TWEEN.Tween({
			g: scene.children[number].position.x
		})
		.to({ g: going }, jump)
		.easing(TWEEN.Easing.Exponential.InOut)
		.onUpdate(function () {
			scene.children[number].position.x = this.g
		})
		.start();
		setTimeout(function(){
			camera.updateMatrix();
		},jump);
	}
	this.likethis = likethis;
}

function b_workload(er){
	// if (_.size(presenceorig) > 0) presenceedit[currentlyediting] = presence

	currentlyediting = er;

	$.ajax({
		type: "POST",
		dataType:'JSON',
		data: {projector:er},
		url: "php/projection.php"
	}).done(function(thisproj){
		console.log(thisproj)
		// presenceorig[thisproj.data.object_id] = thisproj;

		presence[thisproj.data.object_id] = thisproj;

		$('#info_name').val(thisproj.data.name)
		$('#info_client').val(thisproj.data.client)

		$('#info_datelaunch').val(thisproj.data.date_launched)
		$('#info_hours').val(thisproj.data.total_hours)
		$('#info_link').val(thisproj.data.project_text)
		$('#info_text').val(thisproj.data.link)
		$('#coord_y').val(thisproj.data.coord_y)
		$('#coord_z').val(thisproj.data.coord_z)

		$.each(categ, function(l, m){
			categoryheight += 19;
			var catego = '<li class="cat_'+m+'" data-category="'+m+'">'+m+'</li>';
			$.tmpl( catego , m).appendTo( "#info_category_carousel" );
			if (l == categ.length-1){
				catoffset = $('.cat_'+thisproj.data.category).position().top
				$('#info_category_carousel').css('top', -catoffset)
				categorical()
			}
		});

		$.each(thisproj.shapeshifters, function(s){
			var shapeshifted = '<img src="'+thisproj.shapeshifters[s].img+'" data-shapnum="'+thisproj.shapeshifters[s].shapeshifter_id+'" style="width:'+Math.floor((((wpwidth*.85)*.3333333)/2)-17)+'px;"/>'
			$.tmpl( shapeshifted , thisproj.shapeshifters[s]).appendTo( "#shapeshifterhopper" );
		});

		shapeshifterpower();

		$.each(thisproj.cells, function(l){
			var cellular = '<div class="cell_'+thisproj.cells[l].cell_id+'"><div class="cell_img_hold"><img src="'+thisproj.cells[l].img+'" /><img src="img/kill.png" class="kill" /></div><textarea tabindex="16" class="kommentar_content">'+thisproj.cells[l].txt+'</textarea></div>'
			$.tmpl( cellular , thisproj.cells[l]).appendTo( "#cell_put" );
		});

	})
}

function animate() {
	render();
	requestAnimationFrame( animate );
	TWEEN.update();
}

function render(){
	renderer.render( scene, camera );
}

$('#cell_add').on('click', function(){
	if ((separated) && (!newest)){
		newest = true;
		$('<div id="cell_new"><div class="cell_img_hold"><img src="img/cross.png" id="img_blank" /><img src="img/kill.png" class="kill" /></div><textarea tabindex="16" class="kommentar_content"></textarea></div>')
		.appendTo('#cell_put')
		.filedrop({
			fallback_id: 'cell_new',
			paramname:'pic',
			
			maxfiles: 1,
			url: 'php/cell.php',
			data:{ projectnumbercell: currentlyediting },
			
			uploadFinished:function(i,file,response){ $.data(file).removeClass('loading'); },
			
	    	error: function(err, file) { alert("it didn't work. here's why, maybe: "+err) },
			
			beforeEach: function(file){
				if(!file.type.match(/^image\//)){
					alert('images only kthx');
					return false;
				}
			},
			
			uploadStarted:function(i, file, len){
				var preview = $('<span><img class="loading" /></span>'), 
				image = $('img', preview);
				var reader = new FileReader();
				
				image.width = 100;
				image.height = 100;
				
				reader.onload = function(e){ image.attr('src',e.target.result); };
				reader.readAsDataURL(file);
				$('#img_blank').replaceWith(preview);
				$.data(file,preview);
			},
		
			progressUpdated: function(i, file, progress) {
				$.data(file).find('img').css('opacity',progress/100);
			}
		});
	}
	$('#cell_put').animate({'scrollTop':10000}).children().last().delay(400).css('background-color','rgba(255,0,0,.1)').animate({backgroundColor:'rgba(255,255,255,1)'})
})

function shapeshifterpower(){
	if (!firstly){
		$('#shapeshifterhopper').unbind('drop').unbind('dragenter').unbind('dragover').unbind('dragleave');
		$(document).unbind('drop').unbind('dragenter').unbind('dragover').unbind('dragleave');
	}
	firstly = false;

	$('#shapeshifterhopper').filedrop({
		fallback_id: 'shapeshifterhopper',
		paramname:'shap',
		
		url: 'php/shapeshiftput.php',
		data:{ projectnumbershapeshift: currentlyediting },
		
		uploadFinished:function(i,file,response){ $.data(file).removeClass('loading'); },
		
		error: function(err, file) { alert("it didn't work. here's why, maybe: "+err) },
		
		beforeEach: function(file){
			if(!file.type.match(/^image\//)){
				alert('images only kthx');
				return false;
			}
		},
		
		uploadStarted:function(i, file, len){
			var preview = $('<span><img style="width:'+Math.floor((((wpwidth*.85)*.3333333)/2)-17)+'px;"/></span>'), 
			image = $('img', preview);
			var reader = new FileReader();
			
			image.width = 100;
			image.height = 100;
			
			reader.onload = function(e){ image.attr('src',e.target.result); };
			reader.readAsDataURL(file);
			preview.appendTo('#shapeshifterhopper');
			$.data(file,preview);
		},
			
		progressUpdated: function(i, file, progress) {
			$.data(file).find('img').css('opacity',progress/100);
		}	 
	});
}

function categorical(){
	$('#info_category_open').on('click', function(){
		if (!catopen){
			catopen = true;
			$('#info_category').addClass('open').stop().animate({'top':-catoffset, 'height':categoryheight});
			$('#info_category_carousel').stop().animate({'top':'0px'});
		}else{
			catopen = false;
			$('#info_category').stop().animate({'top':0, 'height':20}, function(){ $(this).removeClass('open') });
			$('#info_category_carousel').stop().animate({'top':-catoffset});
		}
	});

	$('#info_category_carousel').on('click', 'li', function(){
		if ($(this).data('category') != presence[currentlyediting].data.category){
			presence[currentlyediting].data.category = $(this).data('category'); // why is this setting presenceorig? it shouldn't...
			cubeset('x', categ.indexOf($(this).data('category')));
			catopen = false;
			catoffset = $('.cat_'+$(this).data('category')).position().top;
			$('#info_category').animate({'top':0, 'height':20}, function(){ $(this).removeClass('open') });
			$('#info_category_carousel').animate({'top':-catoffset});
		}
	});
}

$('.coord_button').on('click', function(){
	var $that = $(this)
	var pos = $that.siblings('input').val()
	if ($that.hasClass('cb_up')){
		$that.siblings('input').val(++pos)
	}else{ // 'cb_down'
		$that.siblings('input').val(--pos)
	}

	if ($(this).parent().attr('id') == 'coord_y_hold'){
		cubeset('y', pos);
		presence[currentlyediting].data.coord_y = pos;
	}else{ // 'coord_z_hold'
		cubeset('z', pos);
		presence[currentlyediting].data.coord_z = pos;
	}
});

$('.coord_inp').on({
	keydown:function(e){
		if (e.keyCode == 38){
			$(this).siblings('.cb_up').click()
		}
		if (e.keyCode == 40){
			$(this).siblings('.cb_down').click()
		}
	},
	blur:function(){
		var leaving = $(this).val()
		if ($(this).attr('id') == 'coord_y'){
			cubeset('y', leaving);
			presence[currentlyediting].data.coord_y = leaving;
		}else{ // 'coord_z'
			cubeset('z', leaving);
			presence[currentlyediting].data.coord_z = leaving;
		}
	}
});


function cubeset(dimension, where){
	if (dimension == 'x') scene.children[cubearrayediting].position.x = where*50;
	if (dimension == 'y') scene.children[cubearrayediting].position.y = where*50;
	if (dimension == 'z') scene.children[cubearrayediting].position.z = where*50;	
}

$('#save').on('click', function(){

})

function uploader(){

	// presenceedit[currentlyediting] = presence

	// for (var a_cube in presenceorig){ // object_id
	// 	var tehcube = presenceorig[a_cube]
	// 	for (var attri_data in tehcube.data){
	// 		// console.log(tehcube.data[attri_data])
	// 		console.log(presenceorig[a_cube].data[attri_data])
	// 		if ((presenceorig[a_cube].data[attri_data]) != (presenceedit[a_cube].data[attri_data])) changed[a_cube].data[attri_data] = presenceedit[a_cube].data[attri_data]
	// 	}

	// 	for (var attri_shapeshifters in tehcube.shapeshifters){
	// 		// console.log(tehcube.shapeshifters[attri_shapeshifters])
	// 	}

	// 	for (var attri_cells in tehcube.cells){
	// 		var tehcell = tehcube.cells[attri_cells]
	// 		for (var cell_attribute in tehcell){
	// 			// console.log(tehcell[cell_attribute])
	// 		}
	// 	}
	// }


	// for (var a_cube in presence){ // object_id

		// I know, I know – there's a better way to do this. I'm learning.

		presence[currentlyediting].data.name = $('#info_name').val()
		presence[currentlyediting].data.client = $('#info_client').val()
		presence[currentlyediting].data.datelaunch = $('#info_datelaunch').val()
		presence[currentlyediting].data.hours = $('#info_hours').val()
		presence[currentlyediting].data.link = $('#info_link').val()
		presence[currentlyediting].data.text = $('#info_text').val()


		var cellnr = [];
		var celltxt = [];
		var cellcomplet = {};

		$('#cell_put').children('div').each(function(e){
			$that = $(this)
			cellnr[e] = $that.attr('class').split('_')[1]
			celltxt[e] = $that.find('textarea').val()

			if (e == $('#cell_put').children('div').size()-1){
				cellcomplet = _.object(cellnr, celltxt)
			}
		});


		var shapeshnr = [];

		$('#shapeshifterhopper').children('img').each(function(e){
			shapeshnr[e] = $(this).data('shapnum')
		});


		$.ajax({
			type: "POST",
			dataType:'JSON',
			data: {
				number:currentlyediting,
				data:presence[currentlyediting].data,
				shapeshifters:shapeshnr,
				celltext:cellcomplet
			},
			url: "php/heavylifting.php"
		})
	// }
}












