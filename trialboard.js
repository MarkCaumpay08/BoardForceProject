/* Created by Mark Kevin Mapacpac */
var canvas = document.getElementById("canvasBoard");
var context = canvas.getContext("2d");
var dragging, dragStartLocation, snapshot, shape;

shape = 'line';
//initialization
context.strokeStyle = 'black';
context.lineWidth = 5;
context.lineCap = 'round';

function getCanvasCoordinates(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

function drawLine(position) {
	/*
	context.beginPath();
    context.moveTo(dragStartLocation.x, dragStartLocation.y);
    context.lineTo(position.x, position.y);
    context.stroke();
	*/
	context.lineTo(position.x, position.y);
    context.stroke();
    context.beginPath();
    context.beginPath();
    context.moveTo(position.x, position.y);
}

function drawCircle(position) {
	
	var ellCenter_x = dragStartLocation.x - (dragStartLocation.x - position.x)/2;
	var ellCenter_y = dragStartLocation.y - (dragStartLocation.y - position.y)/2;
	var ellWidth = Math.abs((dragStartLocation.x - position.x)/2);
	var ellHeight = Math.abs((dragStartLocation.y - position.y)/2);
	
    context.beginPath();
	context.ellipse(ellCenter_x, ellCenter_y, ellWidth , ellHeight,0 * Math.PI/180,0,2 * Math.PI);
    context.stroke();
}

function drawRectangle(position){
	
	var centerx = dragStartLocation.x - position.x; //distance between x
	var centery = dragStartLocation.y - position.y; //distance between y
	
	context.beginPath();
	context.rect(dragStartLocation.x,dragStartLocation.y, centerx*(-1),centery*(-1));
	context.stroke();
}

function takeSnapshot() {
	console.log("snapshot");
    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreSnapshot() {
    context.putImageData(snapshot, 0, 0);
}


function engage(event){
    
    dragging = true;
	dragStartLocation = getCanvasCoordinates(event);
	if(shape != 'line'){
		takeSnapshot();
	}
}

function disengage(event) {
    
    dragging = false;
	
	var position = getCanvasCoordinates(event);
	if(shape=="rectangle"){
		restoreSnapshot();
		drawRectangle(position);
	}else if(shape == "ellipse"){
		restoreSnapshot();
		drawCircle(position);
	}else if(shape == "line"){
			context.beginPath();
    }
    //drawLine(position);

}

function drag(event) {
    var position;
    if (dragging === true) {
		
        position = getCanvasCoordinates(event);
		if(shape=="rectangle"){
			restoreSnapshot();
			drawRectangle(position);
		}else if(shape == "ellipse"){
			restoreSnapshot();
			drawCircle(position);
		}else if(shape == "line"){
			drawLine(position);
		}
		//drawLine(position);
    }
}

function colorPanel(){
	
	var panel = document.createElement('div');
	panel.className = 'swatch';
	panel.style.background = "red";
	panel.addEventListener('click', setColor);
	document.getElementById('colors').appendChild(panel);
	
	
	var panel = document.createElement('div');
	panel.className = 'swatch';
	panel.style.background = "blue";
	panel.addEventListener('click', setColor);
	document.getElementById('colors').appendChild(panel);
}

function setColor(event){
	var panelClicked = event.target;
	var color = panelClicked.style.backgroundColor;
	console.log("color: " + color);
	console.log("clicked");
	context.fillStyle = color;
    context.strokeStyle = color;
	if(color == "red"){
		shape = "rectangle";
	}else if(color == "blue"){
		shape = "ellipse";
	}
    
}

colorPanel();
canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mousemove', drag);
canvas.addEventListener('mouseup', disengage);
//canvas.addEventListener('mouseout',disengage);