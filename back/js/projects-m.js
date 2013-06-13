/*
 Color animation 20120928
 http://www.bitstorm.org/jquery/color-animation/
 Copyright 2011, 2012 Edwin Martin <edwin@bitstorm.org>
 Released under the MIT and GPL licenses.
*/
(function(d){function m(){var b=d("script:first"),a=b.css("color"),c=false;if(/^rgba/.test(a))c=true;else try{c=a!=b.css("color","rgba(0, 0, 0, 0.5)").css("color");b.css("color",a)}catch(e){}return c}function j(b,a,c){var e="rgb"+(d.support.rgba?"a":"")+"("+parseInt(b[0]+c*(a[0]-b[0]),10)+","+parseInt(b[1]+c*(a[1]-b[1]),10)+","+parseInt(b[2]+c*(a[2]-b[2]),10);if(d.support.rgba)e+=","+(b&&a?parseFloat(b[3]+c*(a[3]-b[3])):1);e+=")";return e}function g(b){var a,c;if(a=/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(b))c=
[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16),1];else if(a=/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(b))c=[parseInt(a[1],16)*17,parseInt(a[2],16)*17,parseInt(a[3],16)*17,1];else if(a=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b))c=[parseInt(a[1]),parseInt(a[2]),parseInt(a[3]),1];else if(a=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(b))c=[parseInt(a[1],10),parseInt(a[2],10),parseInt(a[3],10),parseFloat(a[4])];return c}
d.extend(true,d,{support:{rgba:m()}});var k=["color","backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","outlineColor"];d.each(k,function(b,a){d.Tween.propHooks[a]={get:function(c){return d(c.elem).css(a)},set:function(c){var e=c.elem.style,i=g(d(c.elem).css(a)),h=g(c.end);c.run=function(f){e[a]=j(i,h,f)}}}});d.Tween.propHooks.borderColor={set:function(b){var a=b.elem.style,c=[],e=k.slice(2,6);d.each(e,function(h,f){c[f]=g(d(b.elem).css(f))});var i=g(b.end);
b.run=function(h){d.each(e,function(f,l){a[l]=j(c[l],i,h)})}}}})(jQuery);


/* **********************************************
     Begin projects.js
********************************************** */

Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

var editor_isMouseDown = false, editor_radious = 1600, editor_theta = -90, editor_onMouseDownTheta = -90, editor_phi = 60, editor_onMouseDownPhi = 60, editor_onMouseDownPosition,
editor_separated = false, editor_trow, editor_strow, editor_tref, editor_tnumber, editor_tcube, editor_tcallme, currentlyediting, cubearrayediting, newest = false,
catinit, catoffset, categoryheight = 0, catopen = false, firstly = true, oneup = false, workingwithanewcube = false, editingcount = 0, editor_rowcount = 1,
addrow_height, addrow_open = false, makingnewrow = false;
var rowarray = []
var editor_counter = 1, editor_cubecounter = 1;
var $ovr_sight;
var editor_slide = new editor_slider();
var categ = [];
var thesecateg = [];
var presence = {};
// var presenceorig = {};
// var presenceedit = {};
var namelist = [];
var changed = {};
var $windowpane = $(window);
var wpheight, wpwidth;
var hoppersize;
var press, sweettime = false, holding = 500, downtimer, uptimer;
var $addproj = $('#add_project')
var $be_move = $('#be_move')
var lookingat = 'projects';


$(document).ready(function(){
// $(document).ajaxComplete(function(){
// (function($){
	// if (!backendexists){
		setTimeout(function(){
			backendexists = true;
			console.log('yeah!');


			// wpheight = $windowpane.height();
			// wpwidth = $windowpane.width();

			hoppersize = Math.floor((((wpwidth*.85)*.3333333)/2)-17);
			
			$ovr_sight = $('#oversight_sight')

			console.log($ovr_sight.width()+' /// '+$ovr_sight.height())

			editorinit();
			editor_animate();

			$('#cell_put').css('height',$windowpane.height()-54)
			$('#shapeshifterhopper').css('height', $windowpane.height()-$('.info').outerHeight()-$('.coords').outerHeight()-36)
			$('#info_category').css('left', function(){
				return $(this).parent().prev().find('input').position().left;
			})

			// $('#switch_03').css('margin-top', (wpheight-447))

			// b_workload(23)
			// b_workload(22)

			// var timer = 1000

			// setTimeout(function(){$('#c20').click()},timer*1)
			// setTimeout(function(){$('#c20').click()},timer*2)
			// setTimeout(function(){$('#c19').click()},timer*3)


			// setTimeout(function(){
				// editor_separated = true;
			// 	$('#cell_add').click()
			// },200)
		},700)
	// }
	
})

