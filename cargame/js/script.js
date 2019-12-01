(function() {
    function Box(parentElement) {
        this.x = 0;
        this.y = 10;
        this.speed = 10;
        this.width = 90;
        this.height = 90;
        this.element = null;
        this.image = "url(\"images/enemy.png\")";
        this.cars = [0, 100, 200];
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
            var cars = this.cars;
            if (this.y > 480) this.setPostion(getRandomArbitrary(cars), 0);
            this.y += this.speed;

            // if (this.x < 0 || this.x > 480) this.speed = -this.speed;
            // this.x += this.speed;
            this.draw();

        }

        this.checkCollision = function(boxes) {
            for (var i = 0; i < 2; i++) {
                if ((boxes[2].x <= (boxes[i].x + boxes[i].width)) && ((boxes[2].x + boxes[2].width) >= boxes[i].x) &&
                    (boxes[2].y <= (boxes[i].y + boxes[i].height)) &&
                    ((boxes[2].y + boxes[2].height) >= boxes[i].y)) {
                    //this.speed = -this.speed;
                    //boxes[i].speed = -boxes[i].speed;
                    // boxes[i].style.display = "none";
                }
            }
            return false;
        }
    }

    function getRandomArbitrary(cars) {
        //return Math.random() * (max - min) + min;
        var temp = cars.slice(0);
        var enemyPosition = Math.floor(Math.random() * 3);

        return temp.splice(enemyPosition, 1);
    }

    function Game(parentElement, boxCount) {
        var boxes = [];
        this.parentElement = parentElement;
        this.boxCount = boxCount || 2;
        var myCar = new Box(parentElement).init();
        this.startGame = function() {
            for (var i = 0; i < 2; i++) {
                var enemyCars = new Box(parentElement).init();
                enemyCars.setPostion(
                    getRandomArbitrary(enemyCars.cars),
                    0
                )
                enemyCars.draw();
                boxes.push(enemyCars);
            }
            var loop = setInterval(this.moveBoxes.bind(this), 100)
                //var myCar = new Box(parentElement).init();
            myCar.setPostion(
                getRandomArbitrary(myCar.cars),
                400
            )
            myCar.draw();
            boxes.push(myCar);
        }

        //setInterval(this.startGame, 7000);

        this.moveBoxes = function() {
            getAppDivs = this.parentElement.getElementsByTagName("div");
            for (var i = 0; i < this.boxCount; i++) {
                getAppDivs[i].setAttribute("id", i);
                boxes[i].move();
                boxes[i].checkCollision(boxes)
            }
            getAppDivs[2].setAttribute("id", 2);
            document.getElementById('0').style.backgroundImage = "url(\"images/mycar.png\")";
            document.onkeydown = function(e) {
                var lane = document.getElementById('0').style.left;
                switch (e.keyCode) {
                    case 37: //left

                        if (lane == "200px") {
                            document.getElementById('0').style.left = (100) + "px";
                        } else if (lane == "100px") {
                            document.getElementById('0').style.left = (0) + "px";
                        } else {

                        }
                        break;
                    case 39: //right
                        if (lane == "0px") {
                            document.getElementById('0').style.left = (100) + "px";
                        } else if (lane == "100px") {
                            document.getElementById('0').style.left = (200) + "px";
                        } else {

                        }

                }
            };
        }
    }
    var parentElement = document.getElementById('app');

    var cars = new Game(parentElement).startGame();
})();