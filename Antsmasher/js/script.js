(function() {
    function Box(parentElement) {
        this.x = 10;
        this.y = 10;
        this.speed = 2;
        this.width = 20;
        this.height = 20;
        this.element = null;
        this.image = "url(\"images/ant.png\")";
        this.parentElement = parentElement;
        var that = this;

        this.init = function() {
            var box = document.createElement('div');
            box.style.height = this.height + 'px';
            box.style.width = this.width + 'px';
            box.style.backgroundImage = this.image;
            box.style.backgroundSize = this.height + "px " + this.width + "px";
            box.classList.add('box');
            this.parentElement.appendChild(box);
            this.element = box;
            this.element.onclick = this.boxClicked.bind(this);
            this.draw();

            return this;
        }

        this.setPostion = function(x, y) {
            this.x = x;
            this.y = y;
        }

        this.boxClicked = function() {
            console.log('boxClicked', this.width);
        }

        this.draw = function() {
            this.element.style.left = this.x + 'px';
            this.element.style.top = this.y + 'px';
        }

        this.move = function() {
            if (this.y < 0 || this.y > 480) this.speed = -this.speed;
            this.y += this.speed;
            if (this.x < 0 || this.x > 480) this.speed = -this.speed;
            this.x += this.speed;
            this.draw();
        }

        this.checkCollision = function(boxes) {
            for (var i = 0; i < boxes.length; i++) {
                if (this.x <= (boxes[i].x + boxes[i].width) && (this.x + this.width) >= boxes[i].x && this.y <= (boxes[i].y + boxes[i].height) && (this.y + this.height) >= boxes[i].y) {
                    this.speed = -this.speed;
                    boxes[i].speed = -boxes[i].speed;
                }
            }
            return false;
        }
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function Game(parentElement, boxCount) {
        var boxes = [];
        var MAX_WIDTH = 480;
        var MAX_HEIGHT = 480;
        this.parentElement = parentElement;
        this.boxCount = boxCount || 10;

        this.startGame = function() {
            for (var i = 0; i < this.boxCount; i++) {
                var box = new Box(parentElement).init();
                box.setPostion(
                    getRandomArbitrary(0, MAX_WIDTH),
                    getRandomArbitrary(0, MAX_HEIGHT)
                )
                box.draw();
                boxes.push(box);
            }

            setInterval(this.moveBoxes.bind(this), 100)
        }

        this.moveBoxes = function() {
            getAppDivs = this.parentElement.getElementsByTagName("div");
            for (var i = 0; i < this.boxCount; i++) {
                var boxIndex = "smashFunction(" + i + ")"
                getAppDivs[i].setAttribute("onclick", boxIndex);
                boxes[i].move();
                boxes[i].checkCollision(boxes)
            }
        }
    }
    var parentElement = document.getElementById('app');

    new Game(parentElement).startGame();
})();
var getApp = document.getElementById('app');
var getBoxes = getApp.getElementsByTagName("div");

function smashFunction(n) {

    getBoxes[n].style.backgroundImage = "url(\"images/splat.png\")";
    setTimeout(function() { nothing(n); }, 150);

}

function nothing(n) {
    getBoxes[n].style.display = "none";
}