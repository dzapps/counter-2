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

var letters = ['A','B','C','D','E','F','G','H','I','J','K',
	'L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

var clock = new Clock();
var alphaclock = new AlphaClock();

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
	alphaclock.update(hours,minutes,seconds).draw();

}

//////////////////////////////////////////////////////////////////////////////

function degToRad(degree) {
	var factor = Math.PI / 180;
	return degree * factor;
}

function toBinary(num) {
	if (num <= 0) return "";
	return "" + toBinary(Math.floor(num/2)) + "" + (num%2);
}

//////////////////////////////////////////////////////////////////////////////

function AlphaClock() {
	this.x = clock.x;
	this.y = clock.y-30;

	this.arr = [];

	for (var i = 0; i < 38; i++) {
		this.arr.push(letters[randomBetween(0,25)]);
	}

	var gap = 15;

	this.update = function(h,m,s) {
		var rand = randomBetween(0,(this.arr).length);
		(this.arr)[rand] = letters[randomBetween(0,25)];
		return this;
	}

	this.draw = function() {	
		context.font = "10px Arial";
		context.fillStyle = "#f00";
		for (var i = 0; i < (this.arr).length; i++) {
			context.fillText((this.arr)[i],this.x+gap*i,this.y);
		}
	}
}

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

	this.h1_bin = new Cell(this.x+19.8*0,this.y+130,15);
	this.h2_bin = new Cell(this.x+19.8*1,this.y+130,15);
	this.h3_bin = new Cell(this.x+19.8*2,this.y+130,15);
	this.h4_bin = new Cell(this.x+19.8*3,this.y+130,15);
	this.h5_bin = new Cell(this.x+19.8*5,this.y+130,15);
	this.h6_bin = new Cell(this.x+19.8*6,this.y+130,15);
	this.h7_bin = new Cell(this.x+19.8*7,this.y+130,15);
	this.h8_bin = new Cell(this.x+19.8*8,this.y+130,15);

	this.m1_bin = new Cell(this.x+19.8*10,this.y+130,15);
	this.m2_bin = new Cell(this.x+19.8*11,this.y+130,15);
	this.m3_bin = new Cell(this.x+19.8*12,this.y+130,15);
	this.m4_bin = new Cell(this.x+19.8*13,this.y+130,15);
	this.m5_bin = new Cell(this.x+19.8*15,this.y+130,15);
	this.m6_bin = new Cell(this.x+19.8*16,this.y+130,15);
	this.m7_bin = new Cell(this.x+19.8*17,this.y+130,15);
	this.m8_bin = new Cell(this.x+19.8*18,this.y+130,15);

	this.s1_bin = new Cell(this.x+19.8*20,this.y+130,15);
	this.s2_bin = new Cell(this.x+19.8*21,this.y+130,15);
	this.s3_bin = new Cell(this.x+19.8*22,this.y+130,15);
	this.s4_bin = new Cell(this.x+19.8*23,this.y+130,15);
	this.s5_bin = new Cell(this.x+19.8*25,this.y+130,15);
	this.s6_bin = new Cell(this.x+19.8*26,this.y+130,15);
	this.s7_bin = new Cell(this.x+19.8*27,this.y+130,15);
	this.s8_bin = new Cell(this.x+19.8*28,this.y+130,15);

	this.update = function(h,m,s) {
		(this.h1).currentNumber = Math.floor(h/10)%10;
		(this.h2).currentNumber = h%10;
		(this.m1).currentNumber = Math.floor(m/10)%10;
		(this.m2).currentNumber = m%10;
		(this.s1).currentNumber = Math.floor(s/10)%10;
		(this.s2).currentNumber = s%10;

		(this.h1_bin).currentNumber =
			Math.floor(toBinary(Math.floor(h/10)%10)/1000);
		(this.h2_bin).currentNumber =
			Math.floor(toBinary(Math.floor(h/10)%10)/100)%10;
		(this.h3_bin).currentNumber =
			Math.floor(toBinary(Math.floor(h/10)%10)/10)%10;
		(this.h4_bin).currentNumber =
			Math.floor(toBinary(Math.floor(h/10)%10)/1)%10;
		(this.h5_bin).currentNumber =
			Math.floor(toBinary(h%10)/1000);
		(this.h6_bin).currentNumber =
			Math.floor(toBinary(h%10)/100)%10;
		(this.h7_bin).currentNumber =
			Math.floor(toBinary(h%10)/10)%10;
		(this.h8_bin).currentNumber =
			Math.floor(toBinary(h%10)/1)%10;

		(this.m1_bin).currentNumber =
			Math.floor(toBinary(Math.floor(m/10)%10)/1000);
		(this.m2_bin).currentNumber =
			Math.floor(toBinary(Math.floor(m/10)%10)/100)%10;
		(this.m3_bin).currentNumber =
			Math.floor(toBinary(Math.floor(m/10)%10)/10)%10;
		(this.m4_bin).currentNumber =
			Math.floor(toBinary(Math.floor(m/10)%10)/1)%10;
		(this.m5_bin).currentNumber =
			Math.floor(toBinary(m%10)/1000);
		(this.m6_bin).currentNumber =
			Math.floor(toBinary(m%10)/100)%10;
		(this.m7_bin).currentNumber =
			Math.floor(toBinary(m%10)/10)%10;
		(this.m8_bin).currentNumber =
			Math.floor(toBinary(m%10)/1)%10;		

		(this.s1_bin).currentNumber =
			Math.floor(toBinary(Math.floor(s/10)%10)/1000);
		(this.s2_bin).currentNumber =
			Math.floor(toBinary(Math.floor(s/10)%10)/100)%10;
		(this.s3_bin).currentNumber =
			Math.floor(toBinary(Math.floor(s/10)%10)/10)%10;
		(this.s4_bin).currentNumber =
			Math.floor(toBinary(Math.floor(s/10)%10)/1)%10;
		(this.s5_bin).currentNumber =
			Math.floor(toBinary(s%10)/1000);
		(this.s6_bin).currentNumber =
			Math.floor(toBinary(s%10)/100)%10;
		(this.s7_bin).currentNumber =
			Math.floor(toBinary(s%10)/10)%10;
		(this.s8_bin).currentNumber =
			Math.floor(toBinary(s%10)/1)%10;


		return this;
	}

	this.draw = function() {
		(this.h1).update().draw();
		(this.h2).update().draw();
		(this.m1).update().draw();
		(this.m2).update().draw();
		(this.s1).update().draw();
		(this.s2).update().draw();

		(this.h1_bin).update().draw();
		(this.h2_bin).update().draw();
		(this.h3_bin).update().draw();
		(this.h4_bin).update().draw();
		(this.h5_bin).update().draw();
		(this.h6_bin).update().draw();
		(this.h7_bin).update().draw();
		(this.h8_bin).update().draw();

		(this.m1_bin).update().draw();
		(this.m2_bin).update().draw();
		(this.m3_bin).update().draw();
		(this.m4_bin).update().draw();
		(this.m5_bin).update().draw();
		(this.m6_bin).update().draw();
		(this.m7_bin).update().draw();
		(this.m8_bin).update().draw();

		(this.s1_bin).update().draw();
		(this.s2_bin).update().draw();
		(this.s3_bin).update().draw();
		(this.s4_bin).update().draw();
		(this.s5_bin).update().draw();
		(this.s6_bin).update().draw();
		(this.s7_bin).update().draw();
		(this.s8_bin).update().draw();
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
			context.lineWidth = 1;
			context.lineCap = "round";
			context.beginPath();
			context.moveTo(x1,y1);
			context.lineTo(x2,y2);
			context.stroke();
		}
	}
}

//////////////////////////////////////////////////////////////////////////////