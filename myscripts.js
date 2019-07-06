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

        this.show = function () {
            ctx.beginPath();
            //ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.drawImage(birdImage, this.x, this.y, this.radius, this.radius);
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
        this.width = 40;
        this.gap = 120;
        this.top = Math.floor(Math.random() * (canvas.height - this.gap));

        this.show = function () {
            ctx.beginPath();
            //ctx.fillStyle = "#0F8515";
            //ctx.fillRect(this.x, 0, this.width, this.top);
            ctx.drawImage(pipeImage2, this.x, 0, this.width, this.top)
            ctx.closePath();

            ctx.beginPath();
            ctx.drawImage(pipeImage, this.x, this.top + this.gap, this.width, canvas.height - (this.top + this.gap - 15));
            //ctx.fillStyle = "#0F8515";
            //ctx.fillRect(this.x, this.top + this.gap, this.width, canvas.height - (this.top + this.gap));
            ctx.closePath();
        }

        this.update = function () {
            this.x -= 2;
        }

        this.hits = function (bird) {
            if ((bird.y + 25 < this.top || bird.y + 28 > this.top + this.gap) && (bird.x + 15 > this.x && bird.x < this.x + this.width)) {
                return true;
            } 
        }
    }
}

let bird = new Bird();
let pipes = [];
let pipeCounter = 100;
let myReq;
let score = 0;


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

    drawScore();

    if (bird.y + 22 > canvas.height || bird.y + 22 < 0) {
        gameOver();
    }
    myReq = window.requestAnimationFrame(draw);
}

myReq = window.requestAnimationFrame(draw);

function drawScore () {
    ctx.beginPath();
    ctx.font = "40px Arial";
    ctx.fillStyle = "#AFE5E7";
    ctx.fillText(''+ score, canvas.width / 2, 50)
    ctx.closePath();
}

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