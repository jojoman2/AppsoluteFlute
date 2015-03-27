// Create a div to hold the control.
controlDiv = $("<div>");

// Set CSS styles for the DIV containing the control
// Setting padding to 5 px will offset the control
// from the edge of the map.

var button1 = $("<button>").attr("id","zoomin").html("+");
var button2 = $("<button>").attr("id","zoomout").html("-");

controlDiv.append(button1).append(button2);
