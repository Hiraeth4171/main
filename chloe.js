let w = window.innerWidth,
h = window.innerHeight,
particles = [],
slider,
particleCount = 17,
USM=1,
circle,
sliderusm;
class Particle {
    constructor () {
        this.x = random(50, w/2);
        this.y = random(50, h/2);
        this.rad = sqrt(2)*this.y;
        this.a = random(0, TWO_PI)
        this.d = round(random(0, 1)) == 0 ? 'right' : 'left';
        this.r = Math.floor(random(5, 15));
        this.speed = random(0.01,0.05);
    }

    makeCircular () {
        this.y = this.x;
    }

    revertCircular () {
        this.y = random(50, h/2);
    }
    update () {
        switch (this.d) {
            case 'right': 
                this.a += this.speed * USM;
                break;
            case 'left':
                this.a -= this.speed * USM;
                break;
            default:
                break;
        }
        if(this.a >= TWO_PI) this.a = 0;
    }

    show () {
        // let nx = (this.x * cos(this.a)) - (this.y * sin(this.a)) + w/2;
        // let ny = (this.x * sin(this.a)) + (this.y * cos(this.a)) + h/2;

        let nx = this.x * cos(this.a) + w/2;
        let ny = this.y * sin(this.a) + h/2;
        stroke(255, 147, 147,90);
        strokeWeight(1)
        noFill()
        ellipse(w/2,h/2, this.x * 2, this.y * 2);
        
        stroke(255, 255, 255);
        strokeWeight(this.r/2)
        this.d == 'left' ?  arc(w/2, h/2, this.x*2, this.y*2, this.a - 0.1, this.a) : arc(w/2, h/2, this.x*2, this.y*2, this.a,this.a + 0.1)
    }
}

function setup () {
    slider = createSlider(1, 200, 17, 1)
    sliderusm = createSlider(0,10,1,0.1);
    circle = createCheckbox("O?", false);
    let canvas = createCanvas(w, h);
    canvas.parent("hero-section");
    slider.parent("hero-title-left");
    sliderusm.parent("hero-title-left");
    circle.parent("hero-title-left");
    circle.changed(circular)
    for (let i = 0; i < particleCount; i++) {
        particles[i] = new Particle();
    }
}

function circular () {
    if(this.checked()) for (let i = 0; i < particles.length; i++) particles[i].makeCircular();
    else for (let i = 0; i < particles.length; i++) particles[i].revertCircular();
}

function draw () {
    particleCount = slider.value(); 
    USM = sliderusm.value();
    clear(0);    
    if (particles.length < particleCount) while(particles.length - particleCount) particles.push(new Particle());
    else if (particles.length > particleCount) while(particleCount - particles.length) particles.pop();
    for (let i = 0; i < particles.length; i++) {
        let particle = particles[i];
        particle.update()
        particle.show()
    }
}