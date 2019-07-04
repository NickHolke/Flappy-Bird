let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

class Bird {
    constructor() {
        this.x = canvas.width / 4;
        this.y = canvas.height / 2;
        this.gravity = .75;
        this.velocity = 0;

        this.show = function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
            ctx.fillStyle = "#AFE5E7";
            ctx.fill();
            ctx.closePath();
        }
    
        this.jump = function () {
            this.velocity -= 23;
        }
        
        this.update = function () {
            this.velocity += this.gravity;
            this.velocity *= 0.92;
            this.y += this.velocity;
    
            if (this.y > canvas.height) {
                this.y = canvas.height;
                this.velocity = 0;
            }
    
            if (this.y < 0) {
                this.y = 0;
                this.velocity = 0;
            } 
        }
    }
}

class Pipe {
    constructor() {
        this.x = canvas.width;
        this.width = 20;
        this.gap = 120;
        this.top = Math.floor(Math.random() * (canvas.height - this.gap));
        
        this.bottom = Math.floor(Math.random() * canvas.height / 2);

        this.show = function () {
            ctx.beginPath();
            ctx.rect(this.x, 0, this.width, this.top);
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.rect(this.x, this.top + this.gap, this.width, canvas.height - (this.top + this.gap));
            ctx.stroke();
            ctx.closePath();
        }

        this.update = function () {
            this.x -= 2;
        }
    }
}

let bird = new Bird();
let pipes = [];
let pipeCounter = 100;

function addPipe() {
    pipeCounter--;
    if (pipeCounter === 0) {
        pipes.push(new Pipe());
        pipeCounter = 100;
    }
}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bird.show();
    bird.update();
    addPipe();

    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();
        if (pipes[i].x < 0) {
            pipes.splice(i, 1);
        }
    }
    window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);

function keyDownHandler (e) {
  if (e.key === ' ') {
    bird.jump();
  }
}

document.addEventListener("keydown", keyDownHandler)