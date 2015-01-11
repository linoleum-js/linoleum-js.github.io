$(document).ready(function(){
	$('#send').click(function(e){
		e.preventDefault();

		ids = ['#name', '#addr', '#tel', '#message', '#time'];

		for(var i = 0; i < ids.length; i++) {
			if($(ids[i]).val().length === 0) {
				$(ids[i]).css('border-color', 'red');
				return;
			}
			else {
				$(ids[i]).css('border-color', '#999');
			}
		}

		$.post("send_email.php", $("#order-form").serialize(),function(result){});
	});
});