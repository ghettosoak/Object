(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());

//jquery v1.8.0 is included in this mess. Copyright 2012 jQuery Foundation and other contributors.
//like something you see, but can't read this unholy mess? drop me a line at (mif)[at](awe)[minus](schaffhausen)[dot](com)

$.fn.preload = function() { this.each(function(e){ $('<img/>')[0].src = this; }); }

Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

var isMouseDown = false, radious = 1600, theta = -90, onMouseDownTheta = -90, phi = 60, onMouseDownPhi = 60, onMouseDownPosition,
onMouseDownPosition, separated = false, trow, tref, tnumber, tcube, tcallme, currentlyediting, cubearrayediting, newest = false,
catinit, catoffset, categoryheight = 0, catopen = false, firstly = true, oneup = false, workingwithanewcube = false, editingcount = 0, rowcount = 1,
addrow_height, addrow_open = false, makingnewrow = false;
var rowarray = []
var counter = 1, cubecounter = 1;
var $ovr_sight;
var slide = new slider();
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


$(document).ready(function(){

	wpheight = $windowpane.height();
	wpwidth = $windowpane.width();

	hoppersize = Math.floor((((wpwidth*.85)*.3333333)/2)-17);
	
	$ovr_sight = $('#oversight_sight')

	init();
	animate();

	$('#cell_put').css('height',$windowpane.height()-60)
	$('#shapeshifterhopper').css('height', $windowpane.height()-$('.info').outerHeight()-$('.coords').outerHeight()-36)
	$('#info_category').css('left', function(){
		return $(this).parent().prev().find('input').position().left;
	})

	$('#switch_03').css('margin-top', (wpheight-447))

	// b_workload(23)
	// b_workload(22)

	var timer = 1000

	setTimeout(function(){$('#c20').click()},timer*1)
	// setTimeout(function(){$('#c20').click()},timer*2)
	// setTimeout(function(){$('#c19').click()},timer*3)


	// setTimeout(function(){
		// separated = true;
	// 	$('#cell_add').click()
	// },200)
	
})