function editorinit() {
	
	editor_scene = new THREE.Scene();

	// projector
	editor_projector = new THREE.Projector();

	// grid
	editor_plane = new THREE.Mesh( new THREE.PlaneGeometry( 1000, 1000, 20, 20 ), new THREE.MeshBasicMaterial( { transparent: true, wireframe:true, color:0x000000, opacity: .5} ) );
	editor_plane.rotation.x = - Math.PI / 2;
	editor_scene.add( editor_plane );

	//editor_renderer
	editor_renderer = new THREE.CSS3DRenderer();
	editor_renderer.setSize( $ovr_sight.width(), $ovr_sight.height() );
	editor_renderer.domElement.style.position = 'absolute';
	editor_renderer.domElement.style.top = 0;
	$ovr_sight.append( editor_renderer.domElement );

	//listeners
	$ovr_sight.mousemove(editor_onDocumentMouseMove);
	$ovr_sight.mousedown(editor_onDocumentMouseDown);
	$ovr_sight.mouseup(editor_onDocumentMouseUp);
	// window.addEventListener( 'resize', onWindowResize, false );

	//init.init
	editor_heylookatme = editor_scene.position;

	editor_camera = new THREE.PerspectiveCamera( 50, $ovr_sight.width() / $ovr_sight.height(), 1, 10000 ); 
	editor_camera.position.x = editor_radious * Math.sin( editor_theta * Math.PI / 360 ) * Math.cos( editor_phi * Math.PI / 360 );
	editor_camera.position.y = editor_radious * Math.sin( editor_phi * Math.PI / 360 );
	editor_camera.position.z = editor_radious * Math.cos( editor_theta * Math.PI / 360 ) * Math.cos( editor_phi * Math.PI / 360 );
	editor_camera.lookAt(editor_heylookatme)

	editor_onMouseDownPosition = new THREE.Vector2();

	cubedescender();
}

$('#switch_01').on('click', function(){
	$be_move.addClass('lookingatprojects').removeClass('lookinatmeimsuchadick')
	lookingat = 'projects';
})
$('#switch_02').on('click', function(){
	$be_move.addClass('lookinatmeimsuchadick').removeClass('lookingatprojects')
	lookingat = 'me';
})

function editor_onDocumentMouseDown( event ) {
	event.preventDefault();
	editor_isMouseDown = true;
	editor_onMouseDownTheta = editor_theta;
	editor_onMouseDownPhi = editor_phi;
	editor_onMouseDownPosition.x = event.clientX;
	editor_onMouseDownPosition.y = event.clientY;
}

function editor_onDocumentMouseMove( event ) {
	event.preventDefault();
	if ( editor_isMouseDown) {
		editor_theta = - ( ( event.clientX - editor_onMouseDownPosition.x ) * 0.5 ) + editor_onMouseDownTheta;
		editor_phi = ( ( event.clientY - editor_onMouseDownPosition.y ) * 0.5 ) + editor_onMouseDownPhi;
		editor_phi = Math.min( 180, Math.max( 0, editor_phi ) );
		editor_camera.position.x = editor_radious * Math.sin( editor_theta * Math.PI / 360 ) * Math.cos( editor_phi * Math.PI / 360 );
		editor_camera.position.y = editor_radious * Math.sin( editor_phi * Math.PI / 360 );
		editor_camera.position.z = editor_radious * Math.cos( editor_theta * Math.PI / 360 ) * Math.cos( editor_phi * Math.PI / 360 );
		editor_camera.lookAt(editor_heylookatme)
		editor_camera.updateMatrix();
		// if (editor_camera.position.x < editor_heylookatme.x) for (var i in namelist) editor_scene.children[namelist[i]].rotation.y = Math.PI*1.5;
		// else for (var i in namelist) editor_scene.children[namelist[i]].rotation.y = Math.PI/2;
	}
}

