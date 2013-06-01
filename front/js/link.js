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

function linkup(tehcode){
	var coded = CryptoJS.SHA512(tehcode).toString();

	$.ajax({
		type: "POST",
		data:{pass:'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff'},
		url: "php/link.php",
	}).done( function(edit){
		$('#edit').addClass('editing').append(edit)
		$('#movement').addClass('down')
	}).fail( function(intrude){

	})
}