function cubeinit(thecube, fade) {
	$cubic = $('#cubic');	
	scene = new THREE.Scene();

	// projector
	projector = new THREE.Projector();

	// grid
	plane = new THREE.Mesh( new THREE.PlaneGeometry( 1000, 1000, 20, 20 ), new THREE.MeshBasicMaterial( { transparent: true, wireframe:true, color:0x000000, opacity: .5} ) );
	plane.rotation.x = - Math.PI / 2;
	scene.add( plane );

	//renderer
	renderer = new THREE.CSS3DRenderer();
	renderer.setSize( 819,672 );
	renderer.domElement.style.position = 'absolute';
	renderer.domElement.style.top = 0;
	renderer.domElement.style.overflow = 'inherit';
	$cubic.append( renderer.domElement );	

	window.addEventListener( 'resize', onWindowResize, false );

	//init.init
	heylookatme = scene.position;

	camera = new THREE.PerspectiveCamera( 18, 1024 / 768, 1, 10000 ); 

	// if (letsIntro){
		camera.position.x = introPos.x;
		camera.position.y = introPos.y;
		camera.position.z = introPos.z;
	// }
	// else{
	// 	camera.position.x = normalPos.x;
	// 	camera.position.y = normalPos.y;
	// 	camera.position.z = normalPos.z;
	// }

	camera.lookAt(heylookatme)

	onMouseDownPosition = new THREE.Vector2();

	cubegenerator(cubedescend.nav.cubes)
}

function onWindowResize() { camera.updateProjectionMatrix(); }

function cubeIntro(duration){
	var tween = new TWEEN.Tween({ 
		x: introPos.x,
		y: introPos.y,
		z: introPos.z,
	})
	.to({ 
		x: normalPos.x,
		y: normalPos.y,
		z: normalPos.z,
	}, duration )
	.easing(TWEEN.Easing.Exponential.InOut)
	.onUpdate(function (){
		camera.position.x = this.x;
		camera.position.y = this.y;
		camera.position.z = this.z;

		camera.lookAt(heylookatme)
		camera.updateMatrix();
	})
	.start();
}

