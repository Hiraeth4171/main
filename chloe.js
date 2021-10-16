let w = window.innerWidth,
h = window.innerHeight,
particles = [],
particleCount = 15;
class Particle {
    constructor () {
        this.y = random(0, h/2);
        this.x = random(0, w/2);
        this.a = random(0, TWO_PI)
        this.d = round(random(0, 1)) == 0 ? 'right' : 'left';
        this.r = Math.floor(random(5, 15));
        this.speed = random(0.01,0.05);
    }

    update () {
        switch (this.d) {
            case 'right': 
                this.a += this.speed;
                break;
            case 'left':
                this.a -= this.speed;
                break;
            default:
                break;
        }
        if(this.a >= TWO_PI) this.a = 0;
    }

    show () {
        fill(255, 255, 255);
        noStroke();
        let nx = (this.x * cos(this.a)) - (this.y * sin(this.a)) + w/2;
        let ny = (this.x * sin(this.a)) + (this.y * cos(this.a)) + h/2;

        ellipse(nx, ny, this.r, this.r);
        stroke(255, 147, 147);
        strokeWeight(this.r * this.speed)
        noFill()
        ellipse(w/2,h/2, this.a/this.speed * 2, this.a/this.speed * 2);
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