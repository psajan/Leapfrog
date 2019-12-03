(function() {
    function Box(parentElement) {
        this.x = 0;
        this.y = 10;
        this.speed = 15;
        this.width = 90;
        this.height = 90;
        this.element = null;
        this.roadSpeed = 30;
        this.image = "url(\"images/enemy.png\")";
        this.road = "url(\"images/roadn.png\")";
        this.bulletimage = "url(\"images/bullet.png\")"
        this.cars = [0, 100, 200];
        this.bulletheight = 60;
        this.bulletwidth = 30;
        this.bulletpositionx = 0;
        this.bulletpositiony = 0;
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

            var bullet = document.createElement('div')
            bullet.style.height = this.bulletheight + 'px'
            bullet.style.width = this.bulletwidth + 'px'
            bullet.style.backgroundImage = this.bulletimage;
            bullet.style.backgroundSize = this.bulletheight + "px " + this.bulletwidth + "px";
            bullet.classList.add('bullet');
            this.parentElement.appendChild(bullet);
            this.bulletElement = bullet;
            this.draw();
            return this;
        }
        this.setPostion = function(x, y) {
            this.x = x;
            this.y = y;
        }

        this.draw = function() {
            this.element.style.left = this.x + 'px';
            this.element.style.top = this.y + 'px';
        }

        this.move = function() {
            var cars = this.cars;
            if (this.y > 480)
                this.setPostion(getRandomArbitrary(cars), 0);
            this.y += this.speed;
            this.roadSpeed = this.roadSpeed + 20;
            this.parentElement.style["background-position-y"] = this.roadSpeed + "px";
            if (this.roadSpeed >= 600) {
                this.roadSpeed = 60;
            }
            this.draw();
        }

        this.checkCollision = function(boxes) {
            for (var i = 0; i < 2; i++) {
                if (boxes[2].x <= (parseInt(boxes[i].x) + boxes[i].width) &&
                    (boxes[2].x + boxes[2].width) >= boxes[i].x &&
                    boxes[2].y <= (boxes[i].y + boxes[i].height) &&
                    (boxes[2].y + boxes[2].height) >= boxes[i].y) {
                    document.getElementById('app').style.display = 'None'
                    document.getElementById('gameover').style.display = 'Block'
                    clearInterval(loop);
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
        var allCars = new Box(parentElement).init();
        getAppDivs = this.parentElement.getElementsByClassName("box");
        this.startGame = function() {
            var enemyCars = getRandomArbitrary(allCars.cars)
            getAppDivs[0].setAttribute("id", 0);
            var enemyFirstCar = new Box(parentElement).init();
            enemyFirstCar.setPostion(enemyCars[0], 0)
            getAppDivs[1].setAttribute("id", 1);
            var enemySecondCar = new Box(parentElement).init();
            enemySecondCar.setPostion(enemyCars[1], 0)
            boxes.push(enemyFirstCar);
            boxes.push(enemySecondCar);
            getAppDivs[2].setAttribute("id", 2);
            var loop = setInterval(this.moveBoxes.bind(this), 100)
                //var myCar = new Box(parentElement).init();
            var myCar = getRandomArbitrary(allCars.cars);
            allCars.setPostion(myCar[0], 400);
            allCars.draw();
            boxes.push(allCars);
        }

        this.moveBoxes = function() {
            for (var i = 0; i < this.boxCount; i++) {
                boxes[i].move();
                boxes[i].checkCollision(boxes)
            }
            document.getElementById('0').style.backgroundImage = "url(\"images/mycar.png\")";
            document.onkeydown = function(e) {
                var lane = document.getElementById('0').style.left;
                //boxes[2].setPostion(100, 200);
                switch (e.keyCode) {
                    case 37: //left
                        if (lane == "200px") {
                            document.getElementById('0').style.left = (100) + "px";
                            boxes[2].setPostion(100, 400);
                        } else if (lane == "100px") {
                            boxes[2].setPostion(0, 400);
                            document.getElementById('0').style.left = (0) + "px";
                        } else {

                        }
                        break;
                    case 39: //right
                        if (lane == "0px") {
                            boxes[2].setPostion(100, 400);
                            document.getElementById('0').style.left = (100) + "px";
                        } else if (lane == "100px") {
                            boxes[2].setPostion(200, 400);
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