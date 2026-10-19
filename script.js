let tank = document.getElementById("tank");
let images = ["fish1.png", "fish2.png", "fish3.png", "fish4.png", "fish5.png"];
let normalSpeed = 2;
let fastSpeed = 6;
let fishList = [];

class Fish {
    constructor() {
        this.img = document.createElement("img");
        this.img.src = images[Math.floor(Math.random() * images.length)];
        this.img.className = "fish";
        tank.appendChild(this.img);

        this.maxX = tank.clientWidth - this.img.offsetWidth;
        this.maxY = tank.clientHeight - this.img.offsetHeight;
        this.x = Math.floor(Math.random() * this.maxX);
        this.y = Math.floor(Math.random() * this.maxY);

        this.speed = normalSpeed;
        this.fastTimer = null;
        this.chooseDirection();
        this.draw();

        this.img.addEventListener("click", () => this.speedUp());
        this.scheduleCheck();
    }

    chooseDirection() {
        if (Math.random() < 0.5) {
            this.dx = -1;
        } else {
            this.dx = 1;
        }
        this.dy = Math.floor(Math.random() * 3) - 1;
    }

    scheduleCheck() {
        let delay = 2000 + Math.random() * 6000;
        setTimeout(() => {
            if (Math.random() < 0.7) {
                this.chooseDirection();
            }
            this.scheduleCheck();
        }, delay);
    }

    speedUp() {
        this.speed = fastSpeed;
        clearTimeout(this.fastTimer);
        this.fastTimer = setTimeout(() => {
            this.speed = normalSpeed;
        }, 3000);
    }

    move() {
        this.x = this.x + this.dx * this.speed;
        this.y = this.y + this.dy * this.speed;

        if (this.x < 0) { this.x = 0; }
        if (this.x > this.maxX) { this.x = this.maxX; }
        if (this.y < 0) { this.y = 0; }
        if (this.y > this.maxY) { this.y = this.maxY; }

        this.draw();
    }

    draw() {
        this.img.style.left = this.x + "px";
        this.img.style.top = this.y + "px";
    }
}

for (let i = 0; i < 7; i++) {
    fishList.push(new Fish());
}

setInterval(() => {
    for (let fish of fishList) {
        fish.move();
    }
}, 30);