function cube_ensure(){
	acceleration();

	$cubic.on({
		mousedown:function ( event ) {
			event.preventDefault();
			isMouseDown = true;
			onMouseDownTheta = theta;
			onMouseDownPhi = phi;
			onMouseDownPosition.x = event.clientX;
			onMouseDownPosition.y = event.clientY;
		},
		mousemove:function ( event ) {
			event.preventDefault();
			if (isMouseDown && !previewed) {
				theta = - ( ( event.clientX - onMouseDownPosition.x ) * 0.5 ) + onMouseDownTheta;
				phi = ( ( event.clientY - onMouseDownPosition.y ) * 0.5 ) + onMouseDownPhi;
				phi = Math.min( 180, Math.max( 0, phi ) );
				camera.position.x = radious * Math.sin( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
				camera.position.y = radious * Math.sin( phi * Math.PI / 360 );
				camera.position.z = radious * Math.cos( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
				camera.lookAt(heylookatme)
				camera.updateMatrix();
				if (camera.position.x < heylookatme.x) for (var i = 0; i < namelist.length; i++) scene.children[namelist[i]].rotation.y = Math.PI*1.5;
				else for (var i = 0; i < namelist.length; i++) scene.children[namelist[i]].rotation.y = Math.PI/2;
			}
		},
		mouseup:function ( event ) {
			event.preventDefault();
			isMouseDown = false;
			onMouseDownPosition.x = event.clientX - onMouseDownPosition.x;
			onMouseDownPosition.y = event.clientY - onMouseDownPosition.y;
			console.log('background!')

			console.log(camera.position.x+' /// '+camera.position.y+' /// '+camera.position.z)
			console.log(heylookatme.x+' /// '+heylookatme.y+' /// '+heylookatme.z)
			console.log(theta+' /// '+phi+' /// '+theta)
			if (previewed){
				console.log('44444444')

				clearInterval(clicker)
				$('.ssi').css('display','none')
				$front.removeClass('shapeshifting');

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
			}
		}
	});

	$('.cube').on(action, function(){
		console.log('cube!');

		if (!previewed){
			tcallme = $(this).data('callmemaybe');
			trow = $(this).data('row');
			tref = $(this).nextAll('.name').first().find('p').text();
			tnumber = $(this).data('array');
			tcube = $(this).data('cube');
			twhich = $(this).data('number');
		}

		console.log(tcallme+' // '+trow+' // '+tref+' // '+tnumber+' // '+tcube+' // '+twhich)

		if (!previewed && !separated){
			console.log('111111111');
			$(this).siblings().each(function(e){
				var $that = $(this);
				var $dcube = $that.data('array');
				var $drow = $that.data('row');
				if (!$that.hasClass('r'+trow)){
					// console.log($dcube+' /// '+tnumber+' /// '+$dcube+' /// '+$drow)
					if ($dcube < tnumber) slide.likethis($dcube, 'left', $drow);
					else slide.likethis($dcube, 'right', $drow);
				}else slide.likethis($dcube, 'center', $drow);
			});
			slide.likethis(tnumber, 'center', trow);

			var tween = new TWEEN.Tween({ g: heylookatme.x })
			.to({ g: scene.children[tnumber].position.x }, 500)
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
			console.log('222222222')
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
				sentFromClick = true;
				shapeshift(tcallme, tref, trow, twhich)
			},1000)

		}else if (!previewed && separated){
			console.log('333333333')
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

	$('.name').on('click', function(){
		$(this).prev().click();
	});
}

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

slide = new slider();

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

function cubegenerator(receive){
	var centered = new THREE.Vector3((Math.floor(_.size(receive))/2)*50, 50, 100)
	heylookatme = centered;
	camera.lookAt(heylookatme)

	var rowcount = 1, numberexact = 0;
	for (var row in receive){
		var cube = receive[row];
		for (var i in cube){
			var element = document.createElement( 'div' );
			element.className = 'row cube r'+rowcount.toString();
			element.id = 'c'+counter.toString();
			element.setAttribute('data-callmemaybe', i)
			element.setAttribute('data-number', numberexact.toString())
			element.setAttribute('data-array', counter.toString())
			element.setAttribute('data-cube', cubecounter.toString())
			element.setAttribute('data-row', rowcount.toString())
			counter++;	
			cubecounter++;
			numberexact++;

			var front = document.createElement('div');
			front.className = 'cubefront';
			element.appendChild(front);

			var back = document.createElement('div');
			back.className = 'cubeback';
			element.appendChild(back);

			var right = document.createElement('div');
			right.className = 'cuberight';
			element.appendChild(right);

			var left = document.createElement('div');
			left.className = 'cubeleft';
			element.appendChild(left);

			var top = document.createElement('div');
			top.className = 'cubetop';
			element.appendChild(top);

			var bottom = document.createElement('div');
			bottom.className = 'cubebottom';
			element.appendChild(bottom);

			var object = new THREE.CSS3DObject( element );
			object.position.x = (rowcount-1)*50;
			object.position.y = cube[i].y*50;
			object.position.z = cube[i].z*50;
			scene.add( object );

			origheight[counter-2] = cube[i].y*50;

			if ((rowcount >= _.size(receive)) && (numberexact >= _.size(cube)))setTimeout(cube_ensure, 100)
		}

		var name = document.createElement( 'div' );
		name.className = 'row name r'+rowcount.toString();

		var nametxt = document.createElement( 'p' );
		nametxt.innerHTML = row;
		name.appendChild(nametxt)
		name.setAttribute('data-array',counter.toString())
		name.setAttribute('data-row', rowcount.toString())
		namelist.push(counter)

		origheight[counter-1] = 0;

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

	setTimeout(function(){ $name = $('.name'); },50)
}

function animate() {
	if (!backendexists){
		render();
		requestAnimationFrame( animate );
		TWEEN.update();
		if (presentlyloading) loadingplshold();
	}
}

function render() { renderer.render( scene, camera ); }