function editor_onDocumentMouseUp( event ) {
	event.preventDefault();
	editor_isMouseDown = false;
	editor_onMouseDownPosition.x = event.clientX - editor_onMouseDownPosition.x;
	editor_onMouseDownPosition.y = event.clientY - editor_onMouseDownPosition.y;
}

function editor_cube_ensure(activation){
	$('.editor_cube').on('click', function(){		

		editor_tcallme = $(this).data('callmemaybe')
		editor_trow = $(this).data('row');
		editor_tref = $(this).nextAll('.name').first().find('p').text();
		editor_tnumber = $(this).data('array');
		editor_tcube = $(this).data('cube');
		twhich = $(this).data('number');

		console.log(editor_trow+' // '+editor_tref+' // '+editor_tnumber+' // '+editor_tcube+' // '+twhich)

		if ((!editor_separated) || (editor_trow != editor_strow)) selectorgeneral(editor_tcallme)

		$('#shapeshifterhopper, #cell_put').empty()

		$(this).addClass('targeted').siblings().removeClass('targeted')
		editor_separated = true;
		workingwithanewcube = false;

		if (!oneup) b_workload(editor_tcallme)
		else projectuploader(false, editor_tcallme)

		cubearrayediting = editor_tnumber;

		setTimeout(function(){
			editor_separated = true;
			editor_camera.updateMatrix();
		},500);

		editor_strow = editor_trow;
		seditor_tnumber = editor_tnumber;
	});

	$ovr_sight.on('click',function(){
		if (addrow_open){
			addrow_open = false;
			makingnewrow = false;

			var $rowlist = $('#row_list')
			
			$rowlist.attr('style','').addClass('addrow_closed')
			.siblings().removeClass('addrow_nothx')
			$rowlist.find('.rowafter').addClass('rowselectable')
			.children().remove()
		}
	});

	if(activation){ //activation = callmemaybe kthx
		selectorgeneral(activation)
		cubearrayediting = $('.editor_cube[data-callmemaybe="'+activation+'"]').addClass('targeted').data('array')
	}	
}

function selectorgeneral(orders){
	console.log(editor_tnumber)
	var $activator = $('.editor_cube[data-callmemaybe="'+orders+'"]')
	var $act_row = $activator.data('row')
	editor_tnumber = $activator.data('array')
	$activator.siblings().not('.newcube').each(function(e){
		var $that = $(this)
		var $editor_dcube = $that.data('array')
		var $editor_drow = $that.data('row')
		if (!$that.hasClass('r'+$act_row)){
			if ($editor_drow < $act_row) editor_slide.editor_likethis($editor_dcube, 'left', $editor_drow)
			else editor_slide.editor_likethis($editor_dcube, 'right', $editor_drow)
		}else editor_slide.editor_likethis($editor_dcube, 'center', $editor_drow)
	});
	editor_slide.editor_likethis($activator.data('array'), 'center', $act_row)

	var generaleditor_camera = new TWEEN.Tween({ g: editor_heylookatme.x })
	.to({ g: editor_scene.children[editor_tnumber].position.x }, 500)
	.easing(TWEEN.Easing.Exponential.InOut)
	.onUpdate(function () {
		editor_heylookatme.x = this.g
		editor_camera.lookAt(editor_heylookatme)
	})
	.start();
}

function cubedescender(activate){
	$.ajax({
		type: "POST",
		dataType:'JSON',
		url: "../back/php/cubepull.php",
	}).done( function(cube){
		editor_cubedescend = cube.cubes;
		categ = cube.tot_cat;
		thesecateg = cube.rep_cat;

		if (!activate) editor_cubegenerator(editor_cubedescend)
		else editor_cubegenerator(editor_cubedescend, activate)
	})
}

