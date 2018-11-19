let font
let vehicles = [];

function preload() {
    font = loadFont('assets/RobotoMono-Bold.ttf');
}

class Vehicle {

    constructor(x, y) {
        this.pos = createVector(random(width), random(height));
        this.target = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.acc = createVector();
        this.maxSpeed = 5;
        this.maxForce = 0.3;
    }

    behaviors() {
        // let seek = this.seek(this.target);
        // this.applyForce(seek);
        let arrive = this.arrive(this.target);
        this.applyForce(arrive);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0); // clear acceleration
    }

    arrive(target) {
        let desired = p5.Vector.sub(target, this.pos);
        let dist = desired.mag();
        let speed = this.maxSpeed;
        if (dist < 100) {
            speed = map(dist, 0, 100, 0, this.maxSpeed);
        }
        desired.setMag(speed);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;
    }

    seek(target) {
        let desired = p5.Vector.sub(target, this.pos);
        desired.setMag(this.maxSpeed);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;
    }

    show() {
        stroke(255);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
    }

}

function setup() {
    createCanvas(1200, 500);
    background(0);
    textFont(font);
    // textSize(128);
    // fill(255);
    // noStroke();
    // text('Pie is a lie!', 35, 280);

    let textPoints = font.textToPoints('Pie is a lie!', 35, 280, 128);

    for (let i = 0; i < textPoints.length; i++) {
        let p = textPoints[i];
        let vehicle = new Vehicle(p.x, p.y);
        vehicles.push(vehicle);
        // stroke(255);
        // strokeWeight(4);
        // point(p.x, p.y);
    }

}

function draw() {
    background(0);
    for (let i = 0; i < vehicles.length; i++) {
        let vehicle = vehicles[i];
        vehicle.behaviors();
        vehicle.update();
        vehicle.show();
    }
}