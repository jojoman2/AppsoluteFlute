/* cookie */

$(document).ready(function(){

	$('#loginButton').click(function(){
		var userName = $('#userName').val();
		$.cookie('userName',userName);
	});

});