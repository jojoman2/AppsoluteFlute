PUBNUB_demo.subscribe({
    channel: 'demo_tutorial',
    message: function(m){console.log(m)}
});

$("inputText").submit(function(e){
	e.preventDefault();
	var inputText = $("inputTextField").text();

	PUBNUB_demo.publish({
    channel: 'demo_tutorial',
    message: {"color":"blue"}
});

});