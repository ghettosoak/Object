var container, stats;
var camera, scene, blockRenderer, renderer;
var projector, plane, cube, controls;
var mouse2D, mouse3D, ray,
rollOveredFace, isShiftDown = false, isMouseDown = false, isCtrlDown = false, heylookatme,
radious = 1600, theta = -90, onMouseDownTheta = -90, phi = 60, onMouseDownPhi = 60, onMouseDownPosition, previewed = false, separated = false,
trow, tref, tnumber, tcube, strow, stnumber, rowsless = 0, rowsmore = 0, previewedOrigCoordx, previewedOrigCoordy, returnCoordx, returnCoordy, returnCoordz,
$name;
var where = 'front';

var rollOverMesh, rollOverMaterial, voxelPosition = new THREE.Vector3(), tmpVec = new THREE.Vector3();
var cubeGeo, cubeMaterial;
var i, intersector;
var zoomfactor = 3;
var counter = 1, cubecounter = 1;
var origpos= {};
var slide = new slider();

var namelist = [];

var testpos = {
	x: 3,
	y: 3,
	z: 3
};

init();
animate();

function init() {
	$('#cubic').css({'top': ($windowpane.height()-672)/2, 'left':($windowpane.width()-1024)/2})
	
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
	renderer.setSize( 819,672 );
	renderer.domElement.style.position = 'absolute';
	renderer.domElement.style.top = 0;
	renderer.domElement.style.overflow = 'inherit';
	$('#cubic').append( renderer.domElement );

	//listeners
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'keydown', onDocumentKeyDown, false );
	document.addEventListener( 'keyup', onDocumentKeyUp, false );
	window.addEventListener( 'resize', onWindowResize, false );

	//init.init
	heylookatme = scene.position;
	cubegenerator(cubedescend);

	camera = new THREE.PerspectiveCamera( 18, 1024 / 768, 1, 10000 ); 
	camera.position.x = radious * Math.sin( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
	camera.position.y = radious * Math.sin( phi * Math.PI / 360 );
	camera.position.z = radious * Math.cos( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
	camera.lookAt(heylookatme)

	onMouseDownPosition = new THREE.Vector2();

	// cubedescender();
}

function onWindowResize() {
	camera.setLens( window.innerWidth, window.innerHeight );
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
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
	if ( isMouseDown && !previewed) {
		theta = - ( ( event.clientX - onMouseDownPosition.x ) * 0.5 ) + onMouseDownTheta;
		phi = ( ( event.clientY - onMouseDownPosition.y ) * 0.5 ) + onMouseDownPhi;
		phi = Math.min( 180, Math.max( 0, phi ) );
		camera.position.x = radious * Math.sin( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
		camera.position.y = radious * Math.sin( phi * Math.PI / 360 );
		camera.position.z = radious * Math.cos( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
		camera.lookAt(heylookatme)
		camera.updateMatrix();
		if (camera.position.x < heylookatme.x) for (var i in namelist) scene.children[namelist[i]].rotation.y = Math.PI*1.5;
		else for (var i in namelist) scene.children[namelist[i]].rotation.y = Math.PI/2;
	}
}

function onDocumentMouseUp( event ) {
	event.preventDefault();
	isMouseDown = false;
	onMouseDownPosition.x = event.clientX - onMouseDownPosition.x;
	onMouseDownPosition.y = event.clientY - onMouseDownPosition.y;
}


$('.cube').on('click', function(){
	trow = $(this).data('row');
	tref = $(this).nextAll('.name').first().find('p').text();
	tnumber = $(this).data('array');
	tcube = $(this).data('cube');
	twhich = $(this).data('number');

	console.log(trow+' // '+tref+' // '+tnumber+' // '+tcube+' // '+twhich)

	if (!previewed && !separated){
		var rowrecurse;
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
			g: heylookatme.x,
			gc: camera.position.x
		})
		.to({ 
			g: scene.children[tnumber].position.x,
			gc: scene.children[tnumber].position.x
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
			centeraround(scene.children[tnumber])
		},500);

		setTimeout(function(){
			shapeshift(tcube, tref, trow, twhich)
		},1000)

	}else if (!previewed && separated){
		var directionalcorrection;
		if (trow > strow) directionalcorrection = -50;
		else directionalcorrection = 50;

		var rowrecurse;
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

$('.name').on('click', function(){
	$(this).prev().click();
});

function centeraround(me){
	var jump = 500;
	var camera_x, camera_y, camera_z;
	camera.position.x > 0 ? camera_x = me.position.x + 700 : camera_x = me.position.x - 700;
	camera.position.y > 0 ? camera_y = me.position.y + 500 : camera_y = me.position.y - 500;
	camera.position.z > 0 ? camera_z = me.position.z + 700 : camera_z = me.position.z - 700;

	var tween = new TWEEN.Tween({ 
		center_x: heylookatme.x, center_y: heylookatme.y, center_z: heylookatme.z,
		x: camera.position.x, y: camera.position.y, z: camera.position.z 
	})
	.to({ 
		center_x: me.position.x, center_y: me.position.y, center_z: me.position.z,
		x: camera_x, y: camera_y, z: camera_z 
	}, jump )
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
		camera.updateMatrix();
	},jump);
}

$('#cubic').on('click',function(){
	if (previewed){
		$('#shapeshifter').fadeOut(100, function(){
			clearInterval(clicker)
			$('.ssi').css('display','none')

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

				previewed = false;
				camera.updateMatrix();
			},200);
		})

	}
});

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

function textgenerate(word){
	var txt = document.createElement( 'div' );
	txt.className = 'element';
	txt.innerHTML = 'hell yes!';

	var object = new THREE.CSS3DObject( txt );
	object.position.x = 100;
	object.position.y = 100;
	object.position.z = 100;
	scene.add( object );
}

function cubedescender(){
	$.ajax({
		type: "POST",
		dataType:'JSON',
		url: "php/cubepull.php",
	}).done( function(cube){
		cubegenerator(cube)
	})
}

function cubegenerator(receive){
	var centered = new THREE.Vector3((Math.floor(_.size(receive))/2)*50, 50, 100)
	heylookatme = centered;
	// camera.lookAt(heylookatme)

	var rowcount = 1, numberexact = 0;
	for (var row in receive){
		var cube = receive[row];
		for (var i in cube){
			var element = document.createElement( 'div' );
			element.className = 'cube r'+rowcount.toString();
			element.id = 'c'+counter.toString();
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
		namelist.push(counter.toString())

		counter++;	
		numberexact = 0;

		var text = new THREE.CSS3DObject( name );
		text.position.x = (rowcount-1)*50;
		text.position.y = 0;
		text.position.z = 200;
		text.rotation.y = Math.PI*1.5;
		scene.add( text );

		rowcount++
	}

	setTimeout(function(){
		$name = $('.name');
	},50)
}

function onDocumentKeyDown( event ){
	switch( event.keyCode ) {
		case 16: isShiftDown = true; break;
		case 18: isCtrlDown = true; break;
	}
}

function onDocumentKeyUp( event ){
	switch( event.keyCode ) {
		case 16: isShiftDown = false; break;
		case 18: isCtrlDown = false; break;
	}
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


