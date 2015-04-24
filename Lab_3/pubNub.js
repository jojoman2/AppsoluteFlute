$( document ).ready(function() {
    PUBNUB_demo.subscribe({
        channel: 'chatMessages',
        message: function (m) {
            var textReceived = m["text"];
            console.log(textReceived);
            $("#messageArea").append(textReceived);
        }
    });

    $("#inputText").submit(function(e){
        e.preventDefault();
        var inputText = $("#inputTextField").val();
        PUBNUB_demo.publish({
            channel: 'chatMessages',
            message: {"text":inputText}
        });
});



});