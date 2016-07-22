//////////////////////////////////////////////////////////////////////////////

var canvas = document.getElementById('counter');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//////////////////////////////////////////////////////////////////////////////

var numbers = [
	[1,1,1,1,1,1,0], 	// zero
	[0,1,1,0,0,0,0], 	// one
	[1,1,0,1,1,0,1], 	// two
	[1,1,1,1,0,0,1], 	// three
	[0,1,1,0,0,1,1], 	// four
	[1,0,1,1,0,1,1], 	// five
	[1,0,1,1,1,1,1], 	// six
	[1,1,1,0,0,0,0], 	// seven
	[1,1,1,1,1,1,1], 	// eight
	[1,1,1,0,0,1,1]  	// nine
];

var clock = new Clock();

//////////////////////////////////////////////////////////////////////////////

setInterval(world,50);

//////////////////////////////////////////////////////////////////////////////

function clearCanvas() {
	context.fillStyle = "#fff";
	context.fillRect(0,0,canvas.width,canvas.height);
}

function randomBetween(min,max) {
	return Math.floor((Math.random()*(max - min)-min));
}

//////////////////////////////////////////////////////////////////////////////

function world() {
	clearCanvas();
	var now = new Date();
	var hours = now.getHours();
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();

	clock.update(hours,minutes,seconds).draw();

}

//////////////////////////////////////////////////////////////////////////////

function degToRad(degree) {
	var factor = Math.PI / 180;
	return degree * factor;
}

//////////////////////////////////////////////////////////////////////////////

function Clock() {
	this.digitHeight = 100;
	this.x = canvas.width/2 - (this.digitHeight*6)/2;
	this.y = canvas.height/2 - this.digitHeight;

	this.h1 = new Cell(this.x,this.y,100);
	this.h2 = new Cell(this.x+100,this.y,100);
	this.m1 = new Cell(this.x+200,this.y,100);
	this.m2 = new Cell(this.x+300,this.y,100);
	this.s1 = new Cell(this.x+400,this.y,100);
	this.s2 = new Cell(this.x+500,this.y,100);

	this.update = function(h,m,s) {
		(this.h1).currentNumber = Math.floor(h/10)%10;
		(this.h2).currentNumber = h%10;
		(this.m1).currentNumber = Math.floor(m/10)%10;
		(this.m2).currentNumber = m%10;
		(this.s1).currentNumber = Math.floor(s/10)%10;
		(this.s2).currentNumber = s%10;
		return this;
	}

	this.draw = function() {
		(this.h1).update().draw();
		(this.h2).update().draw();
		(this.m1).update().draw();
		(this.m2).update().draw();
		(this.s1).update().draw();
		(this.s2).update().draw();
	}
}

function Cell(x,y,h) {
	this.currentNumber = 0;
	this.code;
	this.x = x;
	this.y = y;
	this.h = h;
	this.w = this.h/1.5;

	this.lines = [];
	this.generateLines = function() {
		this.lines.push(new Line(this.x,this.y,this.x+this.w,this.y));
		this.lines.push(new Line(this.x+this.w,this.y,this.x+this.w,this.y+this.h/2));
		this.lines.push(new Line(this.x+this.w,this.y+this.h/2,this.x+this.w,this.y+this.h));
		this.lines.push(new Line(this.x+this.w,this.y+this.h,this.x,this.y+this.h));
		this.lines.push(new Line(this.x,this.y+this.h,this.x,this.y+this.h/2));
		this.lines.push(new Line(this.x,this.y+this.h/2,this.x,this.y));
		this.lines.push(new Line(this.x,this.y+this.h/2,this.x+this.w,this.y+this.h/2));
	};this.generateLines();

	this.update = function() {
		this.code = numbers[this.currentNumber];
		return this;
	}

	this.draw = function() {
		for( var i = 0; i < this.lines.length; i++) {
			(this.lines[i]).update(this.code,i).draw();
		}
	}
}

function Line(x1,y1,x2,y2) {
	this.isActive = false;
	this.update = function(code,i) {
		this.isActive = false;
		if (code[i] == 1) {
			this.isActive = true;
		}
		return this;
	}
	this.draw = function() {
		if (this.isActive) {
			context.strokeStyle = "red";
			context.lineWidth = 5;
			context.lineCap = "round";
			context.beginPath();
			context.moveTo(x1,y1);
			context.lineTo(x2,y2);
			context.stroke();
		}
	}
}

//////////////////////////////////////////////////////////////////////////////