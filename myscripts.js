let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

let pipeImage = new Image();
pipeImage.src = "images/flappy_pipe.png";

let pipeImage2 = new Image();
pipeImage2.src = "images/flappy_pipe_rotate.png";

let birdImage = new Image();
birdImage.src = "images/flappy-bird.png";

class Bird {
    constructor() {
        this.x = canvas.width / 4;
        this.y = canvas.height / 2;
        this.gravity = .6;
        this.velocity = 0;
        this.radius = 65;
    }

    jump() {
        this.velocity -= 20;
    }

    update () {
        this.velocity += this.gravity;
        this.velocity *= 0.92;
        this.y += this.velocity;
    }

    show() {
        ctx.beginPath();
        ctx.drawImage(birdImage, this.x, this.y, this.radius, this.radius);
        ctx.fillStyle = "#AFE5E7";
        ctx.fill();
        ctx.closePath();
    }
}

class Pipe {
    constructor() {
        this.x = canvas.width;
        this.width = 40;
        this.gap = 110;
        this.top = Math.floor(Math.random() * (canvas.height - this.gap));
    }

    show () {
        ctx.beginPath();
        ctx.drawImage(pipeImage2, this.x, 0, this.width, this.top)
        ctx.closePath();

        ctx.beginPath();
        ctx.drawImage(pipeImage, this.x, this.top + this.gap, this.width, canvas.height - (this.top + this.gap - 15));
        ctx.closePath();
    }

    update () {
        this.x -= 2;
    }
    
    hits(bird) {
        if ((bird.y + 25 < this.top || bird.y + 30 > this.top + this.gap) && (bird.x + 15 > this.x && bird.x < this.x + this.width)) {
            return true;
        } 
    }
}

let bird = new Bird();
let pipes = [];
let pipeCounter = 100;
let myReq;
let score = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bird.show();
    bird.update();
    addPipe();
    showPipes();
    drawScore();

    if (bird.y + 22 > canvas.height || bird.y + 22 < 0) {
        gameOver();
    }
    
    myReq = window.requestAnimationFrame(draw);
}

myReq = window.requestAnimationFrame(draw);

function addPipe() {
    pipeCounter--;
    if (pipeCounter === 0) {
        pipes.push(new Pipe());
        pipeCounter = 100;
    }
}

function showPipes () {
    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();
        console.log(pipes[i].x)
        console.log(bird.x)

        if (pipes[i].hits(bird)){
            gameOver();
        } 
        
        if (bird.x + 1 === pipes[i].x) {
            score++;
        }

        if (pipes[i].x < -pipes[i].width) {
            pipes.splice(i, 1);
        }
    }
}

function drawScore () {
    ctx.beginPath();
    ctx.font = "40px Impact";
    ctx.fillStyle = "white";
    ctx.fillText(''+ score, canvas.width / 2, 50)
    ctx.strokeText(''+ score, canvas.width / 2, 50)
    ctx.closePath();
}

function gameOver() {
    window.cancelAnimationFrame(myReq);
    location.reload();
    alert("Youre score: " + score);
}

function keyDownHandler (e) {
  if (e.key === ' ') {
    bird.jump();
  }
}

document.addEventListener("keydown", keyDownHandler)