function editor_cubegenerator(receive, active){
	var centered = new THREE.Vector3((Math.floor(_.size(receive))/2)*50, 50, 100)
	editor_heylookatme = centered;
	editor_camera.lookAt(editor_heylookatme)
	console.log(receive)

	var numberexact = 0;
	for (var row in receive){
		var cube = receive[row];
		for (var i in cube){
			var element = document.createElement( 'div' );
			element.className = 'editor_cube r'+editor_rowcount.toString();
			element.id = 'c'+editor_counter.toString();
			element.setAttribute('data-callmemaybe', i)
			element.setAttribute('data-number', numberexact.toString())
			element.setAttribute('data-array', editor_counter.toString())
			element.setAttribute('data-cube', editor_cubecounter.toString())
			element.setAttribute('data-row', editor_rowcount.toString())
			editor_counter++;	
			editor_cubecounter++;
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
			object.position.x = (editor_rowcount-1)*50;
			object.position.y = cube[i].y*50;
			object.position.z = cube[i].z*50;
			editor_scene.add( object );

			if ((editor_rowcount >= _.size(receive)) && (numberexact >= _.size(cube))) setTimeout(function(){editor_cube_ensure(active)}, 100)
		}

		var name = document.createElement( 'div' );
		name.className = 'name r'+editor_rowcount.toString();
		// name.innerHTML = row;

		var nametxt = document.createElement( 'p' );
		// name.className = 'name r'+editor_rowcount.toString();
		nametxt.innerHTML = row;
		name.appendChild(nametxt)
		name.setAttribute('data-array',editor_counter.toString())
		name.setAttribute('data-row', editor_rowcount.toString())
		// namelist.push(counter)

		// origheight[counter-1] = 0;

		editor_counter++;
		numberexact = 0;

		var text = new THREE.CSS3DObject( name );
		text.position.x = (editor_rowcount-1)*50;
		text.position.y = 0;
		text.position.z = 200;
		text.rotation.y = Math.PI*1.5;
		editor_scene.add( text );

		editor_rowcount++;
	}

	setTimeout(function(){
		$name = $('.name');
	},50)
}

function editor_slider(){
	function editor_likethis(number, direction, row){
		var jump = 500;
		var stay = editor_scene.children[number].position.x;
		var going;
		if (direction == 'left') going = (row*50)-50;
		else if (direction == 'right') going = (row*50)+50;
		else if (direction == 'center') going = row*50;

		var tween = new TWEEN.Tween({
			g: editor_scene.children[number].position.x
		})
		.to({ g: going }, jump)
		.easing(TWEEN.Easing.Exponential.InOut)
		.onUpdate(function () {
			editor_scene.children[number].position.x = this.g
		})
		.start();
		setTimeout(function(){
			editor_camera.updateMatrix();
		},jump);
	}
	this.editor_likethis = editor_likethis;
}

function b_workload(er){
	// if (_.size(presenceorig) > 0) presenceedit[currentlyediting] = presence

	currentlyediting = er;

	$.ajax({
		type: "POST",
		dataType:'JSON',
		data: {projector:er},
		url: "../back/php/projection.php"
	}).done(function(thisproj){
		console.log(thisproj)
		// presenceorig[thisproj.data.object_id] = thisproj;

		presence[thisproj.data.object_id] = thisproj;

		catinit = thisproj.data.category;

		$('#info_name').val(thisproj.data.name)
		$('#info_client').val(thisproj.data.client)

		$('#info_datelaunch').val(thisproj.data.date_launched)
		$('#info_hours').val(thisproj.data.total_hours)
		$('#info_link').val(thisproj.data.project_text)
		$('#info_text').val(thisproj.data.link)
		$('#coord_y').val(thisproj.data.coord_y)
		$('#coord_z').val(thisproj.data.coord_z)

		if (!oneup) categori(false);
		else{
			catoffset = $('.cat_'+thisproj.data.category).position().top
			$('#info_category_carousel').css('top', -catoffset)
		}

		$.each(thisproj.shapeshifters, function(s){
			var shapeshifted = '<div style="width:'+hoppersize+'px; height:'+hoppersize+'px;" ><img src="../back/img/kill.png" class="shap_kill" /><img src="'+thisproj.shapeshifters[s].img+'" data-shapnum="'+thisproj.shapeshifters[s].shapeshifter_id+'" style="width:'+hoppersize+'px;" />'
			$.tmpl( shapeshifted , thisproj.shapeshifters[s]).appendTo( "#shapeshifterhopper" );
		});

		shapeshifterpower();

		$.each(thisproj.cells, function(l){
			var cellular = '<div class="cell_'+thisproj.cells[l].cell_id+'"><div class="cell_img_hold"><img src="'+thisproj.cells[l].img+'" /><img src="../back/img/kill.png" class="cell_kill" /></div><textarea tabindex="16" class="kommentar_content">'+thisproj.cells[l].txt+'</textarea></div>'
			$.tmpl( cellular , thisproj.cells[l]).appendTo( "#cell_put" );
		});

		$('.shap_kill').on('click', function(){
			kill('shapeshifter', $(this).siblings().data('shapnum'), true)
			$(this).parent().slideUp().remove();
		})

		$('.cell_kill').on('click', function(){
			kill('cell', $(this).parent().parent().attr('class').split('_')[1], true)
			$(this).parent().parent().slideUp().remove();
		})

		oneup = true;
	})
}

