$('.copyright').on('dblclick', function(){
	$(this).parent().parent().addClass('edit')
	$('#trial').focus()
})

$('#trial').on({
	keydown:function(e){
		if (e.keyCode == 13) linkup($(this).val());
	},
	blur:function(){
		$('.red').removeClass('edit')
	}
});

var backendexists = false;

function linkup(tehcode){
	var coded = CryptoJS.SHA512(tehcode).toString();

	$.ajax({
		type: "POST",
		// data:{pass:coded},
		data:{pass:coded},
		url: "php/link.php",
	}).done( function(edit){
		if (edit.length > 30){
			backendhasexisted = true;
			previewed = false;
			separated = false;

			$('#movement').addClass('down')
			/*edit*/.prev().addClass('editing').append(edit)

			setTimeout(function(){
				$('.red').removeClass('edit')
				$('#cubic').children().children().empty();
				for (var i = 0; i <= counter; i++){
					scene.remove(scene.children[1]);
					if (i == counter){
						counter = 1;
						cubecounter = 1;
						rowcount = 1;
						namelist = [];
					}
				}
			},1000)
			
			$('#switch_03').on('click', function(){
				$.ajax({
					type: "POST",
					dataType:'JSON',
					url: "php/front.php",
				}).done( function(cube){
					$('#movement').removeClass('down').prev().removeClass('editing')

					backendexists = false;
					cubedescend = cube;
					cubegenerator(cubedescend.nav.cubes);
					shapeshifterload(cubedescend.nav.shapeshifter);
					animate();

					setTimeout(function(){
						$('#edit').empty();
						for (var i = 0; i <= editor_counter; i++){ 
							editor_scene.remove(editor_scene.children[0]); 
						}
					}, 1000)					
				})				
			})
		}else{
			$('#trial').val('NOPE').get(0).type = 'text';

			setTimeout(function(){
				$('#trial').val('').get(0).type = 'password';
				$('.red').removeClass('edit')
			},1000)			
		}
	})
}






