function geohash( coord, resolution ) {
    var rez = Math.pow( 10, resolution || 0 );
    return Math.floor(coord * rez) / rez;
}

$( document ).ready(function() {
    var resolution = 2;



    if (!$.cookie('userName')){
        window.location.href='firstPage.html';
    }
    else {

        pubnub = PUBNUB.init({
            publish_key: publish_key,
            subscribe_key: subscribe_key,
            uuid: $.cookie('userName')
        });


        oldDirectionGroup = "None";
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function(position) {
                var xCoordGroup = geohash(position.coords.latitude, resolution);
                var yCoordGroup = geohash(position.coords.longitude, resolution);
                var locationGroup = xCoordGroup + " " + yCoordGroup;

                if (locationGroup !== oldDirectionGroup) {

                    $("#coordinates").html(locationGroup);

                    pubnub.unsubscribe({
                        channel: oldDirectionGroup
                    });

                    pubnub.subscribe({
                        channel: locationGroup,
                        presence: function(m){
                            var occupancy = m["occupancy"];
                            $("#chatCounter").html(occupancy+" subscribers");
                        },
                        message: function (m) {
                            var textReceived = m["text"];
                            var username = m["user"];
                            console.log("Received " + textReceived + " on channel " + m["channel"]);

                            var paragraph = $("<p>").html(username + ": " + textReceived);
                            $("#messageArea").append(paragraph);
                        }
                    });

                    oldDirectionGroup = locationGroup;

                }
            });
        }
        else {
            $("#messageArea").html("Location not supported");
        }


        $("#inputText").submit(function (e) {
            e.preventDefault();

            var inputTextField = $("#inputTextField");
            var inputText = inputTextField.val();
            inputTextField.val('');
            var username = $.cookie('userName');

            console.log("Sent " + inputText + " to " + oldDirectionGroup);

            pubnub.publish({
                channel: oldDirectionGroup,
                message: {"text": inputText, "user": username, "channel": oldDirectionGroup}
            });

        });

        /*$('#inputTextField').focus(function(){
         $(this).val('');
         }); */
    }
    
});

$( window ).unload(function() {

    pubnub.unsubscribe({
        channel: oldDirectionGroup
    });
    return "hhehsdf";
});