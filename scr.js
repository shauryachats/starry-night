NUMBER_OF_STARS = 300
MAX_RADIUS = 4

WINDOW_WIDTH = $(window).width();
WINDOW_HEIGHT = $(window).height();

canvas = null
context = null

stars = []

xrandom = function() {
	return Math.floor(canvas.width * Math.random());
}

yrandom = function() {
	return Math.floor(canvas.height * Math.random());
}

radrandom = function() {
	return Math.floor(MAX_RADIUS * Math.random()) + 1;
}

var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;

function Star() {
	this.x = xrandom();
	this.y = yrandom();
	this.radius = radrandom();
}


var render = function() {

	//Clear canvas
	context.clearRect(0, 0, canvas.width, canvas.height);

	//Paint the background black
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	//Update the position of the stars.
	for (var i = 0; i < NUMBER_OF_STARS; ++i)
	{
		stars[i].y -= stars[i].radius;
		if (stars[i].y < 0)
		{
			stars[i].y = canvas.height;
			stars[i].x = xrandom();
			stars[i].radius = radrandom();
		}
	}

	//Draw the stars
	for (var i = 0; i < NUMBER_OF_STARS; ++i)
	{
		context.beginPath();
		context.arc(stars[i].x, stars[i].y, stars[i].radius, 0, 2*Math.PI);
		context.fillStyle = 'white';
		context.fill();
		context.stroke();		
	}

	requestAnimationFrame(render);
}

var runStarAnim = function() {
	canvas = document.getElementById('canva');
	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	context = canvas.getContext('2d');

	for (var i = 0; i < NUMBER_OF_STARS; ++i)
		stars.push(new Star());

	render();
}

$(document).ready(runStarAnim);