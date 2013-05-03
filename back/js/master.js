(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());

//jquery v1.8.0 is included in this mess. Copyright 2012 jQuery Foundation and other contributors.
//like something you see, but can't read this unholy mess? drop me a line at (mif)[at](awe)[minus](schaffhausen)[dot](com)

var isMouseDown = false, radious = 1600, theta = -90, onMouseDownTheta = -90, phi = 60, onMouseDownPhi = 60, onMouseDownPosition,
onMouseDownPosition, previewed = false, separated = false, trow, tref, tnumber, tcube, tcallme, currentlyediting, newest = false;
var counter = 1, cubecounter = 1;
var $ovr_sight;
var slide = new slider();
var presence = {};
var $windowpane = $(window);

$(document).ready(function(){
	if ($.browser.msie && parseInt($.browser.version, 10) < 7) $('body').supersleight({shim: 'img/transparent.gif'});
	
	$ovr_sight = $('#oversight_sight')

	init();
	animate();

	$('#cell_put').css('height',$windowpane.height()-60)
	$('#shapeshifterhopper').css('height', $windowpane.height()-$('.info').height()-$('.coords').height()-18)

	b_workload(23)

	setTimeout(function(){
		separated = true;
		$('#cell_add').click()
	},200)
	
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
			// console.log('111111111')
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
				g: heylookatme.x//,
				// gc: camera.position.x
			})
			.to({ 
				g: scene.children[tnumber].position.x//,
				// gc: scene.children[tnumber].position.x
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
			// console.log('222222222')
			previewedOrigCoordx = scene.children[tnumber].position.x;
			previewedOrigCoordy = scene.children[tnumber].position.y;
			returnCoordx = camera.position.x;
			returnCoordy = camera.position.y;
			returnCoordz = camera.position.z;

			var tween = new TWEEN.Tween({ by: scene.children[tnumber].position.y})
			.to({ by: 300 }, 500)
			.easing(TWEEN.Easing.Exponential.InOut)
			.onUpdate(function () {
				scene.children[tnumber].position.y = this.by
			})
			.start();

			setTimeout(function(){
				previewed = true;
				// centeraround(scene.children[tnumber])

				b_workload(tcallme)
			},500);

			// setTimeout(function(){
			// 	shapeshift(tcube, tref, trow, twhich)
			// },1000)

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

			// console.log('333333333')

			// getdown(tcube)

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

	$('.name').on('click', function(){
		$(this).prev().click();
	});


	$ovr_sight.on('click',function(){
		// console.log('background!')
		if (previewed){
			// $('#shapeshifter').fadeOut(100, function(){
				console.log('44444444')

				// clearInterval(clicker)
				// $('.ssi').css('display','none')

				var tween = new TWEEN.Tween({ 
					center_x: heylookatme.x, center_y: heylookatme.y, center_z: heylookatme.z,
					x: camera.position.x, y: camera.position.y, z: camera.position.z 
				})
				.to({ 
					center_x: previewedOrigCoordx-50, center_y: 50, center_z: 100,
					x: returnCoordx, y: returnCoordy, z: returnCoordz 
				}, 500 )
				.easing(TWEEN.Easing.Exponential.InOut)
				.onUpdate(function (){
					camera.position.x = this.x;
					camera.position.y = this.y;
					camera.position.z = this.z;

					var centering = new THREE.Vector3(this.center_x, this.center_y, this.center_z)
					heylookatme = centering;
					camera.lookAt(heylookatme)
				})
				.start();

				setTimeout(function(){
					var tween = new TWEEN.Tween({ by: scene.children[stnumber].position.y})
					.to({ by: previewedOrigCoordy }, 500)
					.easing(TWEEN.Easing.Exponential.InOut)
					.onUpdate(function () {
						scene.children[stnumber].position.y = this.by
					})
					.start();

					// getdown(stnumber)

					previewed = false;
					camera.updateMatrix();
				},200);
			// })

		}
	});
}

function cubedescender(){
	$.ajax({
		type: "POST",
		dataType:'JSON',
		url: "php/cubepull.php",
	}).done( function(cube){
		cubedescend = cube
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
	currentlyediting = er;
	$.ajax({
		type: "POST",
		dataType:'JSON',
		data: {projector:er},
		url: "php/projection.php"
	}).done(function(thisproj){
		console.log(thisproj)
		presence = thisproj;

		$('#info_name').val(thisproj.data.name)
		$('#info_client').val(thisproj.data.client)
		$('#info_category').val(thisproj.data.category)
		$('#info_datelaunch').val(thisproj.data.date_launched)
		$('#info_hours').val(thisproj.data.total_hours)
		$('#info_link').val(thisproj.data.project_text)
		$('#info_text').val(thisproj.data.link)
		$('#coord_y').val(thisproj.data.coord_y)
		$('#coord_z').val(thisproj.data.coord_z)

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

function render() {
	renderer.render( scene, camera );
	// console.log(camera.position)
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
			data:{ projector: currentlyediting },
			
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



$('#shapeshifterhopper').filedrop({
	fallback_id: 'shapeshifterhopper',
	paramname:'shap',
	
	url: 'php/shapeshiftput.php',
	data:{ projector: currentlyediting },
	
	uploadFinished:function(i,file,response){ $.data(file).removeClass('loading'); },
	
	error: function(err, file) { alert("it didn't work. here's why, maybe: "+err) },
	
	beforeEach: function(file){
		if(!file.type.match(/^image\//)){
			alert('images only kthx');
			return false;
		}
	},
	
	uploadStarted:function(i, file, len){
		var preview = $('<span><img /></span>'), 
		image = $('img', preview);
		var reader = new FileReader();
		
		image.width = 100;
		image.height = 100;
		
		reader.onload = function(e){ image.attr('src',e.target.result); };
		reader.readAsDataURL(file);
		preview.appendTo('#shapeshifterhopper')
		$.data(file,preview);
	},
		
	progressUpdated: function(i, file, progress) {
		$.data(file).find('img').css('opacity',progress/100);
	}	 
});




