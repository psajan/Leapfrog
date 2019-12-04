var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var bird = new Image();
var background = new Image();
var ground = new Image();
var pipeUp = new Image();
var pipeDown = new Image();

bird.src = "images/bird.png";
background.src = "images/background.png";
ground.src = "images/ground.png";
pipeUp.src = "images/pipedown.png";
pipeDown.src = "images/pipeup.png";
var gap = 140;
var horizontalGap = 120;
var birdx = 10;
var birdy = 150;
var gravity = 1;
var points = 0;

var pipe = [];
pipe[0] = {
    x: canvas.width,
    y: 0
};

function draw() {
    ctx.drawImage(background, 0, 0);
    ctx.drawImage(ground, 0, canvas.height - ground.height);
    ctx.drawImage(bird, birdx, birdy);
    birdy += gravity;
    movepipes();
    checkCollision();

    ctx.fillText("Score : " + points, 10, canvas.height - 20);
    requestAnimationFrame(draw);
}

function movepipes() {
    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + (pipeUp.height + gap));
        pipe[i].x--;
        if (pipe[i].x == horizontalGap) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        checkCollision(pipe[i]);
        getPoints(pipe[i]);
        requestAnimationFrame(draw);
    }
}

function checkCollision(pipe) {
    var temp = pipe.x;
    if (birdx + bird.width >= pipe.x && bird <= pipe.x + pipeUp.width &&
        (birdy <= pipe.y + pipeUp.height || bird + bird.height >= pipe.y + verticalGap) ||
        birdy + bird.height >= canvas.height - ground.height) {
        bird.style.display = "none"
    }
}

function getPoints(pipe) {
    if (pipe == 5) {
        points++;
    }
}
document.addEventListener("click", moveUp);

function moveUp() {
    birdy -= 30;
}
draw();