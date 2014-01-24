

// $windowpane.on({
// 	touchstart:function ( event ) { event.preventDefault() },

// 	touchmove:function ( event ) { event.preventDefault() },

// 	touchend:function ( event ) { event.preventDefault() }

// })

function mobileensure(){

	console.log('MOBILE')

	$cubic.on({
		touchstart:function ( event ) {
			event.preventDefault();
			isMouseDown = true;
			onMouseDownTheta = theta;
			onMouseDownPhi = phi;
			onMouseDownPosition.x = event.originalEvent.pageX;
			onMouseDownPosition.y = event.originalEvent.pageY;
		},
		touchmove:function ( event ) {
			event.preventDefault();
			if (isMouseDown && !previewed) {
				theta = - ( ( event.originalEvent.pageX - onMouseDownPosition.x ) * 0.5 ) + onMouseDownTheta;
				phi = ( ( event.originalEvent.pageY - onMouseDownPosition.y ) * 0.5 ) + onMouseDownPhi;
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
		touchend:function ( event ) {
			event.preventDefault();
			console.log(theta+' /// '+phi)
			isMouseDown = false;
			onMouseDownPosition.x = event.originalEvent.pageX - onMouseDownPosition.x;
			onMouseDownPosition.y = event.originalEvent.pageY - onMouseDownPosition.y;
			console.log('background!')
			if (previewed){
				$('#shapeshifter').fadeOut(100, function(){
					console.log('44444444')

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
		}
	});

}

// window.addEventListener("touchstart", touchStart, false);
// window.addEventListener("touchmove", touchMove, false);
// window.addEventListener("touchend", touchEnd, false);

// function touchStart (event){
// 	event.preventDefault();
// 	isMouseDown = true;
// 	onMouseDownTheta = theta;
// 	onMouseDownPhi = phi;
// 	onMouseDownPosition.x = event.pageX;
// 	onMouseDownPosition.y = event.pageY;
// }

// function touchMove (event){
// 	event.preventDefault();
// 	if (isMouseDown && !previewed) {
// 		theta = - ( ( event.pageX - onMouseDownPosition.x ) * 0.5 ) + onMouseDownTheta;
// 		phi = ( ( event.pageY - onMouseDownPosition.y ) * 0.5 ) + onMouseDownPhi;
// 		phi = Math.min( 180, Math.max( 0, phi ) );
// 		camera.position.x = radious * Math.sin( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
// 		camera.position.y = radious * Math.sin( phi * Math.PI / 360 );
// 		camera.position.z = radious * Math.cos( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
// 		camera.lookAt(heylookatme)
// 		camera.updateMatrix();
// 		if (camera.position.x < heylookatme.x) for (var i = 0; i < namelist.length; i++) scene.children[namelist[i]].rotation.y = Math.PI*1.5;
// 		else for (var i = 0; i < namelist.length; i++) scene.children[namelist[i]].rotation.y = Math.PI/2;

// 		console.log('DURING '+onMouseDownPosition.x)
// 	}
// }

// function touchEnd (event){
// 	event.preventDefault();
// 	console.log(event)
// 	isMouseDown = false;
// 	onMouseDownPosition.x = event.pageX - onMouseDownPosition.x;
// 	onMouseDownPosition.y = event.pageY - onMouseDownPosition.y;
// 	console.log('AFTER '+onMouseDownPosition.x)
// 	console.log('background!')
// 	if (previewed){
// 		$('#shapeshifter').fadeOut(100, function(){
// 			console.log('44444444')

// 			clearInterval(clicker)
// 			$('.ssi').css('display','none')

// 			var tween = new TWEEN.Tween({ 
// 				center_x: heylookatme.x, center_y: heylookatme.y, center_z: heylookatme.z,
// 				x: camera.position.x, y: camera.position.y, z: camera.position.z 
// 			})
// 			.to({ 
// 				center_x: previewedOrigCoordx-50, center_y: 50, center_z: 100,
// 				x: returnCoordx, y: returnCoordy, z: returnCoordz 
// 			}, 500 )
// 			.easing(TWEEN.Easing.Exponential.InOut)
// 			.onUpdate(function (){
// 				camera.position.x = this.x;
// 				camera.position.y = this.y;
// 				camera.position.z = this.z;

// 				var centering = new THREE.Vector3(this.center_x, this.center_y, this.center_z)
// 				heylookatme = centering;
// 				camera.lookAt(heylookatme)
// 			})
// 			.start();

// 			setTimeout(function(){
// 				var tween = new TWEEN.Tween({ by: scene.children[stnumber].position.y})
// 				.to({ by: previewedOrigCoordy }, 500)
// 				.easing(TWEEN.Easing.Exponential.InOut)
// 				.onUpdate(function () {
// 					scene.children[stnumber].position.y = this.by
// 				})
// 				.start();

// 				previewed = false;
// 				camera.updateMatrix();
// 			},200);
// 		})
// 	}
// }
