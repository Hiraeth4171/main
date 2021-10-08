let w = window.innerWidth,
h = window.innerHeight,
particles = [],
particleCount = 15;
class Particle {
    constructor () {
        this.y = random(0, h);
        this.x = boolean(Math.round(Math.random())) ? -10 : w+10;
        this.d = this.x == -10 ? 'right' : 'left';
        this.r = Math.floor(random(5, 15));
        this.speed = random(0.5,5);
    }

    update () {
        switch (this.d) {
            case 'right': 
                this.x += 2 * this.speed;
                break;
            case 'left':
                this.x -= 2 * this.speed;
                break;
            default:
                break;
        }
    }

    show () {
        fill(230, 230, 230);
        noStroke();
        ellipse(this.x, this.y, this.r, this.r);
        stroke(230, 230, 230, (this.speed / 5)*255);
        strokeWeight(this.r/this.speed)
        line(this.x, this.y, this.d == 'right' ? this.x - this.speed*15 : this.x + this.speed*15, this.y);
    }
}

function setup () {
    let canvas = createCanvas(w, h);
    canvas.parent("hero-section");
    for (let i = 0; i < particleCount; i++) {
        particles[i] = new Particle();
    }
}

function draw () {
    clear(0);    
    if (particles.length < particleCount) while(particles.length - particleCount) particles.push(new Particle());
    for (let i = 0; i < particles.length; i++) {
        let particle = particles[i];
        if(particle.x < -10 || particle.x > w+10) particles.splice(i,1);
        else {
            particle.update()
            particle.show()
        }
    }
}