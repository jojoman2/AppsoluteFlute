$( document ).ready(function() {
    Compass.noSupport(function () {
        //$('.compass').hide();
        $('#coordinateInstruction').text("No support for compass");
    });

    Compass.needGPS(function () {
        //$('.go-outside-message').show();          // Step 1: we need GPS signal
        $('#coordinateInstruction').text("Go outside");
    }).needMove(function () {
        //$('.go-outside-message').hide()
        //$('.move-and-hold-ahead-message').show(); // Step 2: user must go forward
        $('#coordinateInstruction').text("Move and hold ahead");
    }).init(function () {
        //$('.move-and-hold-ahead-message').hide(); // GPS hack is enabled
        $('#coordinateInstruction').text("GPS HACK");
    });

    Compass.watch(function (heading) {
        $('#coordinates2').text(heading);
        //$('.compass').css('transform', 'rotate(' + (-heading) + 'deg)');
    });
    PUBNUB_demo.subscribe({
        channel: 'chatMessages',
        message: function (m) {
            var textReceived = m["text"];
            var paragraph = $("<p>").html(textReceived);
            $("#messageArea").append(paragraph);
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