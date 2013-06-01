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
		data:{pass:coded},
		url: "php/link.php",
	}).done( function(edit){
		$('#edit').addClass('editing').append(edit)
		$('#movement').addClass('down')
	}).fail( function(intrude){

	})
}