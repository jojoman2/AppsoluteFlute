$( document ).ready(function() {



    oldDirectionName = "No heading";
    if (window.DeviceOrientationEvent) {
        // Listen for the deviceorientation event and handle the raw data
        window.addEventListener('deviceorientation', function(event) {
            var compassdir;

            if(event.webkitCompassHeading) {
                // Apple works only with this, alpha doesn't work
                compassdir = event.webkitCompassHeading;
            }
            else {
                compassdir = event.alpha;
            }
            var currentDirectionName;
            //$('#coordinates').text(compassdir);
            if(compassdir>315||compassdir<45){
                currentDirectionName = "North";
            }
            else if(compassdir<135){
                currentDirectionName = "West";
            }
            else if(compassdir<225){
                currentDirectionName = "South"
            }
            else{
                currentDirectionName = "East"
            }


            if(currentDirectionName !== oldDirectionName){

                if(oldDirectionName !== "No heading") {
                    pubnub.unsubscribe(oldDirectionName);
                }

                pubnub.subscribe({
                    channel: currentDirectionName,
                    message: function (m) {
                        var textReceived = m["text"];

                        var paragraph = $("<p>").html($.cookie('userName') + ": " + textReceived);
                        $("#messageArea").append(paragraph);
                    }
                });
                console.log("Subscribing to "+oldDirectionName);


                oldDirectionName = currentDirectionName;

                $("#coordinates").text(oldDirectionName);

            }
        });
    }


    $("#inputText").submit(function(e){
        e.preventDefault();

        var inputText = $("#inputTextField").val();

        console.log("Sent "+inputText+" to "+oldDirectionName);

        pubnub.publish({
            channel: oldDirectionName,
            message: {"text":inputText}
        });

    });

    if (!$.cookie('userName')){
        window.location.href='firstPage.html';
    }
    
});