function init() {
	
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
	$ovr_sight.append( renderer.domElement );

	//listeners
	$ovr_sight.mousemove(onDocumentMouseMove);
	$ovr_sight.mousedown(onDocumentMouseDown);
	$ovr_sight.mouseup(onDocumentMouseUp);
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

function cube_ensure(activation){
	$('.cube').on('click', function(){		

		tcallme = $(this).data('callmemaybe')
		trow = $(this).data('row');
		tref = $(this).nextAll('.name').first().find('p').text();
		tnumber = $(this).data('array');
		tcube = $(this).data('cube');
		twhich = $(this).data('number');

		console.log(trow+' // '+tref+' // '+tnumber+' // '+tcube+' // '+twhich)

		if ((!separated) || (trow != strow)) selectorgeneral(tcallme)

		$('#shapeshifterhopper, #cell_put').empty()

		$(this).addClass('targeted').siblings().removeClass('targeted')
		separated = true;
		workingwithanewcube = false;

		if (!oneup) b_workload(tcallme)
		else uploader(false, tcallme)

		cubearrayediting = tnumber;

		setTimeout(function(){
			separated = true;
			camera.updateMatrix();
		},500);

		strow = trow;
		stnumber = tnumber;
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
		cubearrayediting = $('.cube[data-callmemaybe="'+activation+'"]').addClass('targeted').data('array')
	}	
}

function selectorgeneral(orders){
	console.log(tnumber)
	var $activator = $('.cube[data-callmemaybe="'+orders+'"]')
	var $act_row = $activator.data('row')
	tnumber = $activator.data('array')
	$activator.siblings().not('.newcube').each(function(e){
		var $that = $(this)
		var $dcube = $that.data('array')
		var $drow = $that.data('row')
		if (!$that.hasClass('r'+$act_row)){
			if ($drow < $act_row) slide.likethis($dcube, 'left', $drow)
			else slide.likethis($dcube, 'right', $drow)
		}else slide.likethis($dcube, 'center', $drow)
	});
	slide.likethis($activator.data('array'), 'center', $act_row)

	var generalcamera = new TWEEN.Tween({ g: heylookatme.x })
	.to({ g: scene.children[tnumber].position.x }, 500)
	.easing(TWEEN.Easing.Exponential.InOut)
	.onUpdate(function () {
		heylookatme.x = this.g
		camera.lookAt(heylookatme)
	})
	.start();
}

function cubedescender(activate){
	$.ajax({
		type: "POST",
		dataType:'JSON',
		url: "php/cubepull.php",
	}).done( function(cube){
		cubedescend = cube.cubes;
		categ = cube.tot_cat;
		thesecateg = cube.rep_cat;

		if (!activate) cubegenerator(cubedescend)
		else cubegenerator(cubedescend, activate)
	})
}

function cubegenerator(receive, active){
	var centered = new THREE.Vector3((Math.floor(_.size(receive))/2)*50, 50, 100)
	heylookatme = centered;
	camera.lookAt(heylookatme)
	console.log(receive)

	var numberexact = 0;
	for (var row in receive){
		var cube = receive[row];
		for (var i in cube){
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
			object.position.x = (rowcount-1)*50;
			object.position.y = cube[i].y*50;
			object.position.z = cube[i].z*50;
			scene.add( object );

			if ((rowcount >= _.size(receive)) && (numberexact >= _.size(cube))) setTimeout(function(){cube_ensure(active)}, 100)
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
		// namelist.push(counter)

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
			var shapeshifted = '<div style="width:'+hoppersize+'px; height:'+hoppersize+'px;" ><img src="img/kill.png" class="shap_kill" /><img src="'+thisproj.shapeshifters[s].img+'" data-shapnum="'+thisproj.shapeshifters[s].shapeshifter_id+'" style="width:'+hoppersize+'px;" />'
			$.tmpl( shapeshifted , thisproj.shapeshifters[s]).appendTo( "#shapeshifterhopper" );
		});

		shapeshifterpower();

		$.each(thisproj.cells, function(l){
			var cellular = '<div class="cell_'+thisproj.cells[l].cell_id+'"><div class="cell_img_hold"><img src="'+thisproj.cells[l].img+'" /><img src="img/kill.png" class="cell_kill" /></div><textarea tabindex="16" class="kommentar_content">'+thisproj.cells[l].txt+'</textarea></div>'
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

function animate() {
	render();
	TWEEN.update();
	requestAnimationFrame( animate );
}

function render(){
	renderer.render( scene, camera );
}

$('#cell_add').on('click', function(){

	$.ajax({
		type: "POST",
		url: "php/newcell.php"
	}).done(function(e){

		if ((separated) && (!newest)){
			newest = true;
			$('<div class="cell_'+e.number+'"><div class="cell_img_hold"><img src="img/cross.png" id="img_blank" /><img src="img/kill.png" class="cell_kill" /></div><textarea tabindex="16" class="kommentar_content"></textarea></div>')
			.appendTo('#cell_put')
			.filedrop({
				fallback_id: 'cell_new',
				paramname:'pic',
				
				maxfiles: 1,
				url: 'php/cell.php',
				data:{
					projectnumbercell: currentlyediting,
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
		
		url: 'php/shapeshiftput.php',
		data:{ projectnumbershapeshift: currentlyediting },
		
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
			if(!file.type.match(/^image\//)){
				alert('images only kthx');
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
			preview.append('<img src="img/kill.png" class="shap_kill" />')
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
			catoffset = $('.cat_'+presence[currentlyediting].data.category).position().top
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
			$info_cat.stop().css({'height':20})
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
			$('#info_category').css({'height':20})
			setTimeout(function(){$('#info_category').removeClass('open')},500)
			$('#info_category_carousel').css({'top':-catoffset});

			if (!workingwithanewcube){
				uploader(true, currentlyediting)
			}else{
				cubeset('x', newindex+1)
				var reacharound = $('.cube[data-row="'+(newindex+1)+'"]').first().data('callmemaybe')
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
							url: "php/newrow.php"
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
	if (dimension == 'x') scene.children[cubearrayediting].position.x = where*50;
	if (dimension == 'y') scene.children[cubearrayediting].position.y = where*50;
	if (dimension == 'z') scene.children[cubearrayediting].position.z = where*50;
}

$('#save').on('click', function(){uploader(true, currentlyediting)})

function uploader(remain, weight){
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
		url: "php/heavylifting.php"
	}).done(function(e){		
		if ((catinit !== presence[currentlyediting].data.category) || (workingwithanewcube)){
			$ovr_sight.children().children().empty();
			for (var i = 0; i <= counter; i++){
				scene.remove(scene.children[0]);
				if (i == counter){
					counter = 0;
					cubecounter = 0;
					rowcount = 1;
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
			project : currentlyediting,
			field : where
		},
		url: "php/kill.php"
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
		url: "php/killcube.php"
	}).done(function(e){
		scene.remove(scene.children[cubearrayediting]);
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
		url: "php/newcube.php"
	}).done(function(e){
		// console.log(e)

		$('#shapeshifterhopper, #cell_put').empty()

		var $targetedindex = $('.targeted').data('array')
		var $targetedrow = $('.targeted').data('row')
		slide.likethis($targetedindex, 'left', $targetedrow)
		$('.targeted').siblings().each(function(){
			var $theindex = $(this).data('array')
			var $therow = $(this).data('row')
			if($therow == $targetedrow) slide.likethis($theindex, 'left', $therow)
			if($therow >= $targetedrow) slide.likethis($theindex, 'left', $therow)
		})

		separated = false;
		workingwithanewcube = true;


		var element = document.createElement( 'div' );
		element.className = 'cube newcube';
		element.id = 'c'+counter.toString();
		// element.setAttribute('data-callmemaybe', i)
		// element.setAttribute('data-number', numberexact.toString())
		element.setAttribute('data-array', counter.toString())
		element.setAttribute('data-cube', cubecounter.toString())
		// element.setAttribute('data-row', rowcount.toString())
		counter++;	
		cubecounter++;
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
		scene.add( object );

		currentlyediting = e.number;

		cubearrayediting = scene.children.length-1;

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










