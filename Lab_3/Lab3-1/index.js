$( document ).ready(function() {

    var pubnub = PUBNUB.init({
        publish_key: publish_key,
        subscribe_key: subscribe_key
    });

    if (!$.cookie('userName')){
        window.location.href='firstPage.html';
    }
    else {

        oldDirectionName = "No heading";
        if (window.DeviceOrientationEvent) {
            // Listen for the deviceorientation event and handle the raw data
            window.addEventListener('deviceorientation', function (event) {
                var compassdir;

                if (event.webkitCompassHeading) {
                    // Apple works only with this, alpha doesn't work
                    compassdir = event.webkitCompassHeading;
                }
                else {
                    compassdir = event.alpha;
                }
                var currentDirectionName;
                //$('#coordinates').text(compassdir);
                if (compassdir > 315 || compassdir < 45) {
                    currentDirectionName = "North";
                }
                else if (compassdir < 135) {
                    currentDirectionName = "West";
                }
                else if (compassdir < 225) {
                    currentDirectionName = "South"
                }
                else {
                    currentDirectionName = "East"
                }


                if (currentDirectionName !== oldDirectionName) {

                    pubnub.unsubscribe(
                        {
                            channel: oldDirectionName
                        }
                    );
                    console.log("Unsubscribing to " + oldDirectionName);
                    /*if(oldDirectionName !== "No heading") {
                     }*/

                    pubnub.subscribe({
                        channel: currentDirectionName,
                        message: function (m) {
                            var textReceived = m["text"];
                            var username = m["user"];
                            console.log("Received " + textReceived + " on channel " + m["channel"]);

                            var paragraph = $("<p>").html(username + ": " + textReceived);
                            $("#messageArea").append(paragraph);
                        }
                    });
                    console.log("Subscribing to " + currentDirectionName);

                    oldDirectionName = currentDirectionName;

                    $("#coordinates").text(oldDirectionName);


                }
            });
        }


        $("#inputText").submit(function (e) {
            e.preventDefault();

            var inputTextField = $("#inputTextField");
            var inputText = inputTextField.val();
            inputTextField.val('');
            var username = $.cookie('userName');

            console.log("Sent " + inputText + " to " + oldDirectionName);

            pubnub.publish({
                channel: oldDirectionName,
                message: {"text": inputText, "user": username, "channel": oldDirectionName}
            });

        });

        /*$('#inputTextField').focus(function(){
         $(this).val('');
         }); */
    }
    
});