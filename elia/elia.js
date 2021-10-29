let w = window.innerWidth,
    h = window.innerHeight,
    particles = [],
    speedMod = 2;
particleCount = 45;
class Particle {
    constructor() {
        this.y = 0;
        this.x = random(0, w);
        this.r = Math.floor(random(3, 7));
        this.speed = random(2, 10);
    }

    update() {
        this.y += speedMod * this.speed;
    }

    show() {
        fill(215, 153, 33);
        noStroke();
        drawGradient(this.x,this.y, this.r/2, this.r/2);
        noFill()
        stroke(215, 153, 33, (this.speed / 5) * 255);
        strokeWeight(this.r / this.speed)
        line(this.x, this.y, this.x, this.y - this.speed * 15);
        stroke(215, 153, 33, (this.speed / 5) * 100);
        strokeWeight((this.r / this.speed)*4)
        line(this.x, this.y, this.x, this.y - this.speed * 15);
    }

    splash() {
        // fill(215, 153, 33);
        // ellipse(this.x, h / 2 + 50, this.r * 15, this.r * 13);
        drawGradient(this.x, h / 2 + 30, this.r * 0.15, this.r * 0.13);
        fill(215, 153, 33, 30);
        ellipse(this.x, h / 2 + 30, this.r * 5, this.r * 3)
        strokeWeight(5)
        line(this.x-20,  h/2+30, this.x+20, h/2+30);
    }
}

function setup() {
    let canvas = createCanvas(w, h / 2 + 30);
    canvas.parent("greg-section");
    for (let i = 0; i < particleCount; i++) {
        particles[i] = new Particle();
    }
}

function draw() {
    clear(0);
    stroke(215, 153, 33, 40);
    strokeWeight(3);
    line(0,h/2 + 30,w,h/2 + 30)
    if (particles.length < particleCount) while (particles.length - particleCount) particles.push(new Particle());
    for (let i = 0; i < particles.length; i++) {
        let particle = particles[i];
        if (particle.y >= (h / 2 + (particle.r * 10))) {
            particle.update();
            particle.splash();
            particle.show()
            if (particle.y > (h / 2 + (particle.r * 10)) + (particle.speed * 15)) particles.splice(i, 1);
        }
        else {
            particle.update()
            particle.show()
        }
    }
}

function drawGradient(x, y, r1, r2) {
    let h = 0;
    for (let r = r2; r > 0; --r) {
        r < (r2-r1)*50 ? fill(215, 153, 33, 255) : fill(215, 153, 33, h);
        ellipse(x, y, r*10, r*10);
        
        h+=20;
    }
}