function editor_animate() {
	if (backendexists){
		editor_render();
		TWEEN.update();
		requestAnimationFrame( editor_animate );
	}
}

function editor_render(){
	editor_renderer.render( editor_scene, editor_camera );
}

$('#cell_add').on('click', function(){

	$.ajax({
		type: "POST",
		url: "../back/php/newcell.php"
	}).done(function(e){

		if ((editor_separated) && (!newest)){
			newest = true;
			$('<div class="cell_'+e.number+'"><div class="cell_img_hold"><img src="../back/img/cross.png" id="img_blank" /><img src="../back/img/kill.png" class="cell_kill" /></div><textarea tabindex="16" class="kommentar_content"></textarea></div>')
			.appendTo('#cell_put')
			.filedrop({
				fallback_id: 'cell_new',
				paramname:'pic',
				
				maxfiles: 1,
				url: '../back/php/cell.php',
				data:{
					projeceditor_tnumbercell: currentlyediting,
					cellnumbercell: e.number
				},
				
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

		$('.cell_kill').on('click', function(){
			kill('cell', $(this).parent().parent().attr('class').split('_')[1], true)
			$(this).parent().parent().slideUp().remove();
		})

	})
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
		
		url: '../back/php/shapeshiftput.php',
		data:{ projeceditor_tnumbershapeshift: currentlyediting },
		
		uploadFinished:function(i,file,response){

			$.data(file).removeClass('loading'); 

			$('.shap_kill').css('z-index','1000').on('click', function(){
				kill('shapeshifter', response.number, true)
				$(this).parent().slideUp().remove();
			})

			$('#shapeshifterhopper').find('div').last().find('img').attr('data-shapnum', response.number)
		},
		
		error: function(err, file) { alert("it didn't work. here's why, maybe: "+err) },
		
		beforeEach: function(file){
			if(!file.type.match(/^image\/jpeg/)){
				alert('jpegs only kthx');
				return false;
			}
			if ($('#shapeshifterhopper').find('div').size() >= 10){
				alert('whoa! too many, hombre');
				return false;
			}
		},
		
		uploadStarted:function(i, file, len){
			var preview = $('<div style="width:'+hoppersize+'px; height:'+hoppersize+'px;"><img /></div>'), 
			image = $('img', preview);
			var reader = new FileReader();
			
			image.width = hoppersize;
			image.height = hoppersize;
			
			reader.onload = function(e){ image.attr('src',e.target.result); };
			reader.readAsDataURL(file);
			preview.appendTo('#shapeshifterhopper');
			preview.append('<img src="../back/img/kill.png" class="shap_kill" />')
			$.data(file,preview);			
		},
			
		progressUpdated: function(i, file, progress) {
			$.data(file).find('img').css('opacity',progress/100);
		}	 
	});
}

function categori(again){
	$('#info_category_carousel').empty()
	$.each(categ, function(l, m){
		categoryheight += 18;
		var catego = '<li class="cat_'+m+'" data-category="'+m+'">'+m+'</li>';
		$.tmpl( catego , m).appendTo( "#info_category_carousel" );

		var catego = '<li class="row row_'+m+'">'+m+'</li><li class="rowafter rowselectable" data-after="'+m+'"></li>';
		$.tmpl( catego , m).appendTo( "#row_list" );

		if (l == categ.length-1){
			addrow_height = $('#row_list').outerHeight()
			$('#row_list').addClass('addrow_closed')
			catoffset = $('.cat_'+presence[currentlyediting].data.category).position().top-1
			$('#info_category_carousel').css('top', -catoffset)
			setTimeout(function(){$('#info_category_carousel').addClass('ready')},500)
			if (!again) categorical()
		}
	});
}

function categorical(freshness){
	$('#info_category_open').on('click', function(){
		$info_cat = $('#info_category')
		$info_car = $info_cat.find('#info_category_carousel')

		if (!catopen){
			catopen = true;
			$info_cat.addClass('open').stop().css({'height':categoryheight});
			$info_car.stop().css({'top':'0px'});
		}else{
			catopen = false;
			$info_cat.stop().css({'height':18})
			setTimeout(function(){$info_cat.removeClass('open')},500)
			$info_car.stop().css({'top':-catoffset});
		}
	});

	$('#info_category_carousel').on('click', 'li', function(){
		var newcateg = $(this).data('category')
		var newindex = categ.indexOf(newcateg)

		console.log(newcateg+' // '+newindex+' // '+categ.indexOf(presence[currentlyediting].data.category))

		if (newcateg != presence[currentlyediting].data.category){			

			presence[currentlyediting].data.category = newcateg;
			
			catopen = false;
			catoffset = $('.cat_'+newcateg).position().top;
			$('#info_category').css({'height':18})
			setTimeout(function(){$('#info_category').removeClass('open')},500)
			$('#info_category_carousel').css({'top':-catoffset});

			if (!workingwithanewcube){
				projectuploader(true, currentlyediting)
			}else{
				cubeset('x', newindex+1)
				var reacharound = $('.editor_cube[data-row="'+(newindex+1)+'"]').first().data('callmemaybe')
				selectorgeneral(reacharound)
			}
				
		}
	});

	$('#add_row').on('click', function(){
		if (!addrow_open){
			$(this).children('#row_list').removeClass('addrow_closed')
			.css({'top':-(addrow_height-13), 'height':addrow_height})
			.siblings().addClass('addrow_nothx')
			addrow_open = true;
		}		
	});

	$('.rowafter').on('click', function(){
		if (!makingnewrow){
			makingnewrow = true;
			$(this).addClass('thisrowthx').removeClass('rowselectable')
			.append('<input type="text" id="newrow">').find('input').focus()
			.parent().siblings().removeClass('rowselectable').find('input').remove();

			$(this).parent().css({'top':-(addrow_height-((categ.length-1)*10)-13), 'height':addrow_height-((categ.length-1)*10)});

			$('#newrow').on({
				keydown:function(e){
					if (e.keyCode == 13){
						var $that = $(this)
						var newcategindex = categ.indexOf($that.parent().data('after'))+1
						categ.splice(newcategindex, 0, $that.val())
						
						$.ajax({
							type: "POST",
							dataType:'JSON',
							data: { newcategarray : categ },
							url: "../back/php/newrow.php"
						}).done(function(e){
							addrow_open = false;
							makingnewrow = false;

							var $rowlist = $('#row_list')
							
							$rowlist.attr('style','').addClass('addrow_closed')
							.siblings().removeClass('addrow_nothx')

							$rowlist.find('.rowafter').addClass('rowselectable')
							.children().remove()

							categori();
						})						
					}
				}
			});
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
	if (dimension == 'x') editor_scene.children[cubearrayediting].position.x = where*50;
	if (dimension == 'y') editor_scene.children[cubearrayediting].position.y = where*50;
	if (dimension == 'z') editor_scene.children[cubearrayediting].position.z = where*50;
}

$('#save').on('click', function(){
	if (lookingat === 'projects') projectuploader(true, currentlyediting);
	else meuploader();
})

function projectuploader(remain, weight){
	presence[currentlyediting].data.name = $('#info_name').val()
	presence[currentlyediting].data.client = $('#info_client').val()
	presence[currentlyediting].data.date_launched = $('#info_datelaunch').val()
	presence[currentlyediting].data.total_hours = $('#info_hours').val()
	presence[currentlyediting].data.link = $('#info_link').val()
	presence[currentlyediting].data.project_text = $('#info_text').val()


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

	$('#shapeshifterhopper').find('img').not('.shap_kill').each(function(e){
		shapeshnr.push($(this).data('shapnum'))
	});

	console.log(shapeshnr)

	$.ajax({
		type: "POST",
		data: {
			number:currentlyediting,
			data:presence[currentlyediting].data,
			shapeshifters:shapeshnr,
			celltext:cellcomplet,
			isnew:workingwithanewcube
		},
		url: "../back/php/heavylifting.php"
	}).done(function(e){		
		if ((catinit !== presence[currentlyediting].data.category) || (workingwithanewcube)){
			$ovr_sight.children().children().empty();
			for (var i = 0; i <= editor_counter; i++){
				editor_scene.remove(editor_scene.children[0]);
				if (i == editor_counter){
					editor_counter = 0;
					editor_cubecounter = 0;
					editor_rowcount = 1;
					cubedescender(weight)
					catinit = presence[currentlyediting].data.category
				}
			}
		}
		if (!remain) b_workload(weight)

		if (workingwithanewcube) workingwithanewcube = false;
	});
}


function kill(who, where, how){
	$.ajax({
		type: "POST",
		dataType:'JSON',
		data: {
			target : who,
			field : where,
			project : currentlyediting
		},
		url: "../back/php/kill.php"
	})
}

$addproj.on({
	mousedown: function(){
		downtimer = new Date().getTime();
		press = setTimeout(function(){
			$addproj.animate({backgroundColor:'rgb(255,0,0)'})
			.find('#add_project_plus').addClass('minus')
		}, holding)
	}, 
	mouseup: function(){
		uptimer = new Date().getTime();
		clearTimeout(press)
		
		if ((uptimer - downtimer) < holding) newcube();
		else{
			$addproj.animate({backgroundColor:'rgb(255,255,255)'},200)
			$addproj.animate({backgroundColor:'rgb(255,0,0)'},200)
			$addproj.animate({backgroundColor:'rgb(255,255,255)'},200)
			$addproj.animate({backgroundColor:'rgb(255,0,0)'},200)
			killcube();
		}
	},
	mouseout:function(){
		$addproj.animate({backgroundColor:'rgb(128,128,128)'})
		.find('#add_project_plus').removeClass('minus')
	}
})

function killcube(){
	$.ajax({
		type: "POST",
		dataType:'JSON',
		data: {
			target : currentlyediting
		},
		url: "../back/php/killcube.php"
	}).done(function(e){
		editor_scene.remove(editor_scene.children[cubearrayediting]);
		$('.targeted').find('div').remove()
		$('.targeted').remove()
		$('#shapeshifterhopper, #cell_put').empty()
		$('.info').find('input, textarea').val('')
		$('#info_category_carousel').css('top', '19px')
		presence = {};
	})
}
	

function newcube(){
	$.ajax({
		type: "POST",
		url: "../back/php/newcube.php"
	}).done(function(e){
		// console.log(e)

		$('#shapeshifterhopper, #cell_put').empty()

		var $targetedindex = $('.targeted').data('array')
		var $targetedrow = $('.targeted').data('row')
		slide.editor_likethis($targetedindex, 'left', $targetedrow)
		$('.targeted').siblings().each(function(){
			var $theindex = $(this).data('array')
			var $therow = $(this).data('row')
			if($therow == $targetedrow) editor_slide.editor_likethis($theindex, 'left', $therow)
			if($therow >= $targetedrow) editor_slide.editor_likethis($theindex, 'left', $therow)
		})

		editor_separated = false;
		workingwithanewcube = true;


		var element = document.createElement( 'div' );
		element.className = 'cube newcube';
		element.id = 'c'+counter.toString();
		// element.setAttribute('data-callmemaybe', i)
		// element.setAttribute('data-number', numberexact.toString())
		element.setAttribute('data-array', editor_counter.toString())
		element.setAttribute('data-cube', editor_cubecounter.toString())
		// element.setAttribute('data-row', editor_rowcount.toString())
		counter++;	
		editor_cubecounter++;
		// numberexact++

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

		object.position.x = (categ.length)*50;
		object.position.y = 300;
		object.position.z = 50;
		editor_scene.add( object );

		currentlyediting = e.number;

		cubearrayediting = editor_scene.children.length-1;

		$('.info').find('input, textarea').val('')

		$('#info_category_carousel').css('top', '19px')

		$('#coord_y').val(6)
		$('#coord_z').val(1)

		presence = {};
		presence[currentlyediting] = {cells:{}, data:{category: "", client: "", coord_y: 300, coord_z: 50, date_launched: "", link: "", name: "", object_id: "", project_text: "", total_hours: ""}, shapeshifters:{}};

		shapeshifterpower()

		setTimeout(function(){$('.newcube').addClass('targeted').siblings().removeClass('targeted');},50)
	})
}










