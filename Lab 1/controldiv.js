

// Set CSS styles for the DIV containing the control
// Setting padding to 5 px will offset the control
// from the edge of the map.
controlDiv.style.padding = '5px';

// Set CSS for the control border.
zoomin = document.createElement('button');
zoomin.style.backgroundColor = 'white';
zoomin.title = 'Click to set the map to Home';
zoomin.innerHTML = "Hej";
zoomin.id = "button";
controlDiv.appendChild(zoomin);