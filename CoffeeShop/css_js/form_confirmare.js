let canvas, ctx, w, h, snows;

function init() {
	canvas = document.querySelector("#canvas");
	ctx = canvas.getContext("2d");

	resizeReset();
	animationLoop();
}

function resizeReset() {
	w = canvas.width = window.innerWidth;
	h = canvas.height = window.innerHeight;

	snows = [];
	for (let i = 0; i < 500; i++) {
		snows.push(new Snow());
	}
}

function animationLoop() {
	ctx.clearRect(0, 0, w, h);
	drawScene();
	requestAnimationFrame(animationLoop);
}

function drawScene() {
	for (let i = 0; i < snows.length; i++) {
		snows[i].update();
		snows[i].draw();
	}
}

function getRandomInt(min, max) {
	return Math.round(Math.random() * (max - min)) + min;
}

class Snow {
	constructor() {
		this.reset();
		this.rgb = "255, 255, 255";
	}
	reset() {
		this.x = getRandomInt(0, w);
		this.xc = ((this.x - (w / 2)) / (w / 2)) / 2;
		this.y = getRandomInt(-(h * 0.3), h);
		this.yc = getRandomInt(10, 15) / 10;
		this.size = getRandomInt(10, 20) / 10;
		this.a = getRandomInt(-10, 0) / 10;
		this.ac = getRandomInt(3, 5) / 100;
	}
	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fillStyle = `rgba(${this.rgb}, ${this.a})`;
		ctx.strokeStyle = `rgba(${this.rgb}, ${this.a})`;
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}
	update() {
		this.x += this.xc;
		this.y += this.yc;
		this.a += this.ac;
		if (this.a > 2) {
			this.ac *= -1;
		} else if (this.a < 0 && this.ac < 0) {
			this.reset();
		}
	}
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);

window.onload=function()
{
	const json =localStorage.getItem('form');
	const obj=JSON.parse(json);

	for(key in obj){
		const markup=`
		<div>
			<span>${key}: ${obj[key]}</span>
		</div>
		`;
		document.getElementById('data').innerHTML+=markup;
	}



	var h1 = document.getElementById('h1');
	var opacity = 0;
	var timer = setInterval(()=> {

		if (opacity >= 1) {
			clearInterval(timer);
		}
		h1.style.opacity = opacity;
		opacity += 0.01;
	}, 100); 

	localStorage.clear();

}