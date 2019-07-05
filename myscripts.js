let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

class Bird {
    constructor() {
        this.x = canvas.width / 4;
        this.y = canvas.height / 2;
        this.gravity = .6;
        this.velocity = 0;
        this.radius = 15;

        this.show = function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fillStyle = "#AFE5E7";
            ctx.fill();
            ctx.closePath();
        }
    
        this.jump = function () {
            this.velocity -= 20;
        }
        
        this.update = function () {
            this.velocity += this.gravity;
            this.velocity *= 0.92;
            this.y += this.velocity;
        }
    }
}

class Pipe {
    constructor() {
        this.x = canvas.width;
        this.width = 20;
        this.gap = 120;
        this.top = Math.floor(Math.random() * (canvas.height - this.gap));

        this.show = function () {
            ctx.beginPath();
            ctx.fillStyle = "#0F8515";
            ctx.fillRect(this.x, 0, this.width, this.top);
            ctx.closePath();

            ctx.beginPath();
            ctx.fillStyle = "#0F8515";
            ctx.fillRect(this.x, this.top + this.gap, this.width, canvas.height - (this.top + this.gap));
            ctx.closePath();
        }

        this.update = function () {
            this.x -= 2;
        }

        this.hits = function (bird) {
            if ((bird.y - 10 < this.top || bird.y > this.top + this.gap) && (bird.x + 10 > this.x && bird.x - 10 < this.x + this.width)) {
                return true;
            } 
        }
    }
}

let bird = new Bird();
let pipes = [];
let pipeCounter = 100;
let myReq;

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

        if (pipes[i].hits(bird)){
            gameOver();
        } 
        if (pipes[i].x < 0) {
            pipes.splice(i, 1);
        }
    }

    if (bird.y > canvas.height || bird.y < 0) {
        gameOver();
    }
    myReq = window.requestAnimationFrame(draw);
}

myReq = window.requestAnimationFrame(draw);

function gameOver() {
    window.cancelAnimationFrame(myReq);
    location.reload();
    alert("You lose");
}

function keyDownHandler (e) {
  if (e.key === ' ') {
    bird.jump();
  }
}

document.addEventListener("keydown", keyDownHandler)