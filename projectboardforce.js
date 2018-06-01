/* Created by Mark Kevin Mapacpac */
var canvas = document.getElementById("mycanvas");
var context = canvas.getContext("2d");
console.log("Hi World2");
var dragStartLocation;


var colors2 = ["white"];
color1 = document.getElementById("color1").value;
color2 = document.getElementById("color2").value;
color3 = document.getElementById("color3").value;

colors2.push(color1);
colors2.push(color2);
colors2.push(color3);

var radius = 7;
var dragging = false;
var createLine = true;
context.lineWidth = radius*2;
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);



var putPoint = function(e){
	
	
	var rect = canvas.getBoundingClientRect();
	var posx = e.clientX - rect.left;
	var posy = e.clientY - rect.top;
    if(dragging){
		context.lineTo(posx, posy);
        context.stroke();
        context.beginPath();
		context.arc(posx, posy, radius, 0, Math.PI*2);
        context.fill();
        context.beginPath();
		context.moveTo(posx, posy);
    }
}

	 
var engage = function(e){
    
    dragging = true;
    putPoint(e);
}

var disengage = function() {
    
    dragging = false;
    context.beginPath();
}

for(var i=0, n=colors2.length; i<n; i++){
    
    var swatch = document.createElement('div');
    swatch.className = 'swatch';
    swatch.style.background = colors2[i];
	if(colors2[i] == "white"){
		
		swatch.addEventListener('click',changeCursor);
		
	}
    swatch.addEventListener('click',setSwatch);
    document.getElementById('colors').appendChild(swatch);
}

function changeCursor(){
	
	canvas.className += ' cursorChange';

}

function setColor(color){
    
    context.fillStyle = color;
    context.strokeStyle = color;
    var active = document.getElementsByClassName('active')[0];
    if(active){
       active.className = 'swatch';
    }
}

function setSwatch(e){
    //identify swatch 
    var swatch = e.target;
    //set color
    setColor(swatch.style.backgroundColor);
    //give active class
    swatch.className += ' active';
    
}

setSwatch({target:document.getElementsByClassName('swatch')[1]});

//mobile event
canvas.addEventListener("touchstart", engage);
canvas.addEventListener("touchend", disengage);
canvas.addEventListener("touchmove", putPoint);


canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mouseup', disengage);
canvas.addEventListener('mouseout',disengage);
canvas.addEventListener('mousemove', putPoint);
