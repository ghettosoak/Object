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
		data:{pass:coded},
		// data:{pass:'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff'},
		url: "php/link.php",
	}).done( function(edit){
		if (edit.length > 30){
			$('.red').removeClass('edit')
			$('#movement').addClass('down')
			/*edit*/.prev().addClass('editing').append(edit)

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

			$('#switch_03').on('click', function(){
				$.ajax({
					type: "POST",
					dataType:'JSON',
					url: "php/front.php",
				}).done( function(cube){
					backendexists = false;
					cubedescend = cube;
					cubegenerator(cubedescend.nav.cubes);
					shapeshifterload(cubedescend.nav.shapeshifter);
					animate();

					$('#movement').removeClass('down').prev().removeClass('editing').empty();
					for (var i = 0; i <= editor_counter; i++){ 
						editor_scene.remove(editor_scene.children[0]); 
					}
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






